;(function () {
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  var DEMO_CODE = '123456'
  var CODE_COUNTDOWN = 60

  function emptyAuth() {
    return { userName: '', email: '', code: '', password: '', confirm: '' }
  }
  function emptyErr() {
    return { userName: '', email: '', code: '', password: '', confirm: '' }
  }
  function tip(type, content) {
    if (window.ArcoVue && ArcoVue.Message) ArcoVue.Message[type](content)
  }

  WebArco.mount('#app', {
    setup: function () {
      var ref = Vue.ref
      var computed = Vue.computed
      var userName = ref('admin')
      var password = ref('123456')
      var remember = ref(true)
      var userNameError = ref('')
      var passwordError = ref('')
      var loading = ref(false)
      var forgetVisible = ref(false)
      var registerVisible = ref(false)
      var forgetForm = ref(emptyAuth())
      var registerForm = ref(emptyAuth())
      var forgetErrors = ref(emptyErr())
      var registerErrors = ref(emptyErr())
      var forgetCountdown = ref(0)
      var registerCountdown = ref(0)
      var forgetCodeSent = ref(false)
      var registerCodeSent = ref(false)
      var forgetSubmitting = ref(false)
      var registerSubmitting = ref(false)
      var forgetTimer = null
      var registerTimer = null
      var themeDark = ref(document.documentElement.dataset.theme === 'dark')
      var socialLogins = [
        { key: 'wechat', label: '微信', icon: 'fa-weixin' },
        { key: 'qq', label: 'QQ', icon: 'fa-qq' },
        { key: 'alipay', label: '支付宝', icon: 'fa-alipay' },
      ]

      var forgetCodeBtn = computed(function () {
        if (forgetCountdown.value > 0) return forgetCountdown.value + 'S'
        return forgetCodeSent.value ? '重新发送' : '发送验证码'
      })
      var registerCodeBtn = computed(function () {
        if (registerCountdown.value > 0) return registerCountdown.value + 'S'
        return registerCodeSent.value ? '重新发送' : '发送验证码'
      })

      function onThemeChange(ev) {
        themeDark.value = !!(ev && ev.detail && ev.detail.dark)
      }
      function clearUserError() { userNameError.value = '' }
      function clearPwdError() { passwordError.value = '' }

      function onSubmit() {
        var name = String(userName.value || '').trim()
        var pwd = String(password.value || '')
        userNameError.value = name ? '' : '用户名不能为空'
        passwordError.value = pwd ? '' : '密码不能为空'
        if (userNameError.value || passwordError.value) return
        if (name !== 'admin') userNameError.value = '用户名不正确'
        if (pwd !== '123456') passwordError.value = '密码不正确'
        if (userNameError.value || passwordError.value) return
        loading.value = true
        setTimeout(function () {
          loading.value = false
          tip('success', '示意登录成功（原型无真实鉴权）')
        }, 400)
      }
      function onSocial(label) {
        tip('info', '示意：' + label + '登录（未接入真实授权）')
      }

      function clearTimer(kind) {
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
      function startCountdown(kind) {
        clearTimer(kind)
        var count = kind === 'forget' ? forgetCountdown : registerCountdown
        count.value = CODE_COUNTDOWN
        var timer = setInterval(function () {
          if (count.value <= 1) {
            clearTimer(kind)
            return
          }
          count.value -= 1
        }, 1000)
        if (kind === 'forget') forgetTimer = timer
        else registerTimer = timer
      }
      function emailErr(email) {
        var value = String(email || '').trim()
        if (!value) return '请输入邮箱'
        if (!EMAIL_RE.test(value)) return '请输入正确的邮箱地址'
        return ''
      }
      function codeErr(sent, code) {
        var value = String(code || '').replace(/\s/g, '')
        if (!sent) return '请先发送验证码'
        if (!value) return '请输入验证码'
        if (value.length < 6) return '请输入 6 位验证码'
        if (value !== DEMO_CODE) return '验证码错误，演示码为 123456'
        return ''
      }
      function pwdErr(password) {
        var value = String(password || '')
        if (!value) return '请输入密码'
        if (value.length < 6) return '密码至少 6 位'
        return ''
      }
      function confirmErr(password, confirm) {
        if (!String(confirm || '')) return '请再次输入密码'
        if (String(password || '') !== String(confirm || '')) return '两次密码不一致'
        return ''
      }
      function hasErrors(errors) {
        return Object.keys(errors).some(function (k) { return !!errors[k] })
      }

      function openForget() {
        forgetForm.value = emptyAuth()
        forgetErrors.value = emptyErr()
        forgetCodeSent.value = false
        clearTimer('forget')
        forgetVisible.value = true
      }
      function openRegister() {
        registerForm.value = emptyAuth()
        registerErrors.value = emptyErr()
        registerCodeSent.value = false
        clearTimer('register')
        registerVisible.value = true
      }
      function sendForgetCode() {
        if (forgetCountdown.value > 0) return
        var err = emailErr(forgetForm.value.email)
        forgetErrors.value = Object.assign(emptyErr(), { email: err })
        if (err) return
        forgetCodeSent.value = true
        startCountdown('forget')
        tip('success', '验证码已发送（演示码：123456）')
      }
      function sendRegisterCode() {
        if (registerCountdown.value > 0) return
        var err = emailErr(registerForm.value.email)
        registerErrors.value = Object.assign({}, registerErrors.value, { email: err })
        if (err) return
        registerCodeSent.value = true
        startCountdown('register')
        tip('success', '验证码已发送（演示码：123456）')
      }
      function submitForget() {
        var form = forgetForm.value
        var errors = {
          email: emailErr(form.email),
          code: codeErr(forgetCodeSent.value, form.code),
          password: pwdErr(form.password),
          confirm: confirmErr(form.password, form.confirm),
        }
        forgetErrors.value = Object.assign(emptyErr(), errors)
        if (hasErrors(errors)) return false
        forgetSubmitting.value = true
        return new Promise(function (resolve) {
          setTimeout(function () {
            forgetSubmitting.value = false
            clearTimer('forget')
            forgetVisible.value = false
            tip('success', '密码已重置（示意）')
            resolve(true)
          }, 400)
        })
      }
      function submitRegister() {
        var form = registerForm.value
        var errors = {
          userName: String(form.userName || '').trim() ? '' : '请输入用户名',
          email: emailErr(form.email),
          code: codeErr(registerCodeSent.value, form.code),
          password: pwdErr(form.password),
          confirm: confirmErr(form.password, form.confirm),
        }
        registerErrors.value = Object.assign(emptyErr(), errors)
        if (hasErrors(errors)) return false
        registerSubmitting.value = true
        return new Promise(function (resolve) {
          setTimeout(function () {
            registerSubmitting.value = false
            userName.value = form.userName
            password.value = ''
            clearTimer('register')
            registerVisible.value = false
            tip('success', '注册成功，请登录（示意）')
            resolve(true)
          }, 400)
        })
      }

      Vue.onMounted(function () {
        window.addEventListener('wa-theme-change', onThemeChange)
      })
      Vue.onBeforeUnmount(function () {
        window.removeEventListener('wa-theme-change', onThemeChange)
        clearTimer('forget')
        clearTimer('register')
      })

      return {
        userName: userName,
        password: password,
        remember: remember,
        userNameError: userNameError,
        passwordError: passwordError,
        loading: loading,
        forgetVisible: forgetVisible,
        registerVisible: registerVisible,
        forgetForm: forgetForm,
        registerForm: registerForm,
        forgetErrors: forgetErrors,
        registerErrors: registerErrors,
        forgetCountdown: forgetCountdown,
        registerCountdown: registerCountdown,
        forgetSubmitting: forgetSubmitting,
        registerSubmitting: registerSubmitting,
        forgetCodeBtn: forgetCodeBtn,
        registerCodeBtn: registerCodeBtn,
        themeDark: themeDark,
        socialLogins: socialLogins,
        clearUserError: clearUserError,
        clearPwdError: clearPwdError,
        onSubmit: onSubmit,
        onSocial: onSocial,
        openForget: openForget,
        openRegister: openRegister,
        sendForgetCode: sendForgetCode,
        sendRegisterCode: sendRegisterCode,
        submitForget: submitForget,
        submitRegister: submitRegister,
      }
    },
  })
})()
