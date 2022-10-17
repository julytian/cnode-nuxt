<script setup lang="ts">
import { CNODE_USER_INFO } from '~~/constants';
type Theme = 'light' | 'dark';
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  showMenu: {
    type: Boolean,
    default: true,
  },
  showAdd: {
    type: Boolean,
    default: true,
  },
  topicId: {
    type: String,
    default: '',
  },
});

const show = ref(false);
const userInfo = useUserInfo();
const route = useRoute();

function toggle() {
  show.value = !show.value;
}
function onMenuClick(url: string) {
  toggle();
  navigateTo(url, { replace: true });
  window.scrollTo(0, 0);
}
function toggleTheme(newTheme: Theme) {
  useColorMode().preference = newTheme
  toggle();
}
function onUserClick() {
  if (userInfo.value.loginname) {
    navigateTo(`/user/${userInfo.value.loginname}`);
  } else {
    navigateTo(`/login?redirect=${encodeURIComponent(route.path)}`, {
      replace: true,
    });
  }
}
function onSignup() {
  localStorage.removeItem(CNODE_USER_INFO);
  userInfo.value = {};
  navigateTo('/', { replace: true });
  toggle();
}
function onCreateClick() {
  navigateTo(`/topic/create?id=${props.topicId}`);
}
</script>
<template>
  <div>
    <van-sticky>
      <header class="flex items-center justify-between navbar">
        <van-icon
          v-if="showMenu"
          class="navbar__menu"
          name="bars"
          @click="toggle"
        />
        <div v-else class="navbar__blank"></div>
        <div class="navbar__title flex-1 text-center" v-text="title"></div>
        <slot />
        <i v-if="showAdd" class="iconfont navbar__icon" @click="onCreateClick"
          >&#xe60f;</i
        >
      </header>
    </van-sticky>
    <van-popup v-model:show="show" position="left" teleport="body">
      <div class="menu h-screen">
        <div class="menu__user" @click="onUserClick">
          <div class="flex items-center">
            <template v-if="!userInfo.id">
              <van-icon name="user-o" size="20" />
              <span class="font-bold ml-7">登录</span>
            </template>
            <template v-else>
              <img class="menu__user-avatar" v-lazy="userInfo.avatar_url" />
              <span
                class="flex-1 menu__user-name line-clamp-1"
                v-text="userInfo.loginname"
              ></span>
              <van-icon name="arrow" class="menu__user-arrow" />
            </template>
          </div>
        </div>
        <div class="menu__list van-hairline--top">
          <div
            class="iconfont icon-quanbu menu__item"
            @click="onMenuClick('/?tab=all')"
          >
            全部
          </div>
          <div
            class="iconfont icon-hao menu__item"
            @click="onMenuClick('/?tab=good')"
          >
            精华
          </div>
          <div
            class="iconfont icon-fenxiang menu__item"
            @click="onMenuClick('/?tab=share')"
          >
            分享
          </div>
          <div
            class="iconfont icon-wenda menu__item"
            @click="onMenuClick('/?tab=ask')"
          >
            问答
          </div>
          <div
            class="iconfont icon-zhaopin menu__item"
            @click="onMenuClick('/?tab=job')"
          >
            招聘
          </div>
          <div
            class="iconfont icon-tianjia menu__item"
            @click="onMenuClick('/?tab=dev')"
          >
            测试
          </div>
          <div
            class="iconfont icon-xiaoxi menu__item van-hairline--top"
            @click="onMenuClick('/message')"
          >
            消息
          </div>
          <div
            class="iconfont icon-about menu__item"
            @click="onMenuClick('/about')"
          >
            关于
          </div>
          <div
            v-if="userInfo.token"
            class="iconfont icon-shezhi menu__item"
            @click="onSignup"
          >
            退出
          </div>
          <div
            class="iconfont icon-shezhi menu__item van-hairline--top"
            @click="toggleTheme($colorMode.preference == 'dark' ? 'light' : 'dark')"
          >
            <span>主题切换</span>
            <svg
              v-if="$colorMode.value == 'dark'"
              xmlns="http://www.w3.org/2000/svg"
              class="menu__item-btn"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="menu__item-btn"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<style lang="scss">
.navbar {
  padding: calc(var(--cnode-padding-base) * 1.5) var(--cnode-padding-xs);
  background-color: var(--cnode-background);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);

  &__menu {
    color: var(--cnode-menu);
    font-size: 20px !important;
  }

  &__blank {
    width: 50px;
  }

  &__title {
    color: var(--cnode-text-color-3);
    font-size: var(--cnode-font-size-lg);
  }

  &__icon {
    color: var(--cnode-background-green);
    font-size: 20px !important;
  }
}

.menu {
  width: 200px;
  background-color: var(--cnode-background);
  color: var(--cnode-text-color);

  &__user {
    padding: var(--cnode-padding-md) var(--cnode-padding-lg);
    font-size: var(--cnode-font-size-lg);
    color: var(--cnode-text-color-3);

    &-avatar {
      width: 30px;
      height: 30px;
      background-color: var(--cnode-background-gray);
      border-radius: 50%;
    }

    &-name {
      margin-left: var(--cnode-padding-xs);
      max-width: 100px;
      font-size: var(--cnode-font-size-lg);
    }

    &-arrow {
      width: var(--cnode-padding-md);
      height: var(--cnode-padding-md);
    }
  }

  &__list {
    margin: 0 var(--cnode-padding-lg);
    overflow: hidden;
  }

  &__item {
    display: block;
    font-size: var(--cnode-font-size-md);
    padding: 9% 0;
    text-indent: 1px;
    font-weight: bold;
    color: var(--cnode-text-color-3);

    &:last-child {
      margin-bottom: 50px;
    }

    &::before {
      color: var(--cnode-text-color-3);
    }

    &-btn {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-left: var(--cnode-padding-xs);
    }
  }
}
</style>
