import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(request, { params }) {
  const id = parseInt(params.id);

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    return NextResponse.json(
      {
        success: true,
        message: "Detail Data Posts Not Found",
        data: null,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
        success: true,
        message: "Detail Data Post",
        data: post,
    },
    {
        status: 200,
    }
  );
}

export async function PATCH(request, { params }) {
    const id = parseInt(params.id);
    const { title, content } = await request.json();
    const post = await prisma.post.update({
        where: {
            id,
        },
        data: {
            title,
            content,
            updatedAt: new Date(),
        },
    });

    return NextResponse.json(
        {
            success: true,
            message: "Update Data Post",
            data: post,
        },
        {
            status: 200,
        }
    );
}

export async function DELETE(request, { params }) {
    const id = parseInt(params.id);
    
    await prisma.post.delete({
        where: {
            id,
        },
    });

    return NextResponse.json(
        {
            success: true,
            message: "Delete Data Post",
        },
        {
            status: 200,
        }
    )
}