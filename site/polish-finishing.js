(() => {
  'use strict';

  const home = document.getElementById('home');
  const art = document.getElementById('art');
  const kyotsu = document.getElementById('kyotsu');
  const eju = document.getElementById('eju');
  const text = el => (el?.textContent || '').replace(/\s+/g, ' ').trim();
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => `<span class="finish-icon finish-icon--${name}" aria-hidden="true"></span>`;

  function go(page, target = '') {
    window.showPage?.(page);
    window.setTimeout(() => {
      if (target) document.getElementById(target)?.scrollIntoView({behavior:'smooth', block:'start'});
      syncNav(page, target);
    }, 80);
  }

  function bindRouteLinks(root = document) {
    root.querySelectorAll('[data-finish-page]').forEach(el => {
      if (el.dataset.finishBound === '1') return;
      el.dataset.finishBound = '1';
      el.addEventListener('click', ev => {
        ev.preventDefault();
        go(el.dataset.finishPage, el.dataset.finishTarget || '');
      });
    });
  }

  function removeFormerTeacher() {
    const hits = new Set();
    document.querySelectorAll('img[src*="teacher_li.jpg"], img[alt="李老师"]').forEach(el => hits.add(el));
    document.querySelectorAll('h2,h3,h4,.v5-faculty-name,.v3-teacher-card').forEach(el => {
      if (text(el).replace(/\s+/g,'').includes('李老师')) hits.add(el);
    });
    hits.forEach(el => {
      const card = el.closest('.v5-faculty-row,.v3-teacher-card,.feature-card,article,div.bg-white[class*="rounded-"]');
      (card || el).remove();
    });
  }

  function normalizeLegacyCopy() {
    const exact = new Map([
      ['专业升学服务','升学课程'],
      ['专业师资团队','部分讲师介绍'],
      ['什么是共通考试？','共通考试简介'],
      ['外国人留学生也可以参加！','外国人留学生的报考资格'],
      ['为什么共通考试对中国学生有优势？','共通考试的特点'],
      ['开启你的美术之路','美术升学咨询']
    ]);
    document.querySelectorAll('h1,h2,h3,h4,p').forEach(el => {
      const t = text(el);
      if (exact.has(t)) el.textContent = exact.get(t);
    });
  }

  function activePage() {
    return document.querySelector('.page-section.active')?.id || 'home';
  }

  function compactNavigation() {
    const nav = document.querySelector('nav.fixed');
    const desktop = nav?.querySelector('.hidden.md\\:flex');
    const mobile = document.querySelector('#mobileMenu .flex.flex-col');
    const items = [
      ['美术升学','art',''],
      ['共通考试','kyotsu',''],
      ['EJU・校内考','eju',''],
      ['合格实绩','home','results'],
      ['讲师','home','faculty'],
      ['中野教室','home','nakano-classroom'],
      ['升学咨询','home','contact']
    ];
    const render = isMobile => items.map(([label,page,target], index) =>
      `<a href="#" class="${isMobile ? 'finish-mobile-nav' : 'finish-nav-link'}${index === items.length - 1 && !isMobile ? ' finish-nav-cta' : ''}" data-finish-page="${page}" data-finish-target="${target}" data-nav-page="${page}" data-nav-target="${target}">${label}</a>`
    ).join('');
    if (desktop) {
      desktop.innerHTML = render(false);
      desktop.className = 'hidden md:flex finish-nav';
      bindRouteLinks(desktop);
    }
    if (mobile) {
      mobile.innerHTML = render(true);
      bindRouteLinks(mobile);
      mobile.querySelectorAll('[data-finish-page]').forEach(a => a.addEventListener('click', () => window.toggleMobileMenu?.()));
    }
    if (nav && !nav.querySelector('.finish-scroll-progress')) nav.insertAdjacentHTML('beforeend','<div class="finish-scroll-progress" aria-hidden="true"><i></i></div>');
    syncNav(activePage(), '');
  }

  function syncNav(page, target = '') {
    document.querySelectorAll('[data-nav-page]').forEach(a => {
      const on = target
        ? a.dataset.navPage === page && a.dataset.navTarget === target
        : a.dataset.navPage === page && !a.dataset.navTarget;
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

  function makeHero() {
    if (!home) return;
    const hero = home.querySelector('.v8-hero') || home.querySelector('section.hero-bg');
    if (!hero) return;
    hero.className = 'finish-hero';
    hero.innerHTML = `
      <div class="finish-hero-bg" aria-hidden="true"></div>
      <div class="finish-shell finish-hero-layout">
        <div class="finish-hero-copy">
          <span class="finish-kicker">日本留学升学指导｜东京・中野</span>
          <h1>日本本科升学指导</h1>
          <p class="finish-brand-line">学びの旅に、確かな道しるべを。</p>
          <p class="finish-hero-lede">面向准备日本本科升学的中国学生，提供美术升学、共通考试、EJU 一对一及校内考对策。课程与出愿安排以目标校当年度募集要项为基础。</p>
          <div class="finish-hero-actions">
            <a href="#" data-finish-page="home" data-finish-target="programs">查看课程</a>
            <a href="#" data-finish-page="home" data-finish-target="results">合格实绩</a>
          </div>
          <div class="finish-hero-facts">
            <span>${icon('pin')}<b>东京・中野</b><small>实体教室</small></span>
            <span>${icon('screen')}<b>线上授课</b><small>支持远程课程</small></span>
            <span>${icon('calendar')}<b>按报考日程</b><small>安排课程与出愿</small></span>
          </div>
        </div>
        <div class="finish-hero-collage" aria-label="旅人教育课程与教学素材">
          <a href="#" data-finish-page="art" class="finish-hero-media finish-hero-media--art">
            <img src="images/student-work-illustration-city.png" alt="旅人教育美术学生作品">
            <span><b>美术升学</b><small>学生作品</small></span>
          </a>
          <a href="#" data-finish-page="kyotsu" class="finish-hero-media finish-hero-media--common">
            <img src="images/hero_background_1.jpg" alt="共通考试课程">
            <span><b>共通考试</b><small>按科课程</small></span>
          </a>
          <a href="#" data-finish-page="eju" class="finish-hero-media finish-hero-media--eju">
            <img src="images/hero_background_2.jpg" alt="EJU 一对一指导">
            <span><b>EJU</b><small>一对一指导</small></span>
          </a>
          <a href="#" data-finish-page="eju" data-finish-target="school-exam-programs" class="finish-hero-media finish-hero-media--school">
            <div class="v8-case-visual" aria-hidden="true"></div>
            <span><b>东京科学大学</b><small>课程实际资料</small></span>
          </a>
        </div>
      </div>`;
    bindRouteLinks(hero);
  }

  function styleTrustBar() {
    const trust = home?.querySelector('.v8-trust-bar');
    if (!trust) return;
    trust.classList.add('finish-trust-bar');
  }

  function buildMediaLedger() {
    if (!home) return;
    home.querySelector('.finish-media-ledger')?.remove();
    const trust = home.querySelector('.v8-trust-bar');
    if (!trust) return;
    const section = document.createElement('section');
    section.className = 'finish-media-ledger';
    section.innerHTML = `
      <div class="finish-media-ledger-grid">
        <a href="#" data-finish-page="art" class="finish-ledger-item finish-ledger-item--wide">
          <img src="images/student-work-hat-stilllife.jpg" alt="旅人教育美术学生静物作品">
          <span><b>美术升学</b><small>学生作品选</small></span>
        </a>
        <a href="#" data-finish-page="kyotsu" class="finish-ledger-item">
          <img src="images/hero_background_3.jpg" alt="共通考试课程视觉">
          <span><b>共通考试</b><small>课程与报考支持</small></span>
        </a>
        <a href="#" data-finish-page="eju" class="finish-ledger-item">
          <img src="images/hero_background_6.jpg" alt="EJU 课程视觉">
          <span><b>EJU 一对一</b><small>个人报考计划</small></span>
        </a>
        <a href="#" data-finish-page="eju" data-finish-target="school-exam-programs" class="finish-ledger-item finish-ledger-item--document">
          <div class="v8-case-visual" aria-hidden="true"></div>
          <span><b>东京科学大学</b><small>实际教学资料</small></span>
        </a>
        <a href="#" data-finish-page="home" data-finish-target="results" class="finish-ledger-item">
          <img src="images/success_students.jpg" alt="旅人教育合格资料">
          <span><b>合格实绩</b><small>2026 年 4 月集计</small></span>
        </a>
      </div>`;
    trust.insertAdjacentElement('afterend', section);
    bindRouteLinks(section);
  }

  function buildPrograms() {
    const section = home?.querySelector('#programs');
    if (!section) return;
    section.className = 'finish-programs';
    section.innerHTML = `
      <div class="finish-shell">
        <header class="finish-section-head">
          <div><span class="finish-section-no">01</span><span class="finish-kicker">升学课程</span><h2>四类课程</h2></div>
          <p>按报考方式查看课程内容。美术、共通考试、EJU 与校内考分别安排，不混为同一课程。</p>
        </header>
        <div class="finish-program-grid">
          <article class="finish-program-card finish-program-card--art">
            <div class="finish-program-media finish-program-art-grid">
              <img src="images/student-work-illustration-city.png" alt="学生插画作品">
              <img src="images/student-work-bust-charcoal.jpg" alt="学生素描作品">
              <img src="images/student-work-stilllife-wires.png" alt="学生静物作品">
            </div>
            <div class="finish-program-body"><div class="finish-program-title">${icon('art')}<span><small>美术</small><h3>美术升学</h3></span></div><p>根据目标校和专业方向安排实技、作品制作、作品说明及面试准备。</p><dl><div><dt>主要内容</dt><dd>实技・作品集・面试</dd></div><div><dt>形式</dt><dd>按专业与目标校安排</dd></div></dl><a href="#" data-finish-page="art">查看课程 →</a></div>
          </article>
          <article class="finish-program-card">
            <div class="finish-program-media"><img src="images/hero_background_1.jpg" alt="共通考试课程"></div>
            <div class="finish-program-body"><div class="finish-program-title">${icon('common')}<span><small>共通テスト</small><h3>共通考试</h3></span></div><p>课程按科报名，另提供志愿规划、报名材料准备与审核、手续指导。</p><dl><div><dt>课程费</dt><dd>14,000 元 / 科</dd></div><div><dt>材料费</dt><dd>5,000 元｜4 科起免</dd></div></dl><a href="#" data-finish-page="kyotsu">查看科目与费用 →</a></div>
          </article>
          <article class="finish-program-card">
            <div class="finish-program-media"><img src="images/hero_background_2.jpg" alt="EJU 一对一指导"></div>
            <div class="finish-program-body"><div class="finish-program-title">${icon('eju')}<span><small>EJU</small><h3>EJU 一对一</h3></span></div><p>根据目标校、报考科目和考试日程安排，并提供文书、出愿及面试准备。</p><dl><div><dt>形式</dt><dd>一对一</dd></div><div><dt>支持</dt><dd>科目・文书・出愿・面试</dd></div></dl><a href="#" data-finish-page="eju">查看 EJU 指导 →</a></div>
          </article>
          <article class="finish-program-card finish-program-card--school">
            <div class="finish-program-media finish-program-document"><div class="v8-case-visual" aria-hidden="true"></div></div>
            <div class="finish-program-body"><div class="finish-program-title">${icon('school')}<span><small>校内考</small><h3>目标校专项</h3></span></div><p>根据目标校笔试科目、历年题型和面试要求开设专项课程或小班。</p><dl><div><dt>2026 案例</dt><dd>东京科学大学</dd></div><div><dt>结果</dt><dd>2 名报名・2 名最终合格</dd></div></dl><a href="#" data-finish-page="eju" data-finish-target="school-exam-programs">查看校内考案例 →</a></div>
          </article>
        </div>
      </div>`;
    bindRouteLinks(section);
  }

  function buildResults() {
    const section = home?.querySelector('#results');
    if (!section) return;
    const oldCase = home.querySelector('.v8-case');
    const evidence = oldCase?.querySelector('.v8-case-visual')?.outerHTML || '<div class="v8-case-visual" aria-hidden="true"></div>';
    const schools = [['东京科学大学',2],['日本大学',3],['北海道大学',1],['京都产业大学',1],['神奈川工科大学',1],['中央大学',1]];
    section.className = 'finish-results';
    section.innerHTML = `
      <div class="finish-shell">
        <header class="finish-section-head finish-section-head--results">
          <div><span class="finish-section-no">02</span><span class="finish-kicker">截至 2026 年 4 月</span><h2>合格实绩</h2></div>
          <div class="finish-result-totals"><span><b>9</b><small>合格校次</small></span><span><b>6</b><small>所大学</small></span></div>
        </header>
        <div class="finish-results-grid">
          <div class="finish-school-list">
            ${schools.map(([name,n]) => `<div><span><b>${name}</b><i style="--bar:${n}"></i></span><strong>${n} 名</strong></div>`).join('')}
            <p>※ “合格校次”不等同于独立学生人数；同一学生取得多个合格结果时分别计入。</p>
          </div>
          <article class="finish-titech-case">
            <div class="finish-titech-copy">
              <span class="finish-kicker finish-kicker--light">2026 东京科学大学</span>
              <h3>理工学系<br>数理化笔试对策小班</h3>
              <p>数学・物理・化学三科授课，并使用原创模拟题练习。笔试后进行模拟面试。</p>
              <div class="finish-titech-stats"><span><b>2</b><small>报名</small></span><span><b>2</b><small>笔试合格</small></span><span><b>2</b><small>最终合格</small></span></div>
              <div class="finish-titech-students"><span>41026 · 经营工学系</span><span>41064 · 融合理工学系</span></div>
              <a href="#" data-finish-page="eju" data-finish-target="school-exam-programs">查看课程案例 →</a>
            </div>
            <div class="finish-titech-media"><div class="finish-titech-sheet">${evidence}</div><span>课程实际使用资料</span></div>
          </article>
        </div>
        <div class="finish-success-evidence">
          <header><div><span class="finish-kicker">部分合格资料</span><h3>公开合格记录</h3></div><p>以下使用原官网已有素材展示。</p></header>
          <div class="finish-success-mosaic">
            <figure class="finish-success-main"><img src="images/success_students1.png" alt="合格资料汇总"></figure>
            ${[1,2,3,4].map(n => `<figure><img src="images/success_student${n}.png" alt="合格资料 ${n}"></figure>`).join('')}
          </div>
        </div>
      </div>`;
    oldCase?.remove();
    bindRouteLinks(section);
  }

  function collectArtFaculty() {
    const faculty = home?.querySelector('#faculty');
    if (!faculty) return null;
    const groups = [...faculty.querySelectorAll('.v5-faculty-group')];
    const artGroup = groups.find(g => /美术/.test(text(g.querySelector('h3'))));
    if (!artGroup) return null;
    const rows = [...artGroup.querySelectorAll('.v5-faculty-row')].map(row => ({
      name:text(row.querySelector('.v5-faculty-name')),
      school:text(row.querySelector('.v5-faculty-school')),
      subject:text(row.querySelector('.v5-faculty-subject'))
    })).filter(x => x.name && !x.name.includes('李老师'));
    return rows.length ? {title:'美术', note:'美术升学担当', rows} : null;
  }

  function facultyGroups() {
    const groups = [
      {title:'理工', note:'数学・理科', rows:[
        {name:'刘老师',school:'东京大学',subject:'物理',href:'https://kayui-gavo.github.io/education/'},
        {name:'脇村老师',school:'筑波大学',subject:'数学'},
        {name:'坂野老师',school:'早稻田大学',subject:'数学'},
        {name:'孙老师',school:'东京大学',subject:'物理・化学'},
        {name:'陆老师',school:'东京科学大学',subject:'数学・物理'},
        {name:'周老师',school:'筑波大学',subject:'生物'},
        {name:'丁老师',school:'千叶大学',subject:'地学'},
        {name:'焦老师',school:'东京大学',subject:'化学'}
      ]},
      {title:'语言・人文', note:'语言・社会', rows:[
        {name:'刘老师',school:'东京大学',subject:'国语・英语・政经・世界史'},
        {name:'卢老师',school:'横滨国立大学',subject:'日语'},
        {name:'沈老师',school:'布里斯托大学',subject:'英语'},
        {name:'丁老师',school:'千叶大学',subject:'地理'}
      ]}
    ];
    const artGroup = collectArtFaculty();
    if (artGroup) groups.push(artGroup);
    groups.push({title:'事务・运营・产品', note:'非授课岗位', rows:[
      {name:'籍老师',school:'东京理科大学',subject:'事务・运营・产品开发'},
      {name:'吴老师',school:'东京理科大学',subject:'事务・运营・产品开发'},
      {name:'杨老师',school:'顺天堂大学',subject:'事务・运营・产品开发'},
      {name:'谢老师',school:'明治大学',subject:'事务・运营・产品开发'}
    ]});
    return groups;
  }

  function facultyRow(row) {
    const inner = `<span>${esc(row.name)}</span><small>${esc(row.school)}</small><em>${esc(row.subject)}</em><b>${row.href ? '↗' : ''}</b>`;
    return row.href ? `<a class="finish-faculty-row" href="${esc(row.href)}">${inner}</a>` : `<div class="finish-faculty-row">${inner}</div>`;
  }

  function buildAcademicAndFaculty() {
    if (!home) return;
    const oldMethod = home.querySelector('#how-we-work');
    const oldFaculty = home.querySelector('#faculty');
    home.querySelector('.finish-academic-hub')?.remove();
    const groups = facultyGroups();
    if (!oldMethod && !oldFaculty) return;
    const section = document.createElement('section');
    section.className = 'finish-academic-hub';
    section.innerHTML = `
      <div class="finish-shell">
        <header class="finish-section-head"><div><span class="finish-section-no">03</span><span class="finish-kicker">授课与支持</span><h2>从目标校确认到出愿</h2></div><p>先核对当年度募集要项，再根据考试时间安排科目、课程和出愿准备。</p></header>
        <div class="finish-academic-grid">
          <div id="how-we-work" class="finish-process-panel">
            <ol>
              <li>${icon('target')}<span><small>01</small><b>确认目标校</b><em>募集要项・入试方式・考试科目</em></span></li>
              <li>${icon('plan')}<span><small>02</small><b>安排科目与进度</b><em>当前基础・考试时间・目标分数</em></span></li>
              <li>${icon('course')}<span><small>03</small><b>分科授课</b><em>数学・理科・语言・人文・美术</em></span></li>
              <li>${icon('document')}<span><small>04</small><b>出愿与面试</b><em>材料・手续・模拟面试</em></span></li>
            </ol>
            <figure><img src="https://kayui-gavo.github.io/assets/tabito-classroom-v5.webp" alt="旅人教育东京中野教室"><figcaption>东京・中野实体教室</figcaption></figure>
          </div>
          <div id="faculty" class="finish-faculty-panel">
            <div class="finish-faculty-head"><div><span class="finish-kicker">部分讲师介绍</span><h3>担当教师・运营成员</h3></div><p>具体担当以当期排课为准。</p></div>
            <div class="finish-faculty-tabs" role="tablist">${groups.map((g,i) => `<button type="button" class="${i===0?'is-active':''}" data-faculty-tab="${i}" aria-selected="${i===0?'true':'false'}"><b>${esc(g.title)}</b><span>${g.rows.length}</span></button>`).join('')}</div>
            <div class="finish-faculty-panels">${groups.map((g,i) => `<section class="${i===0?'is-active':''}" data-faculty-panel="${i}"><header><span>${esc(g.note)}</span></header><div>${g.rows.map(facultyRow).join('')}</div></section>`).join('')}</div>
          </div>
        </div>
      </div>`;
    const anchor = oldMethod || oldFaculty;
    anchor.insertAdjacentElement('beforebegin', section);
    oldMethod?.remove();
    oldFaculty?.remove();
    section.querySelectorAll('[data-faculty-tab]').forEach(button => button.addEventListener('click', () => {
      const key = button.dataset.facultyTab;
      section.querySelectorAll('[data-faculty-tab]').forEach(x => {
        const on = x === button;
        x.classList.toggle('is-active', on);
        x.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      section.querySelectorAll('[data-faculty-panel]').forEach(panel => panel.classList.toggle('is-active', panel.dataset.facultyPanel === key));
    }));
  }

  function buildInsights() {
    if (!home) return;
    const old = home.querySelector('.v8-insight');
    if (!old) return;
    home.querySelector('.finish-insight-strip')?.remove();
    const section = document.createElement('section');
    section.className = 'finish-insight-strip';
    const links = [
      ['共通考试政策说明','微信公众号','https://mp.weixin.qq.com/s/ZMtJsMmy-gfTXMUUDcR7HQ','policy'],
      ['共通考试教师介绍','小红书','https://xhslink.cn/o/5Djzx1FPbYQ','teacher'],
      ['日本大学一般入试合格学生采访','学生采访','https://xhslink.cn/o/17CWJJBamPK','story']
    ];
    section.innerHTML = `<div class="finish-shell"><header class="finish-section-head"><div><span class="finish-section-no">04</span><span class="finish-kicker">升学资讯</span><h2>公开内容</h2></div><p>政策说明、教师介绍与学生采访。</p></header><div class="finish-insight-grid">${links.map(([label,meta,href,type]) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${icon(type)}<span><b>${label}</b><small>${meta}</small></span><strong>↗</strong></a>`).join('')}</div><details class="finish-insight-more"><summary>查看原有共通考试说明</summary><div class="finish-insight-legacy"></div></details></div>`;
    old.insertAdjacentElement('beforebegin', section);
    section.querySelector('.finish-insight-legacy').appendChild(old);
  }

  function refineClassroom() {
    const classroom = home?.querySelector('#nakano-classroom');
    if (!classroom) return;
    classroom.classList.add('finish-classroom');
    const h = classroom.querySelector('h2');
    const p = classroom.querySelector('.v7-tabito-head p');
    if (h) h.textContent = '东京・中野教室';
    if (p) p.textContent = '中国旅人教育集团株式会社';
    if (p && !classroom.querySelector('.finish-classroom-info')) p.insertAdjacentHTML('afterend','<div class="finish-classroom-info"><span><b>地址</b>〒164-0001 東京都中野区中野1-55-3 フェリスビル 4F</span><span><b>授课</b>实体教室・线上课程</span></div>');
  }

  function refineInstitutionAndContact() {
    const institution = home?.querySelector('#institution');
    if (institution) {
      institution.classList.add('finish-institution');
      const p = institution.querySelector('.v11-institution-head p');
      if (p) p.textContent = '法人信息、媒体报道和兼职讲师招聘。';
    }
    const contact = home?.querySelector('#contact');
    if (contact) {
      contact.classList.add('finish-contact');
      const h = contact.querySelector('h2');
      const p = h?.parentElement?.querySelector('p');
      if (h) h.textContent = '升学咨询';
      if (p) p.textContent = '咨询时请提供目标校、当前成绩和预计入学时间。';
      contact.querySelector('.finish-contact-facts')?.remove();
      if (p) p.insertAdjacentHTML('afterend','<div class="finish-contact-facts"><span><b>目标校</b>学校・学部・入试方式</span><span><b>当前成绩</b>EJU / 共通 / 校内考基础</span><span><b>时间</b>预计入学年度・考试节点</span></div>');
    }
  }

  function buildFeeEstimator() {
    const course = kyotsu?.querySelector('#common-course-2026');
    if (!course || course.querySelector('.finish-fee-estimator')) return;
    const box = document.createElement('aside');
    box.className = 'finish-fee-estimator';
    box.innerHTML = `<div><span class="finish-kicker">2026 共通テスト课程</span><h3>科目与费用</h3><p>课程费 14,000 元 / 科；材料费 5,000 元，4 科及以上免材料费。</p></div><div class="finish-fee-controls"><button type="button" class="is-active" data-subject-count="1">1 科</button><button type="button" data-subject-count="2">2 科</button><button type="button" data-subject-count="3">3 科</button><button type="button" data-subject-count="4">4 科+</button></div><div class="finish-fee-result"><small>参考合计</small><strong>19,000 元</strong><span>课程费 14,000 + 材料费 5,000</span></div>`;
    (course.querySelector('.max-w-7xl,.max-w-6xl,.max-w-5xl') || course.firstElementChild || course).insertAdjacentElement('afterbegin', box);
    box.querySelectorAll('[data-subject-count]').forEach(button => button.addEventListener('click', () => {
      const n = Number(button.dataset.subjectCount);
      box.querySelectorAll('[data-subject-count]').forEach(x => x.classList.toggle('is-active', x === button));
      const fee = n * 14000;
      const material = n >= 4 ? 0 : 5000;
      box.querySelector('.finish-fee-result strong').textContent = `${(fee + material).toLocaleString('en-US')} 元${n >= 4 ? '起' : ''}`;
      box.querySelector('.finish-fee-result span').textContent = n >= 4 ? `4 科课程费 ${fee.toLocaleString('en-US')} 起｜材料费 0` : `课程费 ${fee.toLocaleString('en-US')} + 材料费 ${material.toLocaleString('en-US')}`;
    }));
  }

  function refineSubpages() {
    if (art) art.querySelector('.v10-snapshot--art')?.classList.add('finish-subpage-snapshot');
    if (kyotsu) {
      kyotsu.querySelector('.v10-snapshot--common')?.classList.add('finish-subpage-snapshot');
      buildFeeEstimator();
    }
    if (eju) eju.querySelector('.v10-snapshot--eju')?.classList.add('finish-subpage-snapshot');
    document.querySelectorAll('.v10-local-nav').forEach(x => x.classList.add('finish-local-nav'));
  }

  function repairImages() {
    const fallback = 'images/hero_background_4.jpg';
    document.querySelectorAll('#home img').forEach(img => {
      img.loading = 'eager';
      img.decoding = 'async';
      img.style.opacity = '1';
      img.style.visibility = 'visible';
      img.addEventListener('error', () => {
        if (img.dataset.finishFallback === '1') return;
        img.dataset.finishFallback = '1';
        img.src = fallback;
      }, {once:true});
    });
  }

  function reorderHome() {
    if (!home) return;
    const hero = home.querySelector('.finish-hero');
    if (!hero) return;
    const order = [home.querySelector('.v8-trust-bar'),home.querySelector('.finish-media-ledger'),home.querySelector('#programs'),home.querySelector('#results'),home.querySelector('.finish-academic-hub'),home.querySelector('.finish-insight-strip'),home.querySelector('#nakano-classroom'),home.querySelector('#institution'),home.querySelector('#contact')].filter(Boolean);
    let anchor = hero;
    order.forEach(section => { anchor.insertAdjacentElement('afterend', section); anchor = section; });
  }

  function protectFloatingConsult() {
    const floating = document.querySelector('.v11-floating-consult');
    const contact = home?.querySelector('#contact');
    if (!floating || !contact || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(entries => floating.classList.toggle('finish-consult-hidden', entries.some(x => x.isIntersecting)), {threshold:.08}).observe(contact);
  }

  function init() {
    document.documentElement.classList.add('tabito-finishing','tabito-finishing-r8');
    removeFormerTeacher();
    normalizeLegacyCopy();
    compactNavigation();
    makeHero();
    styleTrustBar();
    buildMediaLedger();
    buildPrograms();
    buildResults();
    buildAcademicAndFaculty();
    buildInsights();
    refineClassroom();
    refineInstitutionAndContact();
    refineSubpages();
    reorderHome();
    repairImages();
    bindRouteLinks();
    setupScrollProgress();
    protectFloatingConsult();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();