"use client";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}
const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    active,
    onClick
}) => {
    const handleClick = () => {
        if(onClick){
            return onClick();
        }
    }
  return (
    <Link 
    onClick={onClick}
    href={href}
    className={clsx(`
      flex
      group
      gap-x-3
      text-sm
      leading-6
      font-semibold
      w-full
      justify-center
      p-4
      text-gray-400
      hover:text-green-600
      hover:bg-gray-100
    `,
        active && "text-green-600 drop-shadow-xl"
    )}
    >
        <Icon className="h-6 w-6"/>
    </Link>
  );
}

export default MobileItem;