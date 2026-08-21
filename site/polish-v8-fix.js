(() => {
  'use strict';
  const home=document.getElementById('home');
  if(!home) return;

  function go(id){
    window.showPage?.('home');
    window.setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}),70);
  }

  function heroActions(){
    const actions=home.querySelector('.v8-hero .v4-hero-actions');
    if(!actions) return;
    actions.innerHTML='<a href="#programs" class="btn-primary" data-v8-go="programs">查看课程</a><a href="#contact" class="btn-secondary" data-v8-go="contact">升学咨询</a>';
    actions.querySelectorAll('[data-v8-go]').forEach(a=>a.addEventListener('click',ev=>{ev.preventDefault();go(a.dataset.v8Go);}));
    const resultLink=home.querySelector('.v8-hero .v4-hero-results-link');
    if(resultLink){resultLink.textContent='查看合格实绩 →';resultLink.addEventListener('click',ev=>{ev.preventDefault();go('results');});}
  }

  function reorderLateFunnel(){
    const common=home.querySelector('.v8-insight');
    const company=home.querySelector('.v4-company');
    const coverage=home.querySelector('#coverage');
    const classroom=home.querySelector('#nakano-classroom');
    const recruit=home.querySelector('#recruit');
    const contact=home.querySelector('#contact');
    if(!common) return;
    let anchor=common;
    [classroom,company,coverage,recruit,contact].filter(Boolean).forEach(section=>{anchor.insertAdjacentElement('afterend',section);anchor=section;});
  }

  function init(){heroActions();reorderLateFunnel();document.documentElement.classList.add('tabito-v8-finished');}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
