import { useState, useEffect, useCallback } from "react";
import { products } from "@wix/stores";
import {
  applyDiscount as applyProductDiscount,
  getMostExpensive,
} from "../utils/product-utils";

export const useProductManager = () => {
  const [product, setProduct] = useState<products.Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);

  // Fetch product
  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedProduct = await getMostExpensive();
      setProduct(fetchedProduct);
    } catch (err) {
      console.error("Failed to fetch product:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply discount and wait for new product
  const handleApplyDiscount = useCallback(
    async (productId: string, type: "percentage" | "fixed", amount: string) => {
      setIsApplying(true);

      try {
        // Apply discount
        await applyProductDiscount(productId, type, amount);

        // Check for product change with retries
        let attempts = 0;
        const maxAttempts = 10;

        const checkForChange = async () => {
          attempts++;

          // Fetch latest product
          const latestProduct = await getMostExpensive();

          if (latestProduct?._id !== productId) {
            // Product ID changed - update state
            setProduct(latestProduct);
            setIsApplying(false);
          } else if (attempts < maxAttempts) {
            // Try again after delay
            setTimeout(checkForChange, 500);
          } else {
            // Give up after max attempts
            setIsApplying(false);
          }
        };

        // Start checking
        setTimeout(checkForChange, 500);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
      }
    },
    []
  );

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    isApplying,
    refreshProduct: fetchProduct,
    applyDiscount: handleApplyDiscount,
  };
};
