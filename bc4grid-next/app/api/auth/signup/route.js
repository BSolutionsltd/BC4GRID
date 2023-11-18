import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // Retrieve data
        const body = await request.json();
        const { name, email, password } = body;

        
        // Send to the database
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });

        // Return a success response with the created user
        return NextResponse.json(user, { status: 201 }); // 201 Created status code

    } catch (error) {
        console.error({ error });

        // Return an error response
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 }); // 500 Internal Server Error
    }
}
