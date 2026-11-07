import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';
import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';
import localeSearchTable from '@/views/list/search-table/locale/zh-CN';
import localeTreeTable from '@/views/list/tree-table/locale/zh-CN';
import localeTagFilter from '@/views/list/tag-filter/locale/zh-CN';
import localeBasicForm from '@/views/form/basic/locale/zh-CN';
import localeGroupForm from '@/views/form/group/locale/zh-CN';
import localeStepForm from '@/views/form/step/locale/zh-CN';
import localeProfileBasic from '@/views/profile/basic/locale/zh-CN';
import localeProfileAdvanced from '@/views/profile/advanced/locale/zh-CN';
import localeResultSuccess from '@/views/result/success/locale/zh-CN';
import localeResultWaiting from '@/views/result/waiting/locale/zh-CN';
import localeResultWarning from '@/views/result/warning/locale/zh-CN';
import localeResultError from '@/views/result/error/locale/zh-CN';
import locale403 from '@/views/exception/403/locale/zh-CN';
import locale404 from '@/views/exception/404/locale/zh-CN';
import locale500 from '@/views/exception/500/locale/zh-CN';
import localeUserInfo from '@/views/user/info/locale/zh-CN';
import localeUserSetting from '@/views/user/setting/locale/zh-CN';
import localeUserMessage from '@/views/user/message/locale/zh-CN';
import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '数据看板',
  'menu.list': '页面模板',
  'menu.exception': '异常页面',
  'menu.form': '表单页面',
  'menu.profile': '详情页面',
  'menu.result': '结果页面',
  'menu.user': '个人中心',
  'menu.components': '常用组件',
  'menu.components.form': '表单组件',
  'menu.components.basic': '基础组件',
  'menu.components.formExtended': '扩展表单',
  'menu.components.extended': '扩展组件',
  'menu.components.tableExtended': '表格组件',
  'menu.components.list': '列表组件',
  'menu.components.richText': '富文本组件',
  'menu.charts': '图表组件',
  'menu.charts.palette': '图表配色',
  'menu.charts.metricCard': '指标卡片',
  'menu.charts.basic': '常用图表',
  'menu.charts.extended': '扩展图表',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...localeSearchTable,
  ...localeTreeTable,
  ...localeTagFilter,
  ...localeBasicForm,
  ...localeGroupForm,
  ...localeStepForm,
  ...localeProfileBasic,
  ...localeProfileAdvanced,
  ...localeResultSuccess,
  ...localeResultWaiting,
  ...localeResultWarning,
  ...localeResultError,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeUserInfo,
  ...localeUserSetting,
  ...localeUserMessage,
};
