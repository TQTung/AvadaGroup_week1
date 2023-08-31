import currentDate from "../common/formatDate.js";
import productWithFieldsParam from "../helpers/fieldPicked.js";
import {
  getDataFromDatabase,
  saveDataIntoDatabase,
} from "../helpers/getAndSaveData.js";
import orderProductByDate from "../helpers/sortProductByDate.js";

const products = getDataFromDatabase();

const getAllProducts = ({ limit, sort }) => {
  if (sort && limit) {
    const sortedProducts = orderProductByDate(products, sort);
    return sortedProducts.slice(0, limit);
  }

  if (limit) {
    return products.slice(0, limit);
  }
  if (sort) {
    return orderProductByDate(products, sort);
  }

  return products;
};

const addNewProduct = (newProduct) => {
  const createdAt = currentDate();
  const idIncreasing = products.length + 1;
  const newProducts = [
    ...products,
    { ...newProduct, id: idIncreasing, createAt: createdAt },
  ];
  return saveDataIntoDatabase(newProducts);
};

const updateProduct = (ctx) => {
  const putProduct = ctx.request.body;
  const updateAt = currentDate();

  const newListProducts = products.map((product) => {
    if (product.id === putProduct.id) {
      return {
        ...product,
        ...putProduct,
        updatedAt: updateAt,
      };
    }
    return product;
  });
  return saveDataIntoDatabase(newListProducts);
};

const getProductById = ({ id, fields }) => {
  const product = products.find((product) => product.id === parseInt(id));
  if (fields) {
    return productWithFieldsParam(product, fields);
  }
  return product;
};

const removeProductById = (id) => {
  const result = products.filter((product) => product.id !== id);
  return saveDataIntoDatabase(result);
};

export default {
  getAllProducts,
  addNewProduct,
  updateProduct,
  getProductById,
  removeProductById,
};
