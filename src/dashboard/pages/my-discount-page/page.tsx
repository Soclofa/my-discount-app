import React, { type FC } from "react";
import type { plugins } from "@wix/stores/dashboard";
import { Page, Loader, Box } from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import DiscountForm from "../../components/DiscountForm";
import ProductCard from "../../components/ProductDisplay";
import NoDiscountableProducts from "../../components/NoDiscountableProducts";
import { useProductManager } from "../../hooks/useProductManager";

type Props = plugins.Products.ProductsBannerParams;

const DiscountPage: FC<Props> = () => {
  const { product, loading, isApplying, applyDiscount } = useProductManager();

  const handleApplyDiscount = (
    amount: string,
    type: "percentage" | "fixed"
  ) => {
    if (product?._id) {
      applyDiscount(product._id, type, amount);
    }
  };

  return (
    <Page minWidth={864} maxWidth={1248}>
      <Page.Header
        title="Discount Product"
        subtitle="Add a discount to your products"
      />

      <Page.Content>
        {loading ? (
          <Loader
            size="medium"
            status="loading"
            text="Loading product details..."
          />
        ) : !product ? (
          <NoDiscountableProducts showButton={true} />
        ) : (
          <ProductCard
            product={product}
            title="Apply Discount"
            subtitle="Add a discount to your most expensive product"
            hideDiscountAction={true}
          >
            <DiscountForm
              onApplyDiscount={handleApplyDiscount}
              productPrice={product?.priceData?.price}
            />
            {isApplying && (
              <Box marginTop="SP2">
                <Loader size="tiny" text="Applying discount..." />
              </Box>
            )}
          </ProductCard>
        )}
      </Page.Content>
    </Page>
  );
};

export default DiscountPage;
