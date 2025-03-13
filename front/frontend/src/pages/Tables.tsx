
import React from 'react';
import { usePOS } from '@/context/POSContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TableGrid from '@/components/TableGrid';
import { useNavigate } from 'react-router-dom';
import { Menu, ArrowRight } from 'lucide-react';

const Tables = () => {
  const { tables, selectedTable, currentOrder } = usePOS();
  const navigate = useNavigate();
  
  const availableTables = tables.filter(t => t.status === 'available').length;
  const occupiedTables = tables.filter(t => t.status === 'occupied').length;
  
  const handleViewMenu = () => {
    navigate('/menu');
  };
  
  const handleViewOrder = () => {
    navigate('/orders');
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tables</h1>
          <p className="text-muted-foreground mt-1">
            Select a table to start or view an order
          </p>
        </div>
        
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
            {availableTables} Available
          </span>
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
            {occupiedTables} Occupied
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Floor Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <TableGrid tables={tables} />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Selected Table</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-grow">
              {selectedTable ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">{selectedTable.name}</h2>
                    <p className="text-muted-foreground">
                      Capacity: {selectedTable.capacity} {selectedTable.capacity === 1 ? 'person' : 'people'}
                    </p>
                    
                    <div className="mt-4 inline-block rounded-full px-3 py-1 text-sm font-medium 
                      bg-primary/10 text-primary">
                      {selectedTable.status.charAt(0).toUpperCase() + selectedTable.status.slice(1)}
                    </div>
                  </div>
                  
                  {currentOrder && (
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Current Order</h3>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Items:</span>
                        <span>{currentOrder.items.length}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-medium">${currentOrder.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Started:</span>
                        <span>{new Date(currentOrder.createdAt).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No table selected</p>
                  <p className="text-xs text-muted-foreground mt-1">Click on a table to select it</p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col border-t pt-4 space-y-2">
              <Button 
                className="w-full" 
                onClick={handleViewMenu}
                disabled={!selectedTable}
              >
                <Menu className="mr-2 h-4 w-4" />
                View Menu
              </Button>
              
              {currentOrder && currentOrder.items.length > 0 && (
                <Button 
                  variant="outline"
                  className="w-full" 
                  onClick={handleViewOrder}
                >
                  View Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tables;
