(() => {
  'use strict';

  const home=document.getElementById('home');
  const kyotsu=document.getElementById('kyotsu');
  const eju=document.getElementById('eju');

  const link=(href,label,meta='')=>`<a class="v6-source-link" href="${href}" target="_blank" rel="noopener noreferrer"><span>${label}</span>${meta?`<small>${meta}</small>`:''}<b>↗</b></a>`;

  function relabelFaculty(){
    document.querySelectorAll('.v5-faculty-section').forEach(section=>{
      const h2=section.querySelector('.v5-section-head h2');
      if(h2 && h2.textContent.trim()==='师资团队') h2.textContent='部分讲师介绍';
      if(h2 && h2.textContent.trim()==='共通考试师资') h2.textContent='共通考试｜部分讲师';
    });
    const homeFaculty=home&&home.querySelector('#faculty');
    if(homeFaculty){
      const p=homeFaculty.querySelector('.v5-section-head p:not(.v3-kicker)');
      if(p) p.textContent='以下为部分授课讲师。具体担当科目与排课将根据课程类型、学生需求和当期课程安排调整。';
      const note=homeFaculty.querySelector('.v5-faculty-note');
      if(note) note.textContent='部分讲师 · 当期排课为准';
    }
  }

  function keepOnlyPersonalProfileLink(){
    document.querySelectorAll('.v5-faculty-row[href]').forEach(a=>{
      if(!/teachers\/liu-kewei\.html/.test(a.getAttribute('href')||'')){
        const div=document.createElement('div');
        div.className=a.className;
        div.innerHTML=a.innerHTML;
        a.replaceWith(div);
      }
    });
  }

  function makeMapVisible(){
    const classroom=home&&home.querySelector('#nakano-classroom');
    if(!classroom) return;
    const actions=classroom.querySelector('.v4-classroom-actions');
    if(!actions||actions.querySelector('.v6-map-card')) return;
    const old=actions.querySelector('details');
    if(old) old.remove();
    actions.insertAdjacentHTML('afterend',`<div class="v6-map-card"><iframe title="旅人教育东京中野教室地图" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E9%87%8E%E5%8C%BA%E4%B8%AD%E9%87%8E1-55-3%20%E3%83%95%E3%82%A7%E3%83%AA%E3%82%B9%E3%83%93%E3%83%AB&output=embed"></iframe><div><strong>东京・中野教室</strong><span>東京都中野区中野1-55-3 フェリスビル 4F</span></div></div>`);
  }

  function commonResources(){
    const guide=home&&home.querySelector('.v4-common-guide');
    if(guide&&!guide.querySelector('.v6-common-resources')){
      guide.querySelector('.max-w-5xl')?.insertAdjacentHTML('beforeend',`<aside class="v6-common-resources"><div><p class="v3-kicker">FURTHER READING</p><h3>政策与路线解读</h3><p>共通考试能否用于出愿、需要哪些科目，最终以目标大学当年度募集要项为准。以下内容用于帮助学生和家长先建立路线判断框架。</p></div><div class="v6-source-list">
        ${link('https://mp.weixin.qq.com/s/ZMtJsMmy-gfTXMUUDcR7HQ','共通考试政策解读','旅人教育公众号')}
        ${link('https://xhslink.cn/o/5Djzx1FPbYQ','栗子老师介绍共通考试','小红书')}
        ${link('https://xhslink.cn/o/17CWJJBamPK','逆袭！日本大学一般入试合格学生采访','小红书 · 学生采访')}
      </div></aside>`);
    }
  }

  function commonCourse2026(){
    if(!kyotsu||kyotsu.querySelector('#common-course-2026')) return;
    const teachers=kyotsu.querySelector('#kyotsu-teachers');
    const section=document.createElement('section');
    section.id='common-course-2026';
    section.className='v6-common-course';
    section.innerHTML=`<div class="v3-shell">
      <div class="v6-section-head"><div><p class="v3-kicker">2026 · COMMON TEST</p><h2>2026 共通考试课程</h2><p>按科报名，课程学习与升学申请支持并行。以下为 2026 年 8 月公布的课程与收费信息。</p></div><div class="v6-price"><span>单科课程费</span><strong>14,000</strong><em>元 / 科</em><small>4 科及以上免材料费</small></div></div>
      <div class="v6-course-grid">
        <div class="v6-subjects"><h3>开设科目</h3><dl><div><dt>数学类</dt><dd>数学 1A · 数学 2BC</dd></div><div><dt>理科类</dt><dd>物理 · 化学 · 生物 · 地学</dd></div><div><dt>文科类</dt><dd>地理综合・地理探究 · 公共政治经济 · 历史综合・世界史探究</dd></div><div><dt>语言类</dt><dd>日语 · 国语</dd></div></dl></div>
        <div class="v6-fee-rules"><h3>费用与报名规则</h3><p><b>材料费 5,000 元</b></p><p>1–3 科：课程费 + 材料费<br>4 科及以上：材料费免除</p><p class="v6-muted">日语水平未达到 N2 或同等水平时，报名其他科目须同时报名日语科目。</p></div>
      </div>
      <div class="v6-support"><span>材料费包含的升学申请支持</span><ol><li><b>01</b>志愿规划</li><li><b>02</b>报名材料审核</li><li><b>03</b>报名材料准备</li><li><b>04</b>报名手续指导</li></ol></div>
      <div class="v6-fee-examples"><div><span>单科</span><b>19,000 元</b><small>含材料费</small></div><div><span>两科</span><b>33,000 元</b><small>含材料费</small></div><div><span>三科</span><b>47,000 元</b><small>含材料费</small></div><div><span>四科</span><b>56,000 元</b><small>材料费免除</small></div></div>
      <p class="v6-fineprint">以上价格均为人民币报价。地理综合与地理探究按一科计算。课程与报名条件以当期正式通知为准。</p>
    </div>`;
    if(teachers) teachers.insertAdjacentElement('beforebegin',section); else kyotsu.append(section);
  }

  function buildEjuAndSchoolExam(){
    if(!eju||eju.querySelector('#school-exam-programs')) return;
    const base=eju.querySelector('.v3-eju-overview')||eju.querySelector('section:last-of-type');
    const section=document.createElement('section');
    section.id='school-exam-programs';
    section.className='v6-school-exam';
    section.innerHTML=`<div class="v3-shell">
      <div class="v6-section-head v6-section-head--light"><div><p class="v3-kicker">EJU / SCHOOL EXAM</p><h2>EJU 一对一 · 校内考对策</h2><p>EJU 目前仅接一对一。校内考课程则根据学生报考需求，开设人气学校的校内考对策课程。</p></div><span class="v6-status">EJU · 1对1</span></div>
      <div class="v6-two-paths"><article><span>EJU</span><h3>目前仅接一对一</h3><p>围绕 EJU 科目、目标校筛选、出愿与面试安排内容，按个人报考计划推进。</p></article><article><span>SCHOOL EXAM</span><h3>按目标校需求开设</h3><p>面向有明确目标校的学生，按学校的笔试科目、题型特点与面试要求组织小班或专项课程。</p></article></div>
      <article class="v6-titech-case"><header><div><p class="v3-kicker">TOKYO SCIENCE · 2026</p><h3>东京科学大学（理工学系）数理化笔试对策小班</h3><p>数学・物理・化学 + 原创模拟题 + 模拟面试</p></div><div class="v6-case-score"><b>2 / 2</b><span>最终合格</span></div></header>
        <div class="v6-case-body"><div class="v6-case-stats"><div><span>报名</span><b>2 人</b></div><div><span>笔试合格</span><b>2 人</b></div><div><span>最终合格</span><b>2 人</b></div></div><div class="v6-case-students"><span>本班合格者</span><b>41026 · 经营工学系</b><b>41064 · 融合理工学系</b></div></div>
        <div class="v6-material-strip"><div><b>面试对策</b><span>面试意义 · 常见问题 · 回答准备 · 模拟面试</span></div><div><b>原创模拟题</b><span>数学 · 物理 · 化学，按校内考题型与推导要求命制</span></div><div><b>笔试训练</b><span>数列、力学・电磁等综合题型，训练推导与记述</span></div></div>
        <p class="v6-proof-note">课程资料与合格公告均为本课程实际教学/合格记录的部分展示。合格者编号 41026、41064 可在 2026 年东京科学大学私费外国人留学生特别选拔合格公告中核对。</p>
      </article>
    </div>`;
    if(base) base.insertAdjacentElement('afterend',section); else eju.append(section);
  }

  function homeCaseTeaser(){
    if(!home||home.querySelector('.v6-home-case')) return;
    const results=home.querySelector('#results');
    if(!results) return;
    results.insertAdjacentHTML('afterend',`<section class="v6-home-case"><div class="v3-shell"><div><p class="v3-kicker">2026 · TOKYO SCIENCE</p><h2>东京科学大学数理化对策小班：2 人报名，2 人最终合格</h2><p>数学・物理・化学笔试训练，配合原创模拟题与模拟面试。合格者编号 41026、41064。</p></div><button type="button" onclick="showPage('eju');setTimeout(()=>document.getElementById('school-exam-programs')?.scrollIntoView({behavior:'smooth'}),50)">查看课程案例 →</button></div></section>`);
  }

  function externalCoverage(){
    if(!home||home.querySelector('#coverage')) return;
    const company=home.querySelector('.v4-company');
    if(!company) return;
    company.insertAdjacentHTML('afterend',`<section id="coverage" class="v6-coverage"><div class="v3-shell"><div class="v6-section-head v6-section-head--light"><div><p class="v3-kicker">MEDIA / CONTENT</p><h2>外部报道与官方内容</h2><p>用外部报道、政策解读与学生采访补充课程页中的机构自述。</p></div></div><div class="v6-coverage-grid">
      ${link('https://m.tech.china.com/mtz/touzi/2026/0430/230973.html','中华网媒体报道','2026.04.30')}
      ${link('https://life.china.com/2026-04/29/content_571768.html','中华网媒体报道','2026.04.29')}
      ${link('https://mp.weixin.qq.com/s/ZMtJsMmy-gfTXMUUDcR7HQ','共通考试政策解读','旅人教育公众号')}
      ${link('https://xhslink.cn/o/5Djzx1FPbYQ','栗子老师介绍共通考试','小红书')}
      ${link('https://xhslink.cn/o/17CWJJBamPK','日本大学一般入试合格学生采访','小红书')}
    </div></div></section>`);
  }

  function init(){
    relabelFaculty();
    keepOnlyPersonalProfileLink();
    makeMapVisible();
    commonResources();
    commonCourse2026();
    buildEjuAndSchoolExam();
    homeCaseTeaser();
    externalCoverage();
    document.documentElement.classList.add('tabito-v6-evidence');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();