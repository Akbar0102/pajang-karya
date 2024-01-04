import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");

  try {
    if (username) {
      const singleUser = await prisma.user.findUnique({
        where: { username },
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
            orderBy: {
              createdAt: "desc",
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

    return NextResponse.json(
      {
        message: "No user to show",
        data: null,
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

export async function PUT(req) {
  const formData = await req.formData();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const about = formData.get("about");

  // Get user id from token
  const cookieStore = cookies();
  const token = cookieStore.get("token").value;
  const decoded = verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  const existingUserWithNewEmail = await prisma.user.findFirst({
    where: {
      email,
      id: {
        not: userId,
      },
    },
  });

  if (existingUserWithNewEmail) {
    return NextResponse.json(
      { errorMessage: "Email is already in use by another user" },
      { status: 400 }
    );
  }

  try {
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        email,
        about,
      },
    });

    return NextResponse.json(
      {
        message: "User data updated successfully",
        data: updateUser,
      },
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
