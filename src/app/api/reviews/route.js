import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  const { projectId } = await request.json();
  const status = "OP";

  try {
    // Get user id from token
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const askReview = await prisma.review.create({
      data: {
        status,
        userId,
        projectId,
      },
    });
    return NextResponse.json(
      { data: askReview, message: "Review requested successfully" },
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

export async function PUT(request) {
  const { id, review } = await request.json();
  const status = "DONE"

  try {
    // Update review in prisma.review
    const updatedReview = await prisma.review.update({
      where: {
        id: id,
      },
      data: {
        review,
        status
      },
    });

    return NextResponse.json(
      { data: updatedReview, message: "Review updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
