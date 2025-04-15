export const TotalDisplay = ({ total }) => {
  return `
    <div id="cart-total" class="text-xl font-bold my-4">
        총액: 0원
        <!-- 할인이 적용되면 아래 span이 추가됨 -->
        <span class="text-green-500 ml-2">(10.0% 할인 적용)</span>
        <!-- 포인트가 있으면 아래 span이 추가됨 -->
        <span id="loyalty-points" class="text-blue-500 ml-2">(포인트: 0)</span>
    </div>
  `;
};
