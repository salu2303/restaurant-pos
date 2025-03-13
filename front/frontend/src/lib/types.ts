
// Menu-related types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

// User-related types
export type UserRole = 'admin' | 'server';

// Order-related types
export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes: string;
  subtotal: number;
}

export type OrderStatus = 'active' | 'completed' | 'canceled';
export type PaymentMethod = 'cash' | 'card' | 'mobile';

export interface Payment {
  method: PaymentMethod;
  amount: number;
  change: number;
  timestamp: Date;
}

export interface Order {
  id: string;
  tableId: number;
  tableName: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  completedAt?: Date;
  total: number;
  payment?: Payment;
}

// Table-related types
export type TableStatus = 'available' | 'occupied' | 'reserved';

export interface Table {
  id: number;
  name: string;
  capacity: number;
  status: TableStatus;
}

// Reporting-related types
export interface DailySummary {
  date: string;
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  topSellingItems: {
    name: string;
    quantity: number;
    revenue: number;
  }[];
}
