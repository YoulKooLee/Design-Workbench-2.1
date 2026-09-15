import React from 'react';
import JDFlowPage from '../components/JDFlowPage';
import Profile from '../page-05/index';
import ServicesHub from '../page-19/index';
import ServicesTop from '../page-21/index';
import LendingServices from '../page-20/index';
import Coupons from '../page-03/index';
import ProfileClassic from '../page-04/index';
import type { JDRoutedPageProps } from './types';

export default function ProfileServicePage({
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
        { id: 'profile', title: '我的', Component: Profile },
        { id: 'profile-classic', title: '我的旧版', Component: ProfileClassic },
        { id: 'services', title: '全部服务', Component: ServicesHub },
        { id: 'services-top', title: '服务总览', Component: ServicesTop },
        { id: 'lending', title: '信用借贷', Component: LendingServices },
        { id: 'coupons', title: '优惠券', Component: Coupons },
      ]}
      tabs={tabs}
      actions={[
        { from: 'profile', match: ['优惠券'], target: 'coupons' },
        { from: 'profile', match: ['全部服务', '服务'], target: 'services' },
        { from: 'profile', match: ['我的资产'], target: 'profile-classic' },
        { from: 'profile', match: ['小金库'], page: 'vault' },
        { from: 'profile', match: ['基金'], page: 'fund' },
        { from: 'profile', match: ['保险'], page: 'insurance' },
        { from: 'profile', match: ['白条', '会员'], page: 'membership' },
        { from: 'services', match: ['信用借贷', '借贷'], target: 'lending' },
        { from: 'services', match: ['顶部', '首页总览'], target: 'services-top' },
        { from: 'services', match: ['保险保障', '保险', '车险', '应急金', '储备金'], page: 'insurance' },
        { from: 'services', match: ['互动福利', '签到', '天天红包'], page: 'savings' },
        { from: 'services', match: ['基金', '投资理财'], page: 'fund' },
        { from: 'services', match: ['小金库'], page: 'vault' },
        { from: 'lending', match: ['金条', '借款', '借钱'], page: 'loan' },
      ]}
    />
  );
}
