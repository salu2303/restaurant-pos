
import { NavLink } from "react-router-dom";
import { usePOS } from "@/context/POSContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { CreditCard, Home, Menu, Receipt, LayoutDashboard, Clock, Settings, User, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { getActiveOrdersCount } = usePOS();
  
  const navLinks = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/tables", icon: LayoutDashboard, label: "Tables" },
    { to: "/menu", icon: Menu, label: "Menu" },
    { to: "/orders", icon: Receipt, label: "Orders", badge: getActiveOrdersCount },
    { to: "/checkout", icon: CreditCard, label: "Checkout" },
    { to: "/reports", icon: Clock, label: "Reports" }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold flex items-center">
              Restaurant <span className="text-primary ml-1">POS</span>
            </h2>
            <p className="text-xs text-muted-foreground">Point of Sale System</p>
          </div>
          <SidebarTrigger className="ml-auto">
            <ChevronRight className="h-4 w-4" />
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((link) => (
                <SidebarMenuItem key={link.to}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) => isActive ? "active-item" : ""}
                    >
                      <link.icon className="h-4 w-4 mr-2" />
                      <span>{link.label}</span>
                      {link.badge && link.badge() > 0 && (
                        <Badge 
                          variant="secondary" 
                          className="ml-auto"
                        >
                          {link.badge()}
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full">
              <User className="h-4 w-4 mr-2" />
              <span>Staff</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navbar;
