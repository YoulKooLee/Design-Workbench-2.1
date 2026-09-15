import React from 'react';
import JDFlowPage from '../components/JDFlowPage';
import FundHub from '../page-39/index';
import Ranking from '../page-38/index';
import FeaturedList from '../page-11/index';
import WatchlistEmpty from '../page-09/index';
import WatchlistFull from '../page-12/index';
import AdvisorDeparture from '../page-08/index';
import FundArchive from '../page-32/index';
import FundArchiveFull from '../page-33/index';
import Compare from '../page-10/index';
import Holdings from '../page-34/index';
import Market from '../page-35/index';
import Checkout from '../page-37/index';
import type { JDRoutedPageProps } from './types';

export default function FundPage({
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
        { id: 'hub', title: '基金', Component: FundHub },
        { id: 'ranking', title: '基金排行', Component: Ranking },
        { id: 'featured', title: '特色榜单', Component: FeaturedList },
        { id: 'watchlist-empty', title: '基金自选', Component: WatchlistEmpty },
        { id: 'watchlist-full', title: '自选详情', Component: WatchlistFull },
        { id: 'advisor', title: '投顾发车', Component: AdvisorDeparture },
        { id: 'archive', title: '基金档案', Component: FundArchive },
        { id: 'archive-full', title: '基金档案完整页', Component: FundArchiveFull },
        { id: 'market', title: '基金行情', Component: Market },
        { id: 'compare', title: '基金对比', Component: Compare },
        { id: 'holdings', title: '持仓详情', Component: Holdings },
        { id: 'checkout', title: '购买付款', Component: Checkout },
      ]}
      tabs={tabs}
      actions={[
        { from: 'hub', match: ['基金排行', '大数据榜单', '热基收益', '债基热榜'], target: 'ranking' },
        { from: 'hub', match: ['立即看看', '值得投', '定投专区'], target: 'featured' },
        { from: 'hub', match: ['自选'], target: 'watchlist-empty' },
        { from: 'hub', match: ['投顾'], target: 'advisor' },
        { from: 'ranking', match: ['立即看看', '详情', '基金'], target: 'archive' },
        { from: 'featured', match: ['详情', '基金', '立即看看'], target: 'archive' },
        { from: 'archive', match: ['档案', '更多', '详情'], target: 'archive-full' },
        { from: 'archive', match: ['行情', '业绩'], target: 'market' },
        { from: 'archive', match: ['对比'], target: 'compare' },
        { from: 'archive', match: ['买入', '申购'], target: 'checkout' },
        { from: 'checkout', match: ['持仓', '完成'], target: 'holdings' },
        { from: 'watchlist-empty', match: ['添加', '基金'], target: 'watchlist-full' },
        { from: 'watchlist-full', match: ['基金PK', '对比'], target: 'compare' },
        { from: 'watchlist-full', match: ['我的持仓', '持仓'], target: 'holdings' },
        { from: 'advisor', match: ['持仓'], target: 'holdings' },
      ]}
    />
  );
}
