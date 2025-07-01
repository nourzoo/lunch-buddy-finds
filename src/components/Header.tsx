
import { useState } from 'react';
import { Bell, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  const [notifications] = useState(3);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍽️</span>
              </div>
              <h1 className="ml-3 text-xl font-bold gradient-orange bg-clip-text text-transparent">
                점심메이트
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-white">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
