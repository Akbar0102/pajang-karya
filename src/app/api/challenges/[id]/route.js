import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const singleChallenge = await prisma.challenge.findFirst({
      where: {
        id: id,
      },
      include: {
        userChallenge: {
          select: {
            status: true,
            user: {
              select: {
                username: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    const countUser = singleChallenge.userChallenge.length;

    return NextResponse.json(
      {
        message: "Challenge fetched succesfully!",
        data: { ...singleChallenge, countUser: countUser },
      },
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
