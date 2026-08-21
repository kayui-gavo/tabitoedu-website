(() => {
  'use strict';
  const art=document.getElementById('art');
  if(!art) return;
  const teachers=[
    ['妮老师','多摩美术大学','美术'],
    ['汤老师','多摩美术大学','雕刻'],
    ['张老师','多摩美术大学','油画'],
    ['兰老师','东京造型大学大学院','染织设计'],
    ['薛老师','北京电影学院','动画实战']
  ];
  const h2=[...art.querySelectorAll('h2')].find(x=>x.textContent.trim()==='美术师资团队');
  const section=h2&&h2.closest('section');
  if(!section) return;
  section.className='v5-faculty-section v5-faculty-section--project v5-art-faculty';
  section.innerHTML=`<div class="v3-shell v5-faculty-shell">
    <div class="v5-section-head"><div><p class="v3-kicker">ART FACULTY</p><h2>美术师资</h2><p>美术页面把作品放在视觉中心，教师信息以学校与专业方向呈现；具体教学能力由后续教师作品与学生作品共同说明。</p></div><span class="v5-faculty-note">作品集・实技・专业方向</span></div>
    <div class="v5-faculty-groups"><section class="v5-faculty-group"><header><h3>专业方向</h3><span>按方向配置教师</span></header><div>${teachers.map(t=>`<div class="v5-faculty-row"><span class="v5-faculty-name">${t[0]}</span><span class="v5-faculty-school">${t[1]}</span><span class="v5-faculty-subject">${t[2]}</span><span class="v5-faculty-arrow"></span></div>`).join('')}</div></section></div>
  </div>`;
})();
