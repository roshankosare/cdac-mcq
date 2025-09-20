import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


// adjust path as needed

export async function requireAdmin() {
  const session = await getServerSession();

  if (!session) {
    return {
      error: true,
      response: NextResponse.json({ error: "unauthorized" }, { status: 400 }),
    };
  }

  return { error: false };
}