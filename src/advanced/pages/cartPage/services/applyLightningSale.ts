import { Product } from '../../../types';

export function applyLightningSale({
  products,
  updateSelectOptions,
  lightningSaleRate = 0.2,
}: {
  products: Product[];
  updateSelectOptions: (products: Product[]) => void;
  lightningSaleRate?: number;
}) {
  // 랜덤으로 세일 상품을 선택
  // 값 업데이트
  // -> 장바구니에 담긴 상품
  // -> 셀렉트 목록에 있는 상품
  const luckyItem = products[Math.floor(Math.random() * products.length)];

  if (Math.random() < 0.3 && luckyItem.stock > 0) {
    luckyItem.price = Math.round(luckyItem.price * 0.8);

    const message = `번개세일! ${luckyItem.name}이(가) ${lightningSaleRate * 100}% 할인 중입니다!`;

    alert(message);

    updateSelectOptions(products);
  }
}
