<template>
  <div ref="coverRef" class="login-container login-container--cover">
    <div class="login-content">
      <div class="login-form-wrapper login-form-card">
        <div class="login-logo">
          <span class="pro-logo-mark" aria-hidden="true">
            <icon-logo class="pro-logo-mark-icon" />
          </span>
          <span class="login-logo-text">Vibe Design Pro</span>
        </div>
        <div class="login-form-title">账号登录</div>
        <div class="login-form-sub-title">开箱即用的中后台交付解决方案</div>
        <div class="login-form-fields">
          <div
            class="login-form-field login-form-field--user"
            :class="{ 'is-error': !!userNameError }"
            @focusin="onUserNameFocus"
          >
            <a-input
              v-model="userName"
              placeholder="请输入登录账号"
              :error="!!userNameError"
              allow-clear
              @input="onUserNameInput"
              @clear="onUserNameInput"
              @press-enter="handleSubmit"
            >
              <template #prefix>
                <icon-user class="pro-fa-icon" />
              </template>
            </a-input>
            <div v-if="userNameError" class="login-form-field-error">
              {{ userNameError }}
            </div>
          </div>
          <div
            class="login-form-field login-form-field--password"
            :class="{ 'is-error': !!passwordError }"
            @focusin="onPasswordFocus"
          >
            <a-input-password
              v-model="password"
              placeholder="请输入登录密码"
              :error="!!passwordError"
              allow-clear
              @input="onPasswordInput"
              @clear="onPasswordInput"
              @press-enter="handleSubmit"
            >
              <template #prefix>
                <icon-lock />
              </template>
            </a-input-password>
            <div v-if="passwordError" class="login-form-field-error">
              {{ passwordError }}
            </div>
          </div>
          <div class="login-form-password-actions">
            <a-checkbox v-model="rememberPassword">记住密码</a-checkbox>
            <a-typography-text
              type="secondary"
              class="login-forget"
              @click="openForget"
            >
              忘记密码
            </a-typography-text>
          </div>
          <a-button
            type="primary"
            long
            class="login-form-submit"
            :loading="loading"
            @click="handleSubmit"
          >
            登录
          </a-button>
          <a-button
            type="text"
            long
            class="login-form-register-btn"
            @click="openRegister"
          >
            注册账号
          </a-button>
          <div class="login-form-demo-hint">
            <icon-info-circle class="login-form-demo-hint-icon" :size="12" />
            <span>默认账号：admin / 123456</span>
          </div>
        </div>
      </div>
      <footer class="login-footer pro-footer">
        © 2026 VibePM 产品经理智能协作平台
      </footer>
    </div>

    <a-modal
      :visible="forgetVisible"
      title="忘记密码"
      title-align="start"
      :width="420"
      unmount-on-close
      ok-text="重置密码"
      cancel-text="取消"
      :ok-loading="forgetSubmitting"
      :on-before-ok="submitForget"
      @cancel="closeForget"
    >
      <a-form :model="forgetForm" layout="vertical" class="login-auth-form">
        <a-form-item
          label="邮箱"
          required
          :validate-status="forgetErrors.email ? 'error' : undefined"
          :help="forgetErrors.email || undefined"
          @focusin="clearForgetError('email')"
        >
          <a-input
            v-model="forgetForm.email"
            placeholder="请输入邮箱"
            :error="!!forgetErrors.email"
            allow-clear
            @input="clearForgetError('email')"
            @clear="clearForgetError('email')"
          />
        </a-form-item>
        <a-form-item
          label="邮箱验证码"
          required
          :validate-status="forgetErrors.code ? 'error' : undefined"
          :help="forgetErrors.code || undefined"
        >
          <div
            class="login-auth-code"
            :class="{ 'is-error': !!forgetErrors.code }"
            @focusin="clearForgetError('code')"
          >
            <a-input
              v-model="forgetForm.code"
              placeholder="请输入验证码"
              allow-clear
              :max-length="6"
              @input="clearForgetError('code')"
              @clear="clearForgetError('code')"
            />
            <a-button
              type="text"
              :disabled="forgetCountdown > 0"
              @click="sendForgetCode"
            >
              {{ forgetCodeBtnText }}
            </a-button>
          </div>
        </a-form-item>
        <a-form-item
          label="新密码"
          required
          :validate-status="forgetErrors.password ? 'error' : undefined"
          :help="forgetErrors.password || undefined"
          @focusin="clearForgetError('password')"
        >
          <a-input-password
            v-model="forgetForm.password"
            placeholder="请输入新密码"
            :error="!!forgetErrors.password"
            allow-clear
            @input="clearForgetError('password')"
            @clear="clearForgetError('password')"
          />
        </a-form-item>
        <a-form-item
          label="确认密码"
          required
          :validate-status="forgetErrors.confirm ? 'error' : undefined"
          :help="forgetErrors.confirm || undefined"
          @focusin="clearForgetError('confirm')"
        >
          <a-input-password
            v-model="forgetForm.confirm"
            placeholder="请再次输入密码"
            :error="!!forgetErrors.confirm"
            allow-clear
            @input="clearForgetError('confirm')"
            @clear="clearForgetError('confirm')"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      :visible="registerVisible"
      title="注册账号"
      title-align="start"
      :width="420"
      unmount-on-close
      ok-text="立即注册"
      cancel-text="取消"
      :ok-loading="registerSubmitting"
      :on-before-ok="submitRegister"
      @cancel="closeRegister"
    >
      <a-form :model="registerForm" layout="vertical" class="login-auth-form">
        <a-form-item
          label="用户名"
          required
          :validate-status="registerErrors.userName ? 'error' : undefined"
          :help="registerErrors.userName || undefined"
          @focusin="clearRegisterError('userName')"
        >
          <a-input
            v-model="registerForm.userName"
            placeholder="请输入用户名"
            :error="!!registerErrors.userName"
            allow-clear
            @input="clearRegisterError('userName')"
            @clear="clearRegisterError('userName')"
          />
        </a-form-item>
        <a-form-item
          label="邮箱"
          required
          :validate-status="registerErrors.email ? 'error' : undefined"
          :help="registerErrors.email || undefined"
          @focusin="clearRegisterError('email')"
        >
          <a-input
            v-model="registerForm.email"
            placeholder="请输入邮箱"
            :error="!!registerErrors.email"
            allow-clear
            @input="clearRegisterError('email')"
            @clear="clearRegisterError('email')"
          />
        </a-form-item>
        <a-form-item
          label="邮箱验证码"
          required
          :validate-status="registerErrors.code ? 'error' : undefined"
          :help="registerErrors.code || undefined"
        >
          <div
            class="login-auth-code"
            :class="{ 'is-error': !!registerErrors.code }"
            @focusin="clearRegisterError('code')"
          >
            <a-input
              v-model="registerForm.code"
              placeholder="请输入验证码"
              allow-clear
              :max-length="6"
              @input="clearRegisterError('code')"
              @clear="clearRegisterError('code')"
            />
            <a-button
              type="text"
              :disabled="registerCountdown > 0"
              @click="sendRegisterCode"
            >
              {{ registerCodeBtnText }}
            </a-button>
          </div>
        </a-form-item>
        <a-form-item
          label="密码"
          required
          :validate-status="registerErrors.password ? 'error' : undefined"
          :help="registerErrors.password || undefined"
          @focusin="clearRegisterError('password')"
        >
          <a-input-password
            v-model="registerForm.password"
            placeholder="请设置登录密码"
            :error="!!registerErrors.password"
            allow-clear
            @input="clearRegisterError('password')"
            @clear="clearRegisterError('password')"
          />
        </a-form-item>
        <a-form-item
          label="确认密码"
          required
          :validate-status="registerErrors.confirm ? 'error' : undefined"
          :help="registerErrors.confirm || undefined"
          @focusin="clearRegisterError('confirm')"
        >
          <a-input-password
            v-model="registerForm.confirm"
            placeholder="请再次输入密码"
            :error="!!registerErrors.confirm"
            allow-clear
            @input="clearRegisterError('confirm')"
            @clear="clearRegisterError('confirm')"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/login-cover.css';
  import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
    watch,
  } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { useStorage } from '@vueuse/core';
  import { useUserStore, useProSettingsStore } from '@/store';
  import { syncLoginCoverThemeTint } from '@/utils/login-cover-theme';

  defineOptions({ name: 'LoginCoverPage' });

  const DEMO_USERNAME = 'admin';
  const DEMO_PASSWORD = '123456';
  const DEMO_CODE = '123456';
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const CODE_COUNTDOWN = 60;

  type AuthField = 'email' | 'code' | 'password' | 'confirm' | 'userName';

  const router = useRouter();
  const userStore = useUserStore();
  const proStore = useProSettingsStore();
  const coverRef = ref<HTMLElement | null>(null);

  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: '',
    password: '',
  });

  function resolveLoginFormDefaults() {
    const saved = loginConfig.value;
    const isDemoSaved =
      saved.rememberPassword &&
      saved.username === DEMO_USERNAME &&
      saved.password === DEMO_PASSWORD;
    if (isDemoSaved) {
      loginConfig.value = {
        rememberPassword: true,
        username: '',
        password: '',
      };
      return { userName: '', password: '', rememberPassword: true };
    }
    if (saved.rememberPassword && saved.username) {
      return {
        userName: saved.username || '',
        password: saved.password || '',
        rememberPassword: true,
      };
    }
    return { userName: '', password: '', rememberPassword: true };
  }

  const formDefaults = resolveLoginFormDefaults();
  const userName = ref(formDefaults.userName);
  const password = ref(formDefaults.password);
  const rememberPassword = ref(formDefaults.rememberPassword);
  const userNameError = ref('');
  const passwordError = ref('');
  const loading = ref(false);

  const forgetVisible = ref(false);
  const registerVisible = ref(false);
  const forgetForm = reactive({
    email: '',
    code: '',
    password: '',
    confirm: '',
  });
  const registerForm = reactive({
    userName: '',
    email: '',
    code: '',
    password: '',
    confirm: '',
  });
  const forgetErrors = reactive({
    email: '',
    code: '',
    password: '',
    confirm: '',
  });
  const registerErrors = reactive({
    userName: '',
    email: '',
    code: '',
    password: '',
    confirm: '',
  });
  const forgetCountdown = ref(0);
  const registerCountdown = ref(0);
  const forgetCodeSent = ref(false);
  const registerCodeSent = ref(false);
  const forgetSubmitting = ref(false);
  const registerSubmitting = ref(false);
  let forgetTimer: ReturnType<typeof setInterval> | null = null;
  let registerTimer: ReturnType<typeof setInterval> | null = null;

  const forgetCodeBtnText = computed(() => {
    if (forgetCountdown.value > 0) return `${forgetCountdown.value}S`;
    return forgetCodeSent.value ? '重新发送' : '发送验证码';
  });
  const registerCodeBtnText = computed(() => {
    if (registerCountdown.value > 0) return `${registerCountdown.value}S`;
    return registerCodeSent.value ? '重新发送' : '发送验证码';
  });

  const applyTint = () => {
    syncLoginCoverThemeTint(coverRef.value, proStore.themeColorHex);
  };

  const onUserNameInput = () => {
    if (userNameError.value) userNameError.value = '';
  };
  const onPasswordInput = () => {
    if (passwordError.value) passwordError.value = '';
  };
  const onUserNameFocus = () => onUserNameInput();
  const onPasswordFocus = () => onPasswordInput();

  const handleSubmit = async () => {
    if (loading.value) return;
    const name = String(userName.value || '').trim();
    const pwd = String(password.value || '');
    userNameError.value = name ? '' : '用户名不能为空';
    passwordError.value = pwd ? '' : '密码不能为空';
    if (userNameError.value || passwordError.value) return;
    if (name !== DEMO_USERNAME) userNameError.value = '用户名不正确';
    if (pwd !== DEMO_PASSWORD) passwordError.value = '密码不正确';
    if (userNameError.value || passwordError.value) return;

    loading.value = true;
    try {
      await new Promise((r) => setTimeout(r, 400));
      await userStore.login({ username: name, password: pwd });
      loginConfig.value.rememberPassword = rememberPassword.value;
      loginConfig.value.username = rememberPassword.value ? name : '';
      loginConfig.value.password = rememberPassword.value ? pwd : '';
      const { redirect, ...othersQuery } = router.currentRoute.value.query;
      await router.push({
        name: (redirect as string) || 'Workplace',
        query: { ...othersQuery },
      });
      Message.success('欢迎使用');
    } catch (err) {
      passwordError.value = (err as Error).message || '登录出错，请刷新重试';
    } finally {
      loading.value = false;
    }
  };

  const emptyForgetForm = () => {
    forgetForm.email = '';
    forgetForm.code = '';
    forgetForm.password = '';
    forgetForm.confirm = '';
  };
  const emptyRegisterForm = () => {
    registerForm.userName = '';
    registerForm.email = '';
    registerForm.code = '';
    registerForm.password = '';
    registerForm.confirm = '';
  };
  const emptyForgetErrors = () => {
    forgetErrors.email = '';
    forgetErrors.code = '';
    forgetErrors.password = '';
    forgetErrors.confirm = '';
  };
  const emptyRegisterErrors = () => {
    registerErrors.userName = '';
    registerErrors.email = '';
    registerErrors.code = '';
    registerErrors.password = '';
    registerErrors.confirm = '';
  };

  const clearCountdown = (kind: 'forget' | 'register') => {
    if (kind === 'forget') {
      if (forgetTimer) clearInterval(forgetTimer);
      forgetTimer = null;
      forgetCountdown.value = 0;
      return;
    }
    if (registerTimer) clearInterval(registerTimer);
    registerTimer = null;
    registerCountdown.value = 0;
  };

  const startCountdown = (kind: 'forget' | 'register') => {
    clearCountdown(kind);
    if (kind === 'forget') {
      forgetCountdown.value = CODE_COUNTDOWN;
      forgetTimer = setInterval(() => {
        if (forgetCountdown.value <= 1) {
          clearCountdown('forget');
          return;
        }
        forgetCountdown.value -= 1;
      }, 1000);
      return;
    }
    registerCountdown.value = CODE_COUNTDOWN;
    registerTimer = setInterval(() => {
      if (registerCountdown.value <= 1) {
        clearCountdown('register');
        return;
      }
      registerCountdown.value -= 1;
    }, 1000);
  };

  const getEmailError = (email: string) => {
    const value = String(email || '').trim();
    if (!value) return '请输入邮箱';
    if (!EMAIL_RE.test(value)) return '请输入正确的邮箱地址';
    return '';
  };
  const getCodeError = (sent: boolean, code: string) => {
    if (!sent) return '请先发送验证码';
    if (!String(code || '').trim()) return '请输入邮箱验证码';
    if (String(code).trim() !== DEMO_CODE) return '验证码错误，演示码为 123456';
    return '';
  };
  const getPasswordError = (pwd: string) => {
    const value = String(pwd || '');
    if (!value) return '请输入密码';
    if (value.length < 6) return '密码至少 6 位';
    return '';
  };
  const getConfirmError = (pwd: string, confirm: string) => {
    if (!String(confirm || '')) return '请再次输入密码';
    if (String(pwd || '') !== String(confirm || '')) return '两次输入的密码不一致';
    return '';
  };

  const clearForgetError = (field: AuthField) => {
    if (field in forgetErrors && (forgetErrors as any)[field]) {
      (forgetErrors as any)[field] = '';
    }
  };
  const clearRegisterError = (field: AuthField) => {
    if (field in registerErrors && (registerErrors as any)[field]) {
      (registerErrors as any)[field] = '';
    }
  };

  const openForget = () => {
    emptyForgetForm();
    emptyForgetErrors();
    forgetCodeSent.value = false;
    clearCountdown('forget');
    forgetVisible.value = true;
  };
  const closeForget = () => {
    forgetVisible.value = false;
    clearCountdown('forget');
  };
  const openRegister = () => {
    emptyRegisterForm();
    emptyRegisterErrors();
    registerCodeSent.value = false;
    clearCountdown('register');
    registerVisible.value = true;
  };
  const closeRegister = () => {
    registerVisible.value = false;
    clearCountdown('register');
  };

  const sendForgetCode = () => {
    if (forgetCountdown.value > 0) return;
    const emailError = getEmailError(forgetForm.email);
    forgetErrors.email = emailError;
    if (emailError) return;
    forgetCodeSent.value = true;
    clearForgetError('code');
    startCountdown('forget');
    Message.success('验证码已发送（演示码：123456）');
  };
  const sendRegisterCode = () => {
    if (registerCountdown.value > 0) return;
    const emailError = getEmailError(registerForm.email);
    registerErrors.email = emailError;
    if (emailError) return;
    registerCodeSent.value = true;
    clearRegisterError('code');
    startCountdown('register');
    Message.success('验证码已发送（演示码：123456）');
  };

  const hasErrors = (errors: Record<string, string>) =>
    Object.keys(errors).some((key) => !!errors[key]);

  const submitForget = () => {
    forgetErrors.email = getEmailError(forgetForm.email);
    forgetErrors.code = getCodeError(forgetCodeSent.value, forgetForm.code);
    forgetErrors.password = getPasswordError(forgetForm.password);
    forgetErrors.confirm = getConfirmError(
      forgetForm.password,
      forgetForm.confirm
    );
    if (hasErrors(forgetErrors)) return false;
    forgetSubmitting.value = true;
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        forgetSubmitting.value = false;
        clearCountdown('forget');
        forgetVisible.value = false;
        Message.success('密码重置成功，请使用新密码登录');
        resolve(true);
      }, 400);
    });
  };

  const submitRegister = () => {
    registerErrors.userName = String(registerForm.userName || '').trim()
      ? ''
      : '请输入用户名';
    registerErrors.email = getEmailError(registerForm.email);
    registerErrors.code = getCodeError(
      registerCodeSent.value,
      registerForm.code
    );
    registerErrors.password = getPasswordError(registerForm.password);
    registerErrors.confirm = getConfirmError(
      registerForm.password,
      registerForm.confirm
    );
    if (hasErrors(registerErrors)) return false;
    registerSubmitting.value = true;
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        registerSubmitting.value = false;
        userName.value = registerForm.userName;
        password.value = '';
        clearCountdown('register');
        registerVisible.value = false;
        Message.success('注册成功，请登录');
        resolve(true);
      }, 400);
    });
  };

  watch(
    () => proStore.themeColorHex,
    () => nextTick(applyTint)
  );

  onMounted(() => {
    if (!proStore.initialized) proStore.init();
    nextTick(applyTint);
  });

  onBeforeUnmount(() => {
    clearCountdown('forget');
    clearCountdown('register');
  });
</script>
