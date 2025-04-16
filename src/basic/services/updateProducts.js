export const updateProducts = (products, id) => {
  return products.map((product) => {
    if (product.id === id) {
      return { ...product, stock: product.stock - 1 };
    }
    return product;
  });
};
