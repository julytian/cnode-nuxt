<script setup lang="ts">
import { showToast } from 'vant';
import { CNODE_USER_INFO } from '~~/constants';
const token = ref('');
const userInfo = useUserInfo();
const route = useRoute();
const redirectUrl = decodeURIComponent((route.query.redirect as string) || '/');

async function onSubmit() {
  if (!token.value) {
    showToast('令牌格式错误,应为36位UUID字符串');
    return;
  }
  const { data } = await useGetAccessToken(token.value);
  if (data) {
    Reflect.deleteProperty(data.value, 'success');
    const user = {
      ...data.value,
      token: token.value,
    };
    localStorage.setItem(CNODE_USER_INFO, JSON.stringify(user));
    userInfo.value = user;
    navigateTo(redirectUrl, { replace: true });
  }
}
</script>
<template>
  <div>
    <NavMenu title="登录" />
    <section class="login-info">
      <input
        v-model.trim="token"
        class="login-input"
        type="text"
        placeholder="请输入 Access Token"
        maxlength="36"
      />
      <div class="login-btn" @click="onSubmit">登录</div>
    </section>
  </div>
</template>
<style lang="scss">
.login-info {
  padding: calc(var(--cnode-padding-base) * 8)
    calc(var(--cnode-padding-base) * 3);
  background-color: var(--cnode-background);
}

.login-input {
  width: 100%;
  display: block;
  box-sizing: border-box;
  margin-top: calc(var(--cnode-padding-base) * 3);
  padding: var(--cnode-padding-sm);
  border: none;
  font-size: var(--cnode-font-size-md);
  color: var(--cnode-text-color-3);
  background-color: var(--cnode-background);
  border-bottom: 1px solid var(--cnode-border-color);
}

.login-btn {
  margin-top: calc(var(--cnode-padding-base) * 3);
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
</style>
