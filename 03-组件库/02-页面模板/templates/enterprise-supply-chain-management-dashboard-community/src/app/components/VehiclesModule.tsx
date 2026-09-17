import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Car, 
  Search, 
  Filter, 
  MapPin, 
  Fuel,
  Wrench,
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Upload,
  Eye,
  TrendingUp,
  Activity
} from 'lucide-react';

const vehiclesData = [
  {
    id: 'TRK-001',
    name: 'Volvo VNL 860',
    image: 'https://images.unsplash.com/photo-1753579167765-d88ba3719f96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwdHJ1Y2slMjBmbGVldHxlbnwxfHx8fDE3NTU1ODMyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Heavy Truck',
    status: 'Active',
    driver: 'Michael Johnson',
    location: 'New York, NY',
    capacity: '80,000 lbs',
    mileage: '125,400 mi',
    fuelLevel: 78,
    nextMaintenance: '2024-02-15',
    documents: {
      registration: { status: 'Valid', expiry: '2025-12-31', lastUpdated: '2023-12-01' },
      insurance: { status: 'Valid', expiry: '2024-08-15', lastUpdated: '2023-08-01' },
      puc: { status: 'Expired', expiry: '2024-01-10', lastUpdated: '2023-01-10' },
      permit: { status: 'Valid', expiry: '2024-06-30', lastUpdated: '2023-06-01' }
    },
    specifications: {
      make: 'Volvo',
      model: 'VNL 860',
      year: '2019',
      engine: '13L Diesel',
      transmission: 'Automatic',
      vin: '4V4NC9EH1KN123456'
    }
  },
  {
    id: 'VAN-205',
    name: 'Ford Transit',
    image: 'https://images.unsplash.com/photo-1619963596057-6740b0f147e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHZhbiUyMHdoaXRlfGVufDF8fHx8MTc1NTU4MzI2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Delivery Van',
    status: 'In Transit',
    driver: 'Sarah Wilson',
    location: 'Los Angeles, CA',
    capacity: '4,600 lbs',
    mileage: '89,200 mi',
    fuelLevel: 42,
    nextMaintenance: '2024-01-25',
    documents: {
      registration: { status: 'Valid', expiry: '2025-10-15', lastUpdated: '2023-10-01' },
      insurance: { status: 'Valid', expiry: '2024-09-20', lastUpdated: '2023-09-01' },
      puc: { status: 'Valid', expiry: '2024-07-12', lastUpdated: '2023-07-01' },
      permit: { status: 'Valid', expiry: '2024-05-18', lastUpdated: '2023-05-01' }
    },
    specifications: {
      make: 'Ford',
      model: 'Transit 350',
      year: '2020',
      engine: '3.5L V6',
      transmission: 'Automatic',
      vin: '1FTBW2CM5LKA12345'
    }
  },
  {
    id: 'TRK-102',
    name: 'Freightliner Cascadia',
    image: 'https://images.unsplash.com/photo-1649372708980-1efce0ffb7bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjYXJnbyUyMHRydWNrJTIwdHJhbnNwb3J0fGVufDF8fHx8MTc1NTUxNTc5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Semi Truck',
    status: 'Maintenance',
    driver: 'David Chen',
    location: 'Chicago, IL',
    capacity: '80,000 lbs',
    mileage: '203,800 mi',
    fuelLevel: 15,
    nextMaintenance: '2024-01-20',
    documents: {
      registration: { status: 'Valid', expiry: '2025-03-22', lastUpdated: '2023-03-01' },
      insurance: { status: 'Valid', expiry: '2024-11-10', lastUpdated: '2023-11-01' },
      puc: { status: 'Valid', expiry: '2024-04-18', lastUpdated: '2023-04-01' },
      permit: { status: 'Expired', expiry: '2024-01-05', lastUpdated: '2023-01-01' }
    },
    specifications: {
      make: 'Freightliner',
      model: 'Cascadia Evolution',
      year: '2018',
      engine: '15L Detroit Diesel',
      transmission: 'Manual',
      vin: '1FUJGHDV1JLHA1234'
    }
  },
  {
    id: 'TRK-089',
    name: 'Peterbilt 579',
    image: 'https://images.unsplash.com/photo-1700423287752-8cf29a6573e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjb21tZXJjaWFsJTIwdHJ1Y2slMjBmbGVldHxlbnwxfHx8fDE3NTU1ODMyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'Heavy Truck',
    status: 'Active',
    driver: 'Lisa Brown',
    location: 'Miami, FL',
    capacity: '80,000 lbs',
    mileage: '98,600 mi',
    fuelLevel: 91,
    nextMaintenance: '2024-03-01',
    documents: {
      registration: { status: 'Valid', expiry: '2025-07-14', lastUpdated: '2023-07-01' },
      insurance: { status: 'Valid', expiry: '2024-12-08', lastUpdated: '2023-12-01' },
      puc: { status: 'Valid', expiry: '2024-09-25', lastUpdated: '2023-09-01' },
      permit: { status: 'Valid', expiry: '2024-08-12', lastUpdated: '2023-08-01' }
    },
    specifications: {
      make: 'Peterbilt',
      model: '579 EPIQ',
      year: '2021',
      engine: '13L PACCAR MX-13',
      transmission: 'Automated Manual',
      vin: '1XPWD40X1MD123456'
    }
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800';
    case 'In Transit': return 'bg-blue-100 text-blue-800';
    case 'Maintenance': return 'bg-orange-100 text-orange-800';
    case 'Inactive': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getDocumentStatusColor = (status: string) => {
  switch (status) {
    case 'Valid': return 'bg-green-100 text-green-800';
    case 'Expired': return 'bg-red-100 text-red-800';
    case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function VehiclesModule() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehiclesData[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = vehiclesData.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Car className="h-6 w-6 text-blue-600" />
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Fleet Management</h1>
            <p className="text-gray-600">Manage vehicles, documents, and maintenance schedules</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Add New Vehicle
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search vehicles by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Vehicle List */}
        <div className="space-y-4">
          {filteredVehicles.map((vehicle) => (
            <Card 
              key={vehicle.id} 
              className={`cursor-pointer transition-all border-0 shadow-sm hover:shadow-md ${
                selectedVehicle.id === vehicle.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
              }`}
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <ImageWithFallback
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-32 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{vehicle.name}</h3>
                    <p className="text-sm text-gray-500">{vehicle.id} • {vehicle.type}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge className={getStatusColor(vehicle.status)}>
                        {vehicle.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Fuel className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{vehicle.fuelLevel}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vehicle Details */}
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedVehicle.name}</CardTitle>
                      <p className="text-gray-600">{selectedVehicle.id} • {selectedVehicle.type}</p>
                    </div>
                    <Badge className={getStatusColor(selectedVehicle.status)}>
                      {selectedVehicle.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedVehicle.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedVehicle.mileage}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Vehicle Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Make & Model:</span>
                          <span className="font-medium">{selectedVehicle.specifications.make} {selectedVehicle.specifications.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Year:</span>
                          <span className="font-medium">{selectedVehicle.specifications.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">VIN:</span>
                          <span className="font-medium text-sm">{selectedVehicle.specifications.vin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Engine:</span>
                          <span className="font-medium">{selectedVehicle.specifications.engine}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transmission:</span>
                          <span className="font-medium">{selectedVehicle.specifications.transmission}</span>
                        </div>
                      </div>

                      <h3 className="font-medium text-gray-900 mt-6">Assignment</h3>
                      <div className="space-y-2">
                        <p className="text-sm"><span className="font-medium">Driver:</span> {selectedVehicle.driver}</p>
                        <p className="text-sm"><span className="font-medium">Capacity:</span> {selectedVehicle.capacity}</p>
                        <p className="text-sm"><span className="font-medium">Current Location:</span> {selectedVehicle.location}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Performance Metrics</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Fuel Level</span>
                            <span className="text-sm font-medium">{selectedVehicle.fuelLevel}%</span>
                          </div>
                          <Progress value={selectedVehicle.fuelLevel} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">Total Mileage</p>
                            <p className="text-lg font-semibold">{selectedVehicle.mileage}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">Fuel Efficiency</p>
                            <p className="text-lg font-semibold">8.2 MPG</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">This Month</p>
                            <p className="text-lg font-semibold">18 Trips</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">Revenue</p>
                            <p className="text-lg font-semibold text-green-600">$12,450</p>
                          </div>
                        </div>

                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Wrench className="h-4 w-4 text-orange-600" />
                            <span className="font-medium text-orange-800">Next Maintenance</span>
                          </div>
                          <p className="text-sm text-orange-700">{selectedVehicle.nextMaintenance}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Vehicle Documents</h3>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Document
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Registration */}
                      <Card className="p-4 border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-gray-900">Vehicle Registration</span>
                          </div>
                          <Badge className={getDocumentStatusColor(selectedVehicle.documents.registration.status)}>
                            {selectedVehicle.documents.registration.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-gray-600">Expires:</span> {selectedVehicle.documents.registration.expiry}</p>
                          <p><span className="text-gray-600">Last Updated:</span> {selectedVehicle.documents.registration.lastUpdated}</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </Card>

                      {/* Insurance */}
                      <Card className="p-4 border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-gray-900">Insurance Certificate</span>
                          </div>
                          <Badge className={getDocumentStatusColor(selectedVehicle.documents.insurance.status)}>
                            {selectedVehicle.documents.insurance.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-gray-600">Expires:</span> {selectedVehicle.documents.insurance.expiry}</p>
                          <p><span className="text-gray-600">Last Updated:</span> {selectedVehicle.documents.insurance.lastUpdated}</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </Card>

                      {/* PUC Certificate */}
                      <Card className="p-4 border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-purple-600" />
                            <span className="font-medium text-gray-900">PUC Certificate</span>
                          </div>
                          <Badge className={getDocumentStatusColor(selectedVehicle.documents.puc.status)}>
                            {selectedVehicle.documents.puc.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-gray-600">Expires:</span> {selectedVehicle.documents.puc.expiry}</p>
                          <p><span className="text-gray-600">Last Updated:</span> {selectedVehicle.documents.puc.lastUpdated}</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            Download
                          </Button>
                          {selectedVehicle.documents.puc.status === 'Expired' && (
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 ml-auto">
                              Renew Now
                            </Button>
                          )}
                        </div>
                      </Card>

                      {/* Permit */}
                      <Card className="p-4 border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-orange-600" />
                            <span className="font-medium text-gray-900">Commercial Permit</span>
                          </div>
                          <Badge className={getDocumentStatusColor(selectedVehicle.documents.permit.status)}>
                            {selectedVehicle.documents.permit.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-gray-600">Expires:</span> {selectedVehicle.documents.permit.expiry}</p>
                          <p><span className="text-gray-600">Last Updated:</span> {selectedVehicle.documents.permit.lastUpdated}</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </Card>
                    </div>

                    {/* Document Alerts */}
                    <Card className="p-4 bg-red-50 border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-800">Document Alerts</span>
                      </div>
                      <div className="space-y-1 text-sm text-red-700">
                        {selectedVehicle.documents.puc.status === 'Expired' && (
                          <p>• PUC Certificate has expired and requires immediate renewal</p>
                        )}
                        {selectedVehicle.documents.permit.status === 'Expired' && (
                          <p>• Commercial Permit has expired and requires renewal</p>
                        )}
                        <p>• Insurance expires in 6 months - consider early renewal</p>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="maintenance" className="mt-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Maintenance Schedule</h3>
                      <Button variant="outline" size="sm">Schedule Service</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-4">
                        <h4 className="font-medium text-gray-900 mb-4">Upcoming Maintenance</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <div>
                              <p className="font-medium text-orange-800">Oil Change</p>
                              <p className="text-sm text-orange-600">Due: {selectedVehicle.nextMaintenance}</p>
                            </div>
                            <Clock className="h-4 w-4 text-orange-600" />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div>
                              <p className="font-medium text-blue-800">Tire Rotation</p>
                              <p className="text-sm text-blue-600">Due: 2024-02-20</p>
                            </div>
                            <Clock className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h4 className="font-medium text-gray-900 mb-4">Recent Maintenance</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div>
                              <p className="font-medium text-green-800">Annual Inspection</p>
                              <p className="text-sm text-green-600">Completed: 2024-01-05</p>
                            </div>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div>
                              <p className="font-medium text-green-800">Brake Service</p>
                              <p className="text-sm text-green-600">Completed: 2023-12-20</p>
                            </div>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Trip History</h3>
                    <div className="space-y-3">
                      {[
                        { id: 'TR001', route: 'New York → Boston', date: '2024-01-10', driver: 'Michael Johnson', revenue: '$2,450' },
                        { id: 'TR005', route: 'Boston → Philadelphia', date: '2024-01-08', driver: 'Michael Johnson', revenue: '$1,890' },
                        { id: 'TR009', route: 'New York → Albany', date: '2024-01-06', driver: 'Michael Johnson', revenue: '$1,320' },
                        { id: 'TR012', route: 'Albany → Buffalo', date: '2024-01-04', driver: 'Michael Johnson', revenue: '$2,100' },
                      ].map((trip, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{trip.id}</p>
                              <p className="text-sm text-gray-600">{trip.route}</p>
                              <p className="text-xs text-gray-500">{trip.date} • {trip.driver}</p>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-green-100 text-green-800 mb-1">Completed</Badge>
                              <p className="text-sm font-medium text-green-600">{trip.revenue}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}