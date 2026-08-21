(() => {
  'use strict';

  const home=document.getElementById('home');
  const art=document.getElementById('art');
  const kyotsu=document.getElementById('kyotsu');
  const eju=document.getElementById('eju');

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const go=(page,id='')=>{
    window.showPage?.(page);
    if(id) window.setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}),70);
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
    const hits=new Set();
    document.querySelectorAll('img[src*="teacher_li.jpg"],img[alt="李老师"]').forEach(el=>hits.add(el));
    document.querySelectorAll('h2,h3,h4,.v5-faculty-name,.v3-teacher-card').forEach(el=>{
      if(text(el).replace(/\s+/g,'').includes('李老师')) hits.add(el);
    });
    hits.forEach(el=>{
      const card=el.closest('.v5-faculty-row,.v3-teacher-card,.feature-card,article,div.bg-white[class*="rounded-"]');
      (card||el).remove();
    });
  }

  function compactPrimaryNavigation(){
    const nav=document.querySelector('nav.fixed');
    const desktop=nav?.querySelector('.hidden.md\\:flex');
    const mobile=document.querySelector('#mobileMenu .flex.flex-col');
    const items=[
      ['课程','home','programs'],
      ['美术升学','art',''],
      ['共通考试','kyotsu',''],
      ['EJU・校内考','eju',''],
      ['合格实绩','home','results'],
      ['中野教室','home','nakano-classroom'],
      ['升学咨询','home','contact']
    ];
    const render=isMobile=>items.map(([label,page,target],i)=>`<a href="#" class="${isMobile?'finish-mobile-nav':'finish-nav-link'}${i===items.length-1&&!isMobile?' finish-nav-cta':''}" data-finish-page="${page}"${target?` data-finish-target="${target}"`:''}>${label}</a>`).join('');
    if(desktop){desktop.innerHTML=render(false);desktop.className='hidden md:flex finish-nav';bindRouteLinks(desktop);}
    if(mobile){
      mobile.innerHTML=render(true);bindRouteLinks(mobile);
      mobile.querySelectorAll('[data-finish-page]').forEach(a=>a.addEventListener('click',()=>window.toggleMobileMenu?.()));
    }
  }

  function refineHero(){
    if(!home) return;
    const hero=home.querySelector('.v8-hero')||home.querySelector('section.hero-bg');
    if(!hero) return;
    hero.classList.add('finish-hero');
    const eyebrow=hero.querySelector('.v4-hero-eyebrow');
    const title=hero.querySelector('.v3-hero-title');
    const lede=hero.querySelector('.v3-hero-lede');
    if(eyebrow) eyebrow.textContent='日本留学本科升学指导｜东京・中野';
    if(title) title.innerHTML='<span class="v3-hero-jp">学びの旅に、<br>確かな道しるべを。</span><span class="v3-hero-brand">TABITO EDUCATION · TOKYO</span>';
    if(lede) lede.innerHTML='共通考试、EJU 一对一、理工科校内考与美术升学。<br class="hidden md:block">先确认目标校与选拔方式，再安排课程、出愿与面试准备。';

    const box=hero.querySelector('.v7-hero-index');
    if(box){
      box.classList.add('finish-hero-index');
      box.innerHTML=`
        <header><span>课程导航</span><strong>按选拔方式选择</strong></header>
        <button type="button" data-finish-page="art"><span><strong>美术升学</strong><small>实技・作品集・专业方向</small></span><i>→</i></button>
        <button type="button" data-finish-page="kyotsu"><span><strong>共通考试</strong><small>按科报名・申请支持</small></span><i>→</i></button>
        <button type="button" data-finish-page="eju"><span><strong>EJU 一对一</strong><small>按个人报考计划推进</small></span><i>→</i></button>
        <button type="button" data-finish-page="eju" data-finish-target="school-exam-programs"><span><strong>校内考对策</strong><small>按目标校开设专项・小班</small></span><i>→</i></button>
        <footer><span>东京・中野实体教室</span><span>Online</span></footer>`;
      bindRouteLinks(box);
    }
  }

  function buildProgramDirectory(){
    const section=home?.querySelector('#programs');
    if(!section) return;
    section.classList.add('finish-programs');
    const old=section.querySelector('.finish-program-matrix,.grid');
    if(old) old.style.display='none';
    section.querySelector('.finish-program-directory')?.remove();

    const title=section.querySelector('h2');
    const intro=title?.parentElement?.querySelector('p');
    if(title) title.textContent='课程与升学项目';
    if(intro) intro.textContent='四类业务分开呈现。先确认目标校和选拔方式，再看课程形式、费用与实际教学证据。';

    const directory=document.createElement('div');
    directory.className='finish-program-directory';
    directory.innerHTML=`
      <article class="finish-program-row">
        <div class="finish-program-media finish-program-art" aria-label="美术学生作品节选"><img src="images/student-work-illustration-city.png" alt="学生插画作品" loading="lazy"><img src="images/student-work-bust-charcoal.jpg" alt="学生素描作品" loading="lazy"><img src="images/student-work-stilllife-wires.png" alt="学生静物作品" loading="lazy"></div>
        <div class="finish-program-main"><span>美术升学</span><h3>实技・作品集・专业方向</h3><p>按目标校与专业方向组合实技、作品制作、作品说明和面试准备。</p></div>
        <dl class="finish-program-facts"><div><dt>形式</dt><dd>项目制指导</dd></div><div><dt>证据</dt><dd>学生作品・教师作品</dd></div></dl>
        <a href="#" data-finish-page="art">查看课程 <b>→</b></a>
      </article>
      <article class="finish-program-row">
        <div class="finish-program-media finish-program-common" aria-label="2026 共通考试课程资料"><div class="v8-common-poster" aria-hidden="true"></div></div>
        <div class="finish-program-main"><span>共通考试</span><h3>按科报名・申请支持</h3><p>先确认目标校是否利用共通成绩，再决定科目组合与备考顺序。</p></div>
        <dl class="finish-program-facts"><div><dt>课程费</dt><dd>14,000 元 / 科</dd></div><div><dt>材料费</dt><dd>5,000 元｜4 科起免</dd></div></dl>
        <a href="#" data-finish-page="kyotsu">课程与费用 <b>→</b></a>
      </article>
      <article class="finish-program-row">
        <div class="finish-program-media finish-program-eju" aria-label="EJU 一对一"><strong>1 : 1</strong><small>EJU</small></div>
        <div class="finish-program-main"><span>EJU</span><h3>目前仅接一对一</h3><p>围绕报考科目、目标校、文书、出愿与面试，按个人计划推进。</p></div>
        <dl class="finish-program-facts"><div><dt>形式</dt><dd>一对一</dd></div><div><dt>安排</dt><dd>按个人报考计划</dd></div></dl>
        <a href="#" data-finish-page="eju">查看 EJU <b>→</b></a>
      </article>
      <article class="finish-program-row finish-program-row--flagship">
        <div class="finish-program-media finish-program-school" aria-label="东京科学大学专项教学资料"><div class="v8-case-visual" aria-hidden="true"></div></div>
        <div class="finish-program-main"><span>校内考</span><h3>按目标校开设专项・小班</h3><p>根据笔试科目、题型特点与面试要求组织。东京科学大学是重点案例之一。</p></div>
        <dl class="finish-program-facts"><div><dt>2026 案例</dt><dd>东京科学大学</dd></div><div><dt>最终合格</dt><dd>2 / 2</dd></div></dl>
        <a href="#" data-finish-page="eju" data-finish-target="school-exam-programs">查看案例 <b>→</b></a>
      </article>`;
    const container=section.querySelector('.max-w-7xl,.max-w-6xl')||section.firstElementChild||section;
    container.appendChild(directory);
    bindRouteLinks(directory);
  }

  function buildResultsStage(){
    const results=home?.querySelector('#results');
    if(!results) return;
    const caseSection=home.querySelector('.v8-case');
    const evidence=caseSection?.querySelector('.v8-case-visual');
    const evidenceHTML=evidence?evidence.outerHTML:'<div class="finish-case-fallback"><span>数学</span><span>物理</span><span>化学</span><span>模拟面试</span></div>';
    results.className='finish-results';
    results.innerHTML=`<div class="v3-shell finish-results-shell">
      <div class="finish-results-general">
        <div class="finish-results-head"><div><span>截至 2026 年 4 月</span><h2>合格实绩</h2></div><div class="finish-results-numbers"><div><b>9</b><small>合格校次</small></div><div><b>6</b><small>所大学</small></div></div></div>
        <p class="finish-results-lede">2025 年 9 月正式开课后的公开合格记录。以下按合格校次统计。</p>
        <div class="finish-result-list">
          <div><strong>东京科学大学</strong><b>2 名</b></div><div><strong>日本大学</strong><b>3 名</b></div><div><strong>北海道大学</strong><b>1 名</b></div><div><strong>京都产业大学</strong><b>1 名</b></div><div><strong>神奈川工科大学</strong><b>1 名</b></div><div><strong>中央大学</strong><b>1 名</b></div>
        </div>
        <p class="finish-result-note">※ “合格校次”不等同于独立学生人数；同一学生取得多个合格结果时分别计入。</p>
      </div>
      <article class="finish-flagship-case">
        <div class="finish-case-copy"><span>2026｜重点案例</span><h3>东京科学大学（理工学系）<br>数理化笔试对策小班</h3><p>数学・物理・化学 + 原创模拟题 + 模拟面试</p><div class="finish-case-stats"><div><b>2</b><small>报名</small></div><div><b>2</b><small>笔试合格</small></div><div><b>2</b><small>最终合格</small></div></div><div class="finish-case-students"><span>41026 · 经营工学系</span><span>41064 · 融合理工学系</span></div><button type="button" data-finish-page="eju" data-finish-target="school-exam-programs">查看完整课程案例 →</button></div>
        <div class="finish-case-media">${evidenceHTML}</div>
      </article>
    </div>`;
    caseSection?.remove();
    bindRouteLinks(results);
  }

  function extractFaculty(){
    const faculty=home?.querySelector('#faculty');
    if(!faculty) return [];
    return [...faculty.querySelectorAll('.v5-faculty-group')].map(group=>{
      const title=text(group.querySelector('header h3'))||'讲师';
      const note=text(group.querySelector('header span'));
      const rows=[...group.querySelectorAll('.v5-faculty-row')].map(row=>({
        name:text(row.querySelector('.v5-faculty-name')),
        school:text(row.querySelector('.v5-faculty-school')),
        subject:text(row.querySelector('.v5-faculty-subject')),
        href:row.tagName==='A'?(row.getAttribute('href')||''):''
      })).filter(x=>x.name&&!x.name.includes('李老师'));
      return {title,note,rows};
    }).filter(g=>g.rows.length);
  }

  function facultyRowHTML(row,compact=false){
    const content=`<span>${esc(row.name)}</span><small>${esc(row.school)}</small><em>${esc(row.subject||'—')}</em>`;
    return row.href?`<a class="finish-faculty-row${compact?' finish-faculty-row--compact':''}" href="${esc(row.href)}">${content}<b>↗</b></a>`:`<div class="finish-faculty-row${compact?' finish-faculty-row--compact':''}">${content}<b></b></div>`;
  }

  function buildAcademicHub(){
    if(!home||home.querySelector('.finish-academic-hub')) return;
    const method=home.querySelector('#how-we-work');
    const faculty=home.querySelector('#faculty');
    const groups=extractFaculty();
    if(!method&&!faculty) return;
    const preview=groups.flatMap(g=>g.rows.slice(0,g.title.includes('理工')?4:1)).slice(0,8);
    const total=groups.reduce((n,g)=>n+g.rows.length,0);
    const allGroups=groups.map(g=>`<section class="finish-faculty-group"><header><b>${esc(g.title)}</b><small>${esc(g.note)}</small></header><div>${g.rows.map(r=>facultyRowHTML(r)).join('')}</div></section>`).join('');

    const hub=document.createElement('section');
    hub.className='finish-academic-hub';
    hub.innerHTML=`<div class="v3-shell finish-academic-grid">
      <div id="how-we-work" class="finish-method-panel"><span class="finish-overline">教学与升学支持</span><h2>先把准备顺序排清楚</h2><p>课程不单独漂在升学计划之外。每一步都对应实际报考节点。</p><ol><li><b>目标校确认</b><span>核对募集要项、入试方式与科目。</span></li><li><b>科目与进度规划</b><span>按基础、考试时间和目标分数安排。</span></li><li><b>对应学科授课</b><span>数学、理科、语言、人文与美术分科担当。</span></li><li><b>出愿・面试衔接</b><span>材料、手续与面试同步推进。</span></li></ol></div>
      <div id="faculty" class="finish-faculty-panel"><div class="finish-faculty-head"><div><span class="finish-overline">部分讲师介绍</span><h2>按科目看担当教师</h2></div><small>具体排课以当期课程为准</small></div><div class="finish-faculty-preview">${preview.map(r=>facultyRowHTML(r,true)).join('')}</div><details class="finish-faculty-all"><summary>查看全部讲师（${total}）</summary><div class="finish-faculty-all-body">${allGroups}</div></details></div>
    </div>`;
    const anchor=method||faculty;
    anchor.insertAdjacentElement('beforebegin',hub);
    method?.remove();
    faculty?.remove();
  }

  function buildInsightStrip(){
    if(!home||home.querySelector('.finish-insight-strip')) return;
    const old=home.querySelector('.v8-insight');
    if(!old) return;
    const found=[...old.querySelectorAll('a.v6-source-link')].slice(0,3).map(a=>({href:a.href,label:text(a.querySelector('span'))||text(a),meta:text(a.querySelector('small'))}));
    const links=found.length?found:[
      {href:'https://mp.weixin.qq.com/s/ZMtJsMmy-gfTXMUUDcR7HQ',label:'共通考试政策解读',meta:'旅人教育公众号'},
      {href:'https://xhslink.cn/o/5Djzx1FPbYQ',label:'栗子老师介绍共通考试',meta:'小红书'},
      {href:'https://xhslink.cn/o/17CWJJBamPK',label:'逆袭！日本大学一般入试合格学生采访',meta:'学生采访'}
    ];
    const strip=document.createElement('section');
    strip.className='finish-insight-strip';
    strip.innerHTML=`<div class="v3-shell"><div class="finish-insight-copy"><span class="finish-overline">政策・路线・采访</span><h2>升学信息，放在需要判断路线的地方</h2><p>课程之外，把会影响报考判断的政策解读与学生案例集中保留。</p></div><div class="finish-insight-links">${links.map(x=>`<a href="${esc(x.href)}" target="_blank" rel="noopener noreferrer"><strong>${esc(x.label)}</strong><small>${esc(x.meta)}</small><b>↗</b></a>`).join('')}</div><details class="finish-insight-more"><summary>展开共通考试路线说明</summary><div class="finish-insight-legacy"></div></details></div>`;
    old.insertAdjacentElement('beforebegin',strip);
    strip.querySelector('.finish-insight-legacy').appendChild(old);
  }

  function refineSubpages(){
    if(art){
      const snap=art.querySelector('.v10-snapshot--art');
      if(snap){snap.classList.add('finish-subpage-snapshot');const h=snap.querySelector('h2');if(h)h.textContent='美术升学｜作品、实技与专业方向';}
      art.querySelector('.v11-student-mosaic')?.setAttribute('aria-label','学生作品选集');
      const more=art.querySelector('.v11-gallery-more>summary');if(more)more.textContent=more.textContent.replace('查看全部教师作品','展开教师作品集');
    }
    if(kyotsu){
      const snap=kyotsu.querySelector('.v10-snapshot--common');
      if(snap){snap.classList.add('finish-subpage-snapshot','finish-common-snapshot');const h=snap.querySelector('h2');const p=snap.querySelector('.v10-snapshot-copy>p');if(h)h.textContent='共通考试｜对象、科目、费用先确认';if(p)p.textContent='先确认目标校是否利用共通成绩，再决定报考科目。课程、收费与申请支持集中展示。';}
      const nav=kyotsu.querySelector('.v10-local-nav')||snap;
      const course=kyotsu.querySelector('#common-course-2026');if(nav&&course&&nav.nextElementSibling!==course)nav.insertAdjacentElement('afterend',course);
    }
    if(eju){
      const snap=eju.querySelector('.v10-snapshot--eju');
      if(snap){snap.classList.add('finish-subpage-snapshot','finish-eju-snapshot');const h=snap.querySelector('h2');const p=snap.querySelector('.v10-snapshot-copy>p');if(h)h.textContent='EJU 一对一・校内考专项';if(p)p.textContent='EJU 目前仅接一对一；校内考根据目标校需求开设专项或小班。东京科学大学为重点案例之一。';}
      const nav=eju.querySelector('.v10-local-nav')||snap;
      const program=eju.querySelector('#school-exam-programs');if(nav&&program&&nav.nextElementSibling!==program)nav.insertAdjacentElement('afterend',program);
    }
  }

  function refineClassroomAndInstitution(){
    const classroom=home?.querySelector('#nakano-classroom');
    if(classroom){
      classroom.classList.add('finish-classroom');
      const h=classroom.querySelector('h2');const p=classroom.querySelector('.v7-tabito-head p');
      if(h)h.textContent='东京・中野教室';if(p)p.textContent='中国旅人教育集团株式会社';
    }
    const hub=home?.querySelector('#institution');
    if(hub){
      hub.classList.add('finish-institution');
      const p=hub.querySelector('.v11-institution-head p');if(p)p.textContent='法人信息、升学资讯与兼职讲师招聘集中收纳。';
    }
  }

  function refineContact(){
    const contact=home?.querySelector('#contact');
    if(!contact) return;
    contact.classList.add('finish-contact');
    const h=contact.querySelector('h2');const p=h?.parentElement?.querySelector('p');
    if(h)h.textContent='升学咨询';
    if(p)p.textContent='把目标校、当前成绩和预计入学时间告诉我们。先确认报考路线，再决定需要的课程。';
    contact.querySelector('.finish-contact-facts')?.remove();
    if(p)p.insertAdjacentHTML('afterend','<div class="finish-contact-facts"><span><b>目标校</b>学校・学部・入试方式</span><span><b>当前成绩</b>EJU / 共通 / 校内考基础</span><span><b>时间</b>预计入学年度・考试节点</span></div>');
  }

  function reorderHome(){
    if(!home) return;
    const hero=home.querySelector('.finish-hero')||home.querySelector('.v8-hero')||home.querySelector('section.hero-bg');
    if(!hero) return;
    const order=[home.querySelector('.v8-trust-bar'),home.querySelector('#programs'),home.querySelector('#results'),home.querySelector('.finish-academic-hub'),home.querySelector('.finish-insight-strip'),home.querySelector('#nakano-classroom'),home.querySelector('#institution'),home.querySelector('#contact')].filter(Boolean);
    let anchor=hero;
    order.forEach(section=>{anchor.insertAdjacentElement('afterend',section);anchor=section;});
  }

  function protectMobileConsultation(){
    const floating=document.querySelector('.v11-floating-consult');
    const contact=home?.querySelector('#contact');
    if(!floating||!contact||!('IntersectionObserver' in window)) return;
    const observer=new IntersectionObserver(entries=>floating.classList.toggle('finish-consult-hidden',entries.some(x=>x.isIntersecting)),{threshold:.08});
    observer.observe(contact);
  }

  function init(){
    removeFormerTeacher();
    compactPrimaryNavigation();
    refineHero();
    buildProgramDirectory();
    buildResultsStage();
    buildAcademicHub();
    buildInsightStrip();
    refineSubpages();
    refineClassroomAndInstitution();
    refineContact();
    reorderHome();
    protectMobileConsultation();
    bindRouteLinks();
    document.documentElement.classList.add('tabito-finishing','tabito-finishing-r2');
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
