import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const smartMeter = {}

export async function GET(req) {
  
  const userId = req.nextUrl.searchParams.get('userId');
 
  try {

    if (!smartMeter[userId]) {            
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { smartMeterSN: true }
      });    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, {status : 404});
    }       
    
    smartMeter[userId] = user.smartMeterSN;
  }
   
    async function getSmartMeterInfo(smartMeterSN) {     

      // Fetch the smart meter info from the database
      const url = new URL(`http://${process.env.COLLECTOR_API}:5000/api/v1/smartmeter/${smartMeterSN}`);
           
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
      return NextResponse.json(data[0].smartmeter, { status: 200 });
    }
    
    const smartMeterInfo = await getSmartMeterInfo(smartMeter[userId]);    
    return smartMeterInfo;
    
  } catch (error) {
    //console.error(error);
    // Return an error response
    console.log('Failed to fetch smart-meter info');
    return NextResponse.json({ message: "Failed to fetch information data" }, { status: 500 });
  }
}