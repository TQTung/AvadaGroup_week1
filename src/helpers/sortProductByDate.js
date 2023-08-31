const orderProductByDate = (products, sort) => {
  const sortedProducts = products.slice().sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    if (sort === "asc") {
      return dateA - dateB;
    } else if (sort === "desc") {
      return dateB - dateA;
    }
  });
  return sortedProducts;
};

export default orderProductByDate;
