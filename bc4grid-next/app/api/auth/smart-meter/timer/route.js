// API endpoint for user login

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const smartMeter = {}

export async function GET(req) {    
  const userId = req.nextUrl.searchParams.get('userId');   
  try {
    if (!smartMeter[userId]) {      
      console.log('fetching smart-meter SN from database');
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { smartMeterSN: true }
      });    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, {status : 404});
    }        
    smartMeter[userId] = user.smartMeterSN;
  }    
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to fetch profile data" }, {status : 500});
    }
    
    // return  tokenization time as NextResponse
    return getTokenizationTime(smartMeter[userId]);
  }


async function getTokenizationTime(smartMeterSN) {    
   
    // Fetch the latest energy reading for the user's smart meter
    const latestTokenization = await prisma.energyReading.findFirst({
        where: { smartMeterSN: smartMeterSN },
        orderBy: { timestamp: 'desc' },
   });
   
   if (!latestTokenization) {
    console.log('Something went wrong. No tokenization time found.');
     return NextResponse.json({ message: "No tokenization time" }, {status: 404});
   }   
   
   // Prepare the payload
   const payload = {    
     'timestamp': latestTokenization.timestamp        
   };

   console.log('Timer payload: ', payload);
   // Return the JSON object
   return NextResponse.json(payload, {status : 200}); // Use 200 for available resources
}