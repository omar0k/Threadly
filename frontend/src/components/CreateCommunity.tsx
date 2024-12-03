import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Textarea } from "./ui/textarea";
import api from "@/api";
import { Community } from "@/types";

interface CreateCommunityProps {
  onCommunityCreated: (newCommunity: Community) => void;
}
export function CreateCommunity({ onCommunityCreated }: CreateCommunityProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await api.post("/api/communities/", {
      name: communityName,
      description: communityDescription,
    });
    onCommunityCreated(response.data);
    setIsOpen(false);
    setCommunityName("");
    setCommunityDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="hover:cursor-pointer flex items-center gap-3 rounded-md  hover:bg-gray-800 p-1 hover:text-white transition-colors duration-200">
          <PlusIcon size={32} />
          Create Community
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create a new community</DialogTitle>
          <DialogDescription>
            This information helps users understand what the community is about
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              className="bg-gray-300"
              id="community-name"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              minLength={3}
              required
              maxLength={21}
              placeholder="Enter community name"
            />
            <Textarea
              maxLength={500}
              required
              onChange={(e) => setCommunityDescription(e.target.value)}
              className="resize-none min-h-28  bg-gray-300"
              placeholder="Describe your community"
            />
          </div>
          <Button className="w-1/4" type="submit">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default CreateCommunity;
