"use client";
import { FullConversationType } from "@/app/types";
import { Conversation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import useConversation from "@/app/hooks/useConversation";
import ConversationBox from "./ConversationBox";
import clsx from "clsx";

interface ConversationListProps {
    initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems
}) => {
  const [items, setItems] =useState(initialItems);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <aside className={clsx(`
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        `, 
        isOpen? 'hidden' : 'block w-full left-0'
        )}
    >
        <div className="px-5 rounded ">
            <div className="flex justify-between mb-4 pt-4">
                <div className="
                    text-2xl
                    font-bold
                    text-neutral-800
                    select-none
                ">
                    Conversations
                </div>
        
                <div className="
                    rounded-full
                    p-2
                    mb-2
                    bg-gray-100
                    text-gray-900
                    cursor-pointer
                    hover:text-green-700
                    hover:drop-shadow-md
                    transition
                ">
                    <AiOutlineUsergroupAdd size={25}/>
                </div>
        </div>
            </div>
            {items.map((item) => (
                <ConversationBox
                    key={item.id}
                    data={item}
                    selected={conversationId === item.id}
                
                />
            ))}
        
    </aside>
  );
};

export default ConversationList;