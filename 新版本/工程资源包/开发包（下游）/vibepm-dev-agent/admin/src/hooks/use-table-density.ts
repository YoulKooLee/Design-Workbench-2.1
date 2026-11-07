import { computed, ref, watch } from 'vue';

export type TableDensity = 'medium' | 'small' | 'mini';

export const TABLE_DENSITY_KEY = 'arco-pro-table-density';

const densityOptions: { label: string; value: TableDensity }[] = [
  { label: '默认', value: 'medium' },
  { label: '中等', value: 'small' },
  { label: '紧凑', value: 'mini' },
];

function readStored(): TableDensity {
  try {
    const stored = localStorage.getItem(TABLE_DENSITY_KEY) as TableDensity;
    if (stored === 'medium' || stored === 'small' || stored === 'mini') {
      return stored;
    }
  } catch {
    /* ignore */
  }
  return 'small';
}

const sharedDensity = ref<TableDensity>(readStored());

export default function useTableDensity() {
  const density = computed({
    get: () => sharedDensity.value,
    set: (v: TableDensity) => setDensity(v),
  });

  const setDensity = (value: TableDensity) => {
    sharedDensity.value = value;
    try {
      localStorage.setItem(TABLE_DENSITY_KEY, value);
    } catch {
      /* ignore */
    }
  };

  watch(
    sharedDensity,
    (v) => {
      document.documentElement.setAttribute('data-table-density', v);
    },
    { immediate: true }
  );

  return {
    density,
    setDensity,
    densityOptions,
  };
}
