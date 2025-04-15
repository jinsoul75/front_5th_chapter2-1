import { useState } from 'react';
import { CartAddedItem, TotalAmount, ProductSelector, SoldOutNotice } from './components';
import { Product } from '../../types/product';
import { products } from '../../data';

export default function CartPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

  const handleSelectProduct = (productId: string) => {
    const product = products.find((product) => product.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      <CartAddedItem />
      <TotalAmount />
      <ProductSelector
        products={products}
        selectedProduct={selectedProduct}
        onSelectProduct={handleSelectProduct}
      />
      <SoldOutNotice />
    </div>
  );
}
