(() => {
  'use strict';

  const home=document.getElementById('home');
  const kyotsu=document.getElementById('kyotsu');
  const art=document.getElementById('art');

  const facultyGroups=[
    {title:'理工科',note:'数学・物理・化学・生物・地学',teachers:[
      {name:'刘老师',school:'东京大学',subjects:'物理',href:'teachers/liu-kewei.html'},
      {name:'脇村老师',school:'筑波大学',subjects:'数学'},
      {name:'坂野老师',school:'早稻田大学',subjects:'数学'},
      {name:'孙老师',school:'东京大学',subjects:'物理・化学'},
      {name:'陆老师',school:'东京科学大学',subjects:'数学・物理'},
      {name:'周老师',school:'筑波大学',subjects:'生物'},
      {name:'丁老师',school:'千叶大学',subjects:'地学・地理'},
      {name:'焦老师',school:'东京大学',subjects:'化学'}
    ]},
    {title:'语言・人文',note:'国语・日语・英语・政经・世界史',teachers:[
      {name:'刘老师',school:'东京大学',subjects:'国语・英语・政经・世界史'},
      {name:'卢老师',school:'横滨国立大学',subjects:'日语'},
      {name:'沈老师',school:'布里斯托大学',subjects:'英语'}
    ]},
    {title:'升学・综合',note:'沿用官网公开信息',teachers:[
      {name:'籍老师',school:'东京理科大学',subjects:'升学指导'},
      {name:'吴老师',school:'东京理科大学',subjects:'升学指导'},
      {name:'杨老师',school:'顺天堂大学',subjects:'升学指导'}
    ]}
  ];

  const commonFaculty=[
    ...facultyGroups[0].teachers,
    ...facultyGroups[1].teachers.filter(x=>x.name==='刘老师'||x.name==='卢老师')
  ];

  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function facultyRow(t){
    const body=`<span class="v5-faculty-name">${esc(t.name)}</span><span class="v5-faculty-school">${esc(t.school)}</span><span class="v5-faculty-subject">${esc(t.subjects)}</span><span class="v5-faculty-arrow">${t.href?'详细介绍 ↗':''}</span>`;
    return t.href?`<a class="v5-faculty-row" href="${esc(t.href)}">${body}</a>`:`<div class="v5-faculty-row">${body}</div>`;
  }

  function facultyDirectory(groups,title='师资团队',lede='按学科查看负责教师。教师背景与担当科目直接列出，减少无必要的人像卡片，让信息更容易比较。'){
    return `<div class="v3-shell v5-faculty-shell">
      <div class="v5-section-head"><div><p class="v3-kicker">FACULTY</p><h2>${title}</h2><p>${lede}</p></div><span class="v5-faculty-note">教师安排以当期实际开课为准</span></div>
      <div class="v5-faculty-groups">${groups.map(g=>`<section class="v5-faculty-group"><header><h3>${esc(g.title)}</h3><span>${esc(g.note)}</span></header><div>${g.teachers.map(facultyRow).join('')}</div></section>`).join('')}</div>
    </div>`;
  }

  function replaceHomeFaculty(){
    if(!home) return;
    const section=home.querySelector('.v3-teachers-home');
    if(!section) return;
    section.className='v5-faculty-section';
    section.id='faculty';
    section.innerHTML=facultyDirectory(facultyGroups,'师资团队','不靠统一头像营造“名师墙”，直接呈现学校背景与负责科目。学生先按科目找到人，再进入具体课程或讲师介绍。');
  }

  function replaceCommonFaculty(){
    if(!kyotsu) return;
    const section=kyotsu.querySelector('#kyotsu-teachers');
    if(!section) return;
    section.className='v5-faculty-section v5-faculty-section--project';
    section.innerHTML=facultyDirectory([{title:'共通考试相关科目',note:'数学・理科・国语・日语',teachers:commonFaculty}],'共通考试师资','展示与共通考试直接相关的教师，不重复整套官网师资。');
  }

  function splitHero(){
    if(!home) return;
    const hero=home.querySelector('section.hero-bg');
    const inner=hero&&hero.querySelector('.relative.z-10');
    if(!hero||!inner||inner.querySelector('.v5-hero-layout')) return;
    const copy=document.createElement('div'); copy.className='v5-hero-copy';
    [...inner.children].forEach(el=>copy.appendChild(el));
    const media=document.createElement('figure');
    media.className='v5-hero-media';
    media.innerHTML='<img src="images/hero_background_4.jpg" alt="日本留学升学环境" fetchpriority="high"><figcaption><strong>TABITO EDUCATION</strong><span>东京・中野 / Online</span></figcaption>';
    const layout=document.createElement('div'); layout.className='v5-hero-layout';
    layout.append(copy,media); inner.append(layout); hero.classList.add('v5-hero');
  }

  function programImagery(){
    if(!home) return;
    const cards=[...home.querySelectorAll('.v4-program-card')];
    const visual=[
      ['images/student-work-illustration-city.png','美术学生作品局部','STUDENT WORK'],
      ['images/hero_background_1.jpg','共通考试升学指导','COMMON TEST'],
      ['images/hero_background_4.jpg','EJU与校内考升学指导','EJU / SCHOOL EXAM']
    ];
    cards.slice(0,3).forEach((card,i)=>{
      if(card.querySelector('.v5-program-media')) return;
      const fig=document.createElement('figure'); fig.className='v5-program-media';
      fig.innerHTML=`<img src="${visual[i][0]}" alt="${visual[i][1]}" loading="lazy"><figcaption>${visual[i][2]}</figcaption>`;
      card.prepend(fig);
    });
  }

  function resultsProof(){
    if(!home) return;
    const section=home.querySelector('#results');
    const list=section&&section.querySelector('.v3-result-list');
    if(!list||section.querySelector('.v5-result-proof')) return;
    const wrapper=document.createElement('div'); wrapper.className='v5-results-right';
    list.replaceWith(wrapper); wrapper.append(list);
    const proof=document.createElement('div'); proof.className='v5-result-proof';
    proof.innerHTML=`<div class="v5-proof-head"><span>部分合格资料</span><small>原官网公开素材</small></div><div class="v5-proof-grid">
      ${[1,2,3,4].map(n=>`<figure><img src="images/success_student${n}.png" alt="合格资料 ${n}" loading="lazy"></figure>`).join('')}
    </div>`;
    wrapper.append(proof);
  }

  function commonEditorialImage(){
    if(!home) return;
    const section=home.querySelector('.v4-common-guide');
    const box=section&&section.querySelector('.max-w-5xl');
    const h2=box&&box.querySelector('h2');
    if(!box||!h2||box.querySelector('.v5-common-media')) return;
    const fig=document.createElement('figure'); fig.className='v5-common-media';
    fig.innerHTML='<img src="images/hero_background_1.jpg" alt="日本大学校园与共通考试升学环境" loading="lazy"><figcaption>COMMON TEST ROUTE <span>是否适合，先看目标校的募集要项。</span></figcaption>';
    h2.insertAdjacentElement('afterend',fig);
  }

  function artGalleryPolish(){
    if(!art) return;
    const allSections=[...art.querySelectorAll('section')];
    allSections.forEach(section=>{
      const imgs=[...section.querySelectorAll('img')];
      if(imgs.some(i=>/student-work-/.test(i.getAttribute('src')||''))) section.classList.add('v5-art-gallery','v5-art-gallery--student');
      if(imgs.some(i=>/teacher-work-/.test(i.getAttribute('src')||''))) section.classList.add('v5-art-gallery','v5-art-gallery--teacher');
    });
    const hero=art.querySelector('section.hero-bg');
    if(hero) hero.classList.add('v5-subhero','v5-subhero--art');
  }

  function subpageHeroPolish(){
    if(kyotsu){ const hero=kyotsu.querySelector('section.hero-bg'); if(hero) hero.classList.add('v5-subhero','v5-subhero--common'); }
    const eju=document.getElementById('eju');
    if(eju){
      const first=eju.querySelector('section');
      if(first) first.classList.add('v5-eju-intro');
      const overview=eju.querySelector('.v3-eju-overview');
      if(overview&&!overview.querySelector('.v5-eju-media')){
        overview.querySelector('.v3-shell')?.insertAdjacentHTML('afterbegin','<figure class="v5-eju-media"><img src="images/hero_background_4.jpg" alt="日本大学校园" loading="lazy"><figcaption>EJU / 校内考 / 出愿 / 面试</figcaption></figure>');
      }
    }
  }

  function companyBranding(){
    if(!home) return;
    const company=home.querySelector('.v4-company');
    const main=company&&company.querySelector('.max-w-6xl');
    if(!main||company.querySelector('.v5-company-brand')) return;
    main.insertAdjacentHTML('afterbegin','<div class="v5-company-brand"><img src="images/logo1.png" alt="旅人教育 TABITO"><span>2025.03 founded · Tokyo Nakano</span></div>');
  }

  function removeDecorativeNoise(){
    document.querySelectorAll('.v5-faculty-section .v3-teacher-avatar').forEach(x=>x.remove());
    document.querySelectorAll('img[src*="teacher_unknow"],img[src*="teracher_unknow"]').forEach(img=>img.closest('article,div[class*="rounded-"]')?.classList.add('v5-unknown-portrait'));
  }

  function init(){
    splitHero();
    programImagery();
    resultsProof();
    replaceHomeFaculty();
    replaceCommonFaculty();
    commonEditorialImage();
    artGalleryPolish();
    subpageHeroPolish();
    companyBranding();
    removeDecorativeNoise();
    document.documentElement.classList.add('tabito-v5-editorial');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
