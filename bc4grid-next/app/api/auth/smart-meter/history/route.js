// API endpoint for user login

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const smartMeter = {}

export async function GET(req) {
  
  const from = req.nextUrl.searchParams.get('from');
  const to = req.nextUrl.searchParams.get('to');
  const userId = req.nextUrl.searchParams.get('userId');
   
  try {

    if (!smartMeter[userId]) {      
      // console.log('fetching smart-meter SN from database');
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { smartMeterSN: true }
      });    
    if (!user) {
      return new NextResponse().json({ message: "User not found" }).status(404);
    }        
    smartMeter[userId] = user.smartMeterSN;
  }

    async function getProsumerData(smartMeterSN, from, to ) {     

      const url = new URL(`http://${process.env.COLLECTOR_API}:5000/api/v1/smartmeter/${smartMeterSN}`);
      
      // add from timestamp to url
      url.searchParams.append("from", from);
      

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();   
      return NextResponse.json(data, { status: 200 });
    }
    
    const prosumerData = await getProsumerData(smartMeter[userId], from, to);    
    return prosumerData;
    
  } catch (error) {
    //console.error(error);
    // Return an error response
    return NextResponse.json({ message: "Failed to fetch history data" }, { status: 500 });
  }
}