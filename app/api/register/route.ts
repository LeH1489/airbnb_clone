import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

//api handler registration
//(fetch data via route handler)
export async function POST(request: Request) {
  //get data from request
  const body = await request.json();

  //destructring the fields on the body (req)
  const { email, name, password } = body;

  //hashed password
  const hashedPassword = await bcrypt.hash(password, 12);

  //create a new user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
