(()=>{
  if(!document.querySelector('script[data-art-r99-core]')){
    const core=document.createElement('script');
    core.src='art-r99-core.js?v=20260828r125';
    core.dataset.artR99Core='';
    document.body.append(core);
  }
  if(window.matchMedia('(max-width:820px)').matches&&!document.querySelector('script[data-course-mobile-nav-r125]')){
    const mobileNav=document.createElement('script');
    mobileNav.src='course-mobile-nav-r125.js?v=20260828r125';
    mobileNav.dataset.courseMobileNavR125='';
    document.body.append(mobileNav);
  }
})();
