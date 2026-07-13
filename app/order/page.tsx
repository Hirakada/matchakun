import OrderPage from "@/components/order/OrderPage";

interface PageProps {
  searchParams: Promise<{
    recommendation?: string;
  }>;
}

export default async function Page({
  searchParams,
}: PageProps) {
  const { recommendation } =
    await searchParams;

  return (
    <OrderPage
      recommendationId={recommendation}
    />
  );
}