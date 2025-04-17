export function applyLightningSale(
  products,
  select,
  updateSelectOptions,
  discountRate = 0.2,
  saleProbability = 0.3
) {
  const luckyItem = products[Math.floor(Math.random() * products.length)];

  if (Math.random() < saleProbability && luckyItem.stock > 0) {
    luckyItem.price = Math.round(luckyItem.price * (1 - discountRate));

    const message = `번개세일! ${luckyItem.name}이(가) ${discountRate * 100}% 할인 중입니다!`;
    alert(message);

    updateSelectOptions(products, select);
  }
}
