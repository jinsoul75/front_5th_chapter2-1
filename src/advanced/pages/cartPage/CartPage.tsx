import { CartAddedItem, TotalAmount, ProductSelector, SoldOutNotice } from './components';

export default function CartPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">장바구니</h1>
      <CartAddedItem />
      <TotalAmount />
      <ProductSelector />
      <SoldOutNotice />
    </>
  );
}
