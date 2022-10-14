<script setup lang="ts">
import { PropType } from 'vue';
import { IRecent } from '~~/interfaces';

const props = defineProps({
  item: {
    type: Object as PropType<IRecent>,
    default: () => ({}),
    required: true,
  }
})
function goTopic() {
  navigateTo(`/topic/${props.item.id}`)
}
function refresh() {
  navigateTo(`/user/${props.item.author.loginname}`, { replace: true })
}
</script>
<template>
  <section class="flex recent van-hairline--bottom" @click="goTopic">
    <img class="recent__avatar" v-lazy="item.author.avatar_url" @click.stop="refresh" />
    <div class="flex flex-col justify-between flex-1 recent__wrap">
      <div class="recent__title line-clamp-1">{{ item.title }}</div>
      <div class="flex items-center justify-between">
        <span class="recent__name">{{ item.author.loginname }}</span>
        <span class="recent__time">{{
        $getLastTimeStr(item.last_reply_at, true)
        }}</span>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.recent {
  padding: var(--cnode-padding-sm);

  &__wrap {
    width: 0;
  }

  &__avatar {
    width: 45px;
    height: 45px;
    margin-right: var(--cnode-padding-xs);
    border-radius: 50%;
    background-color: var(--cnode-background-gray);
  }

  &__title {
    font-size: var(--cnode-font-size-lg);
    font-weight: bold;
    color: var(--cnode-text-color);
  }

  &__name {
    color: var(--cnode-text-color-3);
  }

  &__time {
    font-size: var(--cnode-font-size-md);
    color: var(--cnode-text-color-3);
  }
}
</style>