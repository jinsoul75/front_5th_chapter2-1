import { useState } from 'react';
import { CartAddedItem, TotalAmount, ProductSelector, SoldOutNotice } from './components';
import { Product } from '../../types/product';

export default function CartPage() {
  const [selectedProducts, setSelectedProducts] = useState<Product | null>(null);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      <CartAddedItem />
      <TotalAmount />
      <ProductSelector />
      <SoldOutNotice />
    </div>
  );
}
