const t={startBtn:document.querySelector(".start-btn"),stopBtn:document.querySelector(".stop-btn"),body:document.querySelector("body")};let e=0;t.startBtn.addEventListener("click",(function(){t.startBtn.disabled=!0,e=setInterval((()=>{const e=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;t.body.style.backgroundColor=e}),1e3)})),t.stopBtn.addEventListener("click",(function(){clearInterval(e),t.startBtn.disabled=!1}));
//# sourceMappingURL=01-color-switcher.f2fafcb5.js.map
