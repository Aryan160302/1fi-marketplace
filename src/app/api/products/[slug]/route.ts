import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ProductDetail } from "@/lib/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: true,
        emiPlans: { orderBy: { tenureMonths: "asc" } },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const payload: ProductDetail = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      mrp: product.mrp,
      price: product.price,
      imageUrl: product.imageUrl,
      variants: product.variants.map((v) => ({
        id: v.id,
        type: v.type as ProductDetail["variants"][number]["type"],
        label: v.label,
        priceDelta: v.priceDelta,
      })),
      emiPlans: product.emiPlans.map((p) => ({
        id: p.id,
        monthlyAmount: p.monthlyAmount,
        tenureMonths: p.tenureMonths,
        interestRate: p.interestRate,
        cashbackAmount: p.cashbackAmount,
      })),
    };

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { error: "Failed to load product" },
      { status: 500 }
    );
  }
}
