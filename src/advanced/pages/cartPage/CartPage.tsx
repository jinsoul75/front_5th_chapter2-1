import { useState } from 'react';
import { CartItemList, TotalAmount, ProductSelector, SoldOutNotice } from './components';
import { Product } from '../../types/product';
import { products } from '../../data';
import Button from '../../components/Button';

export default function CartPage() {
  const [productsOptions, setProductsOptions] = useState<Product[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleSelectProduct = (productId: string) => {
    const product = products.find((product) => product.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  // 습관: 전역 변수가 있는데도 인자로 넘겨줘야 마음이 편하다..
  const handleAddProduct = (selectedProduct: Product) => {
    // 버튼을 클릭했을 때
    // 옵션 상태의 아이템 stock이 있는지
    // 있다면 -> 장바구니에 추가
    // 1. 옵션 상태 개수 하나 삭제
    // 2. 장바구니 상태 - 장바구니에 있는 아이템인지 아닌지
    //              -> 있다면? 상품 찾아서 추가
    //              -> 없다면? 아이템 추가
    // 3. 총액 상태
    // 없다면 -> 알림창 띄우기
    const product = productsOptions.find((product) => product.id === selectedProduct.id);

    if (product) {
      if (product.stock > 0) {
        const newProcutOptions = productsOptions.map((item) =>
          item.id === product.id ? { ...item, stock: item.stock - 1 } : item
        );

        setProductsOptions(newProcutOptions);

        if (cartItems.map((item) => item.id).includes(product.id)) {
          setCartItems(
            cartItems.map((item) =>
              item.id === product.id ? { ...item, stock: item.stock + 1 } : item
            )
          );
        } else {
          setCartItems([...cartItems, { ...product, stock: 1 }]);
        }
      } else {
        alert('재고가 부족합니다.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      <CartItemList cartItems={cartItems} />
      <TotalAmount />
      <ProductSelector
        products={productsOptions}
        selectedProduct={selectedProduct}
        onSelectProduct={handleSelectProduct}
      />
      <Button onClick={() => handleAddProduct(selectedProduct)}>추가</Button>
      <SoldOutNotice />
    </div>
  );
}
