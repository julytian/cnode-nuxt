<script setup lang="ts">
import { IUser } from '~~/interfaces';

const route = useRoute();
const user = ref({} as IUser);
const collects = ref([]);
const active = ref(0);
const show = ref(false);

async function init(loginname: string) {
  const { data: userInfo } = await useGetUserInfo(loginname);
  const { data: collectList } = await useGetTopicCollect(loginname);
  user.value = userInfo.value;
  collects.value = collectList.value;
  show.value = true;
}

init(route.params.name as string);

watch(() => route.params, init);
definePageMeta({
  middleware: ['auth'],
});
</script>
<template>
  <div class="min-h-screen">
    <NavMenu title="用户信息" />
    <section class="flex flex-col items-center user">
      <img v-lazy="user.avatar_url" class="user__avatar" />
      <div class="user__name">{{ user.loginname }}</div>
      <div class="flex item-center justify-around w-full">
        <span
          v-if="user.create_at"
          v-text="$getLastTimeStr(user.create_at, false)"
        ></span>
        <span v-if="user.score" class="user__score"
          >积分: {{ user.score }}</span
        >
      </div>
    </section>
    <van-tabs v-if="show" v-model:active="active" sticky>
      <van-tab title="最近回复">
        <van-empty
          v-if="user.recent_replies && user.recent_replies.length === 0"
          description="暂无数据"
        />
        <template v-else>
          <RecentItem
            v-for="item in user.recent_replies"
            :key="item.id"
            :item="item"
          />
        </template>
      </van-tab>
      <van-tab title="最新发布">
        <van-empty
          v-if="user.recent_topics && user.recent_topics.length === 0"
          description="暂无数据"
        />
        <template v-else>
          <RecentItem
            v-for="item in user.recent_topics"
            :key="item.id"
            :item="item"
          />
        </template>
      </van-tab>
      <van-tab title="用户收藏">
        <van-empty
          v-if="collects && collects.length === 0"
          description="暂无数据"
        />
        <template v-else>
          <RecentItem v-for="item in collects" :key="item.id" :item="item" />
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>
<style lang="scss">
.user {
  height: 180px;
  color: var(--cnode-text-color);
  background-color: var(--cnode-background-2);

  &__avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-top: var(--cnode-padding-sm);
    background-color: var(--cnode-background-gray);
  }

  &__name {
    margin: var(--cnode-padding-xs) 0;
  }

  &__score {
    color: var(--cnode-green);
    padding-bottom: var(--cnode-padding-sm);
  }
}
</style>
