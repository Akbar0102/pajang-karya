import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { uploadFile } from "@/lib/uploadFile";
import slugify from "slugify";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import string from "@/lib/string.js";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");
  const query = searchParams.get("q");

  let projects = null;

  try {
    if (query) {
      projects = await prisma.project.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      });
      return NextResponse.json({
        data: projects,
        message: "All projects fetched successfully",
      });
    }

    if (slug) {
      const projects = await prisma.project.findUnique({
        where: {
          slug,
        },
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      });

      return NextResponse.json({
        data: projects,
        message: "Projects fetched successfully",
      });
    }

    projects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return NextResponse.json({
      data: projects,
      message: "All projects fetched successfully",
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
  const category = formData.get("category");
  const type = formData.get("type");
  const link = formData.get("link");
  const repository = formData.get("repository");
  const tech = formData.get("tech");

  // Get user id from token
  const cookieStore = cookies();
  const token = cookieStore.get("token").value;
  const decoded = verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  let projectId = "";

  // Save project ke database
  try {
    const createProject = await prisma.project.create({
      data: {
        name,
        slug: slugify(name, { lower: true, replacement: "-" }),
        description,
        featuredImage: featuredImage.name,
        category,
        type,
        link,
        repository,
        tech: string.lowerCaseString(tech),
        userId,
      },
    });

    projectId = createProject.id;
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
      Dir: `projects/${projectId}`,
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
      message: "Project created successfully",
    },
    { status: 201 }
  );
}

export async function PUT(request){}

export async function DELETE(request){}