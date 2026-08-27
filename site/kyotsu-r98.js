(()=>{
  const items=[...document.querySelectorAll('.kyotsu-schedule-item[data-stage]')];
  if(!items.length)return;

  if(!document.querySelector('link[data-kyotsu-r99]')){
    const style=document.createElement('link');
    style.rel='stylesheet';
    style.href='kyotsu-r99.css?v=20260828r99';
    style.dataset.kyotsuR99='';
    document.head.append(style);
  }

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
  const status=document.querySelector('[data-kyotsu-schedule-status]');
  let tools=scheduleSection?.querySelector('.kyotsu-schedule-tools');
  let toggleButton=null;
  if(scheduleSection&&status&&!tools){
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
    const parts=new Intl.DateTimeFormat('en-CA',{
      timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'
    }).formatToParts(new Date());
    const get=type=>Number(parts.find(p=>p.type===type)?.value||0);
    return {year:get('year'),month:get('month'),day:get('day')};
  };
  const dayNumber=({year,month,day})=>Date.UTC(year,month-1,day)/86400000;
  const parseDay=value=>{
    const [year,month,day]=value.split('-').map(Number);
    return dayNumber({year,month,day});
  };
  const todayNumber=()=>dayNumber(tokyoDateParts());

  const setState=()=>{
    const today=todayNumber();
    let endedCount=0;

    items.forEach((item,index)=>{
      const config=schedule[index];
      if(!config)return;
      const start=parseDay(config.start);
      const end=parseDay(config.end);
      const untilStart=start-today;
      const untilEnd=end-today;

      item.classList.remove('is-ended','is-upcoming','is-active-window','is-current');
      let badge=item.querySelector('.kyotsu-schedule-countdown');
      if(!badge){
        badge=document.createElement('span');
        badge.className='kyotsu-schedule-countdown';
        const time=item.querySelector('time');
        time?.insertAdjacentElement('afterend',badge);
      }

      let label='';
      if(today>end){
        endedCount++;
        item.classList.add('is-ended');
        label='已结束';
      }else if(today<start){
        item.classList.add('is-upcoming');
        if(untilStart===1)label='还有 1 天';
        else label=`还有 ${untilStart} 天`;
      }else{
        item.classList.add('is-active-window','is-current');
        if(config.kind==='available'){
          label=today===start?'今天开始':'已开放';
        }else if(config.kind==='exam'){
          if(start===end)label='今天考试';
          else if(today===start)label='今天开始';
          else if(today===end)label='今天结束';
          else label='进行中';
        }else if(today===end){
          label='今天截止';
        }else{
          label=untilEnd===1?'进行中 · 明天截止':`进行中 · 距截止还有 ${untilEnd} 天`;
        }
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

  /* Re-evaluate after Tokyo midnight if the page stays open. */
  const now=new Date();
  const tokyoNowParts=new Intl.DateTimeFormat('en-US',{
    timeZone:'Asia/Tokyo',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'
  }).formatToParts(now);
  const read=type=>Number(tokyoNowParts.find(p=>p.type===type)?.value||0);
  const secondsToday=read('hour')*3600+read('minute')*60+read('second');
  const delay=(86400-secondsToday+2)*1000;
  window.setTimeout(()=>{setState();window.setInterval(setState,86400000);},delay);
})();
