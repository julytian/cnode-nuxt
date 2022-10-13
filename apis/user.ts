export function useGetAccessToken(accesstoken: string) {
  return useHttp('getAccessToken', '/accesstoken', {
    method: 'POST',
    body: {
      accesstoken,
    }
  });
}
export function useGetUserInfo(loginname: string) {
  return useHttp('getUserInfo', `/user/${loginname}`);
}
export function useGetTopicCollect(loginname: string) {
  return useHttp('getTopicCollect', `/topic_collect/${loginname}`);
}