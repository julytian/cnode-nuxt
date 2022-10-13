import { UseFetchOptions } from '#app';
import { showToast } from 'vant';

const baseConfig = {
  baseURL: 'https://cnodejs.org/api/v1',
};
function baseOptions(options: UseFetchOptions<any> = {}) {
  options.method = options.method ?? 'GET';
  options.baseURL = options.baseURL ?? baseConfig.baseURL;
  options.initialCache = options.initialCache ?? false;
  options.lazy = options.lazy ?? false;
  return options;
}

export async function useHttp(
  key: string,
  url: string,
  options: UseFetchOptions<any> = {}
) {
  options = baseOptions(options);
  options.key = key;
  const res = await useFetch(url, {
    ...options,
    transform: (res) => res.data ?? res,
  });
  // 客户端处理错误
  if (process.client && res.error.value) {
    showToast(res.error.value?.data?.error_msg);
  }
  return res;
}
