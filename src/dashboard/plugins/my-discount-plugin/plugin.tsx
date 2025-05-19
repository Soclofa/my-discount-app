import React, { type FC } from "react";
import type { plugins } from "@wix/stores/dashboard";
import { Loader, Card } from "@wix/design-system";
import { useProductManager } from "../../hooks/useProductManager";
import ProductCard from "../../components/ProductDisplay";
import NoDiscountableProducts from "../../components/NoDiscountableProducts";

type Props = plugins.Products.ProductsBannerParams;

const Plugin: FC<Props> = () => {
  const { product, loading } = useProductManager();

  if (loading) {
    return (
      <Card>
        <Card.Header title="Your Most Expensive Product" />
        <Card.Divider />
        <Card.Content>
          <Loader
            size="small"
            status="loading"
            text="Loading product details..."
          />
        </Card.Content>
      </Card>
    );
  }

  if (!product) {
    return <NoDiscountableProducts showButton={false} />;
  }

  return (
    <ProductCard
      product={product}
      title="Your Most Expensive Product"
      subtitle="No discount applied yet"
    />
  );
};

export default Plugin;
