import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

//api handler reservations
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  //if user's not logged in
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  //destructering data from client request
  const { listingId, startDate, endDate, totalPrice } = body;

  //if data is invalid
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  //cteate a reservation
  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });
  return NextResponse.json(listingAndReservation);
}
