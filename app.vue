<script setup lang="ts">
import type { ConfigProviderTheme } from 'vant';
import { CNODE_USER_INFO } from './constants';

const userInfo = useUserInfo();
const mode = computed(() => useTheme().value.value as ConfigProviderTheme);

if (process.client && localStorage.getItem(CNODE_USER_INFO)) {
  userInfo.value = JSON.parse(localStorage.getItem(CNODE_USER_INFO));
}
</script>
<template>
  <van-config-provider :theme="mode">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </van-config-provider>
</template>
