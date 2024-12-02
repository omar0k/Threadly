import { Community } from '@/types';
import React, { FC } from 'react';
import SidebarTab from './SidebarTab';
import { PlusIcon } from 'lucide-react';
interface SidebarProps {
  communities?: Community[];
}
const Sidebar: React.FC<SidebarProps> = ({ communities }) => {
  return (
    <div className='basis-64 p-5'>
      <SidebarTab
        isCommunity={false}
        tabIcon={<PlusIcon size={32} />}
        tabText='Create a community'
      />
      {communities?.map((community) => (
        <SidebarTab
          key={community.id}
          community={community}
          isCommunity={true}
        />
      ))}
    </div>
  );
};

export default Sidebar;
