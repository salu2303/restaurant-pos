
import React, { useState } from 'react';
import { usePOS } from '@/context/POSContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from "lucide-react";

const Reports = () => {
  const { orders } = usePOS();
  const [dateRange, setDateRange] = useState('today');
  
  const today = new Date().toDateString();
  
  // Filter orders based on date range
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt).toDateString();
    return dateRange === 'today' ? orderDate === today : true;
  });
  
  // Create data for sales by hour chart
  const salesByHourData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    sales: 0,
    orders: 0,
  }));
  
  filteredOrders.forEach(order => {
    const hour = new Date(order.createdAt).getHours();
    salesByHourData[hour].sales += order.total;
    salesByHourData[hour].orders += 1;
  });
  
  // Only include hours with sales
  const chartData = salesByHourData.filter(d => d.sales > 0);
  
  // Calculate summary data
  const totalSales = filteredOrders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.total, 0);
  
  const totalOrders = filteredOrders
    .filter(order => order.status === 'completed')
    .length;
  
  const averageOrderValue = totalOrders > 0 
    ? totalSales / totalOrders 
    : 0;
  
  // Count items sold
  const itemsSold: Record<string, { quantity: number, revenue: number }> = {};
  
  filteredOrders
    .filter(order => order.status === 'completed')
    .forEach(order => {
      order.items.forEach(item => {
        if (!itemsSold[item.name]) {
          itemsSold[item.name] = { quantity: 0, revenue: 0 };
        }
        itemsSold[item.name].quantity += item.quantity;
        itemsSold[item.name].revenue += item.subtotal;
      });
    });
  
  // Convert to array and sort by quantity
  const topSellingItems = Object.entries(itemsSold)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1">
            View sales and order reports
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalOrders} completed orders
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Per order average
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredOrders.filter(order => order.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently in progress
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="sales">
        <TabsList className="mb-6">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="items">Top Items</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Hour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="hour" 
                        tickFormatter={(hour) => `${hour}:00`}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Sales']}
                        labelFormatter={(hour) => `${hour}:00 - ${hour+1}:00`}
                      />
                      <Bar 
                        dataKey="sales" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">No sales data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Items</CardTitle>
            </CardHeader>
            <CardContent>
              {topSellingItems.length > 0 ? (
                <div className="space-y-6">
                  {topSellingItems.map((item, i) => (
                    <div key={item.name} className="flex items-center">
                      <div className="flex-shrink-0 w-8 text-muted-foreground">
                        #{i + 1}
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} {item.quantity === 1 ? 'unit' : 'units'} sold
                        </div>
                      </div>
                      <div className="font-medium text-right">
                        ${item.revenue.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">No sales data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
