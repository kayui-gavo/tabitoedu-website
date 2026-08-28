(()=>{
  /* r126: artwork is both vertically and horizontally lazy. The old page could wake all
     13 full-resolution works together as soon as the gallery section approached. */
  const setupArtworkLoading=()=>{
    const rails=[...document.querySelectorAll('.art-work-rail')];
    rails.forEach(rail=>{
      const images=[...rail.querySelectorAll('img[src]')];
      if(!images.length)return;
      images.forEach(img=>{
        const src=img.getAttribute('src');
        if(!src)return;
        img.dataset.artSrc=src;
        img.removeAttribute('src');
        img.loading='lazy';
        img.decoding='async';
        img.fetchPriority='low';
      });

      const hydrate=img=>{
        if(!img||img.getAttribute('src')||!img.dataset.artSrc)return;
        const src=img.dataset.artSrc;
        img.addEventListener('error',()=>{img.style.visibility='hidden';},{once:true});
        img.src=src;
        delete img.dataset.artSrc;
      };
      const activateRail=()=>{
        if(rail.dataset.artLoadingActive)return;
        rail.dataset.artLoadingActive='1';
        if('IntersectionObserver' in window){
          const horizontal=new IntersectionObserver(entries=>{
            entries.forEach(entry=>{
              if(!entry.isIntersecting)return;
              hydrate(entry.target);
              horizontal.unobserve(entry.target);
            });
          },{root:rail,rootMargin:'0px 320px',threshold:.01});
          images.forEach(img=>horizontal.observe(img));
        }else images.slice(0,3).forEach(hydrate);
      };

      if('IntersectionObserver' in window){
        const vertical=new IntersectionObserver(entries=>{
          if(!entries.some(entry=>entry.isIntersecting))return;
          vertical.disconnect();
          activateRail();
        },{rootMargin:'700px 0px'});
        vertical.observe(rail);
      }else activateRail();

      images.forEach(img=>{
        const figure=img.closest('figure');
        const hydrateNow=()=>{activateRail();hydrate(img);};
        figure?.addEventListener('pointerenter',hydrateNow,{once:true,passive:true});
        figure?.addEventListener('focusin',hydrateNow,{once:true});
        figure?.addEventListener('touchstart',hydrateNow,{once:true,passive:true});
      });
    });
  };
  setupArtworkLoading();

  if(!document.querySelector('script[data-art-r99-core]')){
    const core=document.createElement('script');
    core.src='art-r99-core.js?v=20260828r126';
    core.dataset.artR99Core='';
    document.body.append(core);
  }
  if(window.matchMedia('(max-width:820px)').matches&&!document.querySelector('script[data-course-mobile-nav-r125]')){
    const mobileNav=document.createElement('script');
    mobileNav.src='course-mobile-nav-r125.js?v=20260828r125';
    mobileNav.dataset.courseMobileNavR125='';
    document.body.append(mobileNav);
  }
})();
