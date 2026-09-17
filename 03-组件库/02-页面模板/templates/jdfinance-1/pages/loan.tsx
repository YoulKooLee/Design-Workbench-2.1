import React from 'react';
import JDFlowPage from '../components/JDFlowPage';
import LoanHome from '../page-64/index';
import BorrowMain from '../page-63/index';
import TermSelect from '../page-62/index';
import RepayTerms from '../page-61/index';
import Explanation from '../page-60/index';
import FarmerLoan from '../page-23/index';
import CreditServices from '../page-20/index';
import type { JDRoutedPageProps } from './types';

export default function LoanPage({
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
        { id: 'home', title: '借贷', Component: LoanHome },
        { id: 'services', title: '信用借贷', Component: CreditServices },
        { id: 'farmer', title: '农户借款', Component: FarmerLoan },
        { id: 'borrow', title: '借款操作', Component: BorrowMain },
        { id: 'term', title: '借多久', Component: TermSelect },
        { id: 'repay', title: '还款说明', Component: RepayTerms },
        { id: 'explain', title: '借款说明', Component: Explanation },
      ]}
      tabs={tabs}
      actions={[
        { from: 'home', match: ['我要借款'], target: 'borrow' },
        { from: 'home', match: ['立即领取', '产品推荐'], target: 'explain' },
        { from: 'home', match: ['我的'], page: 'profile-service' },
        { from: 'services', match: ['金条借款', '借钱'], target: 'home' },
        { from: 'services', match: ['农户借钱', '农户借款'], target: 'farmer' },
        { from: 'farmer', match: ['我要借款'], target: 'borrow' },
        { from: 'borrow', match: ['借多久', '期数', '还款计划'], target: 'term' },
        { from: 'borrow', match: ['说明', '还款'], target: 'repay' },
        { from: 'term', match: ['下一步', '确认', '还款说明'], target: 'repay' },
      ]}
    />
  );
}
