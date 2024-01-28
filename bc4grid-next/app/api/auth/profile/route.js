
// API endpoint for user login

// import prisma client
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req) {  
  return await getProfile(req);
}

export async function PUT(req) {  
  return await updateProfile(req);
}


async function getProfile(req) { 
  let id = req.nextUrl.searchParams.get('id');  
  const profile = await prisma.user.findUnique({
    where : {id}
  })
 

  try {
  return NextResponse.json({ profile }, { status: 200 }); // Use 200 for available resources
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch profile data" }, {status: 500});
  }
  
}

async function updateProfile(req) {
  // Parse the request body
  const body = await req.json(); 
  const { id, name, email, password, smartMeterSN, image } = body;

  // Update the user in the database
  const updatedProfile = await prisma.user.update({
    where: { id },
    data: { name, email, password, smartMeterSN, image },
  });

  try {
    return NextResponse.json({ updatedProfile }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update profile data" }, {status: 500});
  }
}