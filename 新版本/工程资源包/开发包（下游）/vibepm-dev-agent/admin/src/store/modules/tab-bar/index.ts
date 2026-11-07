import type { RouteLocationNormalized } from 'vue-router';
import { defineStore } from 'pinia';
import {
  DEFAULT_ROUTE,
  DEFAULT_ROUTE_NAME,
  REDIRECT_ROUTE_NAME,
} from '@/router/constants';
import { isString } from '@/utils/is';
import { TabBarState, TagProps } from './types';

const TAB_BAR_STORAGE_KEY = 'vibepm-admin-tab-bar';

const formatTag = (route: RouteLocationNormalized): TagProps => {
  const { name, meta, fullPath, query } = route;
  return {
    title: meta.locale || '',
    name: String(name),
    fullPath,
    query,
    ignoreCache: meta.ignoreCache,
  };
};

const BAN_LIST = [REDIRECT_ROUTE_NAME];

function isValidTag(tag: unknown): tag is TagProps {
  if (!tag || typeof tag !== 'object') return false;
  const item = tag as TagProps;
  return Boolean(item.name && item.fullPath && item.title);
}

function normalizeTagList(tags: TagProps[]): TagProps[] {
  const seen = new Set<string>();
  const rest: TagProps[] = [];
  tags.forEach((tag) => {
    if (!isValidTag(tag)) return;
    if (tag.name === DEFAULT_ROUTE_NAME || tag.fullPath === DEFAULT_ROUTE.fullPath) {
      return;
    }
    if (seen.has(tag.fullPath)) return;
    seen.add(tag.fullPath);
    rest.push({
      title: tag.title,
      name: tag.name,
      fullPath: tag.fullPath,
      query: tag.query,
      ignoreCache: tag.ignoreCache,
    });
  });
  return [DEFAULT_ROUTE, ...rest];
}

function readStoredTagList(): TagProps[] {
  try {
    const raw = localStorage.getItem(TAB_BAR_STORAGE_KEY);
    if (!raw) return [DEFAULT_ROUTE];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [DEFAULT_ROUTE];
    return normalizeTagList(parsed);
  } catch {
    return [DEFAULT_ROUTE];
  }
}

function persistTagList(tags: TagProps[]) {
  try {
    localStorage.setItem(TAB_BAR_STORAGE_KEY, JSON.stringify(tags));
  } catch {
    // ignore quota / private mode errors
  }
}

function buildCacheSet(tags: TagProps[]): Set<string> {
  const cache = new Set<string>([DEFAULT_ROUTE_NAME]);
  tags.forEach((tag) => {
    if (!tag.ignoreCache && tag.name) cache.add(tag.name);
  });
  return cache;
}

const useTabBarStore = defineStore('tabBar', {
  state: (): TabBarState => {
    const tagList = readStoredTagList();
    return {
      tagList,
      cacheTabList: buildCacheSet(tagList),
    };
  },

  getters: {
    getTabList(): TagProps[] {
      return this.tagList;
    },
    getCacheList(): string[] {
      return Array.from(this.cacheTabList);
    },
  },

  actions: {
    persist() {
      persistTagList(this.tagList);
    },
    updateTabList(route: RouteLocationNormalized) {
      if (BAN_LIST.includes(route.name as string)) return;
      this.tagList.push(formatTag(route));
      if (!route.meta.ignoreCache) {
        this.cacheTabList.add(route.name as string);
      }
      this.persist();
    },
    deleteTag(idx: number, tag: TagProps) {
      this.tagList.splice(idx, 1);
      this.cacheTabList.delete(tag.name);
      this.persist();
    },
    addCache(name: string) {
      if (isString(name) && name !== '') this.cacheTabList.add(name);
    },
    deleteCache(tag: TagProps) {
      this.cacheTabList.delete(tag.name);
    },
    freshTabList(tags: TagProps[]) {
      this.tagList = normalizeTagList(tags);
      this.cacheTabList = buildCacheSet(this.tagList);
      this.persist();
    },
    resetTabList() {
      this.tagList = [DEFAULT_ROUTE];
      this.cacheTabList = new Set([DEFAULT_ROUTE_NAME]);
      this.persist();
    },
  },
});

export default useTabBarStore;
