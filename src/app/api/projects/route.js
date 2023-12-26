import { NextResponse } from "next/server";
import prisma from '@/utils/prisma';

export async function GET() {
    try {
        const allProjects = await prisma.project.findMany({
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          })
        return NextResponse.json({ data: allProjects, message: "fetch successfull" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error, message: "fetch error" }, { status: 500 })
    }

}