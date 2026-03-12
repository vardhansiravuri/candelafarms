export const FARM_SECTIONS = [
  {
    id: 'mulberries',
    name: 'Mulberries',
    subtitle: 'Mulberry Block',
    type: 'crop',
    color: '#9333ea',
    // Top-left block in the aerial layout
    position: [-3.9, 0.02, -2.6],
    size: [3.4, 2.0],
    rotation: 0,
    details: {
      area: 'Mulberry plantation',
      status: 'Growing',
    },
  },
  {
    id: 'taiwan-guava',
    name: 'Taiwan Guava',
    subtitle: 'Taiwan Guava Block',
    type: 'crop',
    color: '#22c55e',
    // Right column - top section below hut house
    position: [3.8, 0.02, -3.2],
    size: [2.6, 1.8],
    rotation: 0,
    details: {
      area: 'Guava orchard',
      status: 'Planting Phase',
    },
  },
  {
    id: 'papaya',
    name: 'Papaya',
    subtitle: 'Papaya Block',
    type: 'crop',
    color: '#f97316',
    // Right column - middle section
    position: [3.8, 0.02, -1.6],
    size: [2.6, 1.6],
    rotation: 0,
    details: {
      area: 'Papaya plantation',
      status: 'Fruiting',
    },
  },
  {
    id: 'vegetables-1',
    name: 'Vegetables',
    subtitle: 'Set 1',
    type: 'crop',
    color: '#10b981',
    // Left column - just above grass
    position: [-3.8, 0.02, 1.6],
    size: [3.0, 1.8],
    rotation: 0,
    details: {
      crops: 'Seasonal vegetables',
      status: 'Harvesting',
    },
  },
  {
    id: 'vegetables-2',
    name: 'Vegetables',
    subtitle: 'Set 2',
    type: 'crop',
    color: '#059669',
    // Left column - between mulberries and Set 1
    position: [-3.9, 0.02, -0.6],
    size: [3.4, 1.8],
    rotation: 0,
    details: {
      crops: 'Leafy greens & herbs',
      status: 'Growing',
    },
  },
  {
    id: 'grass',
    name: 'Cows Field',
    subtitle: 'Pasture',
    type: 'facility',
    color: '#86efac',
    // Bottom-left large grass area
    position: [-3.9, 0.02, 4.3],
    size: [4.6, 3.0],
    rotation: 0,
    details: {
      use: 'Pasture for cattle',
      status: 'Active',
    },
  },
  {
    id: 'grass-vegetables',
    name: 'Grass and Vegetables',
    subtitle: 'Mixed Block',
    type: 'crop',
    color: '#34d399',
    // Right column - block above dairy hub
    position: [3.8, 0.02, 0.2],
    size: [2.8, 2.0],
    rotation: 0,
    details: {
      crops: 'Grass & vegetable mix',
      status: 'Growing',
    },
  },
  {
    id: 'dairy-hub',
    name: 'Dairy Farming Hub',
    subtitle: 'Central Facility',
    type: 'facility',
    color: '#eab308',
    // Central block next to volleyball and above outdoor seating & pizza oven
    position: [0, 0.02, 2.3],
    size: [3.0, 2.0],
    rotation: 0,
    details: {
      use: 'Dairy & cattle',
      status: 'Operational',
    },
  },
  {
    id: 'volleyball',
    name: 'Volleyball Court',
    subtitle: 'Recreation',
    type: 'facility',
    color: '#ef4444',
    // Sand court to the right of dairy hub
    position: [3.8, 0.02, 2.4],
    size: [3.0, 2.2],
    rotation: 0,
    details: {
      type: 'Full-size Court',
      surface: 'Sand',
      lighting: 'LED Floodlights',
      status: 'Active',
    },
  },
  {
    id: 'fisheries',
    name: 'Fisheries',
    subtitle: 'Aquaculture',
    type: 'facility',
    color: '#3b82f6',
    // Parallel to volleyball court, to the right with clear gap
    position: [6.3, 0.02, 2.4],
    size: [2.0, 1.4],
    rotation: 0,
    details: {
      tanks: '4 units',
      species: 'Tilapia, Catfish',
      capacity: '2000 fish',
      status: 'Stocked',
    },
  },
  {
    id: 'parking',
    name: 'Parking',
    subtitle: 'Vehicle Area',
    type: 'facility',
    color: '#6b7280',
    // Bottom-right parking area stretching under fisheries
    position: [4.4, 0.02, 4.4],
    size: [2.6, 3.0],
    rotation: 0,
    details: {
      capacity: '20 vehicles',
      surface: 'Gravel',
      status: 'Available',
    },
  },
  {
    id: 'pizza-oven',
    name: 'Pizza Oven',
    subtitle: 'Wood-fired',
    type: 'facility',
    color: '#dc2626',
    // Bottom-center pizza oven
    position: [0, 0.02, 5.3],
    size: [1.8, 1.2],
    rotation: 0,
    details: {
      type: 'Wood-fired Brick',
      temp: '800°F',
      capacity: '4 pizzas',
      status: 'Operational',
    },
  },
  {
    id: 'hut-house',
    name: 'Hut House',
    subtitle: 'Viewpoint',
    type: 'facility',
    color: '#facc15',
    // Hut house sitting above mulberries and taiwan guava
    position: [0, 0.02, -4.3],
    size: [4.6, 1.6],
    rotation: 0,
    details: {
      use: 'Stay & viewpoint',
      status: 'Planned',
    },
  },
  {
    id: 'outdoor-seating',
    name: 'Outdoor Seating',
    subtitle: 'Farm Café',
    type: 'facility',
    color: '#fbbf24',
    // Small block between dairy hub and pizza oven
    position: [0, 0.02, 3.9],
    size: [2.0, 0.9],
    rotation: 0,
    details: {
      use: 'Outdoor dining',
      status: 'Planned',
    },
  },
]

export const FARM_STATS = {
  totalAcres: 22,
  landUtilization: 95,
  activeCrops: 8,
  facilities: 5,
  waterSources: 2,
}
