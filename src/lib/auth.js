import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Validate JWT_SECRET exists
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set. Please add it to your .env file.');
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const AuthService = {
  // 1. Create a Token
  async createToken(payload) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d') // Long-lived for MVP convenience
      .sign(secret);
  },

  // 2. Verify a Token
  async verifyToken(token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      return payload;
    } catch (err) {
      return null;
    }
  },

  // 3. Get Current User (Used in Controllers)
  async getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    if (!token) return null;
    return await this.verifyToken(token);
  }
};