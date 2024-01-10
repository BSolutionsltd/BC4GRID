// API endpoint for user login


// import prisma client
import { NextResponse } from "next/server";

export async function GET(req) {
  
  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  try {
    async function getProsumerData(userId) {
      const url = new URL(`http://localhost:5000/api/v1/smartmeter/${userId}/balance`);
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - 15 * 60 * 1000);
      
      
      url.searchParams.append("from", formatDateTime(startTime));
      url.searchParams.append("to", formatDateTime(endTime));

      console.log('url: ', url);

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
    const prosumerData = await getProsumerData(userId);    
    return prosumerData;
    
  } catch (error) {
    console.error(error);
    // Return an error response
    return NextResponse.json({ message: "Failed to fetch smartmeter balance" }, { status: 500 });
  }
}