export function useGetTopic(id: string, mdrender = true, token = '') {
  let url = `/topic/${id}?mdrender=${mdrender}`;
  if (token) {
    url += `&accesstoken=${token}`;
  }
  return useHttp('getTopic', url);
}
