/**
 * 生成 daisyUI 组件页（原型栈 src/component-templates/daisyui/<组件>/index.html）
 * 用法：node gen-component-pages.mjs <目标 daisyui 目录>
 * 数据源：../_meta/components.catalog.json（68 组件：中文、主类、修饰类、场景）
 * 演示片段为手工验证过的类名写法（与 showcase.html 同源）
 */
import fs from 'fs';
import path from 'path';

const catalog = JSON.parse(fs.readFileSync(new URL('../_meta/components.catalog.json', import.meta.url), 'utf8'));
const target = path.resolve(process.argv[2] || '');
if (!target.endsWith('daisyui')) { console.error('目标目录需为 daisyui 分类目录'); process.exit(1); }

const DIFF_1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='800' height='450' fill='%23165dff'/%3E%3Cg stroke='%23ffffff' stroke-opacity='0.22'%3E%3Cpath d='M0 75h800M0 150h800M0 225h800M0 300h800M0 375h800'/%3E%3Cpath d='M100 0v450M200 0v450M300 0v450M400 0v450M500 0v450M600 0v450M700 0v450'/%3E%3C/g%3E%3C/svg%3E";
const DIFF_2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='800' height='450' fill='%234e5969'/%3E%3Cg stroke='%23ffffff' stroke-opacity='0.22' stroke-dasharray='8 10'%3E%3Cpath d='M0 75h800M0 150h800M0 225h800M0 300h800M0 375h800'/%3E%3Cpath d='M100 0v450M200 0v450M300 0v450M400 0v450M500 0v450M600 0v450M700 0v450'/%3E%3C/g%3E%3C/svg%3E";

/** 不生成独立页的组件：跳过原因 */
const SKIP = {
  'text-rotate': '小众动效（CSS 变量驱动），需要时看 showcase/llms.txt',
  'hover-gallery': '小众悬停相册，需要时看 showcase/llms.txt',
};

/** 每个组件的演示片段（手工编写，类名已对照官方 llms.txt） */
const DEMO = {
  button: `<button class="btn btn-primary">主要</button><button class="btn btn-error">危险</button><button class="btn btn-soft btn-primary">浅色</button><button class="btn btn-ghost">幽灵</button><button class="btn btn-outline">描边</button><button class="btn btn-sm">小</button><button class="btn">中</button><button class="btn btn-lg">大</button><button class="btn" disabled>禁用</button>`,
  badge: `<span class="badge badge-primary">主要</span><span class="badge badge-success badge-soft">运行</span><span class="badge badge-warning badge-soft">亚健康</span><span class="badge badge-error">故障</span><span class="badge badge-outline">描边</span><span class="badge badge-sm">小</span><span class="badge badge-lg">大</span>`,
  status: `<span class="inline-flex items-center gap-2 text-xs"><span class="status status-success"></span>在线</span><span class="inline-flex items-center gap-2 text-xs"><span class="status status-warning"></span>亚健康</span><span class="inline-flex items-center gap-2 text-xs"><span class="status status-error"></span>离线</span>`,
  avatar: `<div class="avatar avatar-placeholder"><div class="bg-primary text-primary-content w-10 rounded-full"><span>游</span></div></div><div class="avatar avatar-placeholder"><div class="bg-secondary text-secondary-content w-10 rounded-full"><span>王</span></div></div><div class="avatar online avatar-placeholder"><div class="bg-neutral text-neutral-content w-10 rounded-full"><span>在</span></div></div><div class="avatar offline avatar-placeholder"><div class="bg-base-300 text-base-content w-10 rounded-full"><span>离</span></div></div>`,
  card: `<div class="card bg-base-200 w-64"><div class="card-body"><h3 class="card-title text-sm">A 栋机房</h3><p class="text-xs opacity-70">温度 23.6℃ · 湿度 41% · 空调 3 台运行</p><div class="card-actions justify-end"><button class="btn btn-primary btn-xs">查看详情</button></div></div></div><div class="card card-border border-primary bg-base-100 w-64"><div class="card-body"><h3 class="card-title text-sm">B 栋配电室</h3><p class="text-xs opacity-70">负载 78% · 阈值 85%</p><div class="card-actions justify-end"><button class="btn btn-error btn-xs">告警</button></div></div></div>`,
  table: `<table class="table table-zebra table-sm bg-base-100 rounded-box"><thead><tr><th>设备</th><th>状态</th><th>负载</th></tr></thead><tbody><tr><td>空调外机 01</td><td><span class="badge badge-success badge-soft badge-sm">运行</span></td><td>62%</td></tr><tr><td>空调外机 02</td><td><span class="badge badge-error badge-sm">故障</span></td><td>—</td></tr><tr><td>新风机组</td><td><span class="badge badge-warning badge-soft badge-sm">亚健康</span></td><td>81%</td></tr></tbody></table>`,
  stat: `<div class="stats bg-base-100 shadow-sm"><div class="stat"><div class="stat-title text-xs">在线设备</div><div class="stat-value text-primary text-2xl">128</div><div class="stat-desc text-xs">↗ 8% 较昨日</div></div><div class="stat"><div class="stat-title text-xs">今日告警</div><div class="stat-value text-error text-2xl">3</div><div class="stat-desc text-xs">↘ 2 较昨日</div></div><div class="stat"><div class="stat-title text-xs">平均负载</div><div class="stat-value text-2xl">64%</div><div class="stat-desc text-xs">阈值 85%</div></div></div>`,
  progress: `<progress class="progress progress-primary" value="70" max="100"></progress><progress class="progress progress-success" value="85" max="100"></progress><progress class="progress progress-error" value="92" max="100"></progress><progress class="progress" value="40" max="100"></progress>`,
  'radial-progress': `<div class="radial-progress text-primary" style="--value:72" role="progressbar" aria-label="负载">72%</div><div class="radial-progress text-success" style="--value:85" role="progressbar" aria-label="健康度">85%</div><div class="radial-progress text-error" style="--value:93" role="progressbar" aria-label="占用">93%</div>`,
  loading: `<span class="loading loading-spinner text-primary"></span><span class="loading loading-spinner text-primary loading-md"></span><span class="loading loading-dots text-secondary"></span><span class="loading loading-ring text-accent"></span><span class="loading loading-bars text-neutral"></span>`,
  skeleton: `<div class="skeleton h-6 w-52"></div><div class="skeleton h-4 w-full max-w-sm"></div><div class="skeleton h-4 w-2/3"></div><div class="flex gap-3"><div class="skeleton w-12 h-12 rounded-full shrink-0"></div><div class="skeleton h-12 w-64"></div></div>`,
  timeline: `<ul class="timeline timeline-vertical timeline-compact"><li><div class="timeline-middle"><span class="status status-success"></span></div><div class="timeline-start text-xs opacity-60">09:00</div><div class="timeline-end timeline-box text-xs">开始巡检（A 栋 3F）</div><hr class="bg-primary"/></li><li><hr class="bg-primary"/><div class="timeline-middle"><span class="status status-warning"></span></div><div class="timeline-start text-xs opacity-60">09:24</div><div class="timeline-end timeline-box text-xs">发现空调外机 E4</div><hr/></li><li><hr/><div class="timeline-middle"><span class="status status-error"></span></div><div class="timeline-start text-xs opacity-60">09:31</div><div class="timeline-end timeline-box text-xs">创建检修工单</div></li></ul>`,
  list: `<ul class="list bg-base-200 rounded-box w-80"><li class="list-row"><div><div class="text-sm font-semibold">巡检任务 · A 栋 3F</div><div class="text-xs opacity-60">10 分钟前 · 待打卡</div></div><span class="badge badge-warning badge-soft badge-sm">待办</span></li><li class="list-row"><div><div class="text-sm font-semibold">采购审批 · 网络配件</div><div class="text-xs opacity-60">1 小时前 · 审批中</div></div><span class="badge badge-info badge-soft badge-sm">审批</span></li><li class="list-row"><div><div class="text-sm font-semibold">告警确认 · B 栋空调</div><div class="text-xs opacity-60">2 小时前 · 已确认</div></div><span class="badge badge-success badge-soft badge-sm">完成</span></li></ul>`,
  collapse: `<div class="collapse collapse-arrow bg-base-200 rounded-box mb-2"><input type="checkbox" checked=""/><div class="collapse-title text-sm">A 栋空调机组（点击展开/收起）</div><div class="collapse-content text-xs"><p>3 台外机，1 台报 E4，检修工单已派发。</p></div></div><div class="collapse collapse-arrow bg-base-200 rounded-box"><input type="checkbox"/><div class="collapse-title text-sm">B 栋新风系统</div><div class="collapse-content text-xs"><p>滤网更换周期剩余 12 天。</p></div></div>`,
  accordion: `<div class="collapse collapse-plus bg-base-200 rounded-box mb-2"><input type="checkbox"/><div class="collapse-title text-sm">accordion 与 collapse 同源</div><div class="collapse-content text-xs"><p>区别只是箭头方向类：collapse-arrow / collapse-plus。</p></div></div><div class="collapse collapse-plus bg-base-200 rounded-box"><input type="checkbox" checked=""/><div class="collapse-title text-sm">已展开一项</div><div class="collapse-content text-xs"><p>内容区支持任意 HTML。</p></div></div>`,
  carousel: `<div class="carousel rounded-box w-full max-w-md"><div class="carousel-item"><div class="bg-primary text-primary-content grid place-content-center w-40 h-28">A 栋</div></div><div class="carousel-item"><div class="bg-secondary text-secondary-content grid place-content-center w-40 h-28">B 栋</div></div><div class="carousel-item"><div class="bg-accent text-accent-content grid place-content-center w-40 h-28">C 栋</div></div><div class="carousel-item"><div class="bg-neutral text-neutral-content grid place-content-center w-40 h-28">能源中心</div></div></div>`,
  chat: `<div class="chat chat-start"><div class="chat-bubble text-xs">B 栋空调告警确认了吗？</div></div><div class="chat chat-end"><div class="chat-bubble chat-bubble-primary text-xs">已确认，检修工单已派发。</div></div><div class="chat chat-start"><div class="chat-bubble chat-bubble-warning text-xs">今晚 22:00 计划检修，请留意。</div></div>`,
  countdown: `<div class="countdown font-mono text-lg"><span style="--value:12">12</span>:<span style="--value:48">48</span>:<span style="--value:5">05</span></div><div class="text-xs opacity-60">用 --value 驱动，每格一个 span</div>`,
  indicator: `<div class="indicator"><span class="indicator-item badge badge-error">3</span><div class="bg-base-200 rounded-box p-6 w-44 text-xs grid place-content-center">机房 A · 空调外机</div></div><div class="indicator"><span class="indicator-item indicator-bottom badge badge-success badge-soft">在线</span><div class="bg-base-200 rounded-box p-6 w-44 text-xs grid place-content-center">机房 B · 新风机组</div></div>`,
  mask: `<div class="mask mask-squircle bg-primary w-14 h-14"></div><div class="mask mask-circle bg-success w-14 h-14"></div><div class="mask mask-star bg-warning w-14 h-14"></div><div class="mask mask-hexagon bg-secondary w-14 h-14"></div><div class="mask mask-heart bg-error w-14 h-14"></div>`,
  stack: `<div class="stack" style="width:200px"><div class="card bg-base-200 border border-base-300 h-16"><div class="card-body p-3 text-xs">工单 #1026</div></div><div class="card bg-base-100 border border-base-300 h-16"><div class="card-body p-3 text-xs">工单 #1025</div></div><div class="card bg-base-100 border border-base-300 h-16"><div class="card-body p-3 text-xs">工单 #1024</div></div></div>`,
  diff: `<div class="diff aspect-video rounded-box overflow-hidden w-full max-w-md" style="max-height:200px"><div class="diff-item-1"><img alt="改版后" src="${DIFF_1}"/></div><div class="diff-item-2"><img alt="改版前" src="${DIFF_2}"/></div><div class="diff-resizer"></div></div>`,
  fieldset: `<fieldset class="fieldset bg-base-200 border border-base-300 rounded-box p-4 w-72"><legend class="fieldset-legend text-sm">登录信息</legend><input class="input w-full" placeholder="工号 / 用户名"/><p class="label text-xs opacity-60">使用公司统一工号登录</p></fieldset>`,
  label: `<label class="label cursor-pointer gap-2 w-fit"><input type="checkbox" class="checkbox checkbox-primary" checked=""/><span class="label-text text-xs">巡检完成后通知我</span></label><label class="label text-xs opacity-60">提示文字也可以单独用 label</label>`,
  input: `<input class="input input-primary w-56" placeholder="搜索设备…"/><input class="input input-sm w-40" placeholder="小号输入框"/><input class="input w-56" value="A 栋 3F 机房"/><input class="input w-56" placeholder="禁用状态" disabled/>`,
  textarea: `<textarea class="textarea textarea-bordered w-72" rows="3" placeholder="巡检备注…"></textarea><textarea class="textarea textarea-primary w-72" rows="2" placeholder="主色描边"></textarea>`,
  select: `<select class="select select-primary w-40"><option>A 栋</option><option>B 栋</option><option>C 栋</option></select><select class="select select-sm w-32"><option>今日</option><option>本周</option></select><select class="select w-40" disabled><option>只读</option></select>`,
  checkbox: `<label class="label cursor-pointer gap-2 w-fit"><input type="checkbox" class="checkbox checkbox-primary" checked=""/><span class="label-text text-xs">空调</span></label><label class="label cursor-pointer gap-2 w-fit"><input type="checkbox" class="checkbox checkbox-success" checked=""/><span class="label-text text-xs">新风</span></label><label class="label cursor-pointer gap-2 w-fit"><input type="checkbox" class="checkbox"/><span class="label-text text-xs">照明</span></label><label class="label cursor-pointer gap-2 w-fit"><input type="checkbox" class="checkbox" disabled/><span class="label-text text-xs opacity-50">禁用</span></label>`,
  radio: `<label class="label cursor-pointer gap-2 w-fit"><input type="radio" class="radio radio-primary" name="r1" checked=""/><span class="label-text text-xs">日</span></label><label class="label cursor-pointer gap-2 w-fit"><input type="radio" class="radio radio-primary" name="r1"/><span class="label-text text-xs">周</span></label><label class="label cursor-pointer gap-2 w-fit"><input type="radio" class="radio radio-primary" name="r1"/><span class="label-text text-xs">月</span></label>`,
  toggle: `<input type="checkbox" class="toggle toggle-primary" checked=""/><input type="checkbox" class="toggle toggle-success"/><input type="checkbox" class="toggle toggle-error" checked=""/><input type="checkbox" class="toggle toggle-sm"/><input type="checkbox" class="toggle" disabled/>`,
  range: `<input type="range" class="range range-primary" value="60"/><input type="range" class="range range-success" value="30"/><input type="range" class="range range-error" value="85"/>`,
  rating: `<div class="rating"><input type="radio" name="rt1" class="mask mask-star-2 bg-warning" aria-label="1星"/><input type="radio" name="rt1" class="mask mask-star-2 bg-warning" aria-label="2星" checked=""/><input type="radio" name="rt1" class="mask mask-star-2 bg-warning" aria-label="3星"/><input type="radio" name="rt1" class="mask mask-star-2 bg-warning" aria-label="4星"/><input type="radio" name="rt1" class="mask mask-star-2 bg-warning" aria-label="5星"/></div>`,
  'file-input': `<input type="file" class="file-input file-input-bordered file-input-primary w-64"/><input type="file" class="file-input file-input-sm file-input-bordered w-52"/>`,
  validator: `<input class="input validator w-64" type="email" required placeholder="name@example.com"/><p class="validator-hint text-xs">请输入有效邮箱地址</p>`,
  otp: `<div class="otp"><input type="text" class="otp-input" maxlength="1" value="8"/><input type="text" class="otp-input" maxlength="1" value="1"/><input type="text" class="otp-input" maxlength="1"/><input type="text" class="otp-input" maxlength="1"/></div>`,
  calendar: `<div class="alert alert-info w-fit"><span>calendar 本身不含日历逻辑：daisyUI 只为 <b>Cally</b> / <b>DayPicker</b> 提供皮肤，日期交互由这两个库承担，引入后加类名即可换肤。</span></div>`,
  menu: `<ul class="menu bg-base-200 rounded-box w-52"><li class="menu-title text-xs">园区总览</li><li><a class="menu-active">运行总览</a></li><li><a>能耗对比</a></li><li><a>告警列表</a></li></ul>`,
  navbar: `<div class="navbar bg-base-200 rounded-box"><div class="navbar-start"><span class="text-sm font-semibold px-2">园区数字孪生</span></div><div class="navbar-end gap-2"><button class="btn btn-ghost btn-sm">告警</button><button class="btn btn-primary btn-sm">进入总览</button></div></div>`,
  tab: `<div role="tablist" class="tabs tabs-box w-fit"><a role="tab" class="tab tab-active">总览</a><a role="tab" class="tab">能耗</a><a role="tab" class="tab">安全</a><a role="tab" class="tab">消防</a></div>`,
  breadcrumbs: `<div class="breadcrumbs text-sm"><ul><li><a>园区</a></li><li><a>A 栋</a></li><li class="opacity-60">3F 机房</li></ul></div>`,
  steps: `<ul class="steps"><li class="step step-primary">下单</li><li class="step step-primary">支付</li><li class="step step-primary">发货</li><li class="step">签收</li></ul>`,
  pagination: `<div class="join"><button class="btn btn-sm join-item">«</button><button class="btn btn-sm join-item">1</button><button class="btn btn-sm join-item btn-primary">2</button><button class="btn btn-sm join-item">3</button><button class="btn btn-sm join-item">»</button></div>`,
  join: `<div class="join"><button class="btn btn-sm join-item">日</button><button class="btn btn-sm join-item btn-primary">周</button><button class="btn btn-sm join-item">月</button></div><div class="join"><input class="input input-sm join-item w-40" placeholder="搜索"/><button class="btn btn-sm join-item btn-primary">查</button></div>`,
  drawer: `<div class="drawer drawer-open h-56 rounded-box border border-base-300 w-full max-w-md"><input id="dr1" type="checkbox" class="drawer-toggle"/><div class="drawer-content bg-base-100 p-4 text-xs grid place-content-center">主内容区（侧栏展开在下方）</div><div class="drawer-side z-10"><label for="dr1" class="drawer-overlay"></label><ul class="menu bg-base-200 w-48 rounded-box"><li><a class="menu-active">总览</a></li><li><a>设备</a></li><li><a>告警</a></li></ul></div></div>`,
  dock: `<div class="dock dock-sm relative"><button class="dock-active"><span class="dock-label">总览</span></button><button><span class="dock-label">能耗</span></button><button><span class="dock-label">告警</span></button></div>`,
  footer: `<footer class="footer bg-base-200 text-base-content p-6 rounded-box w-full max-w-md"><nav class="text-xs"><h6 class="footer-title text-xs">服务</h6><a class="link link-hover">文档</a><a class="link link-hover">API</a></nav><nav class="text-xs"><h6 class="footer-title text-xs">公司</h6><a class="link link-hover">关于</a><a class="link link-hover">联系</a></nav></footer>`,
  megamenu: `<div class="navbar bg-base-200 rounded-box"><div class="flex-1 text-sm font-semibold px-2">园区平台</div><div class="dropdown dropdown-end dropdown-open"><div tabindex="0" role="button" class="btn btn-sm">全部菜单 ▾</div><div class="dropdown-content z-10 mt-2 bg-base-100 p-4 shadow rounded-box w-80"><div class="grid grid-cols-2 gap-3 text-xs"><div><div class="font-semibold mb-1">运行</div><a class="link link-hover block">总览</a><a class="link link-hover block">设备台账</a></div><div><div class="font-semibold mb-1">管理</div><a class="link link-hover block">工单</a><a class="link link-hover block">报表</a></div></div></div></div></div>`,
  filter: `<div class="filter"><input class="btn btn-sm" type="reset" value="全部"/><input class="btn btn-sm" type="radio" name="flt" aria-label="运行" defaultChecked/><input class="btn btn-sm" type="radio" name="flt" aria-label="告警"/><input class="btn btn-sm" type="radio" name="flt" aria-label="离线"/></div>`,
  modal: `<div class="modal modal-open"><div class="modal-box w-80"><h3 class="text-base font-semibold">确认派单？</h3><p class="py-2 text-xs opacity-70">将创建检修工单并通知运维班。</p><div class="modal-action"><button class="btn btn-sm">取消</button><button class="btn btn-sm btn-primary">确认</button></div></div></div>`,
  dropdown: `<div class="dropdown dropdown-open"><div tabindex="0" role="button" class="btn btn-sm">工单操作 ▾</div><ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-10 w-44 p-2 shadow text-xs"><li><a>派单</a></li><li><a>转办</a></li><li><a>关闭工单</a></li></ul></div>`,
  tooltip: `<div class="tooltip tooltip-open tooltip-primary" data-tip="负载 78% · 阈值 85%"><button class="btn btn-sm">空调外机 01</button></div><div class="tooltip tooltip-open tooltip-error" data-tip="E4 故障"><button class="btn btn-sm btn-error btn-outline">空调外机 02</button></div>`,
  toast: `<div class="toast toast-center toast-bottom"><div class="alert alert-success"><span>工单已派发</span></div></div>`,
  fab: `<div class="fab"><button class="btn btn-primary btn-circle text-lg">＋</button><button class="btn btn-circle">%</button></div>`,
  alert: `<div class="alert alert-info w-full max-w-md py-2"><span class="text-xs">信息提示：系统将于 22:00 例行维护。</span></div><div class="alert alert-success w-full max-w-md py-2"><span class="text-xs">成功：配置已下发到 12 台设备。</span></div><div class="alert alert-warning w-full max-w-md py-2"><span class="text-xs">警告：B 栋负载接近阈值。</span></div><div class="alert alert-error w-full max-w-md py-2"><span class="text-xs">错误：空调外机 02 通信中断。</span></div>`,
  swap: `<label class="swap swap-rotate"><input type="checkbox" class="swap-toggle" checked=""/><div class="swap-on text-warning text-2xl">☀</div><div class="swap-off text-primary text-2xl">☾</div></label><label class="swap swap-active"><div class="swap-on badge badge-success">展开</div><div class="swap-off badge badge-ghost">收起</div></label>`,
  'mockup-browser': `<div class="mockup-browser border border-base-300 w-full max-w-md"><div class="mockup-browser-toolbar"><div class="input">https://campus.example.com</div></div><div class="grid place-content-center bg-base-200 h-40 text-xs opacity-70">浏览器内容区（截图 / 原型页放这里）</div></div>`,
  'mockup-window': `<div class="mockup-window border border-base-300 w-full max-w-md"><div class="bg-base-200 p-4 text-xs grid place-content-center h-36">窗口内容区 · 适合放后台界面截图</div></div>`,
  'mockup-code': `<div class="mockup-code w-full max-w-md"><pre data-prefix="$"><code>pnpm dev</code></pre><pre data-prefix=">" class="text-success"><code>VITE ready in 4127ms</code></pre><pre data-prefix="$"><code>npm run build</code></pre><pre data-prefix=">" class="text-warning"><code>warn: chunk &gt; 500kb</code></pre></div>`,
  'mockup-phone': `<div class="mockup-phone" style="width:180px"><div class="mockup-phone-camera"></div><div class="mockup-phone-display bg-base-100 px-3 pt-10"><div class="text-[10px] font-semibold mb-2">今日待办</div><div class="space-y-1"><div class="bg-base-200 rounded-box p-1.5 text-[10px]">审批 · 采购 2 条</div><div class="bg-base-200 rounded-box p-1.5 text-[10px]">巡检 · A 栋 3F</div><div class="bg-base-200 rounded-box p-1.5 text-[10px]">告警 · 1 条待确认</div></div></div></div>`,
  kbd: `<div class="flex items-center gap-2 text-xs"><kbd class="kbd kbd-sm">Ctrl</kbd> + <kbd class="kbd kbd-sm">K</kbd> 打开命令面板</div><div class="flex items-center gap-2 text-xs"><kbd class="kbd">Esc</kbd> 关闭弹窗</div>`,
  divider: `<div class="flex items-center w-full max-w-sm"><div class="flex-1 text-xs opacity-60">账号登录</div><div class="divider text-xs">OR</div><div class="flex-1 text-xs opacity-60">扫码登录</div></div>`,
  link: `<a class="link link-primary">主色链接</a><a class="link link-hover">悬停下划线</a><a class="link link-success">成功色</a>`,
  hero: `<div class="hero rounded-box bg-base-200 w-full max-w-md" style="min-height:150px"><div class="hero-content text-center"><div><div class="text-sm font-semibold">园区数字孪生</div><div class="text-xs opacity-70 my-1">首屏大图区 · 放摄影图或大屏截图</div><button class="btn btn-primary btn-xs">进入总览</button></div></div></div>`,
  'theme-controller': `<label class="label cursor-pointer gap-2 w-fit"><input type="checkbox" value="dark" class="theme-controller checkbox"/><span class="label-text text-xs">勾选后整页切到 dark 主题（免 JS）</span></label>`,
  aura: `<div class="grid place-items-center p-4"><div class="aura bg-primary w-24 h-24 rounded-full"></div></div>`,
  'hover-3d': `<div class="flex gap-6"><div class="hover-3d card bg-base-200 w-40 h-24 grid place-content-center text-xs">悬停有 3D 抬升</div><div class="card bg-base-200 w-40 h-24 grid place-content-center text-xs opacity-60">普通卡片（对照）</div></div>`,
};

const byId = Object.fromEntries(catalog.components.map((c) => [c.id, c]));
const groups = catalog.groups;

function pageHtml(c, body) {
  const cls = (c.cls || []).map((s) => `<code>${s}</code>`).join(' ');
  const mods = (c.mods || []).slice(0, 6).map((s) => `<code>${s}</code>`).join(' ');
  return `<!doctype html>
<html lang="zh-CN" data-theme="axhub">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.zh} · daisyUI</title>
<link rel="stylesheet" href="../../_kit/theme.css">
<style>
  body{margin:0;padding:24px 28px;font-family:-apple-system,"Segoe UI","Microsoft YaHei",sans-serif;background:var(--color-base-100);color:var(--color-base-content)}
  a.back{font-size:12px;opacity:.65;text-decoration:none;display:inline-block;margin-bottom:10px}
  h1{font-size:16px;margin:0 0 4px;font-weight:600}
  .meta{font-size:12px;opacity:.65;margin-bottom:6px;line-height:1.9}
  .meta code{background:var(--color-base-200);padding:1px 5px;border-radius:4px;font-size:11px}
  .demo{display:flex;flex-wrap:wrap;gap:12px;align-items:center;padding:16px;border:1px solid var(--color-base-300);border-radius:10px;margin-bottom:14px;min-width:min-content}
  .usage{background:var(--color-base-200);border-radius:8px;padding:10px 14px;font-size:11px;opacity:.8;margin-top:4px;white-space:pre-wrap;font-family:ui-monospace,Consolas,monospace}
</style>
</head>
<body>
<a class="back" href="../index.html">← 返回 daisyUI 目录</a>
<h1>${c.id} · ${c.zh}</h1>
<div class="meta">主类 ${cls || '—'}　修饰 ${mods || '—'}<br>场景：${c.scene}</div>
<div class="demo">${body}</div>
<div class="usage">写类名即用，不 import：&lt;div class="${(c.cls || []).join(' ')} …"&gt;…&lt;/div&gt;
对应 Codebuddy Design：${c.cb === '无' ? '无（daisyUI 独有）' : c.cb}</div>
</body>
</html>
`;
}

let made = 0, skipped = [];
for (const c of catalog.components) {
  if (SKIP[c.id]) { skipped.push(c.id); continue; }
  const body = DEMO[c.id];
  if (!body) { skipped.push(c.id + '（无演示片段）'); continue; }
  const dir = path.join(target, c.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageHtml(c, body));
  made++;
}

// 生成分组索引 JSON 供 index.tsx 引用
const index = {};
for (const g of groups) {
  const list = catalog.components.filter((x) => x.group === g.id && !SKIP[x.id] && DEMO[x.id]);
  if (list.length) index[g.id] = { zh: g.zh, items: list.map((x) => ({ id: x.id, zh: x.zh })) };
}
fs.writeFileSync(path.join(target, 'pages.json'), JSON.stringify(index, null, 2));
console.log('生成组件页:', made, '| 跳过:', skipped.join(', ') || '无');
