import hashPassword from "@/lib/hash";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from 'next/server';

export async function POST(req) {
  return await createUserHandler(req);
}

async function createUserHandler(req) {
  // Ensure that the request body is parsed as JSON
  const body = await req.json(); 

  const { name, email, password } = body;

  // Check if the required fields are provided
  if (!name || !email || !password) {
    return NextResponse.json({ errors: ["Missing required fields"] }, { status: 400 });
  }

  // Check password length
  if (password.length < 6) {
    return NextResponse.json({ errors: ["Password length should be more than 6 characters"] }, { status: 400 });
  }

  try {
    const hashedPassword = hashPassword(password);

       
    const user = await prisma.user.create({ data : {name, email, password: hashedPassword}  });
    return NextResponse.json({ user }, { status: 201 }); // Use 201 for created resources
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json({ errors: ["Email already exists"] }, { status: 400 });
      }
    }
    // Log the error for debugging purposes
    console.error(e);
    return NextResponse.json({ errors: ["Something went wrong"] }, { status: 500 }); // Use 500 for server errors
  }
}
