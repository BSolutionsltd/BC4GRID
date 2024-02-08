
// API endpoint for user login

// import prisma client
import prisma from "@/lib/prisma";
import hashPassword from "@/lib/hash";
import { NextResponse } from "next/server";


export async function POST(req) {
  
  return await loginUserHandler(req);
}

async function loginUserHandler(req) {  

  const body = await req.json(); 
  //console.log('body: ', body);
  const { email, password } = body;  

  if (!email || !password) {
    return NextResponse.json({ message: "invalid inputs" }, {status: 400});
    
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        image: true,
        isAdmin: true,
        isVerified: true, 
        smartMeterSN: false
      },
    });
    if (user && user.password === hashPassword(password) && user.isVerified) {      
      // exclude password from json response
      return NextResponse.json(exclude(user, ["password"]),{status: 200});
      
    } else {
      return NextResponse.json({ message: "invalid credentials" }, {status: 401});
      
    }
  } catch (e) {
    throw new Error(e);
  }
}
// Function to exclude user password returned from prisma
function exclude(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}