(() => {
  'use strict';

  const home=document.getElementById('home');
  const art=document.getElementById('art');
  const kyotsu=document.getElementById('kyotsu');
  const eju=document.getElementById('eju');

  const go=(page,id)=>{
    window.showPage?.(page);
    if(id) window.setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}),80);
  };

  function bindRouteLinks(root=document){
    root.querySelectorAll('[data-finish-page]').forEach(el=>{
      if(el.dataset.finishBound==='1') return;
      el.dataset.finishBound='1';
      el.addEventListener('click',ev=>{
        ev.preventDefault();
        go(el.dataset.finishPage,el.dataset.finishTarget||'');
      });
    });
  }

  function removeFormerTeacher(){
    const candidates=new Set();
    document.querySelectorAll('img[src*="teacher_li.jpg"],img[alt="李老师"]').forEach(img=>candidates.add(img));
    document.querySelectorAll('h3,h4,.v5-faculty-name,.v3-teacher-card').forEach(el=>{
      if((el.textContent||'').replace(/\s+/g,'').includes('李老师')) candidates.add(el);
    });
    candidates.forEach(el=>{
      const card=el.closest('.v5-faculty-row,.v3-teacher-card,.feature-card,article,div.bg-white[class*="rounded-"]');
      if(card) card.remove();
      else el.remove();
    });
  }

  function compactPrimaryNavigation(){
    const nav=document.querySelector('nav.fixed');
    const desktop=nav?.querySelector('.hidden.md\\:flex');
    const mobile=document.querySelector('#mobileMenu .flex.flex-col');
    const items=[
      ['首页','home',''],
      ['美术升学','art',''],
      ['共通考试','kyotsu',''],
      ['EJU・校内考','eju',''],
      ['合格实绩','home','results'],
      ['中野教室','home','nakano-classroom'],
      ['升学咨询','home','contact']
    ];
    const render=(isMobile=false)=>items.map(([label,page,target],i)=>`<a href="#" class="${isMobile?'finish-mobile-nav':'finish-nav-link'}${i===items.length-1&&!isMobile?' finish-nav-cta':''}" data-finish-page="${page}"${target?` data-finish-target="${target}"`:''}>${label}</a>`).join('');
    if(desktop){desktop.innerHTML=render(false);desktop.classList.add('finish-nav');bindRouteLinks(desktop);}
    if(mobile){mobile.innerHTML=render(true);bindRouteLinks(mobile);mobile.querySelectorAll('[data-finish-page]').forEach(a=>a.addEventListener('click',()=>window.toggleMobileMenu?.()));}
  }

  function rebuildHeroRouteIndex(){
    const box=home?.querySelector('.v7-hero-index');
    if(!box) return;
    box.classList.add('finish-hero-index');
    box.innerHTML=`
      <header><span>升学路线</span><strong>4 个主要项目</strong></header>
      <button type="button" data-finish-page="art"><span><strong>美术升学</strong><small>实技・作品集・专业方向</small></span><i>→</i></button>
      <button type="button" data-finish-page="kyotsu"><span><strong>共通考试</strong><small>按科课程・升学申请支持</small></span><i>→</i></button>
      <button type="button" data-finish-page="eju"><span><strong>EJU 一对一</strong><small>按个人报考计划推进</small></span><i>→</i></button>
      <button type="button" data-finish-page="eju" data-finish-target="school-exam-programs"><span><strong>校内考对策</strong><small>按目标校开设专项・小班</small></span><i>→</i></button>
      <footer><span>东京・中野实体教室</span><span>线上课程同步</span></footer>`;
    bindRouteLinks(box);
  }

  function rebuildProgramMatrix(){
    const section=home?.querySelector('#programs');
    if(!section||section.querySelector('.finish-program-matrix')) return;
    const oldGrid=section.querySelector('.grid');
    if(!oldGrid) return;
    oldGrid.classList.add('finish-original-program-grid');
    oldGrid.setAttribute('aria-hidden','true');

    const matrix=document.createElement('div');
    matrix.className='finish-program-matrix';
    matrix.innerHTML=`
      <article class="finish-program finish-program--art">
        <div class="finish-program-media finish-program-art-media" aria-label="美术学生作品节选">
          <img src="images/student-work-illustration-city.png" alt="旅人教育美术学生插画作品" loading="lazy">
          <img src="images/student-work-bust-charcoal.jpg" alt="旅人教育美术学生素描作品" loading="lazy">
          <img src="images/student-work-stilllife-wires.png" alt="旅人教育美术学生静物作品" loading="lazy">
        </div>
        <div class="finish-program-copy"><span>美术升学</span><h3>作品与实技准备</h3><p>实技、作品集、专业方向与面试按目标校组合。</p><a href="#" data-finish-page="art">查看美术课程 →</a></div>
      </article>
      <article class="finish-program finish-program--common">
        <div class="finish-program-media finish-program-proof finish-program-proof--common" aria-label="2026 共通考试课程资料"><div class="v8-common-poster" aria-hidden="true"></div><b>2026 共通テスト</b></div>
        <div class="finish-program-copy"><span>共通考试</span><h3>按科报名</h3><p>14,000 元 / 科；4 科及以上免材料费，并提供申请支持。</p><a href="#" data-finish-page="kyotsu">查看课程与费用 →</a></div>
      </article>
      <article class="finish-program finish-program--eju">
        <div class="finish-program-media finish-one-to-one" aria-label="EJU 一对一"><strong>1 : 1</strong><span>EJU</span><small>目前仅接一对一</small></div>
        <div class="finish-program-copy"><span>EJU</span><h3>一对一个人计划</h3><p>围绕科目、目标校、出愿与面试，按个人报考计划安排。</p><a href="#" data-finish-page="eju">查看 EJU 一对一 →</a></div>
      </article>
      <article class="finish-program finish-program--school">
        <div class="finish-program-media finish-program-proof finish-program-proof--school" aria-label="东京科学大学专项实际教学资料"><div class="v8-case-visual" aria-hidden="true"></div><b>校内考实际教学资料</b></div>
        <div class="finish-program-copy"><span>校内考</span><h3>按目标校开设</h3><p>根据笔试科目、题型与面试要求开设专项或小班。</p><a href="#" data-finish-page="eju" data-finish-target="school-exam-programs">查看校内考案例 →</a></div>
      </article>`;
    oldGrid.insertAdjacentElement('beforebegin',matrix);
    bindRouteLinks(matrix);

    const title=section.querySelector('h2');
    const intro=title?.parentElement?.querySelector('p');
    if(title) title.textContent='课程与升学项目';
    if(intro) intro.textContent='先确认目标校和选拔方式，再进入对应课程。四类业务分开查看，避免把 EJU 与校内考混成同一套课程。';
  }

  function refineHomeProof(){
    const faculty=home?.querySelector('#faculty');
    if(faculty){
      const h=faculty.querySelector('.v5-section-head h2');
      const p=faculty.querySelector('.v5-section-head p:not(.v3-kicker)');
      if(h) h.textContent='部分讲师介绍';
      if(p) p.textContent='按学校背景与担当科目快速确认授课方向。这里只展示部分讲师，具体排课以当期课程为准。';
      const idx=faculty.querySelector('.v9-subject-index');
      if(idx) idx.setAttribute('aria-label','主要授课科目');
    }

    const method=home?.querySelector('#how-we-work h2');
    if(method) method.textContent='升学准备的四个步骤';

    const results=home?.querySelector('#results');
    const title=results?.querySelector('.v3-title');
    if(title) title.textContent='合格实绩';
  }

  function prioritizeSubpageInformation(){
    if(kyotsu){
      const nav=kyotsu.querySelector('.v10-local-nav')||kyotsu.querySelector('.v10-snapshot');
      const course=kyotsu.querySelector('#common-course-2026');
      if(nav&&course&&nav.nextElementSibling!==course) nav.insertAdjacentElement('afterend',course);
      const snap=kyotsu.querySelector('.v10-snapshot--common');
      if(snap){
        const h=snap.querySelector('h2');
        const p=snap.querySelector('.v10-snapshot-copy>p');
        if(h) h.textContent='共通考试｜对象、科目、费用先确认';
        if(p) p.textContent='先确认目标校是否利用共通成绩，再决定报考科目。课程、收费与申请支持集中展示，制度背景按需展开。';
      }
    }
    if(eju){
      const nav=eju.querySelector('.v10-local-nav')||eju.querySelector('.v10-snapshot');
      const program=eju.querySelector('#school-exam-programs');
      if(nav&&program&&nav.nextElementSibling!==program) nav.insertAdjacentElement('afterend',program);
    }
  }

  function refineArtPortfolio(){
    if(!art) return;
    const mosaic=art.querySelector('.v11-student-mosaic');
    if(mosaic) mosaic.setAttribute('aria-label','学生作品选集');
    const more=art.querySelector('.v11-gallery-more>summary');
    if(more) more.textContent=more.textContent.replace('查看全部教师作品','展开教师作品集');
  }

  function refineClassroom(){
    const classroom=home?.querySelector('#nakano-classroom');
    if(!classroom) return;
    const title=classroom.querySelector('h2');
    const brand=classroom.querySelector('.v7-tabito-head p');
    if(title) title.textContent='东京・中野教室';
    if(brand) brand.textContent='中国旅人教育集团株式会社';
  }

  function refineInstitutionHub(){
    const hub=home?.querySelector('#institution');
    if(!hub) return;
    const p=hub.querySelector('.v11-institution-head p');
    if(p) p.textContent='公司信息、升学资讯与兼职讲师招聘集中收纳，主阅读动线保持简洁。';
  }

  function refineContact(){
    const contact=home?.querySelector('#contact');
    if(!contact) return;
    const h=contact.querySelector('h2');
    const p=h?.parentElement?.querySelector('p');
    if(h) h.textContent='升学咨询';
    if(p) p.textContent='告诉我们目标校、当前成绩和预计入学时间。先确认考试路线与准备顺序，再决定课程。';
    if(p&&!contact.querySelector('.finish-contact-facts')){
      p.insertAdjacentHTML('afterend','<div class="finish-contact-facts"><span><b>目标校</b>学校・学部・入试方式</span><span><b>当前成绩</b>EJU / 共通 / 校内考基础</span><span><b>时间</b>预计入学年度・考试节点</span></div>');
    }
  }

  function reorderHome(){
    if(!home) return;
    const hero=home.querySelector('.v8-hero')||home.querySelector('section.hero-bg');
    if(!hero) return;
    const sequence=[
      home.querySelector('.v8-trust-bar'),
      home.querySelector('#programs'),
      home.querySelector('#results'),
      home.querySelector('.v8-case'),
      home.querySelector('#how-we-work'),
      home.querySelector('#faculty'),
      home.querySelector('.v8-insight'),
      home.querySelector('#nakano-classroom'),
      home.querySelector('#institution'),
      home.querySelector('#contact')
    ].filter(Boolean);
    let anchor=hero;
    sequence.forEach(section=>{anchor.insertAdjacentElement('afterend',section);anchor=section;});
  }

  function protectMobileConsultation(){
    const floating=document.querySelector('.v11-floating-consult');
    const contact=home?.querySelector('#contact');
    if(!floating||!contact||!('IntersectionObserver' in window)) return;
    const observer=new IntersectionObserver(entries=>{
      floating.classList.toggle('finish-consult-hidden',entries.some(x=>x.isIntersecting));
    },{threshold:.08});
    observer.observe(contact);
  }

  function init(){
    removeFormerTeacher();
    compactPrimaryNavigation();
    rebuildHeroRouteIndex();
    rebuildProgramMatrix();
    refineHomeProof();
    prioritizeSubpageInformation();
    refineArtPortfolio();
    refineClassroom();
    refineInstitutionHub();
    refineContact();
    reorderHome();
    protectMobileConsultation();
    bindRouteLinks();
    document.documentElement.classList.add('tabito-finishing');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
