import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

//This is not a route, this is a direct communication from server component to database
export default async function getFavoriteListing() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    //find all of listings are included in favoriteIds field of current user
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorite = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));

    return safeFavorite;
  } catch (error: any) {
    throw new Error(error);
  }
}
