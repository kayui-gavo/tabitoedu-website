(()=>{
  if(document.documentElement.dataset.courseVisualR101)return;
  document.documentElement.dataset.courseVisualR101='1';

  const paths={
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    person:'<circle cx="12" cy="8" r="3"/><path d="M5 21c.7-4 3.2-6 7-6s6.3 2 7 6"/>',
    building:'<path d="M4 21V8l8-4 8 4v13M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-4h4v4"/>',
    route:'<circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18c5 0 2-7 7-7h3M9 6H5a2 2 0 0 0-2 2v4"/>',
    palette:'<path d="M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a1.5 1.5 0 0 1 0-3h2a7 7 0 0 0-2-10Z"/><circle cx="7.5" cy="9" r=".8" fill="currentColor" stroke="none"/><circle cx="10" cy="6.5" r=".8" fill="currentColor" stroke="none"/><circle cx="14" cy="6.5" r=".8" fill="currentColor" stroke="none"/>',
    portfolio:'<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M9 5V3h6v2M8 11h8M8 15h5"/>',
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
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    file:'<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>',
    wallet:'<path d="M4 6h14a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2V7a3 3 0 0 1 3-3h11"/><path d="M15 11h6v4h-6a2 2 0 1 1 0-4Z"/>',
    edit:'<path d="M4 20h4l11-11-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
    ticket:'<path d="M4 7h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4V7Z"/><path d="M12 9v2M12 13v2M12 17v1"/>',
    map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/>',
    flag:'<path d="M6 21V4M6 5h10l-2 3 2 3H6"/>',
    calculator:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h1M8 15h2M12 15h2M16 15h1M8 18h2M12 18h5"/>',
    atom:'<circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>',
    code:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    list:'<path d="M9 6h11M9 12h11M9 18h11"/><path d="m4 6 1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>'
  };
  const icon=(name,cls='r101-icon')=>`<span class="${cls}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.book}</svg></span>`;
  const prepend=(el,name,cls='r101-icon')=>{if(el&&!el.querySelector(':scope > .r101-icon,:scope > .r101-icon-tile,:scope > .r101-mini-icon'))el.insertAdjacentHTML('afterbegin',icon(name,cls));};

  if(document.body.classList.contains('art-page')){
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
  }

  if(document.body.classList.contains('kyotsu-page')){
    ['calendar','globe','person','building'].forEach((name,i)=>prepend(document.querySelectorAll('.kyotsu-hero-facts>div')[i],name,'r101-icon-tile'));
    prepend(document.querySelector('.kyotsu-definition>small'),'book','r101-mini-icon');

    const definition=document.querySelector('.kyotsu-definition');
    if(definition&&!definition.querySelector('.kyotsu-use-strip')){
      const strip=document.createElement('div');
      strip.className='kyotsu-use-strip';
      strip.innerHTML=`<span class="kyotsu-use-label">常见使用方式</span><span>${icon('file','r101-mini-icon')}一般选拔</span><span>${icon('check','r101-mini-icon')}共通テスト利用</span>`;
      definition.append(strip);
    }

    const routeLines=document.querySelectorAll('.kyotsu-route-line');
    prepend(routeLines[0],'route','r101-mini-icon');
    prepend(routeLines[1],'check','r101-mini-icon');

    ['person','file','wallet','edit','ticket','calendar','calendar'].forEach((name,i)=>{
      const label=document.querySelectorAll('.kyotsu-schedule-item b')[i];
      prepend(label,name,'r101-mini-icon');
    });
    prepend(document.querySelector('.kyotsu-schedule-status'),'clock','r101-mini-icon');

    ['book','map','flag','calculator','atom','language','code'].forEach((name,i)=>{
      const box=document.querySelectorAll('.kyotsu-subject-group header>div')[i];
      prepend(box,name,'r101-icon-tile');
    });

    prepend(document.querySelector('.kyotsu-fee-lead'),'wallet','r101-icon-tile');
    ['file','list','calendar'].forEach((name,i)=>{
      const box=document.querySelectorAll('.kyotsu-planning-lines li>div')[i];
      prepend(box,name,'r101-mini-icon');
    });
  }
})();
