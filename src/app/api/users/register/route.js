import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/utils/prisma";

export async function POST(req) {
  const { firstName, lastName, username, email, password, about } = await req.json();
  const role = "user"

  try {
    // Create hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user to database
    const createUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        role,
        about
      },
    });

    return NextResponse.json(
      { data: createUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
