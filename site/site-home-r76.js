(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* r79 contact/access styles are loaded here so the stable homepage HTML does not need another rewrite. */
  if(!document.querySelector('link[data-home-r77]')){
    const style=document.createElement('link');
    style.rel='stylesheet';style.href='site-home-r77.css?v=20260828r79';style.dataset.homeR77='';
    document.head.append(style);
  }

  /* Keep the homepage Common Test summary aligned with the actual course page. */
  const commonTab=document.getElementById('course-tab-common');
  if(commonTab){const note=commonTab.querySelector('small');if(note)note.textContent='15 科开设课程';}
  const commonPanel=document.getElementById('course-panel-common');
  if(commonPanel){
    const copy=commonPanel.querySelector('.course-panel-copy p');
    if(copy)copy.textContent='开设 15 科。根据目标大学采用的科目、配点和报考方式安排备考。';
    const visualTitle=commonPanel.querySelector('.visual-label strong');
    if(visualTitle)visualTitle.textContent='15 科开设课程';
  }

  /* Access belongs with the Nakano classroom and map. */
  const campusCopy=document.querySelector('.campus-panel .campus-copy');
  if(campusCopy&&!campusCopy.querySelector('.campus-access')){
    const access=document.createElement('div');
    access.className='campus-access';
    access.innerHTML=`
      <h4>到校交通</h4>
      <div class="campus-access-list">
        <div class="campus-access-item">
          <b>丸之内线「新中野站」4号出口</b>
          <span>徒步约 9 分钟</span>
        </div>
        <div class="campus-access-item">
          <b>JR中央・总武线 / 东西线「中野站」南口</b>
          <span>徒步约 10 分钟</span>
        </div>
        <div class="campus-access-item">
          <b>「紅葉山公園下」巴士站</b>
          <span>徒步约 1 分钟</span>
          <small>京王巴士：渋64・中71・中87　／　关东巴士：宿04・宿05</small>
        </div>
      </div>`;
    campusCopy.append(access);
  }

  /* Recruiting belongs directly below admissions consultation. */
  const contactLayout=document.querySelector('#contact .contact-layout');
  if(contactLayout&&!document.querySelector('#contact .contact-recruit')){
    const recruit=document.createElement('div');
    recruit.className='shell contact-recruit';
    recruit.id='careers';
    recruit.innerHTML=`
      <h3>招贤纳士</h3>
      <p><b>招聘学科讲师与运营成员。</b> 应聘请附简历，并注明希望负责的科目或业务方向及相关经历；请在邮件中说明应聘来意。</p>
      <a href="mailto:ryukayuiii@gmail.com?subject=%E6%97%85%E4%BA%BA%E6%95%99%E8%82%B2%E5%BA%94%E8%81%98">ryukayuiii@gmail.com <span aria-hidden="true">↗</span></a>`;
    contactLayout.after(recruit);
  }

  /* Remove the old footer placement and duplicate recruiting link. */
  document.querySelectorAll('.footer-access-recruit').forEach(el=>el.remove());
  document.querySelectorAll('.footer-nav a').forEach(link=>{
    if(link.textContent.trim()==='讲师・运营成员招聘')link.remove();
  });

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
    ...document.querySelectorAll('.section-head,.results-summary,.course-explorer,.faculty-directory,.resources-head,.resource-rail,.company-overview,.company-details,.contact-layout,.campus-access,.contact-recruit')
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
