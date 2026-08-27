(()=>{
  /* Load the r76 interaction layer last, without disturbing the established homepage structure. */
  if(!document.querySelector('link[data-home-r76]')){
    const style=document.createElement('link');
    style.rel='stylesheet';style.href='site-home-r76.css?v=20260828r76';style.dataset.homeR76='';
    document.head.append(style);
  }

  /* Header brand now uses the real logo directly from CSS. */

  /* Homepage course intro: one concise principle, not a process explanation. */
  const programsIntro=document.querySelector('#programs .section-head p');
  if(programsIntro){
    programsIntro.textContent='成绩、兴趣、性格和目标校不同，升学方案也应不同。';
  }

  /* Faculty: remove the redundant Chinese-course note and keep the lead teacher credit concise. */
  document.querySelector('.faculty-note')?.remove();
  const leadTeacherLink=document.querySelector('.team-head > a[href="https://kayui-gavo.github.io/education/"]');
  if(leadTeacherLink){
    leadTeacherLink.classList.add('lead-teacher-link');
    leadTeacherLink.setAttribute('aria-label','刘老师介绍：教育营业1部部长、共通考试课程负责人');
    leadTeacherLink.innerHTML='<span>刘老师介绍</span><small>教育营业1部部长・共通考试课程负责人</small><b aria-hidden="true">↗</b>';
  }

  const baikeUrl='https://baike.baidu.com/item/%E4%B8%AD%E5%9B%BD%E6%97%85%E4%BA%BA%E6%95%99%E8%82%B2%E9%9B%86%E5%9B%A2%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE';

  /* Restore the compact company profile and expose the Baidu Baike entry as a secondary source link. */
  const contact=document.getElementById('contact');
  if(contact&&!document.getElementById('company')){
    const company=document.createElement('section');
    company.id='company';
    company.className='company-section';
    company.innerHTML=`
      <div class="shell">
        <header class="section-head">
          <h2>公司介绍</h2>
          <p><a href="${baikeUrl}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;border-bottom:1px solid rgba(16,56,74,.28);padding-bottom:2px">百度百科 ↗</a></p>
        </header>
        <div class="company-overview">
          <div class="company-copy">
            <h3><a href="${baikeUrl}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none">中国旅人教育集团株式会社</a></h3>
            <p>中国旅人教育集团株式会社成立于2025年3月27日，是跨国教育服务企业，总部位于日本东京都中野区中野1-55-3 Ferris大厦4层。主营中日留学服务、研学、国际贸易及国际高中课程合作，助力日本大学升学考试体系融入中国国际高中课程体系。</p>
          </div>
          <dl class="company-facts">
            <div><dt>成立时间</dt><dd>2025年3月27日</dd></div>
            <div><dt>核心业务</dt><dd>留学服务</dd></div>
            <div><dt>总部地址</dt><dd>日本东京都中野区中野1-55-3 Ferris大厦4层</dd></div>
          </dl>
        </div>
        <div class="company-details">
          <section class="company-detail">
            <h3>发展历程</h3>
            <p><b class="company-date">2025年5月8日</b> 设立国际贸易部；10月启动日本语言学校及旅行资质申办，并在东京都青梅市购置项目用地。</p>
            <p><b class="company-date">2026年1月起</b> 在河北省沧州市筹办国际高中。</p>
          </section>
          <section class="company-detail">
            <h3>分支机构</h3>
            <ul><li>沧州旅人教育科技有限公司</li><li>沧州旅者教育科技有限公司</li></ul>
          </section>
          <section class="company-detail">
            <h3>管理团队</h3>
            <dl class="company-team">
              <div><dt>董事长</dt><dd>籍诚</dd></div>
              <div><dt>专务董事</dt><dd>汤阳</dd></div>
              <div><dt>常务董事</dt><dd>吴子吟</dd></div>
              <div><dt>董事</dt><dd>刘可惟</dd></div>
            </dl>
          </section>
        </div>
      </div>`;
    contact.before(company);
  }

  /* Restore company navigation without changing the existing header markup contract. */
  const utilityNav=document.querySelector('.utility-nav');
  if(utilityNav&&!utilityNav.querySelector('a[href="#company"]')){
    const link=document.createElement('a');link.href='#company';link.textContent='公司介绍';
    utilityNav.insertBefore(link,utilityNav.querySelector('.nav-contact'));
  }
  const mobileMenu=document.getElementById('mobileMenu');
  if(mobileMenu&&!mobileMenu.querySelector('a[href="#company"]')){
    const link=document.createElement('a');link.href='#company';link.textContent='公司介绍';
    const contactLink=mobileMenu.querySelector('a[href="#contact"]');
    mobileMenu.insertBefore(link,contactLink);
  }
  const footerSiteNav=document.querySelector('.footer-nav[aria-label="网站链接"]');
  if(footerSiteNav&&!footerSiteNav.querySelector('a[href="#company"]')){
    const link=document.createElement('a');link.href='#company';link.textContent='公司介绍';
    const contactLink=footerSiteNav.querySelector('a[href="#contact"]');
    footerSiteNav.insertBefore(link,contactLink);
  }

  /* Use lightweight existing files for homepage course media. */
  const courseMedia={
    'course-panel-common':['images/hero_background_1.jpg','images/tabito-classroom-teaching.webp','images/hero_background_3.jpg'],
    'course-panel-eju':['images/hero_background_0.jpg','images/tabito-classroom-seminar.webp','images/hero_background_9.webp'],
    'course-panel-school':['images/hero_background_9.webp'],
    'course-panel-art':['images/student-work-figure-study.jpg','images/student-work-bust-charcoal.jpg','images/tabito-classroom-art.webp']
  };
  const setPanelSources=(panelId,urls,showNow=false)=>{
    const panel=document.getElementById(panelId);if(!panel)return;
    [...panel.querySelectorAll('.course-panel-visual img')].forEach((img,index)=>{
      const src=urls[Math.min(index,urls.length-1)];
      img.removeAttribute('src');img.dataset.src=src;img.decoding='async';
      if(showNow){img.loading='lazy';img.fetchPriority='low';img.src=src;delete img.dataset.src;}
    });
  };
  setPanelSources('course-panel-common',courseMedia['course-panel-common'],true);
  setPanelSources('course-panel-eju',courseMedia['course-panel-eju']);
  setPanelSources('course-panel-school',courseMedia['course-panel-school']);
  setPanelSources('course-panel-art',courseMedia['course-panel-art']);

  const warmUrls=urls=>urls.forEach(src=>{const image=new Image();image.decoding='async';image.src=src;});
  const warmAll=()=>{
    warmUrls(courseMedia['course-panel-eju']);
    warmUrls(courseMedia['course-panel-school']);
    warmUrls(courseMedia['course-panel-art']);
  };
  const scheduleWarm=()=>{
    if('requestIdleCallback' in window)requestIdleCallback(warmAll,{timeout:850});
    else setTimeout(warmAll,320);
  };
  scheduleWarm();
  document.querySelectorAll('.course-choice').forEach(choice=>{
    const urls=courseMedia[choice.getAttribute('aria-controls')];if(!urls)return;
    const warm=()=>warmUrls(urls);
    choice.addEventListener('pointerenter',warm,{once:true,passive:true});
    choice.addEventListener('focus',warm,{once:true});
  });

  /* Deterministic result-gallery hydration. */
  const cards=[...document.querySelectorAll('[data-result-b64]')];
  const hydrate=async card=>{
    if(card.dataset.imageSrc)return card.dataset.imageSrc;
    try{
      const response=await fetch(card.dataset.resultB64,{cache:'force-cache'});
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const base64=(await response.text()).replace(/\s+/g,'');
      const src=`data:image/webp;base64,${base64}`;
      const img=card.querySelector('img');
      if(img){img.src=src;img.loading='eager';try{await img.decode?.();}catch(_){} }
      card.dataset.imageSrc=src;card.dataset.loaded='true';return src;
    }catch(error){card.dataset.error='true';console.error('Result image failed to load',error);return null;}
  };
  cards.forEach(hydrate);

  /* Start the independent r76 enhancement layer only after the stable content setup is complete. */
  if(!document.querySelector('script[data-home-r76]')){
    const script=document.createElement('script');
    script.src='site-home-r76.js?v=20260828r76';script.dataset.homeR76='';
    document.body.append(script);
  }
})();