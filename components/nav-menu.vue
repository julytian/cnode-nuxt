<script setup lang="ts">import { CNODE_USER_INFO } from '~~/constants';

defineProps({
  title: {
    type: String,
    default: ""
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
})

const show = ref(false)
const theme = useTheme()
const userInfo = useUserInfo()
const route = useRoute()

function toggle() {
  show.value = !show.value
}
function onMenuClick(url: string) {
  toggle()
  navigateTo(url, { replace: true })
  window.scrollTo(0, 0)
}
function toggleTheme() {
  theme.value.preference = theme.value.value === 'dark' ? 'light' : 'dark'
  toggle()
}
function onUserClick() {
  if (userInfo.value.loginname) {
    navigateTo(`/user/${userInfo.value.loginname}`)
  } else {
    navigateTo(`/login?redirect=${encodeURIComponent(route.path)}`, { replace: true })
  }
}
function onSignup() {
  localStorage.removeItem(CNODE_USER_INFO)
  userInfo.value = {}
  navigateTo('/', { replace: true })
  toggle()
}
</script>
<template>
  <div>
    <van-sticky>
      <header class="flex items-center justify-between navbar">
        <van-icon v-if="showMenu" class="navbar__menu" name="bars" size="20" @click="toggle" />
        <div v-else class="navbar__blank"></div>
        <div class="navbar__title flex-1 text-center" v-text="title"></div>
        <slot />
        <NuxtLink v-if="showAdd" :to="`/topic/create?id=${topicId}`">
          <i class="iconfont navbar__icon">&#xe60f;</i>
        </NuxtLink>
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
              <span class="flex-1 menu__user-name line-clamp-1" v-text="userInfo.loginname"></span>
              <van-icon name="arrow" class="menu__user-arrow" />
            </template>
          </div>
        </div>
        <div class="menu__list van-hairline--top">
          <div class="iconfont icon-quanbu menu__item" @click="onMenuClick('/?tab=all')">全部</div>
          <div class="iconfont icon-hao menu__item" @click="onMenuClick('/?tab=good')">精华</div>
          <div class="iconfont icon-fenxiang menu__item" @click="onMenuClick('/?tab=share')">分享</div>
          <div class="iconfont icon-wenda menu__item" @click="onMenuClick('/?tab=ask')">问答</div>
          <div class="iconfont icon-zhaopin menu__item" @click="onMenuClick('/?tab=job')">招聘</div>
          <div class="iconfont icon-tianjia menu__item" @click="onMenuClick('/?tab=dev')">测试</div>
          <div class="iconfont icon-xiaoxi menu__item van-hairline--top" @click="onMenuClick('/message')">消息</div>
          <div class="iconfont icon-about menu__item" @click="onMenuClick('/about')">关于</div>
          <div v-if="userInfo.token" class="iconfont icon-shezhi menu__item" @click="onSignup">退出</div>
          <div class="iconfont icon-shezhi menu__item van-hairline--top" @click="toggleTheme">
            <span>主题切换</span>
            <img v-show="theme.value =='light'" src="https://b.yzcdn.cn/vant/dark-theme.svg" />
            <img v-show="theme.value =='dark'" src="https://b.yzcdn.cn/vant/light-theme.svg" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<style lang="scss">
.navbar {
  height: 44px;
  background-color: var(--cnode-background);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);

  &__menu {
    color: var(--cnode-menu);
    padding-left: 10px;
  }

  &__blank {
    width: 50px;
  }

  &__title {
    color: var(--cnode-text-color-3);
  }

  &__icon {
    color: var(--cnode-background-green);
    padding: 5px 15px;
    border-radius: var(--cnode-radius-md);
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

    img {
      display: inline-block;
      width: 25px;
      height: 25px;
      color: transparent;
      margin-left: var(--cnode-padding-xs);
    }
  }
}
</style>