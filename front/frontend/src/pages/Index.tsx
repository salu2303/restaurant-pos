
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePOS } from '@/context/POSContext';
import { Building2, Receipt, Utensils, CreditCard } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Index = () => {
  const { 
    getDailyTotal, 
    getCompletedOrdersCount, 
    getActiveOrdersCount,
    tables 
  } = usePOS();
  
  const dailyTotal = getDailyTotal();
  const completedOrders = getCompletedOrdersCount();
  const activeOrders = getActiveOrdersCount();
  const availableTables = tables.filter(t => t.status === 'available').length;
  
  const stats = [
    {
      title: "Today's Sales",
      value: `$${dailyTotal.toFixed(2)}`,
      description: `${completedOrders} completed orders`,
      icon: CreditCard,
      color: "text-green-500",
      link: "/reports"
    },
    {
      title: "Active Orders",
      value: activeOrders.toString(),
      description: "Currently in progress",
      icon: Receipt,
      color: "text-blue-500",
      link: "/orders"
    },
    {
      title: "Available Tables",
      value: availableTables.toString(),
      description: `${tables.length} total tables`,
      icon: Building2,
      color: "text-purple-500",
      link: "/tables"
    }
  ];
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your restaurant POS system
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <NavLink to={stat.link} key={i}>
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </NavLink>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <NavLink to="/tables" className="w-full">
              <Card className="h-32 hover-scale flex flex-col items-center justify-center">
                <Building2 className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Tables</h3>
              </Card>
            </NavLink>
            
            <NavLink to="/menu" className="w-full">
              <Card className="h-32 hover-scale flex flex-col items-center justify-center">
                <Utensils className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Menu</h3>
              </Card>
            </NavLink>
            
            <NavLink to="/orders" className="w-full">
              <Card className="h-32 hover-scale flex flex-col items-center justify-center">
                <Receipt className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Orders</h3>
              </Card>
            </NavLink>
            
            <NavLink to="/checkout" className="w-full">
              <Card className="h-32 hover-scale flex flex-col items-center justify-center">
                <CreditCard className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Checkout</h3>
              </Card>
            </NavLink>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[336px] flex flex-col items-center justify-center text-muted-foreground">
            <Receipt className="h-12 w-12 mb-4 text-muted" />
            <p>Order history will appear here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
