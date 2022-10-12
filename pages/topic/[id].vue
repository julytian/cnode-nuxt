<script setup lang="ts">
const route = useRoute()
const { data: topic } = await useGetTopic(route.params.id as string)
</script>
<template>
  <div>
    <NavMenu title="主题" />
    <div class="topic-detail">
      <h2 class="topic-title font-bold">{{ topic.title }}</h2>
      <TopicInfo :topic="topic" />
      <section
        class="markdown-body"
        v-html="topic.content"
      ></section>
    </div>
    <TopicReply :topic="topic" />
    <BackTop />
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
  color: var(--cnode-text-color-3);
  line-height: 1.5;
  background-color: var(--cnode-background-2);
  border-radius: var(--cnode-radius-md);
}
</style>