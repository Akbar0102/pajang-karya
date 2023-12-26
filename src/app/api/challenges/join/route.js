import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { challengeId } = await request.json();
    const status = "ONPROGRESS";

    // Get user id from token
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const joinChallenge = await prisma.userChallenge.create({
      data: {
        status,
        challengeId,
        userId,
      },
    });

    return NextResponse.json({
      data: joinChallenge,
      message: "Challenge joined",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
