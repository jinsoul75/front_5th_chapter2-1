export const CartPage = () => {
  return `
  <div>
    <div>장바구니</div>
    <div>
        <div>
            <div>상품명</div>
            <button>삭제</button>
            <button>수량변경</button>
        </div>
    </div>
    <div>
        <select>
            <option value="p1">상품1</option>
        </select>
        <button>추가</button>
    </div>
    <div>
        <div>품절된 상품</div>
    </div>
  </div>
  `;
};
