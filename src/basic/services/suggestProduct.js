export function suggestProduct(products, lastSelectedItem, select, updateSelectOptions) {
  if (lastSelectedItem) {
    const suggestItem = products.find(function (item) {
      return item.id !== lastSelectedItem && item.stock > 0;
    });

    if (suggestItem) {
      alert(suggestItem.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
      suggestItem.price = Math.round(suggestItem.price * 0.95);
      updateSelectOptions(products, select);
    }
  }
}
