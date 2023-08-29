import Router from "koa-router";
import productRepository from "../repository/productRepository.js";

const router = new Router();

router.get("/products", async (ctx) => {
  const products = productRepository.getAllProducts(ctx);
  await ctx.render("/pages/product", {
    products,
  });
});

export default router;
