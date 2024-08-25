'use client';

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import AvatarGroup from "@/app/components/AvatarGroup";
import { FullConversationType } from "@/app/types";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ 
  data, 
  selected 
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => session.data?.user?.email, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage || !userEmail) {
      return false;
    }

    const seenArray = lastMessage.seen || [];
    console.log('Last Message Seen Array:', seenArray);
    return seenArray.some((user) => user.email === userEmail);
  }, [userEmail, lastMessage]);

  // Calculate the number of unread messages
  const unreadCount = useMemo(() => {
    const messages = data.messages || [];

    if (!userEmail) {
      return 0;
    }

    const unreadMessages = messages.filter((message) => {
      const seenArray = message.seen || [];
      const isSeen = seenArray.some((user) => user.email === userEmail);
      console.log('Message:', message, 'Seen by user:', isSeen);
      return !isSeen;
    });

    console.log('Unread Count:', unreadMessages.length);
    return unreadMessages.length;
  }, [data.messages, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return ( 
    <div
      onClick={handleClick}
      className={clsx(`
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3
        mb-2 
        bg-green-100
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        drop-shadow-xl
        `,
        selected ? 'bg-green-400' : ''
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser?.name}
            </p>
            {lastMessage?.createdAt && (
              <p 
                className="
                  text-xs 
                  text-gray-400 
                  font-light
                "
              >
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p 
              className={clsx(`
                truncate 
                text-sm
                `,
                hasSeen ? 'text-gray-500' : 'text-black font-medium'
              )}
            >
              {lastMessageText}
            </p>
            {unreadCount > 0 && (
              <span className="ml-2 text-xs text-red-500 font-semibold">
               new
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default ConversationBox;
