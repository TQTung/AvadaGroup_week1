import fs from "fs";
import formatDate from "../common/formatDate.js";
import { pathToFileProductJson } from "../constant/path.js";

const dataProductJson = fs.readFileSync(pathToFileProductJson, "utf8");
const dataProductParser = JSON.parse(dataProductJson);

const getAllProducts = ({ limit, sort }) => {
  if (sort && limit) {
    const items = dataProductParser.data.slice(0, limit).map((item) => item);
    const sortedProducts = items.slice().sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (sort === "asc") {
        return dateA - dateB;
      } else if (sort === "desc") {
        return dateB - dateA;
      }
    });
    return sortedProducts;
  }

  if (limit) {
    return dataProductParser.data.slice(0, limit).map((item) => item);
  }
  if (sort) {
    return dataProductParser.data.slice().sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (sort === "asc") {
        return dateA - dateB;
      } else if (sort === "desc") {
        return dateB - dateA;
      }
    });
  }

  return dataProductParser.data;
};

const addNewProduct = (newProduct) => {
  const createdAt = new Date();
  const createFormat = formatDate(createdAt);
  const idIncreasing = dataProductParser.data.length + 1;
  const updateListProducts = [
    ...dataProductParser.data,
    { id: idIncreasing, createAt: createFormat, ...newProduct },
  ];
  return fs.writeFileSync(
    pathToFileProductJson,
    JSON.stringify({
      data: updateListProducts,
    })
  );
};

const updateProduct = (ctx) => {
  const { id } = ctx.params;
  const putProduct = ctx.request.body;

  const createdAt = new Date();
  const createFormat = formatDate(createdAt);

  if (!id) return;

  const newListProducts = dataProductParser.data.map((product) => {
    if (product.id === +id) {
      return {
        ...product,
        name: putProduct.name,
        price: putProduct.price,
        color: putProduct.color,
        description: putProduct.description,
        image: putProduct.image,
        product: putProduct.product,
        createdAt: createFormat,
      };
    }
    return product;
  });

  return fs.writeFileSync(
    pathToFileProductJson,
    JSON.stringify({
      data: newListProducts,
    })
  );
};

const getProductById = ({ id, fields }) => {
  if (fields) {
    const newObjProduct = {};
    const product = dataProductParser.data.find(
      (product) => product.id === +id
    );
    const arrFields = fields.split(",");
    for (let i = 0; i < arrFields.length; i++) {
      if (arrFields.length !== 0) {
        newObjProduct[arrFields[i]] = product[arrFields[i]];
      }
    }
    return newObjProduct;
  }

  return dataProductParser.data.find((product) => product.id === +id);
};

const removeProductById = (id) => {
  const result = dataProductParser.data.filter((product) => product.id !== id);
  return fs.writeFileSync(
    pathToFileProductJson,
    JSON.stringify({
      data: result,
    })
  );
};

export default {
  getAllProducts,
  addNewProduct,
  updateProduct,
  getProductById,
  removeProductById,
};
