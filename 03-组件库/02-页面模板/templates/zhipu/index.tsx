/**
 * @name 智谱清言
 */

import React, { lazy, Suspense, useEffect } from 'react';
import { defineHashPageRoute, useHashPage } from '../../common/useHashPage';
import './style.css';
import pagesConfig from './pages.json';

// Vite Glob Import for all nested pages at root level.
// @ts-ignore
const pagesImports = import.meta.glob('./page-*/index.tsx');

const route = defineHashPageRoute([
  { id: 'page-32', title: '首页' },
  { id: 'page-31', title: '侧边导航' },
  { id: 'page-02', title: '个人中心' },
  { id: 'page-21', title: '智能体广场' },
  { id: 'page-22', title: 'AI 搜索' },
  { id: 'page-16', title: 'AI 画图首页' },
], { defaultPageId: 'page-32' });

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

  if (includesAny(text, ['一键登录', '点击登录', '登录'])) {
    return 'page-28';
  }
  if (includesAny(text, ['首页'])) {
    return 'page-32';
  }
  if (includesAny(text, ['取消', '关闭', '返回'])) {
    if (['page-06', 'page-07', 'page-08', 'page-17', 'page-19', 'page-20'].includes(currentPage)) return 'page-21';
    if (['page-13', 'page-14', 'page-15', 'page-12'].includes(currentPage)) return 'page-16';
    if (['page-23', 'page-24', 'page-26', 'page-30'].includes(currentPage)) return 'page-29';
    return 'page-32';
  }
  if (includesAny(text, ['最近对话', '最近智能体', '编辑'])) {
    return 'page-11';
  }
  if (includesAny(text, ['智能体'])) {
    if (includesAny(text, ['更多智能体', '官方推荐', '推荐'])) return 'page-21';
    if (includesAny(text, ['我的智能体'])) return 'page-09';
    if (includesAny(text, ['官方'])) return 'page-17';
    if (includesAny(text, ['自定义'])) return 'page-19';
    return currentPage === 'page-21' ? 'page-17' : 'page-21';
  }
  if (includesAny(text, ['ai搜索', 'ai 搜索', '搜索'])) {
    return 'page-22';
  }
  if (includesAny(text, ['ai画图', 'ai 画图', '图片创作'])) {
    return currentPage === 'page-16' ? 'page-13' : 'page-16';
  }
  if (includesAny(text, ['生图', '生成图片'])) {
    return 'page-13';
  }
  if (includesAny(text, ['图片编辑', '编辑图片'])) {
    return 'page-14';
  }
  if (includesAny(text, ['预览'])) {
    return 'page-15';
  }
  if (includesAny(text, ['清影', '视频'])) {
    return 'page-27';
  }
  if (includesAny(text, ['写作'])) {
    return 'page-30';
  }
  if (includesAny(text, ['我的作品', '作品'])) {
    return 'page-10';
  }
  if (includesAny(text, ['个人中心', '会员', 'vip'])) {
    return includesAny(text, ['会员', 'vip']) ? 'page-03' : 'page-02';
  }
  if (includesAny(text, ['配置', '创建', '发布'])) {
    return 'page-07';
  }
  if (includesAny(text, ['权限'])) {
    return 'page-06';
  }
  if (includesAny(text, ['自动生成'])) {
    return 'page-08';
  }
  if (includesAny(text, ['分享对话'])) {
    return 'page-18';
  }
  if (includesAny(text, ['分享'])) {
    return 'page-23';
  }
  if (includesAny(text, ['历史'])) {
    return 'page-24';
  }
  if (includesAny(text, ['定时'])) {
    return 'page-26';
  }
  if (includesAny(text, ['消除'])) {
    return 'page-12';
  }
  if (includesAny(text, ['社区', '发帖'])) {
    return currentPage === 'page-05' ? 'page-04' : 'page-05';
  }
  if (includesAny(text, ['更多'])) {
    return 'page-25';
  }
  if (includesAny(text, ['输入你的问题', '开始对话', '继续对话'])) {
    return 'page-29';
  }

  return '';
}

export default function ZhipuPrototypeSPA() {
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
      <div className="flex flex-col h-screen items-center justify-center bg-gray-50 text-gray-900 space-y-4">
        <h1 className="text-3xl font-bold text-blue-600">404 - Prototype Screen Not Found</h1>
        <p>No sub-page matching <strong>{currentPage}</strong> was found in the Zhipu directory.</p>
      </div>
    );
  }

  const Component = lazy(pagesImports[moduleKey] as any);

  return (
    <div onClickCapture={handlePrototypeClick}>
      <Suspense fallback={<div className="flex flex-col h-screen items-center justify-center bg-gray-50 text-blue-600 text-2xl font-bold tracking-wide animate-pulse">Loading Zhipu Prototype...</div>}>
        <Component />
      </Suspense>
    </div>
  );
}
