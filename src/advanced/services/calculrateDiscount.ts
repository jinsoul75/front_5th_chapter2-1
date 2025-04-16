// 10개 이상 구매시 상품별 할인 p1 10% p2 15% p3 20% p4 5% p5 25%
// 30개 이상 구매시 25% 할인 -> 개별 할인과 구매 할인중 큰 할인율 적용
// 화요일에는 추가 10% 할인 -> 기존 할인율과 비교해서 더 큰 할인율 적용

export const calculateDiscount = (quantity: number, amount: number) => {
  let discountRate = 0;

  if (quantity >= 30) {
    discountRate = 0.25;
  }

  if (quantity >= 10) {
    discountRate = 0.25;
  }

  if (new Date().getDay() === 2) {
    discountRate = 0.1;
  }

  return discountRate;
};
