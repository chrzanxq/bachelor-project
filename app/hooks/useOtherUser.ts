import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    const otherUser = conversation.users.filter((user) => currentUserEmail);
    // console.log('aa', otherUser)

    return otherUser[1];
  }, [session.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;