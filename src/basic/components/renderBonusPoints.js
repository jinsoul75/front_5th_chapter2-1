export const renderBonusPoints = ({ bonusPoints, totalAmount }) => {
  // 1000원당 1포인트 적립
  bonusPoints = Math.floor(totalAmount / 1000);

  let loyaltyPointsElement = document.getElementById('loyalty-points');
  const sum = document.getElementById('cart-total');

  if (!loyaltyPointsElement) {
    loyaltyPointsElement = document.createElement('span');
    loyaltyPointsElement.id = 'loyalty-points';
    loyaltyPointsElement.className = 'text-blue-500 ml-2';
    sum.appendChild(loyaltyPointsElement);
  }

  loyaltyPointsElement.textContent = '(포인트: ' + bonusPoints + ')';
};
