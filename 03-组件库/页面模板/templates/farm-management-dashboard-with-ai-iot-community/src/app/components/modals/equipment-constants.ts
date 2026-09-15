export const equipmentTypes = [
  'Tractor',
  'Combine Harvester',
  'Planter',
  'Cultivator',
  'Mower',
  'Spreader',
  'Sprayer',
  'Utility Vehicle',
  'Loader',
  'Disc Harrow',
  'Baler',
  'Other'
];

export const equipmentCategories = [
  'Heavy Machinery',
  'Medium Machinery',
  'Light Equipment',
  'Hand Tools',
  'Implements',
  'Utility Vehicles'
];

export const equipmentBrands = [
  'Mahindra',
  'TAFE',
  'Sonalika',
  'Kubota',
  'New Holland',
  'John Deere',
  'Swaraj',
  'Escort',
  'Force Motors',
  'Eicher',
  'Other'
];

export const equipmentConditions = [
  { value: 'excellent', label: '优秀', description: '接近全新，磨损很少' },
  { value: 'good', label: '良好', description: '维护良好，正常磨损' },
  { value: 'fair', label: '一般', description: '有一定磨损，需要关注' },
  { value: 'poor', label: '较差', description: '磨损明显，需要维修' }
];

export const equipmentStatusOptions = [
  { value: 'operational', label: '正常运行', description: '当前可用' },
  { value: 'maintenance', label: '维护中', description: '正在保养' },
  { value: 'out-of-service', label: '停用', description: '暂不可用' },
  { value: 'retired', label: '已退役', description: '不再使用' }
];
