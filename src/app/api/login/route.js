import { AuthService } from "@/lib/auth";
import { NextResponse } from "next/server";


export async function POST(request) {
    const {email, password} = await request.json()
    console.log(email,password)

    // 1. VALIDATE USER (Dummy logic for now)
    if (email === "userTest@inclove.in" && password === "Inclove@123") {
    const userId = "user_12345";
    
    // 2. CREATE JWT
    const token = await AuthService.createToken({ userId, email });

    // 3. SET HTTP-ONLY COOKIE
    const response = NextResponse.json({ success: true, message:"success" },{status:200});
    response.cookies.set('auth-token', token, {
      httpOnly: true,    // Prevent XSS
      secure: true,      // Only HTTPS
      sameSite: 'lax',   // CSRF Protection
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  }      
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

}