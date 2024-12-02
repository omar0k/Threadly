import React from 'react';
import { Community } from '@/types';
import { useNavigate } from 'react-router-dom';
interface CommunitySideTabProps {
  community?: Community; // Type the community prop
  isCommunity: boolean;
  tabText?: string;
  tabIcon?: React.ReactNode;
  tabLink?: string;
}
const SidebarTab: React.FC<CommunitySideTabProps> = ({
  community,
  isCommunity,
  tabIcon,
  tabText,
}) => {
  const navigate = useNavigate();
  if (!isCommunity) {
    return (
      <div
        onClick={() => navigate('/create-community')}
        className='hover:cursor-pointer flex items-center gap-3 rounded-md  hover:bg-gray-800 p-1 hover:text-white transition-colors duration-200'
      >
        {tabIcon && <span>{tabIcon}</span>}
        <span>{tabText}</span>
      </div>
    );
  }
  return (
    <div className='hover:cursor-pointer flex items-center gap-3 rounded-md  hover:bg-gray-800 p-1 hover:text-white transition-colors duration-200'>
      <img
        className='w-8 h-8 object-cover rounded-full'
        src={
          community?.image_url
            ? import.meta.env.VITE_API_URL + community?.image_url
            : 'https://placehold.co/400'
        }
        alt={community?.name}
      />
      <span>{community?.name}</span>
    </div>
  );
};

export default SidebarTab;
