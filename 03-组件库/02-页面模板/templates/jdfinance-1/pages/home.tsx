import React from 'react';
import JDFlowPage from '../components/JDFlowPage';
import HomeScreen from '../page-home/index';
import ServicesTop from '../page-21/index';
import CreditScore from '../page-22/index';
import Recharge from '../page-18/index';
import EmptyOrders from '../page-17/index';
import GoldBean from '../page-13/index';
import type { JDRoutedPageProps } from './types';

export default function HomePage({
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
        { id: 'home', title: '首页', Component: HomeScreen },
        { id: 'all-services', title: '全部服务', Component: ServicesTop },
        { id: 'credit-score', title: '京东信誉分', Component: CreditScore },
        { id: 'recharge', title: '充值中心', Component: Recharge },
        { id: 'orders', title: '订单', Component: EmptyOrders },
        { id: 'gold-bean', title: '黄金豆', Component: GoldBean },
      ]}
      tabs={tabs}
      actions={[
        { from: 'home', match: ['全部服务'], target: 'all-services' },
        { match: ['小金库'], page: 'vault' },
        { match: ['基金'], page: 'fund' },
        { match: ['高端理财', '稳健理财', '理财', '投资理财', '黄金'], page: 'wealth' },
        { match: ['京东信誉分', '信誉分'], target: 'credit-score' },
        { match: ['手机充值'], target: 'recharge' },
        { match: ['我的账单', '订单'], target: 'orders' },
        { match: ['黄金豆'], target: 'gold-bean' },
        { match: ['签到', '天天红包'], page: 'savings' },
        { match: ['提现'], page: 'vault' },
        { match: ['借贷', '借款', '金条', '信用借贷'], page: 'loan' },
        { match: ['权益', '会员', '白条'], page: 'membership' },
        { match: ['保险', '保单', '车险', '应急金', '储备金'], page: 'insurance' },
        { match: ['社区'], page: 'community' },
        { match: ['我的'], page: 'profile-service' },
        { from: 'all-services', match: ['首页应用', '编辑'], target: 'home' },
      ]}
    />
  );
}
