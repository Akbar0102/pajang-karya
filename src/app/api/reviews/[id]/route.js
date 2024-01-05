import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const projectReview = await prisma.review.findFirst({
      where: {
        projectId: id,
      },
      include: {
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    let status = false;
    let obj = null
    if (projectReview) {
      status = true;
      obj = projectReview
    }

    return NextResponse.json(
      { message: "Project fetched succesfully!", data: status, obj },
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
