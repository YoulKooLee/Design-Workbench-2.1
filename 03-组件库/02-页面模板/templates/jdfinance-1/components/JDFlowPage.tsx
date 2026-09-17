import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { JDOfficialPageId } from '../flow';

type ScreenComponent = React.ComponentType;

export type JDFlowScreen = {
  id: string;
  title: string;
  Component: ScreenComponent;
};

export type JDFlowAction = {
  from?: string;
  match: string[];
  target?: string;
  page?: JDOfficialPageId;
};

export type JDTabItem = {
  id: JDOfficialPageId;
  label: string;
};

type JDFlowPageProps = {
  screens: JDFlowScreen[];
  actions: JDFlowAction[];
  navigatePage: (pageId: JDOfficialPageId) => void;
  activePage: JDOfficialPageId;
  activeTabPage?: JDOfficialPageId;
  tabs?: JDTabItem[];
  onBack?: () => void;
};

function normalizeActionText(value: string): string {
  return value.replace(/\s+/g, '');
}

function isClickableCandidate(node: HTMLElement, root: HTMLElement): boolean {
  if (node === root) {
    return false;
  }

  if (
    node instanceof HTMLButtonElement
    || node instanceof HTMLAnchorElement
    || node.hasAttribute('role')
    || node.dataset.jdAction
  ) {
    return true;
  }

  const className = typeof node.className === 'string' ? node.className : '';
  return className.includes('cursor-pointer') || className.includes('active:');
}

function findFlowAction(
  target: EventTarget | null,
  root: HTMLElement | null,
  activeScreenId: string,
  actions: JDFlowAction[],
): JDFlowAction | null {
  if (!(target instanceof Element) || !root) {
    return null;
  }

  let node: Element | null = target;
  while (node && node !== root) {
    const actionElement = node instanceof HTMLElement ? node : node.parentElement;
    const actionText = normalizeActionText(actionElement?.innerText || node.textContent || '');
    const isShortTarget = actionText.length > 0 && actionText.length <= 36;
    if (
      actionText
      && actionElement
      && (isShortTarget || isClickableCandidate(actionElement, root))
    ) {
      const action = actions.find((candidate) => (
        (!candidate.from || candidate.from === activeScreenId)
        && candidate.match.some((pattern) => actionText.includes(normalizeActionText(pattern)))
      ));
      if (action) {
        return action;
      }
    }
    node = node.parentElement;
  }

  return null;
}

export default function JDFlowPage({
  screens,
  actions,
  navigatePage,
  activePage,
  activeTabPage = activePage,
  tabs = [],
  onBack,
}: JDFlowPageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rootScreenId = screens[0]?.id || '';
  const [activeScreenId, setActiveScreenId] = useState(rootScreenId);
  const [, setScreenStack] = useState<string[]>([rootScreenId]);
  const activeScreen = useMemo(
    () => screens.find((screen) => screen.id === activeScreenId) || screens[0],
    [activeScreenId, screens],
  );

  useEffect(() => {
    setActiveScreenId(rootScreenId);
    setScreenStack([rootScreenId]);
  }, [rootScreenId]);

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, [activePage, activeScreen?.id]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const legacyMainTabText = /首页.*理财.*省钱.*社区.*我的/u;
    root.querySelectorAll<HTMLElement>('[data-jd-legacy-main-tabbar="true"]').forEach((node) => {
      node.removeAttribute('data-jd-legacy-main-tabbar');
    });

    root.querySelectorAll<HTMLElement>('div').forEach((node) => {
      const text = normalizeActionText(node.innerText || node.textContent || '');
      if (!legacyMainTabText.test(text)) {
        return;
      }

      const style = window.getComputedStyle(node);
      if (style.position === 'fixed') {
        node.setAttribute('data-jd-legacy-main-tabbar', 'true');
      }
    });
  }, [activePage, activeScreen?.id]);

  if (!activeScreen) {
    return null;
  }

  const ActiveComponent = activeScreen.Component;
  const isRootScreen = activeScreen.id === screens[0]?.id;
  const isMainTabRoot = tabs.some((tab) => tab.id === activePage);
  const shouldShowBack = !isRootScreen || Boolean(onBack && !isMainTabRoot);
  const goToScreen = (targetId: string) => {
    if (!screens.some((screen) => screen.id === targetId)) {
      return;
    }

    setScreenStack((currentStack) => {
      if (currentStack[currentStack.length - 1] === targetId) {
        return currentStack;
      }
      return [...currentStack, targetId];
    });
    setActiveScreenId(targetId);
  };

  const goBack = () => {
    if (!isRootScreen) {
      setScreenStack((currentStack) => {
        const nextStack = currentStack.length > 1 ? currentStack.slice(0, -1) : [rootScreenId];
        setActiveScreenId(nextStack[nextStack.length - 1] || rootScreenId);
        return nextStack;
      });
      return;
    }

    onBack?.();
  };

  return (
    <div
      className="jd-flow-page"
      ref={rootRef}
      onClickCapture={(event) => {
        const navTarget = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-jd-nav-page]');
        if (navTarget && event.currentTarget.contains(navTarget)) {
          const pageId = navTarget.dataset.jdNavPage as JDOfficialPageId | undefined;
          if (pageId) {
            event.stopPropagation();
            navigatePage(pageId);
          }
          return;
        }

        const backTarget = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-jd-back]');
        if (backTarget && event.currentTarget.contains(backTarget)) {
          event.stopPropagation();
          goBack();
          return;
        }

        const action = findFlowAction(event.target, event.currentTarget, activeScreen.id, actions);
        if (!action) {
          return;
        }

        if (action.page) {
          event.stopPropagation();
          navigatePage(action.page);
          return;
        }

        if (action.target && screens.some((screen) => screen.id === action.target)) {
          event.stopPropagation();
          goToScreen(action.target);
        }
      }}
    >
      {shouldShowBack ? (
        <button
          aria-label="返回"
          className="jd-flow-back"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            goBack();
          }}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15 18 9 12l6-6" />
          </svg>
        </button>
      ) : null}
      <ActiveComponent />
      {tabs.length > 0 ? (
        <nav className="jd-app-tabbar" aria-label="京东金融主导航">
          {tabs.map((tab) => (
            <button
              className={`jd-app-tab ${tab.id === activeTabPage ? 'jd-app-tab-active' : ''}`}
              data-jd-nav-page={tab.id}
              key={tab.id}
              type="button"
            >
              <span className={`jd-app-tab-icon jd-app-tab-icon-${tab.id}`} aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
