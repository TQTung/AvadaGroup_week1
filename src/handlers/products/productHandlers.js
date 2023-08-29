import productRepository from "../../repository/productRepository.js";

const getAllProducts = async (ctx) => {
  try {
    const { limit, sort } = ctx.request.query;
    const result = productRepository.getAllProducts({ limit, sort });
    ctx.body = {
      success: true,
      data: result,
    };
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: error.message,
    };
  }
};

const addProduct = async (ctx) => {
  try {
    const postData = ctx.request.body;
    productRepository.addNewProduct(postData);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (ctx) => {
  try {
    const { id } = ctx.params;
    productRepository.updateProduct(ctx);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
      message: `Product updated successfully with id: ${id} `,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { field } = ctx.request.query;
    const product = productRepository.getProductById({ id, field });
    if (!product) {
      ctx.status = 404;
      return (ctx.body = {
        success: false,
        message: `Product not found with id: ${id}`,
      });
    }
    return (ctx.body = {
      success: true,
      data: product,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
};

const deleteProduct = async (ctx) => {
  try {
    const { id } = ctx.params;
    productRepository.removeProductById(Number(id));
    ctx.status = 201;
    return (ctx.body = {
      success: true,
      message: `Delete product with id: ${id} successfully`,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
};

export default {
  getAllProducts,
  addProduct,
  updateProduct,
  getProductById,
  deleteProduct,
};
