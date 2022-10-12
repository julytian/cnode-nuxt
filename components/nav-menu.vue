<script setup lang="ts">
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
})

const show = ref(false)
const theme = useTheme()

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
        <NuxtLink v-if="showAdd">
          <i class="iconfont navbar__icon">&#xe60f;</i>
        </NuxtLink>
      </header>
    </van-sticky>
    <van-popup v-model:show="show" position="left" teleport="body">
      <div class="menu h-screen">
        <div class="menu__list van-hairline--top">
          <div class="iconfont icon-quanbu menu__item" @click="onMenuClick('/?tab=all')">全部</div>
          <div class="iconfont icon-hao menu__item" @click="onMenuClick('/?tab=good')">精华</div>
          <div class="iconfont icon-fenxiang menu__item" @click="onMenuClick('/?tab=share')">分享</div>
          <div class="iconfont icon-wenda menu__item" @click="onMenuClick('/?tab=ask')">问答</div>
          <div class="iconfont icon-zhaopin menu__item" @click="onMenuClick('/?tab=job')">招聘</div>
          <div class="iconfont icon-tianjia menu__item" @click="onMenuClick('/?tab=dev')">测试</div>
          <div class="iconfont icon-xiaoxi menu__item van-hairline--top" @click="onMenuClick('x')">消息</div>
          <div class="iconfont icon-about menu__item" @click="onMenuClick('x')">关于</div>
          <div class="iconfont icon-shezhi menu__item" @click="onMenuClick('x')">退出</div>
          <div class="iconfont icon-shezhi menu__item van-hairline--top" @click="toggleTheme">
            <span>主题切换</span>
            <img v-if="theme.value =='light'" src="https://b.yzcdn.cn/vant/dark-theme.svg" />
            <img v-else src="https://b.yzcdn.cn/vant/light-theme.svg" />
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

  &__list {
    margin: 0 24px;
    overflow: hidden;
    padding-top: 9%;
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
    }
  }
}
</style>