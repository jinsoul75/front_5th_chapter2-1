// 10개 이상 구매시 상품별 할인 p1 10% p2 15% p3 20% p4 5% p5 25%
// 30개 이상 구매시 25% 할인 -> 개별 할인과 구매 할인중 큰 할인율 적용
// 화요일에는 추가 10% 할인 -> 기존 할인율과 비교해서 더 큰 할인율 적용
import { Product } from '../../../types';

export const calculateDiscount = (cartItems: Product[]) => {
  let subtotalBeforeDiscount = 0;
  let totalAmount = 0;
  let itemCount = 0;
  let calculatedDiscountRate = 0;

  cartItems.forEach((item) => {
    const itemTotal = item.price * item.stock;
    subtotalBeforeDiscount += itemTotal;
    itemCount += item.stock;

    let discount = 0;
    if (item.stock >= 10) {
      if (item.id === 'p1') discount = 0.1;
      else if (item.id === 'p2') discount = 0.15;
      else if (item.id === 'p3') discount = 0.2;
      else if (item.id === 'p4') discount = 0.05;
      else if (item.id === 'p5') discount = 0.25;
    }
    totalAmount += itemTotal * (1 - discount);
  });

  if (itemCount >= 30) {
    const bulkDiscountAmount = totalAmount * 0.25;
    const individualDiscountAmount = subtotalBeforeDiscount - totalAmount;

    if (bulkDiscountAmount > individualDiscountAmount) {
      totalAmount = subtotalBeforeDiscount * (1 - 0.25);
      calculatedDiscountRate = 0.25;
    } else {
      calculatedDiscountRate = (subtotalBeforeDiscount - totalAmount) / subtotalBeforeDiscount;
    }
  } else {
    calculatedDiscountRate = (subtotalBeforeDiscount - totalAmount) / subtotalBeforeDiscount;
  }

  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    calculatedDiscountRate = Math.max(calculatedDiscountRate, 0.1);
  }

  return { totalAmount, calculatedDiscountRate };
};
