export type CategoryType = 'all' | 'nasi-kotak' | 'prasmanan' | 'tumpeng' | 'snack-box';

export interface MenuItem {
  id: string;
  name: string;
  category: 'nasi-kotak' | 'prasmanan' | 'tumpeng' | 'snack-box';
  price: number;
  minOrder: number;
  image: string;
  description: string;
  highlights: string[];
  includes: string[];
  popular?: boolean;
  unit: string; // 'porsi', 'kotak', 'tampah', 'box'
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface CustomerOrder {
  customerName: string;
  whatsappNumber: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  deliveryAddress: string;
  specialNotes?: string;
  paymentMethod: 'dp_transfer' | 'cod' | 'cash_dapur';
}

export interface CalculatorState {
  eventType: string;
  portionCount: number;
  packageTier: 'hemat' | 'standar' | 'premium' | 'istimewa';
  includeSnack: boolean;
  includeDessert: boolean;
  selectedDishes: string[];
}
