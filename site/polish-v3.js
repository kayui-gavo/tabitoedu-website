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
        {name:'焦老师', school:'', subjects:['化学']}
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
      title: '其他教师', note: '沿用现官网公开信息',
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

  function esc(v){return String(v || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function initials(name){return esc(name.replace('老师','').slice(0,2));}
  function teacherCard(t){
    const avatar = t.img
      ? `<span class="v3-teacher-avatar"><img src="${esc(t.img)}" alt="${esc(t.name)}" loading="lazy"></span>`
      : `<span class="v3-teacher-avatar" aria-hidden="true">${initials(t.name)}</span>`;
    const subjects = t.subjects && t.subjects.length ? `<span class="v3-teacher-subjects">${t.subjects.map(s=>`<span>${esc(s)}</span>`).join('')}</span>` : '';
    const school = t.school ? `<span class="v3-teacher-school">${esc(t.school)}</span>` : `<span class="v3-teacher-school">学历信息待官网补充</span>`;
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
        <p class="v3-lede" style="margin-inline:auto">首页统一展示全体教师；共通考试、EJU 与美术页面继续保留各自课程内容，并只展示与项目直接相关的教师。</p>
      </div>
      <div class="v3-teacher-groups">
        ${teacherGroups.map(g=>`<section class="v3-teacher-group"><div class="v3-teacher-group-title"><h3>${esc(g.title)}</h3><p>${esc(g.note)}</p></div><div class="v3-teacher-grid">${g.teachers.map(teacherCard).join('')}</div></section>`).join('')}
      </div>
    </div>`;
  }

  function removeTeacherByName(root, name){
    if(!root) return;
    [...root.querySelectorAll('h3')].filter(h=>h.textContent.trim()===name).forEach(h=>{
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
        if(section){ section.innerHTML = unifiedTeacherSection(); section.classList.add('v3-section'); }
      }
    }

    // Remove the dismissed Li teacher everywhere, including legacy project pages.
    removeTeacherByName(document, '李老师');

    // Keep the existing Kyotsu section/functionality, but correct the visible Liu-school label.
    const kyotsu = document.getElementById('kyotsu-teachers');
    if(kyotsu){
      [...kyotsu.querySelectorAll('h3')].filter(h=>h.textContent.trim()==='刘老师').forEach(h=>{
        const card = h.closest('.bg-white, article, div[class*="rounded-"]');
        if(card){
          [...card.querySelectorAll('div')].filter(d=>d.textContent.trim()==='京都大学出身').forEach(d=>d.textContent='东京大学出身');
        }
      });
    }
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
    return `<section class="v3-section" id="recruit">
      <div class="v3-shell v3-recruit-grid">
        <div>
          <p class="v3-kicker">RECRUIT</p>
          <h2 class="v3-title">讲师募集｜兼职</h2>
          <p class="v3-lede">旅人教育持续招募能够认真对待教学、愿意和学生一起把问题解决清楚的讲师。科目不限，尤其欢迎共通考试、EJU 与校内考相关科目教师。</p>
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
    if(desktop && !desktop.querySelector('[data-v3-recruit]')){
      const a = document.createElement('a');
      a.href='#recruit'; a.textContent='招贤纳士'; a.dataset.v3Recruit='1';
      a.className='font-medium hover:text-primary transition-colors duration-200';
      desktop.insertBefore(a, desktop.lastElementChild);
    }
    const mobile = document.getElementById('mobileMenu');
    const list = mobile && mobile.querySelector('.flex.flex-col');
    if(list && !list.querySelector('[data-v3-recruit]')){
      const a=document.createElement('a'); a.href='#recruit'; a.textContent='招贤纳士'; a.dataset.v3Recruit='1'; a.className='font-medium hover:text-primary transition-colors duration-200 py-2'; list.appendChild(a);
    }

    document.addEventListener('click', e=>{
      const a=e.target.closest && e.target.closest('a[href="#recruit"],a[href="#nakano-classroom"]');
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
    switcher.href='ja/redesign-v2.html';
    switcher.textContent='日本語';
    switcher.title='日文站正在建设中';
    const desktop=nav.querySelector('.hidden.md\\:flex');
    if(desktop) desktop.appendChild(switcher);
  }

  function init(){
    updateTeacherSections();
    addNewSections();
    addNavLinks();
    addLanguageHint();
    document.documentElement.classList.add('tabito-v3-polish');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
