import React from 'react';
import JDFlowPage from '../components/JDFlowPage';
import CommunityHub from '../page-06/index';
import AdvisorDeparture from '../page-08/index';
import FundWatchlist from '../page-09/index';
import FundWatchlistFull from '../page-12/index';
import type { JDRoutedPageProps } from './types';

export default function CommunityPage({
  activePage,
  activeTabPage,
  navigateBack,
  navigatePage,
  tabs,
}: JDRoutedPageProps) {
  return (
    <JDFlowPage
      activePage={activePage}
      activeTabPage={activeTabPage}
      navigatePage={navigatePage}
      onBack={navigateBack}
      screens={[
        { id: 'hub', title: '社区', Component: CommunityHub },
        { id: 'advisor', title: '投顾发车', Component: AdvisorDeparture },
        { id: 'watchlist-empty', title: '基金自选', Component: FundWatchlist },
        { id: 'watchlist-full', title: '自选详情', Component: FundWatchlistFull },
      ]}
      tabs={tabs}
      actions={[
        { from: 'hub', match: ['基金牛人榜', '基金圈', '牛人', '发车'], target: 'advisor' },
        { from: 'hub', match: ['基金持仓', '自选'], target: 'watchlist-empty' },
        { from: 'advisor', match: ['自选', '添加自选'], target: 'watchlist-empty' },
        { from: 'watchlist-empty', match: ['添加', '基金', '持仓'], target: 'watchlist-full' },
      ]}
    />
  );
}
