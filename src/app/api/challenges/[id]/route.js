import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const singleChallenge = await prisma.challenge.findFirst({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Challenge fetched succesfully!", data: singleChallenge },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
