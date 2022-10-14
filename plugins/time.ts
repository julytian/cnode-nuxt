import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime); // 相对时间
dayjs.locale('zh-cn'); // 使用本地化语言

export default defineNuxtPlugin(() => {
  return {
    provide: {
      /**
       *
       * @param time 时间字符串
       * @param friendly 显示xxx时间前
       */
      getLastTimeStr(time: Date, friendly: boolean) {
        if (friendly) {
          return dayjs(time).fromNow().replace(' ', '');
        }
        return dayjs(new Date(time)).format('YYYY-MM-DD HH:mm');
      },
    },
  };
});
