(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* r94: fees and planning now share one compact information region. */
  const feeJump=document.querySelector('.kyotsu-jumpnav a[href="#fees"]');
  if(feeJump)feeJump.textContent='费用・准备';
  document.querySelector('.kyotsu-jumpnav a[href="#planning"]')?.remove();

  /* Thin reading progress. */
  const progress=document.createElement('div');
  progress.className='kyotsu-read-progress';
  progress.setAttribute('aria-hidden','true');
  progress.innerHTML='<span></span>';
  document.body.prepend(progress);
  const bar=progress.firstElementChild;
  let ticking=false;
  const syncProgress=()=>{
    const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    const ratio=Math.min(1,Math.max(0,window.scrollY/max));
    bar.style.transform=`scaleX(${ratio})`;
    ticking=false;
  };
  const requestSync=()=>{if(!ticking){ticking=true;requestAnimationFrame(syncProgress);}};
  window.addEventListener('scroll',requestSync,{passive:true});
  window.addEventListener('resize',requestSync,{passive:true});
  syncProgress();

  /* In-page navigation current state. */
  const links=[...document.querySelectorAll('.kyotsu-jumpnav a[href^="#"]')];
  const sections=links.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const setCurrent=id=>{
    links.forEach(link=>{
      const active=link.getAttribute('href')===`#${id}`;
      link.classList.toggle('is-current',active);
      if(active)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  };
  if('IntersectionObserver' in window&&sections.length){
    const states=new Map();
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>states.set(entry.target,entry));
      const visible=sections
        .map(section=>states.get(section))
        .filter(entry=>entry?.isIntersecting)
        .sort((a,b)=>Math.abs(a.boundingClientRect.top-115)-Math.abs(b.boundingClientRect.top-115));
      if(visible[0])setCurrent(visible[0].target.id);
    },{rootMargin:'-104px 0px -54% 0px',threshold:[0,.05,.2]});
    sections.forEach(section=>observer.observe(section));
  }else if(sections[0])setCurrent(sections[0].id);

  /* Quiet one-time arrival feedback; content never depends on it being visible. */
  if(!reduced&&'IntersectionObserver' in window){
    const targets=[...document.querySelectorAll('.kyotsu-subject-matrix,.kyotsu-essentials-grid')];
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        entry.target.animate([
          {opacity:.84,transform:'translateY(6px)'},
          {opacity:1,transform:'translateY(0)'}
        ],{duration:300,easing:'cubic-bezier(.22,.61,.36,1)'});
        observer.unobserve(entry.target);
      });
    },{threshold:.12,rootMargin:'0px 0px -6%'});
    targets.forEach(target=>observer.observe(target));
  }
})();
