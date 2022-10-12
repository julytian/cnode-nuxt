<script setup lang="ts">
const show = ref(false)
function onScroll() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    show.value = true;
  } else {
    show.value = false;
  }
}
function onBackTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
onMounted(() => {
  window.addEventListener('scroll', onScroll);
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
})
</script>
<template>
  <!-- 返回顶部 -->
  <ClientOnly>
    <div v-show="show" class="iconfont icon-top fixed" @click="onBackTop">&#xe611;</div>
  </ClientOnly>
</template>
<style lang="scss">
.icon-top {
  right: 10px;
  bottom: 50px;
  font-size: 50px!important;
  color: var(--cnode-background-green-2);
}
</style>