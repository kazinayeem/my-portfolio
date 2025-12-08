import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-in-production";

export interface AdminPayload {
  id: string;
  email: string;
}

export async function verifyAdmin(): Promise<AdminPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    return decoded;
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<AdminPayload> {
  const admin = await verifyAdmin();
  if (!admin) {
    throw new Error("Unauthorized");
  }
  return admin;
}
