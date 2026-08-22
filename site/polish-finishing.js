(() => {
  'use strict';

  const home=document.getElementById('home');
  const art=document.getElementById('art');
  const kyotsu=document.getElementById('kyotsu');
  const eju=document.getElementById('eju');
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
  const text=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const findSection=(root,re)=>[...root?.querySelectorAll('section')||[]].find(s=>[...s.querySelectorAll('h2,h3')].some(h=>re.test(text(h))));
  const icon=k=>`<span class="finish-lineicon finish-lineicon--${k}" aria-hidden="true"></span>`;

  function activePage(){return document.querySelector('.page-section.active')?.id||'home';}
  function go(page,id=''){
    window.showPage?.(page);
    window.setTimeout(()=>{
      if(id)document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
      syncNav(page,id);
    },80);
  }
  function bindRouteLinks(root=document){
    root.querySelectorAll('[data-finish-page]').forEach(el=>{
      if(el.dataset.finishBound==='1')return;
      el.dataset.finishBound='1';
      el.addEventListener('click',ev=>{ev.preventDefault();go(el.dataset.finishPage,el.dataset.finishTarget||'');});
    });
  }

  function removeFormerTeacher(){
    const hits=new Set();
    document.querySelectorAll('img[src*="teacher_li.jpg"],img[alt="李老师"]').forEach(el=>hits.add(el));
    document.querySelectorAll('h2,h3,h4,.v5-faculty-name,.v3-teacher-card').forEach(el=>{if(text(el).replace(/\s+/g,'').includes('李老师'))hits.add(el);});
    hits.forEach(el=>{const card=el.closest('.v5-faculty-row,.v3-teacher-card,.feature-card,article,div.bg-white[class*="rounded-"]');(card||el).remove();});
  }

  function naturalizeLegacyCopy(){
    const exact=new Map([
      ['专业升学服务','升学课程'],
      ['专业师资团队','部分讲师介绍'],
      ['什么是共通考试？','共通考试简介'],
      ['外国人留学生也可以参加！','外国人留学生的报考资格'],
      ['为什么共通考试对中国学生有优势？','共通考试的特点'],
      ['开启你的美术之路','美术升学咨询']
    ]);
    document.querySelectorAll('h1,h2,h3,h4,p').forEach(el=>{const t=text(el);if(exact.has(t))el.textContent=exact.get(t);});
    document.querySelectorAll('p').forEach(p=>{
      const t=text(p);
      if(t==='根据每位学生的背景和兴趣，提供个性化的升学指导方案')p.textContent='根据目标校、报考方式和当前进度安排课程。';
      if(t==='名校毕业的专业导师，为你的升学之路保驾护航')p.textContent='以下为部分讲师，具体担当以当期排课为准。';
    });
  }

  function compactPrimaryNavigation(){
    const nav=document.querySelector('nav.fixed');
    const desktop=nav?.querySelector('.hidden.md\\:flex');
    const mobile=document.querySelector('#mobileMenu .flex.flex-col');
    const items=[
      ['美术升学','art',''],['共通考试','kyotsu',''],['EJU・校内考','eju',''],['合格实绩','home','results'],['讲师','home','faculty'],['中野教室','home','nakano-classroom'],['升学咨询','home','contact']
    ];
    const render=isMobile=>items.map(([label,page,target],i)=>`<a href="#" class="${isMobile?'finish-mobile-nav':'finish-nav-link'}${i===items.length-1&&!isMobile?' finish-nav-cta':''}" data-finish-page="${page}" data-finish-target="${target}" data-nav-page="${page}" data-nav-target="${target}">${label}</a>`).join('');
    if(desktop){desktop.innerHTML=render(false);desktop.className='hidden md:flex finish-nav';bindRouteLinks(desktop);}
    if(mobile){mobile.innerHTML=render(true);bindRouteLinks(mobile);mobile.querySelectorAll('[data-finish-page]').forEach(a=>a.addEventListener('click',()=>window.toggleMobileMenu?.()));}
    if(nav&&!nav.querySelector('.finish-scroll-progress'))nav.insertAdjacentHTML('beforeend','<div class="finish-scroll-progress" aria-hidden="true"><i></i></div>');
    syncNav(activePage(),'');
  }
  function syncNav(page,target=''){
    document.querySelectorAll('[data-nav-page]').forEach(a=>{
      const on=(target&&a.dataset.navPage===page&&a.dataset.navTarget===target)||(!target&&a.dataset.navPage===page&&!a.dataset.navTarget);
      a.classList.toggle('is-current',!!on);
      if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    });
  }
  function setupScrollProgress(){
    const bar=document.querySelector('.finish-scroll-progress i');if(!bar)return;
    let ticking=false;
    const draw=()=>{const doc=document.documentElement;const max=Math.max(1,doc.scrollHeight-innerHeight);bar.style.transform=`scaleX(${Math.min(1,Math.max(0,scrollY/max))})`;ticking=false;};
    addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(draw);ticking=true;}},{passive:true});draw();
    const observer=new MutationObserver(()=>{syncNav(activePage(),'');requestAnimationFrame(draw);});
    document.querySelectorAll('.page-section').forEach(p=>observer.observe(p,{attributes:true,attributeFilter:['class']}));
  }
  function setupHomeSectionSpy(){
    if(!home||!('IntersectionObserver'in window))return;
    const targets=['results','faculty','nakano-classroom','contact'].map(id=>document.getElementById(id)).filter(Boolean);
    const io=new IntersectionObserver(entries=>{
      if(activePage()!=='home')return;
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible)syncNav('home',visible.target.id);
    },{rootMargin:'-22% 0px -58%',threshold:[.05,.2,.4]});
    targets.forEach(x=>io.observe(x));
  }

  function refineHero(){
    if(!home)return;
    const hero=home.querySelector('.v8-hero')||home.querySelector('section.hero-bg');if(!hero)return;
    hero.classList.add('finish-hero');
    const eyebrow=hero.querySelector('.v4-hero-eyebrow');
    const title=hero.querySelector('.v3-hero-title');
    const lede=hero.querySelector('.v3-hero-lede');
    if(eyebrow)eyebrow.textContent='日本留学升学指导｜东京・中野';
    if(title)title.innerHTML='<span class="finish-hero-main">日本本科升学指导</span><span class="finish-hero-slogan">学びの旅に、確かな道しるべを。</span>';
    if(lede)lede.textContent='面向准备日本本科升学的中国学生，提供美术升学、共通考试、EJU 一对一及校内考对策。课程与出愿安排以目标校募集要项为基础。';
    const actions=hero.querySelector('.v4-hero-actions');
    if(actions){actions.innerHTML='<a href="#" data-finish-page="home" data-finish-target="programs">课程一览</a><a href="#" data-finish-page="home" data-finish-target="results">合格实绩</a>';bindRouteLinks(actions);}
    const resultsLink=hero.querySelector('.v4-hero-results-link');
    if(resultsLink){resultsLink.textContent='中野实体教室｜支持线上授课';resultsLink.removeAttribute('href');resultsLink.removeAttribute('onclick');}
    const box=hero.querySelector('.v7-hero-index');
    if(box){
      box.className='v7-hero-index finish-hero-index';
      box.innerHTML=`<div class="finish-hero-miniatures">
          <figure><img src="images/student-work-illustration-city.png" alt="美术学生作品"><figcaption>美术</figcaption></figure>
          <figure><img src="images/hero_background_1.jpg" alt="共通考试课程视觉"><figcaption>共通</figcaption></figure>
          <figure class="finish-mini-proof"><div class="v8-case-visual" aria-hidden="true"></div><figcaption>校内考</figcaption></figure>
        </div>
        <header><span>升学项目</span><strong>按报考方式查看</strong></header>
        <div class="finish-hero-routes" role="list">
          <a href="#" role="listitem" data-finish-page="art" data-route="art">${icon('art')}<span><b>美术升学</b><small>实技・作品集・面试</small></span><i>01</i></a>
          <a href="#" role="listitem" data-finish-page="kyotsu" data-route="common">${icon('common')}<span><b>共通考试</b><small>按科课程・升学申请支持</small></span><i>02</i></a>
          <a href="#" role="listitem" data-finish-page="eju" data-route="eju">${icon('eju')}<span><b>EJU 一对一</b><small>目前仅接一对一</small></span><i>03</i></a>
          <a href="#" role="listitem" data-finish-page="eju" data-finish-target="school-exam-programs" data-route="school">${icon('school')}<span><b>校内考对策</b><small>按目标校开设专项或小班</small></span><i>04</i></a>
        </div>
        <div class="finish-hero-route-note"><span>东京・中野教室</span><span>线上授课</span></div>`;
      bindRouteLinks(box);
      box.querySelectorAll('[data-route]').forEach(a=>{const set=()=>{box.dataset.activeRoute=a.dataset.route;box.querySelectorAll('[data-route]').forEach(x=>x.classList.toggle('is-preview',x===a));};a.addEventListener('mouseenter',set);a.addEventListener('focus',set);});
    }
  }

  function buildHomeMediaRail(){
    if(!home||home.querySelector('.finish-home-media-rail'))return;
    const trust=home.querySelector('.v8-trust-bar');if(!trust)return;
    const rail=document.createElement('section');rail.className='finish-home-media-rail';
    rail.innerHTML=`<div class="finish-media-rail-grid">
      <a href="#" data-finish-page="art" class="finish-media-tile finish-media-tile--art"><img src="images/student-work-hat-stilllife.jpg" alt="美术学生作品"><span><b>美术升学</b><small>学生作品</small></span></a>
      <a href="#" data-finish-page="kyotsu" class="finish-media-tile finish-media-tile--common"><img src="images/hero_background_1.jpg" alt="共通考试课程"><span><b>共通考试</b><small>2026 课程</small></span></a>
      <a href="#" data-finish-page="eju" data-finish-target="school-exam-programs" class="finish-media-tile finish-media-tile--proof"><div class="v8-case-visual" aria-hidden="true"></div><span><b>东京科学大学</b><small>实际课程资料</small></span></a>
      <a href="#" data-finish-page="home" data-finish-target="nakano-classroom" class="finish-media-tile finish-media-tile--classroom"><img src="https://kayui-gavo.github.io/assets/tabito-classroom-v5.webp" alt="旅人教育东京中野教室"><span><b>东京・中野</b><small>实体教室</small></span></a>
    </div>`;
    trust.insertAdjacentElement('afterend',rail);bindRouteLinks(rail);
  }

  function buildProgramExplorer(){
    const section=home?.querySelector('#programs');if(!section)return;
    section.classList.add('finish-programs');
    section.querySelectorAll('.finish-program-directory,.finish-program-explorer').forEach(x=>x.remove());
    const old=section.querySelector('.finish-program-matrix,.grid');if(old)old.style.display='none';
    const title=section.querySelector('h2');const intro=title?.parentElement?.querySelector('p');
    if(title)title.textContent='课程一览';
    if(intro)intro.textContent='按报考方式查看课程内容、费用及相关教学资料。';
    const tabs=[['art','美术升学','实技・作品集・面试'],['common','共通考试','按科报名・申请支持'],['eju','EJU 一对一','目前仅接一对一'],['school','校内考对策','按目标校开设']];
    const explorer=document.createElement('div');explorer.className='finish-program-explorer';
    explorer.innerHTML=`<div class="finish-program-tabs" role="tablist" aria-label="课程路线">${tabs.map((x,i)=>`<button type="button" role="tab" aria-selected="${i===0?'true':'false'}" data-program="${x[0]}" class="${i===0?'is-active':''}">${icon(x[0])}<span>0${i+1}</span><b>${x[1]}</b><small>${x[2]}</small><i>→</i></button>`).join('')}</div>
      <div class="finish-program-stages">
        <article class="finish-program-stage is-active" data-stage="art">
          <div class="finish-program-visual finish-program-visual--art"><img src="images/student-work-illustration-city.png" alt="旅人教育美术学生插画作品"><img src="images/student-work-bust-charcoal.jpg" alt="旅人教育美术学生素描作品"><img src="images/student-work-stilllife-wires.png" alt="旅人教育美术学生静物作品"></div>
          <div class="finish-program-stage-copy"><span>美术</span><h3>美术升学</h3><p>根据目标校和专业方向安排实技、作品制作、作品说明及面试准备。</p><ul class="finish-program-points"><li><b>实技</b><span>素描・色彩・专业课</span></li><li><b>作品集</b><span>方向梳理・制作推进</span></li><li><b>面试</b><span>作品说明・志望理由</span></li></ul><a href="#" data-finish-page="art">查看美术升学课程 →</a></div>
        </article>
        <article class="finish-program-stage" data-stage="common">
          <div class="finish-program-visual finish-program-visual--proof finish-program-visual--common"><div class="v8-common-poster" aria-hidden="true"></div><span>2026 共通テスト课程</span></div>
          <div class="finish-program-stage-copy"><span>共通テスト</span><h3>共通考试课程</h3><p>课程按科报名，另提供志愿规划、报名材料准备与审核、手续指导。</p><ul class="finish-program-points"><li><b>课程费</b><span>14,000 元 / 科</span></li><li><b>材料费</b><span>5,000 元｜4 科起免</span></li><li><b>科目</b><span>数学・理科・文科・语言</span></li></ul><a href="#" data-finish-page="kyotsu">查看科目与费用 →</a></div>
        </article>
        <article class="finish-program-stage" data-stage="eju">
          <div class="finish-program-visual finish-program-visual--proof finish-program-visual--eju-photo"><div class="v8-eju-proof-image" aria-hidden="true"></div><span>EJU・校内考相关教学资料</span><b class="finish-photo-badge">1 : 1</b></div>
          <div class="finish-program-stage-copy"><span>EJU</span><h3>EJU 一对一指导</h3><p>根据目标校、报考科目和考试日程安排，并提供文书、出愿及面试准备。</p><ul class="finish-program-points"><li><b>形式</b><span>一对一</span></li><li><b>安排</b><span>按个人报考计划</span></li><li><b>支持</b><span>文书・出愿・面试</span></li></ul><a href="#" data-finish-page="eju">查看 EJU 一对一 →</a></div>
        </article>
        <article class="finish-program-stage" data-stage="school">
          <div class="finish-program-visual finish-program-visual--proof finish-program-visual--school"><div class="v8-case-visual" aria-hidden="true"></div><span>东京科学大学专项｜实际教学资料</span></div>
          <div class="finish-program-stage-copy"><span>校内考</span><h3>校内考对策</h3><p>根据目标校的笔试科目、历年题型和面试要求安排专项课程或小班。</p><ul class="finish-program-points"><li><b>2026 案例</b><span>东京科学大学</span></li><li><b>内容</b><span>数学・物理・化学・面试</span></li><li><b>最终合格</b><span>2 / 2</span></li></ul><a href="#" data-finish-page="eju" data-finish-target="school-exam-programs">查看校内考课程 →</a></div>
        </article>
      </div>`;
    const container=section.querySelector('.max-w-7xl,.max-w-6xl')||section.firstElementChild||section;container.appendChild(explorer);bindRouteLinks(explorer);
    const activate=key=>{explorer.querySelectorAll('[data-program]').forEach(b=>{const on=b.dataset.program===key;b.classList.toggle('is-active',on);b.setAttribute('aria-selected',on?'true':'false');});explorer.querySelectorAll('[data-stage]').forEach(p=>p.classList.toggle('is-active',p.dataset.stage===key));explorer.dataset.active=key;};
    const buttons=[...explorer.querySelectorAll('[data-program]')];
    buttons.forEach((b,i)=>{b.addEventListener('click',()=>activate(b.dataset.program));b.addEventListener('keydown',ev=>{if(!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft'].includes(ev.key))return;ev.preventDefault();const d=['ArrowDown','ArrowRight'].includes(ev.key)?1:-1;const n=(i+d+buttons.length)%buttons.length;buttons[n].focus();activate(buttons[n].dataset.program);});});
  }

  function proofTiles(){
    return `<div class="finish-proof-thumbs" aria-label="东京科学大学课程资料">
      <figure class="finish-proof-shot finish-proof-shot--a"><div class="v8-case-visual" aria-hidden="true"></div><figcaption>面试对策讲义</figcaption></figure>
      <figure class="finish-proof-shot finish-proof-shot--b"><div class="v8-case-visual" aria-hidden="true"></div><figcaption>原创模拟题</figcaption></figure>
      <figure class="finish-proof-shot finish-proof-shot--c"><div class="v8-case-visual" aria-hidden="true"></div><figcaption>合格记录</figcaption></figure>
    </div>`;
  }

  function buildResultsStage(){
    const results=home?.querySelector('#results');if(!results)return;
    const oldCase=home.querySelector('.v8-case');
    const evidence=oldCase?.querySelector('.v8-case-visual');
    const evidenceHTML=evidence?evidence.outerHTML:'<div class="v8-case-visual" aria-hidden="true"></div>';
    const schools=[['东京科学大学',2],['日本大学',3],['北海道大学',1],['京都产业大学',1],['神奈川工科大学',1],['中央大学',1]];
    results.className='finish-results';
    results.innerHTML=`<div class="v3-shell finish-results-shell">
      <section class="finish-results-general"><div class="finish-results-head"><div><span>截至 2026 年 4 月</span><h2>合格实绩</h2></div><div class="finish-results-numbers"><div><b>9</b><small>合格校次</small></div><div><b>6</b><small>所大学</small></div></div></div><p class="finish-results-lede">2025 年 9 月正式开课以来的合格记录。</p><div class="finish-result-list">${schools.map(([name,n])=>`<div style="--result:${n}"><span><strong>${name}</strong><i></i></span><b>${n} 名</b></div>`).join('')}</div><p class="finish-result-note">※ “合格校次”不等同于独立学生人数；同一学生取得多个合格结果时分别计入。</p></section>
      <article class="finish-flagship-case"><div class="finish-case-copy"><span>2026 东京科学大学</span><h3>理工学系<br>数理化笔试对策小班</h3><p>数学・物理・化学 / 原创模拟题 / 模拟面试</p><div class="finish-case-steps" role="tablist" aria-label="东京科学大学案例进度"><button type="button" class="is-active" data-case-step="entry"><b>2</b><small>报名</small></button><button type="button" data-case-step="written"><b>2</b><small>笔试合格</small></button><button type="button" data-case-step="final"><b>2</b><small>最终合格</small></button></div><div class="finish-case-stepnote" aria-live="polite">数学、物理、化学三科授课，并使用原创模拟题进行练习。</div><div class="finish-case-students"><span>41026 · 经营工学系</span><span>41064 · 融合理工学系</span></div><button type="button" class="finish-case-link" data-finish-page="eju" data-finish-target="school-exam-programs">查看东京科学大学课程案例 →</button></div><div class="finish-case-media"><div class="finish-proof-main">${evidenceHTML}<span>课程实际使用资料</span></div>${proofTiles()}</div></article>
      <section class="finish-success-gallery"><header><span>部分合格资料</span><small>原官网公开素材</small></header><div>${[1,2,3,4].map((n,i)=>`<figure><img src="images/success_student${n}.png" alt="合格资料 ${n}" loading="lazy"><figcaption>0${i+1}</figcaption></figure>`).join('')}</div></section>
    </div>`;
    oldCase?.remove();bindRouteLinks(results);
    const notes={entry:'数学、物理、化学三科授课，并使用原创模拟题进行练习。',written:'2 名报名学生均通过笔试。笔试后进行面试准备。',final:'2 名学生均取得最终合格：经营工学系、融合理工学系。'};
    results.querySelectorAll('[data-case-step]').forEach(b=>b.addEventListener('click',()=>{results.querySelectorAll('[data-case-step]').forEach(x=>x.classList.toggle('is-active',x===b));results.querySelector('.finish-case-stepnote').textContent=notes[b.dataset.caseStep]||'';}));
  }

  function extractFaculty(){
    const faculty=home?.querySelector('#faculty');if(!faculty)return[];
    return [...faculty.querySelectorAll('.v5-faculty-group')].map(group=>{const title=text(group.querySelector('header h3'))||'讲师';const note=text(group.querySelector('header span'));const rows=[...group.querySelectorAll('.v5-faculty-row')].map(row=>({name:text(row.querySelector('.v5-faculty-name')),school:text(row.querySelector('.v5-faculty-school')),subject:text(row.querySelector('.v5-faculty-subject')),href:row.tagName==='A'?(row.getAttribute('href')||''):''})).filter(x=>x.name&&!x.name.includes('李老师'));return{title,note,rows};}).filter(g=>g.rows.length);
  }
  function facultyRowHTML(row){const c=`<span>${esc(row.name)}</span><small>${esc(row.school)}</small><em>${esc(row.subject||'—')}</em>`;return row.href?`<a class="finish-faculty-row" href="${esc(row.href)}">${c}<b>↗</b></a>`:`<div class="finish-faculty-row">${c}<b></b></div>`;}
  function buildAcademicHub(){
    if(!home||home.querySelector('.finish-academic-hub'))return;
    const method=home.querySelector('#how-we-work');const faculty=home.querySelector('#faculty');const groups=extractFaculty();if(!method&&!faculty)return;
    const hub=document.createElement('section');hub.className='finish-academic-hub';
    hub.innerHTML=`<div class="v3-shell finish-academic-grid"><div id="how-we-work" class="finish-method-panel"><span class="finish-overline">指导流程</span><h2>从目标校确认到出愿面试</h2><p>先核对当年度募集要项，再安排科目与进度。</p><ol><li>${icon('target')}<i>01</i><b>目标校确认</b><span>募集要项・入试方式・科目</span></li><li>${icon('plan')}<i>02</i><b>科目与进度</b><span>基础・考试时间・目标分数</span></li><li>${icon('course')}<i>03</i><b>课程</b><span>数学・理科・语言・人文・美术</span></li><li>${icon('document')}<i>04</i><b>出愿・面试</b><span>材料・手续・模拟面试</span></li></ol><figure class="finish-method-photo"><img src="https://kayui-gavo.github.io/assets/tabito-classroom-v5.webp" alt="东京中野教室"><figcaption>东京・中野教室</figcaption></figure></div><div id="faculty" class="finish-faculty-panel"><div class="finish-faculty-head"><div><span class="finish-overline">部分讲师介绍</span><h2>担当教师・运营成员</h2></div><small>具体排课以当期课程为准</small></div>${groups.length?`<div class="finish-faculty-tabs" role="tablist">${groups.map((g,i)=>`<button type="button" data-faculty-tab="${i}" class="${i===0?'is-active':''}" aria-selected="${i===0?'true':'false'}"><b>${esc(g.title)}</b><span>${g.rows.length}</span></button>`).join('')}</div><div class="finish-faculty-panels">${groups.map((g,i)=>`<section data-faculty-panel="${i}" class="${i===0?'is-active':''}"><header><span>${esc(g.note)}</span></header><div>${g.rows.map(facultyRowHTML).join('')}</div></section>`).join('')}</div>`:'<p>讲师信息以当期课程安排为准。</p>'}</div></div>`;
    const anchor=method||faculty;anchor.insertAdjacentElement('beforebegin',hub);method?.remove();faculty?.remove();
    hub.querySelectorAll('[data-faculty-tab]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.facultyTab;hub.querySelectorAll('[data-faculty-tab]').forEach(x=>{const on=x===b;x.classList.toggle('is-active',on);x.setAttribute('aria-selected',on?'true':'false');});hub.querySelectorAll('[data-faculty-panel]').forEach(p=>p.classList.toggle('is-active',p.dataset.facultyPanel===k));}));
  }

  function buildInsightStrip(){
    if(!home||home.querySelector('.finish-insight-strip'))return;
    const old=home.querySelector('.v8-insight');if(!old)return;
    const found=[...old.querySelectorAll('a.v6-source-link')].slice(0,3).map(a=>({href:a.href,label:text(a.querySelector('span'))||text(a),meta:text(a.querySelector('small'))}));
    const links=found.length?found:[{href:'https://mp.weixin.qq.com/s/ZMtJsMmy-gfTXMUUDcR7HQ',label:'共通考试政策解读',meta:'微信公众号'},{href:'https://xhslink.cn/o/5Djzx1FPbYQ',label:'共通考试课程介绍',meta:'小红书'},{href:'https://xhslink.cn/o/17CWJJBamPK',label:'日本大学一般入试合格学生采访',meta:'学生采访'}];
    const strip=document.createElement('section');strip.className='finish-insight-strip';strip.innerHTML=`<div class="v3-shell"><div class="finish-insight-copy"><span class="finish-overline">升学资讯</span><h2>政策・课程・学生采访</h2><p>整理与报考直接相关的公开内容。</p></div><div class="finish-insight-links">${links.map((x,i)=>`<a href="${esc(x.href)}" target="_blank" rel="noopener noreferrer"><i>0${i+1}</i><span><strong>${esc(x.label)}</strong><small>${esc(x.meta)}</small></span><b>↗</b></a>`).join('')}</div><details class="finish-insight-more"><summary>共通考试详细说明</summary><div class="finish-insight-legacy"></div></details></div>`;old.insertAdjacentElement('beforebegin',strip);strip.querySelector('.finish-insight-legacy').appendChild(old);
  }

  function buildFeeEstimator(){
    const course=kyotsu?.querySelector('#common-course-2026');if(!course||course.querySelector('.finish-fee-estimator'))return;
    const box=document.createElement('aside');box.className='finish-fee-estimator';box.innerHTML=`<div class="finish-fee-copy"><span class="finish-overline">2026 共通テスト课程</span><h3>科目与费用</h3><p>课程费 14,000 元 / 科；材料费 5,000 元，4 科及以上免材料费。</p></div><div class="finish-fee-controls" role="group" aria-label="选择科目数"><button type="button" class="is-active" data-subject-count="1">1 科</button><button type="button" data-subject-count="2">2 科</button><button type="button" data-subject-count="3">3 科</button><button type="button" data-subject-count="4">4 科+</button></div><div class="finish-fee-result" aria-live="polite"><small>参考合计</small><strong>19,000 元</strong><span>课程费 14,000 + 材料费 5,000</span></div><div class="finish-common-subjects"><div><b>数学</b><span>数学 1A・数学 2BC</span></div><div><b>理科</b><span>物理・化学・生物・地学</span></div><div><b>文科</b><span>地理・政经・世界史</span></div><div><b>语言</b><span>日语・国语</span></div></div>`;
    const container=course.querySelector('.max-w-7xl,.max-w-6xl,.max-w-5xl')||course.firstElementChild||course;container.insertAdjacentElement('afterbegin',box);
    box.querySelectorAll('[data-subject-count]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.subjectCount);box.querySelectorAll('[data-subject-count]').forEach(x=>x.classList.toggle('is-active',x===b));const fee=n*14000;const material=n>=4?0:5000;const total=fee+material;box.querySelector('.finish-fee-result strong').textContent=n>=4?`${total.toLocaleString('en-US')} 元起`:`${total.toLocaleString('en-US')} 元`;box.querySelector('.finish-fee-result span').textContent=n>=4?`4 科课程费 ${fee.toLocaleString('en-US')} 起｜材料费 0`:`课程费 ${fee.toLocaleString('en-US')} + 材料费 ${material.toLocaleString('en-US')}`;}));
  }

  function buildEjuRouteSwitcher(){
    if(!eju||eju.querySelector('.finish-eju-switcher'))return;
    const snap=eju.querySelector('.v10-snapshot--eju');const nav=eju.querySelector('.v10-local-nav')||snap;if(!nav)return;
    const box=document.createElement('section');box.className='finish-eju-switcher';box.innerHTML=`<div class="v3-shell"><div class="finish-eju-switch-tabs" role="tablist"><button type="button" class="is-active" data-eju-route="eju" aria-selected="true"><span>01</span><b>EJU 一对一</b><small>个人报考计划</small></button><button type="button" data-eju-route="school" aria-selected="false"><span>02</span><b>校内考专项</b><small>按目标校开设</small></button></div><div class="finish-eju-switch-panels"><article data-eju-panel="eju" class="is-active"><div><span>EJU</span><h2>EJU 一对一指导</h2><p>根据科目、目标校及考试日程安排课程。</p></div><dl><div><dt>形式</dt><dd>1 : 1</dd></div><div><dt>内容</dt><dd>科目・文书・出愿</dd></div><div><dt>面试</dt><dd>模拟面试</dd></div></dl><button type="button" data-finish-page="eju" data-finish-target="eju-overview">查看 EJU 内容 →</button></article><article data-eju-panel="school"><div><span>校内考</span><h2>目标校专项・小班</h2><p>根据笔试科目、历年题型及面试要求安排。</p></div><dl><div><dt>形式</dt><dd>专项 / 小班</dd></div><div><dt>内容</dt><dd>笔试・题型・面试</dd></div><div><dt>案例</dt><dd>东京科学大学 2 / 2</dd></div></dl><button type="button" data-finish-page="eju" data-finish-target="school-exam-programs">查看校内考案例 →</button></article></div></div>`;nav.insertAdjacentElement('afterend',box);bindRouteLinks(box);
    box.querySelectorAll('[data-eju-route]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.ejuRoute;box.querySelectorAll('[data-eju-route]').forEach(x=>{const on=x===b;x.classList.toggle('is-active',on);x.setAttribute('aria-selected',on?'true':'false');});box.querySelectorAll('[data-eju-panel]').forEach(p=>p.classList.toggle('is-active',p.dataset.ejuPanel===k));}));
  }

  function enhanceTokyoScienceDetail(){
    const caseBox=eju?.querySelector('.v6-titech-case');if(!caseBox||caseBox.querySelector('.finish-titech-evidence'))return;
    const proof=caseBox.querySelector('.v8-eju-proof');
    const panel=document.createElement('section');panel.className='finish-titech-evidence';
    panel.innerHTML=`<div class="finish-titech-evidence-head"><div><span>实际课程资料</span><h3>东京科学大学（理工学系）对策</h3></div><p>面试对策讲义、原创模拟题及合格记录。</p></div><div class="finish-titech-evidence-main"><div class="v8-eju-proof-image" aria-hidden="true"></div><span>课程实际使用资料</span></div>${proofTiles()}`;
    if(proof)proof.insertAdjacentElement('beforebegin',panel);else caseBox.appendChild(panel);
  }

  function reinforceExistingMedia(){
    const commonCourse=kyotsu?.querySelector('#common-course-2026');
    commonCourse?.querySelector('.v8-common-poster')?.classList.add('finish-common-poster-feature');
    const commonSnap=kyotsu?.querySelector('.v10-snapshot--common .v10-snapshot-media');
    if(commonSnap&&!commonSnap.querySelector('.v8-common-poster'))commonSnap.innerHTML='<div class="v8-common-poster finish-common-poster-mini" aria-hidden="true"></div>';
    const ejuSnap=eju?.querySelector('.v10-snapshot--eju .v10-snapshot-media');
    if(ejuSnap){ejuSnap.innerHTML='<div class="v8-eju-proof-image finish-eju-snapshot-photo" aria-hidden="true"></div><span class="finish-snapshot-media-label">东京科学大学课程资料</span>';}
  }

  function setupArtLightbox(){
    if(!art||document.querySelector('.finish-lightbox'))return;
    const teacher=findSection(art,/教师作品展示/);
    const imgs=[...art.querySelectorAll('.v11-student-mosaic img'),...(teacher?[...teacher.querySelectorAll('img')]:[])];
    if(!imgs.length)return;
    let current=0;
    const modal=document.createElement('div');modal.className='finish-lightbox';modal.setAttribute('aria-hidden','true');modal.innerHTML='<button type="button" class="finish-lightbox-close" aria-label="关闭作品预览">×</button><button type="button" class="finish-lightbox-prev" aria-label="上一件作品">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="finish-lightbox-next" aria-label="下一件作品">›</button><span class="finish-lightbox-count"></span><span class="finish-lightbox-hint">← → 切换 · ESC 关闭</span>';document.body.appendChild(modal);
    const show=i=>{current=(i+imgs.length)%imgs.length;const img=imgs[current];const out=modal.querySelector('img');out.src=img.currentSrc||img.src;out.alt=img.alt||'作品预览';modal.querySelector('figcaption').textContent=img.alt||'';modal.querySelector('.finish-lightbox-count').textContent=`${current+1} / ${imgs.length}`;};
    const open=img=>{show(imgs.indexOf(img));modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.classList.add('finish-modal-open');modal.querySelector('.finish-lightbox-close').focus();};
    const close=()=>{modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('finish-modal-open');};
    imgs.forEach(img=>{img.classList.add('finish-lightboxable');img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label',`${img.alt||'作品'}，点击放大`);img.addEventListener('click',()=>open(img));img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(img);}});});
    modal.querySelector('.finish-lightbox-close').addEventListener('click',close);modal.querySelector('.finish-lightbox-prev').addEventListener('click',()=>show(current-1));modal.querySelector('.finish-lightbox-next').addEventListener('click',()=>show(current+1));modal.addEventListener('click',e=>{if(e.target===modal)close();});addEventListener('keydown',e=>{if(!modal.classList.contains('is-open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1);});
  }

  function refineSubpages(){
    if(art){const snap=art.querySelector('.v10-snapshot--art');if(snap){snap.classList.add('finish-subpage-snapshot','finish-art-snapshot');const h=snap.querySelector('h2');const p=snap.querySelector('.v10-snapshot-copy>p');if(h)h.textContent='美术升学';if(p)p.textContent='实技、作品集、专业方向与面试准备按目标校组合。';}art.querySelector('.v11-student-mosaic')?.setAttribute('aria-label','学生作品选集');const more=art.querySelector('.v11-gallery-more>summary');if(more)more.textContent=more.textContent.replace('查看全部教师作品','展开教师作品集');setupArtLightbox();}
    if(kyotsu){const snap=kyotsu.querySelector('.v10-snapshot--common');if(snap){snap.classList.add('finish-subpage-snapshot','finish-common-snapshot');const h=snap.querySelector('h2');const p=snap.querySelector('.v10-snapshot-copy>p');if(h)h.textContent='共通考试';if(p)p.textContent='先确认目标校是否利用共通成绩，再决定报考科目。课程、收费与申请支持集中展示。';}const nav=kyotsu.querySelector('.v10-local-nav')||snap;const course=kyotsu.querySelector('#common-course-2026');if(nav&&course&&nav.nextElementSibling!==course)nav.insertAdjacentElement('afterend',course);buildFeeEstimator();}
    if(eju){const snap=eju.querySelector('.v10-snapshot--eju');if(snap){snap.classList.add('finish-subpage-snapshot','finish-eju-snapshot');const h=snap.querySelector('h2');const p=snap.querySelector('.v10-snapshot-copy>p');if(h)h.textContent='EJU 一对一・校内考对策';if(p)p.textContent='EJU 目前仅接一对一；校内考根据目标校开设专项或小班。';}const nav=eju.querySelector('.v10-local-nav')||snap;const program=eju.querySelector('#school-exam-programs');if(nav&&program&&nav.nextElementSibling!==program)nav.insertAdjacentElement('afterend',program);buildEjuRouteSwitcher();enhanceTokyoScienceDetail();}
    document.querySelectorAll('.v10-local-nav').forEach(n=>n.classList.add('finish-local-nav'));
    reinforceExistingMedia();
  }

  function refineClassroomAndInstitution(){
    const classroom=home?.querySelector('#nakano-classroom');
    if(classroom){classroom.classList.add('finish-classroom');const h=classroom.querySelector('h2');const p=classroom.querySelector('.v7-tabito-head p');if(h)h.textContent='东京・中野教室';if(p)p.textContent='中国旅人教育集团株式会社';if(p&&!classroom.querySelector('.finish-classroom-info'))p.insertAdjacentHTML('afterend','<div class="finish-classroom-info"><span><b>地址</b>〒164-0001 東京都中野区中野1-55-3 フェリスビル 4F</span><span><b>授课</b>实体教室・线上课程</span></div>');}
    const hub=home?.querySelector('#institution');if(hub){hub.classList.add('finish-institution');const p=hub.querySelector('.v11-institution-head p');if(p)p.textContent='法人信息、升学资讯与兼职讲师招聘。';hub.querySelectorAll(':scope details').forEach(d=>d.addEventListener('toggle',()=>{if(!d.open)return;hub.querySelectorAll(':scope details').forEach(x=>{if(x!==d)x.open=false;});}));}
  }
  function refineContact(){
    const contact=home?.querySelector('#contact');if(!contact)return;contact.classList.add('finish-contact');const h=contact.querySelector('h2');const p=h?.parentElement?.querySelector('p');if(h)h.textContent='升学咨询';if(p)p.textContent='咨询时请附上目标校、当前成绩和预计入学时间。';contact.querySelector('.finish-contact-facts')?.remove();contact.querySelector('.finish-contact-flow')?.remove();if(p)p.insertAdjacentHTML('afterend','<div class="finish-contact-facts"><span><b>目标校</b>学校・学部・入试方式</span><span><b>当前成绩</b>EJU / 共通 / 校内考基础</span><span><b>时间</b>预计入学年度・考试节点</span></div>');
  }
  function markHomeSections(){
    const marks=[[home?.querySelector('#programs'),'01'],[home?.querySelector('#results'),'02'],[home?.querySelector('.finish-academic-hub'),'03'],[home?.querySelector('.finish-insight-strip'),'04'],[home?.querySelector('#nakano-classroom'),'05']];
    marks.forEach(([el,n])=>{if(el)el.dataset.homeIndex=n;});
  }
  function reorderHome(){
    if(!home)return;const hero=home.querySelector('.finish-hero')||home.querySelector('.v8-hero')||home.querySelector('section.hero-bg');if(!hero)return;
    const order=[home.querySelector('.v8-trust-bar'),home.querySelector('.finish-home-media-rail'),home.querySelector('#programs'),home.querySelector('#results'),home.querySelector('.finish-academic-hub'),home.querySelector('.finish-insight-strip'),home.querySelector('#nakano-classroom'),home.querySelector('#institution'),home.querySelector('#contact')].filter(Boolean);let anchor=hero;order.forEach(section=>{anchor.insertAdjacentElement('afterend',section);anchor=section;});
  }
  function setupReveal(){
    const targets=document.querySelectorAll('#home>section,.page-section>section,.finish-program-explorer,.finish-results-shell,.finish-academic-grid');targets.forEach(x=>x.classList.add('finish-reveal'));
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){targets.forEach(x=>x.classList.add('is-visible'));return;}
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.07,rootMargin:'0px 0px -5%'});targets.forEach(x=>io.observe(x));
  }
  function protectMobileConsultation(){
    const floating=document.querySelector('.v11-floating-consult');const contact=home?.querySelector('#contact');if(!floating||!contact||!('IntersectionObserver'in window))return;const observer=new IntersectionObserver(entries=>floating.classList.toggle('finish-consult-hidden',entries.some(x=>x.isIntersecting)),{threshold:.08});observer.observe(contact);
  }

  function installHomeR6Styles(){
    if(document.getElementById('finish-r6-home-style'))return;
    const style=document.createElement('style');style.id='finish-r6-home-style';style.textContent=`
      /* R6 homepage art-direction layer */
      #home [data-home-index]{position:relative;isolation:isolate}
      #home [data-home-index]::before{content:attr(data-home-index);position:absolute;right:max(18px,calc((100vw - 1160px)/2));top:24px;z-index:0;font:700 clamp(70px,8vw,116px)/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:-.08em;color:rgba(29,77,102,.035);pointer-events:none}
      .finish-lineicon{position:relative;display:inline-block;flex:0 0 auto;width:30px;height:30px;border:1px solid #aac4d0;background:rgba(246,251,253,.88);box-sizing:border-box}
      .finish-lineicon::before,.finish-lineicon::after{content:"";position:absolute;box-sizing:border-box}
      .finish-lineicon--art::before{left:6px;top:6px;width:17px;height:17px;border:1.5px solid #477f99;border-radius:50%;background:radial-gradient(circle at 35% 33%,#477f99 0 1.4px,transparent 1.6px),radial-gradient(circle at 68% 38%,#477f99 0 1.4px,transparent 1.6px),radial-gradient(circle at 48% 69%,#477f99 0 1.4px,transparent 1.6px)}
      .finish-lineicon--art::after{right:4px;bottom:4px;width:8px;height:8px;border:1.5px solid #477f99;border-radius:50%;background:#f6fbfd}
      .finish-lineicon--common::before{left:6px;top:7px;width:8px;height:16px;border:1.5px solid #477f99;border-right:0;background:#fff}
      .finish-lineicon--common::after{right:6px;top:7px;width:8px;height:16px;border:1.5px solid #477f99;border-left:0;background:#fff;box-shadow:-1px 0 0 #477f99}
      .finish-lineicon--eju::before{left:6px;top:7px;width:7px;height:7px;border:1.5px solid #477f99;border-radius:50%;box-shadow:10px 0 0 -1.5px #f6fbfd,10px 0 0 0 #477f99}
      .finish-lineicon--eju::after{left:5px;bottom:6px;width:19px;height:8px;border:1.5px solid #477f99;border-radius:9px 9px 2px 2px}
      .finish-lineicon--school::before,.finish-lineicon--target::before{left:5px;top:5px;width:19px;height:19px;border:1.5px solid #477f99;border-radius:50%;box-shadow:inset 0 0 0 4px #f6fbfd,inset 0 0 0 5.5px #477f99}
      .finish-lineicon--school::after,.finish-lineicon--target::after{left:14px;top:3px;width:1px;height:23px;background:#477f99;box-shadow:-11px 11px 0 -0.1px #477f99;transform:rotate(45deg)}
      .finish-lineicon--plan::before{left:7px;top:6px;width:16px;height:18px;border:1.5px solid #477f99;background:repeating-linear-gradient(to bottom,transparent 0 4px,#c2d5de 4px 5px)}
      .finish-lineicon--plan::after{left:10px;top:4px;width:10px;height:4px;border:1.5px solid #477f99;background:#f6fbfd}
      .finish-lineicon--course::before{left:6px;top:7px;width:18px;height:15px;border:1.5px solid #477f99;background:linear-gradient(90deg,transparent 48%,#477f99 48% 52%,transparent 52%)}
      .finish-lineicon--document::before{left:7px;top:5px;width:16px;height:20px;border:1.5px solid #477f99;background:repeating-linear-gradient(to bottom,transparent 0 5px,#c2d5de 5px 6px)}
      .finish-lineicon--document::after{right:7px;top:5px;width:6px;height:6px;border-left:1.5px solid #477f99;border-bottom:1.5px solid #477f99;background:#f6fbfd}

      .finish-hero-index{overflow:hidden!important}
      .finish-hero-miniatures{display:grid;grid-template-columns:1.05fr .82fr .95fr;height:94px;border-bottom:1px solid #d7e4e9;background:#eaf2f5}
      .finish-hero-miniatures figure{position:relative;overflow:hidden;margin:0;border-right:1px solid rgba(255,255,255,.8)}
      .finish-hero-miniatures figure:last-child{border-right:0}
      .finish-hero-miniatures img,.finish-hero-miniatures .v8-case-visual{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;min-height:0!important;object-fit:cover;background-size:cover!important;background-position:center!important;filter:saturate(.72) contrast(.98)}
      .finish-hero-miniatures .v8-case-visual:after{display:none!important}
      .finish-hero-miniatures figcaption{position:absolute;left:7px;bottom:6px;z-index:3;padding:3px 5px;background:rgba(10,43,62,.78);color:#fff;font-size:7px;font-weight:800;letter-spacing:.05em}
      .finish-hero-routes a{grid-template-columns:30px minmax(0,1fr) auto!important;column-gap:11px!important;align-items:center!important}
      .finish-hero-routes a>span:not(.finish-lineicon){display:grid;gap:3px}
      .finish-hero-routes a>span:not(.finish-lineicon) b{font-size:13.5px}
      .finish-hero-routes a>span:not(.finish-lineicon) small{color:#71858f;font-size:9.5px}
      .finish-hero-routes a>i{grid-column:3!important;grid-row:1!important}
      .finish-hero-routes .finish-lineicon{grid-column:1;grid-row:1;width:28px;height:28px;background:#f8fbfc;border-color:#bad0da}

      .finish-home-media-rail{padding:0;background:#0e334b;border-bottom:1px solid rgba(255,255,255,.08)}
      .finish-media-rail-grid{display:grid;grid-template-columns:1.15fr .9fr 1.05fr .9fr;max-width:1440px;height:174px;margin:0 auto}
      .finish-media-tile{position:relative;overflow:hidden;display:block;border-right:1px solid rgba(255,255,255,.13);color:#fff;text-decoration:none;background:#173e54}
      .finish-media-tile:last-child{border-right:0}
      .finish-media-tile>img,.finish-media-tile>.v8-case-visual{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;min-height:0!important;object-fit:cover;background-size:cover!important;background-position:center!important;filter:saturate(.68) contrast(.97);transition:transform .45s ease,filter .3s ease}
      .finish-media-tile>.v8-case-visual:after{display:none!important}
      .finish-media-tile::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 33%,rgba(7,31,45,.78) 100%)}
      .finish-media-tile>span{position:absolute;left:15px;right:14px;bottom:13px;z-index:3;display:flex;align-items:end;justify-content:space-between;gap:12px}
      .finish-media-tile b{font-size:11px}.finish-media-tile small{color:#b7d0dc;font-size:8px}
      .finish-media-tile:hover>img,.finish-media-tile:hover>.v8-case-visual{transform:scale(1.035);filter:saturate(.9) contrast(1)}

      .finish-program-tabs button{grid-template-columns:32px 29px minmax(0,1fr) auto!important;grid-template-rows:auto auto!important;gap:4px 9px!important}
      .finish-program-tabs button>.finish-lineicon{grid-row:1/3;grid-column:1;width:28px;height:28px;align-self:center}
      .finish-program-tabs button>span:not(.finish-lineicon){grid-row:1/3!important;grid-column:2!important;align-self:center}
      .finish-program-tabs button>b{grid-column:3}.finish-program-tabs button>small{grid-column:3!important}.finish-program-tabs button>i{grid-column:4!important}
      .finish-program-stage-copy{position:relative}
      .finish-program-stage-copy::after{content:"";position:absolute;right:25px;top:25px;width:52px;height:52px;border-top:1px solid #d9e6eb;border-right:1px solid #d9e6eb;opacity:.8}

      .finish-results-shell{grid-template-columns:minmax(0,.7fr) minmax(600px,1.3fr)!important}
      .finish-success-gallery{grid-column:1/-1;margin-top:1px;border-top:1px solid #cbdde5;padding-top:16px}
      .finish-success-gallery header{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px}.finish-success-gallery header span{color:#31566a;font-size:10px;font-weight:850}.finish-success-gallery header small{color:#81959f;font-size:8px}
      .finish-success-gallery>div{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
      .finish-success-gallery figure{position:relative;height:116px;margin:0;overflow:hidden;background:#dfe9ed;border:1px solid #d2e0e6}
      .finish-success-gallery img{width:100%;height:100%;object-fit:cover;filter:saturate(.78) contrast(.98);transition:transform .35s ease}
      .finish-success-gallery figure:hover img{transform:scale(1.025)}
      .finish-success-gallery figcaption{position:absolute;right:7px;bottom:6px;padding:3px 5px;background:rgba(14,52,75,.82);color:#fff;font-size:7px;font-weight:800}

      .finish-method-panel ol li{grid-template-columns:30px 25px 112px 1fr!important;align-items:center!important}
      .finish-method-panel ol li>.finish-lineicon{grid-column:1;width:28px;height:28px}
      .finish-method-panel ol li>i{grid-column:2!important}.finish-method-panel ol li>b{grid-column:3}.finish-method-panel ol li>span{grid-column:4}
      .finish-method-photo{position:relative;height:138px;margin:19px 0 0;overflow:hidden;background:#dfe9ed}
      .finish-method-photo img{width:100%;height:100%;object-fit:cover;filter:saturate(.62) contrast(.97)}
      .finish-method-photo::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(10,43,62,.72))}
      .finish-method-photo figcaption{position:absolute;left:10px;bottom:8px;z-index:2;color:#fff;font-size:8px;font-weight:800}
      .finish-faculty-tabs button:last-child{margin-right:0}
      .finish-faculty-tabs button:has(b:nth-child(1)){transition:background .16s ease}

      @media(max-width:1080px){
        .finish-media-rail-grid{grid-template-columns:repeat(2,1fr);height:300px}.finish-media-tile{min-height:150px}
        .finish-results-shell{grid-template-columns:1fr!important}
      }
      @media(max-width:767px){
        #home [data-home-index]::before{right:10px;top:15px;font-size:64px}
        .finish-hero-miniatures{height:78px}
        .finish-media-rail-grid{grid-template-columns:1fr 1fr;height:250px}.finish-media-tile{min-height:125px}
        .finish-program-tabs button{grid-template-columns:27px minmax(0,1fr)!important;grid-template-rows:auto auto!important}
        .finish-program-tabs button>.finish-lineicon{grid-column:1;grid-row:1/3;width:25px;height:25px}
        .finish-program-tabs button>span:not(.finish-lineicon){display:none}.finish-program-tabs button>b{grid-column:2}.finish-program-tabs button>small{grid-column:2!important}.finish-program-tabs button>i{display:none}
        .finish-success-gallery>div{grid-template-columns:1fr 1fr}.finish-success-gallery figure{height:105px}
        .finish-method-panel ol li{grid-template-columns:30px 21px 96px 1fr!important;gap:7px!important}.finish-method-photo{height:120px}
      }
    `;document.head.appendChild(style);
  }

  function init(){
    removeFormerTeacher();naturalizeLegacyCopy();installHomeR6Styles();compactPrimaryNavigation();refineHero();buildHomeMediaRail();buildProgramExplorer();buildResultsStage();buildAcademicHub();buildInsightStrip();refineSubpages();refineClassroomAndInstitution();refineContact();markHomeSections();reorderHome();protectMobileConsultation();bindRouteLinks();setupScrollProgress();setupHomeSectionSpy();setupReveal();document.documentElement.classList.add('tabito-finishing','tabito-finishing-r6');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();