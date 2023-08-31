import Router from "koa-router";
import bookHandlers from "../handlers/books/bookHandlers.js";
import productHandlers from "../handlers/products/productHandlers.js";
import bookInputMiddleware from "../middleware/bookInputMiddleware.js";
import productInputMiddleware from "../middleware/productInputMiddleware.js";

const router = new Router({
  prefix: "/api",
});

//books
router.get("/books", bookHandlers.getAllBooks);
router.get("/books/:id", bookHandlers.getOneBook);
router.post("/books", bookInputMiddleware, bookHandlers.addBook);

//products
router.get("/products", productHandlers.getAllProducts);
router.post("/products", productInputMiddleware, productHandlers.addProduct);
router.get("/products/:id", productHandlers.getProductById);
router.put("/products", productInputMiddleware, productHandlers.updateProduct);
router.delete("/products/:id", productHandlers.deleteProduct);

export default router;
