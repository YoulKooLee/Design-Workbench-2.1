import React from 'react';
import JDFlowPage from '../components/JDFlowPage';
import SavingsModal from '../page-07/index';
import CheckIn from '../page-40/index';
import LotteryResult from '../page-41/index';
import CheckInReminder from '../page-42/index';
import type { JDRoutedPageProps } from './types';

export default function SavingsPage({
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
      onBack={navigateBack}
      navigatePage={navigatePage}
      screens={[
        { id: 'modal', title: '省钱', Component: SavingsModal },
        { id: 'check-in', title: '签到领现金', Component: CheckIn },
        { id: 'lottery', title: '抽奖结果', Component: LotteryResult },
        { id: 'reminder', title: '签到提醒', Component: CheckInReminder },
      ]}
      tabs={tabs}
      actions={[
        { from: 'modal', match: ['立即领取', '开通', '奖励升级'], target: 'check-in' },
        { from: 'check-in', match: ['立即抽提现', '抽提现', '抽奖'], target: 'lottery' },
        { from: 'check-in', match: ['提醒', '明天'], target: 'reminder' },
        { from: 'lottery', match: ['明天', '继续', '提醒'], target: 'reminder' },
      ]}
    />
  );
}
