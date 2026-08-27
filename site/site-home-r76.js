(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Course panels: animate only the newly visible panel. Existing tab logic remains authoritative. */
  const panels=[...document.querySelectorAll('.course-panel')];
  const animatePanel=panel=>{
    if(!panel||panel.hidden||reduced)return;
    panel.classList.remove('r76-panel-enter');
    void panel.offsetWidth;
    panel.classList.add('r76-panel-enter');
    window.setTimeout(()=>panel.classList.remove('r76-panel-enter'),280);
  };
  panels.forEach(panel=>{
    new MutationObserver(mutations=>{
      if(mutations.some(m=>m.attributeName==='hidden')&&!panel.hidden)animatePanel(panel);
    }).observe(panel,{attributes:true,attributeFilter:['hidden']});
  });

  /* Results gallery: mouse drag on desktop + visual progress; touch keeps native momentum scrolling. */
  const gallery=document.getElementById('resultGallery');
  if(gallery){
    const progress=document.createElement('div');
    progress.className='r76-gallery-progress';
    progress.setAttribute('aria-hidden','true');
    progress.innerHTML='<span></span>';
    gallery.after(progress);
    const progressBar=progress.firstElementChild;
    const syncProgress=()=>{
      const max=Math.max(1,gallery.scrollWidth-gallery.clientWidth);
      const ratio=Math.min(1,Math.max(0,gallery.scrollLeft/max));
      const visible=Math.min(1,gallery.clientWidth/Math.max(gallery.clientWidth,gallery.scrollWidth));
      progressBar.style.transform=`translateX(${ratio*(1-visible)*100}%) scaleX(${Math.max(.12,visible)})`;
      progressBar.style.transformOrigin='left center';
    };
    gallery.addEventListener('scroll',()=>requestAnimationFrame(syncProgress),{passive:true});
    window.addEventListener('resize',syncProgress,{passive:true});
    requestAnimationFrame(syncProgress);

    let dragging=false,startX=0,startScroll=0,moved=false;
    gallery.addEventListener('pointerdown',event=>{
      if(event.pointerType!=='mouse'||event.button!==0)return;
      dragging=true;moved=false;startX=event.clientX;startScroll=gallery.scrollLeft;
      gallery.classList.add('is-dragging');gallery.setPointerCapture?.(event.pointerId);
    });
    gallery.addEventListener('pointermove',event=>{
      if(!dragging)return;
      const delta=event.clientX-startX;
      if(Math.abs(delta)>5)moved=true;
      gallery.scrollLeft=startScroll-delta;
    });
    const endDrag=event=>{
      if(!dragging)return;
      dragging=false;gallery.classList.remove('is-dragging');
      gallery.releasePointerCapture?.(event.pointerId);
    };
    gallery.addEventListener('pointerup',endDrag);
    gallery.addEventListener('pointercancel',endDrag);
    gallery.addEventListener('click',event=>{
      if(moved){event.preventDefault();event.stopPropagation();moved=false;}
    },true);
  }

  /* One restrained entrance per major block. Content is always visible even if JS fails. */
  const revealTargets=[
    ...document.querySelectorAll('.section-head,.results-summary,.course-explorer,.faculty-directory,.resources-head,.resource-rail,.company-overview,.company-details,.contact-layout')
  ];
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        const el=entry.target;
        if(el.classList.contains('section-head'))el.classList.add('r76-seen');
        if(!reduced&&el.animate){
          el.animate([
            {opacity:.72,transform:'translateY(9px)'},
            {opacity:1,transform:'translateY(0)'}
          ],{duration:360,easing:'cubic-bezier(.22,.61,.36,1)',fill:'none'});
        }
        observer.unobserve(el);
      });
    },{threshold:.12,rootMargin:'0px 0px -5%'});
    revealTargets.forEach(el=>observer.observe(el));
  }else{
    document.querySelectorAll('.section-head').forEach(el=>el.classList.add('r76-seen'));
  }
})();
