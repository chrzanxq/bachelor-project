"use client";
import useOtherUser from '@/app/hooks/useOtherUser';
import { User, Conversation } from '@prisma/client';
import Link from 'next/link';
import React, { useMemo } from 'react';
import {HiChevronLeft} from "react-icons/hi2"

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
};
const Header: React.FC<HeaderProps>  = ({
    conversation
}) => {

    const otherUser = useOtherUser(conversation);

    const statusText = useMemo(() => {
        if (conversation.isGroup){
            return `${conversation.users.length} members`
        }

        return 'Active';
    }, [conversation]);

    return (  
        <div className='
       sm:bg-green-300
       md:bg-white
        w-full
        flex
        border-b-[1px]
        sm:px-4
        py-3
        px-4
        lg:px-6
        justify-between
        items-center
        shadown-sm
        '>
            <div className='flex gap-3 items-center'>
                <Link 
                className='
                lg:hidden
                block
                bg-white
                text-green-500
                hover:text-green-600
                transition
                border-l
                rounded
                shadow-lg
                drop-shadow-3xl
                cursor-pointer
                '
                href="/conversations">
                    <HiChevronLeft size={32}/>
                </Link>
            </div>
        </div>
    );
}
 
export default Header;