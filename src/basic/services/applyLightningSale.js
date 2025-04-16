export function applyLightningSale(products, updateProducts) {
  const luckyItem = products[Math.floor(Math.random() * products.length)];

  if (Math.random() < 0.3 && luckyItem.stock > 0) {
    luckyItem.price = Math.round(luckyItem.price * 0.8);

    alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');

    updateProducts(luckyItem.id);
  }
}
