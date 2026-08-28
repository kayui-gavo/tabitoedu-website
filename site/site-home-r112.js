(()=>{
  if(document.documentElement.dataset.homeResourcesR112)return;
  document.documentElement.dataset.homeResourcesR112='1';

  if(!document.querySelector('link[data-home-r112]')){
    const style=document.createElement('link');
    style.rel='stylesheet';
    style.href='site-home-r112.css?v=20260828r121';
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
      <figure class="resource-story-media resource-story-media--portrait"><img src="images/resources-r121/seika.webp?v=20260828r121" alt="中文考精华：日本美术留学与京都精华大学相关内容封面" loading="lazy" decoding="async" fetchpriority="low" width="360" height="482"></figure>
      <div class="resource-story-copy"><small>01 · 美术升学</small><b>栗子老师｜日本美术留学捷径：用中文去考京都精华大学吧！</b><span>查看内容</span></div>
    </a>
    <a class="resource-link resource-story" href="https://xhslink.cn/o/5Djzx1FPbYQ" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--portrait"><img src="images/resources-r121/kyotsu.webp?v=20260828r121" alt="栗子老师共通考试介绍内容封面" loading="lazy" decoding="async" fetchpriority="low" width="360" height="486"></figure>
      <div class="resource-story-copy"><small>02 · 共通考试</small><b>栗子老师｜什么是共通考试？日本留学的信息差！</b><span>查看内容</span></div>
    </a>
    <a class="resource-link resource-story" href="https://xhslink.cn/m/5QyfLyRRHK1" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--portrait"><img src="images/resources-r115/kuriko-tus.webp?v=20260828r121" alt="栗子老师日本留学信息差与东京理科大学中文考试内容封面" loading="lazy" decoding="async" fetchpriority="low" width="220" height="293"></figure>
      <div class="resource-story-copy"><small>03 · 日留信息差</small><b>栗子老师｜用中文能考东京理科大学？！福报！</b><span>查看内容</span></div>
    </a>
    <a class="resource-link resource-story" href="https://xhslink.cn/o/17CWJJBamPK" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--landscape"><img src="images/resources-r121/interview.webp?v=20260828r121" alt="日本大学一般入试合格学生采访内容封面" loading="lazy" decoding="async" fetchpriority="low" width="640" height="360"></figure>
      <div class="resource-story-copy"><small>04 · 合格学生采访</small><b>合格学生采访｜极限逆袭！速通日本大学一般入试</b><span>查看内容</span></div>
    </a>
    <a class="resource-link resource-story" href="https://mp.weixin.qq.com/s/ZMtJsMmy-gfTXMUUDcR7HQ" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--landscape"><img src="images/resources-r121/wechat.webp?v=20260828r122" alt="共通考试政策与报考说明彩铅插图" loading="lazy" decoding="async" fetchpriority="low" width="320" height="240"></figure>
      <div class="resource-story-copy"><small>05 · 微信公众号</small><b>政策解读｜「共通考试」是否能成为秒杀 EJU 的日本留学新选择？</b><span>阅读全文</span></div>
    </a>
    <a class="resource-link resource-story" href="https://m.tech.china.com/mtz/touzi/2026/0430/230973.html" target="_blank" rel="noopener noreferrer">
      <figure class="resource-story-media resource-story-media--landscape"><img src="images/resources-r123/media.webp?v=20260828r123" alt="旅人教育媒体报道采访彩铅插图" loading="lazy" decoding="async" fetchpriority="low" width="480" height="360"></figure>
      <div class="resource-story-copy"><small>06 · 中华网</small><b>媒体报道｜谈近十年中国高考外语科目中的变革</b><span>阅读全文</span></div>
    </a>`;
})();