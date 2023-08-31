import fs from "fs";
import formatDate from "../common/formatDate.js";
import { pathToFileProductJson } from "../constant/path.js";

const dataProductJson = fs.readFileSync(pathToFileProductJson, "utf8");
// todo a để product = dataProductParser.data nhá a
const dataProductParser = JSON.parse(dataProductJson);

const getAllProducts = ({ limit, sort }) => {
  //todo chỗ này nhiều TH quá mình chỉ cần chỉ 2 if là đc ý a https://i.imgur.com/f0cUn7h.png
  // lúc xử lý thì ưu tiên sort trước rồi mới limit. Ví dụ sort theo giá sp lấy limit 10 thì page sau vân có sản phẩm thấp hơn giá page trc
  // a viết 1 func orderProductsByDate /helper cho gọn nhá a

  if (sort && limit) {
    //chỗ nãy slice rồi đâu cần map item nứa a
    const items = dataProductParser.data.slice(0, limit).map(item => item);
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
    return dataProductParser.data.slice(0, limit).map(item => item);
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

const addNewProduct = newProduct => {
  const createdAt = new Date();
  const createFormat = formatDate(createdAt);
  const idIncreasing = dataProductParser.data.length + 1;
  const updateListProducts = [
    ...dataProductParser.data,
    //todo nên viết ...newProduct lên trước . Nếu trong newProduct có id thì bị đè thành id khác đấy a
    { id: idIncreasing, createAt: createFormat, ...newProduct },
  ];
  return fs.writeFileSync(
    pathToFileProductJson,
    JSON.stringify({
      data: updateListProducts,
    })
  );
};

const updateProduct = ctx => {
  const { id } = ctx.params;
  const putProduct = ctx.request.body;

  const createdAt = new Date();
  const createFormat = formatDate(createdAt);

  if (!id) return;
  //todo chỗ này e thấy chỉ cần return {...putProduct,updatedAt:} là đc mà. Với đây là update nên mình k cần createdAt đâu a
  const newListProducts = dataProductParser.data.map(product => {
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
  // todo chỗ product find giống nhau nên mình để lên đầu dùng chung cũng đc nhé a
  // đoạn pick field nên viết func helper để xử lý nhá a.
  //if(fields){
  //   return productWithFieldsParam(fields, product);
  // }
  if (fields) {
    const newObjProduct = {};
    const product = dataProductParser.data.find(product => product.id === +id);
    const arrFields = fields.split(",");
    for (let i = 0; i < arrFields.length; i++) {
      if (arrFields.length !== 0) {
        newObjProduct[arrFields[i]] = product[arrFields[i]];
      }
    }
    return newObjProduct;
  }
  // todo a nên dùng parseInt viết kiểu này sau dễ lẫn khó debug lắm ạ
  return dataProductParser.data.find(product => product.id === +id);
};

const removeProductById = id => {
  const result = dataProductParser.data.filter(product => product.id !== id);
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
