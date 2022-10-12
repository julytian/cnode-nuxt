import {
  Button,
  ConfigProvider,
  Sticky,
  Icon,
  Popup,
  Skeleton,
  List,
  PullRefresh,
  Cell,
  Lazyload,
} from 'vant';
import 'vant/lib/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp
    .use(ConfigProvider)
    .use(Button)
    .use(Sticky)
    .use(Icon)
    .use(Popup)
    .use(Skeleton)
    .use(List)
    .use(PullRefresh)
    .use(Cell)
    .use(Lazyload);
});
