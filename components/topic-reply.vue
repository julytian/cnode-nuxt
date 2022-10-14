<script setup lang="ts">
import { showToast } from 'vant';
import { PropType } from 'vue';
import { IAddReplyParams, IReply, ITopicDetail } from '~~/interfaces/topic';
const userInfo = useUserInfo()
const route = useRoute()
const showReply = ref(false)
const replyContent = ref('')
const replyId = ref('')

defineProps({
  topic: {
    type: Object as PropType<ITopicDetail>,
    default: () => ({})
  }
})
const emits = defineEmits(['refresh'])

function isUps(reply: IReply) {
  return reply.ups.findIndex((i) => i === userInfo.value.id) >= 0;
}
function handleHtmlContent(content: string) {
  return content.replace(/\/user\//, '#/user/');
}
async function onReplyUps(reply: IReply) {
  if (!userInfo.value.token) {
    showToast('您还没登录，请先登录~~')
    navigateTo(`/login?redirect=${encodeURIComponent(route.path)}`)
    return
  }
  const { data, error } = await useSetReplyUps(reply.id, userInfo.value.token)
  if (!error.value) {
    if (data.value.action === 'down') {
      const index = reply.ups.findIndex((i) => i === userInfo.value.id);
      reply.ups.splice(index, 1);
    } else {
      reply.ups.push(userInfo.value.id);
    }
  }
}
function onReply(reply: IReply) {
  if (!userInfo.value.token) {
    showToast('您还没登录，请先登录~~')
    navigateTo(`/login?redirect=${encodeURIComponent(route.path)}`)
    return
  }
  showReply.value = true
  replyId.value = reply.id
  replyContent.value = `@${reply.author.loginname}`
}
async function onReplySubmit() {
  if (!replyContent.value) {
    showToast('回复内容不能为空')
    return
  }
  const body: IAddReplyParams = {
    topic_id: route.params.id as string,
    accesstoken: userInfo.value.token,
    content: replyContent.value
  }
  if (replyId.value) {
    body.reply_id = replyId.value
  }
  const { data } = await useAddReply(body)
  if (data.value?.success) {
    emits('refresh')
    replyContent.value = ''
    replyId.value = ''
    showReply.value = false
  }
}
function onComment() {
  if (!userInfo.value.token) {
    showToast('您还没登录，请先登录~~')
    navigateTo(`/login?redirect=${encodeURIComponent(route.path)}`)
    return
  }
  showReply.value = true
  replyContent.value = ''
  replyId.value = ''
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
            $getLastTimeStr(item.create_at, true)
            }}
          </div>
          <span class="iconfont topic-reply__icon" :class="{ uped: isUps(item) }"
            @click="onReplyUps(item)">&#xe608;</span>
          <span class="topic-reply__ups">{{ item.ups.length }}</span>
          <span class="iconfont topic-reply__icon" @click="onReply(item)">&#xe609;</span>
        </div>
      </div>
      <div class="markdown-body topic-reply__content" v-html="handleHtmlContent(item.content)"></div>
    </template>
    <div class="fixed topic-comment text-center" @click="onComment">
      <van-icon name="comment-o" class="topic-comment__icon" />
    </div>
  </div>
  <van-popup v-model:show="showReply" round position="bottom">
    <div class="topic-reply__popup">
      <div class="van-hairline--surround">
        <van-field v-model="replyContent" rows="8" type="textarea" :border="false"
          placeholder="回复支持Markdown语法,请注意标记代码" />
      </div>
      <div class="topic-reply__popup-btn" @click="onReplySubmit">确定</div>
    </div>
  </van-popup>
</template>
<style lang="scss">
.topic-reply {
  &__hd {
    padding: calc(var(--cnode-padding-base) * 3);
    color: var(--cnode-text-color-3);
    font-size: var(--cnode-text-size-lg);

    strong {
      color: var(--cnode-green);
    }
  }

  &__user {
    padding: calc(var(--cnode-padding-base) * 2);
  }

  &__avatar {
    display: inline-block;
    width: calc(var(--cnode-padding-base) * 6);
    height: calc(var(--cnode-padding-base) * 6);
    margin-right: var(--cnode-padding-xs);
    border-radius: 50%;
    background-color: var(--cnode-background-gray);
  }

  &__info-content {
    font-size: var(--cnode-font-size-md);
    color: var(--cnode-text-color-3);
  }

  &__icon {
    font-size: 26px !important;
    color: var(--cnode-text-color-3);

    &.uped {
      color: var(--cnode-green);
    }
  }

  &__content {
    padding: 0 var(--cnode-padding-sm);
  }

  &__ups {
    margin: 0 var(--cnode-padding-base);
    color: var(--cnode-text-color-3);
  }

  &__popup {
    margin: var(--cnode-padding-md);

    &-btn {
      margin-top: var(--cnode-padding-md);
      margin-bottom: var(--cnode-padding-md);
      height: 42px;
      line-height: 42px;
      border-radius: var(--cnode-radius-md);
      color: var(--cnode-white);
      font-size: var(--cnode-font-size-lg);
      background-color: var(--cnode-green);
      border: none;
      text-align: center;
      vertical-align: middle;
    }
  }
}
.topic-comment {
  width: 50px;
  height: 50px;
  line-height: 70px;
  border-radius: 50%;
  right: 10px;
  bottom: 120px;
  z-index: 10;
  color: var(--cnode-comment);
  background: var(--cnode-green-2);
  &__icon {
    font-size: 35px!important;
  }
}
</style>