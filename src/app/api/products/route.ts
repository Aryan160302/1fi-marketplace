import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ProductListItem } from "@/lib/types";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        slug: true,
        name: true,
        imageUrl: true,
        price: true,
      },
    });

    const payload: ProductListItem[] = products;
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
