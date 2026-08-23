(() => {
  'use strict';

  const home = document.getElementById('home');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => `<span class="finish-icon finish-icon--${name}" aria-hidden="true"></span>`;

  const mathTeachers = [
    ['脇村老师','筑波大学'],
    ['坂野老师','早稻田大学'],
    ['陆老师','东京科学大学']
  ];

  const scienceGroups = [
    ['物理', [
      ['刘老师','东京大学','https://kayui-gavo.github.io/education/'],
      ['陆老师','东京科学大学','']
    ]],
    ['化学', [
      ['孙老师','东京大学',''],
      ['焦老师','东京大学','']
    ]],
    ['生物', [['周老师','筑波大学','']]],
    ['地学', [['丁老师','千叶大学','']]]
  ];

  const humanitiesTeachers = [
    ['刘老师','东京大学','国语・英语・政经・世界史'],
    ['卢老师','横滨国立大学','日语'],
    ['沈老师','布里斯托大学','英语'],
    ['丁老师','千叶大学','地理']
  ];

  const artTeachers = [
    ['妮老师','多摩美术大学','美术'],
    ['汤老师','多摩美术大学','雕刻'],
    ['张老师','多摩美术大学','油画'],
    ['兰老师','东京造型大学大学院','染织设计'],
    ['薛老师','北京电影学院','动画实战']
  ];

  const operations = [
    ['籍老师','东京理科大学'],
    ['吴老师','东京理科大学'],
    ['杨老师','顺天堂大学'],
    ['谢老师','明治大学']
  ];

  function go(page, target = '') {
    window.showPage?.(page);
    window.setTimeout(() => {
      if (target) document.getElementById(target)?.scrollIntoView({behavior:'smooth', block:'start'});
      syncNav(page, target);
    }, 70);
  }

  function bindRoutes(root = document) {
    root.querySelectorAll('[data-finish-page]').forEach(el => {
      if (el.dataset.finishBound === '1') return;
      el.dataset.finishBound = '1';
      el.addEventListener('click', ev => {
        ev.preventDefault();
        go(el.dataset.finishPage, el.dataset.finishTarget || '');
      });
    });
  }

  function activePage() {
    return document.querySelector('.page-section.active')?.id || 'home';
  }

  function removeFormerTeacher() {
    document.querySelectorAll('img[src*="teacher_li.jpg"],img[alt="李老师"]').forEach(el => {
      const block = el.closest('article,.v5-faculty-row,.v3-teacher-card,li');
      (block || el).remove();
    });
    document.querySelectorAll('h2,h3,h4,p,span,strong').forEach(el => {
      if ((el.textContent || '').replace(/\s+/g,'').includes('李老师')) {
        const block = el.closest('article,.v5-faculty-row,.v3-teacher-card');
        if (block) block.remove();
      }
    });
  }

  function compactNavigation() {
    const nav = document.querySelector('nav.fixed');
    const desktop = nav?.querySelector('.hidden.md\\:flex');
    const mobile = document.querySelector('#mobileMenu .flex.flex-col');
    const items = [
      ['美术升学','art',''], ['共通考试','kyotsu',''], ['EJU・校内考','eju',''],
      ['合格实绩','home','results'], ['讲师','home','faculty'], ['升学咨询','home','contact']
    ];
    const render = isMobile => items.map(([label,page,target],i) =>
      `<a href="#" class="${isMobile?'finish-mobile-nav':'finish-nav-link'}${i===items.length-1&&!isMobile?' finish-nav-cta':''}" data-finish-page="${page}" data-finish-target="${target}" data-nav-page="${page}" data-nav-target="${target}">${label}</a>`
    ).join('');
    if (desktop) {
      desktop.innerHTML = render(false);
      desktop.className = 'hidden md:flex finish-nav';
      bindRoutes(desktop);
    }
    if (mobile) {
      mobile.innerHTML = render(true);
      bindRoutes(mobile);
      mobile.querySelectorAll('[data-finish-page]').forEach(a => a.addEventListener('click', () => window.toggleMobileMenu?.()));
    }
    if (nav && !nav.querySelector('.finish-scroll-progress')) {
      nav.insertAdjacentHTML('beforeend','<div class="finish-scroll-progress" aria-hidden="true"><i></i></div>');
    }
  }

  function syncNav(page, target = '') {
    document.querySelectorAll('[data-nav-page]').forEach(a => {
      const on = target ? (a.dataset.navPage === page && a.dataset.navTarget === target) : (a.dataset.navPage === page && !a.dataset.navTarget);
      a.classList.toggle('is-current', on);
      if (on) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
  }

  function setupScrollProgress() {
    const bar = document.querySelector('.finish-scroll-progress i');
    if (!bar) return;
    let ticking = false;
    const draw = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollY / max))})`;
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(draw); ticking = true; }
    }, {passive:true});
    draw();
  }

  function sectionHead(kicker, title, desc = '') {
    return `<header class="finish-section-head"><div><span class="finish-kicker">${kicker}</span><h2>${title}</h2></div>${desc ? `<p>${desc}</p>` : ''}</header>`;
  }

  function person(name, school, subject = '', href = '') {
    const body = `<b>${esc(name)}</b><span>${esc(school)}</span>${subject ? `<small>${esc(subject)}</small>` : ''}`;
    return href ? `<a href="${esc(href)}" class="finish-person">${body}<i>↗</i></a>` : `<div class="finish-person">${body}</div>`;
  }

  function scienceHTML() {
    return scienceGroups.map(([subject, rows]) => `<div class="finish-science-subgroup"><h4>${subject}</h4><div>${rows.map(([name,school,href])=>person(name,school,'',href)).join('')}</div></div>`).join('');
  }

  function facultyHTML() {
    return `
      <div class="finish-faculty-line">
        <header><h3>数学</h3><p>数学担当</p></header>
        <div class="finish-person-grid finish-person-grid--three">${mathTeachers.map(([name,school])=>person(name,school)).join('')}</div>
      </div>
      <div class="finish-faculty-line finish-faculty-line--science">
        <header><h3>理科</h3><p>物理・化学・生物・地学</p></header>
        <div class="finish-science-grid">${scienceHTML()}</div>
      </div>
      <div class="finish-faculty-line">
        <header><h3>语言・人文</h3><p>国语・日语・英语・政经・世界史・地理</p></header>
        <div class="finish-person-grid finish-person-grid--four">${humanitiesTeachers.map(([name,school,subject])=>person(name,school,subject)).join('')}</div>
      </div>
      <div class="finish-faculty-line">
        <header><h3>美术</h3><p>实技・作品集・专业方向</p></header>
        <div class="finish-person-grid finish-person-grid--five">${artTeachers.map(([name,school,subject])=>person(name,school,subject)).join('')}</div>
      </div>
      <div class="finish-ops-strip">
        <header><h3>事务・运营・开发</h3><p>非授课成员</p></header>
        <div>${operations.map(([name,school])=>`<span><b>${esc(name)}</b><small>${esc(school)}</small></span>`).join('')}</div>
      </div>`;
  }

  function rebuildHome() {
    if (!home) return;
    home.innerHTML = `
      <section class="finish-hero">
        <div class="finish-hero-bg" aria-hidden="true"></div>
        <div class="finish-shell finish-hero-layout">
          <div class="finish-hero-copy">
            <span class="finish-kicker">日本留学升学指导</span>
            <h1>共通考试・EJU・校内考・美术升学</h1>
            <p class="finish-brand-line">学びの旅に、確かな道しるべを。</p>
            <p class="finish-hero-lede">面向准备日本本科升学的中国学生，提供共通考试、EJU 一对一、目标校校内考及美术升学指导。</p>
            <div class="finish-hero-actions"><a href="#" data-finish-page="home" data-finish-target="programs">查看课程</a><a href="#" data-finish-page="home" data-finish-target="contact">升学咨询</a></div>
            <div class="finish-hero-tags" aria-label="主要业务"><span>共通考试</span><span>EJU 一对一</span><span>校内考</span><span>美术升学</span></div>
          </div>
          <div class="finish-hero-visual" aria-label="学生作品与合格资料">
            <figure class="finish-hero-visual-main"><img src="images/student-work-illustration-city.png" alt="旅人教育美术学生作品"><figcaption><b>美术升学</b><span>学生作品</span></figcaption></figure>
            <figure class="finish-hero-visual-proof"><img src="images/success_students.jpg" alt="旅人教育合格资料"><figcaption><b>合格实绩</b><span>部分资料</span></figcaption></figure>
            <div class="finish-hero-visual-note"><small>2026 共通考试</small><b>14,000 元 / 科</b><span>4 科及以上免材料费</span></div>
          </div>
        </div>
      </section>

      <section class="finish-trust-bar" aria-label="旅人教育合格实绩"><div class="finish-shell finish-trust-grid">
        <div><strong>9</strong><span>合格校次</span></div>
        <div><strong>6</strong><span>所大学</span></div>
        <div><strong>2 / 2</strong><span>东京科学大学｜2 名最终合格</span></div>
      </div></section>

      <section id="programs" class="finish-programs"><div class="finish-shell">
        ${sectionHead('升学课程','四类课程','课程按实际报考方式区分。美术以作品与实技为主，其余课程直接列出费用、形式和对策范围。')}
        <div class="finish-program-editorial">
          <article class="finish-program-feature finish-program-feature--art">
            <div class="finish-art-grid"><img src="images/student-work-illustration-city.png" alt="学生插画作品"><img src="images/student-work-bust-charcoal.jpg" alt="学生素描作品"><img src="images/student-work-stilllife-wires.png" alt="学生静物作品"></div>
            <div class="finish-program-feature-copy"><span>美术升学</span><h3>实技・作品集・志望理由・面试</h3><p>根据目标校与专业方向安排实技训练、作品制作和面试准备。</p><a href="#" data-finish-page="art">查看美术课程 →</a></div>
          </article>

          <div class="finish-program-stack">
            <article class="finish-program-compact finish-program-compact--common">
              <div class="finish-program-stat"><small>2026 共通テスト</small><b>14,000</b><span>元 / 科</span></div>
              <div class="finish-program-compact-copy"><h3>共通考试</h3><p>11 科按科报名。材料费 5,000 元，4 科及以上免材料费。</p><dl><div><dt>支持</dt><dd>志愿规划・报名材料・手续指导</dd></div></dl><a href="#" data-finish-page="kyotsu">科目与费用 →</a></div>
            </article>

            <article class="finish-program-compact finish-program-compact--eju">
              <div class="finish-program-label"><small>形式</small><b>一对一</b><span>目标校・科目・出愿・面试</span></div>
              <div class="finish-program-compact-copy"><h3>EJU 一对一</h3><p>根据目标校和报考科目安排授课，并覆盖文书、出愿与面试准备。</p><a href="#" data-finish-page="eju">查看 EJU 指导 →</a></div>
            </article>

            <article class="finish-program-compact finish-program-compact--school">
              <div class="finish-program-progress"><small>2026 东京科学大学</small><div><span><b>2</b><em>报名</em></span><i></i><span><b>2</b><em>笔试合格</em></span><i></i><span><b>2</b><em>最终合格</em></span></div></div>
              <div class="finish-program-compact-copy"><h3>校内考对策</h3><p>按目标校的笔试科目、历年题型和面试要求开设专项课程或小班。</p><a href="#" data-finish-page="eju" data-finish-target="school-exam-programs">查看校内考案例 →</a></div>
            </article>
          </div>
        </div>
      </div></section>

      <section id="results" class="finish-results"><div class="finish-shell">
        ${sectionHead('合格实绩','截至 2026 年 4 月','2025 年 9 月正式开课以来，共记录 9 个合格校次，涉及 6 所大学。')}
        <div class="finish-results-layout">
          <article class="finish-results-overview">
            <div class="finish-results-numbers"><span><b>9</b><small>合格校次</small></span><span><b>6</b><small>所大学</small></span></div>
            <div class="finish-result-list">${[['东京科学大学',2],['日本大学',3],['北海道大学',1],['京都产业大学',1],['神奈川工科大学',1],['中央大学',1]].map(([name,n])=>`<div><span>${name}</span><b>${n}</b></div>`).join('')}</div>
            <p>※ “合格校次”不等同于独立学生人数；同一学生取得多个合格结果时分别计入。</p>
          </article>

          <article class="finish-flagship">
            <div class="finish-flagship-copy"><span class="finish-kicker finish-kicker--light">2026 东京科学大学｜理工学系</span><h3>2 名报名，2 名最终合格</h3><p>数学・物理・化学三科授课，使用原创模拟题，并在笔试后进行模拟面试。</p><div class="finish-flagship-progress"><span><b>2</b><small>报名</small></span><i></i><span><b>2</b><small>笔试合格</small></span><i></i><span><b>2</b><small>最终合格</small></span></div><div class="finish-flagship-students"><span>41026｜经营工学系</span><span>41064｜融合理工学系</span></div></div>
            <figure class="finish-flagship-proof"><img src="images/success_students1.png" alt="旅人教育合格资料"><figcaption>部分合格资料</figcaption></figure>
          </article>
        </div>
      </div></section>

      <section id="faculty" class="finish-faculty"><div class="finish-shell">
        ${sectionHead('部分讲师介绍','授课教师','兼任多个领域的教师会重复列出；实际担当以当期排课为准。')}
        <div class="finish-workflow-strip" aria-label="指导流程"><div>${icon('target')}<span><b>确认目标校</b><small>募集要项・考试科目</small></span></div><i></i><div>${icon('plan')}<span><b>安排课程</b><small>基础・日程・目标</small></span></div><i></i><div>${icon('course')}<span><b>授课与练习</b><small>科目・实技</small></span></div><i></i><div>${icon('document')}<span><b>出愿与面试</b><small>材料・手续・模拟面试</small></span></div></div>
        <div class="finish-faculty-directory">${facultyHTML()}</div>
      </div></section>

      <section id="insights" class="finish-insights"><div class="finish-shell">
        <div class="finish-insights-head"><div><span class="finish-kicker">公开内容</span><h2>升学资讯</h2></div><p>政策说明、学生采访与公开报道。</p></div>
        <div class="finish-insight-strip">
          <a href="https://mp.weixin.qq.com/s/ZMtJsMmy-gfTXMUUDcR7HQ" target="_blank" rel="noopener noreferrer"><small>微信公众号</small><b>共通考试政策说明</b><span>查看文章 ↗</span></a>
          <a href="https://xhslink.cn/o/17CWJJBamPK" target="_blank" rel="noopener noreferrer"><small>学生采访</small><b>日本大学一般入试合格学生采访</b><span>查看采访 ↗</span></a>
          <a href="https://xhslink.cn/o/5Djzx1FPbYQ" target="_blank" rel="noopener noreferrer"><small>小红书</small><b>共通考试教师介绍</b><span>查看内容 ↗</span></a>
        </div>
        <div class="finish-media-links"><span>媒体报道</span><a href="https://m.tech.china.com/mtz/touzi/2026/0430/230973.html" target="_blank" rel="noopener noreferrer">中华网｜2026.04.30 ↗</a><a href="https://life.china.com/2026-04/29/content_571768.html" target="_blank" rel="noopener noreferrer">中华网生活｜2026.04.29 ↗</a><a href="https://xhslink.cn/m/5QyfLyRRHK1" target="_blank" rel="noopener noreferrer">官方小红书 ↗</a></div>
      </div></section>

      <section id="contact" class="finish-contact"><div class="finish-shell finish-contact-layout">
        <div class="finish-contact-copy"><span class="finish-kicker finish-kicker--light">升学咨询</span><h2>咨询时请提供基本情况</h2><p>请附上目标校、当前成绩和预计考试或入学时间。</p><div class="finish-contact-facts"><span><b>目标校</b><small>学校・学部・入试方式</small></span><span><b>当前成绩</b><small>EJU / 共通 / 校内考基础</small></span><span><b>时间</b><small>预计入学年度・考试节点</small></span></div><div class="finish-contact-qr"><img src="images/wechat_qr.jpeg" alt="旅人教育微信二维码"><span><b>微信咨询</b><small>扫码添加咨询</small></span></div></div>
        <aside class="finish-campus-card" aria-label="东京中野教室"><div class="finish-campus-media"><img src="https://kayui-gavo.github.io/assets/tabito-classroom-v5.webp" alt="旅人教育东京中野教室"></div><div class="finish-campus-info"><div><span class="finish-kicker">东京・中野</span><h3>实体教室</h3><p>中国旅人教育集团株式会社<br>〒164-0001 東京都中野区中野1-55-3 フェリスビル 4F</p><small>实体课程・线上课程</small></div><div class="finish-campus-map"><iframe title="旅人教育中野教室地图" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E9%87%8E%E5%8C%BA%E4%B8%AD%E9%87%8E1-55-3%20%E3%83%95%E3%82%A7%E3%83%AA%E3%82%B9%E3%83%93%E3%83%AB%204F&output=embed"></iframe></div></div></aside>
      </div></section>`;

    bindRoutes(home);
    setupImageFallbacks(home);
  }

  function setupImageFallbacks(root) {
    root.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', () => {
        img.classList.add('finish-image-failed');
        const p = img.parentElement;
        if (p && !p.querySelector('.finish-image-fallback')) p.insertAdjacentHTML('beforeend','<span class="finish-image-fallback">图片暂未载入</span>');
      }, {once:true});
    });
  }

  function setupSectionSpy() {
    if (!('IntersectionObserver' in window)) return;
    const targets = ['programs','results','faculty','insights','contact'].map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(entries => {
      if (activePage() !== 'home') return;
      const hit = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if (hit) syncNav('home', hit.target.id === 'programs' ? '' : hit.target.id);
    }, {rootMargin:'-25% 0px -60%', threshold:[.05,.2,.4]});
    targets.forEach(el => io.observe(el));
  }

  function hideLegacyFloatingConsult() {
    document.querySelectorAll('body>a.fixed[href="#contact"],.v11-floating-consult').forEach(el => el.style.display='none');
  }

  function updateMetadata() {
    document.title = '旅人教育 TABITO｜日本本科升学指导';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content','旅人教育 TABITO：面向中国学生的日本本科升学指导，提供美术升学、共通考试、EJU 一对一及校内考对策。');
  }

  function init() {
    removeFormerTeacher();
    compactNavigation();
    rebuildHome();
    hideLegacyFloatingConsult();
    updateMetadata();
    setupScrollProgress();
    setupSectionSpy();
    syncNav(activePage(), '');
    document.documentElement.classList.add('tabito-finishing','tabito-finishing-r14');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();