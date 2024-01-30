import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import PostDTO from "../DTO/PostsDTO";
import ResponseDTO from "../DTO/ResponseDTO";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    const postsDTO = posts.map((post) => new PostDTO(post.id, post.title, post.content, post.createdAt, post.updatedAt));
    const responseDto = new ResponseDTO(true, "List Data Posts", postsDTO);
  
    return NextResponse.json(
      responseDto,
      { status: 200 }
    );
  } catch (error) {
    const responseDto = new ResponseDTO(false, "Failed to fetch posts", []);
    
    return NextResponse.json(
      responseDto,
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const { title, content } = await request.json();
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
      },
    });
    const responseDto = new ResponseDTO(true, "Create Data Posts", post);

    return NextResponse.json(
      responseDto,
      { status: 201 }
    );
  } catch (error) {
    const responseDto = new ResponseDTO(false, "Failed to create posts", null);
    
    return NextResponse.json(
      responseDto,
      { status: 500 }
    )
  }
}