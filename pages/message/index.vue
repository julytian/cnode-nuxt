<script setup lang="ts">import { IMessage } from '~~/interfaces';
const active = ref(0)
const message = ref({} as IMessage)
const show = ref(false)

async function init() {
  const { data } = await useGetMessages()
  message.value = data.value
  show.value = true
}
init()
definePageMeta({
  middleware: ['auth']
})
</script>
<template>
  <div>
    <NavMenu title="消息" />
    <van-tabs v-if="show" v-model:active="active" sticky>
      <van-tab title="已读消息">
        <van-empty v-if="message.has_read_messages && message.has_read_messages.length === 0" description="暂无数据" />
        <template v-else>
          <MessageItem v-for="item in message.has_read_messages" :key="item.id" :item="item" />
        </template>
      </van-tab>
      <van-tab title="未读消息">
        <van-empty v-if="message.hasnot_read_messages && message.hasnot_read_messages.length === 0"
          description="暂无数据" />
        <template v-else>
          <MessageItem v-for="item in message.hasnot_read_messages" :key="item.id" :item="item" />
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>