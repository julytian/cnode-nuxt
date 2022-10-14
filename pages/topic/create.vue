<script setup lang="ts">
import { showToast } from 'vant';
import { IUpdateTopicParams } from '~~/interfaces';

const route = useRoute();
const router = useRouter();
const userInfo = useUserInfo();
const topicId = computed(() => route.query.id);
const title = computed(() => (topicId.value ? '编辑主题' : '添加主题'));
const btnText = computed(() => (topicId.value ? '更新' : '发布'));
const topic = reactive({
  tab: 'dev',
  options: [
    { text: '测试', value: 'dev' },
    { text: '分享', value: 'share' },
    { text: '问答', value: 'ask' },
    { text: '招聘', value: 'job' },
  ],
  title: '',
  content: '',
});

async function onSubmit() {
  if (!topic.title) {
    showToast('标题不能为空');
    return;
  }
  if (!topic.content) {
    showToast('内容不能为空');
    return;
  }
  const body: IUpdateTopicParams = {
    accesstoken: userInfo.value.token,
    title: topic.title,
    tab: topic.tab,
    content: topic.content,
  };
  if (topicId.value) {
    body.topic_id = topicId.value as string;
  }
  const { data } = await useUpdateTopic(body, !!topicId.value);
  if (data.value) {
    if (topicId.value) {
      showToast('更新成功');
      router.back();
    } else {
      showToast('发布成功');
      navigateTo(`/?tab=${topic.tab}`);
    }
  }
}
function onClear() {
  topic.title = '';
}

watchEffect(async () => {
  if (topicId.value) {
    const { data } = await useGetTopic(
      topicId.value as string,
      false,
      userInfo.value.token
    );
    if (data.value) {
      topic.title = data.value.title;
      topic.content = data.value.content;
      topic.tab = data.value.tab;
    }
  }
});
definePageMeta({
  middleware: ['auth'],
});
</script>
<template>
  <div>
    <NavMenu :title="title" :show-add="false">
      <div class="topic-add__btn" @click="onSubmit">{{ btnText }}</div>
    </NavMenu>
    <div class="flex items-center van-hairline--bottom topic-add">
      <span>选择分类：</span>
      <div class="flex-1">
        <van-dropdown-menu>
          <van-dropdown-item v-model="topic.tab" :options="topic.options" />
        </van-dropdown-menu>
      </div>
    </div>
    <div class="topic-add__title van-hairline--surround">
      <van-field
        v-model.trim="topic.title"
        clearable
        maxlength="100"
        placeholder="标题，字数10字以上"
        @clear="onClear"
      />
    </div>
    <div class="topic-add__content">
      <van-field
        v-model="topic.content"
        rows="20"
        type="textarea"
        placeholder="回复支持Markdown语法,请注意标记代码"
      />
    </div>
  </div>
</template>
<style lang="scss">
.topic-add {
  padding: var(--cnode-padding-xs);
  font-size: var(--cnode-font-size-md);
  color: var(--cnode-text-color);

  &__btn {
    color: var(--cnode-white);
    background-color: var(--cnode-green);
    padding: var(--cnode-padding-base) var(--cnode-padding-sm);
    border-radius: var(--cnode-radius-md);
    margin-right: var(--cnode-padding-xs);
    font-size: var(--cnode-font-size-md);
  }
}

.van-dropdown-menu__bar {
  height: 30px !important;
}

.topic-add__title .van-cell {
  padding: var(--cnode-padding-xs) !important;
}

.topic-add__content {
  margin: var(--cnode-padding-xs) !important;

  .van-cell {
    border: 1px solid var(--cnode-border-color);
  }
}
</style>
