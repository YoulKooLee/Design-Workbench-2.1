import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { TripDetailsModal } from './TripDetailsModal';
import { TimePeriodModal } from './TimePeriodModal';
import { FiltersModal } from './FiltersModal';
import { 
  Truck, 
  Search, 
  Filter, 
  MapPin, 
  Clock,
  DollarSign,
  User,
  Package,
  Route,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plane,
  Ship,
  RefreshCw,
  Download,
  Eye,
  MoreHorizontal
} from 'lucide-react';

const tripsData = [
  {
    id: 'TR001',
    route: { origin: 'New York, NY', destination: 'Boston, MA' },
    vehicle: { id: 'TRK-001', name: 'Volvo VNL 860', type: 'road' },
    driver: { name: 'Michael Johnson', id: 'D001', photo: 'https://images.unsplash.com/photo-1718434137166-b3cb7d944b27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkcml2ZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTU1ODMxODJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    customer: 'Acme Corp',
    material: { type: 'Electronics', weight: '15,000 lbs', quantity: '250 units' },
    status: 'Completed',
    startDate: '2024-01-08',
    endDate: '2024-01-10',
    estimatedDuration: '8h 30m',
    actualDuration: '8h 15m',
    distance: '215 miles',
    revenue: '$2,450',
    fuelCost: '$180',
    timeline: [
      { step: 'Trip Started', time: '2024-01-08 08:00', status: 'completed' },
      { step: 'Loaded Cargo', time: '2024-01-08 09:30', status: 'completed' },
      { step: 'En Route', time: '2024-01-08 10:00', status: 'completed' },
      { step: 'Delivered', time: '2024-01-08 18:15', status: 'completed' }
    ]
  },
  {
    id: 'TR002',
    route: { origin: 'Chicago, IL', destination: 'Miami, FL' },
    vehicle: { id: 'AIR-205', name: 'Boeing 737 Cargo', type: 'air' },
    driver: { name: 'Sarah Wilson', id: 'D002', photo: 'https://images.unsplash.com/photo-1622175691858-a4deb912838e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB0cnVjayUyMGRyaXZlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTU1ODMxODd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    customer: 'MedSupply Inc',
    material: { type: 'Medical Supplies', weight: '8,500 lbs', quantity: '150 boxes' },
    status: 'In Transit',
    startDate: '2024-01-12',
    endDate: '2024-01-12',
    estimatedDuration: '3h 45m',
    actualDuration: 'In Progress',
    distance: '1,197 miles',
    revenue: '$8,900',
    fuelCost: '$650',
    timeline: [
      { step: 'Trip Started', time: '2024-01-12 06:00', status: 'completed' },
      { step: 'Loaded Cargo', time: '2024-01-12 07:15', status: 'completed' },
      { step: 'En Route', time: '2024-01-12 08:00', status: 'current' },
      { step: 'Deliver', time: '2024-01-12 11:45', status: 'pending' }
    ]
  },
  {
    id: 'TR003',
    route: { origin: 'Seattle, WA', destination: 'Tokyo, Japan' },
    vehicle: { id: 'SEA-102', name: 'Container Ship Atlas', type: 'sea' },
    driver: { name: 'David Chen', id: 'D003', photo: 'https://images.unsplash.com/photo-1710242078536-fe62a305a86c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGRyaXZlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTU1ODMxODR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    customer: 'Global Exports Ltd',
    material: { type: 'Machinery', weight: '45,000 lbs', quantity: '12 containers' },
    status: 'Loading',
    startDate: '2024-01-15',
    endDate: '2024-01-30',
    estimatedDuration: '15 days',
    actualDuration: 'Not Started',
    distance: '4,792 miles',
    revenue: '$15,600',
    fuelCost: '$2,100',
    timeline: [
      { step: 'Cargo Preparation', time: '2024-01-15 10:00', status: 'current' },
      { step: 'Loading', time: '2024-01-15 14:00', status: 'pending' },
      { step: 'Departure', time: '2024-01-16 08:00', status: 'pending' },
      { step: 'Arrive Tokyo', time: '2024-01-30 16:00', status: 'pending' }
    ]
  },
  {
    id: 'TR004',
    route: { origin: 'Dallas, TX', destination: 'Denver, CO' },
    vehicle: { id: 'TRK-089', name: 'Peterbilt 579', type: 'road' },
    driver: { name: 'Lisa Brown', id: 'D004', photo: 'https://images.unsplash.com/photo-1659353740059-5554fb2ac89e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMGRyaXZlciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTU1ODMxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    customer: 'FastTrack Logistics',
    material: { type: 'Consumer Goods', weight: '12,000 lbs', quantity: '500 packages' },
    status: 'Scheduled',
    startDate: '2024-01-20',
    endDate: '2024-01-21',
    estimatedDuration: '12h 30m',
    actualDuration: 'Not Started',
    distance: '781 miles',
    revenue: '$1,890',
    fuelCost: '$210',
    timeline: [
      { step: 'Pre-Trip Check', time: '2024-01-20 06:00', status: 'pending' },
      { step: 'Load Cargo', time: '2024-01-20 07:00', status: 'pending' },
      { step: 'Depart', time: '2024-01-20 08:00', status: 'pending' },
      { step: 'Deliver', time: '2024-01-20 20:30', status: 'pending' }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
    case 'In Transit': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
    case 'Loading': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
    case 'Scheduled': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
    case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

const getTransportIcon = (type: string) => {
  switch (type) {
    case 'road': return <Truck className="h-4 w-4 text-green-600" />;
    case 'air': return <Plane className="h-4 w-4 text-blue-600" />;
    case 'sea': return <Ship className="h-4 w-4 text-teal-600" />;
    default: return <Truck className="h-4 w-4" />;
  }
};

interface TransportsModuleProps {
  onOpenCreateTrip?: () => void;
  onOpenRouteOptimization?: () => void;
  onOpenAnalytics?: () => void;
  onOpenAlerts?: () => void;
  onOpenGenerateReport?: () => void;
  onNavigateToModule?: (module: string) => void;
}

export function TransportsModule({ 
  onOpenCreateTrip,
  onOpenGenerateReport 
}: TransportsModuleProps) {
  const [selectedTrip, setSelectedTrip] = useState(tripsData[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [tripDetailsOpen, setTripDetailsOpen] = useState(false);
  const [selectedTripForDetails, setSelectedTripForDetails] = useState<any>(null);
  const [timePeriodModalOpen, setTimePeriodModalOpen] = useState(false);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const filteredTrips = tripsData.filter(trip => {
    const matchesSearch = trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.route.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewTrip = (trip: any) => {
    setSelectedTripForDetails(trip);
    setTripDetailsOpen(true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onOpenGenerateReport?.();
    }, 1500);
  };

  const handleTimePeriodSelect = (period: string) => {
    setSelectedTimeRange(period);
    console.log('Selected time period:', period);
  };

  const handleFiltersApply = (filters: any) => {
    console.log('Applied filters:', filters);
  };

  const getTimePeriodLabel = (period: string) => {
    switch (period) {
      case '7d': return 'Last 7 days';
      case '30d': return 'Last 1 month';
      case '3m': return 'Last 3 months';
      case '6m': return 'Last 6 months';
      case '1y': return 'Last 1 year';
      case 'ytd': return 'Year to date';
      default: return 'Last 7 days';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Truck className="h-6 w-6 text-green-600" />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Transports & Trips</h1>
            <p className="text-muted-foreground">Manage and track all transportation activities</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 hover:bg-accent"
              onClick={() => setTimePeriodModalOpen(true)}
            >
              <Calendar className="h-4 w-4" />
              {getTimePeriodLabel(selectedTimeRange)}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 hover:bg-accent"
              onClick={() => setFiltersModalOpen(true)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 hover:bg-accent"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button 
            variant="outline"
            size="sm" 
            className="flex items-center gap-2 hover:bg-accent"
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download className={`h-4 w-4 ${isExporting ? 'animate-spin' : ''}`} />
            {isExporting ? 'Exporting...' : 'Export'}
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={onOpenCreateTrip}
          >
            Create Trip
          </Button>
        </div>
      </div>

      {/* Quick Stats - Reduced dimensions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3 border-0 shadow-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Active Trips</span>
          </div>
          <p className="text-xl font-semibold mt-1">18</p>
        </Card>
        <Card className="p-3 border-0 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">Completed Today</span>
          </div>
          <p className="text-xl font-semibold mt-1">7</p>
        </Card>
        <Card className="p-3 border-0 shadow-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-muted-foreground">Scheduled</span>
          </div>
          <p className="text-xl font-semibold mt-1">12</p>
        </Card>
        <Card className="p-3 border-0 shadow-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-muted-foreground">Today\'s Revenue</span>
          </div>
          <p className="text-xl font-semibold mt-1">$28.4K</p>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search trips by ID, customer, or route..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['All', 'In Transit', 'Completed', 'Scheduled', 'Loading'].map(status => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Trips List */}
        <div className="xl:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>All Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trip ID</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrips.map((trip) => (
                    <TableRow 
                      key={trip.id}
                      className={`cursor-pointer hover:bg-accent/50 ${selectedTrip.id === trip.id ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}
                      onClick={() => setSelectedTrip(trip)}
                    >
                      <TableCell className="font-medium">{trip.id}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{trip.route.origin} →</div>
                          <div className="text-muted-foreground">{trip.route.destination}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTransportIcon(trip.vehicle.type)}
                          <span className="text-sm">{trip.vehicle.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={trip.driver.photo} />
                            <AvatarFallback className="text-xs">
                              {trip.driver.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{trip.driver.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{trip.customer}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(trip.status)}>
                          {trip.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-green-600">{trip.revenue}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewTrip(trip);
                          }}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Trip Details Panel */}
        <div>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Trip Details</span>
                <Badge className={getStatusColor(selectedTrip.status)}>
                  {selectedTrip.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    {/* Trip Info */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Trip Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Trip ID:</span>
                          <span className="font-medium">{selectedTrip.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Customer:</span>
                          <span className="font-medium">{selectedTrip.customer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Distance:</span>
                          <span className="font-medium">{selectedTrip.distance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{selectedTrip.estimatedDuration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Route */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Route</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{selectedTrip.route.origin}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-red-600" />
                          <span className="text-sm">{selectedTrip.route.destination}</span>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle & Driver */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Assignment</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-2 bg-accent/30 rounded-lg">
                          {getTransportIcon(selectedTrip.vehicle.type)}
                          <div>
                            <p className="font-medium text-sm">{selectedTrip.vehicle.name}</p>
                            <p className="text-xs text-muted-foreground">{selectedTrip.vehicle.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-accent/30 rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={selectedTrip.driver.photo} />
                            <AvatarFallback className="text-xs">
                              {selectedTrip.driver.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{selectedTrip.driver.name}</p>
                            <p className="text-xs text-muted-foreground">{selectedTrip.driver.id}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Financial */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Financial</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Revenue:</span>
                          <span className="font-medium text-green-600">{selectedTrip.revenue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fuel Cost:</span>
                          <span className="font-medium text-red-600">{selectedTrip.fuelCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Profit:</span>
                          <span className="font-medium text-blue-600">
                            ${parseInt(selectedTrip.revenue.replace('$', '').replace(',', '')) - 
                               parseInt(selectedTrip.fuelCost.replace('$', '').replace(',', ''))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="mt-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Trip Timeline</h4>
                    <div className="space-y-3">
                      {selectedTrip.timeline.map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          {step.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : step.status === 'current' ? (
                            <Clock className="h-4 w-4 text-blue-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              step.status === 'current' ? 'text-blue-700' : 
                              step.status === 'completed' ? 'text-green-700' : 'text-muted-foreground'
                            }`}>
                              {step.step}
                            </p>
                            <p className="text-xs text-muted-foreground">{step.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedTrip.status === 'In Transit' && (
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-800 dark:text-blue-300">Current Location</span>
                        </div>
                        <p className="text-sm text-blue-700 dark:text-blue-400">En route to Miami, FL</p>
                        <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">ETA: 2 hours 15 minutes</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <TripDetailsModal
        isOpen={tripDetailsOpen}
        onClose={() => setTripDetailsOpen(false)}
        trip={selectedTripForDetails}
      />

      <TimePeriodModal
        isOpen={timePeriodModalOpen}
        onClose={() => setTimePeriodModalOpen(false)}
        onSelect={handleTimePeriodSelect}
        currentPeriod={selectedTimeRange}
      />

      <FiltersModal
        isOpen={filtersModalOpen}
        onClose={() => setFiltersModalOpen(false)}
        onApply={handleFiltersApply}
      />
    </div>
  );
}