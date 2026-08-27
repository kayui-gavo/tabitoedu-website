(()=>{
  const facultySection=document.getElementById('faculty') || document.querySelector('.people-section');
  const heading=facultySection?.querySelector('.team-head h2, h2');
  if(heading)heading.textContent='授课・教研团队';

  const mathLine=[...(facultySection?.querySelectorAll('.faculty-line')||[])].find(line=>line.querySelector('h3')?.textContent.trim()==='数学');
  const mathPeople=mathLine?.querySelector('.faculty-people');
  if(mathPeople && ![...mathPeople.querySelectorAll('.faculty-person b')].some(el=>el.textContent.trim()==='吴')){
    const person=document.createElement('div');
    person.className='faculty-person';
    person.innerHTML='<b>吴</b><div class="faculty-meta"><span class="faculty-school">东京理科大学</span></div>';
    mathPeople.append(person);
  }

  const chemistry=[...(facultySection?.querySelectorAll('.faculty-subject-col')||[])].find(col=>col.querySelector('h4')?.textContent.trim()==='化学');
  const chemistryTeachers=chemistry?.querySelector('.faculty-subject-teachers');
  if(chemistryTeachers && ![...chemistryTeachers.querySelectorAll('b')].some(el=>el.textContent.trim()==='纪')){
    const teacher=document.createElement('p');
    teacher.innerHTML='<b>纪</b><span>东京理科大学</span>';
    chemistryTeachers.append(teacher);
  }

  const kurikoResource=[...document.querySelectorAll('.resource-link')].find(link=>link.href.includes('xhslink.cn/o/5Djzx1FPbYQ'));
  const kurikoPlatform=kurikoResource?.querySelector('small');
  if(kurikoPlatform)kurikoPlatform.textContent='小红书 · 共通考试';
})();
