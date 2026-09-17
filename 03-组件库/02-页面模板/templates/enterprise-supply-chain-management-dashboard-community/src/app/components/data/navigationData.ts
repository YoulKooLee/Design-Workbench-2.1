export const searchData = [
  { id: '1', type: 'vehicle', name: 'Truck TRK-001', description: 'Volvo VNL 860 - Active' },
  { id: '2', type: 'driver', name: 'Michael Johnson', description: 'Professional Driver - Available' },
  { id: '3', type: 'trip', name: 'Trip TR-2024-001', description: 'NY to Boston - In Transit' },
  { id: '4', type: 'route', name: 'NY-Boston Express', description: 'Primary Route - 215 miles' },
  { id: '5', type: 'customer', name: 'Acme Corporation', description: 'Premium Customer - Active' },
];

export const notifications = [
  {
    id: '1',
    type: 'alert',
    title: 'Vehicle Maintenance Due',
    description: 'TRK-001 scheduled maintenance in 2 days',
    time: '5 min ago',
    priority: 'high',
    unread: true
  },
  {
    id: '2',
    type: 'success',
    title: 'Trip Completed',
    description: 'TR-2024-089 delivered successfully to Boston',
    time: '15 min ago',
    priority: 'normal',
    unread: true
  },
  {
    id: '3',
    type: 'info',
    title: 'New Booking Request',
    description: 'Acme Corp requested shipment for Jan 20',
    time: '1 hour ago',
    priority: 'normal',
    unread: false
  },
  {
    id: '4',
    type: 'warning',
    title: 'Route Optimization Available',
    description: 'NY-Boston route can be optimized by 8%',
    time: '2 hours ago',
    priority: 'low',
    unread: false
  }
];

export const userProfile = {
  name: 'John Admin',
  email: 'john.admin@transphere.com',
  role: 'Administrator',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwwfHx8fDE3MzQyMTA0Mjh8MA&ixlib=rb-4.0.3&q=80&w=1080'
};