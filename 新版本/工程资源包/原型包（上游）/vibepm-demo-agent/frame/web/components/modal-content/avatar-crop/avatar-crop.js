/**
 * 头像圆形裁切助手（Composition）：选图 → 弹窗拖拽/缩放 → 确认输出 blob/url
 * 用法：const crop = window.WA_AVATAR_CROP.create(api, { onConfirm })
 */
;(function (global) {
  var STAGE_SIZE = 420
  var MASK_INSET = 28
  var CIRCLE_SIZE = STAGE_SIZE - MASK_INSET * 2
  var OUTPUT_SIZE = 240

  function create(api, options) {
    options = options || {}
    var ref = api.ref
    var computed = api.computed
    var watch = (api.watch || (global.Vue && Vue.watch)) || function () {}
    var onBeforeUnmount =
      (api.onBeforeUnmount || (global.Vue && Vue.onBeforeUnmount)) || function () {}

    var cropVisible = ref(false)
    var cropSourceUrl = ref('')
    var cropZoom = ref(1)
    var cropOffsetX = ref(0)
    var cropOffsetY = ref(0)
    var cropNaturalW = ref(0)
    var cropNaturalH = ref(0)
    var cropDragging = ref(false)
    var cropLastX = ref(0)
    var cropLastY = ref(0)
    var cropReady = ref(false)
    var cropImage = ref(null)
    var cropFileInput = ref(null)
    var resultUrl = ref('')
    var resultObjectUrl = ''

    var cropCoverScale = computed(function () {
      if (!cropNaturalW.value || !cropNaturalH.value) return 1
      return CIRCLE_SIZE / Math.min(cropNaturalW.value, cropNaturalH.value)
    })
    var cropDisplayScale = computed(function () {
      return cropCoverScale.value * cropZoom.value
    })
    var cropImageStyle = computed(function () {
      var w = cropNaturalW.value * cropDisplayScale.value
      var h = cropNaturalH.value * cropDisplayScale.value
      return {
        width: w + 'px',
        height: h + 'px',
        left: (STAGE_SIZE - w) / 2 + cropOffsetX.value + 'px',
        top: (STAGE_SIZE - h) / 2 + cropOffsetY.value + 'px',
      }
    })

    function clampCropOffset() {
      if (!cropNaturalW.value || !cropNaturalH.value) return
      var w = cropNaturalW.value * cropDisplayScale.value
      var h = cropNaturalH.value * cropDisplayScale.value
      var maxX = Math.max(0, (w - CIRCLE_SIZE) / 2)
      var maxY = Math.max(0, (h - CIRCLE_SIZE) / 2)
      cropOffsetX.value = Math.min(maxX, Math.max(-maxX, cropOffsetX.value))
      cropOffsetY.value = Math.min(maxY, Math.max(-maxY, cropOffsetY.value))
    }

    watch(cropZoom, clampCropOffset)

    function revokeCropSource() {
      if (cropSourceUrl.value) {
        URL.revokeObjectURL(cropSourceUrl.value)
        cropSourceUrl.value = ''
      }
    }

    function revokeResult() {
      if (resultObjectUrl) {
        URL.revokeObjectURL(resultObjectUrl)
        resultObjectUrl = ''
      }
    }

    function warn(msg) {
      if (global.ArcoVue && ArcoVue.Message) ArcoVue.Message.warning(msg)
    }

    function success(msg) {
      if (global.ArcoVue && ArcoVue.Message) ArcoVue.Message.success(msg)
    }

    function error(msg) {
      if (global.ArcoVue && ArcoVue.Message) ArcoVue.Message.error(msg)
    }

    function pickFile() {
      var el = cropFileInput.value
      if (el) el.click()
    }

    function openWithFile(file) {
      if (!file) return
      if (!/^image\//.test(file.type)) {
        warn('请选择图片文件')
        return
      }
      if (file.size > 2 * 1024 * 1024) {
        warn('图片大小不能超过 2MB')
        return
      }
      revokeCropSource()
      cropSourceUrl.value = URL.createObjectURL(file)
      cropZoom.value = 1
      cropOffsetX.value = 0
      cropOffsetY.value = 0
      cropNaturalW.value = 0
      cropNaturalH.value = 0
      cropReady.value = false
      cropVisible.value = true
    }

    function onCropFileChange(e) {
      var file = e.target && e.target.files && e.target.files[0]
      if (file) openWithFile(file)
      if (e.target) e.target.value = ''
    }

    function onCropImageLoad(e) {
      var img = e.target
      cropNaturalW.value = img.naturalWidth
      cropNaturalH.value = img.naturalHeight
      cropZoom.value = 1
      cropOffsetX.value = 0
      cropOffsetY.value = 0
      cropReady.value = true
      clampCropOffset()
    }

    function onCropPointerDown(e) {
      if (!cropReady.value) return
      cropDragging.value = true
      cropLastX.value = e.clientX
      cropLastY.value = e.clientY
    }

    function onCropPointerMove(e) {
      if (!cropDragging.value) return
      var dx = e.clientX - cropLastX.value
      var dy = e.clientY - cropLastY.value
      cropLastX.value = e.clientX
      cropLastY.value = e.clientY
      cropOffsetX.value += dx
      cropOffsetY.value += dy
      clampCropOffset()
    }

    function onCropPointerUp() {
      cropDragging.value = false
    }

    function onCropWheel(e) {
      var next = Math.min(3, Math.max(1, cropZoom.value + (e.deltaY > 0 ? -0.08 : 0.08)))
      cropZoom.value = Number(next.toFixed(2))
    }

    function onCropCancel() {
      cropVisible.value = false
      cropDragging.value = false
      revokeCropSource()
      cropReady.value = false
    }

    function onCropReselect() {
      pickFile()
    }

    function onCropConfirm() {
      if (!cropReady.value || !cropNaturalW.value) {
        warn('请等待图片加载完成')
        return
      }
      var img = cropImage.value
      if (!img) return
      var scale = cropDisplayScale.value
      var w = cropNaturalW.value * scale
      var h = cropNaturalH.value * scale
      var left = (STAGE_SIZE - w) / 2 + cropOffsetX.value
      var top = (STAGE_SIZE - h) / 2 + cropOffsetY.value
      var sx = (MASK_INSET - left) / scale
      var sy = (MASK_INSET - top) / scale
      var sw = CIRCLE_SIZE / scale
      var sh = CIRCLE_SIZE / scale

      var canvas = document.createElement('canvas')
      canvas.width = OUTPUT_SIZE
      canvas.height = OUTPUT_SIZE
      var ctx = canvas.getContext('2d')
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE)

      canvas.toBlob(
        function (blob) {
          if (!blob) {
            error('裁切失败，请重试')
            return
          }
          revokeResult()
          resultObjectUrl = URL.createObjectURL(blob)
          resultUrl.value = resultObjectUrl
          cropVisible.value = false
          revokeCropSource()
          cropReady.value = false
          success('头像已更新')
          if (typeof options.onConfirm === 'function') {
            options.onConfirm(blob, resultObjectUrl)
          }
        },
        'image/png',
        0.92
      )
    }

    onBeforeUnmount(function () {
      revokeCropSource()
      revokeResult()
    })

    return {
      cropVisible: cropVisible,
      cropSourceUrl: cropSourceUrl,
      cropZoom: cropZoom,
      cropDragging: cropDragging,
      cropReady: cropReady,
      cropImageStyle: cropImageStyle,
      cropImage: cropImage,
      cropFileInput: cropFileInput,
      resultUrl: resultUrl,
      pickFile: pickFile,
      openWithFile: openWithFile,
      onCropFileChange: onCropFileChange,
      onCropImageLoad: onCropImageLoad,
      onCropPointerDown: onCropPointerDown,
      onCropPointerMove: onCropPointerMove,
      onCropPointerUp: onCropPointerUp,
      onCropWheel: onCropWheel,
      onCropCancel: onCropCancel,
      onCropReselect: onCropReselect,
      onCropConfirm: onCropConfirm,
    }
  }

  global.WA_AVATAR_CROP = {
    STAGE_SIZE: STAGE_SIZE,
    MASK_INSET: MASK_INSET,
    CIRCLE_SIZE: CIRCLE_SIZE,
    OUTPUT_SIZE: OUTPUT_SIZE,
    create: create,
  }
})(typeof window !== 'undefined' ? window : this)
