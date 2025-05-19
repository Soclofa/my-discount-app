import React, { FC, ChangeEvent } from "react";
import { Add } from "@wix/wix-ui-icons-common";
import {
  Box,
  Input,
  Radio,
  Button,
  Divider,
  Text,
  WixDesignSystemProvider,
} from "@wix/design-system";
import { useDiscountForm } from "../hooks/useDiscountForm";

interface DiscountFormProps {
  onApplyDiscount?: (amount: string, type: "percentage" | "fixed") => void;
  productPrice?: number | null;
}

const DiscountForm: FC<DiscountFormProps> = ({
  onApplyDiscount,
  productPrice,
}) => {
  const { amount, setAmount, type, setType, handleSubmit, error } =
    useDiscountForm(productPrice, onApplyDiscount);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Box direction="vertical" gap="12px">
        <Divider skin="dark" />

        <Box direction="horizontal" align="left" gap="SP4">
          <Radio
            checked={type === "percentage"}
            value="percentage"
            onChange={() => setType("percentage")}
            label="Percentage"
          />

          <Radio
            checked={type === "fixed"}
            value="fixed"
            onChange={() => setType("fixed")}
            label="Fixed"
          />

          <Input
            size="small"
            value={amount}
            onChange={handleAmountChange}
            placeholder={type === "percentage" ? "Enter %" : "Enter amount"}
            prefix={type === "fixed" ? <Input.Affix>₪</Input.Affix> : undefined}
            suffix={
              type === "percentage" ? <Input.Affix>%</Input.Affix> : undefined
            }
          />
        </Box>

        {error && (
          <Box>
            <Text size="small" skin="error">
              {error}
            </Text>
          </Box>
        )}

        <Box align="left">
          <Button size="small" prefixIcon={<Add />} onClick={handleSubmit}>
            Add discount
          </Button>
        </Box>
      </Box>
    </WixDesignSystemProvider>
  );
};

export default DiscountForm;
