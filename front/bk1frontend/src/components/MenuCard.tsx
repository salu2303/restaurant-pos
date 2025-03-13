
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItem } from '@/lib/types';
import { usePOS } from '@/context/POSContext';
import { Plus } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { addToOrder, currentOrder } = usePOS();
  
  const handleAddToOrder = () => {
    addToOrder(item);
  };
  
  return (
    <Card className="overflow-hidden hover-scale h-full flex flex-col">
      <div className="relative h-48 overflow-hidden bg-muted">
        <img 
          src={item.image} 
          alt={item.name} 
          className="object-cover w-full h-full transition-all hover:scale-105"
          loading="lazy"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <p className="text-white font-semibold">Currently Unavailable</p>
          </div>
        )}
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="font-medium text-primary">${Number(item.price).toFixed(2)}</p>
        </div>
        
        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={handleAddToOrder} 
          disabled={!item.available || !currentOrder}
          className="w-full"
          variant="default"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuCard;
