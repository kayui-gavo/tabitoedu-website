(() => {
  'use strict';
  const home=document.getElementById('home');
  const art=document.getElementById('art');
  const kyotsu=document.getElementById('kyotsu');
  const eju=document.getElementById('eju');
  const emoji=/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu;

  const text=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const findSection=(root,re)=>[...root?.querySelectorAll('section')||[]].find(s=>[...s.querySelectorAll('h2,h3')].some(h=>re.test(text(h))));

  function cleanChrome(){
    const floating=[...document.querySelectorAll('body>a.fixed, body>a[class*="bottom-"]')].find(a=>/咨询/.test(text(a)));
    if(floating){floating.textContent='升学咨询';floating.classList.add('v11-floating-consult');floating.classList.remove('animate-float');}
    document.querySelectorAll('a,button').forEach(el=>{if(emoji.test(el.textContent||'')) el.textContent=(el.textContent||'').replace(emoji,'').replace(/\s{2,}/g,' ').trim();emoji.lastIndex=0;});
    document.querySelectorAll('.page-section .text-4xl,.page-section .text-3xl').forEach(el=>{const s=text(el);if(s&&s.replace(emoji,'').replace(/[\s·・|—–-]/g,'').length===0) el.style.display='none';emoji.lastIndex=0;});
  }

  function reuseRealMedia(){
    const commonMedia=kyotsu?.querySelector('.v10-snapshot--common .v10-snapshot-media');
    const commonSource=kyotsu?.querySelector('.v8-common-course .v8-common-poster')||home?.querySelector('.v9-common-visual');
    if(commonMedia&&commonSource){
      const bg=getComputedStyle(commonSource).backgroundImage;
      if(bg&&bg!=='none'){
        commonMedia.style.backgroundImage=bg;commonMedia.classList.add('v11-real-media');commonMedia.innerHTML='<span class="v11-media-caption">2026 共通考试课程资料</span>';
      }
    }
    const ejuMedia=eju?.querySelector('.v10-snapshot--eju .v10-snapshot-media');
    const ejuSource=eju?.querySelector('.v8-eju-proof-image')||home?.querySelector('.v9-science-visual')||home?.querySelector('.v8-case-visual');
    if(ejuMedia&&ejuSource){
      const bg=getComputedStyle(ejuSource).backgroundImage;
      if(bg&&bg!=='none'){
        ejuMedia.style.backgroundImage=bg;ejuMedia.classList.add('v11-real-media');ejuMedia.innerHTML='<span class="v11-media-caption">东京科学大学专项｜实际教学资料</span>';
      }
    }
  }

  function makeDisclosure(section,cards,label='查看详细说明'){
    if(!section||section.querySelector('.v11-copy-details')) return;
    const box=section.querySelector(':scope > div')||section;
    const heading=[...box.querySelectorAll(':scope > h2,:scope > h3')][0]||box.querySelector('h2,h3');
    if(!heading) return;
    const summary=document.createElement('div');summary.className='v11-summary-cards';
    summary.innerHTML=cards.map(([a,b])=>`<article><b>${a}</b><span>${b}</span></article>`).join('');
    heading.insertAdjacentElement('afterend',summary);
    const details=document.createElement('details');details.className='v11-copy-details';
    const s=document.createElement('summary');s.textContent=label;
    const body=document.createElement('div');body.className='v11-copy-details-body';
    const children=[...box.children].filter(el=>el!==heading&&el!==summary);
    children.forEach(el=>body.appendChild(el));details.append(s,body);box.appendChild(details);
  }

  function compactEditorialCopy(){
    const artDual=findSection(art,/双系统|日本高考.*美术|美术留学.*共通/);
    makeDisclosure(artDual,[['两条报考路线','按目标校募集要项判断共通利用与留学生入试。'],['专业准备','作品、实技、作品说明与面试按目标专业推进。'],['逐校确认','考试科目与选拔方式以当年度官方募集要项为准。']],'展开双系统说明');

    const commonIntro=findSection(kyotsu,/升学新路径|共通考试.*路径|日本高考.*共通/);
    makeDisclosure(commonIntro,[['先查目标校','确认是否利用共通成绩、指定科目与选拔方式。'],['再定科目','按志望校组合数学、理科、文科与语言，不做无效备考。'],['申请同步推进','课程备考与志愿规划、材料审核、手续指导同步安排。']],'展开共通考试路线说明');
  }

  function compactArt(){
    if(!art) return;
    const schools=findSection(art,/目标美术院校/);if(schools) schools.classList.add('v11-school-index');

    const teacher=findSection(art,/教师作品展示/);
    if(teacher&&!teacher.querySelector('.v11-gallery-more')){
      const grid=teacher.querySelector('.grid');
      const items=grid?[...grid.children]:[];
      if(items.length>4){
        const details=document.createElement('details');details.className='v11-gallery-more';
        const summary=document.createElement('summary');summary.textContent=`查看全部教师作品（${items.length} 件）`;
        const body=document.createElement('div');body.className='v11-gallery-more-grid';
        items.slice(4).forEach(item=>body.appendChild(item));details.append(summary,body);grid.insertAdjacentElement('afterend',details);
      }
    }

    const student=findSection(art,/学生作品展示/);
    if(student&&!student.querySelector('.v11-student-mosaic')){
      const imgs=[...student.querySelectorAll('img')];
      const cards=[];const seen=new Set();
      imgs.forEach(img=>{const card=img.closest('.rounded-3xl,.rounded-2xl,.rounded-xl')||img.parentElement;if(card&&!seen.has(card)){seen.add(card);cards.push(card);}});
      if(cards.length){
        const mosaic=document.createElement('div');mosaic.className='v11-student-mosaic';cards.forEach(c=>mosaic.appendChild(c));
        const container=student.querySelector('.max-w-7xl,.max-w-6xl,.max-w-5xl')||student;container.appendChild(mosaic);
        [...student.querySelectorAll('.space-y-6')].forEach(x=>{if(!x.querySelector('img'))x.remove();});
      }
    }

    const cta=findSection(art,/开启你的美术之路|美术.*咨询/);if(cta) cta.classList.add('v11-art-cta');
  }

  function buildInstitutionHub(){
    if(!home||home.querySelector('.v11-institution-hub')) return;
    const classroom=home.querySelector('#nakano-classroom');
    const company=home.querySelector('#company');
    const coverage=home.querySelector('#coverage');
    const recruit=home.querySelector('#recruit');
    if(!classroom||![company,coverage,recruit].some(Boolean)) return;
    const hub=document.createElement('section');hub.className='v11-institution-hub';hub.id='institution';
    hub.innerHTML='<div class="v3-shell"><div class="v11-institution-head"><div><h2>机构信息</h2><p>公司、升学资讯与讲师招聘集中在这里，避免打断学生的课程阅读动线。</p></div><span class="v3-kicker">TABITO EDUCATION</span></div><div class="v11-institution-grid"></div></div>';
    const grid=hub.querySelector('.v11-institution-grid');
    const defs=[
      [company,'COMPANY','公司介绍','法人信息・发展历程・管理团队'],
      [coverage,'CONTENTS','升学资讯','政策解读・学生采访・外部报道'],
      [recruit,'RECRUIT','招贤纳士','兼职讲师募集・应聘条件']
    ];
    defs.forEach(([section,kicker,title,desc])=>{
      if(!section) return;
      const d=document.createElement('details');d.className='v11-institution-card';
      const s=document.createElement('summary');s.innerHTML=`<span>${kicker}</span><b>${title}</b><small>${desc}</small>`;
      const body=document.createElement('div');body.className='v11-institution-body';body.appendChild(section);d.append(s,body);grid.appendChild(d);
    });
    classroom.insertAdjacentElement('afterend',hub);
    document.querySelectorAll('a[href="#company"],a[href="#coverage"],a[href="#recruit"]').forEach(a=>a.addEventListener('click',()=>{const id=a.getAttribute('href').slice(1);const sec=document.getElementById(id);const details=sec?.closest('details');if(details)details.open=true;}));
  }

  function refineContact(){
    const contact=home?.querySelector('#contact');if(!contact) return;
    const h=contact.querySelector('h2');if(h)h.textContent='升学咨询';
    const p=h?.parentElement?.querySelector('p');if(p)p.textContent='把目标校、当前成绩和预计入学时间告诉我们。先确认报考路线，再决定需要的课程。';
    [...contact.querySelectorAll('h3')].forEach(x=>{if(/微信/.test(text(x)))x.textContent='微信';if(/QQ/.test(text(x)))x.textContent='QQ';});
  }

  function markSectionTitles(){
    document.querySelectorAll('.page-section section').forEach(section=>{
      const h=section.querySelector('h2');if(!h||section.classList.contains('v8-case'))return;
      if(!h.dataset.v11)h.dataset.v11='section-title';
    });
  }

  function init(){
    cleanChrome();
    reuseRealMedia();
    compactEditorialCopy();
    compactArt();
    buildInstitutionHub();
    refineContact();
    markSectionTitles();
    document.documentElement.classList.add('tabito-v11-audit');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
