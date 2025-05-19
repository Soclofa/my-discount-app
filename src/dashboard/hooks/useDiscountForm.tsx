// Simple useDiscountForm.tsx with toast tracking
import { useState, useCallback } from "react";
import { validateDiscountInput } from "../utils/validation-utils";

export const useDiscountForm = (
  productPrice?: number | null,
  onValidDiscount?: (amount: string, type: "percentage" | "fixed") => void
) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"percentage" | "fixed">("percentage");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(() => {
    const errorMessage = validateDiscountInput(amount, type, productPrice);

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError("");

    onValidDiscount?.(amount, type);

    setAmount("");
    setType("percentage");
  }, [amount, type, productPrice, onValidDiscount]);

  return {
    amount,
    setAmount,
    type,
    setType,
    handleSubmit,
    error,
  };
};
