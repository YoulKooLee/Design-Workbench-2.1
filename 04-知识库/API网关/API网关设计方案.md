# API 网关设计方案（统一接入 / API Gateway）

> 整理日期：2026-10-10
> 用途：软件产品模块设计知识库。覆盖 API 网关的业务场景全景、各场景解决方案、通用设计方案（最优解）与设计说明。
> 一句话本质：把微服务架构里"每个服务都要做"的横切关注点（路由、鉴权、限流、熔断、灰度、安全、日志）**收敛到网关一个入口统一处理**——后端服务只管业务，客户端只认一个地址。与统一身份认证（令牌校验）、权限（细粒度授权）、审计（访问留痕）联动。

---

## 一、模块概述：统一入口，横切关注点收敛

```
客户端（Web/App/第三方）
   │
   ▼
API 网关（统一入口）：
  ① 路由转发（/user/* → user-service，/order/* → order-service）
  ② 统一鉴权（JWT / API Key / AKSK 签名）
  ③ 限流熔断（令牌桶 / 滑动窗口 + 熔断降级防雪崩）
  ④ 灰度发布（流量染色 + 灰度路由）
  ⑤ 安全防护（HTTPS / IP 黑白名单 / 防重放 / 签名防篡改）
  ⑥ 协议转换 / 响应聚合 / CORS
  ⑦ 日志监控（全链路可观测）
   │
   ▼
后端服务集群（业务应用，不再各自鉴权限流）
```

| 核心价值 | 说明 |
| --- | --- |
| 收敛横切关注点 | 鉴权/限流/熔断/日志一次实现，所有服务复用 |
| 统一入口 | 客户端只认一个地址，后端结构变化对调用方透明 |
| 安全防线前移 | 恶意请求在网关被拦截，不进后端 |
| 流量可控 | 限流防过载、熔断防雪崩、灰度防事故 |

---

## 二、业务场景全景

### 场景 1：微服务统一路由入口
- 前端/外部请求 `/api/orders` → 订单服务，`/api/users` → 用户服务；
- 按路径、域名、请求头路由，服务内部地址不暴露。

### 场景 2：统一认证鉴权
- 登录态校验（JWT/OAuth Token）、API Key 校验统一放网关；
- 后端服务不再各自写一遍登录态判断；
- 与统一身份认证（IdP）联动：网关校验 Token → 透传用户身份给后端。

### 场景 3：限流保护（防过载）
- 大促/突发流量打过来时保护后端；
- 按接口/用户/租户/IP 多维度限流，超限返回 429。

### 场景 4：熔断降级（防雪崩）
- 下游服务超时/错误率飙升 → 网关熔断，返回兜底数据；
- 核心接口降级只读，非核心直接熔断，防止雪崩效应。

### 场景 5：灰度发布（平滑上线）
- 新版本不"一刀切"全量上线；
- 按租户/应用/用户维度流量染色，灰度路由到新版本，逐步放量。

### 场景 6：第三方开放平台（OpenAPI）
- 对外开放 API：AKSK 签名认证、API Key 管理、调用配额、开发者控制台；
- 第三方按规调用，无需关注后端实现。

### 场景 7：安全防护
- HTTPS 强制、IP 黑白名单、防重放（Nonce+Timestamp）、签名防篡改；
- 恶意请求（扫描/攻击/重放）在网关被拦下。

### 场景 8：协议转换与响应聚合
- 老系统接口协议适配（如 XML/JSON、HTTP/RPC 转换）；
- BFF（Backend for Frontend）聚合多个后端响应，一次请求返回多服务数据。

### 场景 9：日志监控与审计
- 网关统一记录访问日志（谁、何时、调了什么、耗时、状态码）；
- 全链路可观测：限流命中率、拒绝率、错误率监控。

---

## 三、各场景的解决方案

### 3.1 技术选型对比
| 方案 | 适用 | 优点 | 缺点 |
| --- | --- | --- | --- |
| **Spring Cloud Gateway** | Java 微服务 | 响应式、路由丰富、与 Spring 生态集成 | Java 技术栈限定 |
| **Kong** | 多语言/云原生 | 插件化、性能高、K8s 集成 | 运维复杂度 |
| **Apache APISIX** | 云原生 | 高性能、灰度/可观测插件丰富、开源活跃 | 团队需熟悉 |
| 阿里云 API 网关 / 云原生网关 | 云上 | 免运维、安全能力全 | 云厂商绑定 |
| 火山引擎/华为云 APIG | 云上开放平台 | AKSK/IAM/自定义认证全套 | 云厂商绑定 |
| Nginx | 简单场景 | 轻量、稳定 | 无原生鉴权限流编排能力 |

**推荐**：Java 生态用 Spring Cloud Gateway；云原生/多语言用 APISIX；对外开放平台用云厂商 API 网关（免运维、安全全）。

### 3.2 认证鉴权方案
| 场景 | 方案 |
| --- | --- |
| 内部系统（B 端） | JWT 校验（网关验签）→ 透传用户身份给后端 |
| 第三方开放平台 | **AKSK 签名**：Access Key + Secret Key，HMAC 对请求关键数据签名，网关验签防篡改 + 身份校验 |
| 简单集成 | API Key（放 Header），网关查 Key 校验 |
| 云平台 | IAM Token 认证 / AK/SK 认证 |
| 后端间互信 | 后端签名：网关到后端请求加签名，后端本地验签 |

### 3.3 限流方案（重点）
```
算法选型：
  固定窗口：实现简单，但有临界突刺（窗口边界突增）
  滑动窗口：把 1 秒拆成小窗口（如 10×100ms），统计当前+前 N 窗口，平滑、精度高
  漏桶：绝对匀速（排队处理），不适合突发
  令牌桶（默认选）：capacity（桶容量=可承接突发量）+ rate（填充速率=长期 QPS），
      每请求取 1 令牌，空桶拒绝/排队/降级；允许突发、O(1) 内存

按维度限流：全局 / 单接口 / 单用户/租户 / 单 IP / 单 API-Key

分布式限流：Redis + Lua 脚本（或 INCR）保证并发不超计，全局一致

生产级兜底（大促翻车教训）：
  限流后优先排队等待（短超时）→ 队列满返回 429 + Retry-After 头
  → 客户端指数退避，防重试风暴
  核心接口降级到只读模式，非核心接口直接熔断
  监控：限流命中率、拒绝率、规则匹配耗时、热点参数分布
```

### 3.4 熔断降级方案
```
触发：下游响应超时 / 错误率飙升（如 >50%）→ 熔断
熔断后：不再转发请求，直接返回兜底数据/友好提示，防雪崩
恢复（阶梯式探测）：
  熔断后第 1 周期（5s）允许 1 次试探请求 → 成功进入半打开
  半打开：前 10 秒允许 10% 流量试探 → 成功率 >80% 完全恢复，否则重新熔断
  自适应周期：首次熔断 5s，第二次 10s，连续失败递增
```

### 3.5 灰度发布方案
```
多维度渐进式发布：按租户 / 应用 / 用户 灰度
流量染色：网关给流量贴标签（如 gray=true）→ 灰度路由到新版本上游
泳道：为相同版本应用定义隔离环境，满足流控规则才进入新版本
全链路灰度：入口网关灰度 → 下游服务通过请求头透传灰度标签，整条链路走新版本
```

### 3.6 防重放与安全
```
防重放三板斧：Nonce + Timestamp + RequestId
  Nonce（随机数）：保证请求唯一
  Timestamp（时间戳）：限制有效期（如 5 分钟内有效）
  RequestId（唯一标识）：防止同一请求多次提交
其他：HTTPS 强制 · IP 黑白名单 · API Key 管理 · 后端签名防篡改
```

### 3.7 OpenAPI 开放平台设计
```
开发者控制台：
  申请 API Key / 生成 AKSK 密钥对
  查看调用配额、流量统计、错误日志
网关侧：
  AKSK 签名校验（防篡改 + 身份认证）
  按 Key 限流配额（每 Key 每秒/每天调用上限）
  接口发布/下线、版本管理
文档侧：
  API 文档自动生成、SDK 生成、沙箱测试环境
```

---

## 四、通用设计方案（最优解）

### 4.1 总体架构（接入层 → 决策层 → 出口层）
```
接入层：协议适配（HTTP/gRPC/WebSocket）、TLS 终止、CORS、IP 黑白名单
  ↓
决策层（核心）：
  路由决策（路径/域名/Header 匹配 → 上游服务）
  认证鉴权（JWT/API Key/AKSK 签名校验 → 透传身份）
  限流（令牌桶/滑动窗口，Redis+Lua 分布式）
  熔断降级（超时/错误率触发 → 兜底返回）
  灰度路由（流量染色标签匹配）
  ↓
出口层：实际调用上游、负载均衡（轮询/加权/最少连接）、
       超时重试、响应转换、后端签名
  ↓
配套：配置中心（动态路由/限流规则热更新）· 监控（限流命中率/错误率/耗时）· 审计日志
```

### 4.2 核心表结构（开放平台侧）
```sql
api_app（调用方应用）：
  id, app_name, owner_id,
  access_key, secret_key（加密存储，只在创建时明文展示一次）,
  status（启用/停用）, quota_per_second, quota_per_day,
  ip_whitelist（JSON）, create_time

api_definition（API 定义）：
  id, path, method, service_id, route_config（JSON：上游地址/超时/重试）,
  auth_type（NONE/JWT/API_KEY/AKSK）,
  rate_limit_rule（JSON：算法/阈值/维度）,
  status（发布/下线）, version, create_time

api_call_log（调用日志）：
  id, app_id, api_id, request_id,
  user_id（透传身份）, result（成功/拒绝/限流/熔断）,
  cost_ms, status_code, client_ip,
  request_time, response_size
```

### 4.3 关键设计点
- **网关无状态**：鉴权/路由状态放 Redis/配置中心，网关可水平扩展；
- **限流规则热更新**：配置中心动态下发，不发版；
- **认证与授权分离**：网关做认证（你是谁）+ 权限模块做授权（你能干什么）；
- **防重放必做**：Nonce + Timestamp + RequestId 三件套，防重试风暴/重放攻击；
- **灰度标签透传**：网关染色 → Header 透传 → 全链路灰度；
- **失败兜底**：熔断返回兜底数据而不是 5xx 打爆下游；
- **日志与审计**：调用日志全量记录，敏感 API 访问进审计日志；
- **密钥安全**：AKSK secret 加密存储、仅创建时展示、支持轮换。

---

## 五、设计说明

### 5.1 核心设计原则
| 原则 | 说明 |
| --- | --- |
| 横切关注点收敛 | 鉴权/限流/熔断/日志一次实现全服务复用 |
| 后端只管业务 | 登录态/限流判断不写进每个服务 |
| 安全防线前移 | 恶意请求在网关拦截 |
| 限流防过载熔断防雪崩 | 流量治理是网关第一职责 |
| 灰度渐进发布 | 流量染色 + 多维度路由，不平滑不上线 |
| 认证授权分离 | 网关认证 + 权限模块授权 |
| 密钥安全 | AKSK 加密存储、防重放、支持轮换 |
| 全链路可观测 | 调用日志 + 限流/错误率监控 |

### 5.2 常见设计坑与规避
| 坑 | 后果 | 规避 |
| --- | --- | --- |
| 后端各自鉴权限流 | 逻辑重复、漏洞百出 | 收敛到网关统一做 |
| 固定窗口限流 | 窗口边界突刺打爆 | 滑动窗口 / 令牌桶 |
| 单机限流 | 多实例总 QPS 超限 | Redis + Lua 分布式限流 |
| 限流后直接拒绝 | 客户端疯狂重试风暴 | 排队 + 429 + Retry-After + 指数退避 |
| 无熔断 | 下游故障拖垮全链路雪崩 | 熔断 + 兜底数据 |
| 熔断后立即全量恢复 | 下游没好再次打爆 | 阶梯式探测半打开恢复 |
| 新版本全量上线 | 出事故全线崩 | 灰度 + 流量染色 |
| 无防重放 | 重放攻击/重复扣款 | Nonce + Timestamp + RequestId |
| 密钥明文存储 | 泄露即失守 | 加密存储 + 仅创建时展示 + 轮换 |
| 网关无状态检查 | 加节点不一致 | 状态放 Redis/配置中心 |

### 5.3 演进路线
```
阶段1 Nginx 反代：简单路由 + 负载均衡
   ↓
阶段2 微服务网关：Spring Cloud Gateway / APISIX——统一路由 + 鉴权 + 限流
   ↓
阶段3 流量治理完备：熔断降级 + 灰度发布 + 全链路可观测
   ↓
阶段4 开放平台：AKSK 签名 + API Key 管理 + 开发者控制台 + 配额计费
```

### 5.4 业界参考实现
- **Spring Cloud Gateway**：Java 微服务默认网关；
- **Apache APISIX / Kong**：云原生高性能网关，插件化；
- **阿里云 API 网关 / 云原生网关**：兼容 K8s Ingress，API 网关+流量网关+微服务网关+安全网关合并；
- **火山引擎 / 华为云 APIG**：AKSK/IAM/自定义认证/后端签名全套；
- **HMAC 签名**：不可伪造的请求签名，身份认证 + 防篡改。

---

## 参考资料

1. 从路由到限流：API 网关拯救微服务架构（熔断防雪崩/负载均衡）：https://developer.aliyun.com/article/1767044
2. API7 网关白皮书（路由匹配/灰度发布/404）：https://static.apiseven.com/202108/API7-Whitepaper.pdf
3. 火山引擎 API 网关（Token 限流/IP 黑白名单/API-KEY）：https://www.volcengine.com/product/apig
4. API 网关与微服务统一入口（路由转发/统一鉴权）：https://bbs.huaweicloud.com/blogs/490065
5. ToB 开放平台避坑指南（灰度开关/ROI 思维）：https://juejin.cn/post/7624378354167513139
6. API 网关设计实战（路由/认证授权/限流熔断/协议转换）：https://xie.infoq.cn/article/f9d92574ead6567e29d4fa3f9
7. LLM Gateway 设计（接入层/决策层/出口层）：https://www.51cto.com/article/841324.html
8. 阿里云 MSE 基于 APISIX 灰度方案（host 路由到灰度上游）：https://apisix.apache.org/zh/blog/2022/06/14/how-mse-supports-canary-release-with-apache-apisix/
9. 云原生 API 网关全链路灰度（泳道/流控路由）：https://help.aliyun.com/zh/sae/implement-an-end-to-end-canary-release-based-on-cloud-native-api-gateway
10. Gateway 流量染色 + 灰度发布（告别上线事故）：https://www.51cto.com/article/825417.html
11. 阿里云 API 网关用户指南（后端 HTTP 签名验证）：http://docs-aliyun.cn-hangzhou.oss.aliyun-inc.com/pdf/apigateway-p_user-guide-cn-zh-2018-09-06.pdf
12. API Gateway Authentication（集中鉴权/认证日志最佳实践）：https://apisix.apache.org/learning-center/api-gateway-authentication/
13. 企业级开放平台 API 网关（Spring Cloud Gateway + AKSK + Redis 限流）：https://www.proginn.com/w/1580078
14. 华为云 API 网关（AKSK/Token/自定义认证/后端证书校验）：https://support.huaweicloud.com/intl/zh-cn/productdesc-apig/apig-productdesc-pdf.pdf
15. 华为云 APIG 开发指南（APP 签名认证/IAM Token/AK-SK）：https://support.huaweicloud.com/intl/zh-cn/ally-visitor-1-devg-apig/ally-visitor-1-devg-apig.pdf
16. 从 0 到 1 设计可靠 OpenAPI（OpenAPI vs API 网关区别）：https://cloud.tencent.com/developer/article/2593039
17. 阿里云 hmac-auth 插件（HMAC 不可伪造签名/身份认证鉴权）：https://help.aliyun.com/zh/api-gateway/ai-gateway/user-guide/hmac-auth-plug-ins
18. 集中式 API 网关防认证绕过（统一执行/一致安全策略/可观测）：https://api7.ai/ru/blog/prevent-authentication-bypasses-with-api-gateway
19. 大促限流翻车复盘（排队等待/429+Retry-After/降级熔断/全链路监控）：https://www.iesdouyin.com/share/video/7682646106387303723
20. 限流设计层级与策略（算法对比/按谁限/全局vs单接口）：https://www.fanyamin.com/blog/rate-limiting-design-levels-policies.html
21. 计数器/滑动窗口/令牌桶限流落地（capacity/rate 参数）：https://developer.aliyun.com/article/1763051
22. 限流技术栈（滑动窗口拆小窗口解决临界/精度）：https://cloud.tencent.com/developer/article/2570102
23. Rate Limiting（令牌桶/429/Retry-After）：https://abstractalgorithms.hashnode.dev/system-design-advanced-security-rate-limiting-and-reliability
24. Design a Rate Limiter（Redis+Lua 原子性/全局一致）：https://prepstack.co.in/blog/design-a-rate-limiter-system-design
25. Sentinel 恢复机制（阶梯式探测/半打开/自适应周期）：https://www.woshipm.com/ai/6253215.html
26. Design a Rate Limiter（令牌桶默认选/O(1) 内存/Redis Lua）：https://www.gyanbyte.com/crash-courses/cracking-system-design-interview/12-design-rate-limiter/
27. 接口安全三板斧（限流/防重放 Nonce+Timestamp/签名验证）：https://www.51cto.com/article/825267.html
28. Rate Limiter 设计（令牌桶 Redis 实现/AWS/Stripe/Cloudflare 采用）：https://gitgood.dev/system-design/rate-limiter
