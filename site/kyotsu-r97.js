(()=>{
  /* r98 enhancement is loaded from the existing schedule module so the page markup stays stable. */
  if(!document.querySelector('link[data-kyotsu-r98]')){
    const style=document.createElement('link');
    style.rel='stylesheet';style.href='kyotsu-r98.css?v=20260828r98';style.dataset.kyotsuR98='';
    document.head.append(style);
  }
  if(!document.querySelector('script[data-kyotsu-r98]')){
    const script=document.createElement('script');
    script.src='kyotsu-r98.js?v=20260828r98';script.dataset.kyotsuR98='';
    document.head.append(script);
  }

  const status=document.querySelector('[data-kyotsu-schedule-status]');
  if(!status)return;

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
  const items=[...document.querySelectorAll('.kyotsu-schedule-item[data-stage]')];
  const mark=stage=>items.forEach(item=>item.classList.toggle('is-current',item.dataset.stage===stage));

  let text='令和9年度（2027年1月实施）的最新官方日程。';
  let stage='';

  if(today<20260701){
    text='7月1日 10:00 起可以创建共通テスト出愿网站个人页面（My Page）。';
    stage='mypage';
  }else if(today<=20260914){
    text='当前：个人页面（My Page）已开放；正式出愿从 9月15日 10:00 开始。';
    stage='mypage';
  }else if(today<=20261002){
    text='当前：出愿受付中。出愿内容登记至 10月2日 17:00；检定费支付至当日 23:59。';
    stage='entry';
  }else if(today<=20261008){
    text='出愿受付已经结束。10月9日开始确认・订正出愿内容。';
    stage='correction';
  }else if(today<=20261016){
    text='当前：出愿内容确认・订正期间，截止 10月16日 17:00。';
    stage='correction';
  }else if(today<=20261203){
    text='出愿手续阶段结束。12月4日 10:00 起可以取得准考证（受験票）。';
    stage='ticket';
  }else if(today<=20270115){
    text='当前：可以从个人页面取得准考证（受験票）。正式考试为 2027年1月16日、17日。';
    stage='ticket';
  }else if(today<=20270117){
    text='当前：令和9年度大学入学共通テスト正式考试（本試験）。';
    stage='exam';
  }else if(today<=20270122){
    text='正式考试已经结束；追试（追試験）安排在 1月23日、24日。';
    stage='makeup';
  }else if(today<=20270124){
    text='当前：令和9年度大学入学共通テスト追试（追試験）。';
    stage='makeup';
  }else{
    text='令和9年度正式考试与追试已经结束；后续请确认大学入试中心公布的成绩与相关日程。';
  }

  status.textContent=text;
  if(stage)mark(stage);
})();
