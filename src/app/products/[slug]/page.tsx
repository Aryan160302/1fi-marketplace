import { ProductDetailScreen } from "@/components/product/ProductDetailScreen";

export default async function ProductPage(
  props: PageProps<"/products/[slug]">
) {
  const { slug } = await props.params;
  return <ProductDetailScreen slug={slug} />;
}
