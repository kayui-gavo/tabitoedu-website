(() => {
  'use strict';

  const home = document.getElementById('home');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

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
    ['谢老师','明治大学'],
    ['周老师','名古屋大学']
  ];

  const universities = [
    ['东京科学大学',2],
    ['日本大学',3],
    ['北海道大学',1],
    ['京都产业大学',1],
    ['神奈川工科大学',1],
    ['中央大学',1]
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
      const block = el.closest('article,.feature-card,li,[class*="rounded-2xl"],[class*="rounded-3xl"]');
      (block || el).remove();
    });
    document.querySelectorAll('h2,h3,h4,p,span,strong').forEach(el => {
      if ((el.textContent || '').replace(/\s+/g,'').includes('李老师')) {
        const block = el.closest('article,.feature-card,li,[class*="rounded-2xl"],[class*="rounded-3xl"]');
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
      ['合格实绩','home','results'], ['讲师','home','faculty'], ['升学资讯','home','insights'], ['升学咨询','home','contact']
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
        <header><h3>数学</h3></header>
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
        <header><h3>事务・运营・产品开发</h3></header>
        <div>${operations.map(([name,school])=>`<span><b>${esc(name)}</b><small>${esc(school)}｜非授课</small></span>`).join('')}</div>
      </div>`;
  }

  function programCard({number,title,subtitle,body,fact,link,page,target='',images=[],contain=false}) {
    return `
      <article class="finish-program-card">
        <div class="finish-program-media${contain?' is-contain':''}">
          ${images.map((src,i)=>`<img src="${src}" alt="${esc(title)}相关资料 ${i+1}">`).join('')}
          <span class="finish-program-number">${number}</span>
        </div>
        <div class="finish-program-body">
          <span class="finish-program-label">${subtitle}</span>
          <h3>${title}</h3>
          <p>${body}</p>
          <div class="finish-program-meta">${fact}</div>
          <a href="#" data-finish-page="${page}"${target?` data-finish-target="${target}"`:''}>${link} →</a>
        </div>
      </article>`;
  }

  function rebuildHome() {
    if (!home) return;
    home.innerHTML = `
      <section class="finish-hero">
        <div class="finish-shell finish-hero-layout">
          <div class="finish-hero-copy">
            <span class="finish-kicker">旅人教育 TABITO｜东京・中野</span>
            <h1>日本本科升学指导</h1>
            <p class="finish-brand-line">学びの旅に、確かな道しるべを。</p>
            <p class="finish-hero-lede">面向准备日本大学本科升学的中国学生。共通考试、EJU 一对一、目标校校内考、美术升学四类课程，按实际报考要求安排准备。</p>
            <div class="finish-hero-actions"><a href="#" data-finish-page="home" data-finish-target="programs">查看课程</a><a href="#" data-finish-page="home" data-finish-target="contact">升学咨询</a></div>
            <div class="finish-hero-tags"><span>共通考试</span><span>EJU 一对一</span><span>校内考</span><span>美术升学</span></div>
          </div>
          <div class="finish-hero-media">
            <figure class="finish-hero-main"><img src="images/tabito-classroom-teaching.webp" alt="旅人教育中野教室课堂实景"><figcaption><b>中野教室</b><span>课堂实景</span></figcaption></figure>
            <figure><img src="images/student-work-illustration-city.png" alt="旅人教育美术学生作品"><figcaption><b>美术升学</b><span>学生作品</span></figcaption></figure>
            <figure class="finish-hero-proof"><img src="images/success_students1.png" alt="旅人教育部分合格资料"><figcaption><b>合格实绩</b><span>部分资料</span></figcaption></figure>
          </div>
        </div>
      </section>

      <section class="finish-trust-bar"><div class="finish-shell finish-trust-grid">
        <div><strong>9</strong><span>合格校次</span></div>
        <div><strong>6</strong><span>所大学</span></div>
        <div><strong>4</strong><span>类升学课程</span></div>
      </div></section>

      <section id="programs" class="finish-programs"><div class="finish-shell">
        ${sectionHead('升学课程','四类课程','四类课程分别对应不同的报考方式与准备内容。')}
        <div class="finish-program-grid">
          ${programCard({
            number:'01', title:'美术升学', subtitle:'实技・作品集・面试',
            body:'按目标校与专业方向安排实技训练、作品制作、志望理由和面试准备。',
            fact:'学生作品・专业方向指导', link:'查看美术课程', page:'art',
            images:['images/student-work-illustration-city.png','images/student-work-bust-charcoal.jpg']
          })}
          ${programCard({
            number:'02', title:'共通考试', subtitle:'2026 共通テスト',
            body:'11 科按科报名，数学、理科、文科与语言科目按目标校要求组合。',
            fact:'14,000 元 / 科｜材料费 5,000 元｜4 科及以上免材料费', link:'查看科目与费用', page:'kyotsu',
            images:['images/hero_background_1.jpg','images/hero_background_3.jpg']
          })}
          ${programCard({
            number:'03', title:'EJU 一对一', subtitle:'授课形式 1 : 1',
            body:'根据目标校和报考科目安排一对一辅导，并提供文书、出愿与面试准备。',
            fact:'科目辅导・文书・出愿・面试', link:'查看 EJU 指导', page:'eju',
            images:['images/hero_background_6.jpg','images/tabito-classroom-seminar.webp']
          })}
          ${programCard({
            number:'04', title:'校内考对策', subtitle:'目标校专项',
            body:'根据目标校募集要项、考试科目、历年题型和面试要求安排专项课程或小班。',
            fact:'2026 东京科学大学（理工学系）：2 名报名，2 名最终合格', link:'查看校内考内容', page:'eju', target:'school-exam-programs', contain:true,
            images:['images/success_students1.png','images/success_student4.png']
          })}
        </div>
      </div></section>

      <section id="results" class="finish-results"><div class="finish-shell">
        ${sectionHead('合格实绩','截至 2026 年 4 月','9 个合格校次，涉及 6 所大学。')}
        <div class="finish-results-layout">
          <article class="finish-results-main">
            <div class="finish-results-numbers"><span><b>9</b><small>合格校次</small></span><span><b>6</b><small>所大学</small></span></div>
            <div class="finish-result-list">${universities.map(([name,n])=>`<div><span>${name}</span><b>${n}</b></div>`).join('')}</div>
            <p>※ 合格校次不等同于独立学生人数；同一学生取得多个合格结果时分别计入。</p>
          </article>
          <article class="finish-case">
            <span>2026 校内考案例</span><h3>东京科学大学（理工学系）</h3>
            <div class="finish-case-flow"><b>2 名报名</b><i></i><b>2 名笔试合格</b><i></i><b>2 名最终合格</b></div>
            <p>数学・物理・化学｜原创模拟题｜模拟面试</p>
            <small>41026｜经营工学系　　41064｜融合理工学系</small>
          </article>
        </div>
        <div class="finish-proof-strip">
          <figure><img src="images/success_student1.png" alt="部分合格资料 1"></figure>
          <figure><img src="images/success_student2.png" alt="部分合格资料 2"></figure>
          <figure><img src="images/success_student3.png" alt="部分合格资料 3"></figure>
          <figure><img src="images/success_student4.png" alt="部分合格资料 4"></figure>
        </div>
      </div></section>

      <section id="faculty" class="finish-faculty"><div class="finish-shell">
        ${sectionHead('授课与团队','部分讲师介绍','兼任多个领域的教师会重复列出；实际担当以当期排课为准。')}
        <div class="finish-guidance-line"><span>募集要项・考试科目</span><i></i><span>课程安排</span><i></i><span>授课・练习</span><i></i><span>出愿・面试</span></div>
        <div class="finish-faculty-directory">${facultyHTML()}</div>
      </div></section>

      <section id="insights" class="finish-insights"><div class="finish-shell">
        ${sectionHead('公开内容','升学资讯','政策说明、学生采访与美术升学内容。')}
        <div class="finish-insight-grid">
          <a href="https://mp.weixin.qq.com/s/ZMtJsMmy-gfTXMUUDcR7HQ" target="_blank" rel="noopener noreferrer"><small>微信公众号｜共通考试</small><b>共通考试政策说明</b><span>查看文章 ↗</span></a>
          <a href="https://xhslink.cn/o/17CWJJBamPK" target="_blank" rel="noopener noreferrer"><small>学生采访</small><b>逆袭！日本大学一般入试合格学生采访</b><span>查看采访 ↗</span></a>
          <a href="https://xhslink.cn/o/2EDGvnprZwG" target="_blank" rel="noopener noreferrer"><small>小红书｜美术升学</small><b>【日本美大捷径】用中文去考京都精华大学！</b><span>查看内容 ↗</span></a>
        </div>
        <div class="finish-more-links"><span>更多公开内容</span><a href="https://xhslink.cn/o/5Djzx1FPbYQ" target="_blank" rel="noopener noreferrer">共通考试教师介绍 ↗</a><a href="https://m.tech.china.com/mtz/touzi/2026/0430/230973.html" target="_blank" rel="noopener noreferrer">中华网｜2026.04.30 ↗</a><a href="https://xhslink.cn/m/5QyfLyRRHK1" target="_blank" rel="noopener noreferrer">官方小红书 ↗</a></div>
      </div></section>

      <section id="contact" class="finish-contact"><div class="finish-shell">
        ${sectionHead('升学咨询','咨询与中野教室','咨询时请提供目标校、当前成绩和预计考试或入学时间。')}
        <div class="finish-contact-layout">
          <div class="finish-contact-left">
            <div class="finish-contact-facts"><span><b>目标校</b><small>学校・学部・入试方式</small></span><span><b>当前成绩</b><small>EJU / 共通 / 校内考基础</small></span><span><b>时间</b><small>考试节点・预计入学年度</small></span></div>
            <div class="finish-qr-grid">
              <figure><img src="images/wechat_qr1.jpeg" alt="旅人教育微信咨询二维码"><figcaption><b>微信咨询</b><span>扫码添加微信</span></figcaption></figure>
              <figure><img src="images/qq_qr1.jpeg" alt="旅人教育 QQ 咨询二维码"><figcaption><b>QQ 咨询</b><span>扫码添加 QQ</span></figcaption></figure>
            </div>
          </div>
          <aside class="finish-campus-card">
            <div class="finish-campus-gallery"><img src="images/tabito-classroom-art.webp" alt="旅人教育中野教室"><img src="images/tabito-classroom-seminar.webp" alt="旅人教育中野教室授课空间"></div>
            <div class="finish-campus-bottom"><div class="finish-campus-info"><span class="finish-kicker">东京・中野</span><h3>中野教室</h3><p>中国旅人教育集团株式会社<br>〒164-0001 東京都中野区中野1-55-3 フェリスビル 4F</p><small>线下授课・线上课程</small></div><div class="finish-campus-map"><iframe title="旅人教育中野教室地图" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E9%87%8E%E5%8C%BA%E4%B8%AD%E9%87%8E1-55-3%20%E3%83%95%E3%82%A7%E3%83%AA%E3%82%B9%E3%83%93%E3%83%AB%204F&output=embed"></iframe></div></div>
          </aside>
        </div>
      </div></section>`;

    bindRoutes(home);
    setupImageFallbacks(home);
  }

  function setupImageFallbacks(root) {
    root.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
      img.classList.add('finish-image-failed');
      const p = img.parentElement;
      if (p && !p.querySelector('.finish-image-fallback')) p.insertAdjacentHTML('beforeend','<span class="finish-image-fallback">图片暂未载入</span>');
    }, {once:true}));
  }

  function setupSectionSpy() {
    if (!('IntersectionObserver' in window)) return;
    const targets = ['results','faculty','insights','contact'].map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(entries => {
      if (activePage() !== 'home') return;
      const hit = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if (hit) syncNav('home', hit.target.id);
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
    document.documentElement.classList.add('tabito-finishing','tabito-finishing-r18');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
