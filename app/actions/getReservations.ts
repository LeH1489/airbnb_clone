import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

//this is not a route, this is a direct communication from server component to database
export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    //depending on Whether client send listingId or userId or authorId ==> query by different thing

    //if send listingId ==> find all reservation for the single which user's looking at
    if (listingId) {
      query.listingId = listingId;
    }

    //if send userId ==> find all of trips which user have
    if (userId) {
      query.userId = userId;
    }

    //if send authorId ==> find all of reservation that other user create listing
    if (authorId) {
      query.listing = { userId: authorId };
    }

    //get reservation depending on query
    const reservation = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservation = reservation.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
    return safeReservation;
  } catch (error: any) {
    throw new Error(error);
  }
}
