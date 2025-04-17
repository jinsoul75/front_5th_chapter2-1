import"./modulepreload-polyfill-B5Qt9EMX.js";const x=[{id:"p1",name:"상품1",price:1e4,stock:50},{id:"p2",name:"상품2",price:2e4,stock:30},{id:"p3",name:"상품3",price:3e4,stock:20},{id:"p4",name:"상품4",price:15e3,stock:0},{id:"p5",name:"상품5",price:25e3,stock:10}],v=(e,t)=>{t.innerHTML="",e.forEach(n=>{const o=document.createElement("option");o.value=n.id,o.textContent=`${n.name} - ${n.price}원`,n.stock===0&&(o.disabled=!0),t.appendChild(o)})},E=(e,t=5)=>{let n="";e.forEach(c=>{c.stock<t&&(n+=`${c.name}: ${c.stock>0?`재고 부족 (${c.stock}개 남음)`:"품절"}`)});const o=document.getElementById("stock-status");o.textContent=n},C=({bonusPoints:e,totalAmount:t},n=1e3)=>{e=Math.floor(t/n);const o=document.getElementById("cart-total");let c=document.getElementById("loyalty-points");c||(c=document.createElement("span"),c.id="loyalty-points",c.className="text-blue-500 ml-2",o.appendChild(c));const d=`(포인트: ${e})`;c.textContent=d},$=({products:e,cartContainerElement:t,bonusPoints:n},o={p1:.1,p2:.15,p3:.2,p4:.05,p5:.25},c=30,d=.25,m=.1,k=2)=>{let l=0,h=0,r=0;const f=t.children;for(let i=0;i<f.length;i++)(function(){let a;for(let b=0;b<e.length;b++)if(e[b].id===f[i].id){a=e[b];break}const g=parseInt(f[i].querySelector("span").textContent.split("x ")[1]),p=a.price*g;let y=0;h+=g,r+=p,g>=10&&o[a.id]&&(y=o[a.id]),l+=p*(1-y)})();let u=0;if(h>=c){const i=l*d,a=r-l;i>a?(l=r*(1-d),u=d):u=(r-l)/r}else u=(r-l)/r;new Date().getDay()===k&&(l*=1-m,u=Math.max(u,m));const s=document.getElementById("cart-total");if(s.textContent="총액: "+Math.round(l)+"원",u>0){const i=document.createElement("span");i.className="text-green-500 ml-2",i.textContent="("+(u*100).toFixed(1)+"% 할인 적용)",s.appendChild(i)}E(e),C({bonusPoints:n,totalAmount:l})};function S(e,t,n,o=.2,c=.3){const d=e[Math.floor(Math.random()*e.length)];if(Math.random()<c&&d.stock>0){d.price=Math.round(d.price*(1-o));const m=`번개세일! ${d.name}이(가) ${o*100}% 할인 중입니다!`;alert(m),n(e,t)}}function q(e,t,n,o,c=.05){if(t){const d=e.find(m=>m.id!==t&&m.stock>0);if(d){const m=`${d.name}은(는) 어떠세요? 지금 구매하시면 ${c*100}% 추가 할인!`;alert(m),d.price=Math.round(d.price*(1-c)),o(e,n)}}}const w=(e,t=5)=>{let n="";return e.forEach(o=>{o.stock===0?n+=`${o.name}: 품절 `:o.stock<t&&(n+=`${o.name}: 재고 부족 (${o.stock}개 남음)`)}),n};function I(e,t,n){setTimeout(function(){setInterval(e,t)},n)}const L=({products:e})=>`
    <div id="stock-status" class="text-sm text-gray-500 mt-2">
      ${w(e)}
    </div>
  `,B=({products:e})=>`
    <select id="product-select" class="border rounded p-2 mr-2">
      ${e.map(t=>`
          <option ${t.stock===0?"disabled":""} value="${t.id}">${t.name} - ${t.price}원</option>
        `).join("")}
    </select>
    <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
  `,M=({cartItems:e=[]})=>`
    <div id="cart-items">
      ${e.map(t=>`
        <div id="${t.id}">
          <span>${t.name} - ${t.price}원 x ${t.quantity}</span>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${t.id}" data-change="-1">-</button>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${t.id}" data-change="1">+</button>
          <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${t.id}">삭제</button>
        </div>
      `).join("")}
    </div>
  `,P=({totalPrice:e=0,discountRate:t=0,bonusPoints:n=0})=>`
    <div id="cart-total" class="text-xl font-bold my-4">
      총액: ${e}원

      ${t?`<span class="text-green-500 ml-2">(${t.toFixed(1)}% 할인 적용)</span>`:""}

      <span id="loyalty-points" class="text-blue-500 ml-2">
        (포인트: ${n})
      </span>
    </div>
  `,T=({root:e},t=3e4,n=6e4,o=Math.random()*1e4,c=Math.random()*2e4)=>{let d;const k=()=>`
      <div class="bg-gray-100 p-8">
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <h1 class="text-2xl font-bold mb-4">장바구니</h1>
          
          <!-- 장바구니 아이템들이 들어갈 컨테이너 -->
          ${M({})}
  
          <!-- 총액 표시 -->
          ${P({totalPrice:0,discountRate:0,bonusPoints:0})}
  
          <!-- 상품 선택 및 추가 영역 -->
          ${B({products:x})}
  
          <!-- 재고 상태 표시 -->
          ${L({products:x})}
  
        </div>
      </div>
    `;e.innerHTML=k();const l=document.getElementById("product-select"),h=document.getElementById("add-to-cart"),r=document.getElementById("cart-items");$({products:x,cartContainerElement:r,bonusPoints:0}),f(),I(S(x,l,v),t,o),I(q(x,d,l,v),n,c);function f(){h.addEventListener("click",()=>{const u=l.value,s=x.find(i=>i.id===u);if(s&&s.stock>0){const i=document.getElementById(s.id);if(i){const a=parseInt(i.querySelector("span").textContent.split("x ")[1])+1;a<=s.stock?(i.querySelector("span").textContent=s.name+" - "+s.price+"원 x "+a,s.stock--):alert("재고가 부족합니다.")}else{const a=document.createElement("div");a.id=s.id,a.className="flex justify-between items-center mb-2",a.innerHTML="<span>"+s.name+" - "+s.price+'원 x 1</span><div><button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="'+s.id+'" data-change="-1">-</button><button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="'+s.id+'" data-change="1">+</button><button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="'+s.id+'">삭제</button></div>',r.appendChild(a),s.stock--}$({products:x,cartContainerElement:r,bonusPoints:0}),d=u}}),r.addEventListener("click",u=>{const s=u.target;if(s.classList.contains("quantity-change")||s.classList.contains("remove-item")){const i=s.dataset.productId,a=document.getElementById(i),g=x.find(p=>p.id===i);if(s.classList.contains("quantity-change")){const p=parseInt(s.dataset.change),y=parseInt(a.querySelector("span").textContent.split("x ")[1])+p;y>0&&y<=g.stock+parseInt(a.querySelector("span").textContent.split("x ")[1])?(a.querySelector("span").textContent=a.querySelector("span").textContent.split("x ")[0]+"x "+y,g.stock-=p):y<=0?(a.remove(),g.stock-=p):alert("재고가 부족합니다.")}else if(s.classList.contains("remove-item")){const p=parseInt(a.querySelector("span").textContent.split("x ")[1]);g.stock+=p,a.remove()}$({products:x,cartContainerElement:r,bonusPoints:0})}})}},A=()=>{const e=document.getElementById("app");T({root:e})};A();
