export const updateStockInfo = (products) => {
  let infoMsg = '';
  products.forEach(function (item) {
    if (item.stock < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.stock > 0 ? '재고 부족 (' + item.stock + '개 남음)' : '품절') +
        '\n';
    }
  });
  const stockInfo = document.getElementById('stock-status');
  stockInfo.textContent = infoMsg;
};
