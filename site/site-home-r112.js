(()=>{
  if(document.documentElement.dataset.homeResourcesR112)return;
  document.documentElement.dataset.homeResourcesR112='1';

  if(!document.querySelector('link[data-home-r112]')){
    const style=document.createElement('link');
    style.rel='stylesheet';
    style.href='site-home-r112.css?v=20260828r112';
    style.dataset.homeR112='';
    document.head.append(style);
  }

  if(!document.querySelector('style[data-home-r113-compact]')){
    const compact=document.createElement('style');
    compact.dataset.homeR113Compact='';
    compact.textContent=`
      @media (min-width:901px){
        .resource-rail--visual .resource-story:nth-child(-n+3){
          width:202px!important;
          justify-self:center!important;
          border-left:1px solid var(--line)!important;
          border-right:1px solid var(--line)!important;
        }
        .resource-rail--visual .resource-story:nth-child(-n+3) .resource-story-media,
        .resource-rail--visual .resource-story:nth-child(-n+3) .resource-story-copy{
          width:200px!important;
          max-width:200px!important;
        }
        .resource-rail--visual .resource-story:nth-child(-n+3) .resource-story-media{
          padding-left:15px!important;
          padding-right:15px!important;
        }
        .resource-rail--visual .resource-story:nth-child(-n+3) .resource-story-copy{
          padding-left:15px!important;
          padding-right:15px!important;
        }
        .resource-rail--visual .resource-story:nth-child(-n+3) .resource-story-copy span{
          left:15px!important;
        }
      }
    `;
    document.head.append(compact);
  }

  const rail=document.querySelector('.resource-rail');
  if(!rail)return;

  rail.className='resource-rail resource-rail--visual';
  rail.setAttribute('aria-label','升学资料');
  rail.innerHTML=`
    <a class="resource-link resource-story" href="https://xhslink.cn/o/2EDGvnprZwG" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--portrait"><img data-resource-parts="images/resources-r111/seika-chinese-admission.webp.b64.part1|images/resources-r111/seika-chinese-admission.webp.b64.part2|images/resources-r111/seika-chinese-admission.webp.b64.part3|images/resources-r111/seika-chinese-admission.webp.b64.part4" alt="中文考精华：日本美术留学与京都精华大学相关内容封面" loading="lazy" decoding="async" width="300" height="401"></figure>
      <div class="resource-story-copy"><small>01 · 美术升学</small><b>栗子老师｜日本美术留学捷径：用中文去考京都精华大学吧！</b><span>查看内容</span></div>
    </a>
    <a class="resource-link resource-story" href="https://xhslink.cn/o/5Djzx1FPbYQ" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--portrait"><img data-resource-parts="images/resources-r111/kuriko-common-test.webp.b64.part1|images/resources-r111/kuriko-common-test.webp.b64.part2" alt="栗子老师共通考试介绍内容封面" loading="lazy" decoding="async" width="300" height="405"></figure>
      <div class="resource-story-copy"><small>02 · 共通考试</small><b>栗子老师｜什么是共通考试？日本留学的信息差！</b><span>查看内容</span></div>
    </a>
    <a class="resource-link resource-story" href="https://xhslink.cn/m/5QyfLyRRHK1" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--portrait"><img src="images/resources-r115/kuriko-tus.webp?v=20260828r116" alt="栗子老师日本留学信息差与东京理科大学中文考试内容封面" loading="lazy" decoding="async" width="220" height="293"></figure>
      <div class="resource-story-copy"><small>03 · 日留信息差</small><b>栗子老师｜用中文能考东京理科大学？！福报！</b><span>查看内容</span></div>
    </a>
    <a class="resource-link resource-story" href="https://xhslink.cn/o/17CWJJBamPK" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--landscape"><img data-resource-parts="images/resources-r111/student-interview.webp.b64.part1|images/resources-r111/student-interview.webp.b64.part2|images/resources-r111/student-interview.webp.b64.part3" alt="日本大学一般入试合格学生采访内容封面" loading="lazy" decoding="async" width="480" height="270"></figure>
      <div class="resource-story-copy"><small>04 · 合格学生采访</small><b>合格学生采访｜极限逆袭！速通日本大学一般入试</b><span>查看内容</span></div>
    </a>
    <a class="resource-link resource-story" href="https://mp.weixin.qq.com/s/ZMtJsMmy-gfTXMUUDcR7HQ" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--landscape"><img data-resource-parts="images/resources-r117/wechat-guide.webp.b64" alt="共通考试政策与报考说明彩铅插图" loading="lazy" decoding="async" width="480" height="360"></figure>
      <div class="resource-story-copy"><small>05 · 微信公众号</small><b>政策解读｜「共通考试」是否能成为秒杀 EJU 的日本留学新选择？</b><span>阅读全文</span></div>
    </a>
    <a class="resource-link resource-story" href="https://m.tech.china.com/mtz/touzi/2026/0430/230973.html" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--landscape"><img data-resource-parts="images/resources-r117/media-report.webp.b64" alt="旅人教育媒体报道彩铅插图" loading="lazy" decoding="async" width="480" height="360"></figure>
      <div class="resource-story-copy"><small>06 · 中华网</small><b>媒体报道｜谈近十年中国高考外语科目中的变革</b><span>阅读全文</span></div>
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
      try{await img.decode?.();}catch(_){}
    }catch(error){
      img.dataset.resourceError='true';
      console.error('Admissions resource image failed to load',error);
    }
  };

  const images=[...rail.querySelectorAll('img[data-resource-parts]')];
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;hydrate(entry.target);observer.unobserve(entry.target);});},{rootMargin:'520px 0px'});
    images.forEach(img=>observer.observe(img));
  }else{images.forEach(hydrate);}
})();