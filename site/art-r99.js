(()=>{
  /* r126: horizontal artwork rails no longer download every off-screen full-resolution image at once. */
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
        img.src=img.dataset.artSrc;
        delete img.dataset.artSrc;
      };
      if('IntersectionObserver' in window){
        const observer=new IntersectionObserver(entries=>{
          entries.forEach(entry=>{
            if(!entry.isIntersecting)return;
            hydrate(entry.target);
            observer.unobserve(entry.target);
          });
        },{root:rail,rootMargin:'0px 360px',threshold:.01});
        images.forEach(img=>observer.observe(img));
      }else{
        images.slice(0,3).forEach(hydrate);
        const hydrateRest=()=>images.forEach(hydrate);
        rail.addEventListener('scroll',hydrateRest,{once:true,passive:true});
      }
      images.forEach(img=>{
        const figure=img.closest('figure');
        const hydrateNow=()=>hydrate(img);
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
