import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

export const authOptions = {
 
  providers: [
    CredentialsProvider({     
      name: "credentials",      
      async authorize(credentials, req) {            

        let userCredentials = {
          email : credentials.email,
          password : credentials.password
        }
              
        const response = await fetch(          
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(userCredentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const user = await response.json();
        
        console.log('User: ', user);


        if (response.ok && user) {        
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
    encryption: true,
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
  },

  callbacks: {
    async session(session, user, token) {
      if (user !== null) {
        
        session.user = user;
      }
      return await session;
    },

    async jwt({ token, user }) {
       return await token;
    },
  },
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };