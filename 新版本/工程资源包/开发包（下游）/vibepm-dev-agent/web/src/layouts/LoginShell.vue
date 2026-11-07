<template>
  <div class="wa-layout wa-layout--site-login">
    <div class="wa-layout__login-bg" aria-hidden="true">
      <div class="wa-layout__login-bg-glow" />
      <div class="wa-layout__login-bg-aura" />
      <div class="wa-layout__login-bg-dots" />
    </div>
    <main class="wa-layout__login-main">
      <div class="wa-layout__login-card">
        <div class="wa-layout__login-head">
          <RouterLink class="wa-layout__login-logo" to="/" aria-label="Vibe Design">
            <span class="wa-layout__brand-mark" aria-hidden="true">
              <i class="fa-solid fa-layer-group" />
            </span>
          </RouterLink>
          <h1 class="wa-layout__login-title">{{ title }}</h1>
          <p class="wa-layout__login-lead">{{ lead }}</p>
        </div>
        <div class="wa-layout__login-fields">
          <slot />
        </div>
      </div>
      <RouterLink class="wa-layout__login-back" to="/">
        <i class="fa-light fa-arrow-left" aria-hidden="true" />
        <span>返回首页</span>
      </RouterLink>
    </main>
  </div>
</template>

<script setup lang="ts">
import '@/styles/layouts/login-shell.css'
defineOptions({ name: 'LoginShell' })

withDefaults(
  defineProps<{
    title?: string
    lead?: string
  }>(),
  {
    title: '欢迎回来',
    lead: '登录后即可进入工作台继续协作',
  },
)
</script>
