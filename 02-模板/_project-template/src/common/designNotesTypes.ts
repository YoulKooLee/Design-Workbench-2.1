/**
 * 设计说明模块 · 公共类型与保存适配器接口
 *
 * 本文件与 DesignNotesPanel.tsx 配套，零业务依赖：
 *  - 任何原型页面只要满足「左侧主内容区带 [data-proto-id]、右侧挂本面板」的三栏结构即可接入。
 *  - 持久化（落盘）通过 onSave 回调注入，模块本体不依赖任何预览服务或后端。
 */

/**
 * 模块状态标记：用于在面板卡片上标注该功能的推进阶段。
 * 不填 = 未标记；新建模块默认「设计中」。
 */
export type NoteStatus = 'designing' | 'reviewed' | 'todo' | 'developing' | 'done';

/** 单个设计说明模块卡片的数据契约（与 Axhub 原型源码 buildModules 数组元素一一对应） */
export type ModuleDef = {
  /** 稳定唯一 id；用户新增模块的 id 形如 custom-<timestamp> */
  id: string;
  /** 卡片标题（显示在 Xbox 风格编号卡片顶部） */
  title: string;
  /** 状态标记（不填表示未标记） */
  status?: NoteStatus;
  /** 说明正文（纯文本，支持换行）。与 rich 互斥：一旦使用富文本编辑，正文统一存入 rich，本字段清空 */
  text?: string;
  /** 要点列表（卡片内逐条展示，可为空）。与 rich 互斥，同上 */
  list?: string[];
  /**
   * 富文本正文（受限 HTML，仅允许 b/strong/i/em/u/font/span/br/ul/li 等排版标签，
   * 保存前会去除 script 与 on* 事件属性）。存在时卡片只渲染本字段，忽略 text/list。
   * 老模块（只有 text/list）在编辑器里自动转为纯文本 + 项目符号，未加格式保存时仍还原为 text/list，
   * 保证旧数据回写源码不产生无意义 diff。
   */
  rich?: string;
  /**
   * 接口说明（单卡双页签 · 可选）：受限 HTML 小节，讲本区块的请求响应、绑定表、
   * 批次规则、错误码、报文样例（紧凑排版：小节 <b> 块级、要点 <ul><li>）。
   * 为空 = 本区块无对接，卡片按「只有页面说明」直显，不出页签。
   * 页面说明（text/list/rich）与接口说明都有内容时，卡片显示「页面说明 / 接口说明」双页签。
   */
  apiRich?: string;
  /**
   * 关联的左侧页面模块 id（对应左侧某个带 [data-proto-id="bind"] 的元素）。
   * 为空或不填 => 该卡片不与左侧连线，仅作为补充说明。
   */
  bind?: string;
};

/** 保存回调收到的上下文：定位「当前页面 / 子页」以便后端写回源码对应块 */
export type DesignNotesSaveMeta = {
  /** 页面签名，如 dashboard / alarm / devices / diagnosis / report */
  pageKey: string;
  /** 子页签名（无二级子页签的原型不传），如「最新数据」「历史数据」 */
  pageSub?: string;
};

/**
 * 保存适配器：新增 / 编辑 / 删除模块后由面板调用。
 * 返回值支持 Promise：
 *  - 成功 => 面板清除本地草稿兜底，视图回退到「源码即真源」。
 *  - 失败（reject / throw）=> 面板保留本地草稿视图并提示「落盘失败」，数据不丢。
 *
 * 不传该适配器时，面板进入「本地草稿模式」：仅用 localStorage 暂存，不回写任何真源。
 */
export type DesignNotesSaveAdapter = (
  next: ModuleDef[],
  meta: DesignNotesSaveMeta,
) => void | Promise<void>;
