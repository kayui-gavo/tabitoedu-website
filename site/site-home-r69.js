(()=>{
  /* Restore the real logo deterministically. The current homepage markup intentionally keeps
     the wordmark text, so inject the small 26 KB mark here and fall back to a CSS mark only
     if the asset itself ever fails. */
  const brand=document.querySelector('.brand');
  if(brand&&!brand.querySelector('img')){
    const logo=document.createElement('img');
    logo.src='images/logo1.png';
    logo.alt='';
    logo.width=36;
    logo.height=36;
    logo.decoding='async';
    logo.fetchPriority='high';
    logo.addEventListener('error',()=>{logo.remove();brand.classList.add('logo-fallback');},{once:true});
    brand.insertBefore(logo,brand.firstChild);
  }

  /* Homepage course media previously referenced several 0.3–3.7 MB originals. Replace those
     DOM URLs with already-existing lightweight assets before any tab is opened. The first panel
     uses ~190 KB total; the other three panels remain data-src and are warmed after window load. */
  const courseMedia={
    'course-panel-common':['images/hero_background_1.jpg','images/tabito-classroom-teaching.webp','images/hero_background_3.jpg'],
    'course-panel-eju':['images/hero_background_0.jpg','images/tabito-classroom-seminar.webp','images/hero_background_9.webp'],
    'course-panel-school':['images/hero_background_9.webp'],
    'course-panel-art':['images/student-work-figure-study.jpg','images/student-work-bust-charcoal.jpg','images/tabito-classroom-art.webp']
  };

  const setPanelSources=(panelId,urls,showNow=false)=>{
    const panel=document.getElementById(panelId);
    if(!panel)return;
    const imgs=[...panel.querySelectorAll('.course-panel-visual img')];
    imgs.forEach((img,index)=>{
      const src=urls[Math.min(index,urls.length-1)];
      img.removeAttribute('src');
      img.dataset.src=src;
      img.decoding='async';
      if(showNow){
        img.loading='lazy';
        img.fetchPriority='low';
        img.src=src;
        delete img.dataset.src;
      }
    });
  };
  setPanelSources('course-panel-common',courseMedia['course-panel-common'],true);
  setPanelSources('course-panel-eju',courseMedia['course-panel-eju']);
  setPanelSources('course-panel-school',courseMedia['course-panel-school']);
  setPanelSources('course-panel-art',courseMedia['course-panel-art']);

  /* Warm the hidden course assets only after the critical hero has finished. This does not
     control visibility or rendering; it merely fills the browser cache so tab changes feel instant. */
  const warmUrls=urls=>urls.forEach(src=>{const image=new Image();image.decoding='async';image.src=src;});
  const warmAll=()=>{
    warmUrls(courseMedia['course-panel-eju']);
    warmUrls(courseMedia['course-panel-school']);
    warmUrls(courseMedia['course-panel-art']);
  };
  if(document.readyState==='complete')setTimeout(warmAll,120);
  else window.addEventListener('load',()=>setTimeout(warmAll,120),{once:true});

  document.querySelectorAll('.course-choice').forEach(choice=>{
    const panelId=choice.getAttribute('aria-controls');
    const urls=courseMedia[panelId];
    if(!urls)return;
    const warm=()=>warmUrls(urls);
    choice.addEventListener('pointerenter',warm,{once:true,passive:true});
    choice.addEventListener('focus',warm,{once:true});
  });

  /* Keep the stable r68 result-gallery hydration. Five records are tiny, so deterministic
     parallel loading is preferable to observer-driven loading. */
  const cards=[...document.querySelectorAll('[data-result-b64]')];
  const hydrate=async card=>{
    if(card.dataset.imageSrc)return card.dataset.imageSrc;
    try{
      const response=await fetch(card.dataset.resultB64,{cache:'force-cache'});
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const base64=(await response.text()).replace(/\s+/g,'');
      const src=`data:image/webp;base64,${base64}`;
      const img=card.querySelector('img');
      if(img){img.src=src;img.loading='eager';try{await img.decode?.();}catch(_){} }
      card.dataset.imageSrc=src;
      card.dataset.loaded='true';
      return src;
    }catch(error){
      card.dataset.error='true';
      console.error('Result image failed to load',error);
      return null;
    }
  };
  cards.forEach(hydrate);
})();
