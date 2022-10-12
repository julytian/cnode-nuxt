<script setup lang="ts">
const theme = useTheme()
</script>
<template>
  <van-config-provider :theme="theme.value">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </van-config-provider>
</template>
