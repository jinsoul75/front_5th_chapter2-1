import { updateStockInfo } from './updateStockInfo';
import { renderBonusPoints } from './renderBonusPoints';

export const calculateCart = ({ products, cartContainerElement, bonusPoints }) => {
  let totalAmount = 0;
  let itemCount = 0;

  const cartItems = cartContainerElement.children;

  let subtotalBeforeDiscount = 0;

  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let currentItem;

      for (let j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          currentItem = products[j];
          break;
        }
      }

      const quantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      const itemTotal = currentItem.price * quantity;

      let discount = 0;

      itemCount += quantity;

      subtotalBeforeDiscount += itemTotal;

      if (quantity >= 10) {
        if (currentItem.id === 'p1') discount = 0.1;
        else if (currentItem.id === 'p2') discount = 0.15;
        else if (currentItem.id === 'p3') discount = 0.2;
        else if (currentItem.id === 'p4') discount = 0.05;
        else if (currentItem.id === 'p5') discount = 0.25;
      }
      totalAmount += itemTotal * (1 - discount);
    })();
  }

  // 최종적으로 적용되는 할인율
  let discountRate = 0;

  if (itemCount >= 30) {
    // 대량 구매 시 적용되는 할인 금액
    // 30개 이상 구매할 때 적용되는 25% 할인액
    const bulkDiscountAmount = totalAmount * 0.25;
    // 개별 할인 금액
    const individualDiscountAmount = subtotalBeforeDiscount - totalAmount;

    if (bulkDiscountAmount > individualDiscountAmount) {
      totalAmount = subtotalBeforeDiscount * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (subtotalBeforeDiscount - totalAmount) / subtotalBeforeDiscount;
    }
  } else {
    discountRate = (subtotalBeforeDiscount - totalAmount) / subtotalBeforeDiscount;
  }

  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  const sum = document.getElementById('cart-total');

  sum.textContent = '총액: ' + Math.round(totalAmount) + '원';

  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
    sum.appendChild(span);
  }

  updateStockInfo(products);
  renderBonusPoints({ bonusPoints, totalAmount });
};
