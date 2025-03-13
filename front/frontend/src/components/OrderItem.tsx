
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { OrderItem as OrderItemType } from '@/lib/types';
import { usePOS } from '@/context/POSContext';
import { Minus, Plus, Trash } from 'lucide-react';

interface OrderItemProps {
  item: OrderItemType;
  editable?: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({ item, editable = true }) => {
  const { updateOrderItem, removeFromOrder } = usePOS();
  const [notes, setNotes] = useState(item.notes);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    updateOrderItem(item.id, {
      quantity: newQuantity,
    });
  };
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };
  
  const handleNotesSave = () => {
    updateOrderItem(item.id, { notes });
  };
  
  const handleRemove = () => {
    removeFromOrder(item.id);
  };
  
  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-muted-foreground">${Number(item.price).toFixed(2)} each</p>
          </div>
          
          {editable ? (
            <div className="flex items-center space-x-1">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="w-14 h-8 text-center"
                min={1}
              />
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 ml-2 text-destructive hover:text-destructive"
                onClick={handleRemove}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div>
              <span className="font-semibold">x{item.quantity}</span>
            </div>
          )}
        </div>
        
        {editable ? (
          <div className="mt-2">
            <Textarea
              placeholder="Special instructions..."
              value={notes}
              onChange={handleNotesChange}
              onBlur={handleNotesSave}
              className="text-sm min-h-[60px]"
            />
          </div>
        ) : item.notes ? (
          <div className="mt-2 text-sm italic">
            <p>Notes: {item.notes}</p>
          </div>
        ) : null}
        
        <div className="flex justify-between mt-2 pt-2 border-t">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="font-medium">${item.subtotal.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
