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

onLoad()

watch(tab, onRefresh)
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
    <BackTop />
  </div>
</template>
<style>
.skeleton {
  margin-top: 20px;
}
</style>