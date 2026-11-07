import { App } from 'vue';
import Breadcrumb from './breadcrumb/index.vue';
import ProChart from './charts/pro-chart.vue';
import MetricCard from './metric-card/index.vue';
import ProSearchPanel from './pro-search-panel/index.vue';
import ProToolbar from './pro-toolbar/index.vue';

/**
 * 默认图表库：ProChart（Unovis + ProShadcnCharts / shadcn-charts）。
 */
export default {
  install(Vue: App) {
    Vue.component('Breadcrumb', Breadcrumb);
    Vue.component('ProChart', ProChart);
    Vue.component('MetricCard', MetricCard);
    Vue.component('ProSearchPanel', ProSearchPanel);
    Vue.component('ProToolbar', ProToolbar);
  },
};
