(()=>{
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
  else if(today<=20261002){text='正在受理出愿登记与检定费支付。';stage='entry';}
  else if(today<=20261008){text='出愿登记已结束；10月9日起可确认并订正出愿内容。';stage='correction';}
  else if(today<=20261016){text='现在可以在 My Page 确认并订正出愿内容。';stage='correction';}
  else if(today<20261204){text='出愿手续阶段已结束；准考证从 12月4日 10:00 起取得。';stage='ticket';}
  else if(today<20270116){text='准考证已可取得并打印；正式考试为 2027年1月16日・17日。';stage='ticket';}
  else if(today<=20270117){text='大学入学共通テスト正式考试日。';stage='exam';}
  else if(today<20270123){text='正式考试已结束；符合条件者的追试为 1月23日・24日。';stage='makeup';}
  else if(today<=20270124){text='大学入学共通テスト追试日。';stage='makeup';}
  else{text='令和9年度共通テスト的主要考试日程已结束。';stage='makeup';}

  status.textContent=text;
  if(stage)mark(stage);
})();