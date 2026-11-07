import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  watch,
  type CSSProperties,
} from 'vue';
import { Message } from '@arco-design/web-vue';

const STAGE_SIZE = 420;
const MASK_INSET = 28;
const CIRCLE_SIZE = STAGE_SIZE - MASK_INSET * 2;
const OUTPUT_SIZE = 240;

export interface AvatarCropLocale {
  avatarSuccess?: string;
  avatarInvalid?: string;
  avatarTooLarge?: string;
  cropNotReady?: string;
  cropFailed?: string;
}

/**
 * Vue 3 port of frame/admin/js/avatar-crop.js (ArcoProAvatarCrop.createMixin).
 */
export default function useAvatarCrop(locale: AvatarCropLocale = {}) {
  const t = locale;

  const avatarInput = ref<HTMLInputElement | null>(null);
  const cropImage = ref<HTMLImageElement | null>(null);

  const avatarUrl = ref('');
  const avatarObjectUrl = ref('');

  const cropVisible = ref(false);
  const cropSourceUrl = ref('');
  const cropZoom = ref(1);
  const cropOffsetX = ref(0);
  const cropOffsetY = ref(0);
  const cropNaturalW = ref(0);
  const cropNaturalH = ref(0);
  const cropDragging = ref(false);
  const cropLastX = ref(0);
  const cropLastY = ref(0);
  const cropReady = ref(false);

  let scrollCompLocked = false;

  const cropCoverScale = computed(() => {
    if (!cropNaturalW.value || !cropNaturalH.value) return 1;
    return CIRCLE_SIZE / Math.min(cropNaturalW.value, cropNaturalH.value);
  });

  const cropDisplayScale = computed(
    () => cropCoverScale.value * cropZoom.value
  );

  const cropImageStyle = computed<CSSProperties>(() => {
    const w = cropNaturalW.value * cropDisplayScale.value;
    const h = cropNaturalH.value * cropDisplayScale.value;
    return {
      width: `${w}px`,
      height: `${h}px`,
      left: `${(STAGE_SIZE - w) / 2 + cropOffsetX.value}px`,
      top: `${(STAGE_SIZE - h) / 2 + cropOffsetY.value}px`,
    };
  });

  const lockCropScrollCompensation = () => {
    if (scrollCompLocked) return;
    const sbw = Math.max(
      0,
      window.innerWidth - document.documentElement.clientWidth
    );
    if (sbw > 0) {
      document.documentElement.style.setProperty(
        '--pro-scrollbar-compensation',
        `${sbw}px`
      );
    }
    document.documentElement.classList.add('is-scroll-locked');
    scrollCompLocked = true;
  };

  const unlockCropScrollCompensation = () => {
    if (!scrollCompLocked) return;
    scrollCompLocked = false;
    nextTick(() => {
      window.setTimeout(() => {
        if (
          document.documentElement.classList.contains('is-page-search-open')
        ) {
          return;
        }
        if (document.body?.style.overflow === 'hidden') return;
        document.documentElement.classList.remove('is-scroll-locked');
        document.documentElement.style.removeProperty(
          '--pro-scrollbar-compensation'
        );
      }, 0);
    });
  };

  const revokeCropSource = () => {
    if (cropSourceUrl.value) {
      URL.revokeObjectURL(cropSourceUrl.value);
      cropSourceUrl.value = '';
    }
  };

  const clampCropOffset = () => {
    if (!cropNaturalW.value || !cropNaturalH.value) return;
    const w = cropNaturalW.value * cropDisplayScale.value;
    const h = cropNaturalH.value * cropDisplayScale.value;
    const maxX = Math.max(0, (w - CIRCLE_SIZE) / 2);
    const maxY = Math.max(0, (h - CIRCLE_SIZE) / 2);
    cropOffsetX.value = Math.min(maxX, Math.max(-maxX, cropOffsetX.value));
    cropOffsetY.value = Math.min(maxY, Math.max(-maxY, cropOffsetY.value));
  };

  watch(cropZoom, () => {
    clampCropOffset();
  });

  watch(cropVisible, (visible) => {
    if (visible) lockCropScrollCompensation();
    else unlockCropScrollCompensation();
  });

  const onAvatarClick = () => {
    avatarInput.value?.click();
  };

  const onAvatarChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!/^image\//.test(file.type)) {
      Message.warning(t.avatarInvalid || '请选择图片文件');
      input.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      Message.warning(t.avatarTooLarge || '图片大小不能超过 2MB');
      input.value = '';
      return;
    }
    revokeCropSource();
    cropSourceUrl.value = URL.createObjectURL(file);
    cropZoom.value = 1;
    cropOffsetX.value = 0;
    cropOffsetY.value = 0;
    cropNaturalW.value = 0;
    cropNaturalH.value = 0;
    cropReady.value = false;
    lockCropScrollCompensation();
    cropVisible.value = true;
    input.value = '';
  };

  const onCropImageLoad = (e: Event) => {
    const img = e.target as HTMLImageElement;
    cropNaturalW.value = img.naturalWidth;
    cropNaturalH.value = img.naturalHeight;
    cropZoom.value = 1;
    cropOffsetX.value = 0;
    cropOffsetY.value = 0;
    cropReady.value = true;
    clampCropOffset();
  };

  const onCropPointerDown = (e: MouseEvent) => {
    if (!cropReady.value) return;
    cropDragging.value = true;
    cropLastX.value = e.clientX;
    cropLastY.value = e.clientY;
  };

  const onCropPointerMove = (e: MouseEvent) => {
    if (!cropDragging.value) return;
    const dx = e.clientX - cropLastX.value;
    const dy = e.clientY - cropLastY.value;
    cropLastX.value = e.clientX;
    cropLastY.value = e.clientY;
    cropOffsetX.value += dx;
    cropOffsetY.value += dy;
    clampCropOffset();
  };

  const onCropPointerUp = () => {
    cropDragging.value = false;
  };

  const onCropWheel = (e: WheelEvent) => {
    const next = Math.min(
      3,
      Math.max(1, cropZoom.value + (e.deltaY > 0 ? -0.08 : 0.08))
    );
    cropZoom.value = Number(next.toFixed(2));
  };

  const onCropCancel = () => {
    cropVisible.value = false;
    cropDragging.value = false;
    revokeCropSource();
    cropReady.value = false;
  };

  const onCropReselect = () => {
    onAvatarClick();
  };

  const onCropConfirm = () => {
    if (!cropReady.value || !cropNaturalW.value) {
      Message.warning(t.cropNotReady || '请等待图片加载完成');
      return;
    }
    const img = cropImage.value;
    if (!img) return;
    const scale = cropDisplayScale.value;
    const w = cropNaturalW.value * scale;
    const h = cropNaturalH.value * scale;
    const left = (STAGE_SIZE - w) / 2 + cropOffsetX.value;
    const top = (STAGE_SIZE - h) / 2 + cropOffsetY.value;
    const sx = (MASK_INSET - left) / scale;
    const sy = (MASK_INSET - top) / scale;
    const sw = CIRCLE_SIZE / scale;
    const sh = CIRCLE_SIZE / scale;

    const canvas = document.createElement('canvas');
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      Message.error(t.cropFailed || '裁切失败，请重试');
      return;
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          Message.error(t.cropFailed || '裁切失败，请重试');
          return;
        }
        if (avatarObjectUrl.value) URL.revokeObjectURL(avatarObjectUrl.value);
        avatarObjectUrl.value = URL.createObjectURL(blob);
        avatarUrl.value = avatarObjectUrl.value;
        cropVisible.value = false;
        revokeCropSource();
        cropReady.value = false;
        Message.success(t.avatarSuccess || '头像已更新');
      },
      'image/png',
      0.92
    );
  };

  onBeforeUnmount(() => {
    unlockCropScrollCompensation();
    revokeCropSource();
    if (avatarObjectUrl.value) URL.revokeObjectURL(avatarObjectUrl.value);
  });

  return {
    avatarInput,
    cropImage,
    avatarUrl,
    avatarObjectUrl,
    cropVisible,
    cropSourceUrl,
    cropZoom,
    cropDragging,
    cropReady,
    cropImageStyle,
    onAvatarClick,
    onAvatarChange,
    onCropImageLoad,
    onCropPointerDown,
    onCropPointerMove,
    onCropPointerUp,
    onCropWheel,
    onCropCancel,
    onCropReselect,
    onCropConfirm,
  };
}
