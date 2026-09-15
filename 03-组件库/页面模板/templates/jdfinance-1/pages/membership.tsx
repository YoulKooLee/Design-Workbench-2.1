import React from 'react';
import JDFlowPage from '../components/JDFlowPage';
import VipHub from '../page-55/index';
import BenefitSelector from '../page-54/index';
import BaitiaoVip from '../page-65/index';
import BaitiaoActive from '../page-66/index';
import GuideStep1 from '../page-70/index';
import GuideStep2 from '../page-69/index';
import GuideStep3 from '../page-68/index';
import GuideStep4 from '../page-67/index';
import type { JDRoutedPageProps } from './types';

export default function MembershipPage({
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
        { id: 'vip', title: '权益会员', Component: VipHub },
        { id: 'selector', title: '可选权益', Component: BenefitSelector },
        { id: 'baitiao', title: '白条权益', Component: BaitiaoVip },
        { id: 'active', title: '白条激活', Component: BaitiaoActive },
        { id: 'guide-1', title: '新手引导 1', Component: GuideStep1 },
        { id: 'guide-2', title: '新手引导 2', Component: GuideStep2 },
        { id: 'guide-3', title: '新手引导 3', Component: GuideStep3 },
        { id: 'guide-4', title: '新手引导 4', Component: GuideStep4 },
      ]}
      tabs={tabs}
      actions={[
        { from: 'vip', match: ['灵活取用', '可选权益', '立即体验'], target: 'selector' },
        { from: 'selector', match: ['白条', '权益', '领取'], target: 'baitiao' },
        { from: 'baitiao', match: ['激活', '立即开通', '领取'], target: 'active' },
        { from: 'active', match: ['新手', '引导', '下一步'], target: 'guide-1' },
        { from: 'guide-1', match: ['下一步', '知道了'], target: 'guide-2' },
        { from: 'guide-2', match: ['下一步', '知道了'], target: 'guide-3' },
        { from: 'guide-3', match: ['下一步', '知道了'], target: 'guide-4' },
      ]}
    />
  );
}
