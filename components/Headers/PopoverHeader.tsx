// PopoverMenu.tsx
import React, { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface PopoverMenuProps {
  title: string;
  children: ReactNode[];
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mouseLeaveDelay = 200;
  let timeoutId: NodeJS.Timeout | null;

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, mouseLeaveDelay);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="relative z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="cursor-pointer text-white hover:text-blue-600 px-4 py-2 flex flex-wrap rounded">
        {title}
        <ChevronDownIcon className="h-5 w-5 mt-1" aria-hidden="true" />
      </span>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute text-black pl-5 left-0 mt-2 pt-2 w-48 py-1 bg-gray-50 rounded shadow-xl space-y-2"
        >
          {children.slice(0, 8).map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopoverMenu;
