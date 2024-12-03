import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Textarea } from "./ui/textarea";
import api from "@/api";
import { Community } from "@/types";
import { ACCESS_TOKEN } from "@/constants";

interface CreateCommunityProps {
  onCommunityCreated: (newCommunity: Community) => void;
}
export function CreateCommunity({ onCommunityCreated }: CreateCommunityProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [nameInputError, setNameInputError] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInputError) return;
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
              className={`bg-gray-300 ${
                nameInputError
                  ? "focus-visible:ring-red-500 border-red-500"
                  : ""
              }`}
              id="community-name"
              value={communityName}
              onChange={(e) => {
                setNameInputError(false);
                if (/[^a-zA-Z0-9_]/g.test(e.target.value)) {
                  setNameInputError(true);
                }
                setCommunityName(e.target.value);
                console.log(communityName);
              }}
              minLength={3}
              required
              maxLength={21}
              placeholder="Enter community name"
            />
            {nameInputError && (
              <span className="ml-3 text-xs text-red-500">
                Only letters, numbers and underscore are allowed
              </span>
            )}
            <Textarea
              maxLength={500}
              required
              onChange={(e) => setCommunityDescription(e.target.value)}
              className="resize-none min-h-28  bg-gray-300"
              placeholder="Describe your community"
            />
          </div>
          <Button disabled={nameInputError} className="w-1/4" type="submit">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default CreateCommunity;
