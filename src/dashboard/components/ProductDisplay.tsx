import React, { FC, ReactNode } from "react";
import { products } from "@wix/stores";
import {
  Card,
  Box,
  Image,
  MarketingLayout,
  Button,
  WixDesignSystemProvider,
} from "@wix/design-system";
import { Add, ArrowLeft } from "@wix/wix-ui-icons-common";
import "@wix/design-system/styles.global.css";
import { ROUTES } from "../utils/routes-utils";

interface ProductCardProps {
  product: products.Product | null;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  hideDiscountAction?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  title = "Your Most Expensive Product",
  subtitle,
  children,
  hideDiscountAction = false,
}) => {
  const imageUrl = product?.media?.mainMedia?.image?.url || "";
  const productName = product?.name || "Product Name";
  const productPrice = product?.priceData?.formatted?.price || "No Price";

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Card>
        <Card.Header
          title={title}
          subtitle={subtitle}
          suffix={
            hideDiscountAction ? (
              <Button
                prefixIcon={<ArrowLeft />}
                size="small"
                onClick={ROUTES.navigateToProductsPlugin}
              >
                Go To Products Plugin
              </Button>
            ) : null
          }
        />
        <Card.Divider />
        <Card.Content>
          <Box direction="vertical" gap="12px">
            <MarketingLayout
              size="medium"
              inverted
              title={productName}
              description={productPrice || "Price not available"}
              actions={
                !hideDiscountAction ? (
                  <Button
                    prefixIcon={<Add />}
                    size="small"
                    onClick={ROUTES.navigateToDiscountPage}
                  >
                    Add a discount
                  </Button>
                ) : null
              }
              image={
                imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={productName}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Image
                    width="96px"
                    height="96px"
                    title="No Image Available"
                  />
                )
              }
            />
            {children}
          </Box>
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default ProductCard;
