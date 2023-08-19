import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions); //retrive session object
}

//func get current user without calling api
//Retrieving data (user data) from the session is usually faster because it's stored locally on the server.
//(not a route, this is a direct communication from server component to database)
export default async function getCurrentUser() {
  try {
    const session = await getSession(); //get session to get user data

    //not having user
    if (!session?.user?.email) {
      return null;
    }

    //find user whose email is equal to session.user.email
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    //not matched
    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}
