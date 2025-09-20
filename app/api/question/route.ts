import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Category } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category")?.toUpperCase() as Category | null;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    const questions = await prisma.question.findMany({
      // where: category
      //   ? {
      //       category: {
      //         has: category, // ✅ match one enum value in the array
      //       },
      //     }
      //   : {},
      skip,
      take: limit,
      // orderBy: { createdAt: "desc" }, // optional: keep results consistent
    });

    return NextResponse.json({ questions });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.response;
    const formData = await req.formData();

    const description = formData.get("description") as string;
    const options = formData.getAll("options[]") as string[];
    const correctOption = formData.get("correctOption") as string;
    const category = formData.get("category") as string;

    if (!description || !options || !correctOption || !category) {
      return NextResponse.json({ error: "invalid data" }, { status: 403 });
    }

    const question = await prisma.question.create({
      data: {
        description: description,
        category: [category.toUpperCase() as unknown as Category],
        correctOption: correctOption,
        options: options,
      },
    });

    return NextResponse.json({ question });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "internal server error" });
  }
}
