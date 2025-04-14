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
import { updateSelectOptions } from '../components/updateSelectOptions';
import { calculateCart } from '../components/calculateCart';

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

// 장바구니 페이지
export const CartPage = () => {
  // 마지막으로 선택한 다른 상품을 추천하기 위한 값
  let lastSelectedItem;
  // 장바구니의 총 금액에 따라 적립되는 포인트
  let bonusPoints = 0;
  let totalAmount = 0;
  let itemCount = 0;

  const root = document.getElementById('app');
  root.innerHTML = layout();

  const select = document.getElementById('product-select');
  const addCartButton = document.getElementById('add-to-cart');
  const cartItems = document.getElementById('cart-items');

  updateSelectOptions(products, select);

  const updateState = (newTotalAmount, newItemCount, newBonusPoints) => {
    totalAmount = newTotalAmount;
    itemCount = newItemCount;
    bonusPoints = newBonusPoints;
  };

  calculateCart(products, cartItems, bonusPoints, updateState);

  setupEventListeners();

  setTimeout(function () {
    setInterval(function () {
      const luckyItem = products[Math.floor(Math.random() * products.length)];

      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateSelectOptions(products, select);
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (lastSelectedItem) {
        const suggestItem = products.find(function (item) {
          return item.id !== lastSelectedItem && item.stock > 0;
        });

        if (suggest) {
          alert(suggestItem.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggestItem.price = Math.round(suggestItem.price * 0.95);
          updateSelectOptions(products, select);
        }
      }
    }, 60000);
  }, Math.random() * 20000);

  function setupEventListeners() {
    addCartButton.addEventListener('click', function () {
      const selItem = select.value;

      const itemToAdd = products.find(function (p) {
        return p.id === selItem;
      });
      if (itemToAdd && itemToAdd.stock > 0) {
        const item = document.getElementById(itemToAdd.id);

        if (item) {
          const newQuantity = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
          if (newQuantity <= itemToAdd.stock) {
            item.querySelector('span').textContent =
              itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQuantity;
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
          cartItems.appendChild(newItem);
          itemToAdd.stock--;
        }
        calculateCart(products, cartItems, bonusPoints, updateState);
        lastSelectedItem = selItem;
      }
    });

    cartItems.addEventListener('click', function (event) {
      const target = event.target;

      if (
        target.classList.contains('quantity-change') ||
        target.classList.contains('remove-item')
      ) {
        const productId = target.dataset.productId;
        const productElement = document.getElementById(productId);
        const product = products.find((item) => item.id === productId);

        if (target.classList.contains('quantity-change')) {
          const quantityChange = parseInt(target.dataset.change);
          const newQuantity =
            parseInt(productElement.querySelector('span').textContent.split('x ')[1]) +
            quantityChange;

          if (
            newQuantity > 0 &&
            newQuantity <=
              product.stock +
                parseInt(productElement.querySelector('span').textContent.split('x ')[1])
          ) {
            productElement.querySelector('span').textContent =
              productElement.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
            product.stock -= quantityChange;
          } else if (newQuantity <= 0) {
            productElement.remove();
            product.stock -= quantityChange;
          } else {
            alert('재고가 부족합니다.');
          }
        } else if (target.classList.contains('remove-item')) {
          const removedQuantity = parseInt(
            productElement.querySelector('span').textContent.split('x ')[1]
          );
          product.stock += removedQuantity;
          productElement.remove();
        }
        calculateCart(products, cartItems, bonusPoints, updateState);
      }
    });
  }
};
