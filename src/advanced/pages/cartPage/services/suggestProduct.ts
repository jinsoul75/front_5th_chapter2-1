import { Product } from '../../../types';

export function suggestProduct(
  productsOptions: Product[],
  lastSelectedItemId: string | null,
  setProductsOptions: (products: Product[]) => void
) {
  if (lastSelectedItemId) {
    const suggestItem = productsOptions.find(
      (item) => item.id !== lastSelectedItemId && item.stock > 0
    );

    if (suggestItem) {
      alert(suggestItem.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
      suggestItem.price = Math.round(suggestItem.price * 0.95);
      setProductsOptions(productsOptions);
    }
  }
}
