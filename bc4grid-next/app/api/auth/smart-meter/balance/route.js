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
    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse().json({ message: "User not found" }).status(404);
    }

    // Fetch the latest energy reading for the user's smart meter
    const latestEnergyReading = await prisma.energyReading.findFirst({
      where: { smartMeterSN: user.smartMeterSN },
      orderBy: { timestamp: 'desc' },
    });

    
    if (!latestEnergyReading) {
      return new NextResponse().json({ message: "No energy readings found for user" }).status(404);
    }

    // Prepare the payload
    const payload = {
      'user': userId,
      'timestamp': latestEnergyReading.timestamp,
      'accumulatedEnergy': latestEnergyReading.accumulatedEnergy,
    };

    //console.log('payload: ', payload);
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

  if (!userId || accumulatedEnergy === undefined) {
    return NextResponse.json({ message: "Invalid inputs" }, {status : 400});
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, {status : 404});
    }

   const energyReading = await prisma.energyReading.create({
      data: {
        smartMeterSN: user.smartMeterSN,
        accumulatedEnergy,
      },
    });

    console.log('smartMeterSN: ', user.smartMeterSN);
    console.log('accumulatedEnergy: ', accumulatedEnergy);

    return NextResponse.json({ message: "Energy reading successfully created" }, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update energy" }, {status : 500});
  }
}