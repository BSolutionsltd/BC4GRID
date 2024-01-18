
// API endpoint for user login

// import prisma client
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req) {


  async function getAccumulatedData(req) { 
    let id = req.nextUrl.searchParams.get('userId');    
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
  
  return await getAccumulatedData(req);
}


