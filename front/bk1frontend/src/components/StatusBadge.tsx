
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { OrderStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'default' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'default' }) => {
  const sizeClasses = {
    sm: 'text-xs py-0 px-2',
    default: '',
    lg: 'text-base px-3 py-1'
  };
  
  const variants: Record<OrderStatus, string> = {
    active: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    completed: 'bg-green-100 text-green-800 hover:bg-green-100',
    canceled: 'bg-red-100 text-red-800 hover:bg-red-100'
  };
  
  const labels: Record<OrderStatus, string> = {
    active: 'Active',
    completed: 'Completed',
    canceled: 'Canceled'
  };
  
  return (
    <Badge 
      className={`${variants[status]} ${sizeClasses[size]} font-medium`}
      variant="outline"
    >
      {labels[status]}
    </Badge>
  );
};

export default StatusBadge;
