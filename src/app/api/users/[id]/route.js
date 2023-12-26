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
            id: true,
            name: true,
            description: true,
            featuredImage: true,
            category: true,
            link: true,
            repository: true,
            tech: true,
            createdAt: true,
          },
        },
        userChallenge: {
          select: {
            status: true,
            challenge: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    const numberOfProjects = singleUser.project.length;
    const numberOfChallenges = singleUser.userChallenge.length;

    return NextResponse.json(
      {
        message: "User fetched succesfully!",
        data: {
          ...singleUser,
          countProject: numberOfProjects,
          countChallenge: numberOfChallenges,
        },
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
