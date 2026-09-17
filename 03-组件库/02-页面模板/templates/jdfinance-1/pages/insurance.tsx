import React from 'react';
import JDFlowPage from '../components/JDFlowPage';
import InsuranceHub from '../page-31/index';
import EmergencyFund from '../page-25/index';
import SelfAllocation from '../page-26/index';
import GapAnalysis from '../page-27/index';
import CarBenefit from '../page-52/index';
import ReserveFund from '../page-24/index';
import MinorEmergency from '../page-28/index';
import InsuranceProfile from '../page-29/index';
import InsuranceProfileTop from '../page-30/index';
import type { JDRoutedPageProps } from './types';

export default function InsurancePage({
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
        { id: 'hub', title: '保险', Component: InsuranceHub },
        { id: 'emergency', title: '家庭应急金', Component: EmergencyFund },
        { id: 'self', title: '保自己', Component: SelfAllocation },
        { id: 'gap', title: '缺口分析', Component: GapAnalysis },
        { id: 'car-benefit', title: '车险权益', Component: CarBenefit },
        { id: 'reserve', title: '储备金保险', Component: ReserveFund },
        { id: 'minor', title: '小病应急', Component: MinorEmergency },
        { id: 'profile', title: '保险我的', Component: InsuranceProfile },
        { id: 'profile-top', title: '保险我的顶部', Component: InsuranceProfileTop },
      ]}
      tabs={tabs}
      actions={[
        { from: 'hub', match: ['家庭应急金', '应急金'], target: 'emergency' },
        { from: 'hub', match: ['车险', '免息券'], target: 'car-benefit' },
        { from: 'hub', match: ['储备金', '养老', '教育'], target: 'reserve' },
        { from: 'hub', match: ['我的', '保单'], target: 'profile' },
        { from: 'emergency', match: ['保自己', '立即配置'], target: 'self' },
        { from: 'self', match: ['缺口', '分析', '下一步'], target: 'gap' },
        { from: 'gap', match: ['小病', '天天攒保障'], target: 'minor' },
        { from: 'gap', match: ['车险', '权益'], target: 'car-benefit' },
        { from: 'profile', match: ['我的保单', '保单与金额'], target: 'profile-top' },
      ]}
    />
  );
}
