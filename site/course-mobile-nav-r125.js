(()=>{
  if(!window.matchMedia('(max-width: 820px)').matches)return;
  if(document.documentElement.dataset.courseMobileNavR125)return;
  document.documentElement.dataset.courseMobileNavR125='1';

  if(!document.querySelector('link[data-course-mobile-r124]')){
    const mobile=document.createElement('link');
    mobile.rel='stylesheet';
    mobile.href='course-mobile-r124.css?v=20260828r125';
    mobile.media='(max-width:820px)';
    mobile.dataset.courseMobileR124='';
    document.head.append(mobile);
  }

  const shell=document.querySelector('.course-top .course-shell');
  const legacyNav=shell?.querySelector('.course-links');
  if(!shell||!legacyNav)return;

  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  const courses=[
    ['kyotsu.html','01','共通考试','大学入学共通テスト'],
    ['eju.html','02','EJU 一对一','按志望校与当前成绩安排'],
    ['school.html','03','校内考对策','笔试・文书・面试'],
    ['art.html','04','美术升学','实技・作品集・面试']
  ];
  const current=courses.find(([href])=>page===href)?.[2]||legacyNav.querySelector('.active')?.textContent.trim()||'课程';

  const style=document.createElement('style');
  style.dataset.courseMobileNavR125='';
  style.textContent=`
    @media(max-width:820px){
      body.course-page.course-menu-open{overflow:hidden!important}
      .course-top{z-index:90!important}
      .course-top .course-shell{display:grid!important;grid-template-columns:auto minmax(0,1fr) 42px!important;align-items:center!important;gap:10px!important}
      .course-top .course-links{display:none!important}
      .course-mobile-current{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#4f6874;font-size:11px;font-weight:750;letter-spacing:.01em}
      .course-mobile-menu-trigger{appearance:none;display:grid;place-items:center;width:42px;height:42px;margin-right:-5px;padding:0;border:0;background:transparent;color:#173f55;cursor:pointer}
      .course-mobile-menu-trigger>span{position:relative;display:block;width:20px;height:14px}
      .course-mobile-menu-trigger i{position:absolute;left:0;width:20px;height:1.5px;background:currentColor;transform-origin:center;transition:transform .18s ease,top .18s ease,opacity .14s ease}
      .course-mobile-menu-trigger i:nth-child(1){top:1px}.course-mobile-menu-trigger i:nth-child(2){top:6px}.course-mobile-menu-trigger i:nth-child(3){top:11px}
      .course-mobile-menu-trigger[aria-expanded='true'] i:nth-child(1){top:6px;transform:rotate(45deg)}
      .course-mobile-menu-trigger[aria-expanded='true'] i:nth-child(2){opacity:0}
      .course-mobile-menu-trigger[aria-expanded='true'] i:nth-child(3){top:6px;transform:rotate(-45deg)}
      .course-mobile-menu-backdrop{position:fixed;z-index:82;inset:58px 0 0;background:rgba(7,31,43,.24);opacity:0;visibility:hidden;transition:opacity .18s ease,visibility .18s ease}
      .course-mobile-menu-backdrop.is-open{opacity:1;visibility:visible}
      .course-mobile-menu-panel{position:fixed;z-index:89;top:66px;right:14px;width:min(326px,calc(100vw - 28px));max-height:calc(100svh - 80px);overflow:auto;background:#fff;border-top:2px solid #173f55;border-bottom:1px solid #cbd8dd;box-shadow:0 20px 54px rgba(8,35,48,.18);opacity:0;visibility:hidden;transform:translateY(-7px);transition:opacity .18s ease,transform .18s ease,visibility .18s ease}
      .course-mobile-menu-panel.is-open{opacity:1;visibility:visible;transform:none}
      .course-mobile-menu-head{display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding:16px 17px 11px;border-bottom:1px solid #dce5e8}
      .course-mobile-menu-head b{color:#173f55;font-size:14px}.course-mobile-menu-head span{color:#8b9ca4;font-size:8.5px;font-weight:800;letter-spacing:.12em}
      .course-mobile-menu-overview{display:flex;align-items:center;justify-content:space-between;min-height:44px;padding:0 17px;border-bottom:1px solid #e4eaed;color:#54707c;font-size:10.5px;font-weight:750;text-decoration:none;background:#f8fafb}
      .course-mobile-menu-overview::after{content:'→';color:#6f909e}
      .course-mobile-menu-list{display:grid}
      .course-mobile-menu-course{display:grid;grid-template-columns:27px minmax(0,1fr) auto;grid-template-rows:auto auto;gap:1px 9px;align-items:center;min-height:61px;padding:10px 17px;border-bottom:1px solid #e5ebee;color:inherit;text-decoration:none;background:#fff}
      .course-mobile-menu-course .n{grid-row:1/3;color:#91a2a9;font-size:8.5px;font-weight:800;letter-spacing:.06em}
      .course-mobile-menu-course strong{color:#315767;font-size:12.5px;line-height:1.35}
      .course-mobile-menu-course small{color:#82949c;font-size:8.8px;line-height:1.4}
      .course-mobile-menu-course em{grid-column:3;grid-row:1/3;color:#6d8d9a;font-size:8.4px;font-style:normal;font-weight:800}
      .course-mobile-menu-course.is-current{background:#eef4f6}
      .course-mobile-menu-course.is-current strong{color:#10384a}
      .course-mobile-menu-sites{display:grid;grid-template-columns:1fr 1fr;padding:10px 17px 13px;background:#fbfcfc}
      .course-mobile-menu-sites span{grid-column:1/3;margin-bottom:4px;color:#91a1a8;font-size:8px;font-weight:800;letter-spacing:.1em}
      .course-mobile-menu-sites a{padding:7px 0;color:#667e88;font-size:10px;font-weight:700;text-decoration:none}
      .course-mobile-menu-sites a:nth-of-type(even){padding-left:13px;border-left:1px solid #e1e8eb}
    }
    @media(prefers-reduced-motion:reduce){
      .course-mobile-menu-trigger i,.course-mobile-menu-backdrop,.course-mobile-menu-panel{transition:none!important}
    }
  `;
  document.head.append(style);

  legacyNav.setAttribute('aria-hidden','true');

  const currentLabel=document.createElement('span');
  currentLabel.className='course-mobile-current';
  currentLabel.textContent=current;
  legacyNav.before(currentLabel);

  const trigger=document.createElement('button');
  trigger.className='course-mobile-menu-trigger';
  trigger.type='button';
  trigger.setAttribute('aria-label','打开课程菜单');
  trigger.setAttribute('aria-controls','courseMobileMenuR125');
  trigger.setAttribute('aria-expanded','false');
  trigger.innerHTML='<span aria-hidden="true"><i></i><i></i><i></i></span>';
  shell.append(trigger);

  const backdrop=document.createElement('div');
  backdrop.className='course-mobile-menu-backdrop';
  backdrop.hidden=false;

  const panel=document.createElement('nav');
  panel.id='courseMobileMenuR125';
  panel.className='course-mobile-menu-panel';
  panel.setAttribute('aria-label','课程与官网导航');
  panel.setAttribute('aria-hidden','true');
  panel.innerHTML=`
    <div class="course-mobile-menu-head"><b>课程</b><span>COURSES</span></div>
    <a class="course-mobile-menu-overview" href="index.html#programs">课程总览</a>
    <div class="course-mobile-menu-list">
      ${courses.map(([href,n,title,meta])=>`<a class="course-mobile-menu-course${page===href?' is-current':''}" href="${href}"${page===href?' aria-current="page"':''}><span class="n">${n}</span><strong>${title}</strong><small>${meta}</small><em>${page===href?'当前':'→'}</em></a>`).join('')}
    </div>
    <div class="course-mobile-menu-sites"><span>官网</span><a href="index.html">首页</a><a href="index.html#results">合格实绩</a><a href="index.html#faculty">授课团队</a><a href="index.html#contact">升学咨询</a></div>`;

  document.body.append(backdrop,panel);

  let lastFocus=null;
  const setOpen=open=>{
    trigger.setAttribute('aria-expanded',String(open));
    trigger.setAttribute('aria-label',open?'关闭课程菜单':'打开课程菜单');
    panel.setAttribute('aria-hidden',String(!open));
    panel.classList.toggle('is-open',open);
    backdrop.classList.toggle('is-open',open);
    document.body.classList.toggle('course-menu-open',open);
    if(open){lastFocus=document.activeElement;panel.querySelector('a')?.focus({preventScroll:true});}
    else if(lastFocus===trigger||panel.contains(lastFocus))trigger.focus({preventScroll:true});
  };
  trigger.addEventListener('click',()=>setOpen(trigger.getAttribute('aria-expanded')!=='true'));
  backdrop.addEventListener('click',()=>setOpen(false));
  panel.addEventListener('click',event=>{if(event.target.closest('a'))setOpen(false);});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&trigger.getAttribute('aria-expanded')==='true')setOpen(false);});
  window.addEventListener('resize',()=>{if(window.innerWidth>820)setOpen(false);},{passive:true});
})();
