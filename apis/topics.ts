export function useGetTopics(
  page: number,
  tab = 'all',
  limit = 20,
  mdrender = true
) {
  return useHttp(
    'getTopics',
    `/topics?page=${page}&tab=${tab}&limit=${limit}&mdrender=${mdrender}`
  );
}
