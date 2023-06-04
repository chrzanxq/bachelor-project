import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {IoLogoWechat} from 'react-icons/io5'
import { HiArrowCircleLeft} from 'react-icons/hi';
import { signOut } from "next-auth/react";
import { IoIosPeople } from 'react-icons/io'
import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    { 
      label: 'Chat', 
      href: '/conversations', 
      icon: IoLogoWechat,
      active: pathname === '/conversations' || !!conversationId
    },
    { 
      label: 'Users', 
      href: '/users', 
      icon: IoIosPeople, 
      active: pathname === '/users'
    },
    {
      label: 'Logout', 
      onClick: () => signOut(),
      href: '#',
      icon: HiArrowCircleLeft, 
    }
  ], [pathname, conversationId]);

  return routes;
};

export default useRoutes;