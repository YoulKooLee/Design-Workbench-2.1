/**
 * @name Sketch 官网
 */

import React, { lazy, Suspense, useEffect } from 'react';
import { defineHashPageRoute, useHashPage } from '../../common/useHashPage';
import './style.css';
import pagesConfig from './pages.json';

// Vite Glob Import for all nested pages.
// @ts-ignore
const pagesImports = import.meta.glob('./pages/*/index.tsx');

const route = defineHashPageRoute([
  { id: '08-design-collaborate', title: '设计协作' },
  { id: '03-best-platform', title: '产品平台' },
  { id: '12-pricing', title: '价格' },
  { id: '14-apps', title: '应用' },
  { id: '06-blog', title: '博客' },
  { id: '22-support', title: '支持' },
], { defaultPageId: '08-design-collaborate' });

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

function resolveLinkedPage(textContent: string) {
  const text = textContent.trim().replace(/\s+/g, ' ').toLowerCase();

  if (includesAny(text, ['sketch2react', 'assistant'])) return '21-sketch2react';
  if (includesAny(text, ['switch to sketch', 'download the app'])) return '01-switch-to-sketch';
  if (includesAny(text, ['figma', 'adobe xd', 'compare sketch'])) return '02-sketch-vs-figma';
  if (includesAny(text, ['developer handoff'])) return '04-developer-handoff';
  if (includesAny(text, ['prototyping'])) return '05-prototyping-tools';
  if (includesAny(text, ['what\'s new', 'whats new', 'updates', 'see all updates'])) return '07-whats-new';
  if (includesAny(text, ['workspace', 'workspaces'])) return '09-workspace';
  if (includesAny(text, ['collaboration', 'collaborative'])) return '10-collaborative-design';
  if (includesAny(text, ['community', 'events', 'meetups', 'forums'])) return '11-community';
  if (includesAny(text, ['pricing', 'plans', 'sign in', 'get started', 'let\'s go'])) return '12-pricing';
  if (includesAny(text, ['documentation', 'docs'])) return '13-documentation';
  if (includesAny(text, ['apps'])) return '14-apps';
  if (includesAny(text, ['labs'])) return '15-labs';
  if (includesAny(text, ['education'])) return '16-education';
  if (includesAny(text, ['careers', 'openings', 'jobs'])) return '17-careers';
  if (includesAny(text, ['sketch 101', 'course'])) return '18-sketch-101';
  if (includesAny(text, ['about us', 'about sketch'])) return '19-about-us';
  if (includesAny(text, ['extensions', 'plugins'])) return '20-plugins';
  if (includesAny(text, ['support', 'contact', 'get in touch', 'help'])) return '22-support';
  if (includesAny(text, ['developer platform', 'developer'])) return '23-developer';
  if (includesAny(text, ['discover'])) return '24-discover';
  if (includesAny(text, ['newsletter'])) return '25-newsletter';
  if (includesAny(text, ['product', 'why sketch', 'best platform'])) return '03-best-platform';
  if (includesAny(text, ['blog', 'read on our blog', 'check our blog', 'learn'])) return '06-blog';
  if (includesAny(text, ['design'])) return '08-design-collaborate';

  return '';
}

function scrollLocalAnchor(hash: string) {
  const id = hash.replace(/^#/, '');
  const target = id ? document.getElementById(id) : null;
  target?.scrollIntoView({ block: 'start' });
}

export default function SketchWebsiteSPA() {
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

    const linkedPage = resolveLinkedPage(interactive.textContent || '');
    if (linkedPage && availablePageIds.includes(linkedPage)) {
      event.preventDefault();
      setPage(linkedPage);
      return;
    }

    if (href.startsWith('#')) {
      event.preventDefault();
      scrollLocalAnchor(href);
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
      <Suspense fallback={<div className="flex h-screen items-center justify-center bg-white text-black text-2xl font-black tracking-tight animate-pulse">Loading Sketch Page...</div>}>
        <Component />
      </Suspense>
    </div>
  );
}
