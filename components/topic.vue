<script setup lang="ts">
import { PropType } from 'vue';
import { ITopic } from '~~/interfaces/topic';

const props = defineProps({
  topic: {
    type: Object as PropType<ITopic>,
  }
})

function getTabInfo(tab: string, good: boolean, top: boolean, isClass: boolean) {
  return useGetTabInfo(tab, good, top, isClass);
}
function getLastTimeStr(time: Date, friendly: boolean) {
  return useGetLastTimeStr(time, friendly);
}
function onClick() {
  navigateTo(`/topic/${props.topic.id}`)
}
</script>
<template>
  <div class="topic van-hairline--bottom hover:opacity-60" @click="onClick">
    <h3 class="line-clamp-2 font-bold" :class="getTabInfo(topic.tab, topic.good, topic.top, true)"
      :title="getTabInfo(topic.tab, topic.good, topic.top, false)">
      {{ topic.title }}
    </h3>
    <div class="flex items-center content">
      <img class="avatar" v-lazy="topic.author.avatar_url" />
      <div class="flex-1">
        <p class="info">
          <span class="name">{{ topic.author.loginname }}</span>
          <span class="status" v-if="topic.reply_count">
            <b>{{ topic.reply_count }}</b>
            / {{ topic.visit_count }}
          </span>
        </p>
        <p class="info">
          <time>{{ getLastTimeStr(topic.create_at, true) }}</time>
          <time>{{ getLastTimeStr(topic.last_reply_at, true) }}</time>
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.topic {
  padding: calc(var(--cnode-padding-base) * 2) calc(var(--cnode-padding-base) * 3);
}

h3 {
  color: var(--cnode-text-color);
  font-size: var(--cnode-font-size-lg);

  &:before {
    content: attr(title);
    margin-right: calc(var(--cnode-padding-base) * 2);
    color: var(--cnode-white);
    padding: 2px 6px;
    font-size: 10px;
    font-weight: 400;
    border-radius: var(--cnode-radius-md);
    text-align: center;
    vertical-align: middle;
  }

  &.top:before {
    background: var(--cnode-red);
  }

  &.ask:before {
    background: var(--cnode-blue-2);
  }

  &.good:before {
    background: var(--cnode-orange);
  }

  &.job:before {
    background: var(--cnode-purple);
  }

  &.share:before {
    background: var(--cnode-green-2);
  }

  &.test:before {
    background: var(--cnode-green);
  }
}

.content {
  padding-top: var(--cnode-padding-base);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: calc(var(--cnode-padding-base) * 2);
  border: 1px solid var(--cnode-border-color);
  background-color: var(--cnode-background-gray);
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
  color: var(--cnode-text-color-3);
  font-size: var(--cnode-font-size-sm);

  b {
    font-size: var(--cnode-font-size-md);
    color: var(--cnode-green);
  }
}
</style>