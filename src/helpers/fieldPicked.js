const productWithFieldsParam = (product, fields) => {
  const newObjProduct = {};
  const arrFields = fields.split(",");
  for (let i = 0; i < arrFields.length; i++) {
    if (arrFields.length !== 0) {
      newObjProduct[arrFields[i]] = product[arrFields[i]];
    }
  }
  return newObjProduct;
};
export default productWithFieldsParam;
