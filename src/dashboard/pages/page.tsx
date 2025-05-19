import React, { type FC } from "react";
import { dashboard } from "@wix/dashboard";
import {
  Button,
  Box,
  Card,
  Divider,
  Heading,
  Text,
  Page,
  WixDesignSystemProvider,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import * as Icons from "@wix/wix-ui-icons-common";

const Index: FC = () => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page>
        <Page.Header
          title="Discount Most Expensive Product"
          subtitle="Automatically identify and discount your highest-priced items"
          actionsBar={
            <Button
              onClick={() => {
                // Navigate to products page
                dashboard.navigate({
                  pageId: "0845ada2-467f-4cab-ba40-2f07c812343d",
                });
              }}
            >
              Go to Products
            </Button>
          }
        />
        <Page.Content>
          <Card>
            <Card.Header title="How to Use This App" />
            <Card.Divider />
            <Card.Content>
              <Box direction="vertical" gap="24px" padding="20px">
                <Box direction="vertical" gap="12px">
                  <Heading>
                    <Box align="left" verticalAlign="middle" gap="8px">
                      <span>1. View Your Top Product</span>
                    </Box>
                  </Heading>
                  <Text size="medium">
                    Navigate to the Products section in your dashboard. The
                    plugin will automatically display your highest-priced
                    product that doesn't already have a discount applied.
                  </Text>
                </Box>

                <Divider />

                <Box direction="vertical" gap="12px">
                  <Heading>
                    <Box align="left" verticalAlign="middle" gap="8px">
                      <span>2. Apply a Discount</span>
                    </Box>
                  </Heading>
                  <Text size="medium">
                    Click the "Add a discount" button to navigate to the
                    discount page. You can choose between a percentage discount
                    (e.g., 10%) or a fixed amount discount (e.g., ₪50).
                  </Text>
                </Box>

                <Divider />

                <Box direction="vertical" gap="12px">
                  <Heading>
                    <Box align="left" verticalAlign="middle" gap="8px">
                      <span>3. See the Results</span>
                    </Box>
                  </Heading>
                  <Text size="medium">
                    After applying a discount, redirect back to the Products
                    page. The plugin will update to show the next highest-priced
                    product without a discount. Check your product catalog to
                    see the discounted item.
                  </Text>
                </Box>
              </Box>
            </Card.Content>
          </Card>
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default Index;
