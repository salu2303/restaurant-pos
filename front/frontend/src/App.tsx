
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Tables from "./pages/Tables";
import Checkout from "./pages/Checkout";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import { POSProvider, usePOS } from "./context/POSContext";

const queryClient = new QueryClient();

// Wrapper component to check roles
const RoleWrapper = ({ 
  allowedRoles,
  redirectPath,
  children 
}: { 
  allowedRoles: string[], 
  redirectPath: string,
  children: React.ReactNode 
}) => {
  const { isAuthenticated, currentUser } = usePOS();
  
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.includes(currentUser.role)) {
    return <>{children}</>;
  }
  
  return <Navigate to={redirectPath} replace />;
};

const AppRoutes = () => {
  const { isAuthenticated } = usePOS();
  
  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" replace /> : <Login />
      } />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Index />} />
        
        <Route path="reports" element={
          <RoleWrapper allowedRoles={['admin']} redirectPath="/tables">
            <Reports />
          </RoleWrapper>
        } />
        
        <Route path="menu" element={<Menu />} />
        <Route path="orders" element={<Orders />} />
        <Route path="tables" element={<Tables />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <POSProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </POSProvider>
  </QueryClientProvider>
);

export default App;
