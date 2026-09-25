/**
 * 页面模式（Page Patterns）分类出口
 *
 * 页面模式 = 由 `Vibe Design Pro/admin` 母版样板页精转而来的**整页级 React 组件**：
 * 自带筛选 / 表格 / 分页 / 弹窗 / 抽屉等编排，复制组件库后 import 即可拼装原型页面。
 *
 * 与「基础/布局/表单/数据展示/反馈/业务组件」的区别：
 * - 那 6 类是可复用**零件**（Button / DataTable / TableCard …）；
 * - 本分类是**整页骨架**（一次组装好一个页面类型），内部按规范组合上述零件，不自造控件。
 */
export * from './PageListSearchTable';
export * from './PageListCard';
export * from './PageFormBasic';
export * from './PageFormGroup';
export * from './PageFormStep';
export * from './PageFormStepVertical';
export * from './PageDetailBasic';
export * from './PageDetailAdvanced';
export * from './PageListImport';
export * from './PageListCalendar';
export * from './PageListEditable';
export * from './PageListKanban';
export * from './PageListMasterDetail';
export * from './PageListTagFilter';
export * from './PageListFilterTable';
export * from './PageListTreeTable';
export * from './PageListMedia';
export * from './PageException';
export * from './PageResult';
export * from './PageLogin';
export * from './PageUserHome';
export * from './PageWorkplace';
export * from './PageMessageList';
export * from './PageUserSetting';
export * from './PageDashboardAnalytics';
export * from './PageDashboardCustomer';
export * from './PageDashboardFinance';
export * from './PageDashboardAcademy';
export * from './PageDashboardProductivity';
export * from './PageDashboardBanking';
export * from './PageDashboardCrm';
export * from './PageDashboardEcommerce';
export * from './MobileFrameIos';
export * from './MobileFrameWechat';
