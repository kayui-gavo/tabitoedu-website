(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Contact/access styles are loaded here so the stable homepage HTML does not need another rewrite. */
  if(!document.querySelector('link[data-home-r77]')){
    const style=document.createElement('link');
    style.rel='stylesheet';style.href='site-home-r77.css?v=20260828r84';style.dataset.homeR77='';
    document.head.append(style);
  }
  if(!document.querySelector('link[data-home-r89]')){
    const style=document.createElement('link');
    style.rel='stylesheet';style.href='site-home-r89.css?v=20260828r91';style.dataset.homeR89='';
    document.head.append(style);
  }

  /* Faculty r89: keep four clear science subjects; every teacher has an affiliation. */
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
      <section class="faculty-line faculty-line--structured faculty-line--science">
        <span class="faculty-no">02</span><h3>理科</h3>
        <div class="faculty-science-grid" aria-label="理科授课教师">
          <section class="faculty-subject-col"><h4>物理</h4><div class="faculty-subject-teachers">
            <p><b>刘</b><span>东京大学</span></p>
            <p><b>陆</b><span>东京科学大学</span></p>
            <p><b>金</b><span>早稻田大学</span></p>
          </div></section>
          <section class="faculty-subject-col"><h4>化学</h4><div class="faculty-subject-teachers">
            <p><b>孙</b><span>东京大学</span></p>
            <p><b>焦</b><span>东京大学</span></p>
          </div></section>
          <section class="faculty-subject-col"><h4>生物</h4><div class="faculty-subject-teachers">
            <p><b>周</b><span>筑波大学</span></p>
          </div></section>
          <section class="faculty-subject-col"><h4>地学</h4><div class="faculty-subject-teachers">
            <p><b>丁</b><span>千叶大学</span></p>
          </div></section>
        </div>
      </section>
      <section class="faculty-line faculty-line--structured">
        <span class="faculty-no">03</span><h3>语言・人文</h3>
        <div class="faculty-people">
          <div class="faculty-person"><b>刘</b><div class="faculty-meta"><span class="faculty-duty">国语・英语・政经・世界史</span><span class="faculty-school">东京大学</span></div></div>
          <div class="faculty-person"><b>卢</b><div class="faculty-meta"><span class="faculty-duty">日语</span><span class="faculty-school">横滨国立大学</span></div></div>
          <div class="faculty-person"><b>沈</b><div class="faculty-meta"><span class="faculty-duty">英语</span><span class="faculty-school">布里斯托大学</span></div></div>
          <div class="faculty-person"><b>丁</b><div class="faculty-meta"><span class="faculty-duty">地理</span><span class="faculty-school">千叶大学</span></div></div>
        </div>
      </section>
      <section class="faculty-line faculty-line--structured">
        <span class="faculty-no">04</span><h3>美术</h3>
        <div class="faculty-people">
          <div class="faculty-person"><b>妮</b><div class="faculty-meta"><span class="faculty-duty">美术</span><span class="faculty-school">多摩美术大学</span></div></div>
          <div class="faculty-person"><b>汤</b><div class="faculty-meta"><span class="faculty-duty">雕刻</span><span class="faculty-school">多摩美术大学</span></div></div>
          <div class="faculty-person"><b>张</b><div class="faculty-meta"><span class="faculty-duty">油画</span><span class="faculty-school">多摩美术大学</span></div></div>
          <div class="faculty-person"><b>兰</b><div class="faculty-meta"><span class="faculty-duty">染织设计</span><span class="faculty-school">东京造型大学大学院</span></div></div>
          <div class="faculty-person"><b>薛</b><div class="faculty-meta"><span class="faculty-duty">动画实战</span><span class="faculty-school">北京电影学院</span></div></div>
        </div>
      </section>`;
  }

  /* Resources r91: content links stay in the rail; official accounts sit together beside the heading. */
  const resourceRail=document.querySelector('.resource-rail');
  if(resourceRail){
    resourceRail.classList.add('resource-rail--expanded');
    resourceRail.innerHTML=`
      <a class="resource-link" href="https://mp.weixin.qq.com/s/ZMtJsMmy-gfTXMUUDcR7HQ" target="_blank" rel="noopener noreferrer"><small>微信公众号 · 共通考试</small><b>共通考试｜政策与报考说明</b><span>阅读全文 ↗</span></a>
      <a class="resource-link" href="https://xhslink.cn/o/5Djzx1FPbYQ" target="_blank" rel="noopener noreferrer"><small>小红书 · 教师介绍</small><b>栗子老师｜共通考试介绍</b><span>查看内容 ↗</span></a>
      <a class="resource-link" href="https://xhslink.cn/o/17CWJJBamPK" target="_blank" rel="noopener noreferrer"><small>小红书 · 合格学生采访</small><b>日本大学一般入试</b><span>查看内容 ↗</span></a>
      <a class="resource-link" href="https://xhslink.cn/o/2EDGvnprZwG" target="_blank" rel="noopener noreferrer"><small>小红书 · 美术升学</small><b>京都精华大学｜中文入试与美术升学</b><span>查看内容 ↗</span></a>`;
  }

  const officialXhs=document.querySelector('.resources-head a[href="https://xhslink.cn/m/5QyfLyRRHK1"]') || [...document.querySelectorAll('a[href="https://xhslink.cn/m/5QyfLyRRHK1"]')].find(a=>a.textContent.includes('官方小红书'));
  if(officialXhs){
    let group=officialXhs.closest('.official-social-links');
    if(!group){
      group=document.createElement('div');
      group.className='official-social-links';
      officialXhs.before(group);
      group.append(officialXhs);
    }
    officialXhs.classList.add('official-social-link');
    if(!group.querySelector('.official-douyin-link')){
      const douyin=document.createElement('a');
      douyin.className='official-social-link official-douyin-link';
      douyin.href='https://v.douyin.com/2SzMKWb4gys/';
      douyin.target='_blank';
      douyin.rel='noopener noreferrer';
      douyin.textContent='官方抖音 ↗';
      group.append(douyin);
    }
  }

  /* Ultra-light page progress line on the fixed header. */
  let progressTicking=false;
  const syncPageProgress=()=>{
    const root=document.documentElement;
    const max=Math.max(1,root.scrollHeight-window.innerHeight);
    const progress=Math.min(1,Math.max(0,window.scrollY/max));
    root.style.setProperty('--page-progress',String(progress));
    progressTicking=false;
  };
  const requestPageProgress=()=>{
    if(progressTicking)return;
    progressTicking=true;
    requestAnimationFrame(syncPageProgress);
  };
  window.addEventListener('scroll',requestPageProgress,{passive:true});
  window.addEventListener('resize',requestPageProgress,{passive:true});
  syncPageProgress();

  /* Keep the homepage Common Test summary concise; the number of subjects is not the selling point. */
  const commonTab=document.getElementById('course-tab-common');
  if(commonTab){const note=commonTab.querySelector('small');if(note)note.textContent='按目标校科目安排';}
  const commonPanel=document.getElementById('course-panel-common');
  if(commonPanel){
    const copy=commonPanel.querySelector('.course-panel-copy p');
    if(copy)copy.textContent='根据目标大学采用的科目、配点和报考方式安排备考。';
    const visualTitle=commonPanel.querySelector('.visual-label strong');
    if(visualTitle)visualTitle.textContent='共通考试课程';
  }

  /* Access belongs with the Nakano classroom and map. */
  const campusCopy=document.querySelector('.campus-panel .campus-copy');
  if(campusCopy&&!campusCopy.querySelector('.campus-access')){
    const access=document.createElement('div');
    access.className='campus-access';
    access.innerHTML=`
      <h4>到校交通</h4>
      <div class="campus-access-list">
        <div class="campus-access-item">
          <b>丸之内线「新中野站」4号出口</b>
          <span>徒步约 9 分钟</span>
        </div>
        <div class="campus-access-item">
          <b>JR中央・总武线 / 东西线「中野站」南口</b>
          <span>徒步约 10 分钟</span>
        </div>
        <div class="campus-access-item">
          <b>「紅葉山公園下」巴士站</b>
          <span>徒步约 1 分钟</span>
          <small>京王巴士：渋64・中71・中87　／　关东巴士：宿04・宿05</small>
        </div>
      </div>`;
    campusCopy.append(access);
  }

  /* Small useful controls: copy the exact classroom address or open it in Google Maps. */
  if(campusCopy&&!campusCopy.querySelector('.campus-tools')){
    const address='〒164-0001 東京都中野区中野1-55-3 フェリスビル 4F';
    const tools=document.createElement('div');
    tools.className='campus-tools';
    tools.innerHTML=`<button type="button" class="campus-copy-address" aria-live="polite">复制地址</button><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}" target="_blank" rel="noopener">Google Maps ↗</a>`;
    const access=campusCopy.querySelector('.campus-access');
    campusCopy.insertBefore(tools,access||null);
    const copyButton=tools.querySelector('.campus-copy-address');
    copyButton?.addEventListener('click',async()=>{
      const original='复制地址';
      try{
        if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(address);
        else{
          const area=document.createElement('textarea');
          area.value=address;area.setAttribute('readonly','');area.style.position='fixed';area.style.opacity='0';
          document.body.append(area);area.select();document.execCommand('copy');area.remove();
        }
        copyButton.textContent='已复制';
      }catch(_){copyButton.textContent='请手动复制';}
      window.setTimeout(()=>{copyButton.textContent=original;},1500);
    });
  }

  /* Recruiting and collaboration stay in the unused lower-left area of admissions consultation. */
  const contactCopy=document.querySelector('#contact .contact-copy');
  if(contactCopy&&!contactCopy.querySelector('.contact-recruit')){
    const recruit=document.createElement('aside');
    recruit.className='contact-recruit';
    recruit.id='careers';
    recruit.setAttribute('aria-labelledby','careers-title');
    recruit.innerHTML=`
      <div class="contact-recruit-head">
        <h3 id="careers-title">招贤纳士</h3>
        <small>JOIN TABITO</small>
      </div>
      <div class="contact-recruit-roles">
        <div class="contact-recruit-role"><b>学科讲师</b><span>共通考试・EJU・校内考・美术课程</span></div>
        <div class="contact-recruit-role"><b>SNS 运营</b><span>小红书・微信公众号等内容与账号运营</span></div>
        <div class="contact-recruit-role"><b>招生宣传</b><span>升学咨询・课程介绍・活动宣传与学生沟通</span></div>
        <div class="contact-recruit-role"><b>商务合作</b><span>课程合作・渠道合作・学校及机构合作</span></div>
      </div>
      <p class="contact-recruit-note">应聘请将<b>简历</b>发送至下方邮箱，并注明岗位或科目及相关经历；商务合作请在邮件中说明合作事项。</p>
      <a href="mailto:ryukayuiii@gmail.com?subject=%E6%97%85%E4%BA%BA%E6%95%99%E8%82%B2%EF%BD%9C%E5%BA%94%E8%81%98%E3%83%BB%E5%90%88%E4%BD%9C">ryukayuiii@gmail.com <span aria-hidden="true">↗</span></a>`;
    contactCopy.append(recruit);
  }

  /* Remove any old footer / standalone recruiting placement and duplicate recruiting link. */
  document.querySelectorAll('.footer-access-recruit').forEach(el=>el.remove());
  document.querySelectorAll('#contact > .contact-recruit').forEach(el=>{
    if(el.parentElement!==contactCopy)el.remove();
  });
  document.querySelectorAll('.footer-nav a').forEach(link=>{
    if(link.textContent.trim()==='讲师・运营成员招聘')link.remove();
  });

  /* Course panels: animate only the newly visible panel. Existing tab logic remains authoritative. */
  const panels=[...document.querySelectorAll('.course-panel')];
  const animatePanel=panel=>{
    if(!panel||panel.hidden||reduced)return;
    panel.classList.remove('r76-panel-enter');
    void panel.offsetWidth;
    panel.classList.add('r76-panel-enter');
    window.setTimeout(()=>panel.classList.remove('r76-panel-enter'),280);
  };
  panels.forEach(panel=>{
    new MutationObserver(mutations=>{
      if(mutations.some(m=>m.attributeName==='hidden')&&!panel.hidden)animatePanel(panel);
    }).observe(panel,{attributes:true,attributeFilter:['hidden']});
  });

  /* Results gallery: mouse drag on desktop + visual progress; touch keeps native momentum scrolling. */
  const gallery=document.getElementById('resultGallery');
  if(gallery){
    const progress=document.createElement('div');
    progress.className='r76-gallery-progress';
    progress.setAttribute('aria-hidden','true');
    progress.innerHTML='<span></span>';
    gallery.after(progress);
    const progressBar=progress.firstElementChild;
    const syncProgress=()=>{
      const max=Math.max(1,gallery.scrollWidth-gallery.clientWidth);
      const ratio=Math.min(1,Math.max(0,gallery.scrollLeft/max));
      const visible=Math.min(1,gallery.clientWidth/Math.max(gallery.clientWidth,gallery.scrollWidth));
      progressBar.style.transform=`translateX(${ratio*(1-visible)*100}%) scaleX(${Math.max(.12,visible)})`;
      progressBar.style.transformOrigin='left center';
    };
    gallery.addEventListener('scroll',()=>requestAnimationFrame(syncProgress),{passive:true});
    window.addEventListener('resize',syncProgress,{passive:true});
    requestAnimationFrame(syncProgress);

    let dragging=false,startX=0,startScroll=0,moved=false;
    gallery.addEventListener('pointerdown',event=>{
      if(event.pointerType!=='mouse'||event.button!==0)return;
      dragging=true;moved=false;startX=event.clientX;startScroll=gallery.scrollLeft;
      gallery.classList.add('is-dragging');gallery.setPointerCapture?.(event.pointerId);
    });
    gallery.addEventListener('pointermove',event=>{
      if(!dragging)return;
      const delta=event.clientX-startX;
      if(Math.abs(delta)>5)moved=true;
      gallery.scrollLeft=startScroll-delta;
    });
    const endDrag=event=>{
      if(!dragging)return;
      dragging=false;gallery.classList.remove('is-dragging');
      gallery.releasePointerCapture?.(event.pointerId);
    };
    gallery.addEventListener('pointerup',endDrag);
    gallery.addEventListener('pointercancel',endDrag);
    gallery.addEventListener('click',event=>{
      if(moved){event.preventDefault();event.stopPropagation();moved=false;}
    },true);
  }

  /* One restrained entrance per major block. Content is always visible even if JS fails. */
  const revealTargets=[
    ...document.querySelectorAll('.section-head,.results-summary,.course-explorer,.faculty-directory,.resources-head,.resource-rail,.company-overview,.company-details,.contact-layout,.campus-access,.contact-recruit')
  ];
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        const el=entry.target;
        if(el.classList.contains('section-head'))el.classList.add('r76-seen');
        if(!reduced&&el.animate){
          el.animate([
            {opacity:.76,transform:'translateY(7px)'},
            {opacity:1,transform:'translateY(0)'}
          ],{duration:330,easing:'cubic-bezier(.22,.61,.36,1)',fill:'none'});
        }
        observer.unobserve(el);
      });
    },{threshold:.12,rootMargin:'0px 0px -5%'});
    revealTargets.forEach(el=>observer.observe(el));
  }else{
    document.querySelectorAll('.section-head').forEach(el=>el.classList.add('r76-seen'));
  }
})();