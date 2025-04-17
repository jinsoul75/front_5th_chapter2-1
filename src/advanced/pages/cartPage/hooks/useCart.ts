import { useEffect, useState } from 'react';
import { Product } from '../../../types';
import { calculatePoints } from '../../../services';
import { products } from '../../../data';
import { calculateDiscount } from '../../../services/calculateDiscount';

export const useCart = () => {
  const [productsOptions, setProductsOptions] = useState<Product[]>(products);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [bonusPoints, setBonusPoints] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<number>(0);

  const addToCart = (selectedProduct: Product | null, amount = 1) => {
    const product = productsOptions.find((product) => product.id === selectedProduct?.id);

    if (product) {
      if (product.stock > 0) {
        const newProductOptions = productsOptions.map((item) =>
          item.id === product.id ? { ...item, stock: item.stock - amount } : item
        );
        setProductsOptions(newProductOptions);

        if (cartItems.map((item) => item.id).includes(product.id)) {
          setCartItems(
            cartItems.map((item) =>
              item.id === product.id ? { ...item, stock: item.stock + amount } : item
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

  const removeFromCart = (productId: string) => {
    const newCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(newCartItems);
  };

  const increaseQuantity = (productId: string, amount = 1) => {
    const selectedProduct = cartItems.find((item) => item.id === productId);

    if (selectedProduct) {
      addToCart(selectedProduct, amount);
    }
  };
  const decreaseQuantity = (productId: string, amount = 1) => {
    const selectedProduct = cartItems.find((item) => item.id === productId);
    if (selectedProduct) {
      const newStock = selectedProduct.stock - amount;
      if (newStock <= 0) {
        // 재고가 0 이하가 되면 cartItems에서 제거
        removeFromCart(productId);
      } else {
        // 재고가 남아 있으면 수량 업데이트
        setCartItems(
          cartItems.map((item) => (item.id === productId ? { ...item, stock: newStock } : item))
        );
      }
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const { totalAmount, calculatedDiscountRate } = calculateDiscount(cartItems);

      setTotalPrice(totalAmount);
      setDiscountRate(calculatedDiscountRate * 100);
      setBonusPoints(calculatePoints(totalAmount));
    } else {
      setTotalPrice(0);
      setBonusPoints(0);
      setDiscountRate(0);
    }
  }, [cartItems]);

  return {
    cartItems,
    totalPrice,
    bonusPoints,
    addToCart,
    productsOptions,
    discountRate,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };
};
