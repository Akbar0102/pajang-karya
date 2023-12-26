import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const singleComment = await prisma.comment.findFirst({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Comment fetched succesfully!", data: singleComment },
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

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.comment.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Comment deleted succesfully!" },
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
