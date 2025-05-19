import React, { FC } from "react";
import {
  Card,
  Box,
  Text,
  Button,
  WixDesignSystemProvider,
} from "@wix/design-system";
import { InfoCircle, ArrowLeft } from "@wix/wix-ui-icons-common";
import "@wix/design-system/styles.global.css";
import { ROUTES } from "../utils/routes-utils";

interface NoDiscountableProductsProps {
  showButton: boolean;
}

const NoDiscountableProducts: FC<NoDiscountableProductsProps> = ({
  showButton,
}) => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Card>
        <Card.Header
          title="No Discountable Products"
          suffix={
            showButton ? (
              <Button onClick={ROUTES.navigateToProductsPlugin}>
                <ArrowLeft />
                Go Back to Products Page
              </Button>
            ) : null
          }
        />
        <Card.Divider />
        <Card.Content>
          <Box align="center" direction="vertical" padding="20px">
            <InfoCircle />
            <Text weight="bold" size="medium" secondary>
              There are no products to discount.
            </Text>
          </Box>
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default NoDiscountableProducts;
