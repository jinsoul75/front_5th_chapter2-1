export const updateSelectOptions = (products, select) => {
  select.innerHTML = '';
  products.forEach(function (item) {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.name + ' - ' + item.price + '원';
    if (item.stock === 0) opt.disabled = true;
    select.appendChild(opt);
  });
};
