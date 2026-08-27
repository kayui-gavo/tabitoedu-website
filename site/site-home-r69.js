(()=>{
  const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  const constrained=Boolean(connection?.saveData)||['slow-2g','2g'].includes(connection?.effectiveType||'');
  const idle=callback=>('requestIdleCallback'in window?requestIdleCallback(callback,{timeout:900}):setTimeout(callback,180));

  /* Prime the first records quietly after the critical hero has had a chance to paint.
     The existing gallery loader then reads them from the HTTP cache instead of waiting. */
  const resultUrls=[...document.querySelectorAll('[data-result-b64]')].map(card=>card.dataset.resultB64).filter(Boolean);
  const primeResults=()=>{
    const count=constrained?1:Math.min(3,resultUrls.length);
    resultUrls.slice(0,count).forEach(url=>fetch(url,{cache:'force-cache'}).catch(()=>{}));
  };
  if(document.readyState==='complete')idle(primeResults);
  else window.addEventListener('load',()=>idle(primeResults),{once:true});

  /* Course imagery is deliberately absent from the initial request waterfall.
     Load the visible Common-Test panel shortly before the section enters view,
     then prewarm another panel only when the visitor expresses intent. */
  const panels=[...document.querySelectorAll('.course-panel')];
  const choices=[...document.querySelectorAll('.course-choice')];
  const warmPanel=panel=>{
    if(!panel)return;
    panel.querySelectorAll('img[data-src]').forEach(img=>{
      if(img.dataset.warmed)return;
      img.dataset.warmed='true';
      img.loading='lazy';
      img.fetchPriority='low';
      img.src=img.dataset.src;
      delete img.dataset.src;
    });
  };
  const programs=document.getElementById('programs');
  if(programs&&panels[0]){
    if('IntersectionObserver'in window){
      const observer=new IntersectionObserver(entries=>{
        if(entries.some(entry=>entry.isIntersecting)){
          warmPanel(panels[0]);
          observer.disconnect();
        }
      },{rootMargin:'900px 0px'});
      observer.observe(programs);
    }else idle(()=>warmPanel(panels[0]));
  }
  if(!constrained){
    choices.forEach((choice,index)=>{
      const warm=()=>idle(()=>warmPanel(panels[index]));
      choice.addEventListener('pointerenter',warm,{once:true,passive:true});
      choice.addEventListener('focus',warm,{once:true});
    });
  }

  /* Decode visible result images off the interaction path when possible. */
  const decodeVisible=()=>document.querySelectorAll('.result-gallery-card[data-loaded="true"] img').forEach(img=>img.decode?.().catch(()=>{}));
  const gallery=document.getElementById('resultGallery');
  if(gallery&&'MutationObserver'in window){
    const observer=new MutationObserver(()=>idle(decodeVisible));
    observer.observe(gallery,{subtree:true,attributes:true,attributeFilter:['data-loaded','src']});
  }
})();
