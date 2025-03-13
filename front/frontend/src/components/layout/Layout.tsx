
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePOS } from '@/context/POSContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Layout = () => {
  const { currentUser, logout } = usePOS();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Navbar />
        <main className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 overflow-auto max-h-screen animate-fade-in">
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-2">
              <div className="text-sm mr-2">
                <span className="text-muted-foreground">Signed in as: </span>
                <span className="font-medium">{currentUser?.name}</span>
                <span className="px-2 py-0.5 ml-2 text-xs rounded-full bg-primary/10 text-primary">
                  {currentUser?.role.toUpperCase()}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
