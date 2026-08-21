(() => {
  'use strict';

  function setCard(card, title, copy){
    if(!card) return;
    card.innerHTML = `<div class="text-3xl font-black text-secondary mb-2">${title}</div><div class="text-gray-600">${copy}</div>`;
  }

  const home = document.getElementById('home');
  const homeHero = home && home.querySelector('section.hero-bg');
  if(homeHero){
    const stat = homeHero.querySelector('.grid.md\\:grid-cols-3');
    if(stat){
      const cards=[...stat.children];
      setCard(cards[0],'多路径','共通・EJU・校内考');
      setCard(cards[1],'实体教室','东京・中野');
      setCard(cards[2],'按学科匹配','对应科目教师');
    }
  }

  if(home){
    const serviceCards=[...home.querySelectorAll('.feature-card')];
    const common=serviceCards.find(c=>c.querySelector('h3')?.textContent.includes('共通考试指导'));
    if(common){
      const p=common.querySelector('p');
      if(p) p.textContent='根据目标大学、认可科目与自身优势判断共通路线是否适合，并完成对应科目的系统训练与报考规划。';
    }
    const eju=serviceCards.find(c=>c.querySelector('h3')?.textContent.includes('EJU升学指导'));
    if(eju){
      const p=eju.querySelector('p');
      if(p) p.textContent='围绕 EJU、目标校校内考、出愿与面试提供一对一指导，按学生的实际报考计划安排内容。';
    }
  }

  const kyotsu=document.getElementById('kyotsu');
  if(kyotsu){
    const hero=kyotsu.querySelector('section.hero-bg');
    const stat=hero && hero.querySelector('.grid.md\\:grid-cols-3');
    if(stat){
      const cards=[...stat.children];
      setCard(cards[0],'路线评估','逐校确认利用方式');
      setCard(cards[1],'科目训练','考纲・历年题・实验资料');
      setCard(cards[2],'出愿规划','募集要项・科目组合');
    }
    const courseIntro=[...kyotsu.querySelectorAll('li')].find(li=>li.textContent.includes('中文科目+日语基础'));
    if(courseIntro) courseIntro.innerHTML='<b>中文科目 + 日语基础：</b>中文可作为共通考试外语科目选项之一；目标大学是否认可该科目组合需逐校确认，同时补足读题与出愿所需的日语能力。';
  }

  const footer=document.querySelector('footer');
  if(footer){
    [...footer.querySelectorAll('div,p,span')].forEach(el=>{
      if(el.childElementCount===0 && el.textContent.includes('© 2025 旅人教育株式会社')) el.textContent='© 2026 旅人教育 TABITO. All rights reserved.';
    });
  }
})();
