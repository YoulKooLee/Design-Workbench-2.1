<template>
  <LoginShell>
    <div
      class="wa-layout__login-field"
      :class="{ 'is-error': !!userNameError }"
      @focusin="clearUserError"
    >
      <label class="wa-layout__login-label" for="login-user">登录账号</label>
      <a-input
        id="login-user"
        v-model="userName"
        placeholder="请输入登录账号"
        :error="!!userNameError"
        allow-clear
        @input="clearUserError"
        @clear="clearUserError"
        @press-enter="onSubmit"
      >
        <template #prefix>
          <i class="fa-light fa-user" aria-hidden="true" />
        </template>
      </a-input>
      <p v-if="userNameError" class="wa-layout__login-error">{{ userNameError }}</p>
    </div>

    <div
      class="wa-layout__login-field wa-layout__login-field--pwd"
      :class="{ 'is-error': !!passwordError }"
      @focusin="clearPwdError"
    >
      <label class="wa-layout__login-label" for="login-password">登录密码</label>
      <a-input-password
        id="login-password"
        v-model="password"
        placeholder="请输入登录密码"
        :error="!!passwordError"
        allow-clear
        @input="clearPwdError"
        @clear="clearPwdError"
        @press-enter="onSubmit"
      >
        <template #prefix>
          <i class="fa-light fa-lock-keyhole" aria-hidden="true" />
        </template>
      </a-input-password>
      <p v-if="passwordError" class="wa-layout__login-error">{{ passwordError }}</p>
    </div>

    <div class="wa-layout__login-actions">
      <a-checkbox v-model="remember">记住密码</a-checkbox>
      <button type="button" class="wa-layout__login-forget" @click="openForget">
        忘记密码
      </button>
    </div>

    <a-button
      type="primary"
      long
      class="wa-layout__login-submit"
      :loading="loading"
      @click="onSubmit"
    >
      <i class="fa-regular fa-arrow-right-to-bracket" aria-hidden="true" />
      <span>登录</span>
    </a-button>
    <a-button type="text" long class="wa-layout__login-register" @click="openRegister">
      注册账号
    </a-button>

    <div class="wa-layout__login-social">
      <p class="wa-layout__login-social-label">其它登录方式</p>
      <div class="wa-layout__login-social-list" role="group" aria-label="其它登录方式">
        <button
          v-for="item in socialLogins"
          :key="item.key"
          type="button"
          class="wa-layout__login-social-btn"
          :class="'is-' + item.key"
          :aria-label="item.label"
          @click="onSocial(item.label)"
        >
          <i :class="['fa-brands', item.icon]" aria-hidden="true" />
        </button>
      </div>
    </div>
  </LoginShell>

  <a-modal
    v-model:visible="forgetVisible"
    title="重置密码"
    title-align="start"
    :width="420"
    unmount-on-close
    modal-class="pro-content-modal"
    @cancel="forgetVisible = false"
  >
    <a-form :model="forgetForm" layout="vertical" class="mc-form">
      <a-form-item
        label="邮箱"
        required
        :validate-status="forgetErrors.email ? 'error' : undefined"
        :help="forgetErrors.email || undefined"
      >
        <a-input
          v-model="forgetForm.email"
          class="wa-layout__login-email"
          placeholder="请输入邮箱"
          allow-clear
          @input="forgetErrors.email = ''"
        >
          <template #suffix>
            <a-button
              type="text"
              size="mini"
              class="wa-layout__login-send"
              :disabled="forgetCountdown > 0"
              @click="sendForgetCode"
            >
              {{ forgetCodeBtn }}
            </a-button>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="验证码"
        required
        :validate-status="forgetErrors.code ? 'error' : undefined"
        :help="forgetErrors.code || undefined"
      >
        <a-verification-code
          v-model="forgetForm.code"
          class="wa-input-otp"
          :length="6"
          @change="forgetErrors.code = ''"
        />
      </a-form-item>
      <a-form-item
        label="新密码"
        required
        :validate-status="forgetErrors.password ? 'error' : undefined"
        :help="forgetErrors.password || undefined"
      >
        <a-input-password
          v-model="forgetForm.password"
          placeholder="至少 6 位"
          allow-clear
          @input="forgetErrors.password = ''"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
        required
        :validate-status="forgetErrors.confirm ? 'error' : undefined"
        :help="forgetErrors.confirm || undefined"
      >
        <a-input-password
          v-model="forgetForm.confirm"
          placeholder="请再次输入密码"
          allow-clear
          @input="forgetErrors.confirm = ''"
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button type="primary" shape="round" :loading="forgetSubmitting" @click="submitForget">
        确认重置
      </a-button>
      <a-button type="secondary" shape="round" @click="forgetVisible = false">取消</a-button>
    </template>
  </a-modal>

  <a-modal
    v-model:visible="registerVisible"
    title="注册账号"
    title-align="start"
    :width="420"
    unmount-on-close
    modal-class="pro-content-modal"
    @cancel="registerVisible = false"
  >
    <a-form :model="registerForm" layout="vertical" class="mc-form">
      <a-form-item
        label="用户名"
        required
        :validate-status="registerErrors.userName ? 'error' : undefined"
        :help="registerErrors.userName || undefined"
      >
        <a-input
          v-model="registerForm.userName"
          placeholder="请输入用户名"
          allow-clear
          @input="registerErrors.userName = ''"
        />
      </a-form-item>
      <a-form-item
        label="邮箱"
        required
        :validate-status="registerErrors.email ? 'error' : undefined"
        :help="registerErrors.email || undefined"
      >
        <a-input
          v-model="registerForm.email"
          class="wa-layout__login-email"
          placeholder="请输入邮箱"
          allow-clear
          @input="registerErrors.email = ''"
        >
          <template #suffix>
            <a-button
              type="text"
              size="mini"
              class="wa-layout__login-send"
              :disabled="registerCountdown > 0"
              @click="sendRegisterCode"
            >
              {{ registerCodeBtn }}
            </a-button>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="验证码"
        required
        :validate-status="registerErrors.code ? 'error' : undefined"
        :help="registerErrors.code || undefined"
      >
        <a-verification-code
          v-model="registerForm.code"
          class="wa-input-otp"
          :length="6"
          @change="registerErrors.code = ''"
        />
      </a-form-item>
      <a-form-item
        label="密码"
        required
        :validate-status="registerErrors.password ? 'error' : undefined"
        :help="registerErrors.password || undefined"
      >
        <a-input-password
          v-model="registerForm.password"
          placeholder="至少 6 位"
          allow-clear
          @input="registerErrors.password = ''"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
        required
        :validate-status="registerErrors.confirm ? 'error' : undefined"
        :help="registerErrors.confirm || undefined"
      >
        <a-input-password
          v-model="registerForm.confirm"
          placeholder="请再次输入密码"
          allow-clear
          @input="registerErrors.confirm = ''"
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button
        type="primary"
        shape="round"
        :loading="registerSubmitting"
        @click="submitRegister"
      >
        立即注册
      </a-button>
      <a-button type="secondary" shape="round" @click="registerVisible = false">取消</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import LoginShell from '@/layouts/LoginShell.vue'
import { login } from '@/api/auth'
import { setToken, setUserName } from '@/utils/auth'

defineOptions({ name: 'LoginPage' })

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEMO_CODE = '123456'
const CODE_COUNTDOWN = 60

const router = useRouter()
const userName = ref('admin')
const password = ref('123456')
const remember = ref(true)
const loading = ref(false)
const userNameError = ref('')
const passwordError = ref('')

const socialLogins = [
  { key: 'wechat', label: '微信', icon: 'fa-weixin' },
  { key: 'qq', label: 'QQ', icon: 'fa-qq' },
  { key: 'alipay', label: '支付宝', icon: 'fa-alipay' },
]

const forgetVisible = ref(false)
const registerVisible = ref(false)
const forgetForm = reactive({ email: '', code: '', password: '', confirm: '' })
const registerForm = reactive({
  userName: '',
  email: '',
  code: '',
  password: '',
  confirm: '',
})
const forgetErrors = reactive({
  email: '',
  code: '',
  password: '',
  confirm: '',
  userName: '',
})
const registerErrors = reactive({
  email: '',
  code: '',
  password: '',
  confirm: '',
  userName: '',
})
const forgetCountdown = ref(0)
const registerCountdown = ref(0)
const forgetCodeSent = ref(false)
const registerCodeSent = ref(false)
const forgetSubmitting = ref(false)
const registerSubmitting = ref(false)
let forgetTimer: number | null = null
let registerTimer: number | null = null

const forgetCodeBtn = computed(() =>
  forgetCountdown.value > 0
    ? `${forgetCountdown.value}S`
    : forgetCodeSent.value
      ? '重新发送'
      : '发送验证码',
)
const registerCodeBtn = computed(() =>
  registerCountdown.value > 0
    ? `${registerCountdown.value}S`
    : registerCodeSent.value
      ? '重新发送'
      : '发送验证码',
)

function clearUserError() {
  userNameError.value = ''
}
function clearPwdError() {
  passwordError.value = ''
}

function clearTimer(kind: 'forget' | 'register') {
  if (kind === 'forget' && forgetTimer) {
    clearInterval(forgetTimer)
    forgetTimer = null
    forgetCountdown.value = 0
  }
  if (kind === 'register' && registerTimer) {
    clearInterval(registerTimer)
    registerTimer = null
    registerCountdown.value = 0
  }
}

function startCountdown(kind: 'forget' | 'register') {
  clearTimer(kind)
  const count = kind === 'forget' ? forgetCountdown : registerCountdown
  count.value = CODE_COUNTDOWN
  const timer = window.setInterval(() => {
    if (count.value <= 1) {
      clearTimer(kind)
      return
    }
    count.value -= 1
  }, 1000)
  if (kind === 'forget') forgetTimer = timer
  else registerTimer = timer
}

function emailErr(email: string) {
  const value = String(email || '').trim()
  if (!value) return '请输入邮箱'
  if (!EMAIL_RE.test(value)) return '请输入正确的邮箱地址'
  return ''
}
function codeErr(sent: boolean, code: string) {
  const value = String(code || '').replace(/\s/g, '')
  if (!sent) return '请先发送验证码'
  if (!value) return '请输入验证码'
  if (value.length < 6) return '请输入 6 位验证码'
  if (value !== DEMO_CODE) return '验证码错误，演示码为 123456'
  return ''
}
function pwdErr(pwd: string) {
  const value = String(pwd || '')
  if (!value) return '请输入密码'
  if (value.length < 6) return '密码至少 6 位'
  return ''
}
function confirmErr(pwd: string, confirm: string) {
  if (!String(confirm || '')) return '请再次输入密码'
  if (String(pwd || '') !== String(confirm || '')) return '两次密码不一致'
  return ''
}

async function onSubmit() {
  const name = userName.value.trim()
  const pwd = password.value
  userNameError.value = name ? '' : '用户名不能为空'
  passwordError.value = pwd ? '' : '密码不能为空'
  if (userNameError.value || passwordError.value) return

  loading.value = true
  try {
    const res = await login({ userName: name, password: pwd })
    if (res.code !== 200) {
      if (name !== 'admin') userNameError.value = '用户名不正确'
      if (pwd !== '123456') passwordError.value = '密码不正确'
      if (!userNameError.value && !passwordError.value) {
        passwordError.value = res.message || '登录失败'
      }
      return
    }
    if (res.data?.token) setToken(res.data.token)
    setUserName(res.data?.userName || name)
    Message.success('登录成功')
    const redirect = typeof router.currentRoute.value.query.redirect === 'string'
      ? router.currentRoute.value.query.redirect
      : '/app'
    await router.push(redirect || '/app')
  } catch (err) {
    passwordError.value =
      err instanceof Error && err.message ? err.message : '登录失败'
  } finally {
    loading.value = false
  }
}

function onSocial(label: string) {
  Message.info(`示意：${label}登录（未接入真实授权）`)
}

function openForget() {
  Object.assign(forgetForm, { email: '', code: '', password: '', confirm: '' })
  Object.assign(forgetErrors, {
    email: '',
    code: '',
    password: '',
    confirm: '',
    userName: '',
  })
  forgetCodeSent.value = false
  clearTimer('forget')
  forgetVisible.value = true
}

function openRegister() {
  Object.assign(registerForm, {
    userName: '',
    email: '',
    code: '',
    password: '',
    confirm: '',
  })
  Object.assign(registerErrors, {
    email: '',
    code: '',
    password: '',
    confirm: '',
    userName: '',
  })
  registerCodeSent.value = false
  clearTimer('register')
  registerVisible.value = true
}

function sendForgetCode() {
  if (forgetCountdown.value > 0) return
  const err = emailErr(forgetForm.email)
  forgetErrors.email = err
  if (err) return
  forgetCodeSent.value = true
  startCountdown('forget')
  Message.success('验证码已发送（演示码：123456）')
}

function sendRegisterCode() {
  if (registerCountdown.value > 0) return
  const err = emailErr(registerForm.email)
  registerErrors.email = err
  if (err) return
  registerCodeSent.value = true
  startCountdown('register')
  Message.success('验证码已发送（演示码：123456）')
}

function submitForget() {
  const errors = {
    email: emailErr(forgetForm.email),
    code: codeErr(forgetCodeSent.value, forgetForm.code),
    password: pwdErr(forgetForm.password),
    confirm: confirmErr(forgetForm.password, forgetForm.confirm),
  }
  Object.assign(forgetErrors, errors)
  if (Object.values(errors).some(Boolean)) return
  forgetSubmitting.value = true
  setTimeout(() => {
    forgetSubmitting.value = false
    clearTimer('forget')
    forgetVisible.value = false
    Message.success('密码已重置（示意）')
  }, 400)
}

function submitRegister() {
  const errors = {
    userName: String(registerForm.userName || '').trim() ? '' : '请输入用户名',
    email: emailErr(registerForm.email),
    code: codeErr(registerCodeSent.value, registerForm.code),
    password: pwdErr(registerForm.password),
    confirm: confirmErr(registerForm.password, registerForm.confirm),
  }
  Object.assign(registerErrors, errors)
  if (Object.values(errors).some(Boolean)) return
  registerSubmitting.value = true
  setTimeout(() => {
    registerSubmitting.value = false
    userName.value = registerForm.userName
    password.value = ''
    clearTimer('register')
    registerVisible.value = false
    Message.success('注册成功，请登录（示意）')
  }, 400)
}

onBeforeUnmount(() => {
  clearTimer('forget')
  clearTimer('register')
})
</script>
