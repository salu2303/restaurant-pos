
import React from 'react';
import { Table } from '@/lib/types';
import { usePOS } from '@/context/POSContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface TableGridProps {
  tables: Table[];
}

const TableGrid: React.FC<TableGridProps> = ({ tables }) => {
  const { selectTable, selectedTable } = usePOS();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'occupied':
        return 'bg-red-500';
      case 'reserved':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {tables.map((table) => (
        <Card 
          key={table.id}
          className={`cursor-pointer hover-scale ${
            selectedTable?.id === table.id ? 'ring-2 ring-primary ring-offset-2' : ''
          }`}
          onClick={() => selectTable(table.id)}
        >
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div 
              className={`w-3 h-3 rounded-full mb-2 ${getStatusColor(table.status)}`}
            />
            
            <h3 className="font-medium text-lg">{table.name}</h3>
            
            <div className="flex items-center mt-1 text-muted-foreground">
              <Users className="w-4 h-4 mr-1" />
              <span>{table.capacity}</span>
            </div>
            
            <Badge 
              variant={
                table.status === 'available' 
                  ? 'outline' 
                  : table.status === 'occupied' 
                    ? 'destructive' 
                    : 'secondary'
              }
              className="mt-3"
            >
              {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TableGrid;
