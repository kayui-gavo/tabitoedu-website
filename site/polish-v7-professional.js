(() => {
  'use strict';

  const home=document.getElementById('home');
  const kyotsu=document.getElementById('kyotsu');
  const eju=document.getElementById('eju');
  const art=document.getElementById('art');

  function removeGenericProof(){
    document.querySelectorAll('.v5-result-proof').forEach(el=>el.remove());
  }

  function rebuildHero(){
    if(!home) return;
    const hero=home.querySelector('.v5-hero, section.hero-bg');
    const layout=hero&&hero.querySelector('.v5-hero-layout');
    if(!hero||!layout) return;
    layout.querySelector('.v5-hero-media')?.remove();
    if(!layout.querySelector('.v7-hero-index')){
      layout.insertAdjacentHTML('beforeend',`<aside class="v7-hero-index" aria-label="主要升学项目">
        <header><span>2026</span><strong>主要升学项目</strong></header>
        <button type="button" data-page-target="art"><b>01</b><span><strong>美术升学</strong><small>实技・作品集・专业方向</small></span><i>→</i></button>
        <button type="button" data-page-target="kyotsu"><b>02</b><span><strong>共通考试</strong><small>按科课程・升学申请支持</small></span><i>→</i></button>
        <button type="button" data-page-target="eju"><b>03</b><span><strong>EJU・校内考</strong><small>EJU 一对一・校别对策</small></span><i>→</i></button>
        <footer><span>东京・中野</span><span>Online</span></footer>
      </aside>`);
      layout.querySelectorAll('[data-page-target]').forEach(btn=>btn.addEventListener('click',()=>window.showPage?.(btn.dataset.pageTarget)));
    }
    hero.classList.add('v7-hero-clean');
  }

  function removeUnrelatedImages(){
    if(home){
      const cards=[...home.querySelectorAll('.v4-program-card')];
      cards.forEach((card,i)=>{
        if(i===0){card.classList.add('v7-program-card--art');return;}
        card.querySelector('.v5-program-media')?.remove();
        card.classList.add('v7-program-card--text');
      });
      home.querySelectorAll('.v5-common-media').forEach(el=>el.remove());
    }
    eju?.querySelectorAll('.v5-eju-media').forEach(el=>el.remove());
    const commonHero=kyotsu?.querySelector('.v5-subhero--common');
    if(commonHero) commonHero.classList.add('v7-neutral-subhero');
  }

  function rebuildClassroom(){
    if(!home) return;
    const old=home.querySelector('#nakano-classroom');
    if(!old) return;
    old.className='v7-classroom';
    old.innerHTML=`<div class="v3-shell">
      <aside class="v7-tabito-block">
        <div class="v7-tabito-media-stage">
          <figure class="v7-tabito-photo"><img src="https://kayui-gavo.github.io/assets/tabito-classroom-v5.webp" alt="旅人教育东京中野教室实景" loading="lazy" decoding="async"></figure>
          <div class="v7-tabito-map"><iframe title="旅人教育东京中野教室 Google 地图" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E9%87%8E%E5%8C%BA%E4%B8%AD%E9%87%8E1-55-3%20%E3%83%95%E3%82%A7%E3%83%AA%E3%82%B9%E3%83%93%E3%83%AB&output=embed"></iframe></div>
        </div>
        <div class="v7-tabito-info">
          <div class="v7-tabito-head">
            <div><span class="v7-overline">东京・中野</span><h2>旅人教育｜东京・中野</h2><p>中国旅人教育集团株式会社</p></div>
            <img src="images/logo1.png" alt="旅人教育 TABITO" loading="lazy">
          </div>
          <div class="v7-tabito-bottom">
            <address>〒164-0001<br>東京都中野区中野1-55-3<br>フェリスビル 4F</address>
            <p>线下课程、升学面谈与部分教学活动在中野教室开展。</p>
            <div class="v7-tabito-links">
              <a href="https://xhslink.cn/m/5QyfLyRRHK1" target="_blank" rel="noopener noreferrer">小红书官方号 <span>↗</span></a>
              <a href="images/wechat_qr1.jpeg" target="_blank" rel="noopener noreferrer">微信・公众号 <span>↗</span></a>
              <a href="https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E9%87%8E%E5%8C%BA%E4%B8%AD%E9%87%8E1-55-3%20%E3%83%95%E3%82%A7%E3%83%AA%E3%82%B9%E3%83%93%E3%83%AB" target="_blank" rel="noopener noreferrer">Google 地图 <span>↗</span></a>
            </div>
          </div>
        </div>
      </aside>
    </div>`;
  }

  function cleanCopy(){
    if(home){
      const results=home.querySelector('#results');
      const title=results?.querySelector('.v3-title');
      const lede=results?.querySelector('.v3-lede');
      if(title) title.textContent='合格实绩（截至 2026 年 4 月）';
      if(lede) lede.textContent='公司于 2025 年 3 月创办，同年 9 月正式开课。以下为截至 2026 年 4 月公开榜单中的合格校次。';

      const method=home.querySelector('#how-we-work');
      const mt=method?.querySelector('.v4-method-head h2');
      if(mt) mt.textContent='升学指导体系';
      const methodData=[
        ['01','目标校确认','先核对募集要项、考试方式与科目要求。'],
        ['02','科目与进度规划','根据基础、考试时间和目标分数安排课程顺序。'],
        ['03','对应学科授课','数学、理科、语言、人文与美术由相应教师负责。'],
        ['04','出愿・面试衔接','笔试之外，同步确认材料、出愿节点与面试准备。']
      ];
      [...(method?.querySelectorAll('.v4-method-grid article')||[])].forEach((a,i)=>{
        const d=methodData[i]; if(!d) return;
        a.innerHTML=`<b>${d[0]}</b><strong>${d[1]}</strong><span>${d[2]}</span>`;
      });

      const faculty=home.querySelector('#faculty');
      const ft=faculty?.querySelector('.v5-section-head h2');
      const fp=faculty?.querySelector('.v5-section-head p:not(.v3-kicker)');
      if(ft) ft.textContent='部分讲师介绍';
      if(fp) fp.textContent='以下为部分授课讲师。具体担当科目与排课根据课程类型、学生需求与当期安排调整。';

      const guide=home.querySelector('.v4-common-guide');
      const gt=guide?.querySelector('h2');
      if(gt) gt.textContent='共通考试（共通テスト）｜利用方式与报考判断';

      const coverage=home.querySelector('#coverage');
      const ct=coverage?.querySelector('.v6-section-head h2');
      const cp=coverage?.querySelector('.v6-section-head p:not(.v3-kicker)');
      if(ct) ct.textContent='报道・政策解读・学生采访';
      if(cp) cp.textContent='汇总外部报道、旅人教育政策解读与学生采访，作为课程与升学信息的补充。';

      const teaser=home.querySelector('.v6-home-case');
      const tt=teaser?.querySelector('h2');
      if(tt) tt.textContent='2026 东京科学大学（理工学系）数理化小班｜2 名全员合格';
    }

    if(art){
      const section=art.querySelector('.v5-art-faculty');
      const t=section?.querySelector('.v5-section-head h2');
      const p=section?.querySelector('.v5-section-head p:not(.v3-kicker)');
      if(t) t.textContent='美术｜部分讲师';
      if(p) p.textContent='实技、作品集与专业方向根据学生志望配置对应教师。作品与课程内容作为主要教学展示。';
    }
  }

  function go(page,id){
    window.showPage?.(page);
    if(id) window.setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}),70);
  }

  function cleanNavigation(){
    const nav=document.querySelector('nav.fixed');
    const desktop=nav?.querySelector('.hidden.md\\:flex');
    const mobile=document.querySelector('#mobileMenu .flex.flex-col');
    const items=[
      {label:'首页',page:'home'},
      {label:'美术升学',page:'art'},
      {label:'共通考试',page:'kyotsu'},
      {label:'EJU・校内考',page:'eju'},
      {label:'合格实绩',page:'home',id:'results'},
      {label:'部分讲师',page:'home',id:'faculty'},
      {label:'中野教室',page:'home',id:'nakano-classroom'},
      {label:'咨询',page:'home',id:'contact',cta:true}
    ];
    const render=(mobileMode=false)=>items.map((item,i)=>`<a href="#" data-v7-index="${i}" class="${mobileMode?'v7-mobile-link':'v7-nav-link'}${item.cta&&!mobileMode?' v7-nav-cta':''}">${item.label}</a>`).join('');
    if(desktop){
      desktop.innerHTML=render(false); desktop.classList.add('v7-nav');
      desktop.querySelectorAll('[data-v7-index]').forEach(a=>a.addEventListener('click',ev=>{ev.preventDefault();const x=items[Number(a.dataset.v7Index)];go(x.page,x.id);}));
    }
    if(mobile){
      mobile.innerHTML=render(true);
      mobile.querySelectorAll('[data-v7-index]').forEach(a=>a.addEventListener('click',ev=>{ev.preventDefault();const x=items[Number(a.dataset.v7Index)];go(x.page,x.id);window.toggleMobileMenu?.();}));
    }
  }

  function stripVisibleEmoji(){
    const testRe=/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\uFE0F\u200D]/u;
    const replaceRe=/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\uFE0F\u200D]/gu;
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(node){
      const p=node.parentElement;
      if(!p||['SCRIPT','STYLE','TEXTAREA','NOSCRIPT'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
      return testRe.test(node.nodeValue||'')?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }});
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{n.nodeValue=(n.nodeValue||'').replace(replaceRe,'').replace(/[ \t]{2,}/g,' ');});
  }

  function removePresentationMeta(){
    document.querySelectorAll('.v3-kicker').forEach(k=>{
      const t=k.textContent.trim();
      if(/^(FACULTY|TEACHERS|HOW WE WORK|MEDIA \/ CONTENT|FURTHER READING|PASS RECORD|ART FACULTY|2026 · COMMON TEST|EJU \/ SCHOOL EXAM)$/i.test(t)) k.classList.add('v7-hide-kicker');
    });
  }

  function init(){
    removeGenericProof();
    rebuildHero();
    removeUnrelatedImages();
    rebuildClassroom();
    cleanCopy();
    cleanNavigation();
    removePresentationMeta();
    stripVisibleEmoji();
    document.documentElement.classList.add('tabito-v7-professional');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
