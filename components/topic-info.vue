
<script setup lang="ts">
import { PropType } from 'vue';
import { ITopicDetail } from '~~/interfaces/topic';

defineProps({
  topic: {
    type: Object as PropType<ITopicDetail>,
    default: () => ({})
  }
})
function getTabInfo(tab: string, good: boolean, top: boolean, isClass: boolean) {
  return useGetTabInfo(tab, good, top, isClass);
}
</script>
<template>
  <section class="flex items-center topic-info">
    <img v-if="topic.author" class="block topic-info__avatar" v-lazy="topic.author.avatar_url" />
    <div class="flex-1">
      <span v-if="topic.author">{{ topic.author.loginname }}</span>
      <time> 发布于：{{ $getLastTimeStr(topic.create_at, true) }} </time>
    </div>
    <div class="text-right">
      <span class="topic-info__tag" :class="getTabInfo(topic.tab, topic.good, topic.top, true)"
        v-text="getTabInfo(topic.tab, topic.good, topic.top, false)">
      </span>
      <span class="block topic-info__visit">{{ topic.visit_count }}次浏览</span>
    </div>
  </section>
</template>
<style lang="scss">
.topic-info {
  padding-top: 0;
  padding-bottom: 0;
  color: var(--cnode-text-color-3);
  font-size: var(--cnode-font-size-sm);

  span,
  time {
    display: block;
    padding: var(--cnode-padding-base) 0;
  }

  &__avatar {
    width: 40px;
    height: 40px;
    margin-right: var(--cnode-padding-md);
    border-radius: 50%;
    background-color: var(--cnode-background-gray);
  }

  &__tag {
    padding: 5px 6px;
    font-size: var(--cnode-font-size-xs);
    font-weight: 400;
    border-radius: var(--cnode-radius-md);
    background-color: #e7e7e7;
    color: var(--cnode-white);
    text-align: center;
    vertical-align: middle;

    &.top {
      background: var(--cnode-red);
    }

    &.ask {
      background: var(--cnode-blue-2);
    }

    &.good {
      background: var(--cnode-orange);
    }

    &.job {
      background: var(--cnode-purple);
    }

    &.share {
      background: var(--cnode-green-2);
    }

    &.test {
      background: var(--cnode-green);
    }
  }

  &__visit {
    padding: var(--cnode-padding-base) 0;
  }
}
</style>