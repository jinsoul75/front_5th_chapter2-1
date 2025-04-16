import { useState } from 'react';
import { Product } from '../../../types';
import { calculatePoints } from '../../../services';
import { products } from '../../../data';
import { calculateDiscount } from '../../../services/calculrateDiscount';

export const useCart = () => {
  const [productsOptions, setProductsOptions] = useState<Product[]>(products);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [bonusPoints, setBonusPoints] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<number>(0);

  const addToCart = (selectedProduct: Product) => {
    // 버튼을 클릭했을 때
    // 옵션 상태의 아이템 stock이 있는지
    // 있다면 -> 장바구니에 추가
    //   1. 옵션 상태 개수 하나 삭제
    //   2. 장바구니 상태 - 장바구니에 있는 아이템인지 아닌지
    //              -> 있다면? 상품 찾아서 추가
    //              -> 없다면? 아이템 추가
    //   3. 할인
    //      -> 할인 해당하는지 확인
    //         -> 맞다면 ? 할인 적용
    //                -> 총액 다시 계산
    //                -> 포인트 다시 계산
    //         -> 아니면 ? 할인 적용 안함
    //   4. 총액
    //   5. 포인트 -> 1000원당 1포인트
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

        // 3. 할인 업데이트
        const discountRate = calculateDiscount(cartItems.length, totalPrice);
        setDiscountRate(discountRate);

        // 4. 총액 업데이트
        const newTotalPrice = (totalPrice + product.price) * (1 - discountRate);
        setTotalPrice(newTotalPrice);

        // 5. 포인트 업데이트
        const newBonusPoints = calculatePoints(newTotalPrice);
        setBonusPoints(newBonusPoints);
      } else {
        alert('재고가 부족합니다.');
      }
    }
  };

  return { cartItems, totalPrice, bonusPoints, addToCart, productsOptions, discountRate };
};
