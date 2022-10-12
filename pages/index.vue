<script setup lang="ts">
import { ITopic } from '~~/interfaces/topic';

const route = useRoute()
const list = ref<ITopic[]>([])
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const page = ref(1)
const skeletonLoading = ref(true)
const tab = computed(() => route.query?.tab ?? 'all')
const tabs = {
  all: '全部',
  good: '精华',
  share: '分享',
  ask: '问答',
  job: '招聘',
  dev: '测试',
}
const title = computed(() => tabs[tab.value as string])
const show = ref(false)
let locked = false;

async function onLoad() {
  if (locked) {
    return
  }
  locked = true
  if (refreshing.value) {
    list.value = []
    refreshing.value = false
  }
  const { data, pending } = await useGetTopics(page.value, tab.value as string)
  skeletonLoading.value = pending.value
  list.value = [...list.value, ...data.value]
  loading.value = false
  if (!pending.value) {
    page.value += 1
    locked = false
  }
  if (data.value.length === 0 && page.value > 1) {
    finished.value = true
  }
}
function onRefresh() {
  skeletonLoading.value = true
  refreshing.value = true
  finished.value = false
  loading.value = false
  page.value = 1
  onLoad()
}
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
onLoad()

watch(tab, onRefresh)
onMounted(() => {
  window.addEventListener('scroll', onScroll);
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
})
</script>
<template>
  <div class="min-h-screen">
    <NavMenu :title="title" />
    <ClientOnly>
      <van-skeleton title :row="20" :loading="skeletonLoading" class="skeleton">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model:loading="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了"
            @load="onLoad">
            <Topic v-for="topic in list" :key="topic.id" :topic="topic" />
          </van-list>
        </van-pull-refresh>
      </van-skeleton>
    </ClientOnly>
    <!-- 返回顶部 -->
    <ClientOnly>
      <div v-show="show" class="iconfont icon-top fixed" @click="onBackTop">&#xe611;</div>
    </ClientOnly>
  </div>
</template>
<style>
.skeleton {
  margin-top: 20px;
}

.icon-top {
  right: 10px;
  bottom: 50px;
  font-size: 50px;
  color: var(--cnode-background-green-2);
}
</style>