import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");

  try {
    if (username) {
      const singleUser = await prisma.user.findUnique({
        where:
          { username },
        include: {
          project: {
            select: {
              id: true,
              name: true,
              description: true,
              featuredImage: true,
              category: true,
              link: true,
              repository: true,
              tech: true,
              createdAt: true,
              slug: true,
            },
          },
        },
      });

      return NextResponse.json(
        {
          message: "User fetched succesfully!",
          data: singleUser,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      message: "No user to show",
      data: null,
    },
      { status: 200 }
    )
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
