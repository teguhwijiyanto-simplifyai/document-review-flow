
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  FileText, 
  Building, 
  ShoppingCart, 
  Shield, 
  Scale,
  LogOut,
  Sun,
  Moon,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: 'contract-review', label: 'Contract Review', icon: FileText },
  { id: 'corporate-governance', label: 'Corporate Governance & Legal Advisory', icon: Building },
  { id: 'procurement', label: 'Procurement & Vendor Contract Support', icon: ShoppingCart },
  { id: 'regulatory', label: 'Regulatory Compliance', icon: Shield },
  { id: 'litigation', label: 'Litigation & Dispute Support', icon: Scale },
];

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-screen w-80 bg-gray-900 text-white flex flex-col">
      {/* Menu Items */}
      <div className="flex-1 py-6">
        <div className="px-4 mb-8">
          <h1 className="text-xl font-bold">Legal Contract Reviewer</h1>
        </div>
        
        <nav className="space-y-2 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left h-auto py-3 px-4 text-white hover:bg-gray-800",
                  activeItem === item.id && "bg-gray-800"
                )}
                onClick={() => onItemClick(item.id)}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-sm leading-tight">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>

      {/* User Info and Controls */}
      <div className="border-t border-gray-700 p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-700 p-2 rounded-full">
            <User className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.email}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-white hover:bg-gray-800"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-white hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
