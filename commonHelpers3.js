import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i as l}from"./assets/vendor-651d7991.js";const m=document.querySelector(".form");m.addEventListener("submit",n);function n(o){o.preventDefault();const{delay:{value:t},step:{value:s},amount:{value:r}}=o.target.elements;for(let e=1;e<=Number(r);e++)setTimeout(()=>{a(e,t).then(i=>l.show({message:i,close:!1,closeOnClick:!0,position:"topRight",messageColor:"#fff",backgroundColor:"#11bd14"})).catch(i=>l.show({message:i,close:!1,closeOnClick:!0,position:"topRight",messageColor:"#fff",backgroundColor:"#d60808"}))},s*e)}function a(o,t){const s=Math.random()>.3;return new Promise((r,e)=>{setTimeout(()=>{s?r(`✅Fulfilled promise ${o} in ${t}ms`):e(`❌Rejected promise ${o} in ${t}ms`)},t)})}
//# sourceMappingURL=commonHelpers3.js.map
