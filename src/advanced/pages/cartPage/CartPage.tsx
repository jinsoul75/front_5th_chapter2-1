import { useState } from 'react';
import { CartItemList, TotalAmount, ProductSelector, SoldOutNotice } from './components';
import { Product } from '../../types/product';
import { products } from '../../data';
import Button from '../../components/Button';
import { useCart } from './hooks';
export default function CartPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

  const { cartItems, totalPrice, bonusPoints, addToCart, productsOptions } = useCart();
  const handleSelectProduct = (productId: string) => {
    const product = products.find((product) => product.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  // 습관: 전역 변수가 있는데도 인자로 넘겨줘야 마음이 편하다..
  const handleAddProduct = (selectedProduct: Product) => {
    addToCart(selectedProduct);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      <CartItemList cartItems={cartItems} />
      <TotalAmount totalPrice={totalPrice} bonusPoints={bonusPoints} />
      <ProductSelector
        products={productsOptions}
        selectedProduct={selectedProduct}
        onSelectProduct={handleSelectProduct}
      />
      <Button className={'bg-blue-500 px-4 py-2'} onClick={() => handleAddProduct(selectedProduct)}>
        추가
      </Button>
      <SoldOutNotice />
    </div>
  );
}
