!function(){function t(t,e){e.classList.add("hm-tabs--is-focused");const s=t=>{t.target===e||e.contains(t.target)||(e.classList.remove("hm-tabs--is-focused"),document.removeEventListener("click",s))};if("true"===t.getAttribute("aria-selected"))return void document.addEventListener("click",s);const i=document.getElementById(t.getAttribute("aria-controls")),a=e.querySelectorAll('[role="tabpanel"]');t.parentElement.querySelectorAll('[role="tab"][aria-selected="true"]').forEach((t=>{t.setAttribute("aria-selected",!1),t.setAttribute("tabindex",-1),t.classList.remove("hm-tabs__nav-button--is-active")})),t.setAttribute("aria-selected",!0),t.setAttribute("tabindex",0),t.classList.add("hm-tabs__nav-button--is-active"),a.forEach((t=>{t.getAttribute("id")===i.getAttribute("id")?(t.removeAttribute("hidden"),t.classList.add("hm-tabs-item--is-active")):(t.setAttribute("hidden",!0),t.classList.remove("hm-tabs-item--is-active"))})),e.classList.remove("hm-tabs--focused")}function e(){document.querySelectorAll(".hm-tabs").forEach((e=>function(e){const s=e.querySelector(".hm-tabs__nav");s&&s.parentNode.removeChild(s);const i=document.createElement("div");i.classList.add("hm-tabs__nav"),i.setAttribute("role","tablist");const a=e.dataset.tablistContainerId;a&&document.getElementById(a)?document.getElementById(a).prepend(i):e.prepend(i);(function(t){return Array.from(t.querySelectorAll(".hm-tabs-item")).map(((t,e)=>{const s=document.createElement("button");s.setAttribute("role","tab"),s.setAttribute("tabindex",0===e?"0":"-1"),s.setAttribute("aria-controls",t.id),s.setAttribute("id",t.id.replace("hm-tabs-item-","hm-tabs-button-")),s.setAttribute("aria-selected",0===e?"true":"false"),s.classList.add("hm-tabs__nav-button"),s.classList.toggle("hm-tabs__nav-button--is-active",0===e);const i=t.querySelector(".hm-tabs-item__title").textContent||"";return s.appendChild(document.createTextNode(i)),s}))})(e).forEach((s=>{i.appendChild(s);const a=document.getElementById(s.getAttribute("aria-controls"));s.classList.contains("hm-tabs__nav-button--is-active")?(a.classList.add("hm-tabs-item--is-active"),a.removeAttribute("hidden")):(a.classList.remove("hm-tabs-item--is-active"),a.setAttribute("hidden",!0)),s.addEventListener("click",(s=>{!function(e,s){t(e.target,s)}(s,e)}))})),i.addEventListener("keydown",(s=>{!function(e,s){if(39!==e.keyCode&&37!==e.keyCode)return;const i=s.querySelector('[role="tab"][aria-selected="true"]'),a=s.querySelectorAll('[role="tab"]'),r=Array.from(a).findIndex((t=>i.getAttribute("id")===t.getAttribute("id")));let n=37===e.keyCode?r-1:r+1;n=Math.min(Math.max(n,0),a.length),n!==r&&(t(a[n],s),a[r].blur(),a[n].focus())}(s,e)}));const r=new IntersectionObserver((t=>{t.forEach((t=>{t.isIntersecting&&(window.setTimeout((()=>{t.target.classList.add("hm-tabs--is-visible")}),250),r.unobserve(t.target))}))}));r.observe(e),e.classList.add("hm-tabs--is-initialized")}(e)))}"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e)}();