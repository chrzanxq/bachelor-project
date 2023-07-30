'use client';


import { User } from "@prisma/client";

import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ 
  items, 
}) => {
  return ( 
    <aside 
      className="
      fixed
      inset-y-0
      pb-20
      lg:pb-0
      lg:left-20
      lg:w-80
      lg:block
      overflow-y-auto
      border-r
      border-gray-300
      block
      w-full
      left-0
      drop-shadow-md
      shadow-2xl
      "
    >
      <div className="px-5">
        <div className="flex-col py-3">
          <div 
            className="
              text-2xl 
              font-bold 
              text-neutral-800 
              py-2
              select-none
            "
          >
            People
          </div>
        </div>
        {items.map((item) => (
          <UserBox
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </aside>
  );
}
 
export default UserList;
