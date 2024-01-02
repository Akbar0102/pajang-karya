import slugify from "slugify";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { deleteFile, uploadFile } from "@/lib/uploadFile";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import string from "@/lib/string.js";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const singleProject = await prisma.project.findFirst({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Project fetched succesfully!", data: singleProject },
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

export async function PUT(req, { params }) {
  const { id } = params;

  const formData = await req.formData();
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

  try {
    const updateProject = await prisma.project.update({
      where: {
        id: id,
      },
      data: {
        name,
        slug: slugify(name, { lower: true, replacement: "-" }),
        description,
        featuredImage: featuredImage ? featuredImage.name : undefined,
        category,
        type,
        link,
        repository,
        tech: string.lowerCaseString(tech),
        userId,
      },
    });

    // Send Image ke AWS S3 jika featuredImage diubah
    if (featuredImage) {
      await uploadFile({
        Body: featuredImage,
        Key: featuredImage.name,
        ContentType: featuredImage.type,
        Dir: `projects/${id}`,
      });
    }

    return NextResponse.json(
      {
        message: "Project updated successfully",
        data: updateProject,
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

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    // Ambil detail proyek dari database
    const projectDetails = await prisma.project.findUnique({
      where: {
        id: id,
      },
    });

    if (!projectDetails) {
      return NextResponse.json({ errorMessage: 'Project not found' }, { status: 404 });
    }

    // Hapus komen yang terkait dengan proyek
    await prisma.comment.deleteMany({
      where: {
        projectId: id,
      },
    });
    
    await prisma.review.deleteMany({
      where: {
        projectId: id,
      },
    });

    // Hapus proyek dari database
    const deletedProject = await prisma.project.delete({
      where: {
        id: id,
      },
    });

    await deleteFile({
      Key: projectDetails.featuredImage,
      Dir: `projects/${id}`,
    });

    return NextResponse.json(
      {
        message: "Project deleted successfully",
        data: deletedProject,
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