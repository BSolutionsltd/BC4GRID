// API endpoint for user login

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req) {    
  const smartMeterSN = req.nextUrl.searchParams.get('smartMeterSN');   
      
    if (!smartMeterSN) {
      return NextResponse.json({ message: "Smart meter not found" }, {status : 404});
    }        
         
  
    // return  tokenization time as NextResponse
    return getTokenizationTime(smartMeterSN);
  }


async function getTokenizationTime(smartMeterSN) {    
   
    // Fetch the latest energy reading for the user's smart meter
    const latestTokenization = await prisma.energyReading.findFirst({
        where: { smartMeterSN: smartMeterSN },
        orderBy: { timestamp: 'desc' },
   });
   
   if (!latestTokenization) {
    //console.log('Something went wrong. No tokenization time found.');
     return NextResponse.json({ message: "No tokenization time" }, {status: 404});
   }   
   
   // Prepare the payload
   const payload = {    
     'timestamp': latestTokenization.timestamp        
   };

   //console.log('Timer payload: ', payload);
   // Return the JSON object
   return NextResponse.json(payload, {status : 200}); // Use 200 for available resources
}