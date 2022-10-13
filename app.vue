<script setup lang="ts">import { CNODE_USER_INFO } from './constants';

const theme = useTheme()
const userInfo = useUserInfo()

if (process.client && localStorage.getItem(CNODE_USER_INFO)) {
  userInfo.value = JSON.parse(localStorage.getItem(CNODE_USER_INFO))
}
</script>
<template>
  <van-config-provider :theme="theme.value">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </van-config-provider>
</template>
