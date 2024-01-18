import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  return await getAccumulatedData(req);
}

export async function POST(req) {
  return await updateAccumulatedEnergy(req);
}

async function getAccumulatedData(req) {   
  let userId = req.nextUrl.searchParams.get('userId');    
  
  try {
    // Fetch the user's accumulated energy from the database
    const data = await prisma.user.findUnique({
      where: { id: userId },
      select: { accumulatedEnergy: true }
    });   

    if (!data) {
      return new NextResponse().json({ message: "User not found" }).status(404);
    }

    // Generate the current timestamp
    const timestamp = new Date().toISOString();
    const payload = {
      'user': userId,
      'timestamp': timestamp,
      'accumulatedEnergy': data.accumulatedEnergy
    };

    console.log('payload: ', payload);
    // Return the JSON object
    return NextResponse.json(payload, {status : 200}); // Use 200 for available resources
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch profile data" }, {status : 500});
  }
}

async function updateAccumulatedEnergy(req) {
  const body = await req.json();
  const { userId, accumulatedEnergy } = body;
 
  console.log('userId: ', userId);
  console.log('accumulatedEnergy: ', accumulatedEnergy);

  if (!userId || accumulatedEnergy === undefined) {
    return NextResponse.json({ message: "Invalid inputs" }, {status : 400});
  }

  try {
    const data = await prisma.user.update({
      where: { id: userId },
      data: { accumulatedEnergy: accumulatedEnergy }
    });

    return NextResponse.json(data, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update energy" }, {status : 500});
  }
}