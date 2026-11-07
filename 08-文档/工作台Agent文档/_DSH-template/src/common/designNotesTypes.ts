/**
 * 设计说明模块 · 公共类型与保存适配器接口
 *
 * 本文件与 DesignNotesPanel.tsx 配套，零业务依赖：
 *  - 任何原型页面只要满足「左侧主内容区带 [data-proto-id]、右侧挂本面板」的三栏结构即可接入。
 *  - 持久化（落盘）通过 onSave 回调注入，模块本体不依赖任何预览服务或后端。
 */

/** 单个设计说明模块卡片的数据契约（与 Axhub 原型源码 buildModules 数组元素一一对应） */
export type ModuleDef = {
  /** 稳定唯一 id；用户新增模块的 id 形如 custom-<timestamp> */
  id: string;
  /** 卡片标题（显示在 Xbox 风格编号卡片顶部） */
  title: string;
  /** 说明正文（纯文本，支持换行） */
  text?: string;
  /** 要点列表（卡片内逐条展示，可为空） */
  list?: string[];
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
