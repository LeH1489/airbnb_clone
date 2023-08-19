import { NextResponse } from "next/server";

import getCurrentUser from "../../../actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

//api handler add favorite
export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  //if not having current user
  if (!currentUser) {
    return NextResponse.error();
  }

  //get id of listing from url
  const { listingId } = params;

  //if params from url is invalid
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID!");
  }

  //get favoriteIds fields of current user
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  //push id of the listing (from url) to favoriteIDs field of current user
  favoriteIds.push(listingId);

  //update user with favoriteIDs

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

//api handler delete favorite
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  //get id of the listing from url
  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID!");
  }

  //get favoriteIds fields of current user
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  //return true ==> elements is included in array, return false ==> elements is eliminated from array
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  //update user
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
