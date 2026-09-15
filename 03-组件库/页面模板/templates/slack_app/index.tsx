/**
 * @name Slack App
 */

import React, { lazy, Suspense, useEffect } from 'react';
import { defineHashPageRoute, useHashPage } from '../../common/useHashPage';
import './style.css';
import pagesConfig from './pages.json';

// Vite Glob Import for all nested pages at root level.
// @ts-ignore
const pagesImports = import.meta.glob('./page-*/index.tsx');

const route = defineHashPageRoute([
  { id: 'page-27', title: 'Slackbot 聊天' },
  { id: 'page-28', title: '主侧边栏' },
  { id: 'page-01', title: '自我备忘' },
  { id: 'page-04', title: '编辑资料' },
  { id: 'page-08', title: '全部文件' },
  { id: 'page-22', title: '全局搜索空状态' },
], { defaultPageId: 'page-27' });

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

  if (includesAny(text, ['next'])) {
    const currentIndex = availablePageIds.indexOf(currentPage);
    return availablePageIds[currentIndex + 1] || '';
  }
  if (includesAny(text, ['cancel', 'close', 'done'])) {
    if (currentPage === 'page-04') return 'page-15';
    if (['page-07', 'page-08', 'page-09', 'page-20'].includes(currentPage)) return 'page-28';
    return 'page-27';
  }
  if (currentPage === 'page-15' && includesAny(text, ['message'])) {
    return 'page-01';
  }
  if (includesAny(text, ['slackbot', 'close dm'])) {
    return 'page-27';
  }
  if (includesAny(text, ['direct messages'])) {
    return 'page-02';
  }
  if (includesAny(text, ['huang', 'jensen', 'you', 'self memo', 'jot something'])) {
    return currentPage === 'page-28' || currentPage === 'page-02' ? 'page-01' : 'page-15';
  }
  if (includesAny(text, ['general', 'designtools', 'channel'])) {
    return 'page-03';
  }
  if (includesAny(text, ['edit profile'])) {
    return 'page-04';
  }
  if (includesAny(text, ['invite'])) {
    return 'page-05';
  }
  if (includesAny(text, ['member', 'people'])) {
    return 'page-06';
  }
  if (includesAny(text, ['all files', 'files'])) {
    return currentPage === 'page-08' ? 'page-09' : 'page-08';
  }
  if (includesAny(text, ['screen shot', 'png', 'darkness'])) {
    return 'page-07';
  }
  if (includesAny(text, ['starred'])) {
    return 'page-10';
  }
  if (includesAny(text, ['activity'])) {
    return 'page-11';
  }
  if (includesAny(text, ['status'])) {
    return 'page-12';
  }
  if (includesAny(text, ['apps', 'bots', 'add apps'])) {
    return 'page-13';
  }
  if (includesAny(text, ['call'])) {
    return 'page-14';
  }
  if (includesAny(text, ['profile', 'photo'])) {
    return 'page-15';
  }
  if (includesAny(text, ['workspaces'])) {
    return 'page-17';
  }
  if (includesAny(text, ['account'])) {
    return 'page-18';
  }
  if (includesAny(text, ['attach', 'upload', 'image'])) {
    return 'page-19';
  }
  if (includesAny(text, ['mention', '@'])) {
    return 'page-21';
  }
  if (includesAny(text, ['search'])) {
    if (currentPage === 'page-22') return 'page-23';
    if (currentPage === 'page-23') return 'page-24';
    return 'page-22';
  }
  if (includesAny(text, ['messages'])) {
    return 'page-23';
  }
  if (includesAny(text, ['do not disturb', 'dnd'])) {
    return 'page-25';
  }
  if (includesAny(text, ['settings'])) {
    return 'page-26';
  }
  if (includesAny(text, ['check your email', 'magic link', 'email'])) {
    return currentPage === 'page-29' ? 'page-30' : 'page-29';
  }

  return '';
}

export default function SlackAppSPA() {
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
      <div className="flex flex-col h-screen items-center justify-center bg-gray-50 text-gray-800 space-y-4">
        <h1 className="text-3xl font-bold text-red-500">404 - Sub-page Not Found</h1>
        <p>No prototype sub-page matching <strong>{currentPage}</strong> was found.</p>
      </div>
    );
  }

  const Component = lazy(pagesImports[moduleKey] as any);

  return (
    <div onClickCapture={handlePrototypeClick}>
      <Suspense fallback={<div className="flex h-screen items-center justify-center bg-white text-black text-2xl font-black tracking-tight animate-pulse">Loading Slack Prototype...</div>}>
        <Component />
      </Suspense>
    </div>
  );
}
