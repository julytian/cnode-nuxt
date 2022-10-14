<script setup lang="ts">
import { showImagePreview, showToast } from 'vant';
const route = useRoute();
const userInfo = useUserInfo();
const { data: topic, refresh } = await useGetTopic(route.params.id as string);

async function onCollect(isCollect: boolean) {
  const { data } = await useToggleCollect(
    userInfo.value.token,
    topic.value.id,
    !isCollect
  );
  if (data.value && data.value.success) {
    topic.value.is_collect = !isCollect;
    showToast(isCollect ? '取消收藏成功' : '收藏成功');
  }
}

onMounted(() => {
  window.scrollTo(0, 0);
  setTimeout(() =>{
    const imgs = document.querySelectorAll('#markdownBody img');
    const images: string[] = [];
    imgs.forEach((img, index) => {
      let url = img.getAttribute('src') as string;
      if (!url.startsWith('http')) {
        url = `https:${url}`;
      }
      images.push(url);
      img.addEventListener('click', () => {
        showImagePreview({
          images,
          startPosition: index,
          closeable: true,
          teleport: 'body',
        });
      });
    });
  },1000)
});
</script>
<template>
  <div>
    <NavMenu
      title="主题"
      :topic-id="topic.author_id === userInfo.id ? topic.id : ''"
    >
      <van-icon
        v-show="userInfo.token"
        name="like"
        class="topic-collect"
        :color="topic.is_collect ? '#e74c3c' : '#42b983'"
        @click="onCollect(topic.is_collect)"
      />
    </NavMenu>
    <div class="topic-detail">
      <h2 class="topic-title font-bold">{{ topic.title }}</h2>
      <TopicInfo :topic="topic" />
      <section
        id="markdownBody"
        class="markdown-body"
        v-html="topic.content"
      ></section>
    </div>
    <LazyTopicReply :topic="topic" @refresh="refresh" />
    <LazyBackTop />
  </div>
</template>
<style lang="scss">
.topic-detail {
  padding: calc(var(--cnode-padding-base) * 3);
}

.topic-title {
  padding: var(--cnode-padding-base);
  margin-bottom: calc(var(--cnode-padding-base) * 3);
  font-size: 18px;
  color: var(--cnode-text-color);
  line-height: 1.5;
  background-color: var(--cnode-background-2);
  border-radius: var(--cnode-radius-md);
}
.topic-collect {
  font-size: 20px!important;
  margin-right: var(--cnode-padding-xs);
}
</style>
