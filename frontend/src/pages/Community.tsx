import api from "@/api";
import { Button } from "@/components/ui/button";
import { Community as CommunityType } from "@/types";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Community = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { communityName } = useParams();
  const [community, setCommunity] = useState<CommunityType>();
  useEffect(() => {
    const fetchCommunity = async () => {
      const response = await api.get(`/api/communities/?name=${communityName}`);
      setCommunity(response.data[0]);
    };
    const fetchThreads = async () => {
      const response = await api.get(
        `/api/communities/${communityName}/threads/`
      );
      console.log(response);
    };
    fetchCommunity();
    fetchThreads();
  }, [communityName]);
  if (community) {
    return (
      <div className="bg-red-600">
        <div>
          <div className="flex gap-2 items-center">
            <img
              className="w-10 h-10 object-cover rounded-full"
              src={
                community?.image_url
                  ? import.meta.env.VITE_API_URL + community?.image_url
                  : "https://placehold.co/400"
              }
            />
            <h1>{community.name}</h1>
          </div>
        </div>
        <div>
          <Button
            className="rounded-full"
            onClick={() => navigate("create-thread")}
          >
            <PlusIcon /> Create Thread
          </Button>
        </div>
        <div></div>
      </div>
    );
  }
};

export default Community;
