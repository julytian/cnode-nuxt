export function useGetMessages() {
  const userInfo = useUserInfo()
  return useHttp('getMessages', `/messages?accesstoken=${userInfo.value.token}`);
}