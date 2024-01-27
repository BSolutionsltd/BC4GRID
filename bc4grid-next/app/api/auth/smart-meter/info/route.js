// API endpoint for user login

// import prisma client
import { NextResponse } from "next/server";

export async function GET(req) {  
  try {
    async function getMeterInfo(userId) {
      // Dummy response
      

      const dummyResponse = { name: 'Smart meter', description: 'This is a smart meter', SN: 'HG6789DS' };
      return dummyResponse;
    }
    
    const userId = 1;
    const meterInfo = await getMeterInfo(userId);
    return NextResponse.json(meterInfo, { status: 200 });
    
  } catch (error) {
    console.error(error);
    // Return an error response
    return NextResponse.json({ message: "Failed to fetch smartmeter balance" }, { status: 500 });
  }
}