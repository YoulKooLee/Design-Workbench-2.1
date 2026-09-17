import React from 'react';
import JDFlowPage from '../components/JDFlowPage';
import VaultHub from '../page-59/index';
import VaultHoldings from '../page-44/index';
import Bill from '../page-56/index';
import Services from '../page-57/index';
import PromoModal from '../page-58/index';
import YieldPurchase from '../page-47/index';
import PartnerHero from '../page-50/index';
import PartnerTop from '../page-49/index';
import PartnerDetail from '../page-48/index';
import PartnerModal from '../page-51/index';
import AssetDetails from '../page-43/index';
import type { JDRoutedPageProps } from './types';

export default function VaultPage({
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
        { id: 'hub', title: '小金库', Component: VaultHub },
        { id: 'holdings', title: '金库持仓', Component: VaultHoldings },
        { id: 'asset-details', title: '收益详情', Component: AssetDetails },
        { id: 'bill', title: '账单', Component: Bill },
        { id: 'services', title: '全部服务', Component: Services },
        { id: 'promo', title: '促销弹窗', Component: PromoModal },
        { id: 'yield-purchase', title: '收益购', Component: YieldPurchase },
        { id: 'partner', title: '白金合伙人', Component: PartnerHero },
        { id: 'partner-top', title: '白金合伙人攻略', Component: PartnerTop },
        { id: 'partner-detail', title: '白金合伙人详情', Component: PartnerDetail },
        { id: 'partner-modal', title: '白金合伙人弹层', Component: PartnerModal },
      ]}
      tabs={tabs}
      actions={[
        { from: 'hub', match: ['立即体验', '固收理财'], target: 'holdings' },
        { from: 'hub', match: ['收益购'], target: 'yield-purchase' },
        { from: 'hub', match: ['白金合伙人', '红包'], target: 'partner' },
        { from: 'hub', match: ['全部服务'], target: 'services' },
        { from: 'hub', match: ['账单', '明细'], target: 'bill' },
        { from: 'holdings', match: ['账单', '明细'], target: 'bill' },
        { from: 'holdings', match: ['收益', '走势'], target: 'asset-details' },
        { from: 'services', match: ['红包', '促销', '领取'], target: 'promo' },
        { from: 'yield-purchase', match: ['快速了解', '白金合伙人'], target: 'partner' },
        { from: 'partner', match: ['攻略', '白金合伙人'], target: 'partner-top' },
        { from: 'partner-top', match: ['省钱攒钱', '小金库赚收益'], target: 'partner-detail' },
        { from: 'partner-detail', match: ['立即攒', '立即开通', '领取'], target: 'partner-modal' },
      ]}
    />
  );
}
