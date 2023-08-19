import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

//api handler cancel reservation
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  //get currentUser from session
  const currentUser = await getCurrentUser();

  //if user's not logged in
  if (!currentUser) {
    return NextResponse.error();
  }

  //get reservationId from client request
  const { reservationId } = params;

  //if reservationId is invalid!
  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID!");
  }

  //cancel reservation:
  //2 type of user can cancel the reservation: current user (guest) and creator of the listing (listing owner)
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
