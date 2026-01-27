// app/api/waitlist/route.js
import { WaitlistService } from '@/services/waitlist';
import { z } from 'zod';
import { NextResponse } from 'next/server';

// Validate the input to ensure the waitlist isn't spammed with junk
const WaitlistSchema = z.object({
  fullName: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  about: z.string().max(500).optional(),
});

export async function POST(req) {
  try {
    const data = await req.json();

    //1. safe parsing data
    const validation = WaitlistSchema.safeParse(data);

    // 2. Check if validation failed
    if (!validation.success) {
      // Return the specific Zod error messages to the frontend
      return NextResponse.json({ 
        error: "Validation failed", 
        details: validation.error.format() 
      }, { status: 400 });
    }

    const result = await WaitlistService.addToWaitlist(validation.data);

    if (result.result === 'success') {
      return NextResponse.json({ message: "Added to waitlist" });
    } else {
      return NextResponse.json({ error: "Could not join waitlist" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Could not join waitlist" }, { status: 400 });
  }
}