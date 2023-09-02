import { NextResponse } from "next/server";

import primsa from "@/app/libs/prismadb";
import getCurrentUser from "../../actions/getCurrentUser";

//api handler create a listing
//(fetch data via route handler)
export async function POST(request: Request) {
  //get current User from session
  const currenUser = await getCurrentUser();

  if (!currenUser) {
    return NextResponse.error();
  }

  //get data from request
  const body = await request.json();

  //destructering
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  const listing = await primsa.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currenUser.id,
    },
  });

  return NextResponse.json(listing);
}
