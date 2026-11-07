/**
 * 上传预览：选文件后 uploading → done；支持暂停(init) / 开始继续。
 */
;(function (global) {

  function resolvePreviewUrl(item) {
    if (item.url) return item.url
    if (item.file && typeof URL !== 'undefined' && URL.createObjectURL) {
      try {
        return URL.createObjectURL(item.file)
      } catch (e) {
        return item.url
      }
    }
    return item.url
  }

  function patchUploadLocale() {
    // 悬停提示：Arco 默认「取消」→「暂停」（开始已是「开始」）
    if (global.__WA_UPLOAD_TIP_MO__) return
    try {
      global.__WA_UPLOAD_TIP_MO__ = new MutationObserver(function () {
        document.querySelectorAll('.arco-tooltip-content').forEach(function (el) {
          var t = (el.textContent || '').trim()
          if (t === '取消') el.textContent = '暂停'
        })
      })
      global.__WA_UPLOAD_TIP_MO__.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      })
    } catch (e) {}
  }

  var uploadInstances = Object.create(null)

  function ensureGlobalClick() {
    if (global.__WA_UPLOAD_CLICK_BOUND__) return
    global.__WA_UPLOAD_CLICK_BOUND__ = true
    document.addEventListener(
      'click',
      function (e) {
        var cancel = e.target.closest && e.target.closest('.arco-upload-icon-cancel')
        var start = e.target.closest && e.target.closest('.arco-upload-icon-start')
        var retry =
          e.target.closest &&
          e.target.closest('.arco-upload-list-item-error .arco-upload-icon-upload')
        if (!cancel && !start && !retry) return
        var icon = cancel || start || retry
        var root =
          (icon.closest && icon.closest('[data-wa-upload]')) ||
          (icon.closest && icon.closest('.wa-upload-btn')) ||
          (icon.closest && icon.closest('.wa-upload-io'))
        if (!root) return
        var id = root.getAttribute('data-wa-upload')
        if (!id) {
          if (root.classList.contains('wa-upload-btn')) id = 'button'
          else if (root.classList.contains('wa-upload-io')) id = 'drag'
        }
        var inst = uploadInstances[id]
        if (!inst) return
        var file = inst.findFileFromIconEl(icon, root)
        if (!file) return
        e.preventDefault()
        e.stopPropagation()
        if (cancel) inst.pauseFile(file)
        else if (start) inst.resumeFile(file)
        else if (retry && inst.retryFile) inst.retryFile(file)
      },
      true
    )
  }

  function create(api, options) {
    options = options || {}
    var id = options.id || 'upload-' + Math.random().toString(36).slice(2, 8)
    var fileList = api.ref(options.initialList ? options.initialList.slice() : [])
    var timers = Object.create(null)
    var pausedUids = Object.create(null)
    var step = options.step != null ? options.step : 0.22
    var intervalMs = options.intervalMs != null ? options.intervalMs : 180

    patchUploadLocale()
    ensureGlobalClick()

    function clearTimer(uid) {
      if (timers[uid]) {
        clearInterval(timers[uid])
        delete timers[uid]
      }
    }

    function findIndexByUid(uid) {
      var cur = fileList.value || []
      for (var i = 0; i < cur.length; i++) {
        if (cur[i].uid === uid) return i
      }
      return -1
    }

    function patchItem(uid, patch) {
      var cur = fileList.value || []
      var idx = findIndexByUid(uid)
      if (idx < 0) return
      var copy = cur.slice()
      copy[idx] = Object.assign({}, copy[idx], patch)
      fileList.value = copy
    }

    function startSim(uid) {
      clearTimer(uid)
      var idx0 = findIndexByUid(uid)
      if (idx0 < 0) return
      var percent = Number(fileList.value[idx0].percent) || 0
      timers[uid] = setInterval(function () {
        var idx = findIndexByUid(uid)
        if (idx < 0) {
          clearTimer(uid)
          return
        }
        var cur = fileList.value[idx]
        if (cur.status !== 'uploading') {
          clearTimer(uid)
          return
        }
        percent = Math.min(1, percent + step)
        if (percent >= 1) {
          clearTimer(uid)
          patchItem(uid, {
            status: 'done',
            percent: 1,
            staticDemo: false,
            url: resolvePreviewUrl(cur),
          })
          return
        }
        patchItem(uid, {
          status: 'uploading',
          percent: percent,
          staticDemo: false,
          url: resolvePreviewUrl(cur),
        })
      }, intervalMs)
    }

    function pauseFile(file) {
      if (!file) return
      clearTimer(file.uid)
      pausedUids[file.uid] = true
      patchItem(file.uid, {
        status: 'init',
        percent: file.percent > 0 ? file.percent : 0,
        staticDemo: false,
      })
    }

    function resumeFile(file) {
      if (!file) return
      delete pausedUids[file.uid]
      patchItem(file.uid, {
        status: 'uploading',
        staticDemo: false,
      })
      startSim(file.uid)
    }

    /** 仅按本实例列表 + 文件名匹配，禁止下标回退（会串到其它上传控件） */
    function findFileFromIconEl(el, scopedRoot) {
      var root =
        scopedRoot ||
        el.closest('[data-wa-upload="' + id + '"]') ||
        (id === 'button' && el.closest('.wa-upload-btn')) ||
        (id === 'drag' && el.closest('.wa-upload-io'))
      if (!root) return null
      var row = el.closest('.arco-upload-list-item')
      if (!row || !root.contains(row)) return null
      var nameEl = row.querySelector(
        '.arco-upload-list-item-name-text, .arco-upload-list-item-name-link, a.arco-upload-list-item-name, .arco-upload-list-item-name'
      )
      var name = nameEl ? (nameEl.textContent || '').trim() : ''
      if (!name) return null
      var list = fileList.value || []
      for (var i = 0; i < list.length; i++) {
        if (list[i].name === name) return list[i]
      }
      return null
    }

    function onChange(list) {
      var next = (list || []).map(function (item) {
        if (item.staticDemo && item.status !== 'init') return item
        if (item.status === 'done' || item.status === 'error') {
          delete pausedUids[item.uid]
          return Object.assign({}, item, { url: resolvePreviewUrl(item) })
        }
        /* 手动暂停：保持 init，等点「开始」 */
        if (item.status === 'init' && pausedUids[item.uid]) {
          return Object.assign({}, item, { url: resolvePreviewUrl(item) })
        }
        if (item.status === 'uploading') {
          delete pausedUids[item.uid]
          return Object.assign({}, item, { url: resolvePreviewUrl(item) })
        }
        /* 新选文件 → 自动开始上传模拟 */
        delete pausedUids[item.uid]
        return Object.assign({}, item, {
          status: 'uploading',
          percent: item.percent > 0 ? item.percent : 0,
          url: resolvePreviewUrl(item),
          staticDemo: false,
        })
      })
      fileList.value = next

      next.forEach(function (item) {
        if (item.status !== 'uploading' || item.staticDemo || timers[item.uid]) return
        startSim(item.uid)
      })
    }

    function removeFile(item) {
      if (!item) return
      var uid = item.uid
      clearTimer(uid)
      delete pausedUids[uid]
      fileList.value = (fileList.value || []).filter(function (f) {
        return f.uid !== uid
      })
    }

    function retryFile(item) {
      if (!item) return
      patchItem(item.uid, {
        status: 'uploading',
        percent: 0,
        staticDemo: false,
      })
      startSim(item.uid)
    }

    var previewVisible = api.ref(false)
    var previewSrc = api.ref('')

    function previewFile(item) {
      if (!item || !item.url) return
      previewSrc.value = item.url
      previewVisible.value = true
    }

    uploadInstances[id] = {
      id: id,
      pauseFile: pauseFile,
      resumeFile: resumeFile,
      retryFile: retryFile,
      findFileFromIconEl: findFileFromIconEl,
    }

    return {
      id: id,
      fileList: fileList,
      onChange: onChange,
      removeFile: removeFile,
      retryFile: retryFile,
      previewFile: previewFile,
      previewVisible: previewVisible,
      previewSrc: previewSrc,
      pauseFile: pauseFile,
      resumeFile: resumeFile,
    }
  }

  function pictureSeed() {
    return []
  }

  global.WA_UPLOAD_DEMO = {
    create: create,
    patchUploadLocale: patchUploadLocale,
    seeds: {
      button: [
        { uid: '-1', name: '投放预算表.xlsx', status: 'done', staticDemo: true },
        { uid: '-2', name: '活动明细.csv', status: 'done', staticDemo: true },
        { uid: '-3', name: '素材包.zip', status: 'done', staticDemo: true },
      ],
      drag: [],
      picture: pictureSeed,
    },
  }
})(typeof window !== 'undefined' ? window : this)
