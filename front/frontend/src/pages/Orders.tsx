
import React from 'react';
import { usePOS } from '@/context/POSContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OrderItem from '@/components/OrderItem';
import StatusBadge from '@/components/StatusBadge';
import { ArrowRight, CreditCard, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
// ✅ Import the context

// const { setOrders } = usePOS(); // ✅ Extract setOrders from usePOS()

const Orders = () => {
  const { currentOrder, orders, selectTable, cancelOrder } = usePOS();
  const navigate = useNavigate();
  
  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };
  // const handlePrintOrder = async () => {
  //   if (!currentOrder) return;
  
  //   try {
  //     const response = await fetch("http://localhost:5001/api/orders", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(currentOrder),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error("Failed to save order");
  //     }
  
  //     const newOrders = await fetch("http://localhost:5001/api/orders").then(res => res.json());
  //     setOrders(newOrders); // ✅ Refresh orders after saving
  
  //     console.log("Order saved successfully!");
  //     window.print(); // 🖨️ Opens print dialog
  
  //   } catch (error) {
  //     console.error("Error saving order:", error);
  //   }
  // };
  
  const handlePrintOrder = async () => {
    if (!currentOrder) return;
  
    try {
      const response = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentOrder),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save order");
      }
  
      console.log("Order saved successfully!");
      //alert that order saved successfully
      alert("Order saved successfully!");
      // Print the order (opens browser print dialog)
      
  
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };
  
  
  return (
    <div className="space-y-6 animate-fade-in h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-1">
            {currentOrder 
              ? `Current order for ${currentOrder.tableName}` 
              : 'Select a table to view or create an order'}
          </p>
        </div>
        
        {orders.length > 0 && !currentOrder && (
          <Select onValueChange={(value) => selectTable(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a table" />
            </SelectTrigger>
            <SelectContent>
              {orders
                .filter(order => order.status === 'active')
                .map(order => (
                  <SelectItem key={order.tableId} value={order.tableId.toString()}>
                    {order.tableName}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {currentOrder ? (
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Order Details</CardTitle>
                  <StatusBadge status={currentOrder.status} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Created {new Date(currentOrder.createdAt).toLocaleTimeString()}
                </p>
              </CardHeader>
              
              <ScrollArea className="h-[calc(100vh-350px)]">
                <CardContent>
                  {currentOrder.items.length > 0 ? (
                    currentOrder.items.map(item => (
                      <OrderItem key={item.id} item={item} />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-2">No items in this order yet</p>
                      <Button variant="outline" onClick={() => navigate('/menu')}>
                        Add Items from Menu
                      </Button>
                    </div>
                  )}
                </CardContent>
              </ScrollArea>
              
              <CardFooter className="flex flex-col border-t pt-6">
                <div className="w-full flex justify-between mb-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">${currentOrder.total.toFixed(2)}</span>
                </div>
                
                <div className="w-full flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={cancelOrder}
                  >
                    Cancel Order
                  </Button>
                  
                  <Button 
                    variant="default" 
                    className="flex-1"
                    onClick={handleProceedToCheckout}
                    disabled={currentOrder.items.length === 0}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Checkout
                  </Button>
                  <Button 
  variant="default" 
  className="flex-1"
  onClick={handlePrintOrder}
  disabled={currentOrder.items.length === 0}
>
   Save Order
</Button>

                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center p-8 text-center">
              <Loader2 className="h-10 w-10 text-muted-foreground mb-4 animate-spin" />
              <h2 className="text-xl font-semibold mb-2">No Active Order Selected</h2>
              <p className="text-muted-foreground mb-6">
                Select a table to view its order or create a new one
              </p>
              <Button onClick={() => navigate('/tables')}>
                Go to Tables
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          )}
        </div>
        
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
            </CardHeader>
            
            <ScrollArea className="h-[calc(100vh-350px)]">
              <CardContent className="space-y-4">
                {orders.filter(order => order.status === 'active').length > 0 ? (
                  orders
                    .filter(order => order.status === 'active')
                    .map(order => (
                      <Card key={order.id} className="cursor-pointer hover-scale">
                        <CardContent 
                          className="p-4"
                          onClick={() => selectTable(order.tableId)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{order.tableName}</h3>
                            <StatusBadge status={order.status} size="sm" />
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                            </span>
                            <span className="font-medium">${order.total.toFixed(2)}</span>
                          </div>
                          
                          <div className="text-xs text-muted-foreground mt-2">
                            Started {new Date(order.createdAt).toLocaleTimeString()}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No active orders</p>
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Orders;
