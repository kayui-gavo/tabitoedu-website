(()=>{
  /* Load the established interaction layer without blocking the first render. */
  if(!document.querySelector('link[data-home-r76]')){
    const style=document.createElement('link');
    style.rel='stylesheet';style.href='site-home-r76.css?v=20260828r76';style.dataset.homeR76='';
    document.head.append(style);
  }

  const programsIntro=document.querySelector('#programs .section-head p');
  if(programsIntro)programsIntro.textContent='共通考试、EJU、校内考和美术升学，按目标校、考试方式与准备阶段选择。';

  /* Stable first-pass faculty markup. r76 will enrich affiliations afterwards. */
  document.querySelector('.faculty-note')?.remove();
  const facultyDirectory=document.querySelector('.faculty-directory');
  if(facultyDirectory){
    facultyDirectory.classList.add('faculty-directory--structured');
    facultyDirectory.innerHTML=`
      <section class="faculty-line faculty-line--structured">
        <span class="faculty-no">01</span><h3>数学</h3>
        <div class="faculty-people">
          <div class="faculty-person"><b>脇村</b><div class="faculty-meta"><span class="faculty-school">筑波大学</span></div></div>
          <div class="faculty-person"><b>坂野</b><div class="faculty-meta"><span class="faculty-school">早稻田大学</span></div></div>
          <div class="faculty-person"><b>陆</b><div class="faculty-meta"><span class="faculty-school">东京科学大学</span></div></div>
          <div class="faculty-person"><b>胡</b><div class="faculty-meta"><span class="faculty-school">东京大学</span></div></div>
        </div>
      </section>
      <section class="faculty-line faculty-line--structured">
        <span class="faculty-no">02</span><h3>理科</h3>
        <div class="faculty-people">
          <div class="faculty-person"><b>刘・陆</b><div class="faculty-meta"><span class="faculty-duty">物理</span></div></div>
          <div class="faculty-person"><b>金</b><div class="faculty-meta"><span class="faculty-duty">物理</span><span class="faculty-school">早稻田大学</span></div></div>
          <div class="faculty-person"><b>孙・焦</b><div class="faculty-meta"><span class="faculty-duty">化学</span></div></div>
          <div class="faculty-person"><b>周</b><div class="faculty-meta"><span class="faculty-duty">生物</span></div></div>
          <div class="faculty-person"><b>丁</b><div class="faculty-meta"><span class="faculty-duty">地学</span></div></div>
        </div>
      </section>
      <section class="faculty-line faculty-line--structured">
        <span class="faculty-no">03</span><h3>语言・人文</h3>
        <div class="faculty-people">
          <div class="faculty-person"><b>刘</b><div class="faculty-meta"><span class="faculty-duty">国语・英语・政经・世界史</span></div></div>
          <div class="faculty-person"><b>卢</b><div class="faculty-meta"><span class="faculty-duty">日语</span></div></div>
          <div class="faculty-person"><b>沈</b><div class="faculty-meta"><span class="faculty-duty">英语</span></div></div>
          <div class="faculty-person"><b>丁</b><div class="faculty-meta"><span class="faculty-duty">地理</span></div></div>
        </div>
      </section>
      <section class="faculty-line faculty-line--structured">
        <span class="faculty-no">04</span><h3>美术</h3>
        <div class="faculty-people">
          <div class="faculty-person"><b>妮</b><div class="faculty-meta"><span class="faculty-duty">美术</span></div></div>
          <div class="faculty-person"><b>汤</b><div class="faculty-meta"><span class="faculty-duty">雕刻</span></div></div>
          <div class="faculty-person"><b>张</b><div class="faculty-meta"><span class="faculty-duty">油画</span></div></div>
          <div class="faculty-person"><b>兰</b><div class="faculty-meta"><span class="faculty-duty">染织设计</span></div></div>
          <div class="faculty-person"><b>薛</b><div class="faculty-meta"><span class="faculty-duty">动画实战</span></div></div>
        </div>
      </section>`;
  }

  const leadTeacherLink=document.querySelector('.team-head > a[href="https://kayui-gavo.github.io/education/"]');
  if(leadTeacherLink){
    leadTeacherLink.classList.add('lead-teacher-link');
    leadTeacherLink.setAttribute('aria-label','刘老师介绍：教育营业1部部长、共通考试课程负责人');
    leadTeacherLink.innerHTML='<span>刘老师介绍</span><small>教育营业1部部长・共通考试课程负责人</small><b aria-hidden="true">↗</b>';
  }

  const baikeUrl='https://baike.baidu.com/item/%E4%B8%AD%E5%9B%BD%E6%97%85%E4%BA%BA%E6%95%99%E8%82%B2%E9%9B%86%E5%9B%A2%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE';
  const contact=document.getElementById('contact');
  if(contact&&!document.getElementById('company')){
    const company=document.createElement('section');
    company.id='company';company.className='company-section';
    company.innerHTML=`
      <div class="shell">
        <header class="section-head"><h2>公司介绍</h2><p><a href="${baikeUrl}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;border-bottom:1px solid rgba(16,56,74,.28);padding-bottom:2px">百度百科 ↗</a></p></header>
        <div class="company-overview">
          <div class="company-copy"><h3><a href="${baikeUrl}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none">中国旅人教育集团株式会社</a></h3><p>中国旅人教育集团株式会社成立于2025年3月27日，总部位于日本东京都中野区中野1-55-3 <span style="white-space:nowrap">Ferris大厦4层</span>。主营中日留学服务、研学、国际贸易及国际高中课程合作，并开展日本大学升学考试相关课程。</p></div>
          <dl class="company-facts"><div><dt>成立时间</dt><dd>2025年3月27日</dd></div><div><dt>核心业务</dt><dd>留学服务</dd></div><div><dt>总部地址</dt><dd>日本东京都中野区中野1-55-3<br><span style="white-space:nowrap">Ferris大厦4层</span></dd></div></dl>
        </div>
        <div class="company-details">
          <section class="company-detail"><h3>发展历程</h3><p><b class="company-date">2025年5月8日</b> 设立国际贸易部；10月启动日本语言学校及旅行资质申办，并在东京都青梅市购置项目用地。</p><p><b class="company-date">2026年1月起</b> 在河北省沧州市筹办国际高中。</p></section>
          <section class="company-detail"><h3>分支机构</h3><ul><li>沧州旅人教育科技有限公司</li><li>沧州旅者教育科技有限公司</li></ul></section>
          <section class="company-detail"><h3>管理团队</h3><dl class="company-team"><div><dt>董事长</dt><dd>籍诚</dd></div><div><dt>专务董事</dt><dd>汤阳</dd></div><div><dt>常务董事</dt><dd>吴子吟</dd></div><div><dt>董事</dt><dd>刘可惟</dd></div></dl></section>
        </div>
      </div>`;
    contact.before(company);
  }

  const utilityNav=document.querySelector('.utility-nav');
  if(utilityNav&&!utilityNav.querySelector('a[href="#company"]')){
    const link=document.createElement('a');link.href='#company';link.textContent='公司介绍';
    utilityNav.insertBefore(link,utilityNav.querySelector('.nav-contact'));
  }
  const mobileMenu=document.getElementById('mobileMenu');
  if(mobileMenu&&!mobileMenu.querySelector('a[href="#company"]')){
    const link=document.createElement('a');link.href='#company';link.textContent='公司介绍';
    mobileMenu.insertBefore(link,mobileMenu.querySelector('a[href="#contact"]'));
  }
  const footerSiteNav=document.querySelector('.footer-nav[aria-label="网站链接"]');
  if(footerSiteNav&&!footerSiteNav.querySelector('a[href="#company"]')){
    const link=document.createElement('a');link.href='#company';link.textContent='公司介绍';
    footerSiteNav.insertBefore(link,footerSiteNav.querySelector('a[href="#contact"]'));
  }

  /* r126: index.html owns course image src state. This layer only warms the next panel on intent.
     The previous implementation removed/reassigned src after the inline tab script had already run,
     which could race on mobile and leave a broken thumbnail. */
  const courseMedia={
    'course-panel-common':['images/hero_background_1.jpg','images/tabito-classroom-teaching.webp','images/hero_background_3.jpg'],
    'course-panel-eju':['images/hero_background_0.jpg','images/tabito-classroom-seminar.webp','images/hero_background_9.webp'],
    'course-panel-school':['images/hero_background_9.webp'],
    'course-panel-art':['images/student-work-figure-study.jpg','images/student-work-bust-charcoal.jpg','images/tabito-classroom-art.webp']
  };
  const warmed=new Set();
  const warmUrls=urls=>urls.forEach(src=>{
    if(warmed.has(src))return;
    warmed.add(src);
    const image=new Image();
    image.decoding='async';
    image.fetchPriority='low';
    image.src=src;
  });
  document.querySelectorAll('.course-choice').forEach(choice=>{
    const urls=courseMedia[choice.getAttribute('aria-controls')];if(!urls)return;
    const warm=()=>warmUrls(urls);
    choice.addEventListener('pointerenter',warm,{once:true,passive:true});
    choice.addEventListener('focus',warm,{once:true});
    choice.addEventListener('touchstart',warm,{once:true,passive:true});
  });

  const loadR92=()=>{
    if(document.querySelector('script[data-home-r92]'))return;
    const script=document.createElement('script');
    script.src='site-home-r92.js?v=20260828r126';script.dataset.homeR92='';
    document.body.append(script);
  };

  const existingR76=document.querySelector('script[data-home-r76]');
  if(!existingR76){
    const script=document.createElement('script');
    script.src='site-home-r76.js?v=20260828r76';script.dataset.homeR76='';
    script.addEventListener('load',loadR92,{once:true});
    document.body.append(script);
  }else if(existingR76.dataset.loaded==='true')loadR92();
  else{
    existingR76.addEventListener('load',loadR92,{once:true});
    window.setTimeout(loadR92,1200);
  }
})();