/**
 * 주어진 제품 목록을 기반으로 select 요소의 옵션을 업데이트
 *
 * select 요소의 현재 옵션을 모두 제거하고, 제품 배열로부터 새로운 옵션을 추가
 * 각 제품은 하나의 옵션으로 표현
 * 재고가 없는 제품은 비활성화
 *
 * @param {Array} products - 제품 객체의 배열, 각 제품은 `id`, `name`, `price`, `stock` 속성
 * @param {HTMLSelectElement} select - 새로운 옵션으로 업데이트할 select 요소
 */

export const updateSelectOptions = ({ products, select }) => {
  select.innerHTML = '';

  products.forEach((item) => {
    const option = document.createElement('option');

    option.value = item.id;
    option.textContent = `${item.name} - ${item.price}원`;

    if (item.stock === 0) option.disabled = true;

    select.appendChild(option);
  });
};
