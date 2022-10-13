<script setup lang="ts">
import { PropType } from 'vue';
import { IMessageItem } from '~~/interfaces';

const props = defineProps({
  item: {
    type: Object as PropType<IMessageItem>,
    default: () => ({})
  }
})
function getLastTimeStr(time: Date, friendly: boolean) {
  return useGetLastTimeStr(time, friendly);
}
function goTopic() {
  navigateTo(`/topic/${props.item.topic.id}`)
}
</script>
<template>
  <section class="message markdown-body van-hairline--bottom">
    <div class="flex">
      <img class="message__avatar" v-lazy="item.author.avatar_url" />
      <p class="flex-1 message__title">
        <span>{{ item.author.loginname }}</span>
        <span v-if="item.type === 'at'">在回复中@了您</span>
        <span v-if="item.type === 'reply'">回复了您的话题</span>
      </p>
      <span class="message__time" v-text="getLastTimeStr(item.reply.create_at, true)"></span>
    </div>
    <div class="message__reply" v-html="item.reply.content"></div>
    <div class="message__topic" @click="goTopic">话题：{{ item.topic.title }}</div>
  </section>
</template>
<style lang="scss">
.message {
  padding: var(--cnode-padding-xs);

  &__avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: var(--cnode-padding-xs);
    background-color: var(--cnode-background-gray);
  }

  &__title {
    color: var(--cnode-text-color);
  }

  &__time {
    color: var(--cnode-text-color-3);
  }

  &__reply {
    margin-bottom: var(--cnode-padding-sm);
  }

  &__topic {
    padding: var(--cnode-padding-base);
    margin-bottom: var(--cnode-padding-xs);
    font-size: var(--cnode-font-size-lg);
    color: var(--cnode-text-color);
    background-color: var(--cnode-background-2);
    border-radius: var(--cnode-radius-md);
  }
}
</style>