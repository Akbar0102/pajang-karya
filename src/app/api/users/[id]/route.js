import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const singleUser = await prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "User fetched succesfully!", data: singleUser },
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
