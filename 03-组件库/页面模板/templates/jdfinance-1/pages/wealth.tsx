import React from 'react';
import JDFlowPage from '../components/JDFlowPage';
import WealthHub from '../page-53/index';
import WealthChannel from '../page-14/index';
import FixedTerm from '../page-45/index';
import ProductDetail from '../page-36/index';
import Checkout from '../page-37/index';
import NewUserPromo from '../page-46/index';
import GoldHub from '../page-15/index';
import GoldGuide from '../page-16/index';
import WealthAssets from '../page-02/index';
import type { JDRoutedPageProps } from './types';

export default function WealthPage({
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
        { id: 'hub', title: '理财', Component: WealthChannel },
        { id: 'selected', title: '理财精选', Component: WealthHub },
        { id: 'assets', title: '理财资产', Component: WealthAssets },
        { id: 'fixed-term', title: '定期理财', Component: FixedTerm },
        { id: 'product-detail', title: '产品详情', Component: ProductDetail },
        { id: 'checkout', title: '购买付款', Component: Checkout },
        { id: 'new-user', title: '新客专属', Component: NewUserPromo },
        { id: 'gold', title: '京东黄金', Component: GoldHub },
        { id: 'gold-guide', title: '黄金引导', Component: GoldGuide },
      ]}
      tabs={tabs}
      actions={[
        { from: 'hub', match: ['小金库'], page: 'vault' },
        { from: 'hub', match: ['基金'], page: 'fund' },
        { from: 'hub', match: ['黄金', '了解黄金'], target: 'gold' },
        { from: 'hub', match: ['新人福利', '立即提现'], target: 'assets' },
        { from: 'hub', match: ['稳健理财'], target: 'fixed-term' },
        { from: 'hub', match: ['加自选'], page: 'fund' },
        { from: 'selected', match: ['活钱理财', '稳健理财', '进阶理财', '立即体验'], target: 'fixed-term' },
        { from: 'selected', match: ['灵活取用'], target: 'new-user' },
        { from: 'fixed-term', match: ['立即看看', '立即购买', '买入', '申购'], target: 'product-detail' },
        { from: 'new-user', match: ['立即体验', '立即看看', '立即购买'], target: 'product-detail' },
        { from: 'product-detail', match: ['买入', '立即购买', '立即申购'], target: 'checkout' },
        { from: 'gold', match: ['首页', '新手', '引导'], target: 'gold-guide' },
      ]}
    />
  );
}
