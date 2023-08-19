import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

//this is not a route, this is a direct communication from server component to database
export default async function getListingById(params: IParams) {
  try {
    //get id of the listing from url
    const { listingId } = params;

    //find the listing by id
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
