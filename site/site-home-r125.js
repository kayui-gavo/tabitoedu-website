(()=>{
  if(document.documentElement.dataset.homeR125)return;
  document.documentElement.dataset.homeR125='1';

  const style=document.createElement('style');
  style.dataset.homeR125='';
  style.textContent=`
    .result-lightbox-r125{width:min(980px,calc(100vw - 32px));max-width:980px;max-height:calc(100svh - 32px);padding:0;border:0;background:#fff;box-shadow:0 26px 80px rgba(6,28,39,.28)}
    .result-lightbox-r125::backdrop{background:rgba(5,27,38,.78)}
    .result-lightbox-r125 .result-lightbox-inner{position:relative;display:grid;grid-template-rows:minmax(0,1fr) auto;max-height:calc(100svh - 32px);padding:18px;background:#fff}
    .result-lightbox-r125 img{display:block;width:100%;height:auto;max-height:calc(100svh - 112px);object-fit:contain;background:#f7f9fa}
    .result-lightbox-r125 .result-lightbox-caption{padding:10px 42px 0 1px;color:#607985;font-size:11px;line-height:1.55}
    .result-lightbox-r125 .result-lightbox-close{position:absolute;right:24px;top:24px;z-index:2;display:grid;place-items:center;width:38px;height:38px;padding:0;border:1px solid #cbd7dc;background:rgba(255,255,255,.96);color:#173f55;font-size:21px;line-height:1;cursor:pointer}
    .result-gallery-card[aria-busy='true']{cursor:progress}
    @media(max-width:820px){
      .mobile-menu{right:14px!important;left:auto!important;top:70px!important;width:min(330px,calc(100vw - 28px))!important;max-height:calc(100svh - 84px)!important;padding:0!important;border-top:2px solid #173f55!important;border-bottom:1px solid #cbd8dd!important;box-shadow:0 20px 54px rgba(8,35,48,.18)!important;overflow:auto!important}
      .mobile-menu strong{display:block!important;margin:0!important;padding:14px 16px 8px!important;border-bottom:1px solid #e1e8eb!important;color:#8b9ca4!important;font-size:8.5px!important;letter-spacing:.12em!important}
      .mobile-menu a{display:flex!important;align-items:center!important;justify-content:space-between!important;min-height:46px!important;padding:0 16px!important;border-bottom:1px solid #e7edef!important;color:#365d6d!important;font-size:11.5px!important;font-weight:750!important;background:#fff!important}
      .mobile-menu a::after{content:'→';color:#7594a0;font-size:10px}
      .mobile-menu a[href^='#']{background:#fbfcfc!important;color:#607985!important}
      .result-lightbox-r125{width:calc(100vw - 18px);max-height:calc(100svh - 18px)}
      .result-lightbox-r125 .result-lightbox-inner{max-height:calc(100svh - 18px);padding:9px 9px 13px}
      .result-lightbox-r125 img{max-height:calc(100svh - 84px)}
      .result-lightbox-r125 .result-lightbox-close{right:15px;top:15px;width:36px;height:36px}
      .result-lightbox-r125 .result-lightbox-caption{padding:8px 40px 0 2px;font-size:10px}
    }
    @media(prefers-reduced-motion:reduce){.result-lightbox-r125 *{transition:none!important}}
  `;
  document.head.append(style);

  /* Ensure the homepage mobile trigger behaves as a true stacked menu. */
  const menuButton=document.getElementById('mobileMenuBtn');
  const menu=document.getElementById('mobileMenu');
  if(menuButton&&menu&&!menuButton.dataset.r125Bound){
    menuButton.dataset.r125Bound='1';
    const close=()=>{
      menuButton.setAttribute('aria-expanded','false');
      menuButton.setAttribute('aria-label','打开导航');
      menu.setAttribute('aria-hidden','true');
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
    };
    const open=()=>{
      menuButton.setAttribute('aria-expanded','true');
      menuButton.setAttribute('aria-label','关闭导航');
      menu.setAttribute('aria-hidden','false');
      menu.classList.add('open');
      document.body.classList.add('menu-open');
    };
    menuButton.addEventListener('click',event=>{
      event.stopImmediatePropagation();
      if(menuButton.getAttribute('aria-expanded')==='true')close();else open();
    },true);
    menu.addEventListener('click',event=>{if(event.target.closest('a'))close();});
    document.addEventListener('click',event=>{if(menuButton.getAttribute('aria-expanded')==='true'&&!menu.contains(event.target)&&!menuButton.contains(event.target))close();});
    document.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
  }

  /* Result records: clicking “查看大图” now opens an actual modal image viewer. */
  let dialog=document.getElementById('imageLightbox');
  if(!dialog||typeof dialog.showModal!=='function'){
    dialog=document.createElement('dialog');
    dialog.id='resultLightboxR125';
    document.body.append(dialog);
  }
  dialog.classList.add('result-lightbox-r125');

  let inner=dialog.querySelector('.lightbox-inner,.result-lightbox-inner');
  if(!inner){
    inner=document.createElement('div');
    dialog.append(inner);
  }
  inner.classList.add('result-lightbox-inner');

  let closeButton=inner.querySelector('.lightbox-close,.result-lightbox-close');
  if(!closeButton){
    closeButton=document.createElement('button');
    closeButton.type='button';
    closeButton.textContent='×';
    inner.prepend(closeButton);
  }
  closeButton.classList.add('result-lightbox-close');
  closeButton.setAttribute('aria-label','关闭大图');

  let lightboxImg=inner.querySelector('img');
  if(!lightboxImg){
    lightboxImg=document.createElement('img');
    inner.append(lightboxImg);
  }

  let caption=inner.querySelector('.result-lightbox-caption');
  if(!caption){
    caption=document.createElement('div');
    caption.className='result-lightbox-caption';
    inner.append(caption);
  }

  const getSource=async card=>{
    if(card.dataset.imageSrc)return card.dataset.imageSrc;
    const img=card.querySelector('img');
    const existing=img?.getAttribute('src');
    if(existing)return existing;
    const resource=card.dataset.resultB64;
    if(!resource)return '';
    card.setAttribute('aria-busy','true');
    try{
      const response=await fetch(resource,{cache:'force-cache'});
      if(!response.ok)throw new Error(`HTTP ${response.status}`);
      const base64=(await response.text()).replace(/\s+/g,'');
      const src=`data:image/webp;base64,${base64}`;
      card.dataset.imageSrc=src;
      if(img&&!img.getAttribute('src'))img.src=src;
      return src;
    }catch(error){
      console.error('Large result image failed to load',error);
      return '';
    }finally{
      card.removeAttribute('aria-busy');
    }
  };

  const openCard=async card=>{
    const src=await getSource(card);
    if(!src)return;
    const alt=card.dataset.lightboxAlt||card.querySelector('img')?.alt||'合格记录';
    lightboxImg.src=src;
    lightboxImg.alt=alt;
    caption.textContent=alt;
    try{await lightboxImg.decode?.();}catch(_){}
    if(typeof dialog.showModal==='function'){
      if(!dialog.open)dialog.showModal();
    }else dialog.setAttribute('open','');
    closeButton.focus({preventScroll:true});
  };

  document.querySelectorAll('.result-gallery-card').forEach(card=>{
    if(card.dataset.lightboxR125)return;
    card.dataset.lightboxR125='1';
    card.addEventListener('click',event=>{
      event.preventDefault();
      openCard(card);
    });
  });
  closeButton.addEventListener('click',()=>dialog.close?.());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close?.();});
})();
