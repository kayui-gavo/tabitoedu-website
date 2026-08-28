(()=>{
  if(document.documentElement.dataset.courseDetailR110)return;
  document.documentElement.dataset.courseDetailR110='1';

  if(!document.querySelector('link[data-course-mobile-r124]')){
    const mobile=document.createElement('link');
    mobile.rel='stylesheet';
    mobile.href='course-mobile-r124.css?v=20260828r124';
    mobile.media='(max-width:820px)';
    mobile.dataset.courseMobileR124='';
    document.head.append(mobile);
  }
  if(window.matchMedia('(max-width:820px)').matches&&!document.querySelector('script[data-course-mobile-nav-r125]')){
    const mobileNav=document.createElement('script');
    mobileNav.src='course-mobile-nav-r125.js?v=20260828r125';
    mobileNav.dataset.courseMobileNavR125='';
    document.body.append(mobileNav);
  }

  const paths={
    person:'<circle cx="12" cy="8" r="3"/><path d="M5 21c.7-4 3.2-6 7-6s6.3 2 7 6"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    clipboard:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M8 9h8M8 13h8M8 17h5"/>',
    book:'<path d="M4 5.5A3.5 3.5 0 0 1 7.5 4H12v16H7.5A3.5 3.5 0 0 0 4 21.5V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 4H12v16h4.5a3.5 3.5 0 0 1 3.5 1.5V5.5Z"/>',
    file:'<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>',
    pencil:'<path d="m4 20 4.5-1 10-10-3.5-3.5-10 10L4 20Z"/><path d="m13.5 7 3.5 3.5"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
    check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16.5 9"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    calculator:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h1M8 15h2M12 15h2M16 15h1M8 18h2M12 18h5"/>',
    graduation:'<path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12v4c3 2 7 2 10 0v-4M21 9v6"/>',
    layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
    route:'<circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18c5 0 2-7 7-7h3M9 6H5a2 2 0 0 0-2 2v4"/>'
  };
  const icon=(name,cls='detail-icon')=>`<span class="${cls}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.book}</svg></span>`;
  const prepend=(el,name,cls='detail-icon')=>{
    if(el&&!el.querySelector(':scope > .detail-icon,:scope > .detail-icon-tile,:scope > .detail-mini-icon'))el.insertAdjacentHTML('afterbegin',icon(name,cls));
  };

  if(document.body.classList.contains('eju-page')){
    ['person','target','clipboard'].forEach((name,i)=>prepend(document.querySelectorAll('.eju-hero-facts>div')[i],name,'detail-icon-tile'));
    ['book','file','person'].forEach((name,i)=>prepend(document.querySelectorAll('.eju-scope-grid article')[i],name,'detail-icon-tile'));
    ['target','check','clipboard','person'].forEach((name,i)=>prepend(document.querySelectorAll('.eju-plan li')[i],name,'detail-mini-icon'));
    ['check','clock'].forEach((name,i)=>prepend(document.querySelectorAll('.eju-case-grid h3')[i],name,'detail-mini-icon'));
  }

  if(document.body.classList.contains('school-course-page')){
    ['file','pencil','clipboard','person'].forEach((name,i)=>prepend(document.querySelectorAll('.school-hero-facts>div')[i],name,'detail-icon-tile'));
    ['file','pencil','person'].forEach((name,i)=>prepend(document.querySelectorAll('.school-prep-grid>div')[i],name,'detail-icon-tile'));
    ['calculator','clipboard','person','graduation'].forEach((name,i)=>prepend(document.querySelectorAll('.case-detail>div')[i],name,'detail-mini-icon'));
    ['pencil','file','person','layers'].forEach((name,i)=>prepend(document.querySelectorAll('.school-scope-grid>div')[i],name,'detail-icon-tile'));
    prepend(document.querySelector('.school-written-copy h4'),'calculator','detail-mini-icon');
    prepend(document.querySelectorAll('.proof-row-copy h4')[0],'person','detail-mini-icon');
    prepend(document.querySelectorAll('.proof-row-copy h4')[1],'check','detail-mini-icon');
  }

  const nav=document.querySelector('.eju-jumpnav,.school-jumpnav');
  if(nav){
    const links=[...nav.querySelectorAll('a[href^="#"]')];
    const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const setCurrent=id=>links.forEach(a=>a.classList.toggle('is-current',a.getAttribute('href')===`#${id}`));
    const update=()=>{
      const offset=(window.innerWidth<=820?118:128);
      let current=sections[0];
      for(const section of sections){if(section.getBoundingClientRect().top<=offset)current=section;else break;}
      if(current)setCurrent(current.id);
    };
    let ticking=false;
    const requestUpdate=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{update();ticking=false;});};
    addEventListener('scroll',requestUpdate,{passive:true});
    addEventListener('resize',requestUpdate,{passive:true});
    links.forEach(a=>a.addEventListener('click',()=>setCurrent(a.getAttribute('href').slice(1))));
    update();
  }
})();