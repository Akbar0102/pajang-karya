import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { uploadFile } from "@/lib/uploadFile";

export async function GET(request) {
  let challenges = null;

  try {
    challenges = await prisma.challenge.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({
      data: challenges,
      message: "All challenge fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const featuredImage = formData.get("featuredImage");

  let challengeId = "";

  // Save project ke database
  try {
    const createChallenge = await prisma.challenge.create({
      data: {
        name,
        description,
        featuredImage: featuredImage.name,
      },
    });

    challengeId = createChallenge.id;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }

  // Send Image ke AWS S3
  try {
    //   Upload featured image file
    await uploadFile({
      Body: featuredImage,
      Key: featuredImage.name,
      ContentType: featuredImage.type,
      Dir: `challenges/${challengeId}`,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: "Challenge created successfully",
    },
    { status: 201 }
  );
}
