(() => {
  'use strict';
  const home=document.getElementById('home');
  const art=document.getElementById('art');

  function addProgramVisuals(){
    if(!home) return;
    const cards=[...home.querySelectorAll('#programs .v8-program')];
    if(cards.length<3) return;

    const artCard=cards[0];
    if(!artCard.querySelector('.v9-program-visual')){
      artCard.classList.add('v9-program-has-visual');
      artCard.insertAdjacentHTML('afterbegin',`<div class="v9-program-visual v9-art-visual" aria-label="美术学生作品节选"><i></i><i></i><i></i><span class="v9-visual-label">学生作品节选</span></div>`);
    }

    const commonCard=cards[1];
    if(!commonCard.querySelector('.v9-program-visual')){
      commonCard.classList.add('v9-program-has-visual');
      commonCard.insertAdjacentHTML('afterbegin',`<div class="v8-common-poster v9-program-visual v9-common-visual" aria-label="2026 共通考试课程资料"><span class="v9-visual-label">2026 课程资料</span></div>`);
    }

    const scienceCard=cards[2];
    if(!scienceCard.querySelector('.v9-program-visual')){
      scienceCard.classList.add('v9-program-has-visual');
      scienceCard.insertAdjacentHTML('afterbegin',`<div class="v8-case-visual v9-program-visual v9-science-visual" aria-label="东京科学大学专项实际教学资料"><span class="v9-visual-label">校内考实际教学资料</span></div>`);
    }
  }

  function facultySubjectIndex(){
    if(!home) return;
    const faculty=home.querySelector('#faculty');
    const head=faculty?.querySelector('.v5-section-head>div:first-child');
    if(!head||head.querySelector('.v9-subject-index')) return;
    head.insertAdjacentHTML('beforeend',`<div class="v9-subject-index" aria-label="主要授课领域">
      <span>数学</span><span>物理</span><span>化学</span><span>生物</span><span>地学</span><span>国语</span><span>日语</span><span>英语</span><span>政经</span><span>世界史</span><span>美术</span>
    </div>`);
  }

  function refineCopy(){
    if(home){
      const h2=home.querySelector('#programs h2'); if(h2) h2.textContent='课程与升学项目';
      const p=h2?.parentElement?.querySelector('p'); if(p) p.textContent='按目标校和选拔方式选择课程。课程内容、出愿节点与面试准备在同一条升学计划中推进。';

      const method=home.querySelector('#how-we-work h2'); if(method) method.textContent='升学准备的四个步骤';
      const ft=home.querySelector('#faculty .v5-section-head h2'); if(ft) ft.textContent='部分讲师介绍';
      const cp=home.querySelector('#coverage .v6-section-head p'); if(cp) cp.textContent='政策解读、学生采访与外部报道，帮助学生和家长补充判断报考路线。';
    }

    if(art){
      const hero=art.querySelector('.v5-subhero h1');
      if(hero && /美术/.test(hero.textContent)) hero.textContent=hero.textContent.replace(/升学指导/g,'升学');
    }
  }

  function markCool(){document.documentElement.classList.add('tabito-v9-cool');}
  function init(){addProgramVisuals();facultySubjectIndex();refineCopy();markCool();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
