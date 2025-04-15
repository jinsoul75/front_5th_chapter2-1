export const OutOfStockList = ({ products }) => {
  const outOfStockProducts = products.filter((product) => product.stock === 0);

  return `
    <div id="stock-status" class="text-sm text-gray-500 mt-2">
    ${outOfStockProducts
      .map((product) => {
        return `
        <div>
          ${product.name}
        </div>
      `;
      })
      .join('')}
    </div>
  `;
};
