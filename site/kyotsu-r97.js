(()=>{
  /* r104: load one consolidated visual layer. Previous r98 -> r99 -> r101/r102 runtime requests are folded here. */
  if(!document.querySelector('link[data-kyotsu-visual-r104]')){
    const style=document.createElement('link');
    style.rel='stylesheet';
    style.href='kyotsu-visual-r104.css?v=20260828r104';
    style.dataset.kyotsuVisualR104='';
    document.head.append(style);
  }

  const subjectTitle=document.querySelector('#subjects .course-head h2');
  if(subjectTitle)subjectTitle.textContent='开设科目';

  const status=document.querySelector('[data-kyotsu-schedule-status]');
  const items=[...document.querySelectorAll('.kyotsu-schedule-item[data-stage]')];
  if(!status||!items.length)return;

  const ticketItem=document.querySelector('.kyotsu-schedule-item[data-stage="ticket"]');
  const examItem=document.querySelector('.kyotsu-schedule-item[data-stage="exam"]');
  const makeupItem=document.querySelector('.kyotsu-schedule-item[data-stage="makeup"]');
  if(ticketItem){
    const label=ticketItem.querySelector('b');
    const note=ticketItem.querySelector('span');
    if(label)label.textContent='准考证（受験票）';
    if(note)note.textContent='从个人页面取得并打印';
  }
  if(examItem){const label=examItem.querySelector('b');if(label)label.textContent='正式考试（本試験）';}
  if(makeupItem){const label=makeupItem.querySelector('b');if(label)label.textContent='追试（追試験）';}

  const todayParts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const get=type=>todayParts.find(p=>p.type===type)?.value||'';
  const today=Number(`${get('year')}${get('month')}${get('day')}`);
  const mark=stage=>items.forEach(item=>item.classList.toggle('is-current',item.dataset.stage===stage));

  let text='令和9年度（2027年1月实施）的官方日程。';
  let stage='';
  if(today<20260701){text='My Page 将于 7月1日 10:00 开放。';stage='mypage';}
  else if(today<=20260914){text='My Page 已开放；出愿登记从 9月15日 10:00 开始。';stage='mypage';}
  else if(today<=20261002){text='出愿受理中：内容登记截至 10月2日 17:00，检定费支付截至 23:59。';stage='entry';}
  else if(today<=20261008){text='出愿登记已结束；10月9日起可确认、订正出愿内容。';stage='correction';}
  else if(today<=20261016){text='出愿内容确认・订正期间，截止 10月16日 17:00。';stage='correction';}
  else if(today<=20261203){text='出愿手续已结束；12月4日 10:00 起可取得准考证（受験票）。';stage='ticket';}
  else if(today<=20270115){text='准考证（受験票）现已可以下载打印；正式考试为 2027年1月16日、17日。';stage='ticket';}
  else if(today<=20270117){text='1月16日、17日为令和9年度大学入学共通テスト正式考试（本試験）。';stage='exam';}
  else if(today<=20270122){text='正式考试已结束；追试安排在 1月23日、24日。';stage='makeup';}
  else if(today<=20270124){text='1月23日、24日为令和9年度大学入学共通テスト追试（追試験）。';stage='makeup';}
  else{text='令和9年度正式考试及追试已结束。后续信息请查看大学入试中心公告。';}
  status.textContent=text;
  if(stage)mark(stage);

  /* Inline the small SVG icon pass so no second JavaScript request is needed. */
  const paths={
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    person:'<circle cx="12" cy="8" r="3"/><path d="M5 21c.7-4 3.2-6 7-6s6.3 2 7 6"/>',
    building:'<path d="M4 21V8l8-4 8 4v13M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-4h4v4"/>',
    route:'<circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18c5 0 2-7 7-7h3M9 6H5a2 2 0 0 0-2 2v4"/>',
    book:'<path d="M4 5.5A3.5 3.5 0 0 1 7.5 4H12v16H7.5A3.5 3.5 0 0 0 4 21.5V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 4H12v16h4.5a3.5 3.5 0 0 1 3.5 1.5V5.5Z"/>',
    language:'<path d="M4 5h10v8H8l-4 3v-3H4V5ZM11 9h9v8h-3l-4 3v-3h-2"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16.5 9"/>',
    file:'<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>',
    wallet:'<path d="M4 6h14a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2V7a3 3 0 0 1 3-3h11"/><path d="M15 11h6v4h-6a2 2 0 1 1 0-4Z"/>',
    edit:'<path d="M4 20h4l11-11-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
    ticket:'<path d="M4 7h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4V7Z"/><path d="M12 9v2M12 13v2M12 17v1"/>',
    map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/>',
    flag:'<path d="M6 21V4M6 5h10l-2 3 2 3H6"/>',
    calculator:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h1M8 15h2M12 15h2M16 15h1M8 18h2M12 18h5"/>',
    atom:'<circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>',
    code:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    list:'<path d="M9 6h11M9 12h11M9 18h11"/><path d="m4 6 1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>'
  };
  const icon=(name,cls='r101-icon')=>`<span class="${cls}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.book}</svg></span>`;
  const prepend=(el,name,cls='r101-icon')=>{if(el&&!el.querySelector(':scope > .r101-icon,:scope > .r101-icon-tile,:scope > .r101-mini-icon'))el.insertAdjacentHTML('afterbegin',icon(name,cls));};

  ['calendar','globe','person','building'].forEach((name,i)=>prepend(document.querySelectorAll('.kyotsu-hero-facts>div')[i],name,'r101-icon-tile'));
  prepend(document.querySelector('.kyotsu-definition>small'),'book','r101-mini-icon');
  const definition=document.querySelector('.kyotsu-definition');
  if(definition&&!definition.querySelector('.kyotsu-use-strip')){
    const strip=document.createElement('div');
    strip.className='kyotsu-use-strip';
    strip.innerHTML=`<span class="kyotsu-use-label">常见使用方式</span><span>${icon('file','r101-mini-icon')}一般选拔</span><span>${icon('check','r101-mini-icon')}共通テスト利用</span>`;
    definition.append(strip);
  }
  const routeLines=document.querySelectorAll('.kyotsu-route-line');
  prepend(routeLines[0],'route','r101-mini-icon');
  prepend(routeLines[1],'check','r101-mini-icon');
  ['person','file','wallet','edit','ticket','calendar','calendar'].forEach((name,i)=>prepend(document.querySelectorAll('.kyotsu-schedule-item b')[i],name,'r101-mini-icon'));
  prepend(status,'clock','r101-mini-icon');
  ['book','map','flag','calculator','atom','language','code'].forEach((name,i)=>prepend(document.querySelectorAll('.kyotsu-subject-group header>div')[i],name,'r101-icon-tile'));
  prepend(document.querySelector('.kyotsu-fee-lead'),'wallet','r101-icon-tile');
  ['file','list','calendar'].forEach((name,i)=>prepend(document.querySelectorAll('.kyotsu-planning-lines li>div')[i],name,'r101-mini-icon'));

  /* Countdown/state calculation lives in this file now, eliminating the extra r98 script request. */
  const schedule=[
    {start:'2026-07-01',end:'2026-10-02',kind:'range'},
    {start:'2026-09-15',end:'2026-10-02',kind:'range'},
    {start:'2026-09-15',end:'2026-10-02',kind:'range'},
    {start:'2026-10-09',end:'2026-10-16',kind:'range'},
    {start:'2026-12-04',end:'2027-01-17',kind:'available'},
    {start:'2027-01-16',end:'2027-01-17',kind:'exam'},
    {start:'2027-01-23',end:'2027-01-24',kind:'exam'}
  ];
  const scheduleSection=document.querySelector('.kyotsu-schedule-section');
  let tools=scheduleSection?.querySelector('.kyotsu-schedule-tools');
  let toggleButton=null;
  if(scheduleSection&&!tools){
    tools=document.createElement('div');
    tools.className='kyotsu-schedule-tools';
    tools.hidden=true;
    tools.innerHTML='<button class="kyotsu-schedule-toggle" type="button" aria-pressed="false">隐藏已结束</button>';
    status.insertAdjacentElement('afterend',tools);
    toggleButton=tools.querySelector('button');
    toggleButton.addEventListener('click',()=>{
      const hiding=scheduleSection.classList.toggle('is-hiding-ended');
      toggleButton.setAttribute('aria-pressed',String(hiding));
      toggleButton.textContent=hiding?'显示全部':'隐藏已结束';
    });
  }else toggleButton=tools?.querySelector('button')||null;

  const tokyoDateParts=()=>{
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const read=type=>Number(parts.find(p=>p.type===type)?.value||0);
    return {year:read('year'),month:read('month'),day:read('day')};
  };
  const dayNumber=({year,month,day})=>Date.UTC(year,month-1,day)/86400000;
  const parseDay=value=>{const [year,month,day]=value.split('-').map(Number);return dayNumber({year,month,day});};
  const todayNumber=()=>dayNumber(tokyoDateParts());

  const setState=()=>{
    const current=todayNumber();
    let endedCount=0;
    items.forEach((item,index)=>{
      const config=schedule[index];
      if(!config)return;
      const start=parseDay(config.start);
      const end=parseDay(config.end);
      const untilStart=start-current;
      const untilEnd=end-current;
      item.classList.remove('is-ended','is-upcoming','is-active-window','is-current');
      let badge=item.querySelector('.kyotsu-schedule-countdown');
      if(!badge){
        badge=document.createElement('span');
        badge.className='kyotsu-schedule-countdown';
        item.querySelector('time')?.insertAdjacentElement('afterend',badge);
      }
      let label='';
      if(current>end){endedCount++;item.classList.add('is-ended');label='已结束';}
      else if(current<start){item.classList.add('is-upcoming');label=untilStart===1?'还有 1 天':`还有 ${untilStart} 天`;}
      else{
        item.classList.add('is-active-window','is-current');
        if(config.kind==='available')label=current===start?'今天开始':'已开放';
        else if(config.kind==='exam')label=current===start?'今天开始':current===end?'今天结束':'进行中';
        else if(current===end)label='今天截止';
        else label=untilEnd===1?'进行中 · 明天截止':`进行中 · 距截止还有 ${untilEnd} 天`;
      }
      badge.textContent=label;
    });
    if(tools){
      tools.hidden=endedCount===0;
      if(endedCount===0&&scheduleSection?.classList.contains('is-hiding-ended')){
        scheduleSection.classList.remove('is-hiding-ended');
        if(toggleButton){toggleButton.setAttribute('aria-pressed','false');toggleButton.textContent='隐藏已结束';}
      }
    }
    document.documentElement.classList.add('kyotsu-countdown-ready');
  };
  setState();

  /* One timer is enough: compute the next Tokyo midnight instead of polling. */
  const now=new Date();
  const tokyoNowParts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Tokyo',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(now);
  const readNow=type=>Number(tokyoNowParts.find(p=>p.type===type)?.value||0);
  const secondsToday=readNow('hour')*3600+readNow('minute')*60+readNow('second');
  const delay=(86400-secondsToday+2)*1000;
  window.setTimeout(()=>{setState();window.setInterval(setState,86400000);},delay);
})();