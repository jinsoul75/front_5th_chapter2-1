import { Product } from '../../../types';

export default function CartItemList({ cartItems }: { cartItems: Product[] }) {
  return (
    <div id="cart-items">
      {cartItems.map((item) => (
        <div id={item.id}>
          <span>{` ${item.name} - ${item.price}원 x ${item.stock}`}</span>
        </div>
      ))}
    </div>
  );
}
