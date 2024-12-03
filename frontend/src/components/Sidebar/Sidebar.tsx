import { Community } from "@/types";
import React, { useEffect, useState } from "react";
import SidebarTab from "./SidebarTab";
import { PlusIcon } from "lucide-react";
import { CreateCommunity } from "../CreateCommunity";
import api from "@/api";
interface SidebarProps {
  communities?: Community[];
}
const Sidebar: React.FC<SidebarProps> = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  useEffect(() => {
    const fetchCommunities = async () => {
      const response = await api.get("/api/communities/");

      console.log(response);
      setCommunities(response.data);
    };
    fetchCommunities();
  }, []);
  return (
    <div className="basis-64 p-5">
      <CreateCommunity
        onCommunityCreated={(newCommunity) =>
          setCommunities((prev) => [...prev, newCommunity])
        }
      />
      {communities?.map((community) => (
        <SidebarTab key={community.id} community={community} />
      ))}
    </div>
  );
};

export default Sidebar;
