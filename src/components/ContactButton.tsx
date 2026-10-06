import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

const ContactButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <a href="#contact">
          <Button
            type="button"
            variant={"outline"}
            className={"rounded-md flex items-center gap-2 px-4 py-2 text-xs"}
          >
            <div className="relative w-4">
              <div className="bg-secondary w-4 h-4 rounded-full absolute left-1/2 top-1/2 -translate-1/2 origin-center animate-ping"></div>
              <div className="bg-secondary w-2 h-2 rounded-full absolute left-1/2 top-1/2 -translate-1/2 animate-pulse"></div>
            </div>
            <span className="hidden md:block">Contact me</span>
            <i className="fa-regular fa-paper-plane"></i>
          </Button>
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>Contact me</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ContactButton;
