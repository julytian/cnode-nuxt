import { showToast } from "vant"

export default defineNuxtRouteMiddleware((to) => {
  const userInfo = useUserInfo()
  if (!userInfo.value?.token) {
    showToast('您还没登录，请先登录~~')
    return navigateTo(`/login?redirect=${to.fullPath}`)
  }
})