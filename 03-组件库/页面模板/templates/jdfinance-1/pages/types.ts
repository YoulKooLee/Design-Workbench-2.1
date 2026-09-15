import type { JDTabItem } from '../components/JDFlowPage';
import type { JDOfficialPageId } from '../flow';

export type JDRoutedPageProps = {
  activePage: JDOfficialPageId;
  activeTabPage?: JDOfficialPageId;
  navigateBack: () => void;
  navigatePage: (pageId: JDOfficialPageId) => void;
  tabs: JDTabItem[];
};
