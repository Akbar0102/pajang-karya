import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const reviewData = await prisma.review.findFirst({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Review fetched succesfully!", data: reviewData },
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
