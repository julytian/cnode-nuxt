<script setup lang="ts">
import { PropType } from 'vue';
import { IReply, ITopicDetail } from '~~/interfaces/topic';

defineProps({
  topic: {
    type: Object as PropType<ITopicDetail>,
    default: () => ({})
  }
})
function getLastTimeStr(time: Date, friendly: boolean) {
  return useGetLastTimeStr(time, friendly);
}
function isUps(reply: IReply) {
  return reply.ups.findIndex((i) => i === '1') >= 0;
}
function handleHtmlContent(content: string) {
  return content.replace(/\/user\//, '#/user/');
}
</script>
<template>
  <div>
    <div class="topic-reply__hd van-hairline--top" v-if="topic.reply_count >= 0">
      <strong>{{ topic.reply_count }}</strong> 回复
    </div>
    <template v-for="item in topic.replies" :key="item.id">
      <div class="flex items-center topic-reply__user van-hairline--top">
        <img class="topic-reply__avatar" v-lazy="item.author.avatar_url" />
        <div class="flex items-center flex-1">
          <div class="flex-1 topic-reply__info-content">
            {{ item.author.loginname }} 发布于：{{
            getLastTimeStr(item.create_at, true)
            }}
          </div>
          <span class="iconfont topic-reply__icon" :class="{ uped: isUps(item) }">&#xe608;</span>
          <span class="topic-reply__ups">{{ item.ups.length }}</span>
          <span class="iconfont topic-reply__icon">&#xe609;</span>
        </div>
      </div>
      <div class="markdown-body topic-reply__content" v-html="handleHtmlContent(item.content)"></div>
    </template>
  </div>
</template>
<style lang="scss">
.topic-reply__hd {
  padding: calc(var(--cnode-padding-base) * 3);
  color: var(--cnode-text-color-3);
  font-size: var(--cnode-text-size-lg);

  strong {
    color: var(--cnode-green);
  }
}

.topic-reply__user {
  padding: calc(var(--cnode-padding-base) * 2);
}

.topic-reply__avatar {
  display: inline-block;
  width: calc(var(--cnode-padding-base) * 6);
  height: calc(var(--cnode-padding-base) * 6);
  margin-right: calc(var(--cnode-padding-base) * 2);
  border-radius: 50%;
  background-color: var(--cnode-background-gray);
}

.topic-reply__info-content {
  font-size: var(--cnode-font-size-md);
  color: var(--cnode-text-color);
}

.topic-reply__icon {
  font-size: 26px!important;

  &.uped {
    color: var(--cnode-green);
  }
}

.topic-reply__content {
  padding: 0 calc(var(--cnode-padding-base) * 3);
}

.topic-reply__ups {
  margin: 0 var(--cnode-padding-base);
}
</style>