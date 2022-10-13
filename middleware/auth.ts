export default defineNuxtRouteMiddleware((to) => {
  const userInfo = useUserInfo()
  if (!userInfo.value?.token) {
    return navigateTo(`/login?redirect=${to.fullPath}`)
  }
})