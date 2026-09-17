import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { EnhancedTopNavigation } from './components/EnhancedTopNavigation';
import { EnhancedSidebar } from './components/EnhancedSidebar';
import { EnhancedDashboard } from './components/EnhancedDashboard';
import { DriversModule } from './components/DriversModule';
import { VehiclesModule } from './components/VehiclesModule';
import { TransportsModule } from './components/TransportsModule';
import { RoutesModule } from './components/RoutesModule';
import { RevenueModule } from './components/RevenueModule';
import { SettingsModule } from './components/SettingsModule';
import { LogsModule } from './components/LogsModule';

// Modal Components
import { UserProfileModal } from './components/UserProfileModal';
import { CreateTripModal } from './components/CreateTripModal';
import { RouteOptimizationModal, AnalyticsModal, AlertsModal, GenerateReportModal } from './components/QuickActionModals';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');

  // Modal States
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [createTripOpen, setCreateTripOpen] = useState(false);
  const [routeOptimizationOpen, setRouteOptimizationOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [generateReportOpen, setGenerateReportOpen] = useState(false);

  // Global action handlers that can be called from any component
  const globalActions = {
    openUserProfile: () => setUserProfileOpen(true),
    openCreateTrip: () => setCreateTripOpen(true),
    openRouteOptimization: () => setRouteOptimizationOpen(true),
    openAnalytics: () => setAnalyticsOpen(true),
    openAlerts: () => setAlertsOpen(true),
    openGenerateReport: () => setGenerateReportOpen(true),
    navigateToModule: (module: string) => setActiveModule(module)
  };

  const renderContent = () => {
    const commonProps = {
      onOpenCreateTrip: globalActions.openCreateTrip,
      onOpenRouteOptimization: globalActions.openRouteOptimization,
      onOpenAnalytics: globalActions.openAnalytics,
      onOpenAlerts: globalActions.openAlerts,
      onOpenGenerateReport: globalActions.openGenerateReport,
      onNavigateToModule: globalActions.navigateToModule
    };

    switch (activeModule) {
      case 'dashboard':
        return <EnhancedDashboard {...commonProps} />;
      
      case 'transports':
        return <TransportsModule {...commonProps} />;
      
      case 'vehicles':
        return <VehiclesModule />;
      
      case 'drivers':
        return <DriversModule />;
      
      case 'routes':
        return <RoutesModule {...commonProps} />;
      
      case 'revenue':
        return <RevenueModule />;
      
      case 'logs':
        return <LogsModule />;
      
      case 'settings':
        return <SettingsModule />;
      
      default:
        return <EnhancedDashboard {...commonProps} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col bg-background transition-colors">
        {/* Enhanced Top Navigation */}
        <EnhancedTopNavigation 
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          onOpenUserProfile={globalActions.openUserProfile}
        />
        
        {/* Main Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Enhanced Sidebar */}
          <EnhancedSidebar
            collapsed={sidebarCollapsed}
            onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            activeModule={activeModule}
            onModuleChange={setActiveModule}
            onOpenRouteOptimization={globalActions.openRouteOptimization}
            onOpenAnalytics={globalActions.openAnalytics}
            onOpenAlerts={globalActions.openAlerts}
            onOpenGenerateReport={globalActions.openGenerateReport}
          />
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-background">
            <div className="min-h-full">
              {renderContent()}
            </div>
          </main>
        </div>

        {/* Global Modals */}
        <UserProfileModal
          isOpen={userProfileOpen}
          onClose={() => setUserProfileOpen(false)}
        />

        <CreateTripModal
          isOpen={createTripOpen}
          onClose={() => setCreateTripOpen(false)}
        />

        <RouteOptimizationModal
          isOpen={routeOptimizationOpen}
          onClose={() => setRouteOptimizationOpen(false)}
        />

        <AnalyticsModal
          isOpen={analyticsOpen}
          onClose={() => setAnalyticsOpen(false)}
        />

        <AlertsModal
          isOpen={alertsOpen}
          onClose={() => setAlertsOpen(false)}
        />

        <GenerateReportModal
          isOpen={generateReportOpen}
          onClose={() => setGenerateReportOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
