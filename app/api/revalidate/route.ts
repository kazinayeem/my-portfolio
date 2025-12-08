import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { path, secret } = await request.json();

    // Optional: Add a secret to secure the revalidation endpoint
    if (secret && secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // Revalidate the specified path or default to home
    const pathToRevalidate = path || "/";
    revalidatePath(pathToRevalidate);

    return NextResponse.json({
      revalidated: true,
      path: pathToRevalidate,
      now: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error },
      { status: 500 }
    );
  }
}
