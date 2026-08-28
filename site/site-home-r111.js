(()=>{
  if(document.documentElement.dataset.homeResourcesR111)return;
  document.documentElement.dataset.homeResourcesR111='1';

  if(!document.querySelector('link[data-home-r111]')){
    const style=document.createElement('link');
    style.rel='stylesheet';
    style.href='site-home-r111.css?v=20260828r111';
    style.dataset.homeR111='';
    document.head.append(style);
  }

  const rail=document.querySelector('.resource-rail');
  if(!rail)return;

  rail.className='resource-rail resource-rail--visual';
  rail.setAttribute('aria-label','升学资料');
  rail.innerHTML=`
    <a class="resource-link resource-story" href="https://xhslink.cn/o/2EDGvnprZwG" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--portrait">
        <img data-resource-b64="images/resources-r111/seika-chinese-admission.webp.b64" alt="京都精华大学中文入试与美术升学内容封面" loading="lazy" decoding="async" width="300" height="401">
      </figure>
      <div class="resource-story-copy">
        <small>01 · 美术升学</small>
        <b>京都精华大学｜中文入试与美术升学</b>
        <span>查看内容</span>
      </div>
    </a>
    <a class="resource-link resource-story" href="https://xhslink.cn/o/5Djzx1FPbYQ" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--portrait">
        <img data-resource-b64="images/resources-r111/kuriko-common-test.webp.b64" alt="栗子老师共通考试介绍内容封面" loading="lazy" decoding="async" width="300" height="405">
      </figure>
      <div class="resource-story-copy">
        <small>02 · 共通考试</small>
        <b>栗子老师｜共通考试介绍</b>
        <span>查看内容</span>
      </div>
    </a>
    <a class="resource-link resource-story" href="https://xhslink.cn/o/17CWJJBamPK" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--landscape">
        <img data-resource-b64="images/resources-r111/student-interview.webp.b64" alt="日本大学一般入试合格学生采访内容封面" loading="lazy" decoding="async" width="480" height="270">
      </figure>
      <div class="resource-story-copy">
        <small>03 · 合格学生采访</small>
        <b>日本大学一般入试</b>
        <span>查看内容</span>
      </div>
    </a>`;

  const hydrate=async img=>{
    if(!img||img.dataset.resourceLoaded==='true')return;
    const path=img.dataset.resourceB64;
    if(!path)return;
    img.dataset.resourceLoaded='true';
    try{
      const response=await fetch(path,{cache:'force-cache'});
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const base64=(await response.text()).replace(/\s+/g,'');
      img.src=`data:image/webp;base64,${base64}`;
      img.removeAttribute('data-resource-b64');
      try{await img.decode?.();}catch(_){/* decoded by browser when ready */}
    }catch(error){
      img.dataset.resourceError='true';
      console.error('Admissions resource image failed to load',error);
    }
  };

  const images=[...rail.querySelectorAll('img[data-resource-b64]')];
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        hydrate(entry.target);
        observer.unobserve(entry.target);
      });
    },{rootMargin:'520px 0px'});
    images.forEach(img=>observer.observe(img));
  }else{
    images.forEach(hydrate);
  }
})();
