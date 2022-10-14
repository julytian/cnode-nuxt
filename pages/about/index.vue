<template>
  <div class="min-h-screen">
    <NavMenu title="关于" />
    <dl class="about">
      <dt>关于项目</dt>
      <dd class="van-hairline--bottom">
        该项目是基于cnodejs的api，采用nuxt3重写的webapp。
      </dd>

      <dt>预览地址</dt>
      <dd class="van-hairline--bottom">
        <a href="https://cnode-nuxt.vercel.app"
          >https://cnode-nuxt.vercel.app</a
        >
      </dd>

      <dt>源码地址</dt>
      <dd class="van-hairline--bottom">
        <a href="https://github.com/julytian/cnode-nuxt.git">
          https://github.com/julytian/cnode-nuxt.git</a
        >
      </dd>

      <dt>意见反馈</dt>
      <dd class="van-hairline--bottom">
        <a href="https://github.com/julytian/cnode-nuxt/issues">
          发表意见或者提需求</a
        >
      </dd>

      <dt>当前版本</dt>
      <dd>V1.0</dd>
    </dl>
  </div>
</template>
<style lang="scss">
.about {
  padding: var(--cnode-padding-xs) var(--cnode-padding-sm);

  dt {
    padding: 1em 0;
    font-weight: bold;
    color: var(--cnode-text-color);
    font-size: var(--cnode-font-size-lg);
  }

  dd {
    padding-bottom: var(--cnode-padding-sm);
    font-size: var(--cnode-font-size-md);
    color: var(--cnode-text-color);
  }

  a {
    color: var(--cnode-green);
  }
}
</style>
