(() => {
  'use strict';

  const home = document.getElementById('home');
  const kyotsu = document.getElementById('kyotsu');
  const eju = document.getElementById('eju');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => `<span class="finish-icon finish-icon--${name}" aria-hidden="true"></span>`;

  const teachingGroups = [
    {
      key:'math', label:'数学', note:'数学担当', mode:'simple',
      rows:[
        ['脇村老师','筑波大学','',''],
        ['坂野老师','早稻田大学','',''],
        ['陆老师','东京科学大学','','']
      ]
    },
    {
      key:'science', label:'理科', note:'物理・化学・生物・地学', mode:'science',
      subjects:[
        {label:'物理', rows:[
          ['刘老师','东京大学','','https://kayui-gavo.github.io/education/'],
          ['陆老师','东京科学大学','','']
        ]},
        {label:'化学', rows:[
          ['孙老师','东京大学','',''],
          ['焦老师','东京大学','','']
        ]},
        {label:'生物', rows:[
          ['周老师','筑波大学','','']
        ]},
        {label:'地学', rows:[
          ['丁老师','千叶大学','','']
        ]}
      ]
    },
    {
      key:'humanities', label:'语言・人文', note:'国语・日语・英语・政经・世界史・地理', mode:'standard',
      rows:[
        ['刘老师','东京大学','国语・英语・政经・世界史',''],
        ['卢老师','横滨国立大学','日语',''],
        ['沈老师','布里斯托大学','英语',''],
        ['丁老师','千叶大学','地理','']
      ]
    },
    {
      key:'art', label:'美术', note:'实技・作品集・专业方向', mode:'standard',
      rows:[
        ['妮老师','多摩美术大学','美术',''],
        ['汤老师','多摩美术大学','雕刻',''],
        ['张老师','多摩美术大学','油画',''],
        ['兰老师','东京造型大学大学院','染织设计',''],
        ['薛老师','北京电影学院','动画实战','']
      ]
    }
  ];

  const operationsRows = [
    ['籍老师','东京理科大学'],
    ['吴老师','东京理科大学'],
    ['杨老师','顺天堂大学'],
    ['谢老师','明治大学']
  ];

  const proofDoc = (kind, compact = false) => {
    const c = compact ? ' finish-doc--compact' : '';
    if (kind === 'interview') return `<article class="finish-doc finish-doc--interview${c}" aria-label="东京科学大学面试对策讲义资料预览">
      <div class="finish-doc-side">中国旅人教育集团株式会社</div>
      <div class="finish-doc-mark" aria-hidden="true"><span></span></div>
      <div class="finish-doc-content">
        <small>中国旅人学堂教育集团株式会社</small>
        <h4>东京科学大学（理工学系）</h4>
        <h5>— 面试对策 —</h5>
        <p>编辑：营业部 / 理系教研组　刘 可惟</p>
        <strong>TABITOから，<b>Tokyo Science</b>へ</strong>
      </div>
    </article>`;
    if (kind === 'mock') return `<article class="finish-doc finish-doc--mock${c}" aria-label="东京科学大学物理原创模拟题资料预览">
      <div class="finish-doc-content">
        <small>旅人学堂 东京科学大学（理工学系）对策讲座</small>
        <p>令和８年度　私费外国人留学生特别选拔问题</p>
        <h4>物　理</h4>
        <h5>60分</h5>
        <div class="finish-doc-rules"><span>注意事项</span><i></i><i></i><i></i></div>
        <strong>旅人学堂原创问题</strong>
      </div>
    </article>`;
    if (kind === 'physics') return `<article class="finish-doc finish-doc--physics${c}" aria-label="东京科学大学物理对策教材资料预览">
      <div class="finish-doc-orbit" aria-hidden="true"></div>
      <div class="finish-doc-content">
        <small>２０２６年度　第３版</small>
        <h5>理系の嶺を超えて</h5>
        <h4>东京科学大学（理工学系）<br>私费外国人留学生特别选拔<br>物理对策</h4>
        <p>旅人学堂　刘可惟</p>
      </div>
    </article>`;
    if (kind === 'common') return `<article class="finish-doc finish-doc--common${c}" aria-label="2026共通考试课程资料预览">
      <div class="finish-doc-content">
        <small>2026 ・ 共通テスト対策</small>
        <h4>旅人教育<br>共通テスト课程</h4>
        <p>按科报名・重点突破・升学申请支持</p>
        <div class="finish-doc-price"><span>单科课程费</span><strong>14,000<small>元 / 科</small></strong></div>
        <div class="finish-doc-subjects"><span>数学</span><span>理科</span><span>文科</span><span>语言</span></div>
        <b>4 科及以上・材料费免除</b>
      </div>
    </article>`;
    return '';
  };

  function go(page, target = '') {
    window.showPage?.(page);
    window.setTimeout(() => {
      if (target) document.getElementById(target)?.scrollIntoView({behavior:'smooth', block:'start'});
      syncNav(page, target);
    }, 80);
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

  function activePage() {
    return document.querySelector('.page-section.active')?.id || 'home';
  }

  function compactNavigation() {
    const nav = document.querySelector('nav.fixed');
    const desktop = nav?.querySelector('.hidden.md\\:flex');
    const mobile = document.querySelector('#mobileMenu .flex.flex-col');
    const items = [
      ['美术升学','art',''], ['共通考试','kyotsu',''], ['EJU・校内考','eju',''],
      ['合格实绩','home','results'], ['讲师','home','faculty'], ['中野教室','home','nakano-classroom'], ['升学咨询','home','contact']
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
    if (nav && !nav.querySelector('.finish-scroll-progress')) nav.insertAdjacentHTML('beforeend','<div class="finish-scroll-progress" aria-hidden="true"><i></i></div>');
  }

  function syncNav(page, target = '') {
    document.querySelectorAll('[data-nav-page]').forEach(a => {
      const on = target ? (a.dataset.navPage===page && a.dataset.navTarget===target) : (a.dataset.navPage===page && !a.dataset.navTarget);
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

  function sectionHead(no, kicker, title, desc = '') {
    return `<header class="finish-section-head"><div><span class="finish-section-no">${no}</span><span class="finish-kicker">${kicker}</span><h2>${title}</h2></div>${desc?`<p>${desc}</p>`:''}</header>`;
  }

  function facultySimpleRow([name,school,,href]) {
    const row = `<span>${esc(name)}</span><small>${esc(school)}</small><i>${href?'↗':''}</i>`;
    const style = 'grid-template-columns:100px 1fr 18px';
    return href
      ? `<a href="${esc(href)}" class="finish-faculty-row" style="${style}">${row}</a>`
      : `<div class="finish-faculty-row" style="${style}">${row}</div>`;
  }

  function facultyStandardRow([name,school,subject,href]) {
    const row = `<span>${esc(name)}</span><small>${esc(school)}</small><em>${esc(subject)}</em><i>${href?'↗':''}</i>`;
    return href ? `<a href="${esc(href)}" class="finish-faculty-row">${row}</a>` : `<div class="finish-faculty-row">${row}</div>`;
  }

  function sciencePanel(group) {
    return `<p class="finish-faculty-note">${esc(group.note)}</p>${group.subjects.map(subject => `
      <div class="finish-science-group" style="margin-top:12px">
        <p class="finish-faculty-note" style="margin:0 0 3px!important;padding-top:7px;border-top:1px solid #c8d9e0;color:#31586b!important;font-weight:800">${esc(subject.label)}</p>
        <div class="finish-faculty-table">${subject.rows.map(facultySimpleRow).join('')}</div>
      </div>`).join('')}`;
  }

  function facultyHTML() {
    const tabs = teachingGroups.map((g,i) => {
      const count = g.mode === 'science' ? g.subjects.reduce((sum,s)=>sum+s.rows.length,0) : g.rows.length;
      return `<button type="button" data-faculty-tab="${g.key}" class="${i===0?'is-active':''}" aria-selected="${i===0?'true':'false'}"><span>${g.label}</span><b>${count}</b></button>`;
    }).join('');

    const panels = teachingGroups.map((g,i) => {
      const body = g.mode === 'science'
        ? sciencePanel(g)
        : `<p class="finish-faculty-note">${esc(g.note)}</p><div class="finish-faculty-table">${g.rows.map(g.mode === 'simple' ? facultySimpleRow : facultyStandardRow).join('')}</div>`;
      return `<section data-faculty-panel="${g.key}" class="${i===0?'is-active':''}">${body}</section>`;
    }).join('');

    const ops = `<div class="finish-faculty-ops" style="margin-top:18px;padding-top:15px;border-top:1px solid #cbdbe2">
      <div style="display:flex;align-items:baseline;justify-content:space-between;gap:16px;margin-bottom:5px"><p class="finish-faculty-note" style="margin:0!important;color:#31586b!important;font-weight:800">事务・运营・开发</p><span style="font-size:10.5px;color:#83959d">非授课成员</span></div>
      <div class="finish-faculty-table">${operationsRows.map(([name,school])=>`<div class="finish-faculty-row" style="grid-template-columns:100px 1fr 18px"><span>${esc(name)}</span><small>${esc(school)}</small><i></i></div>`).join('')}</div>
    </div>`;

    return `<div class="finish-faculty-tabs" role="tablist" aria-label="讲师分类">${tabs}</div><div class="finish-faculty-panels">${panels}</div>${ops}`;
  }

  function rebuildHome() {
    if (!home) return;
    home.innerHTML = `
      <section class="finish-hero">
        <div class="finish-hero-bg" aria-hidden="true"></div>
        <div class="finish-shell finish-hero-layout">
          <div class="finish-hero-copy">
            <span class="finish-kicker">日本留学升学指导｜东京・中野</span>
            <h1>日本本科升学指导</h1>
            <p class="finish-brand-line">学びの旅に、確かな道しるべを。</p>
            <p class="finish-hero-lede">面向准备日本本科升学的中国学生，提供美术升学、共通考试、EJU 一对一及校内考对策。课程和出愿安排以目标校当年度募集要项为基础。</p>
            <div class="finish-hero-actions"><a href="#" data-finish-page="home" data-finish-target="programs">查看课程</a><a href="#" data-finish-page="home" data-finish-target="results">合格实绩</a></div>
            <div class="finish-hero-facts">
              <span>${icon('pin')}<b>东京・中野</b><small>实体教室</small></span>
              <span>${icon('screen')}<b>线上授课</b><small>支持远程课程</small></span>
              <span>${icon('calendar')}<b>按报考日程</b><small>安排课程与出愿</small></span>
            </div>
          </div>
          <div class="finish-hero-board" aria-label="课程与实际教学资料">
            <a href="#" data-finish-page="art" class="finish-hero-photo"><img src="images/student-work-illustration-city.png" alt="旅人教育美术学生作品"><span><b>美术升学</b><small>学生作品</small></span></a>
            <a href="#" data-finish-page="kyotsu" class="finish-hero-doc finish-hero-doc--common">${proofDoc('common',true)}<span><b>共通考试</b><small>2026 课程资料</small></span></a>
            <a href="#" data-finish-page="eju" data-finish-target="school-exam-programs" class="finish-hero-doc finish-hero-doc--titech">${proofDoc('interview',true)}<span><b>东京科学大学</b><small>面试对策讲义</small></span></a>
          </div>
        </div>
      </section>

      <section class="finish-trust-bar" aria-label="旅人教育概要"><div class="finish-shell finish-trust-grid">
        <div><span>课程</span><strong>4 类升学项目</strong></div><div><span>实绩</span><strong>9 合格校次</strong></div><div><span>大学</span><strong>6 所大学</strong></div><div><span>旗舰案例</span><strong>东京科学大学 2 / 2</strong></div><div><span>授课</span><strong>中野教室・线上</strong></div>
      </div></section>

      <section class="finish-evidence-rail" aria-label="课程资料与成果">
        <div class="finish-evidence-rail-grid">
          <a href="#" data-finish-page="art" class="finish-evidence-item finish-evidence-item--photo"><img src="images/student-work-hat-stilllife.jpg" alt="美术学生作品"><span><b>美术升学</b><small>学生作品选</small></span></a>
          <a href="#" data-finish-page="kyotsu" class="finish-evidence-item finish-evidence-item--doc">${proofDoc('common',true)}<span><b>共通考试</b><small>课程资料</small></span></a>
          <a href="#" data-finish-page="eju" data-finish-target="school-exam-programs" class="finish-evidence-item finish-evidence-item--doc">${proofDoc('physics',true)}<span><b>东京科学大学</b><small>物理对策教材</small></span></a>
          <a href="#" data-finish-page="eju" data-finish-target="school-exam-programs" class="finish-evidence-item finish-evidence-item--doc">${proofDoc('mock',true)}<span><b>原创模拟题</b><small>东京科学大学物理</small></span></a>
          <a href="#" data-finish-page="home" data-finish-target="results" class="finish-evidence-item finish-evidence-item--photo"><img src="images/success_students.jpg" alt="旅人教育合格资料"><span><b>合格实绩</b><small>截至 2026 年 4 月</small></span></a>
        </div>
      </section>

      <section id="programs" class="finish-programs"><div class="finish-shell">
        ${sectionHead('01','升学课程','四类课程','按报考方式查看课程内容、费用与教学资料。')}
        <div class="finish-program-grid">
          <article class="finish-program-card finish-program-card--art"><div class="finish-program-media finish-program-art-grid"><img src="images/student-work-illustration-city.png" alt="学生插画作品"><img src="images/student-work-bust-charcoal.jpg" alt="学生素描作品"><img src="images/student-work-stilllife-wires.png" alt="学生静物作品"></div><div class="finish-program-body"><div class="finish-program-title">${icon('art')}<span><small>美术</small><h3>美术升学</h3></span></div><p>根据目标校和专业方向安排实技、作品制作、作品说明及面试准备。</p><dl><div><dt>主要内容</dt><dd>实技・作品集・面试</dd></div><div><dt>形式</dt><dd>按专业与目标校安排</dd></div></dl><a href="#" data-finish-page="art">查看美术课程 →</a></div></article>
          <article class="finish-program-card"><div class="finish-program-media finish-program-doc-media">${proofDoc('common')}</div><div class="finish-program-body"><div class="finish-program-title">${icon('common')}<span><small>共通テスト</small><h3>共通考试</h3></span></div><p>课程按科报名，并提供志愿规划、报名材料准备与审核、手续指导。</p><dl><div><dt>课程费</dt><dd>14,000 元 / 科</dd></div><div><dt>材料费</dt><dd>5,000 元｜4 科起免</dd></div></dl><a href="#" data-finish-page="kyotsu">查看科目与费用 →</a></div></article>
          <article class="finish-program-card"><div class="finish-program-media finish-eju-diagram"><div class="finish-eju-one">1 : 1</div><div class="finish-eju-flow"><span>目标校</span><i></i><span>科目</span><i></i><span>出愿</span><i></i><span>面试</span></div></div><div class="finish-program-body"><div class="finish-program-title">${icon('eju')}<span><small>EJU</small><h3>EJU 一对一</h3></span></div><p>根据目标校、报考科目和考试日程安排，并提供文书、出愿及面试准备。</p><dl><div><dt>形式</dt><dd>一对一</dd></div><div><dt>支持</dt><dd>科目・文书・出愿・面试</dd></div></dl><a href="#" data-finish-page="eju">查看 EJU 指导 →</a></div></article>
          <article class="finish-program-card finish-program-card--school"><div class="finish-program-media finish-school-doc-stack"><div>${proofDoc('interview',true)}</div><div>${proofDoc('mock',true)}</div><div>${proofDoc('physics',true)}</div></div><div class="finish-program-body"><div class="finish-program-title">${icon('school')}<span><small>校内考</small><h3>目标校专项</h3></span></div><p>根据笔试科目、历年题型和面试要求开设专项课程或小班。</p><dl><div><dt>2026 案例</dt><dd>东京科学大学</dd></div><div><dt>结果</dt><dd>2 名报名・2 名最终合格</dd></div></dl><a href="#" data-finish-page="eju" data-finish-target="school-exam-programs">查看校内考案例 →</a></div></article>
        </div>
      </div></section>

      <section id="results" class="finish-results"><div class="finish-shell">
        ${sectionHead('02','合格实绩','截至 2026 年 4 月','2025 年 9 月正式开课以来的合格记录。')}
        <div class="finish-results-grid">
          <div class="finish-results-summary"><div class="finish-results-big"><span><b>9</b><small>合格校次</small></span><span><b>6</b><small>所大学</small></span></div><div class="finish-result-list">${[['东京科学大学',2],['日本大学',3],['北海道大学',1],['京都产业大学',1],['神奈川工科大学',1],['中央大学',1]].map(([name,n])=>`<div><span>${name}</span><i style="--n:${n}"></i><b>${n}</b></div>`).join('')}</div><p>※ “合格校次”不等同于独立学生人数；同一学生取得多个合格结果时分别计入。</p></div>
          <article class="finish-titech-case"><div class="finish-titech-copy"><span class="finish-kicker finish-kicker--light">2026 东京科学大学｜理工学系</span><h3>数理化笔试对策小班</h3><p>数学・物理・化学三科授课，使用原创模拟题，并在笔试后进行模拟面试。</p><div class="finish-titech-progress"><button type="button" class="is-active" data-result-step="entry"><b>2</b><span>报名</span></button><button type="button" data-result-step="written"><b>2</b><span>笔试合格</span></button><button type="button" data-result-step="final"><b>2</b><span>最终合格</span></button></div><p class="finish-titech-note" aria-live="polite">数学、物理、化学三科授课，并使用原创模拟题进行练习。</p><div class="finish-titech-students"><span>41026｜经营工学系</span><span>41064｜融合理工学系</span></div></div><div class="finish-titech-library"><header><b>实际课程资料</b><span>3 份资料同时展示</span></header><div class="finish-titech-docs"><figure>${proofDoc('interview',true)}<figcaption>面试对策讲义</figcaption></figure><figure>${proofDoc('mock',true)}<figcaption>物理原创模拟题</figcaption></figure><figure>${proofDoc('physics',true)}<figcaption>物理对策教材</figcaption></figure></div></div></article>
        </div>
        <div class="finish-success-evidence"><figure class="finish-success-evidence--wide"><img src="images/success_students1.png" alt="合格资料汇总"><figcaption>合格资料</figcaption></figure>${[1,2,3,4].map((n,i)=>`<figure><img src="images/success_student${n}.png" alt="合格资料 ${n}"><figcaption>0${i+1}</figcaption></figure>`).join('')}</div>
      </div></section>

      <section id="faculty" class="finish-academic"><div class="finish-shell">
        ${sectionHead('03','授课与团队','部分讲师介绍','以下为部分担当教师。兼任多个领域的教师会重复列出；事务・运营・开发成员另列。实际担当以当期排课为准。')}
        <div class="finish-academic-grid"><div class="finish-workflow"><div class="finish-workflow-list"><div>${icon('target')}<span><b>01　确认目标校</b><small>募集要项・入试方式・考试科目</small></span></div><div>${icon('plan')}<span><b>02　安排科目与进度</b><small>当前基础・考试时间・目标分数</small></span></div><div>${icon('course')}<span><b>03　授课与练习</b><small>数学・理科・语言・人文・美术</small></span></div><div>${icon('document')}<span><b>04　出愿与面试</b><small>材料・手续・模拟面试</small></span></div></div><figure class="finish-workflow-photo"><img src="https://kayui-gavo.github.io/assets/tabito-classroom-v5.webp" alt="旅人教育东京中野教室"><figcaption>东京・中野实体教室</figcaption></figure></div><div class="finish-faculty">${facultyHTML()}</div></div>
      </div></section>

      <section class="finish-insights"><div class="finish-shell">
        ${sectionHead('04','公开内容','升学资讯','政策说明、教师介绍、学生采访及媒体报道。')}
        <div class="finish-insight-grid"><a href="https://mp.weixin.qq.com/s/ZMtJsMmy-gfTXMUUDcR7HQ" target="_blank" rel="noopener noreferrer">${icon('policy')}<span><small>微信公众号</small><b>共通考试政策说明</b><em>查看文章 ↗</em></span></a><a href="https://xhslink.cn/o/5Djzx1FPbYQ" target="_blank" rel="noopener noreferrer">${icon('teacher')}<span><small>小红书</small><b>共通考试教师介绍</b><em>查看内容 ↗</em></span></a><a href="https://xhslink.cn/o/17CWJJBamPK" target="_blank" rel="noopener noreferrer">${icon('story')}<span><small>学生采访</small><b>日本大学一般入试合格学生采访</b><em>查看采访 ↗</em></span></a></div><div class="finish-media-links"><span>媒体报道</span><a href="https://m.tech.china.com/mtz/touzi/2026/0430/230973.html" target="_blank" rel="noopener noreferrer">中华网｜2026.04.30 ↗</a><a href="https://life.china.com/2026-04/29/content_571768.html" target="_blank" rel="noopener noreferrer">中华网生活｜2026.04.29 ↗</a><a href="https://xhslink.cn/m/5QyfLyRRHK1" target="_blank" rel="noopener noreferrer">官方小红书 ↗</a></div>
      </div></section>

      <section id="nakano-classroom" class="finish-classroom"><div class="finish-shell">
        ${sectionHead('05','实体教室','东京・中野','中国旅人教育集团株式会社｜〒164-0001 東京都中野区中野1-55-3 フェリスビル 4F')}
        <div class="finish-classroom-grid"><figure><img src="https://kayui-gavo.github.io/assets/tabito-classroom-v5.webp" alt="旅人教育东京中野教室"><figcaption><b>东京・中野实体教室</b><span>实体课程与线上课程并行</span></figcaption></figure><div class="finish-map-wrap"><iframe title="旅人教育中野教室地图" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E9%87%8E%E5%8C%BA%E4%B8%AD%E9%87%8E1-55-3%20%E3%83%95%E3%82%A7%E3%83%AA%E3%82%B9%E3%83%93%E3%83%AB%204F&output=embed"></iframe></div></div>
      </div></section>

      <section id="institution" class="finish-institution"><div class="finish-shell finish-institution-grid"><div><span class="finish-kicker">法人信息</span><h2>旅人教育 TABITO</h2><p>中国旅人教育集团株式会社</p><dl><div><dt>教室</dt><dd>东京・中野</dd></div><div><dt>授课</dt><dd>实体・线上</dd></div><div><dt>业务</dt><dd>美术升学 / 共通考试 / EJU 一对一 / 校内考对策</dd></div></dl></div><details><summary>兼职讲师招聘</summary><p>面向能够独立备课、按时授课并对课程质量负责的兼职讲师。原则上需本科以上学历、日语 N2 以上及相关考试经验；具备教材、题库或课程设计经验者优先。</p></details></div></section>

      <section id="contact" class="finish-contact"><div class="finish-shell finish-contact-grid"><div class="finish-contact-copy"><span class="finish-kicker finish-kicker--light">升学咨询</span><h2>咨询时请提供基本情况</h2><p>为了更快确认适合的课程，请附上目标校、当前成绩和预计入学时间。</p><div class="finish-contact-facts"><span>${icon('target')}<b>目标校</b><small>学校・学部・入试方式</small></span><span>${icon('course')}<b>当前成绩</b><small>EJU / 共通 / 校内考基础</small></span><span>${icon('calendar')}<b>时间</b><small>预计入学年度・考试节点</small></span></div></div><div class="finish-contact-qr"><img src="images/wechat_qr.jpeg" alt="旅人教育微信二维码"><span><b>微信咨询</b><small>扫码添加咨询</small></span></div></div></section>`;

    bindRoutes(home);
    bindFacultyTabs();
    bindResultSteps();
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

  function bindFacultyTabs() {
    document.querySelectorAll('[data-faculty-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.facultyTab;
        document.querySelectorAll('[data-faculty-tab]').forEach(x => {
          const on = x === btn;
          x.classList.toggle('is-active', on);
          x.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        document.querySelectorAll('[data-faculty-panel]').forEach(p => p.classList.toggle('is-active', p.dataset.facultyPanel === key));
      });
    });
  }

  function bindResultSteps() {
    const notes = {entry:'数学、物理、化学三科授课，并使用原创模拟题进行练习。',written:'2 名报名学生均通过笔试，随后进入面试准备。',final:'2 名学生均取得最终合格：经营工学系、融合理工学系。'};
    document.querySelectorAll('[data-result-step]').forEach(btn => btn.addEventListener('click', () => {
      document.querySelectorAll('[data-result-step]').forEach(x => x.classList.toggle('is-active', x === btn));
      const note = document.querySelector('.finish-titech-note');
      if (note) note.textContent = notes[btn.dataset.resultStep] || '';
    }));
  }

  function enhanceSubpages() {
    if (kyotsu) {
      const course = kyotsu.querySelector('#common-course-2026') || [...kyotsu.querySelectorAll('section')].find(s => /2026/.test(s.textContent||'') && /共通/.test(s.textContent||''));
      if (course && !course.querySelector('.finish-subpage-common-proof')) {
        const proof = document.createElement('div');
        proof.className = 'finish-subpage-common-proof';
        proof.innerHTML = `<div>${proofDoc('common')}</div><div><span class="finish-kicker">2026 共通テスト课程</span><h3>按科报名</h3><p>课程费 14,000 元 / 科；材料费 5,000 元，4 科及以上免材料费。</p></div>`;
        (course.querySelector('.max-w-7xl,.max-w-6xl,.max-w-5xl') || course).prepend(proof);
      }
    }
    if (eju) {
      const area = eju.querySelector('#school-exam-programs') || eju.querySelector('.v6-titech-case') || [...eju.querySelectorAll('section')].find(s => /东京科学大学|東京科学大学/.test(s.textContent||''));
      if (area && !area.querySelector('.finish-subpage-titech-proof')) {
        const proof = document.createElement('section');
        proof.className = 'finish-subpage-titech-proof';
        proof.innerHTML = `<header><span class="finish-kicker">实际课程资料</span><h3>东京科学大学（理工学系）对策</h3><p>面试对策讲义、物理原创模拟题、物理对策教材。</p></header><div><figure>${proofDoc('interview')}<figcaption>面试对策讲义</figcaption></figure><figure>${proofDoc('mock')}<figcaption>物理原创模拟题</figcaption></figure><figure>${proofDoc('physics')}<figcaption>物理对策教材</figcaption></figure></div>`;
        area.prepend(proof);
      }
    }
  }

  function setupSectionSpy() {
    if (!('IntersectionObserver' in window)) return;
    const targets = ['results','faculty','nakano-classroom','contact'].map(id => document.getElementById(id)).filter(Boolean);
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
    if (meta) meta.setAttribute('content','旅人教育 TABITO：面向中国学生的日本本科升学指导，提供美术升学、共通考试、EJU 一对一及校内考对策，东京中野设实体教室。');
  }

  function init() {
    removeFormerTeacher();
    compactNavigation();
    rebuildHome();
    enhanceSubpages();
    hideLegacyFloatingConsult();
    updateMetadata();
    setupScrollProgress();
    setupSectionSpy();
    syncNav(activePage(), '');
    document.documentElement.classList.add('tabito-finishing','tabito-finishing-r11');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();