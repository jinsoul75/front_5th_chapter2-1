import { useEffect, useState } from 'react';
import { Product } from '../../../types';
import { calculatePoints } from '../../../services';
import { products } from '../../../data';

export const useCart = () => {
  const [productsOptions, setProductsOptions] = useState<Product[]>(products);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [bonusPoints, setBonusPoints] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<number>(0);

  const addToCart = (selectedProduct: Product | null) => {
    const product = productsOptions.find((product) => product.id === selectedProduct?.id);

    if (product) {
      if (product.stock > 0) {
        const newProductOptions = productsOptions.map((item) =>
          item.id === product.id ? { ...item, stock: item.stock - 1 } : item
        );
        setProductsOptions(newProductOptions);

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

  useEffect(() => {
    if (cartItems.length > 0) {
      let subtotalBeforeDiscount = 0;
      let totalAmount = 0;
      let itemCount = 0;
      let calculatedDiscountRate = 0;

      cartItems.forEach((item) => {
        const itemTotal = item.price * item.stock;
        subtotalBeforeDiscount += itemTotal;
        itemCount += item.stock;

        let discount = 0;
        if (item.stock >= 10) {
          if (item.id === 'p1') discount = 0.1;
          else if (item.id === 'p2') discount = 0.15;
          else if (item.id === 'p3') discount = 0.2;
          else if (item.id === 'p4') discount = 0.05;
          else if (item.id === 'p5') discount = 0.25;
        }
        totalAmount += itemTotal * (1 - discount);
      });

      if (itemCount >= 30) {
        const bulkDiscountAmount = totalAmount * 0.25;
        const individualDiscountAmount = subtotalBeforeDiscount - totalAmount;

        if (bulkDiscountAmount > individualDiscountAmount) {
          totalAmount = subtotalBeforeDiscount * (1 - 0.25);
          calculatedDiscountRate = 0.25;
        } else {
          calculatedDiscountRate = (subtotalBeforeDiscount - totalAmount) / subtotalBeforeDiscount;
        }
      } else {
        calculatedDiscountRate = (subtotalBeforeDiscount - totalAmount) / subtotalBeforeDiscount;
      }

      if (new Date().getDay() === 2) {
        totalAmount *= 1 - 0.1;
        calculatedDiscountRate = Math.max(calculatedDiscountRate, 0.1);
      }

      setTotalPrice(totalAmount);
      setDiscountRate(calculatedDiscountRate * 100);
      setBonusPoints(calculatePoints(totalAmount));
    } else {
      setTotalPrice(0);
      setBonusPoints(0);
      setDiscountRate(0);
    }
  }, [cartItems]);

  return { cartItems, totalPrice, bonusPoints, addToCart, productsOptions, discountRate };
};
