import { updateStockInfo } from './updateStockInfo';
import { renderBonusPts } from './renderBousPts';

export const calcCart = (products, cartDisp, bonusPts) => {
  let totalAmt = 0;
  let itemCnt = 0;
  const cartItems = cartDisp.children;
  let subTot = 0;
  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let curItem;
      for (let j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          curItem = products[j];
          break;
        }
      }
      const q = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      const itemTot = curItem.price * q;
      let disc = 0;
      itemCnt += q;
      subTot += itemTot;
      if (q >= 10) {
        if (curItem.id === 'p1') disc = 0.1;
        else if (curItem.id === 'p2') disc = 0.15;
        else if (curItem.id === 'p3') disc = 0.2;
        else if (curItem.id === 'p4') disc = 0.05;
        else if (curItem.id === 'p5') disc = 0.25;
      }
      totalAmt += itemTot * (1 - disc);
    })();
  }
  let discRate = 0;
  if (itemCnt >= 30) {
    const bulkDisc = totalAmt * 0.25;
    const itemDisc = subTot - totalAmt;
    if (bulkDisc > itemDisc) {
      totalAmt = subTot * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTot - totalAmt) / subTot;
    }
  } else {
    discRate = (subTot - totalAmt) / subTot;
  }
  if (new Date().getDay() === 2) {
    totalAmt *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }
  const sum = document.getElementById('cart-total');
  sum.textContent = '총액: ' + Math.round(totalAmt) + '원';
  if (discRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    sum.appendChild(span);
  }
  updateStockInfo(products);
  renderBonusPts(bonusPts, totalAmt);
};
