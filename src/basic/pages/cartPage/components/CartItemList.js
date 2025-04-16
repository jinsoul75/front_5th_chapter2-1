export const CartItemList = ({ cartItems = [] }) => {
  return `
    <div id="cart-items">
      ${cartItems
        .map(
          (item) => `
        <div id="${item.id}">
          <span>${item.name} - ${item.price}원 x ${item.quantity}</span>
        </div>
      `
        )
        .join('')}
    </div>
  `;
};
