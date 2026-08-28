(()=>{
  /* r104: one consolidated visual stylesheet instead of r101 CSS -> r101 JS -> r102 CSS waterfall. */
  if(!document.querySelector('link[data-art-visual-r104]')){
    const style=document.createElement('link');
    style.rel='stylesheet';
    style.href='art-visual-r104.css?v=20260828r104';
    style.dataset.artVisualR104='';
    document.head.append(style);
  }

  const paths={
    route:'<circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18c5 0 2-7 7-7h3M9 6H5a2 2 0 0 0-2 2v4"/>',
    palette:'<path d="M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a1.5 1.5 0 0 1 0-3h2a7 7 0 0 0-2-10Z"/><circle cx="7.5" cy="9" r=".8" fill="currentColor" stroke="none"/><circle cx="10" cy="6.5" r=".8" fill="currentColor" stroke="none"/><circle cx="14" cy="6.5" r=".8" fill="currentColor" stroke="none"/>',
    portfolio:'<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M9 5V3h6v2M8 11h8M8 15h5"/>',
    building:'<path d="M4 21V8l8-4 8 4v13M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-4h4v4"/>',
    book:'<path d="M4 5.5A3.5 3.5 0 0 1 7.5 4H12v16H7.5A3.5 3.5 0 0 0 4 21.5V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 4H12v16h4.5a3.5 3.5 0 0 1 3.5 1.5V5.5Z"/>',
    language:'<path d="M4 5h10v8H8l-4 3v-3H4V5ZM11 9h9v8h-3l-4 3v-3h-2"/>',
    pencil:'<path d="m4 20 4.5-1 10-10-3.5-3.5-10 10L4 20Z"/><path d="m13.5 7 3.5 3.5"/>',
    layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    monitor:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    graduation:'<path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12v4c3 2 7 2 10 0v-4M21 9v6"/>',
    clipboard:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M8 9h8M8 13h8M8 17h5"/>',
    brush:'<path d="m14 4 6 6-8 8-6-6 8-8Z"/><path d="M5.5 12.5C3 14 3 17 3 20c3 0 6 0 7.5-2.5"/>',
    bulb:'<path d="M9 18h6M10 21h4M8.5 15.5a6 6 0 1 1 7 0c-.8.6-1.5 1.5-1.5 2.5h-4c0-1-.7-1.9-1.5-2.5Z"/>',
    check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16.5 9"/>',
    phone:'<path d="M7 3h3l1.5 4-2 1.5a16 16 0 0 0 6 6l1.5-2L21 14v3c0 2-1.5 4-4 4C9.3 21 3 14.7 3 7c0-2.5 2-4 4-4Z"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>'
  };
  const icon=(name,cls='r101-icon')=>`<span class="${cls}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.book}</svg></span>`;
  const prepend=(el,name,cls='r101-icon')=>{if(el&&!el.querySelector(':scope > .r101-icon,:scope > .r101-icon-tile,:scope > .r101-mini-icon'))el.insertAdjacentHTML('afterbegin',icon(name,cls));};

  ['route','palette','portfolio'].forEach((name,i)=>prepend(document.querySelectorAll('.art-hero-facts>div')[i],name,'r101-icon-tile'));
  ['route','palette'].forEach((name,i)=>prepend(document.querySelectorAll('.art-route')[i],name,'r101-route-icon r101-icon'));
  document.querySelectorAll('.art-school-strip>div').forEach(el=>prepend(el,'building','r101-mini-icon'));
  ['book','language','pencil','layers','target','clock'].forEach((name,i)=>prepend(document.querySelectorAll('.art-course-overview>div')[i],name,'r101-icon-tile'));
  ['palette','portfolio','monitor','graduation'].forEach((name,i)=>prepend(document.querySelectorAll('.art-price-group summary')[i],name,'r101-summary-icon r101-icon'));
  ['clipboard','brush','bulb','check'].forEach((name,i)=>prepend(document.querySelectorAll('.art-portfolio-guide>div')[i],name,'r101-icon-tile'));
  prepend(document.querySelector('.art-route-note'),'route','r101-mini-icon');
  const contacts=document.querySelectorAll('.art-contact-lines a');
  prepend(contacts[0],'phone','r101-contact-icon r101-icon');
  prepend(contacts[1],'mail','r101-contact-icon r101-icon');
  document.querySelectorAll('.art-work-head h3').forEach((el,i)=>prepend(el,i===0?'portfolio':'palette','r101-mini-icon'));

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

  /* Gallery controls and lightbox are below the fold. Initialize them near the viewport or during idle time. */
  let worksReady=false;
  const initWorks=()=>{
    if(worksReady)return;
    worksReady=true;

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
  };

  const teamworks=document.querySelector('#teamworks');
  if('IntersectionObserver' in window&&teamworks){
    const nearWorks=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){
        nearWorks.disconnect();
        initWorks();
      }
    },{rootMargin:'650px 0px'});
    nearWorks.observe(teamworks);
  }
  if('requestIdleCallback' in window)requestIdleCallback(initWorks,{timeout:1600});
  else setTimeout(initWorks,180);
})();
