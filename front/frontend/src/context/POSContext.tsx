import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "sonner";
import { MenuItem, Order, OrderItem, Table, PaymentMethod, UserRole, OrderStatus } from '@/lib/types';
import { menuItems, tables as initialTables } from '@/lib/data';

interface User {
  id: string;
  name: string;
  role: UserRole;
}

interface POSContextType {
  // Auth
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  // Menu
  menu: MenuItem[];
  categories: string[];
  // Orders
  currentOrder: Order | null;
  orders: Order[];
  // setOrders,
  // Tables
  // setOrders: React.Dispatch<React.SetStateAction<Order[]>>,
  tables: Table[];
  selectedTable: Table | null;
  // Actions
  selectTable: (tableId: number) => void;
  addToOrder: (item: MenuItem, quantity?: number, notes?: string) => void;
  removeFromOrder: (orderItemId: string) => void;
  updateOrderItem: (orderItemId: string, updates: Partial<OrderItem>) => void;
  cancelOrder: () => void;
  completeOrder: (paymentMethod: PaymentMethod, amount: number) => void;
  getDailyTotal: () => number;
  getCompletedOrdersCount: () => number;
  getActiveOrdersCount: () => number;
}

const POSContext = createContext<POSContextType | undefined>(undefined);

// Mock user database - in a real app, this would come from a backend
const mockUsers = [
  { id: '1', name: 'Admin User', username: 'admin', password: 'admin123', role: 'admin' as UserRole },
  { id: '2', name: 'Server 1', username: 'server1', password: 'server123', role: 'server' as UserRole },
  { id: '3', name: 'Server 2', username: 'server2', password: 'server123', role: 'server' as UserRole },
];

export const POSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [menu,setMenu] = useState<MenuItem[]>(menuItems);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('pos_current_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);
  
  // Login function
  const login = (username: string, password: string): boolean => {
    const user = mockUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (user) {
      const { id, name, role } = user;
      const userData = { id, name, role };
      setCurrentUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('pos_current_user', JSON.stringify(userData));
      toast.success(`Welcome back, ${name}!`);
      return true;
    } else {
      toast.error('Invalid username or password');
      return false;
    }
  };
  
  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('pos_current_user');
    toast.info('Logged out successfully');
  };
  

  useEffect(() => {
    fetch("http://localhost:5001/api/menu")
      .then(response => response.json())
      .then((data: MenuItem[]) => { // ✅ Tell TypeScript this is an array of MenuItem
        setMenu(data);
        setCategories([...new Set(data.map((item) => item.category))]); // ✅ Extract unique categories
      })
      .catch(error => {
        console.error("Error fetching menu:", error);
        toast.error("Failed to load menu.");
      });
  }, []);



  // Extract unique categories from menu
  // const categories = Array.from(new Set(menu.map(item => item.category)));

  // Select a table
  const selectTable = (tableId: number) => {
    const table = tables.find(t => t.id === tableId) || null;
    setSelectedTable(table);
    
    // Check if table has an existing order
    const existingOrder = orders.find(o => o.tableId === tableId && o.status === 'active');
    
    if (existingOrder) {
      setCurrentOrder(existingOrder);
    } else if (table) {
      // Create a new order for this table
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        tableId,
        tableName: table.name,
        items: [],
        status: 'active',
        createdAt: new Date(),
        total: 0
      };
      setCurrentOrder(newOrder);
      
      // Update orders
      setOrders(prev => 
        [...prev, newOrder]
      );
      
      // Update table status
      setTables(prev => 
        prev.map(t => t.id === tableId ? { ...t, status: 'occupied' } : t)
      );
    }
  };

  // Add item to order
  const addToOrder = (item: MenuItem, quantity = 1, notes = '') => {
    if (!currentOrder) return;
    
    const orderItemId = `item-${Date.now()}`;
    const orderItem: OrderItem = {
      id: orderItemId,
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity,
      notes,
      subtotal: item.price * quantity
    };
    
    const updatedOrder = {
      ...currentOrder,
      items: [...currentOrder.items, orderItem],
      total: currentOrder.total + orderItem.subtotal
    };
    
    setCurrentOrder(updatedOrder);
    
    // Update orders array
    setOrders(prev => 
      prev.map(o => o.id === currentOrder.id ? updatedOrder : o)
    );
    
    toast.success(`Added ${item.name} to order`);
  };

  // Remove item from order
  const removeFromOrder = (orderItemId: string) => {
    if (!currentOrder) return;
    
    const itemToRemove = currentOrder.items.find(item => item.id === orderItemId);
    
    if (!itemToRemove) return;
    
    const updatedOrder = {
      ...currentOrder,
      items: currentOrder.items.filter(item => item.id !== orderItemId),
      total: currentOrder.total - itemToRemove.subtotal
    };
    
    setCurrentOrder(updatedOrder);
    
    // Update orders array
    setOrders(prev => 
      prev.map(o => o.id === currentOrder.id ? updatedOrder : o)
    );
    
    toast.info(`Removed item from order`);
  };

  // Update order item
  const updateOrderItem = (orderItemId: string, updates: Partial<OrderItem>) => {
    if (!currentOrder) return;
    
    const currentItem = currentOrder.items.find(item => item.id === orderItemId);
    
    if (!currentItem) return;
    
    const originalSubtotal = currentItem.subtotal;
    const updatedItem = { ...currentItem, ...updates };
    
    // Recalculate subtotal if quantity changed
    if (updates.quantity) {
      updatedItem.subtotal = updatedItem.price * updatedItem.quantity;
    }
    
    const subtotalDifference = updatedItem.subtotal - originalSubtotal;
    
    const updatedOrder = {
      ...currentOrder,
      items: currentOrder.items.map(item => 
        item.id === orderItemId ? updatedItem : item
      ),
      total: currentOrder.total + subtotalDifference
    };
    
    setCurrentOrder(updatedOrder);
    
    // Update orders array
    setOrders(prev => 
      prev.map(o => o.id === currentOrder.id ? updatedOrder : o)
    );
  };

  // Cancel current order
  const cancelOrder = () => {
    if (!currentOrder || !selectedTable) return;
    
    // Remove order
    setOrders(prev => prev.filter(o => o.id !== currentOrder.id));
    
    // Reset table status
    setTables(prev => 
      prev.map(t => t.id === selectedTable.id ? { ...t, status: 'available' } : t)
    );
    
    setCurrentOrder(null);
    setSelectedTable(null);
    
    toast.info("Order has been canceled");
  };

  // Complete order with payment
  const completeOrder = (paymentMethod: PaymentMethod, amount: number) => {
    if (!currentOrder || !selectedTable) return;
    
    const completedOrder: Order = {
      ...currentOrder,
      status: 'completed' as OrderStatus,
      payment: {
        method: paymentMethod,
        amount,
        change: amount - currentOrder.total,
        timestamp: new Date()
      },
      completedAt: new Date()
    };
    
    // Update orders
    setOrders(prev => 
      prev.map(o => o.id === currentOrder.id ? completedOrder : o)
    );
    
    // Reset table status
    setTables(prev => 
      prev.map(t => t.id === selectedTable.id ? { ...t, status: 'available' } : t)
    );
    
    setCurrentOrder(null);
    setSelectedTable(null);
    
    toast.success("Payment completed successfully!");
  };

  // Get daily total sales
  const getDailyTotal = () => {
    const today = new Date().toDateString();
    return orders
      .filter(order => 
        order.status === 'completed' && 
        new Date(order.completedAt as Date).toDateString() === today
      )
      .reduce((sum, order) => sum + order.total, 0);
  };

  // Get completed orders count
  const getCompletedOrdersCount = () => {
    const today = new Date().toDateString();
    return orders.filter(order => 
      order.status === 'completed' && 
      new Date(order.completedAt as Date).toDateString() === today
    ).length;
  };

  // Get active orders count
  const getActiveOrdersCount = () => {
    return orders.filter(order => order.status === 'active').length;
  };

  // Value to be provided by the context
  const value = {
    // Auth
    isAuthenticated,
    currentUser,
    login,
    logout,
    // Menu
    menu,
    categories,
    tables,
    selectedTable,
    currentOrder,
    orders,
    // setOrders,
    selectTable,
    addToOrder,
    removeFromOrder,
    updateOrderItem,
    cancelOrder,
    completeOrder,
    getDailyTotal,
    getCompletedOrdersCount,
    getActiveOrdersCount
  };

  return (
    <POSContext.Provider value={value}>
      {children}
    </POSContext.Provider>
  );
};

// Custom hook to use the POS context
export const usePOS = () => {
  const context = useContext(POSContext);
  if (context === undefined) {
    throw new Error('usePOS must be used within a POSProvider');
  }
  return context;
};
