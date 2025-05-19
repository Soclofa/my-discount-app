import { products } from "@wix/stores";

export const getMostExpensive = async (): Promise<products.Product | null> => {
  try {
    const { items } = await products.queryProducts().descending("price").find();

    const nonDiscountedProducts = items.filter((product) => {
      return (
        product.discount?.type === "NONE" ||
        product.discount?.type === "UNDEFINED"
      );
    });

    return nonDiscountedProducts[0] || null;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const applyDiscount = async (
  productId: string,
  type: "percentage" | "fixed",
  value: string
): Promise<products.Product | undefined> => {
  try {
    const numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
      throw new Error("Invalid discount value");
    }

    const discountType =
      type === "percentage"
        ? products.DiscountType.PERCENT
        : products.DiscountType.AMOUNT;

    const response = await products.updateProduct(productId, {
      discount: {
        type: discountType,
        value: numericValue,
      },
    });

    const updatedProduct = response.product;

    console.log("Product updated successfully:", updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
