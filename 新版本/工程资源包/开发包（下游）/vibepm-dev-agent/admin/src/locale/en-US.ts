import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';
import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';
import localeSearchTable from '@/views/list/search-table/locale/en-US';
import localeTreeTable from '@/views/list/tree-table/locale/en-US';
import localeTagFilter from '@/views/list/tag-filter/locale/en-US';
import localeBasicForm from '@/views/form/basic/locale/en-US';
import localeGroupForm from '@/views/form/group/locale/en-US';
import localeStepForm from '@/views/form/step/locale/en-US';
import localeProfileBasic from '@/views/profile/basic/locale/en-US';
import localeProfileAdvanced from '@/views/profile/advanced/locale/en-US';
import localeResultSuccess from '@/views/result/success/locale/en-US';
import localeResultWaiting from '@/views/result/waiting/locale/en-US';
import localeResultWarning from '@/views/result/warning/locale/en-US';
import localeResultError from '@/views/result/error/locale/en-US';
import locale403 from '@/views/exception/403/locale/en-US';
import locale404 from '@/views/exception/404/locale/en-US';
import locale500 from '@/views/exception/500/locale/en-US';
import localeUserInfo from '@/views/user/info/locale/en-US';
import localeUserSetting from '@/views/user/setting/locale/en-US';
import localeUserMessage from '@/views/user/message/locale/en-US';
import localeSettings from './en-US/settings';

export default {
  'menu.dashboard': 'Dashboard',
  'menu.list': 'Page Templates',
  'menu.exception': 'Exception Pages',
  'menu.form': 'Form Pages',
  'menu.profile': 'Detail Pages',
  'menu.result': 'Result Pages',
  'menu.user': 'User Center',
  'menu.components': 'Components',
  'menu.components.form': 'Form Kit',
  'menu.components.basic': 'Basic',
  'menu.components.formExtended': 'Form Extended',
  'menu.components.extended': 'Extended',
  'menu.components.tableExtended': 'Table Kit',
  'menu.components.list': 'List Kit',
  'menu.components.richText': 'Rich Text',
  'menu.charts': 'Charts',
  'menu.charts.palette': 'Chart Palette',
  'menu.charts.metricCard': 'Metric Cards',
  'menu.charts.basic': 'Basic Charts',
  'menu.charts.extended': 'Extended Charts',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
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
