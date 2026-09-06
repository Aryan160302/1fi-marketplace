export type ProductListItem = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  price: number;
};

export type VariantType = "storage" | "color";

export type Variant = {
  id: string;
  type: VariantType;
  label: string;
  priceDelta: number;
};

export type EmiPlan = {
  id: string;
  monthlyAmount: number;
  tenureMonths: number;
  interestRate: number;
  cashbackAmount: number | null;
};

export type ProductDetail = {
  id: string;
  slug: string;
  name: string;
  category: string;
  mrp: number;
  price: number;
  imageUrl: string;
  variants: Variant[];
  emiPlans: EmiPlan[];
};
