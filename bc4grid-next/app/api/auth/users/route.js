
// API endpoint for user login

// import prisma client
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req) {
  
  return await getUsers(req);
}

export async function PUT(req) {
    return await approveUsers(req);
}
export async function DELETE(req)
{
  return await deleteUser(req);
}

async function getUsers(req) {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();

    // Return the users as JSON
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    // Return an error response
    return NextResponse.json({ message: "Failed to fetch user data" }, { status: 500 });
  }
}



async function approveUsers(req) {
  const body = await req.json();


  //console.log('body: ', body);
  const { userId, isVerified } = body;

  try {
    // Update the user's isVerified field to true
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });
    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    // Return an error response
    return NextResponse.json({ message: "Failed to approve user" }, { status: 500 });
  }
}

async function deleteUser(req) {
  const body = await req.json();
  const { userId } = body;

  try {
    // Delete the user from the database
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    return NextResponse.json({ deletedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
  }
}