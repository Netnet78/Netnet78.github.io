import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const DownloadCvButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <a
          href="https://drive.google.com/file/d/1l4MpdUvowqRwvZu6ylGyyKnWc3JhRRrU/view?usp=sharing"
          target="_blank"
        >
          <Button
            type="button"
            variant={"secondary"}
            className={"rounded-md px-4 py-2 text-xs"}
            aria-label="Download CV"
          >
            <i className="fa-solid fa-download"></i>
            <span className="block md:hidden">CV</span>
            <span className="hidden md:block">Download CV</span>
          </Button>
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>Download CV</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default DownloadCvButton;
