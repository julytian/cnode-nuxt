<script setup lang="ts">
const route = useRoute();
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const page = ref(1);
const tab = computed(() => route.query?.tab ?? 'all');
const tabs = {
  all: '全部',
  good: '精华',
  share: '分享',
  ask: '问答',
  job: '招聘',
  dev: '测试',
};
const title = computed(() => tabs[tab.value as string]);
let locked = false;

const { data: list } = await useGetTopics(page.value, tab.value as string);

async function onLoad(isRefreshing = false) {
  if (locked) {
    return;
  }
  locked = true;
  if (refreshing.value) {
    list.value = [];
    refreshing.value = false;
  }
  if (isRefreshing) {
    page.value = 1;
  } else if (page.value === 1) {
    page.value = 2;
  }
  try {
    const topics = list.value;
    const { data, pending } = await useGetTopics(
      page.value,
      tab.value as string
    );
    if (!pending.value) {
      list.value = [...topics, ...data.value];
      page.value += 1;
      loading.value = false;
    }
    if (data.value.length === 0 && page.value > 1) {
      finished.value = true;
    }
  } finally {
    locked = false;
  }
}
function onRefresh() {
  refreshing.value = true;
  finished.value = false;
  loading.value = false;
  onLoad(true);
}

watch(tab, onRefresh);
</script>
<template>
  <div class="min-h-screen">
    <NavMenu :title="title" />
    <van-skeleton title :row="20" :loading="list.length === 0" class="skeleton">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <Topic v-for="topic in list" :key="topic.id" :topic="topic" />
        </van-list>
      </van-pull-refresh>
    </van-skeleton>
    <LazyBackTop />
  </div>
</template>
<style>
.skeleton {
  margin-top: calc(var(--cnode-padding-base) * 5);
}
</style>
