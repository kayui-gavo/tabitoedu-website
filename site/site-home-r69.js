(()=>{
  /* Header logo: if the original asset ever fails, hide only the icon and keep the wordmark.
     This prevents the browser broken-image symbol from appearing over the hero. */
  const logo=document.querySelector('.brand img');
  if(logo){
    logo.addEventListener('error',()=>{logo.style.display='none';},{once:true});
  }

  /* Load the currently visible Common-Test imagery immediately with native lazy loading.
     The other hidden panels are still loaded by the existing tab logic when selected. */
  const common=document.getElementById('course-panel-common');
  common?.querySelectorAll('img[data-src]').forEach(img=>{
    img.loading='lazy';
    img.fetchPriority='low';
    img.src=img.dataset.src;
    delete img.dataset.src;
  });

  /* Result images are tiny text-encoded assets. Load all five deterministically instead of
     waiting for viewport observers; this removes the intermittent blank-gallery state. */
  const cards=[...document.querySelectorAll('[data-result-b64]')];
  const hydrate=async card=>{
    if(card.dataset.imageSrc)return card.dataset.imageSrc;
    try{
      const response=await fetch(card.dataset.resultB64,{cache:'force-cache'});
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const base64=(await response.text()).replace(/\s+/g,'');
      const src=`data:image/webp;base64,${base64}`;
      const img=card.querySelector('img');
      if(img){
        img.src=src;
        img.loading='eager';
        try{await img.decode?.();}catch(_){}
      }
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
