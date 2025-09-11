"use client";

import { Input } from "@/components/ui/input";
import CopyButton from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

interface KeyCardProps {
  value: string | null;
}

const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-6">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={show ? "text" : "password"}
              disabled
              placeholder="Stream Key"
            />
            <CopyButton value={value || ""} />
            <Button
              onClick={() => setShow(!show)}
              size={"sm"}
              className="bg-[#3a3a3a] hover:bg-[#3a3a3a]/90"
              variant={"ghost"}
            >
              {!show ? (
                <Eye className="h-4 w-4 text-white" />
              ) : (
                <EyeClosed className="h-4 w-4 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyCard;
