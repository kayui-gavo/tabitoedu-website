(() => {
  'use strict';

  const home = document.getElementById('home');
  if (!home) return;

  const sectionByHeading = (text) => {
    const h = [...home.querySelectorAll('h2')].find(x => x.textContent.trim().includes(text));
    return h ? h.closest('section') : null;
  };

  function polishHero(){
    const hero = home.querySelector('section.hero-bg');
    if(!hero) return;
    const inner = hero.querySelector('.relative.z-10');
    const title = hero.querySelector('.v3-hero-title, h1');
    if(inner && title && !hero.querySelector('.v4-hero-eyebrow')){
      title.insertAdjacentHTML('beforebegin','<p class="v4-hero-eyebrow">日本留学升学指导｜东京・中野</p>');
    }
    const lede = hero.querySelector('.v3-hero-lede');
    if(lede) lede.innerHTML = '共通考试・EJU・理工科校内考・美术升学。<br class="hidden md:block">按目标校的实际选拔方式，安排课程、出愿与面试准备。';

    const actions = hero.querySelector('.flex.flex-wrap.justify-center.gap-6');
    if(actions){
      const links=[...actions.querySelectorAll('a')];
      if(links[0]) links[0].textContent='美术升学';
      if(links[1]) links[1].textContent='共通考试';
      if(links[2]) links[2].textContent='EJU・校内考';
      actions.classList.add('v4-hero-actions');
      if(!hero.querySelector('.v4-hero-results-link')){
        actions.insertAdjacentHTML('afterend','<a class="v4-hero-results-link" href="#results">查看截至 2026 年 4 月合格实绩 →</a>');
      }
    }
  }

  function polishPrograms(){
    const section = sectionByHeading('专业升学服务');
    if(!section) return null;
    section.id='programs';
    section.classList.add('v4-programs');
    const h2=section.querySelector('h2');
    const intro=h2 && h2.parentElement?.querySelector('p');
    if(h2) h2.textContent='升学项目';
    if(intro) intro.textContent='先确认目标校和选拔方式，再决定需要的课程、出愿与面试准备。';

    const cards=[...section.querySelectorAll('.feature-card')];
    const defs=[
      ['ART','美术升学指导','查看美术课程 →'],
      ['KYOTSU','共通考试指导','查看共通课程 →'],
      ['EJU','EJU・校内考指导','查看 EJU・校内考 →']
    ];
    cards.slice(0,3).forEach((card,i)=>{
      card.classList.add('v4-program-card');
      const icon=card.querySelector('.text-4xl');
      if(icon){icon.className='v4-program-code';icon.textContent=defs[i][0];}
      const h3=card.querySelector('h3');
      if(h3) h3.innerHTML=defs[i][1] + (i===2 ? '<small>目前以一对一为主</small>' : '');
      const a=card.querySelector('a');
      if(a) a.textContent=defs[i][2];
    });
    return section;
  }

  function addMethodStrip(){
    if(home.querySelector('#how-we-work')) return home.querySelector('#how-we-work');
    const section=document.createElement('section');
    section.id='how-we-work';
    section.className='v4-method';
    section.innerHTML=`<div class="v3-shell">
      <div class="v4-method-head"><p class="v3-kicker">HOW WE WORK</p><h2>课程和升学，放在同一份计划里。</h2></div>
      <div class="v4-method-grid">
        <article><b>01</b><strong>先看目标校</strong><span>根据募集要项确认共通、EJU、校内考与面试的实际组合。</span></article>
        <article><b>02</b><strong>再排课程</strong><span>按科目基础、考试时间和目标分数安排学习顺序，而不是只看课时数量。</span></article>
        <article><b>03</b><strong>按学科匹配教师</strong><span>数学、理科、语言、人文与美术由对应学科教师负责。</span></article>
        <article><b>04</b><strong>线下与线上并行</strong><span>东京中野设有实体教室，同时保留线上课程与咨询。</span></article>
      </div>
    </div>`;
    return section;
  }

  function polishCommonGuide(){
    const section=sectionByHeading('什么是共通考试');
    if(!section) return null;
    section.classList.add('v4-common-guide');
    const h2=section.querySelector('h2');
    if(h2) h2.textContent='共通考试路线｜先判断是否适合，再开始备考';
    const h3s=[...section.querySelectorAll('h3')];
    if(h3s[0]) h3s[0].textContent='外国留学生可以参加，但利用方式因学校而异';
    if(h3s[1]) h3s[1].textContent='这条路线的价值，在于多一个可比较的选择';
    return section;
  }

  function polishCompany(){
    const company=home.querySelector('#company');
    if(!company) return null;
    company.classList.add('v4-company');
    const h2=company.querySelector('h2');
    if(h2 && !company.querySelector('.v4-company-legal')){
      const legal=h2.textContent.trim();
      h2.textContent='关于旅人教育 TABITO';
      h2.insertAdjacentHTML('beforebegin',`<p class="v4-company-legal">${legal}</p>`);
    }
    return company;
  }

  function compactClassroom(){
    const section=home.querySelector('#nakano-classroom');
    if(!section) return null;
    section.className='v4-classroom';
    section.innerHTML=`<div class="v3-shell v4-classroom-row">
      <figure class="v4-classroom-photo"><img src="https://kayui-gavo.github.io/assets/tabito-classroom-v5.webp" alt="旅人教育东京中野教室实景" loading="lazy"></figure>
      <div class="v4-classroom-main">
        <p class="v3-kicker">NAKANO CLASSROOM</p>
        <h2>东京・中野教室</h2>
        <p>线下课程、升学面谈与部分教学活动在中野教室开展。</p>
        <address><strong>中国旅人教育集团株式会社</strong><br>〒164-0001 東京都中野区中野1-55-3 フェリスビル 4F</address>
      </div>
      <div class="v4-classroom-actions">
        <a href="https://xhslink.cn/m/5QyfLyRRHK1" target="_blank" rel="noopener noreferrer">小红书官方号 ↗</a>
        <a href="images/wechat_qr1.jpeg" target="_blank" rel="noopener noreferrer">微信 / 公众号二维码 ↗</a>
        <a href="teachers/liu-kewei.html">讲师介绍 ↗</a>
        <details><summary>查看地图</summary><iframe title="旅人教育东京中野教室地图" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E9%87%8E%E5%8C%BA%E4%B8%AD%E9%87%8E1-55-3%20%E3%83%95%E3%82%A7%E3%83%AA%E3%82%B9%E3%83%93%E3%83%AB&output=embed"></iframe></details>
      </div>
    </div>`;
    return section;
  }

  function compactRecruit(){
    const recruit=home.querySelector('#recruit');
    if(!recruit) return null;
    recruit.classList.add('v4-recruit');
    const title=recruit.querySelector('.v3-title');
    if(title) title.textContent='讲师募集｜兼职';
    const lede=recruit.querySelector('.v3-lede');
    if(lede) lede.textContent='招募共通考试、EJU、校内考及各学科兼职讲师。我们重视备课质量、信息核实、学生反馈和团队沟通。';
    return recruit;
  }

  function polishContact(){
    const contact=home.querySelector('#contact');
    if(!contact) return null;
    contact.classList.add('v4-contact');
    const h2=contact.querySelector('h2');
    const p=h2 && h2.parentElement?.querySelector('p');
    if(h2) h2.textContent='升学咨询';
    if(p) p.textContent='把目标校、当前成绩和预计入学时间告诉我们。先确认考试路线和准备顺序，再决定需要的课程。';
    [...contact.querySelectorAll('a')].forEach(a=>{
      a.textContent=a.textContent.replace(/[📞📄🎨]/g,'').trim();
    });
    return contact;
  }

  function reorderHome(programs, method, common, company, classroom, recruit, contact){
    const hero=home.querySelector('section.hero-bg');
    const results=home.querySelector('#results');
    const teachers=home.querySelector('.v3-teachers-home');
    const order=[programs,results,method,teachers,common,company,classroom,recruit,contact].filter(Boolean);
    let anchor=hero;
    order.forEach(section=>{ anchor.insertAdjacentElement('afterend',section); anchor=section; });
  }

  function addReadingNav(){
    if(home.querySelector('.v4-reading-nav')) return;
    const hero=home.querySelector('section.hero-bg');
    if(!hero) return;
    hero.insertAdjacentHTML('afterend',`<nav class="v4-reading-nav" aria-label="首页快速导航"><div class="v3-shell"><span>快速查看</span><a href="#programs">课程</a><a href="#results">合格实绩</a><a href="#how-we-work">教学与升学支持</a><a href="#nakano-classroom">中野教室</a><a href="#contact">咨询</a></div></nav>`);
  }

  function init(){
    polishHero();
    const programs=polishPrograms();
    const method=addMethodStrip();
    const common=polishCommonGuide();
    const company=polishCompany();
    const classroom=compactClassroom();
    const recruit=compactRecruit();
    const contact=polishContact();
    reorderHome(programs,method,common,company,classroom,recruit,contact);
    addReadingNav();
    document.documentElement.classList.add('tabito-v4-flow');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
