(()=>{
  if(!document.querySelector('link[data-home-r96]')){
    const style=document.createElement('link');
    style.rel='stylesheet';style.href='site-home-r96.css?v=20260828r96';style.dataset.homeR96='';
    document.head.append(style);
  }

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

  const contactCopy=document.querySelector('#contact .contact-copy');
  const qrGrid=contactCopy?.querySelector('.qr-grid');
  if(contactCopy && qrGrid && !contactCopy.querySelector('.contact-direct')){
    const direct=document.createElement('div');
    direct.className='contact-direct';
    direct.setAttribute('aria-label','电话与邮件');
    direct.innerHTML='<a href="tel:+818064319082">电话：080-6431-9082</a><a href="mailto:jic56428@gmail.com">邮件：jic56428@gmail.com</a>';
    qrGrid.after(direct);
  }

  const recruit=document.querySelector('.contact-recruit');
  const oldRecruitMail=recruit?.querySelector('a[href^="mailto:"]');
  if(recruit && oldRecruitMail && !recruit.querySelector('.contact-recruit-contact')){
    const contacts=document.createElement('div');
    contacts.className='contact-recruit-contact';
    contacts.innerHTML='<a href="tel:+818064319082">电话：080-6431-9082</a><a href="mailto:jic56428@gmail.com?subject=%E6%97%85%E4%BA%BA%E6%95%99%E8%82%B2%EF%BD%9C%E5%BA%94%E8%81%98%E3%83%BB%E5%90%88%E4%BD%9C">邮件：jic56428@gmail.com <span aria-hidden="true">↗</span></a>';
    oldRecruitMail.replaceWith(contacts);
  }

  const footerBrand=document.querySelector('.footer-brand');
  if(footerBrand && !footerBrand.querySelector('.footer-direct-contact')){
    const direct=document.createElement('div');
    direct.className='footer-direct-contact';
    direct.innerHTML='<a href="tel:+818064319082">080-6431-9082</a><a href="mailto:jic56428@gmail.com">jic56428@gmail.com</a>';
    footerBrand.append(direct);
  }
})();
