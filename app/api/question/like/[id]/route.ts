import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await requireAdmin();
    if (auth.error) return auth.response;

    const q = await prisma.question.update({
      where: {
        id: id,
      },
      data: {
        likeCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ msg: "incremented likes" });
  } catch (err) {
    console.error("PATCH /question/:id failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
