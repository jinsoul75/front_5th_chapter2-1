// export const CartPage = () => {
//   return `
//   <div>
//     <div>장바구니</div>
//     <div>
//         <div>
//             <div>상품명</div>
//             <button>삭제</button>
//             <button>수량변경</button>
//         </div>
//     </div>
//     <div>
//         <select>
//             <option value="p1">상품1</option>
//         </select>
//         <button>추가</button>
//     </div>
//     <div>
//         <div>품절된 상품</div>
//     </div>
//   </div>
//   `;
// };
import { products } from '../constants/products';
import { renderBonusPts } from '../components/renderBousPts';
import { updateSelOpts } from '../components/updateSelOpts';

const layout = () => {
  return `
  <div class="bg-gray-100 p-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 class="text-2xl font-bold mb-4">장바구니</h1>
      
      <!-- 장바구니 아이템들이 들어갈 컨테이너 -->
      <div id="cart-items">
        <!-- 장바구니에 추가된 아이템들이 여기에 동적으로 추가됨 -->
        <!-- 예시 아이템 구조:
        <div id="p1" class="flex justify-between items-center mb-2">
          <span>상품1 - 10000원 x 1</span>
          <div>
            <button class="quantity-change" data-change="-1">-</button>
            <button class="quantity-change" data-change="1">+</button>
            <button class="remove-item">삭제</button>
          </div>
        </div>
        -->
      </div>

      <!-- 총액 표시 -->
      <div id="cart-total" class="text-xl font-bold my-4">
        총액: 0원
        <!-- 할인이 적용되면 아래 span이 추가됨 -->
        <span class="text-green-500 ml-2">(10.0% 할인 적용)</span>
        <!-- 포인트가 있으면 아래 span이 추가됨 -->
        <span id="loyalty-points" class="text-blue-500 ml-2">(포인트: 0)</span>
      </div>

      <!-- 상품 선택 및 추가 영역 -->
      <select id="product-select" class="border rounded p-2 mr-2">
        <option value="p1">상품1 - 10000원</option>
        <option value="p2">상품2 - 20000원</option>
        <!-- ... 다른 상품들 ... -->
      </select>
      <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>

      <!-- 재고 상태 표시 -->
      <div id="stock-status" class="text-sm text-gray-500 mt-2">
        <!-- 재고 부족 상품 정보가 여기에 표시됨 -->
      </div>
    </div>
  </div>
   `;
};

export const CartPage = () => {
  const bonusPts = 0;
  let lastSel;
  let totalAmt = 0;
  let itemCnt = 0;

  const root = document.getElementById('app');
  root.innerHTML = layout();

  const sel = document.getElementById('product-select');
  const addBtn = document.getElementById('add-to-cart');
  const cartDisp = document.getElementById('cart-items');

  updateSelOpts(products, sel);
  calcCart();
  setupEventListeners();

  setTimeout(function () {
    setInterval(function () {
      const luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelOpts(products, sel);
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (lastSel) {
        const suggest = products.find(function (item) {
          return item.id !== lastSel && item.stock > 0;
        });
        if (suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggest.price = Math.round(suggest.price * 0.95);
          updateSelOpts(products, sel);
        }
      }
    }, 60000);
  }, Math.random() * 20000);

  function calcCart() {
    totalAmt = 0;
    itemCnt = 0;
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
    updateStockInfo();
    renderBonusPts(bonusPts, totalAmt);
  }

  function updateStockInfo() {
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
  }

  function setupEventListeners() {
    addBtn.addEventListener('click', function () {
      const selItem = sel.value;
      const itemToAdd = products.find(function (p) {
        return p.id === selItem;
      });
      if (itemToAdd && itemToAdd.stock > 0) {
        const item = document.getElementById(itemToAdd.id);
        if (item) {
          const newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
          if (newQty <= itemToAdd.stock) {
            item.querySelector('span').textContent =
              itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQty;
            itemToAdd.stock--;
          } else {
            alert('재고가 부족합니다.');
          }
        } else {
          const newItem = document.createElement('div');
          newItem.id = itemToAdd.id;
          newItem.className = 'flex justify-between items-center mb-2';
          newItem.innerHTML =
            '<span>' +
            itemToAdd.name +
            ' - ' +
            itemToAdd.price +
            '원 x 1</span><div>' +
            '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
            itemToAdd.id +
            '" data-change="-1">-</button>' +
            '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
            itemToAdd.id +
            '" data-change="1">+</button>' +
            '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
            itemToAdd.id +
            '">삭제</button></div>';
          cartDisp.appendChild(newItem);
          itemToAdd.stock--;
        }
        calcCart();
        lastSel = selItem;
      }
    });

    cartDisp.addEventListener('click', function (event) {
      const tgt = event.target;
      if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
        const prodId = tgt.dataset.productId;
        const itemElem = document.getElementById(prodId);
        const prod = products.find(function (p) {
          return p.id === prodId;
        });
        if (tgt.classList.contains('quantity-change')) {
          const qtyChange = parseInt(tgt.dataset.change);
          const newQty =
            parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
          if (
            newQty > 0 &&
            newQty <=
              prod.stock + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
          ) {
            itemElem.querySelector('span').textContent =
              itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
            prod.stock -= qtyChange;
          } else if (newQty <= 0) {
            itemElem.remove();
            prod.stock -= qtyChange;
          } else {
            alert('재고가 부족합니다.');
          }
        } else if (tgt.classList.contains('remove-item')) {
          const remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
          prod.stock += remQty;
          itemElem.remove();
        }
        calcCart();
      }
    });
  }
};
