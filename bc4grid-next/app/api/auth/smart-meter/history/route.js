// API endpoint for user login

import { NextResponse } from "next/server";
import formatDateTime from "@/lib/timeFormat";

export async function GET(req) {
  
  const from = req.nextUrl.searchParams.get('from');
  const to = req.nextUrl.searchParams.get('to');
     
  try {
    async function getProsumerData(userId, from, to ) {
      const url = new URL(`http://localhost:5000/api/v1/smartmeter/${userId}/balance`);
      
      url.searchParams.append("from", from);
      url.searchParams.append("to", to);

      console.log('url on server: ', url);

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

      console.log('data: ', data);

      return NextResponse.json(data[0], { status: 200 });
    }
    const userId = 1;
    const prosumerData = await getProsumerData(userId, from, to);    
    return prosumerData;
    
  } catch (error) {
    //console.error(error);
    // Return an error response
    return NextResponse.json({ message: "Failed to fetch history data" }, { status: 500 });
  }
}