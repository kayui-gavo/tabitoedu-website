(()=>{
  if(!document.querySelector('link[data-course-visual-r101]')){
    const style=document.createElement('link');
    style.rel='stylesheet';style.href='course-visual-r101.css?v=20260828r101';style.dataset.courseVisualR101='';
    document.head.append(style);
  }
  if(!document.querySelector('script[data-course-visual-r101]')){
    const script=document.createElement('script');
    script.src='course-visual-r101.js?v=20260828r101';script.dataset.courseVisualR101='';script.async=false;
    document.head.append(script);
  }

  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Thin reading progress. */
  const progress=document.createElement('div');
  progress.className='art-read-progress';
  progress.setAttribute('aria-hidden','true');
  progress.innerHTML='<span></span>';
  document.body.prepend(progress);
  const progressBar=progress.firstElementChild;
  let progressTicking=false;
  const syncProgress=()=>{
    const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    const ratio=Math.min(1,Math.max(0,window.scrollY/max));
    progressBar.style.transform=`scaleX(${ratio})`;
    progressTicking=false;
  };
  const requestProgress=()=>{if(!progressTicking){progressTicking=true;requestAnimationFrame(syncProgress);}};
  window.addEventListener('scroll',requestProgress,{passive:true});
  window.addEventListener('resize',requestProgress,{passive:true});
  syncProgress();

  /* Section-aware sticky navigation. */
  const jumpLinks=[...document.querySelectorAll('.art-jumpnav a[href^="#"]')];
  const sections=jumpLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const setCurrent=id=>{
    jumpLinks.forEach(link=>{
      const active=link.getAttribute('href')===`#${id}`;
      link.classList.toggle('is-current',active);
      if(active)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  };
  if('IntersectionObserver' in window&&sections.length){
    const states=new Map();
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>states.set(entry.target,entry));
      const visible=sections
        .map(section=>states.get(section))
        .filter(entry=>entry?.isIntersecting)
        .sort((a,b)=>Math.abs(a.boundingClientRect.top-116)-Math.abs(b.boundingClientRect.top-116));
      if(visible[0])setCurrent(visible[0].target.id);
    },{rootMargin:'-108px 0px -52% 0px',threshold:[0,.05,.2]});
    sections.forEach(section=>observer.observe(section));
  }else if(sections[0])setCurrent(sections[0].id);

  /* One open price group at a time keeps the page compact. */
  const priceGroups=[...document.querySelectorAll('.art-price-group')];
  priceGroups.forEach(group=>group.addEventListener('toggle',()=>{
    if(!group.open)return;
    priceGroups.forEach(other=>{if(other!==group&&other.open)other.open=false;});
  }));

  /* Horizontal work rails: buttons, progress and desktop drag. */
  document.querySelectorAll('.art-work-group').forEach((group,index)=>{
    const rail=group.querySelector('.art-work-rail');
    const head=group.querySelector('.art-work-head');
    if(!rail||!head)return;
    const hint=head.querySelector(':scope > span');
    if(hint)hint.textContent='滑动或使用箭头查看';

    const controls=document.createElement('div');
    controls.className='art-work-controls';
    controls.innerHTML=`<button type="button" aria-label="向左查看${index===0?'学生':'讲师'}作品">‹</button><button type="button" aria-label="向右查看${index===0?'学生':'讲师'}作品">›</button><div class="art-work-progress" aria-hidden="true"><span></span></div>`;
    head.append(controls);
    const [prev,next]=controls.querySelectorAll('button');
    const bar=controls.querySelector('.art-work-progress span');
    const step=()=>Math.max(180,Math.min(rail.clientWidth*.78,520));
    const update=()=>{
      const max=Math.max(0,rail.scrollWidth-rail.clientWidth);
      const ratio=max?Math.min(1,Math.max(0,rail.scrollLeft/max)):0;
      const visible=Math.min(1,rail.clientWidth/Math.max(rail.clientWidth,rail.scrollWidth));
      prev.disabled=rail.scrollLeft<=3;
      next.disabled=rail.scrollLeft>=max-3;
      bar.style.transform=`translateX(${ratio*(1-visible)*100}%) scaleX(${Math.max(.16,visible)})`;
      bar.style.transformOrigin='left center';
    };
    const move=direction=>rail.scrollBy({left:direction*step(),behavior:reduced?'auto':'smooth'});
    prev.addEventListener('click',()=>move(-1));
    next.addEventListener('click',()=>move(1));
    rail.addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});
    window.addEventListener('resize',update,{passive:true});

    let dragging=false,startX=0,startScroll=0,moved=false;
    rail.addEventListener('pointerdown',event=>{
      if(event.pointerType!=='mouse'||event.button!==0)return;
      dragging=true;moved=false;startX=event.clientX;startScroll=rail.scrollLeft;
      rail.classList.add('is-dragging');
      rail.setPointerCapture?.(event.pointerId);
    });
    rail.addEventListener('pointermove',event=>{
      if(!dragging)return;
      const delta=event.clientX-startX;
      if(Math.abs(delta)>5)moved=true;
      rail.scrollLeft=startScroll-delta;
    });
    const endDrag=event=>{
      if(!dragging)return;
      dragging=false;rail.classList.remove('is-dragging');
      rail.releasePointerCapture?.(event.pointerId);
    };
    rail.addEventListener('pointerup',endDrag);
    rail.addEventListener('pointercancel',endDrag);
    rail.addEventListener('click',event=>{
      if(moved){event.preventDefault();event.stopPropagation();moved=false;}
    },true);
    requestAnimationFrame(update);
  });

  /* Artwork lightbox with keyboard access. */
  const dialog=document.createElement('dialog');
  dialog.className='art-lightbox';
  dialog.setAttribute('aria-label','作品大图查看');
  dialog.innerHTML='<div class="art-lightbox-inner"><button class="art-lightbox-close" type="button" aria-label="关闭作品大图">×</button><img alt=""><div class="art-lightbox-caption"></div></div>';
  document.body.append(dialog);
  const dialogImg=dialog.querySelector('img');
  const dialogCaption=dialog.querySelector('.art-lightbox-caption');
  const closeButton=dialog.querySelector('.art-lightbox-close');
  const close=()=>dialog.open&&dialog.close();
  closeButton.addEventListener('click',close);
  dialog.addEventListener('click',event=>{if(event.target===dialog)close();});

  document.querySelectorAll('.art-work-rail figure').forEach(figure=>{
    figure.tabIndex=0;
    figure.setAttribute('role','button');
    figure.setAttribute('aria-label',`查看大图：${figure.querySelector('img')?.alt||figure.querySelector('figcaption')?.textContent||'作品'}`);
    const open=()=>{
      const img=figure.querySelector('img');
      if(!img)return;
      dialogImg.src=img.currentSrc||img.src;
      dialogImg.alt=img.alt||'作品大图';
      dialogCaption.textContent=figure.querySelector('figcaption')?.textContent||img.alt||'';
      dialog.showModal();
      closeButton.focus();
    };
    figure.addEventListener('click',open);
    figure.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();open();}
    });
  });
})();
