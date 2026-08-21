(() => {
  'use strict';

  const teacherGroups = [
    {
      title: '理工科', note: '数学・物理・化学・生物・地学',
      teachers: [
        {name:'刘老师', school:'东京大学', subjects:['物理'], img:'images/teacher_liu.jpg', href:'teachers/liu-kewei.html', featured:true},
        {name:'脇村老师', school:'筑波大学', subjects:['数学'], gender:'男'},
        {name:'坂野老师', school:'早稻田大学', subjects:['数学'], gender:'男'},
        {name:'孙老师', school:'东京大学', subjects:['物理','化学'], gender:'女'},
        {name:'陆老师', school:'东京科学大学', subjects:['数学','物理'], img:'images/teacher_lu.jpg'},
        {name:'周老师', school:'筑波大学', subjects:['生物'], img:'images/teacher_zhou.jpg'},
        {name:'丁老师', school:'千叶大学', subjects:['地学','地理'], gender:'男'},
        {name:'焦老师', school:'东京大学', subjects:['化学']}
      ]
    },
    {
      title: '语言・人文', note: '国语・日语・英语・政经・世界史',
      teachers: [
        {name:'刘老师', school:'东京大学', subjects:['国语','英语','政经','世界史'], gender:'女'},
        {name:'卢老师', school:'横滨国立大学', subjects:['日语']},
        {name:'沈老师', school:'布里斯托大学', subjects:['英语'], gender:'男'}
      ]
    },
    {
      title: '升学・综合', note: '沿用现官网公开信息',
      teachers: [
        {name:'籍老师', school:'东京理科大学', subjects:[], img:'images/teacher_ji.jpg'},
        {name:'吴老师', school:'东京理科大学', subjects:[], img:'images/teacher_wu.jpg'},
        {name:'杨老师', school:'顺天堂大学', subjects:[], img:'images/teacher_yang.jpg'}
      ]
    },
    {
      title: '美术', note: '实技・作品集・专业方向',
      teachers: [
        {name:'妮老师', school:'多摩美术大学', subjects:['美术'], img:'images/teacher_ni.jpg'},
        {name:'汤老师', school:'多摩美术大学', subjects:['雕刻'], img:'images/teacher_tang.jpg'},
        {name:'张老师', school:'多摩美术大学', subjects:['油画']},
        {name:'兰老师', school:'东京造型大学大学院', subjects:['染织设计'], img:'images/teacher_liu3.jpg'},
        {name:'薛老师', school:'北京电影学院', subjects:['动画实战']}
      ]
    }
  ];

  const commonTeachers = teacherGroups[0].teachers.concat([
    teacherGroups[1].teachers.find(t => t.name === '刘老师'),
    teacherGroups[1].teachers.find(t => t.name === '卢老师')
  ]).filter(Boolean);
  const artTeachers = teacherGroups[3].teachers;

  function esc(v){return String(v || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function initials(name){return esc(name.replace('老师','').slice(0,2));}
  function teacherCard(t){
    const avatar = t.img
      ? `<span class="v3-teacher-avatar"><img src="${esc(t.img)}" alt="${esc(t.name)}" loading="lazy"></span>`
      : `<span class="v3-teacher-avatar" aria-hidden="true">${initials(t.name)}</span>`;
    const subjects = t.subjects && t.subjects.length ? `<span class="v3-teacher-subjects">${t.subjects.map(s=>`<span>${esc(s)}</span>`).join('')}</span>` : '';
    const school = t.school ? `<span class="v3-teacher-school">${esc(t.school)}</span>` : '';
    const body = `${avatar}<span><h4>${esc(t.name)}</h4>${school}${subjects}</span>`;
    return t.href
      ? `<a class="v3-teacher-card ${t.featured?'v3-teacher-card--featured':''}" href="${esc(t.href)}">${body}</a>`
      : `<article class="v3-teacher-card ${t.featured?'v3-teacher-card--featured':''}">${body}</article>`;
  }

  function unifiedTeacherSection(){
    return `<div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-12">
        <p class="v3-kicker">TEACHERS</p>
        <h2 class="v3-title">专业师资团队</h2>
        <p class="v3-lede" style="margin-inline:auto">按学科查看负责教师。首页统一展示团队，课程页面只保留与该项目直接相关的教师，避免同一批师资在不同页面重复堆叠。</p>
      </div>
      <div class="v3-teacher-groups">
        ${teacherGroups.map(g=>`<section class="v3-teacher-group"><div class="v3-teacher-group-title"><h3>${esc(g.title)}</h3><p>${esc(g.note)}</p></div><div class="v3-teacher-grid">${g.teachers.map(teacherCard).join('')}</div></section>`).join('')}
      </div>
    </div>`;
  }

  function projectTeacherSection(title, lede, teachers){
    return `<div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-12"><p class="v3-kicker">TEACHERS</p><h2 class="v3-title">${esc(title)}</h2><p class="v3-lede" style="margin-inline:auto">${esc(lede)}</p></div>
      <div class="v3-teacher-grid v3-teacher-grid--project">${teachers.map(teacherCard).join('')}</div>
    </div>`;
  }

  function removeTeacherByName(root, name){
    if(!root) return;
    [...root.querySelectorAll('h3,h4')].filter(h=>h.textContent.trim()===name).forEach(h=>{
      const card = h.closest('.bg-white, .feature-card, article, div[class*="rounded-"]');
      if(card) card.remove();
    });
  }

  function updateTeacherSections(){
    const home = document.getElementById('home');
    if(home){
      const h2 = [...home.querySelectorAll('h2')].find(x=>x.textContent.trim()==='专业师资团队');
      if(h2){
        const section = h2.closest('section');
        if(section){ section.innerHTML = unifiedTeacherSection(); section.classList.add('v3-section','v3-teachers-home'); }
      }
    }

    removeTeacherByName(document, '李老师');

    const kyotsu = document.getElementById('kyotsu-teachers');
    if(kyotsu){
      kyotsu.innerHTML = projectTeacherSection('共通考试师资', '数学、理科、国语与日语等科目由对应教师负责；具体开课科目以当期课程安排为准。', commonTeachers);
      kyotsu.classList.add('v3-section');
    }

    const art = document.getElementById('art');
    if(art){
      const artH2 = [...art.querySelectorAll('h2')].find(x=>x.textContent.trim()==='专业师资团队');
      if(artH2){
        const section = artH2.closest('section');
        if(section){
          section.innerHTML = projectTeacherSection('美术师资团队', '保留美术项目的专业师资入口；作品集、实技与专业方向由对应教师负责。', artTeachers);
          section.classList.add('v3-section');
        }
      }
    }
  }

  function updateHero(){
    const home = document.getElementById('home');
    if(!home) return;
    const hero = home.querySelector('section.hero-bg');
    if(!hero) return;
    const h1 = hero.querySelector('h1');
    const p = hero.querySelector('h1 + p, p.text-xl');
    if(h1){
      h1.classList.add('v3-hero-title');
      h1.innerHTML = `<span class="v3-hero-jp">学びの旅に、<br>確かな道しるべを。</span><span class="v3-hero-brand">旅人教育 TABITO</span>`;
    }
    if(p){
      p.classList.add('v3-hero-lede');
      p.innerHTML = `共通考试、EJU、理工科校内考与美术升学。<br class="hidden md:block">从课程学习到出愿与面试，围绕目标校的实际选拔方式安排准备。`;
    }
    const actions = hero.querySelector('.flex.flex-wrap.justify-center.gap-6');
    if(actions && !hero.querySelector('.v3-hero-facts')){
      actions.insertAdjacentHTML('afterend', `<div class="v3-hero-facts"><span><b>2025.03</b> 创办</span><span><b>2025.09</b> 正式开课</span><span><b>东京・中野</b> 实体教室</span></div>`);
    }
    const statCards = hero.querySelector('.grid.md\\:grid-cols-3');
    if(statCards) statCards.classList.add('v3-hero-stat-grid');
  }

  function resultsSection(){
    const rows = [
      ['东京科学大学','2 名'],['日本大学','3 名'],['北海道大学','1 名'],['京都产业大学','1 名'],['神奈川工科大学','1 名'],['中央大学','1 名']
    ];
    return `<div class="max-w-7xl mx-auto px-4">
      <div class="v3-results-grid">
        <div class="v3-results-copy">
          <p class="v3-kicker">PASS RECORD · 2025—2026</p>
          <h2 class="v3-title">开课后的第一份合格记录</h2>
          <p class="v3-lede">公司于 2025 年 3 月创办，同年 9 月正式开课。以下为截至 2026 年 4 月公开榜单中的合格校次。</p>
          <div class="v3-result-facts"><span><b>9</b> 合格校次</span><span><b>6</b> 所大学</span></div>
          <p class="v3-result-note">※ 同一学生如取得多个学校或方式的合格结果，会分别计入对应校次，因此“合格校次”不等同于独立学生人数。</p>
        </div>
        <div class="v3-result-list">${rows.map(([u,n])=>`<div class="v3-result-row"><strong>${u}</strong><b>${n}</b></div>`).join('')}</div>
      </div>
    </div>`;
  }

  function updateResults(){
    const home=document.getElementById('home');
    if(!home) return;
    const h2=[...home.querySelectorAll('h2')].find(x=>x.textContent.trim()==='成功案例');
    if(!h2) return;
    const section=h2.closest('section');
    if(section){
      section.id='results';
      section.innerHTML=resultsSection();
      section.className='v3-section v3-results-section';
    }
  }

  function setTextExact(root, from, to){
    if(!root) return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const hits=[];
    while(walker.nextNode()) if(walker.currentNode.nodeValue.trim()===from) hits.push(walker.currentNode);
    hits.forEach(n=>n.nodeValue=n.nodeValue.replace(from,to));
  }

  function replaceContainingText(root, selector, needle, html){
    if(!root) return;
    const el=[...root.querySelectorAll(selector)].find(x=>x.textContent.includes(needle));
    if(el) el.innerHTML=html;
  }

  function correctClaims(){
    const home=document.getElementById('home');
    const kyotsu=document.getElementById('kyotsu');
    const art=document.getElementById('art');

    if(home){
      replaceContainingText(home,'p','日本大学入学共通考试（',`日本大学入学共通考试（<b class="text-primary">共通テスト</b>）是由大学入试中心实施的全国统一考试。国公立大学的一般选拔普遍使用共通考试成绩，许多私立大学也设有“共通利用”方式。外国留学生可以报考，但能否以该成绩申请、需要哪些科目，必须以各大学・学部・入试方式当年度的募集要项为准。`);
      replaceContainingText(home,'p','外国留学生只要完成了',`外国留学生也可以参加共通考试。是否需要日本国内学历、语言学校经历、日语或英语资格，以及成绩如何用于出愿，会因大学和入试方式而不同。<span class="text-primary font-bold">共通考试应被看作可选择的升学路线之一，而不是所有学校通用的捷径。</span>`);
      const advantage=[...home.querySelectorAll('h3')].find(x=>x.textContent.includes('为什么共通考试对中国学生有优势'));
      if(advantage){
        const box=advantage.closest('div');
        const ul=box && box.querySelector('ul');
        if(ul) ul.innerHTML=`<li><b class="text-primary">外语科目可选择中文</b>：对中文母语学生可能更有优势，但目标大学是否接受该科目组合需逐校确认。</li><li><b class="text-primary">考试规则统一</b>：统一命题、统一评分，便于用历年题和公开数据进行准备。</li><li><b class="text-primary">部分学校可利用共通成绩出愿</b>：有些方式以共通成绩和书面材料为主，也有学校设置二次考试或面试。</li><li><b class="text-primary">可与 EJU 路线并行规划</b>：根据目标校和科目优势，比较两条路线的时间成本与选拔方式。</li>`;
      }
    }

    if(kyotsu){
      const hero=kyotsu.querySelector('section.hero-bg');
      if(hero){
        const h1=hero.querySelector('h1');
        if(h1) h1.innerHTML=`<span class="gradient-text">共通テストを</span><br><span class="text-gray-800">もう一つの選択肢に。</span>`;
        const p=hero.querySelector('h1 + p, p.text-xl');
        if(p) p.innerHTML=`共通考试并不天然比 EJU 更容易。<br>关键是根据目标大学、科目组合与自身优势，判断它是否值得成为你的第二条报考路线。`;
      }
      replaceContainingText(kyotsu,'p','日本高考（共通テスト）升学路径为中国留学生提供',`大学入学共通考试可以成为外国留学生报考日本大学时的一种选择。部分大学・学部・入试方式允许利用共通考试成绩，但所需科目、语言资格、是否另有书面审查、二次考试或面试并不统一，因此需要逐校确认当年度募集要项。<br>&nbsp;&nbsp;&nbsp;&nbsp;对中文母语学生而言，外语科目中可选择中文是值得评估的因素之一；与此同时，其他科目的考试语言、目标大学认可的科目组合，以及出愿时间线都需要一起考虑。`);
      replaceContainingText(kyotsu,'p.font-bold','我们的课程体系将帮助留学生科学备考共通考试',`&nbsp;&nbsp;&nbsp;&nbsp;课程将共通考试本身的科目训练与升学规划分开处理：课堂负责把科目学扎实，升学指导负责确认目标校的利用方式、科目组合与出愿条件。是否选择共通路线，以学生的目标校和实际优势为依据。`);

      const table=[...kyotsu.querySelectorAll('table')].find(t=>t.textContent.includes('大学入学共通考试')&&t.textContent.includes('EJU日本留学试验'));
      if(table){
        [...table.querySelectorAll('tr')].forEach(tr=>{
          const cells=tr.querySelectorAll('td'); if(cells.length<3) return;
          const key=cells[0].textContent.trim();
          if(key==='报考学校范围'){cells[1].textContent='国公立一般选拔及部分私立大学的共通利用方式';cells[2].textContent='大量大学的外国人留学生入试，但使用方式因校而异';}
          if(key==='合格大学难度'){cells[0].textContent='选拔特点';cells[1].textContent='统一考试成绩权重较高，部分方式另有二次选拔';cells[2].textContent='常与校内考、面试、英语资格等综合使用';}
          if(key==='适合人群'){cells[1].textContent='目标校明确接受共通成绩，且科目组合与自身优势匹配';cells[2].textContent='希望以外国人留学生入试为主线，并准备校内考或面试';}
          if(key==='缺点'){cells[0].textContent='注意点';cells[1].textContent='学校与学部认可科目不同，需要逐校核对募集要项';cells[2].textContent='学校间要求差异大，需要同时准备校内考、面试等';}
        });
      }
    }

    if(art){
      replaceContainingText(art,'p','日本高考美术留学项目区别于一般留学考试模式',`部分日本美术大学・学部的特定入试方式可以利用共通考试成绩，因此除了传统的外国人留学生入试外，还可以评估“共通考试利用”这条路线。是否需要实技、面试、JLPT / EJU 日语成绩，以及认可哪些共通科目，均以各校当年度募集要项为准。<br>&nbsp;&nbsp;&nbsp;&nbsp;对于适合的学生，可以把共通考试路线与传统美术留学生考试并行准备：一边完成必要的学科科目，一边继续作品集、实技和面试训练，扩大可选择的出愿方式。`);
      replaceContainingText(art,'p.font-bold','我们的课程将打破这一壁垒',`&nbsp;&nbsp;&nbsp;&nbsp;课程会先确认目标院校的真实入试方式，再决定学科、作品集、实技和面试的投入比例。不同学校要求差异较大，不以“免校内考”或“免语言成绩”作为统一宣传口径。`);
      setTextExact(art,'共通利用','部分院校可利用');
      setTextExact(art,'美术顶尖院校','依募集要项确认');
      [...art.querySelectorAll('p')].forEach(p=>{
        if(p.textContent.includes('京都市立美术大学')) p.innerHTML=p.innerHTML.replaceAll('京都市立美术大学','京都市立艺术大学（京都市立芸術大学）');
      });
    }
  }

  function improveEju(){
    const eju=document.getElementById('eju');
    if(!eju) return;
    const placeholder=[...eju.querySelectorAll('section')].find(s=>s.textContent.includes('更多内容开展中'));
    if(!placeholder) return;
    placeholder.className='v3-eju-overview';
    placeholder.innerHTML=`<div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-10"><p class="v3-kicker">EJU / INSCHOOL EXAM</p><h2 class="v3-title">EJU・校内考升学指导</h2><p class="v3-lede" style="margin-inline:auto">EJU 只是选拔的一部分。目标校确定后，还要把英语资格、校内考、志望理由、面试与出愿时间线一起安排。</p></div>
      <div class="v3-eju-grid">
        <article><b>01</b><h3>EJU 科目</h3><p>根据文理科与目标校要求安排日语、数学、理科或综合科目，优先补影响报考范围的短板。</p></article>
        <article><b>02</b><h3>校内考・口试</h3><p>按学校和学部的真实题型准备笔试、理科口试、小论文等，不把 EJU 分数等同于最终录取。</p></article>
        <article><b>03</b><h3>出愿・面试</h3><p>梳理募集要项、材料截止日期、志望理由与面试追问，减少因信息遗漏导致的报考风险。</p></article>
      </div>
      <p class="v3-eju-note">具体可辅导科目与时间安排以当期教师排课和学生目标校为准。</p>
    </div>`;
  }

  function classroomSection(){
    return `<section class="v3-section" id="nakano-classroom">
      <div class="v3-shell v3-classroom-grid">
        <figure class="v3-classroom-photo"><img src="https://kayui-gavo.github.io/assets/tabito-classroom-v5.webp" alt="旅人教育东京中野教室实景" loading="lazy"></figure>
        <div class="v3-classroom-copy">
          <p class="v3-kicker">NAKANO CLASSROOM</p>
          <h2 class="v3-title">东京・中野教室</h2>
          <p class="v3-lede">线下课程、升学面谈与部分教学活动在东京中野教室开展。学生与家长可以在官网直接确认教室实景、地址与地图。</p>
          <address class="v3-address"><strong>中国旅人教育集团株式会社</strong><br>〒164-0001<br>東京都中野区中野1-55-3 フェリスビル 4F</address>
          <div class="v3-links">
            <a class="v3-link" href="https://xhslink.cn/m/5QyfLyRRHK1" target="_blank" rel="noopener noreferrer"><span>旅人教育小红书</span><b>↗</b></a>
            <a class="v3-link" href="images/wechat_qr1.jpeg" target="_blank" rel="noopener noreferrer"><span>微信公众号 / 微信</span><b>二维码</b></a>
            <a class="v3-link" href="teachers/liu-kewei.html"><span>理工科讲师介绍</span><b>↗</b></a>
            <a class="v3-link" href="#contact"><span>课程咨询</span><b>↓</b></a>
          </div>
          <div class="v3-map"><iframe title="旅人教育东京中野教室地图" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E9%87%8E%E5%8C%BA%E4%B8%AD%E9%87%8E1-55-3%20%E3%83%95%E3%82%A7%E3%83%AA%E3%82%B9%E3%83%93%E3%83%AB&output=embed"></iframe></div>
        </div>
      </div>
    </section>`;
  }

  function recruitSection(){
    const items = [
      ['01','语言能力','中文母语者优先；非母语者以 HSK 6 级或同等中文能力为优先。日语原则上需达到 JLPT N2 以上或同等水平。'],
      ['02','考试经验','有 EJU、大学入学共通考试、日本大学校内考等本人应试经验者优先。'],
      ['03','教学经验','有留学塾、培训机构、学校、家教或课程辅导经验者优先；能独立完成备课、授课与课后反馈。'],
      ['04','学历与专业','原则上本科以上。日本名校且专业成绩、学科能力突出者，可放宽至本科在读。'],
      ['05','课程开发','有教材、题库、讲义、课程设计或升学信息整理经验者优先。'],
      ['06','工作方式','守时、认真备课，对学生负责；尊重学生差异。对不确定的考试与出愿信息先核实再答复，并能与教务及时沟通。']
    ];
    return `<section class="v3-section v3-recruit" id="recruit">
      <div class="v3-shell v3-recruit-grid">
        <div>
          <p class="v3-kicker">RECRUIT</p>
          <h2 class="v3-title">讲师募集｜兼职</h2>
          <p class="v3-lede">旅人教育持续招募认真对待教学、愿意和学生把问题真正解决清楚的讲师。科目不限，尤其欢迎共通考试、EJU 与校内考相关科目教师。</p>
          <div class="v3-recruit-meta"><div><small>勤務地</small><strong>东京中野 / 线上</strong></div><div><small>雇用形态</small><strong>兼职・按课程安排</strong></div></div>
          <a class="v3-recruit-cta" href="mailto:jic56428@gmail.com?subject=旅人教育讲师应聘">发送简历 / 咨询应聘 ↗</a>
        </div>
        <div class="v3-recruit-list">${items.map(i=>`<div class="v3-recruit-item"><b>${i[0]}</b><div><strong>${i[1]}</strong><span>${i[2]}</span></div></div>`).join('')}</div>
      </div>
    </section>`;
  }

  function addNewSections(){
    const home = document.getElementById('home');
    if(!home) return;
    const contact = home.querySelector('#contact');
    if(!contact) return;
    if(!home.querySelector('#nakano-classroom')) contact.insertAdjacentHTML('beforebegin', classroomSection());
    if(!home.querySelector('#recruit')) contact.insertAdjacentHTML('beforebegin', recruitSection());

    const company = home.querySelector('#company');
    if(company && !company.querySelector('.v3-social-strip')){
      const shell = company.querySelector('.max-w-6xl') || company.firstElementChild;
      if(shell) shell.insertAdjacentHTML('beforeend', `<div class="v3-social-strip"><a href="https://xhslink.cn/m/5QyfLyRRHK1" target="_blank" rel="noopener noreferrer">旅人教育小红书 ↗</a><a href="images/wechat_qr1.jpeg" target="_blank" rel="noopener noreferrer">微信公众号 / 微信二维码 ↗</a></div>`);
    }
  }

  function addNavLinks(){
    const desktop = document.querySelector('nav.fixed .hidden.md\\:flex');
    if(desktop){
      if(!desktop.querySelector('[data-v3-results]')){
        const a=document.createElement('a'); a.href='#results'; a.textContent='合格实绩'; a.dataset.v3Results='1'; a.className='font-medium hover:text-primary transition-colors duration-200'; desktop.insertBefore(a, desktop.querySelector('a[href="#company"]'));
      }
      if(!desktop.querySelector('[data-v3-recruit]')){
        const a=document.createElement('a'); a.href='#recruit'; a.textContent='招贤纳士'; a.dataset.v3Recruit='1'; a.className='font-medium hover:text-primary transition-colors duration-200'; desktop.insertBefore(a, desktop.lastElementChild);
      }
    }
    const mobile = document.getElementById('mobileMenu');
    const list = mobile && mobile.querySelector('.flex.flex-col');
    if(list){
      if(!list.querySelector('[data-v3-results]')){const a=document.createElement('a');a.href='#results';a.textContent='合格实绩';a.dataset.v3Results='1';a.className='font-medium hover:text-primary transition-colors duration-200 py-2';list.appendChild(a);}
      if(!list.querySelector('[data-v3-recruit]')){const a=document.createElement('a');a.href='#recruit';a.textContent='招贤纳士';a.dataset.v3Recruit='1';a.className='font-medium hover:text-primary transition-colors duration-200 py-2';list.appendChild(a);}
    }

    document.addEventListener('click', e=>{
      const a=e.target.closest && e.target.closest('a[href="#recruit"],a[href="#nakano-classroom"],a[href="#results"]');
      if(!a) return;
      e.preventDefault();
      const id=a.getAttribute('href').slice(1);
      if(typeof window.showPage==='function' && window.currentPage!=='home') window.showPage('home');
      setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}),60);
    });
  }

  function addLanguageHint(){
    const nav = document.querySelector('nav.fixed .max-w-7xl > .flex');
    if(!nav || nav.querySelector('.v3-lang')) return;
    const switcher=document.createElement('a');
    switcher.className='v3-lang hidden lg:inline-flex text-xs font-bold text-gray-500 hover:text-primary';
    switcher.href='ja/index.html';
    switcher.textContent='日本語';
    switcher.title='日本語ページ';
    const desktop=nav.querySelector('.hidden.md\\:flex');
    if(desktop) desktop.appendChild(switcher);
  }

  function polishLegacyUI(){
    const floating=[...document.querySelectorAll('a.fixed')].find(a=>a.textContent.includes('立即咨询'));
    if(floating){floating.classList.add('v3-floating-consult');floating.textContent='课程咨询';}
    [...document.querySelectorAll('h2')].forEach(h=>h.classList.add('v3-legacy-heading'));
  }

  function init(){
    updateHero();
    updateResults();
    updateTeacherSections();
    correctClaims();
    improveEju();
    addNewSections();
    addNavLinks();
    addLanguageHint();
    polishLegacyUI();
    document.documentElement.classList.add('tabito-v3-polish');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
