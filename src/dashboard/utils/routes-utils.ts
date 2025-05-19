import { dashboard } from "@wix/dashboard";
export const ROUTES = {
  // Plugin pages
  PRODUCTS_PLUGIN: "0845ada2-467f-4cab-ba40-2f07c812343d",
  DISCOUNT_PAGE: "825aaf6c-1798-4765-9872-8d94e81d80eb",

  // Navigation helpers
  navigateToProductsPlugin: () => {
    dashboard.navigate({
      pageId: ROUTES.PRODUCTS_PLUGIN,
    });
  },

  navigateToDiscountPage: () => {
    dashboard.navigate({
      pageId: ROUTES.DISCOUNT_PAGE,
    });
  },
};
