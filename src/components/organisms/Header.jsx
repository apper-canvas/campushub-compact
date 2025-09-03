import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { AuthContext } from '../../App';
import { cn } from '@/utils/cn';

const Header = ({ showMobileMenu, onMenuToggle, className }) => {
  const { logout } = useContext(AuthContext);
  const userState = useSelector((state) => state.user);
  const user = userState?.user;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className={cn(
      "bg-white shadow-sm border-b border-gray-200 px-4 py-3",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showMobileMenu && (
            <Button
              variant="ghost"
              size="sm"
              icon="Menu"
              onClick={onMenuToggle}
              className="lg:hidden"
            />
          )}
          
          <div className="lg:hidden">
            <h1 className="text-xl font-bold text-gray-900">CampusHub</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">
                  {user.emailAddress}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                icon="LogOut"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;