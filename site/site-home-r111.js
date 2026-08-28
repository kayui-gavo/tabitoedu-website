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
        <img data-resource-parts="images/resources-r111/seika-chinese-admission.webp.b64.part1|images/resources-r111/seika-chinese-admission.webp.b64.part2|images/resources-r111/seika-chinese-admission.webp.b64.part3|images/resources-r111/seika-chinese-admission.webp.b64.part4" alt="中文考精华：日本美术留学与京都精华大学相关内容封面" loading="lazy" decoding="async" width="300" height="401">
      </figure>
      <div class="resource-story-copy">
        <small>01 · 美术升学</small>
        <b>中文考精华｜日本美术留学</b>
        <span>查看内容</span>
      </div>
    </a>
    <a class="resource-link resource-story" href="https://xhslink.cn/o/5Djzx1FPbYQ" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--portrait">
        <img data-resource-parts="images/resources-r111/kuriko-common-test.webp.b64.part1|images/resources-r111/kuriko-common-test.webp.b64.part2" alt="栗子共通考试介绍内容封面" loading="lazy" decoding="async" width="300" height="405">
      </figure>
      <div class="resource-story-copy">
        <small>02 · 共通考试</small>
        <b>栗子｜共通考试介绍</b>
        <span>查看内容</span>
      </div>
    </a>
    <a class="resource-link resource-story" href="https://xhslink.cn/o/17CWJJBamPK" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--landscape">
        <img data-resource-parts="images/resources-r111/student-interview.webp.b64.part1|images/resources-r111/student-interview.webp.b64.part2|images/resources-r111/student-interview.webp.b64.part3" alt="日本大学一般入试合格学生采访内容封面" loading="lazy" decoding="async" width="480" height="270">
      </figure>
      <div class="resource-story-copy">
        <small>03 · 合格学生采访</small>
        <b>日本大学一般入试｜合格学生采访</b>
        <span>查看内容</span>
      </div>
    </a>`;

  const hydrate=async img=>{
    if(!img||img.dataset.resourceLoaded==='true')return;
    const parts=(img.dataset.resourceParts||'').split('|').filter(Boolean);
    if(!parts.length)return;
    img.dataset.resourceLoaded='true';
    try{
      const responses=await Promise.all(parts.map(path=>fetch(path,{cache:'force-cache'})));
      const failed=responses.find(response=>!response.ok);
      if(failed)throw new Error(`HTTP ${failed.status}`);
      const base64=(await Promise.all(responses.map(response=>response.text()))).join('').replace(/\s+/g,'');
      img.src=`data:image/webp;base64,${base64}`;
      img.removeAttribute('data-resource-parts');
      try{await img.decode?.();}catch(_){/* browser will paint when ready */}
    }catch(error){
      img.dataset.resourceError='true';
      console.error('Admissions resource image failed to load',error);
    }
  };

  const images=[...rail.querySelectorAll('img[data-resource-parts]')];
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
