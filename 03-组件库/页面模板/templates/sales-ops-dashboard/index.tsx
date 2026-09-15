/**
 * @name SalesOps 销售运营仪表盘
 *
 * 参考资料：
 * - /rules/prototype-development-guide.md
 */

import React from 'react';
import './style.css';

import { Header } from './components/dashboard/header';
import { Sidebar } from './components/dashboard/sidebar';
import { CustomersSection } from './components/dashboard/sections/customers';
import { DealsSection } from './components/dashboard/sections/deals';
import { ForecastingSection } from './components/dashboard/sections/forecasting';
import { OverviewSection } from './components/dashboard/sections/overview';
import { PipelineSection } from './components/dashboard/sections/pipeline';
import { ReportsSection } from './components/dashboard/sections/reports';
import { SettingsSection } from './components/dashboard/sections/settings';
import { TeamSection } from './components/dashboard/sections/team';

export type Section =
  | 'overview'
  | 'pipeline'
  | 'deals'
  | 'customers'
  | 'team'
  | 'forecasting'
  | 'reports'
  | 'settings';

export default function SalesOpsDashboard() {
  const [activeSection, setActiveSection] = React.useState<Section>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'pipeline':
        return <PipelineSection />;
      case 'deals':
        return <DealsSection />;
      case 'customers':
        return <CustomersSection />;
      case 'team':
        return <TeamSection />;
      case 'forecasting':
        return <ForecastingSection />;
      case 'reports':
        return <ReportsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground sales-ops-dashboard">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
      <div
        className={`flex min-h-screen flex-col transition-all duration-300 ease-out ${
          sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'
        }`}
      >
        <Header activeSection={activeSection} />
        <main className="flex-1 overflow-auto p-6">
          <div
            key={activeSection}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
