export const CartItemList = ({ products }) => {
  return `
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
  `;
};
