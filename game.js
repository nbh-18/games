var G=(function(){
  var ov,big,sub,btn,lock=0,key,fmt,best=0,startCb;
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
  return {
    el:el,
    setup:function(o){
      key=o.key;fmt=o.fmt||String;
      try{best=parseFloat(localStorage.getItem(key))||0}catch(e){}
      document.body.classList.add("fix");
      document.addEventListener("touchmove",function(e){e.preventDefault()},{passive:false});
      ov=el("div","ov");var p=el("div","panel");
      p.appendChild(el("p","label",o.title));big=el("p","big","Bereit?");sub=el("p","sub",o.rules);btn=el("button","btn","Start");
      var a=el("a","back","← Menü");a.href="index.html";
      p.appendChild(big);p.appendChild(sub);p.appendChild(btn);p.appendChild(a);ov.appendChild(p);document.body.appendChild(ov);
      btn.onclick=function(){if(Date.now()>=lock&&startCb){ov.classList.add("hide");startCb()}};
    },
    onStart:function(f){startCb=f},
    best:function(){return best},
    fmt:function(v){return fmt(v)},
    end:function(score,text){
      lock=Date.now()+700;var rec=score>best;
      if(rec){best=score;try{localStorage.setItem(key,String(best))}catch(e){}}
      big.textContent=fmt(score);big.className="big"+(rec?" gold":"");
      sub.textContent=(rec?"Neuer Rekord! ":"Rekord: "+fmt(best)+". ")+(text||"");
      btn.textContent="Nochmal";ov.classList.remove("hide");
    }
  };
})();
