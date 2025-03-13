
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import { SidebarProvider } from "@/components/ui/sidebar";
import { POSProvider } from '@/context/POSContext';

const Layout = () => {
  return (
    <POSProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Navbar />
          <main className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 overflow-auto max-h-screen animate-fade-in">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </POSProvider>
  );
};

export default Layout;
