
import { MenuItem, Table } from './types';

// Menu items
export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'app1',
    name: 'Crispy Calamari',
    description: 'Lightly battered and fried calamari served with lemon aioli',
    price: 12.99,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?q=80&w=1200&auto=format&fit=crop',
    available: true
  },
  {
    id: 'app2',
    name: 'Bruschetta',
    description: 'Toasted baguette topped with diced tomatoes, basil, and balsamic glaze',
    price: 9.99,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab88d5f?q=80&w=1200&auto=format&fit=crop',
    available: true
  },
  {
    id: 'app3',
    name: 'Spinach Artichoke Dip',
    description: 'Creamy blend of spinach, artichokes, and cheese served with tortilla chips',
    price: 11.99,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1576506491404-5982a343fe6e?q=80&w=1200&auto=format&fit=crop',
    available: true
  },
  
  // Main Courses
  {
    id: 'main1',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon served with asparagus and lemon butter sauce',
    price: 24.99,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop',
    available: true
  },
  {
    id: 'main2',
    name: 'Filet Mignon',
    description: '8oz tender beef filet served with mashed potatoes and seasonal vegetables',
    price: 32.99,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop',
    available: true
  },
  {
    id: 'main3',
    name: 'Mushroom Risotto',
    description: 'Creamy Arborio rice with wild mushrooms, truffle oil, and parmesan',
    price: 18.99,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1581859814481-bfd944e3122f?q=80&w=1200&auto=format&fit=crop',
    available: true
  },
  {
    id: 'main4',
    name: 'Chicken Parmesan',
    description: 'Breaded chicken topped with marinara and mozzarella over spaghetti',
    price: 19.99,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=1200&auto=format&fit=crop',
    available: true
  },
  
  // Sides
  {
    id: 'side1',
    name: 'Truffle Fries',
    description: 'Crispy fries tossed with truffle oil and parmesan',
    price: 7.99,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop',
    available: true
  },
  {
    id: 'side2',
    name: 'Roasted Vegetables',
    description: 'Seasonal vegetables roasted with herbs and olive oil',
    price: 6.99,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1200&auto=format&fit=crop',
    available: true
  },
  
  // Desserts
  {
    id: 'dessert1',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 9.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1623246123320-0d6636755796?q=80&w=1200&auto=format&fit=crop',
    available: true
  },
  {
    id: 'dessert2',
    name: 'New York Cheesecake',
    description: 'Classic cheesecake with graham cracker crust and berry compote',
    price: 8.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1200&auto=format&fit=crop',
    available: true
  },
  
  // Beverages
  {
    id: 'bev1',
    name: 'Craft Lemonade',
    description: 'House-made lemonade with fresh mint',
    price: 4.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?q=80&w=1200&auto=format&fit=crop',
    available: true
  },
  {
    id: 'bev2',
    name: 'Iced Tea',
    description: 'Fresh brewed tea, sweetened or unsweetened',
    price: 3.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1556679343-c1c1c9b2b916?q=80&w=1200&auto=format&fit=crop',
    available: true
  },
  {
    id: 'bev3',
    name: 'Espresso',
    description: 'Double shot of our house-blend espresso',
    price: 4.49,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1596952954288-16862d37405e?q=80&w=1200&auto=format&fit=crop',
    available: true
  }
];

// Tables
export const tables: Table[] = [
  { id: 1, name: 'Table 1', capacity: 2, status: 'available' },
  { id: 2, name: 'Table 2', capacity: 2, status: 'available' },
  { id: 3, name: 'Table 3', capacity: 4, status: 'available' },
  { id: 4, name: 'Table 4', capacity: 4, status: 'available' },
  { id: 5, name: 'Table 5', capacity: 6, status: 'available' },
  { id: 6, name: 'Table 6', capacity: 6, status: 'available' },
  { id: 7, name: 'Table 7', capacity: 8, status: 'available' },
  { id: 8, name: 'Table 8', capacity: 8, status: 'available' },
  { id: 9, name: 'Bar 1', capacity: 2, status: 'available' },
  { id: 10, name: 'Bar 2', capacity: 2, status: 'available' },
  { id: 11, name: 'Bar 3', capacity: 2, status: 'available' },
  { id: 12, name: 'Bar 4', capacity: 2, status: 'available' },
];
