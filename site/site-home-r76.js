(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* r77 footer styles are loaded here so the stable homepage HTML does not need another rewrite. */
  if(!document.querySelector('link[data-home-r77]')){
    const style=document.createElement('link');
    style.rel='stylesheet';style.href='site-home-r77.css?v=20260828r77';style.dataset.homeR77='';
    document.head.append(style);
  }

  /* Compact access + recruiting strip at the very bottom of the homepage. */
  const footer=document.querySelector('.footer');
  const footerBottom=footer?.querySelector('.footer-bottom');
  if(footer&&footerBottom&&!footer.querySelector('.footer-access-recruit')){
    const band=document.createElement('div');
    band.className='shell footer-access-recruit';
    band.innerHTML=`
      <section class="footer-access" aria-labelledby="footer-access-title">
        <h3 id="footer-access-title">到校交通</h3>
        <div class="footer-access-grid">
          <div class="footer-access-item">
            <small>Tokyo Metro</small>
            <b>丸之内线「新中野站」4号出口</b>
            <span>徒步约 9 分钟</span>
          </div>
          <div class="footer-access-item">
            <small>JR / Tokyo Metro</small>
            <b>JR中央・总武线 / 东西线「中野站」南口</b>
            <span>徒步约 10 分钟</span>
          </div>
          <div class="footer-access-item">
            <small>Bus</small>
            <b>「紅葉山公園下」巴士站</b>
            <span>下车后徒步约 1 分钟</span>
            <span class="bus-lines">京王巴士：渋64・中71・中87<br>关东巴士：宿04・宿05</span>
          </div>
        </div>
      </section>
      <aside class="footer-recruit" aria-labelledby="footer-recruit-title">
        <h3 id="footer-recruit-title">招贤纳士</h3>
        <p>招聘学科讲师与运营成员。应聘请提供简历、希望负责的科目或业务方向及相关经历。</p>
        <a href="#contact">联系应聘 <span aria-hidden="true">→</span></a>
      </aside>`;
    footer.insertBefore(band,footerBottom);

    /* Remove the old duplicate one-line recruiting link from the footer navigation. */
    [...footer.querySelectorAll('.footer-nav a')].forEach(link=>{
      if(link.textContent.trim()==='讲师・运营成员招聘')link.remove();
    });
  }

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
    ...document.querySelectorAll('.section-head,.results-summary,.course-explorer,.faculty-directory,.resources-head,.resource-rail,.company-overview,.company-details,.contact-layout,.footer-access-recruit')
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