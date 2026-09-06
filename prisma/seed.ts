import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type EmiPlanSeed = {
  monthlyAmount: number;
  tenureMonths: number;
  interestRate: number;
  cashbackAmount: number | null;
};

type VariantSeed = {
  type: "storage" | "color";
  label: string;
  priceDelta: number;
};

type ProductSeed = {
  slug: string;
  name: string;
  category: string;
  mrp: number;
  price: number;
  imageUrl: string;
  variants: VariantSeed[];
  emiPlans: EmiPlanSeed[];
};

const products: ProductSeed[] = [
  {
    slug: "iphone-17-pro",
    name: "iPhone 17 Pro",
    category: "Smartphones",
    mrp: 149900,
    price: 134900,
    imageUrl: "/products/iphone-17-pro.svg",
    variants: [
      { type: "storage", label: "256GB", priceDelta: 0 },
      { type: "storage", label: "512GB", priceDelta: 20000 },
      { type: "storage", label: "1TB", priceDelta: 45000 },
      { type: "color", label: "Natural Titanium", priceDelta: 0 },
      { type: "color", label: "Deep Blue", priceDelta: 0 },
      { type: "color", label: "Cosmic Orange", priceDelta: 0 },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, monthlyAmount: 44967, cashbackAmount: null },
      { tenureMonths: 6, interestRate: 0, monthlyAmount: 22483, cashbackAmount: null },
      { tenureMonths: 9, interestRate: 0, monthlyAmount: 14989, cashbackAmount: 1000 },
      { tenureMonths: 12, interestRate: 0, monthlyAmount: 11242, cashbackAmount: 2000 },
      { tenureMonths: 18, interestRate: 10.5, monthlyAmount: 8133, cashbackAmount: null },
      { tenureMonths: 24, interestRate: 10.5, monthlyAmount: 6256, cashbackAmount: 3000 },
    ],
  },
  {
    slug: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    category: "Smartphones",
    mrp: 139999,
    price: 129999,
    imageUrl: "/products/galaxy-s24-ultra.svg",
    variants: [
      { type: "storage", label: "256GB", priceDelta: 0 },
      { type: "storage", label: "512GB", priceDelta: 15000 },
      { type: "storage", label: "1TB", priceDelta: 35000 },
      { type: "color", label: "Titanium Black", priceDelta: 0 },
      { type: "color", label: "Titanium Gray", priceDelta: 0 },
      { type: "color", label: "Titanium Violet", priceDelta: 0 },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, monthlyAmount: 43333, cashbackAmount: null },
      { tenureMonths: 6, interestRate: 0, monthlyAmount: 21666, cashbackAmount: null },
      { tenureMonths: 9, interestRate: 0, monthlyAmount: 14444, cashbackAmount: 1000 },
      { tenureMonths: 12, interestRate: 0, monthlyAmount: 10833, cashbackAmount: 1500 },
      { tenureMonths: 18, interestRate: 10.5, monthlyAmount: 7837, cashbackAmount: null },
      { tenureMonths: 24, interestRate: 10.5, monthlyAmount: 6029, cashbackAmount: 2500 },
      { tenureMonths: 36, interestRate: 10.5, monthlyAmount: 4225, cashbackAmount: 4000 },
    ],
  },
  {
    slug: "macbook-air",
    name: "MacBook Air",
    category: "Laptops",
    mrp: 124900,
    price: 114900,
    imageUrl: "/products/macbook-air.svg",
    variants: [
      { type: "storage", label: "256GB SSD", priceDelta: 0 },
      { type: "storage", label: "512GB SSD", priceDelta: 15000 },
      { type: "storage", label: "1TB SSD", priceDelta: 35000 },
      { type: "color", label: "Midnight", priceDelta: 0 },
      { type: "color", label: "Starlight", priceDelta: 0 },
      { type: "color", label: "Space Gray", priceDelta: 0 },
    ],
    emiPlans: [
      { tenureMonths: 3, interestRate: 0, monthlyAmount: 38300, cashbackAmount: null },
      { tenureMonths: 6, interestRate: 0, monthlyAmount: 19150, cashbackAmount: null },
      { tenureMonths: 9, interestRate: 0, monthlyAmount: 12767, cashbackAmount: 1000 },
      { tenureMonths: 12, interestRate: 0, monthlyAmount: 9575, cashbackAmount: 2000 },
      { tenureMonths: 18, interestRate: 10.5, monthlyAmount: 6927, cashbackAmount: null },
      { tenureMonths: 24, interestRate: 10.5, monthlyAmount: 5329, cashbackAmount: 3000 },
      { tenureMonths: 36, interestRate: 10.5, monthlyAmount: 3735, cashbackAmount: 5000 },
    ],
  },
];

async function main() {
  for (const p of products) {
    await prisma.product.deleteMany({ where: { slug: p.slug } });
    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        category: p.category,
        mrp: p.mrp,
        price: p.price,
        imageUrl: p.imageUrl,
        variants: { create: p.variants },
        emiPlans: { create: p.emiPlans },
      },
    });
    console.log(`Seeded ${p.name}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
