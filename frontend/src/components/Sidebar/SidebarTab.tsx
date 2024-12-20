import React from "react";
import { Community } from "@/types";
import { useNavigate } from "react-router-dom";
interface CommunitySideTabProps {
  community: Community;
}
const SidebarTab: React.FC<CommunitySideTabProps> = ({ community }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`${community.name}`, { state: { id: community.id } })
      }
      className="hover:cursor-pointer flex items-center gap-3 rounded-md  hover:bg-gray-800 p-1 hover:text-white transition-colors duration-200"
    >
      <img
        className="w-8 h-8 object-cover rounded-full"
        src={
          community?.image_url
            ? import.meta.env.VITE_API_URL + community?.image_url
            : "https://placehold.co/400"
        }
        alt={community?.name}
      />
      <span>{community?.name}</span>
    </div>
  );
};

export default SidebarTab;
