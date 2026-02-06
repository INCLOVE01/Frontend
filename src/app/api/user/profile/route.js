// app/api/user/home/route.js
import { AuthService } from "@/lib/auth";
import { userService } from "@/services/user-services";

import { NextResponse } from "next/server";

export async function GET() {
  const userPayload = await AuthService.getCurrentUser();
  
  if (!userPayload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Calling the service as if it were a real DB
    const data = await userService.getHomeData(userPayload.id);
    return NextResponse.json(data,{status:200});
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}