export { default } from "next-auth/middleware"

export const config = { 
matcher: [
    "/auth/profile",
    "/buy/:path*",
    "/sell/:path*",
    "/dashboard/:path*",
    //"/web3/:path*",
] }