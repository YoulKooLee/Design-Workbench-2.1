/**
 * @name 京东金融
 */

import React, { useCallback, useEffect, useState } from 'react';
import { defineHashPageRoute, useHashPage } from '../../common/useHashPage';
import type { JDOfficialPageId } from './flow';
import type { JDTabItem } from './components/JDFlowPage';
import SplashPage from './page-01/index';
import HomePage from './pages/home';
import WealthPage from './pages/wealth';
import SavingsPage from './pages/savings';
import CommunityPage from './pages/community';
import FundPage from './pages/fund';
import VaultPage from './pages/vault';
import LoanPage from './pages/loan';
import MembershipPage from './pages/membership';
import InsurancePage from './pages/insurance';
import ProfileServicePage from './pages/profile-service';
import './style.css';

const route = defineHashPageRoute([
  { id: 'home', title: '首页' },
  { id: 'wealth', title: '理财' },
  { id: 'savings', title: '省钱' },
  { id: 'community', title: '社区' },
  { id: 'fund', title: '基金' },
  { id: 'vault', title: '小金库' },
  { id: 'loan', title: '借贷' },
  { id: 'membership', title: '权益会员' },
  { id: 'insurance', title: '保险' },
  { id: 'profile-service', title: '我的与服务' },
], { defaultPageId: 'home' });

const routeComponents = {
  home: HomePage,
  wealth: WealthPage,
  savings: SavingsPage,
  community: CommunityPage,
  fund: FundPage,
  vault: VaultPage,
  loan: LoanPage,
  membership: MembershipPage,
  insurance: InsurancePage,
  'profile-service': ProfileServicePage,
};

const mainTabs: JDTabItem[] = [
  { id: 'home', label: '首页' },
  { id: 'wealth', label: '理财' },
  { id: 'savings', label: '省钱' },
  { id: 'community', label: '社区' },
  { id: 'profile-service', label: '我的' },
];

const tabOwners: Partial<Record<JDOfficialPageId, JDOfficialPageId>> = {
  fund: 'wealth',
  vault: 'wealth',
  loan: 'home',
  membership: 'profile-service',
  insurance: 'profile-service',
};

export default function JDFinancePrototype() {
  const { page, setPage } = useHashPage(route);
  const [showSplash, setShowSplash] = useState(() => page === 'home');
  const ActivePage = routeComponents[page as keyof typeof routeComponents] || routeComponents.home;
  const activePage = (page in routeComponents ? page : 'home') as JDOfficialPageId;
  const activeTabPage = tabOwners[activePage] || activePage;

  useEffect(() => {
    if (page !== 'home') {
      setShowSplash(false);
    }
  }, [page]);

  const enterHome = useCallback(() => {
    setShowSplash(false);
    if (page !== 'home') {
      setPage('home');
    }
  }, [page, setPage]);

  useEffect(() => {
    if (!showSplash) {
      return undefined;
    }

    const timer = window.setTimeout(enterHome, 2000);
    return () => window.clearTimeout(timer);
  }, [enterHome, showSplash]);

  const navigatePage = (pageId: JDOfficialPageId) => {
    setPage(pageId);
  };

  const navigateBack = () => {
    if (activePage !== 'home') {
      setPage('home');
    }
  };

  if (showSplash) {
    return (
      <button
        aria-label="进入京东金融首页"
        className="jd-splash-entry"
        type="button"
        onClick={enterHome}
      >
        <SplashPage />
      </button>
    );
  }

  return (
    <ActivePage
      activePage={activePage}
      activeTabPage={activeTabPage}
      navigateBack={navigateBack}
      navigatePage={navigatePage}
      tabs={mainTabs}
    />
  );
}
