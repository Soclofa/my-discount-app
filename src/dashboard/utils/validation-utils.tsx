// src/utils/validationUtils.ts

/**
 * Validates discount input and returns error message if invalid
 * @returns Error message or null if valid
 */
export const validateDiscountInput = (
  amount: string,
  type: "percentage" | "fixed",
  productPrice?: number | null
): string | null => {
  // Check empty input
  if (!amount.trim()) {
    return "Please enter a discount amount";
  }

  const numericAmount = parseFloat(amount);

  // Check if it's a valid number
  if (isNaN(numericAmount)) {
    return "Please enter a valid number";
  }

  // Check positive value
  if (numericAmount <= 0) {
    return "Discount must be greater than zero";
  }

  // Check percentage limit
  if (type === "percentage" && numericAmount > 100) {
    return "Percentage discount cannot exceed 100%";
  }

  // Check price limit for fixed discounts
  if (
    type === "fixed" &&
    productPrice != null &&
    numericAmount > productPrice
  ) {
    return "Discount cannot be greater than the product price";
  }

  // All validation passed
  return null;
};
