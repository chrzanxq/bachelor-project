"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";

interface UserBoxProps {
    data: User
}


const UserBox: React.FC<UserBoxProps> = ({
    data
}) => {
    const router = useRouter();
    const [isLoading, setIsloading] = useState(false);

    const handleClick = useCallback(() => {
        setIsloading(true);

        axios.post('/api/conversations', {
            userId: data.id
        })
        .then((data) => {
            router.push(`/conversations/${data.data.id}`);
        })
        .finally(() => setIsloading(false));
    }, [data, router]);


  return (
    <>
    {isLoading && (
    <LoadingModal />
    )}
    <div
     onClick={handleClick}
     className="
      w-full
      relative
      flex
      items-center
      space-x-3
      bg-green-100
      p-3
      hover:bg-white
      rounded-lg
      transition
      cursor-pointer
      my-2
     "
    >
        <Avatar user={data}/>
        <div className="min-w-0 flex-1"> 
            <div className="focus:outline-none">
                <div className="
                    flex
                    justify-between
                    items-center
                    mb-1
                ">
                    <p className="
                        text-sm
                        font-medium
                        text-grat-900
                    ">
                        {data.name}
                    </p>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default UserBox