import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      // where: {
      //   NOT: {
      //     email: session.user.email
      //   }
      // }
      
    });
    const currentUser = users.find(user => user.name === session?.user?.name);
    if(currentUser){
      currentUser.name =`${session?.user?.name} (Me)`
      return users;
    }
   

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;