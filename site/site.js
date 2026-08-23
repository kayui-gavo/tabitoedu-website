(() => {
  'use strict';

  const home = document.getElementById('home');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const universities = [
    ['东京科学大学',2],['日本大学',3],['北海道大学',1],['京都产业大学',1],['神奈川工科大学',1],['中央大学',1]
  ];
  const mathTeachers = [['脇村老师','筑波大学'],['坂野老师','早稻田大学'],['陆老师','东京科学大学']];
  const scienceGroups = [
    ['物理',[['刘老师','东京大学','https://kayui-gavo.github.io/education/'],['陆老师','东京科学大学','']]],
    ['化学',[['孙老师','东京大学',''],['焦老师','东京大学','']]],
    ['生物',[['周老师','筑波大学','']]],
    ['地学',[['丁老师','千叶大学','']]]
  ];
  const humanitiesTeachers = [['刘老师','东京大学','国语・英语・政经・世界史'],['卢老师','横滨国立大学','日语'],['沈老师','布里斯托大学','英语'],['丁老师','千叶大学','地理']];
  const artTeachers = [['妮老师','多摩美术大学','美术'],['汤老师','多摩美术大学','雕刻'],['张老师','多摩美术大学','油画'],['兰老师','东京造型大学大学院','染织设计'],['薛老师','北京电影学院','动画实战']];
  const operations = [['籍老师','东京理科大学'],['吴老师','东京理科大学'],['杨老师','顺天堂大学'],['谢老师','明治大学'],['周老师','名古屋大学']];

  function scrollToSection(id) {
    if (!document.getElementById('home')?.classList.contains('active')) window.showPage?.('home');
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}));
  }

  function bindScrollLinks(root=document) {
    root.querySelectorAll('[data-home-target]').forEach(a => {
      if (a.dataset.bound === '1') return;
      a.dataset.bound = '1';
      a.addEventListener('click', e => { e.preventDefault(); scrollToSection(a.dataset.homeTarget); });
    });
  }

  function compactNavigation() {
    const nav = document.querySelector('nav.fixed');
    const desktop = nav?.querySelector('.hidden.md\\:flex');
    const mobile = document.querySelector('#mobileMenu .flex.flex-col');
    const items = [['课程','programs'],['合格实绩','results'],['讲师','faculty'],['升学资讯','insights'],['升学咨询','contact']];
    const render = mobileMode => items.map(([label,target],i) => `<a href="#${target}" class="${mobileMode?'site-mobile-nav':'site-nav-link'}${!mobileMode&&i===items.length-1?' site-nav-cta':''}" data-home-target="${target}">${label}</a>`).join('');
    if (desktop) { desktop.className='hidden md:flex site-nav'; desktop.innerHTML=render(false); bindScrollLinks(desktop); }
    if (mobile) { mobile.innerHTML=render(true); bindScrollLinks(mobile); mobile.querySelectorAll('[data-home-target]').forEach(a=>a.addEventListener('click',()=>window.toggleMobileMenu?.())); }
    if (nav && !nav.querySelector('.site-scroll-progress')) nav.insertAdjacentHTML('beforeend','<div class="site-scroll-progress"><i></i></div>');
  }

  const sectionHead = (eyebrow,title,desc='') => `<header class="site-section-head"><div><span>${eyebrow}</span><h2>${title}</h2></div>${desc?`<p>${desc}</p>`:''}</header>`;

  function person(name,school,subject='',href='') {
    const body = `<b>${esc(name)}</b><span>${esc(school)}</span>${subject?`<small>${esc(subject)}</small>`:''}`;
    return href ? `<a class="site-person" href="${esc(href)}">${body}<i>↗</i></a>` : `<div class="site-person">${body}</div>`;
  }

  function facultyHTML() {
    const science = scienceGroups.map(([subject,rows])=>`<div class="site-science-group"><h4>${subject}</h4>${rows.map(([n,s,h])=>person(n,s,'',h)).join('')}</div>`).join('');
    return `
      <div class="site-faculty-row"><header><h3>数学</h3></header><div class="site-person-grid cols-3">${mathTeachers.map(([n,s])=>person(n,s)).join('')}</div></div>
      <div class="site-faculty-row"><header><h3>理科</h3><p>物理・化学・生物・地学</p></header><div class="site-science-grid">${science}</div></div>
      <div class="site-faculty-row"><header><h3>语言・人文</h3></header><div class="site-person-grid cols-4">${humanitiesTeachers.map(([n,s,sub])=>person(n,s,sub)).join('')}</div></div>
      <div class="site-faculty-row"><header><h3>美术</h3></header><div class="site-person-grid cols-5">${artTeachers.map(([n,s,sub])=>person(n,s,sub)).join('')}</div></div>
      <div class="site-ops-row"><header><h3>事务・运营・开发</h3></header><div>${operations.map(([n,s])=>`<span><b>${esc(n)}</b><small>${esc(s)}</small></span>`).join('')}</div></div>`;
  }

  function programCard({id,title,eyebrow,body,meta,images,accent=''}) {
    return `<article id="${id}" class="site-program-card ${accent}">
      <div class="site-program-media">${images.map((src,i)=>`<img src="${src}" alt="${esc(title)} ${i+1}">`).join('')}</div>
      <div class="site-program-copy"><span>${eyebrow}</span><h3>${title}</h3><p>${body}</p><small>${meta}</small></div>
    </article>`;
  }

  function rebuildHome() {
    if (!home) return;
    home.innerHTML = `
      <section class="site-hero"><div class="site-shell site-hero-grid">
        <div class="site-hero-copy">
          <span class="site-kicker">旅人教育 TABITO</span>
          <h1>日本本科升学<br>课程与报考指导</h1>
          <p class="site-hero-subtitle">共通考试・EJU 一对一・校内考・美术升学</p>
          <p class="site-hero-lede">面向准备日本大学本科升学的中国学生，提供科目辅导、出愿材料与面试准备。</p>
          <p class="site-brand-line">学びの旅に、確かな道しるべを。</p>
          <div class="site-hero-actions"><a href="#programs" data-home-target="programs">课程介绍</a><a href="#contact" data-home-target="contact">升学咨询</a></div>
        </div>
        <div class="site-hero-visual">
          <figure class="main"><img src="images/tabito-classroom-teaching.webp" alt="旅人教育课堂授课实景"><figcaption>课堂实景</figcaption></figure>
          <figure><img src="images/student-work-illustration-city.png" alt="美术学生作品"><figcaption>学生作品</figcaption></figure>
          <figure><img src="images/tabito-classroom-art.webp" alt="美术教室"><figcaption>美术教室</figcaption></figure>
        </div>
      </div></section>

      <section class="site-facts"><div class="site-shell site-facts-grid"><div><b>9</b><span>合格校次</span></div><div><b>6</b><span>所大学</span></div><div><b>4</b><span>类升学课程</span></div></div></section>

      <section id="programs" class="site-programs"><div class="site-shell">
        ${sectionHead('课程','四类升学课程','对应不同的报考方式与准备内容。')}
        <div class="site-program-grid">
          ${programCard({id:'program-art',title:'美术升学',eyebrow:'实技・作品集・面试',body:'实技训练、作品制作、志望理由与面试准备。',meta:'美术院校与专业方向个别确认',images:['images/tabito-classroom-art.webp','images/student-work-bust-charcoal.jpg'],accent:'art'})}
          ${programCard({id:'program-kyotsu',title:'共通考试',eyebrow:'2026 共通テスト',body:'11 科按科报名，依据目标校要求组合数学、理科、文科与语言科目。',meta:'14,000 元 / 科｜材料费 5,000 元｜4 科及以上免材料费',images:['images/tabito-classroom-teaching.webp','images/hero_background_1.jpg']})}
          ${programCard({id:'program-eju',title:'EJU 一对一',eyebrow:'授课形式 1 : 1',body:'按目标校和报考科目安排一对一辅导，并衔接文书、出愿与面试。',meta:'科目辅导・文书・出愿・面试',images:['images/tabito-classroom-seminar.webp','images/hero_background_6.jpg']})}
          ${programCard({id:'program-school',title:'校内考对策',eyebrow:'目标校专项',body:'根据募集要项、考试科目、历年题型和面试要求安排专项课程或小班。',meta:'笔试・原创练习・模拟面试',images:['images/success_student4.png','images/tabito-classroom-teaching.webp']})}
        </div>
        <a class="site-art-note" href="https://xhslink.cn/o/2EDGvnprZwG" target="_blank" rel="noopener noreferrer"><span>美术升学专题</span><b>【日本美大捷径】用中文去考京都精华大学！</b><i>查看内容 ↗</i></a>
      </div></section>

      <section id="results" class="site-results"><div class="site-shell">
        ${sectionHead('实绩','合格记录','截至 2026 年 4 月：9 个合格校次，涉及 6 所大学。')}
        <div class="site-results-grid">
          <article class="site-results-overview"><div class="site-result-big"><span><b>9</b><small>合格校次</small></span><span><b>6</b><small>所大学</small></span></div><div class="site-result-list">${universities.map(([name,n])=>`<div><span>${name}</span><b>${n}</b></div>`).join('')}</div><p>※ 合格校次不等同于独立学生人数。</p></article>
          <article class="site-case"><span>校内考案例</span><h3>东京科学大学（理工学系）</h3><div class="site-case-flow"><b>2 名报名</b><i></i><b>2 名笔试合格</b><i></i><b>2 名最终合格</b></div><p>数学・物理・化学｜原创模拟题｜模拟面试</p></article>
        </div>
        <div class="site-proof-strip"><img src="images/success_student1.png" alt="合格资料"><img src="images/success_student2.png" alt="合格资料"><img src="images/success_student3.png" alt="合格资料"><img src="images/success_student4.png" alt="合格资料"></div>
      </div></section>

      <section id="faculty" class="site-faculty"><div class="site-shell">${sectionHead('讲师','部分讲师介绍','实际担当以当期排课为准。')}<div class="site-faculty-directory">${facultyHTML()}</div></div></section>

      <section id="insights" class="site-insights"><div class="site-shell">
        ${sectionHead('公开内容','升学资讯')}
        <div class="site-insight-grid">
          <a href="https://mp.weixin.qq.com/s/ZMtJsMmy-gfTXMUUDcR7HQ" target="_blank" rel="noopener noreferrer"><span>共通考试</span><b>共通考试政策说明</b><i>微信公众号 ↗</i></a>
          <a href="https://xhslink.cn/o/17CWJJBamPK" target="_blank" rel="noopener noreferrer"><span>学生采访</span><b>逆袭！日本大学一般入试合格学生采访</b><i>小红书 ↗</i></a>
          <a href="https://xhslink.cn/o/2EDGvnprZwG" target="_blank" rel="noopener noreferrer"><span>美术升学</span><b>【日本美大捷径】用中文去考京都精华大学！</b><i>小红书 ↗</i></a>
        </div>
        <div class="site-more-links"><a href="https://xhslink.cn/o/5Djzx1FPbYQ" target="_blank" rel="noopener noreferrer">共通考试教师介绍 ↗</a><a href="https://m.tech.china.com/mtz/touzi/2026/0430/230973.html" target="_blank" rel="noopener noreferrer">中华网｜2026.04.30 ↗</a><a href="https://xhslink.cn/m/5QyfLyRRHK1" target="_blank" rel="noopener noreferrer">官方小红书 ↗</a></div>
      </div></section>

      <section id="contact" class="site-contact"><div class="site-shell">
        ${sectionHead('联系','升学咨询','请提供目标校、当前成绩和预计考试或入学时间。')}
        <div class="site-contact-grid">
          <div class="site-contact-main">
            <div class="site-contact-facts"><div><b>目标校</b><span>学校・学部・入试方式</span></div><div><b>当前成绩</b><span>EJU / 共通 / 校内考基础</span></div><div><b>时间</b><span>考试节点・预计入学年度</span></div></div>
            <div class="site-qr-grid">
              <figure><img src="images/wechat_qr1.jpeg" alt="微信二维码"><figcaption><b>微信咨询</b><span>扫码添加微信好友</span><small>9:00–21:00</small></figcaption></figure>
              <figure><img src="images/qq_qr1.jpeg" alt="QQ二维码"><figcaption><b>QQ 咨询</b><span>扫码添加 QQ 好友</span><small>9:00–21:00</small></figcaption></figure>
            </div>
          </div>
          <aside class="site-campus"><div class="site-campus-media"><img src="images/tabito-classroom-art.webp" alt="中野教室"><img src="images/tabito-classroom-seminar.webp" alt="中野教室授课空间"></div><div class="site-campus-body"><div><span>东京・中野</span><h3>中野教室</h3><p>中国旅人教育集团株式会社<br>〒164-0001 東京都中野区中野1-55-3 フェリスビル 4F</p><small>线下授课・线上课程</small></div><iframe title="中野教室地图" loading="lazy" src="https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E9%87%8E%E5%8C%BA%E4%B8%AD%E9%87%8E1-55-3%20%E3%83%95%E3%82%A7%E3%83%AA%E3%82%B9%E3%83%93%E3%83%AB%204F&output=embed"></iframe></div></aside>
        </div>
      </div></section>`;
    bindScrollLinks(home);
  }

  function normalizeLegacyUI() {
    document.documentElement.classList.add('tabito-current');
    document.querySelectorAll('#breadcrumb-home').forEach(el=>el.remove());
    document.querySelectorAll('a.fixed.right-6.bottom-6').forEach(el=>el.remove());
  }

  function init() {
    normalizeLegacyUI();
    document.querySelectorAll('a[href="https://life.china.com/2026-04/29/content_571768.html"]').forEach(el=>el.remove());
    rebuildHome();
    compactNavigation();
    bindScrollLinks();
    scrollTo(0,0);
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();