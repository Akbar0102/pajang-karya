import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { projectId, content } = await request.json();

    // Get user id from token
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const createComment = await prisma.comment.create({
      data: {
        content,
        projectId,
        userId,
      },
    });

    return NextResponse.json({
      data: createComment,
      message: "Project commented",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
