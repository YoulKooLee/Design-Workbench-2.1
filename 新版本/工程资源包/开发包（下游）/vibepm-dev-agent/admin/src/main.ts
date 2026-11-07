import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import globalComponents from '@/components';
import { installFaIcons } from '@/plugins/fa-icons';
import { applyFrameTheme } from '@/utils/frame-theme';
import { syncLoginCoverThemeTint } from '@/utils/login-cover-theme';
import { applyChartPalette, ensureChartPaletteThemeBridge, readStoredChartPalette } from '@/utils/chart-palette';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import './mock';
import App from './App.vue';
import '@/assets/fonts/index.css';
import '@/styles/global.less';
import '@/styles/pro/arco-theme-pro.css';
import '@/styles/pro/layout.css';
import '@/styles/pro/fa-icons.css';
import '@/styles/pro/pages-common.css';
import '@/styles/pro/bridge.css';
import '@/api/interceptor';

applyFrameTheme();
applyChartPalette(readStoredChartPalette());
ensureChartPaletteThemeBridge();
syncLoginCoverThemeTint();

const app = createApp(App);

app.use(ArcoVue, {});
installFaIcons(app);

app.use(router);
app.use(store);
app.use(i18n);
app.use(globalComponents);
app.use(directive);

app.mount('#app');
