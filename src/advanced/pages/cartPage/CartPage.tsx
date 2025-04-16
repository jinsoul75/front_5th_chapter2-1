import { useState } from 'react';
import { CartItemList, TotalAmount, ProductSelector, SoldOutNotice } from './components';
import { Product } from '../../types/product';
import { products } from '../../data';
import Button from '../../components/Button';
import { calculatePoints } from '../../services';

export default function CartPage() {
  const [productsOptions, setProductsOptions] = useState<Product[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [point, setPoint] = useState<number>(0);

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
    //   1. 옵션 상태 개수 하나 삭제
    //   2. 장바구니 상태 - 장바구니에 있는 아이템인지 아닌지
    //              -> 있다면? 상품 찾아서 추가
    //              -> 없다면? 아이템 추가
    //   3. 총액
    //   4. 포인트 상태 업데이트
    // 없다면 -> 알림창 띄우기
    const product = productsOptions.find((product) => product.id === selectedProduct.id);

    if (product) {
      if (product.stock > 0) {
        // 1. 옵션상태 업데이트
        const newProcutOptions = productsOptions.map((item) =>
          item.id === product.id ? { ...item, stock: item.stock - 1 } : item
        );
        setProductsOptions(newProcutOptions);

        // 2. 장바구니 상태 업데이트
        if (cartItems.map((item) => item.id).includes(product.id)) {
          setCartItems(
            cartItems.map((item) =>
              item.id === product.id ? { ...item, stock: item.stock + 1 } : item
            )
          );
        } else {
          setCartItems([...cartItems, { ...product, stock: 1 }]);
        }

        // 3. 총액 업데이트
        const newTotalAmount = totalAmount + product.price;
        setTotalAmount(newTotalAmount);

        // 4. 포인트 업데이트
        const newPoint = calculatePoints(newTotalAmount);
        setPoint(newPoint);
      } else {
        alert('재고가 부족합니다.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      <CartItemList cartItems={cartItems} />
      <TotalAmount totalAmount={totalAmount} point={point} />
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
