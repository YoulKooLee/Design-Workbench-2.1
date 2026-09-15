/**
 * @name Netflix
 */

import React, { lazy, Suspense, useEffect } from 'react';
import { defineHashPageRoute, useHashPage } from '../../common/useHashPage';
import './style.css';
import pagesConfig from './pages.json';

// Vite Glob Import for all nested pages at root level.
// @ts-ignore
const pagesImports = import.meta.glob('./page-*/index.tsx');

const route = defineHashPageRoute([
  { id: 'page-02', title: '登录' },
  { id: 'page-57', title: '选择用户' },
  { id: 'page-55', title: '首页' },
  { id: 'page-16', title: '搜索入口' },
  { id: 'page-08', title: '下载' },
  { id: 'page-04', title: '更多菜单' },
], { defaultPageId: 'page-55' });

type PageConfig = {
  name?: string;
  path: string;
};

const availablePageIds = (pagesConfig.pages as PageConfig[]).map((page) => page.path);
const PAGE_ID_RE = /^[a-z0-9-]+$/u;

function normalizePageId(value: unknown): string {
  const id = typeof value === 'string' ? value.trim() : '';
  return PAGE_ID_RE.test(id) ? id : '';
}

function readLegacyPageId() {
  if (typeof window === 'undefined') {
    return '';
  }

  const rawHash = window.location.hash.replace(/^#/, '');
  if (rawHash.startsWith('page=')) {
    return '';
  }

  const params = new URLSearchParams(window.location.search);
  const queryPage = normalizePageId(params.get('page') || params.get('path'));
  if (availablePageIds.includes(queryPage)) {
    return queryPage;
  }

  if (!rawHash) {
    return '';
  }

  const hashPage = normalizePageId(rawHash.replace(/^\//, '').replace(/\/$/, '').split(/[?&]/)[0]);
  return availablePageIds.includes(hashPage) ? hashPage : '';
}

function includesAny(text: string, needles: string[]) {
  return needles.some((needle) => text.includes(needle));
}

function resolveLinkedPage(currentPage: string, textContent: string) {
  const text = textContent.trim().replace(/\s+/g, ' ').toLowerCase();

  if (includesAny(text, ['sign in', 'log in'])) {
    return currentPage === 'page-07' || currentPage === 'page-53' ? 'page-02' : 'page-63';
  }
  if (includesAny(text, ['get started', 'unlimited entertainment'])) {
    return 'page-07';
  }
  if (includesAny(text, ['who\'s watching', 'jiho', 'mobbin', 'children'])) {
    return 'page-55';
  }
  if (includesAny(text, ['manage profiles'])) {
    return 'page-59';
  }
  if (includesAny(text, ['add profile'])) {
    return 'page-61';
  }
  if (includesAny(text, ['done', 'cancel', 'save'])) {
    if (currentPage === 'page-05') return 'page-08';
    if (currentPage === 'page-59' || currentPage === 'page-61' || currentPage === 'page-58') return 'page-57';
    if (currentPage === 'page-45' || currentPage === 'page-46' || currentPage === 'page-50') return 'page-31';
  }
  if (includesAny(text, ['home'])) {
    return 'page-55';
  }
  if (includesAny(text, ['search'])) {
    return currentPage === 'page-16' ? 'page-13' : 'page-16';
  }
  if (includesAny(text, ['downloads'])) {
    return 'page-08';
  }
  if (includesAny(text, ['edit'])) {
    return currentPage === 'page-08' ? 'page-05' : '';
  }
  if (includesAny(text, ['more'])) {
    return 'page-04';
  }
  if (includesAny(text, ['app settings'])) {
    return 'page-03';
  }
  if (includesAny(text, ['smart downloads'])) {
    return 'page-10';
  }
  if (includesAny(text, ['my list'])) {
    return 'page-17';
  }
  if (includesAny(text, ['series', 'films', 'all genres'])) {
    if (includesAny(text, ['all genres'])) return 'page-25';
    return includesAny(text, ['films']) ? 'page-20' : 'page-19';
  }
  if (includesAny(text, ['info', 'episodes', 'more like this', 'bodyguard', 'black mirror', 'bandersnatch'])) {
    if (includesAny(text, ['episodes'])) return 'page-39';
    if (includesAny(text, ['more like this'])) return 'page-30';
    if (includesAny(text, ['bandersnatch'])) return 'page-52';
    return 'page-31';
  }
  if (includesAny(text, ['play', 'resume', 'study in pink'])) {
    return 'page-45';
  }
  if (includesAny(text, ['audio', 'subtitles'])) {
    return 'page-46';
  }
  if (includesAny(text, ['pin', 'parental'])) {
    return 'page-50';
  }

  return '';
}

export default function NetflixPrototypeSPA() {
  const { page, setPage, defaultPageId } = useHashPage(route);
  const currentPage = availablePageIds.includes(page) ? page : defaultPageId;

  useEffect(() => {
    const legacyPage = readLegacyPageId();
    if (legacyPage && legacyPage !== page) {
      setPage(legacyPage);
    }
  }, [page, setPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const moduleKey = Object.keys(pagesImports).find((key) => key.endsWith(`/${currentPage}/index.tsx`));

  const handlePrototypeClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    const interactive = target?.closest('a,button,[role="button"],.cursor-pointer') as HTMLElement | null;
    if (!interactive) {
      return;
    }

    const anchor = interactive.closest('a') as HTMLAnchorElement | null;
    const href = anchor?.getAttribute('href') || '';
    if (href.startsWith('#page=')) {
      return;
    }
    if (href.startsWith('#/')) {
      const linkedPage = normalizePageId(href.replace(/^#\//, ''));
      if (availablePageIds.includes(linkedPage)) {
        event.preventDefault();
        setPage(linkedPage);
      }
      return;
    }

    const linkedPage = resolveLinkedPage(currentPage, interactive.textContent || '');
    if (linkedPage && availablePageIds.includes(linkedPage)) {
      event.preventDefault();
      setPage(linkedPage);
      return;
    }

    if (href.startsWith('#')) {
      event.preventDefault();
    }
  };

  if (!moduleKey) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-zinc-900 text-zinc-100 space-y-4">
        <h1 className="text-3xl font-bold text-[#E50914]">404 - Prototype Screen Not Found</h1>
        <p>No sub-page matching <strong>{currentPage}</strong> was found in the Netflix directory.</p>
      </div>
    );
  }

  const Component = lazy(pagesImports[moduleKey] as any);

  return (
    <div onClickCapture={handlePrototypeClick}>
      <Suspense fallback={<div className="flex h-screen items-center justify-center bg-black text-[#E50914] text-2xl font-black tracking-tight animate-pulse">Loading Netflix Prototype...</div>}>
        <Component />
      </Suspense>
    </div>
  );
}
