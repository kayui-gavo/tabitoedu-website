(() => {
  'use strict';

  const home=document.getElementById('home');
  const kyotsu=document.getElementById('kyotsu');
  const eju=document.getElementById('eju');
  const art=document.getElementById('art');

  function heroUpgrade(){
    if(!home) return;
    const hero=home.querySelector('.v7-hero-clean');
    const layout=hero?.querySelector('.v5-hero-layout');
    if(!hero||!layout) return;
    hero.classList.add('v8-hero');
    if(!hero.querySelector('.v8-hero-bg')){
      hero.insertAdjacentHTML('afterbegin',`<div class="v8-hero-bg" aria-hidden="true"><div class="v8-hero-bg-photo"></div><div class="v8-hero-bg-mask"></div><div class="v8-hero-grid"></div></div>`);
    }
    const title=hero.querySelector('.v3-hero-title');
    if(title) title.innerHTML='<span class="v3-hero-jp">学びの旅に、<br>確かな道しるべを。</span><span class="v3-hero-brand">TABITO EDUCATION · TOKYO</span>';
    const lede=hero.querySelector('.v3-hero-lede');
    if(lede) lede.innerHTML='日本留学本科升学指导。共通考试、EJU、理工科校内考与美术升学，<br class="hidden md:block">从目标校确认到课程、出愿和面试，按实际选拔方式推进。';
    const idx=hero.querySelector('.v7-hero-index');
    if(idx){
      idx.querySelector('header strong').textContent='2026 课程与升学项目';
      idx.querySelector('header span').textContent='PROGRAMS';
      const footer=idx.querySelector('footer');
      if(footer) footer.innerHTML='<span>东京・中野实体教室</span><span>线上课程同步</span>';
    }
  }

  function buildTrustBar(){
    if(!home||home.querySelector('.v8-trust-bar')) return;
    const hero=home.querySelector('.v8-hero');
    if(!hero) return;
    hero.insertAdjacentHTML('afterend',`<section class="v8-trust-bar"><div class="v3-shell">
      <div><span>创办</span><strong>2025.03</strong></div>
      <div><span>正式开课</span><strong>2025.09</strong></div>
      <div><span>截至 2026.04</span><strong>9 合格校次</strong></div>
      <div><span>东京科学大学专项</span><strong>2 / 2 最终合格</strong></div>
      <div><span>授课地点</span><strong>东京・中野 / Online</strong></div>
    </div></section>`);
  }

  function programsUpgrade(){
    if(!home) return;
    const section=home.querySelector('#programs');
    if(!section) return;
    section.classList.add('v8-programs');
    const h2=section.querySelector('h2');
    const p=h2?.parentElement?.querySelector('p');
    if(h2) h2.textContent='本科升学课程';
    if(p) p.textContent='不同考试方式需要不同准备。先确认目标校与选拔路径，再进入对应课程。';
    const cards=[...section.querySelectorAll('.v4-program-card')];
    const defs=[
      ['美术升学','实技・作品集・专业方向','美术作品与课程体系'],
      ['共通考试','按科报名・升学申请支持','2026 共通テスト课程'],
      ['EJU・校内考','EJU 仅接一对一・校别专项','东京科学大学等校内考对策']
    ];
    cards.slice(0,3).forEach((card,i)=>{
      card.classList.add('v8-program');
      const h3=card.querySelector('h3'); if(h3) h3.innerHTML=`${defs[i][0]}<small>${defs[i][1]}</small>`;
      const code=card.querySelector('.v4-program-code'); if(code) code.textContent=String(i+1).padStart(2,'0');
      if(!card.querySelector('.v8-program-caption')) card.insertAdjacentHTML('beforeend',`<div class="v8-program-caption">${defs[i][2]}</div>`);
    });
  }

  function resultsUpgrade(){
    if(!home) return;
    const section=home.querySelector('#results');
    if(!section) return;
    section.classList.add('v8-results');
    const title=section.querySelector('.v3-title');
    const lede=section.querySelector('.v3-lede');
    if(title) title.textContent='合格实绩';
    if(lede) lede.textContent='2025 年 9 月正式开课后，截至 2026 年 4 月的公开合格记录。数据按合格校次统计。';
    const facts=section.querySelector('.v3-result-facts');
    if(facts) facts.innerHTML='<span><b>9</b><small>合格校次</small></span><span><b>6</b><small>大学</small></span><span><b>2/2</b><small>东京科学大学专项最终合格</small></span>';
    const rows=[...section.querySelectorAll('.v3-result-row')];
    rows.forEach((row,i)=>row.dataset.rank=String(i+1).padStart(2,'0'));
  }

  function tokyoScienceSpotlight(){
    if(!home) return;
    const teaser=home.querySelector('.v6-home-case');
    if(!teaser||teaser.classList.contains('v8-case')) return;
    teaser.classList.add('v8-case');
    const shell=teaser.querySelector('.v3-shell');
    if(!shell) return;
    shell.innerHTML=`<div class="v8-case-copy">
      <span class="v8-label">2026 · TOKYO SCIENCE UNIVERSITY</span>
      <h2>东京科学大学（理工学系）<br>数理化笔试对策小班</h2>
      <p>数学・物理・化学笔试训练，配合原创模拟题与模拟面试。2 人报名，2 人笔试合格，2 人最终合格。</p>
      <div class="v8-case-numbers"><div><b>2</b><span>报名</span></div><div><b>2</b><span>笔试合格</span></div><div><b>2</b><span>最终合格</span></div></div>
      <div class="v8-case-students"><span>合格者</span><b>41026 · 经营工学系</b><b>41064 · 融合理工学系</b></div>
      <button type="button" class="v8-case-link">查看课程与教学资料 →</button>
    </div>
    <div class="v8-case-visual" aria-label="东京科学大学对策课程教学资料"><div class="v8-case-doc v8-case-doc--interview"><span>面试对策</span></div><div class="v8-case-doc v8-case-doc--exam"><span>原创模拟题</span></div><div class="v8-case-doc v8-case-doc--pass"><span>合格公告</span></div></div>`;
    shell.querySelector('.v8-case-link')?.addEventListener('click',()=>{window.showPage?.('eju');setTimeout(()=>document.getElementById('school-exam-programs')?.scrollIntoView({behavior:'smooth'}),80);});
  }

  function methodUpgrade(){
    if(!home) return;
    const section=home.querySelector('#how-we-work');
    if(!section) return;
    section.classList.add('v8-method');
    const h2=section.querySelector('h2'); if(h2) h2.textContent='从选校到考试，把准备顺序排清楚';
  }

  function facultyUpgrade(){
    if(!home) return;
    const section=home.querySelector('#faculty');
    if(!section) return;
    section.classList.add('v8-faculty');
    const h2=section.querySelector('.v5-section-head h2');
    const p=section.querySelector('.v5-section-head p:not(.v3-kicker)');
    if(h2) h2.textContent='部分讲师';
    if(p) p.textContent='以担当科目与学校背景快速确认授课方向。这里只展示部分讲师，具体排课以当期课程为准。';
    const groups=[...section.querySelectorAll('.v5-faculty-group')];
    groups.forEach((g,i)=>g.dataset.group=String(i+1).padStart(2,'0'));
  }

  function turnCommonIntoInsight(){
    if(!home) return;
    const section=home.querySelector('.v4-common-guide');
    if(!section) return;
    section.classList.add('v8-insight');
    const h2=section.querySelector('h2'); if(h2) h2.textContent='共通考试｜路线判断与政策解读';
    const inner=section.querySelector('.max-w-5xl');
    if(inner&&!inner.querySelector('.v8-insight-head')) inner.insertAdjacentHTML('afterbegin','<div class="v8-insight-head"><span>COMMON TEST GUIDE</span><strong>先看目标校是否利用，再决定是否备考。</strong></div>');
  }

  function commonCourseUpgrade(){
    if(!kyotsu) return;
    const section=kyotsu.querySelector('#common-course-2026');
    if(!section) return;
    section.classList.add('v8-common-course');
    const shell=section.querySelector('.v3-shell');
    if(shell&&!shell.querySelector('.v8-common-poster')) shell.insertAdjacentHTML('afterbegin','<div class="v8-common-poster" aria-hidden="true"></div>');
  }

  function ejuUpgrade(){
    if(!eju) return;
    const section=eju.querySelector('#school-exam-programs');
    if(!section) return;
    section.classList.add('v8-school-exam');
    const title=section.querySelector('.v6-section-head h2'); if(title) title.textContent='EJU 一对一・校内考专项';
    const intro=section.querySelector('.v6-section-head p'); if(intro) intro.textContent='EJU 目前仅接一对一。校内考根据学生目标校需求开设小班或专项课程。';
    const caseBox=section.querySelector('.v6-titech-case');
    if(caseBox&&!caseBox.querySelector('.v8-eju-proof')){
      caseBox.insertAdjacentHTML('beforeend',`<div class="v8-eju-proof"><div class="v8-eju-proof-image"></div><div><span>实际教学资料</span><h4>数学・物理・化学 + 原创模拟题 + 模拟面试</h4><p>展示课程实际使用的面试对策、原创模拟题与合格公告。合格者编号 41026、41064 可在 2026 年东京科学大学官方公告中核对。</p></div></div>`);
    }
  }

  function classroomUpgrade(){
    if(!home) return;
    const section=home.querySelector('#nakano-classroom');
    if(!section) return;
    section.classList.add('v8-classroom');
    const title=section.querySelector('.v7-tabito-head h2'); if(title) title.textContent='东京・中野教室';
    const p=section.querySelector('.v7-tabito-head p'); if(p) p.textContent='中国旅人教育集团株式会社｜Tokyo Nakano';
  }

  function coverageUpgrade(){
    if(!home) return;
    const section=home.querySelector('#coverage');
    if(!section) return;
    section.classList.add('v8-coverage');
    const h2=section.querySelector('.v6-section-head h2'); if(h2) h2.textContent='升学信息・学生采访';
    const p=section.querySelector('.v6-section-head p'); if(p) p.textContent='政策解读、学生采访与外部报道。把课程之外仍然会影响报考判断的信息集中整理。';
  }

  function contactUpgrade(){
    if(!home) return;
    const section=home.querySelector('#contact');
    if(!section) return;
    section.classList.add('v8-contact');
    const h2=section.querySelector('h2'); if(h2) h2.textContent='先确认考试路线，再决定课程';
  }

  function init(){
    heroUpgrade();
    buildTrustBar();
    programsUpgrade();
    resultsUpgrade();
    tokyoScienceSpotlight();
    methodUpgrade();
    facultyUpgrade();
    turnCommonIntoInsight();
    commonCourseUpgrade();
    ejuUpgrade();
    classroomUpgrade();
    coverageUpgrade();
    contactUpgrade();
    document.documentElement.classList.add('tabito-v8-baijin');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
