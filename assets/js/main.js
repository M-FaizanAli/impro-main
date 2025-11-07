// FAQ block (scoped to #faq_block)
(function(){
  const items = document.querySelectorAll('#faq_block .item');
  items.forEach((it) => {
    const btn = it.querySelector('.ctrl');
    const panel = it.querySelector('.panel');
    if(!btn || !panel) return;
    btn.addEventListener('click', () => {
      const isOpen = it.getAttribute('aria-expanded') === 'true';
      items.forEach(o => {
        o.setAttribute('aria-expanded','false');
        const p = o.querySelector('.panel');
        if(p) p.style.maxHeight = '0px';
        const b = o.querySelector('.ctrl');
        if(b) b.setAttribute('aria-expanded','false');
      });
      if (!isOpen) {
        it.setAttribute('aria-expanded','true');
        btn.setAttribute('aria-expanded','true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
    if (it.getAttribute('aria-expanded') === 'true') {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      btn.setAttribute('aria-expanded','true');
    }
  });
  window.addEventListener('resize', () => {
    document.querySelectorAll('#faq_block .item[aria-expanded="true"] .panel').forEach(p => {
      p.style.maxHeight = p.scrollHeight + 'px';
    });
  });
})();

// Accessible accordion (global)
(function(){
  const items = document.querySelectorAll('.item');
  items.forEach((it) => {
    const btn = it.querySelector('.ctrl');
    const panel = it.querySelector('.panel');
    if(!btn || !panel) return;
    btn.addEventListener('click', () => {
      const isOpen = it.getAttribute('aria-expanded') === 'true';
      items.forEach(o => {
        o.setAttribute('aria-expanded','false');
        const p = o.querySelector('.panel');
        if(p) p.style.maxHeight = '0px';
        const b = o.querySelector('.ctrl');
        if(b) b.setAttribute('aria-expanded','false');
      });
      if (!isOpen) {
        it.setAttribute('aria-expanded','true');
        btn.setAttribute('aria-expanded','true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
    if (it.getAttribute('aria-expanded') === 'true') {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      btn.setAttribute('aria-expanded','true');
    }
  });
  window.addEventListener('resize', () => {
    document.querySelectorAll('.item[aria-expanded="true"] .panel').forEach(p => {
      p.style.maxHeight = p.scrollHeight + 'px';
    });
  });
})();

// Debug: page level init
console.log('[init] scripts loaded');

// Slider controls with basic debug logs
(function(){
  const slider=document.getElementById('offerSlider');
  const prev=document.getElementById('prevBtn');
  const next=document.getElementById('nextBtn');
  console.log('[slider] init', {hasSlider: !!slider, hasPrev: !!prev, hasNext: !!next});
  function scrollByCard(dir){
    const card=slider && slider.querySelector('.offer-card');
    console.log('[slider] click', dir, 'card exists', !!card);
    if(!slider || !card) return;
    const amount=card.offsetWidth+28; // include gap
    console.log('[slider] amount', amount, 'current scrollLeft', slider.scrollLeft);
    slider.scrollBy({left:dir*amount,behavior:'smooth'});
  }
  prev && prev.addEventListener('click',()=>{ console.log('[slider] prev'); scrollByCard(-1); });
  next && next.addEventListener('click',()=>{ console.log('[slider] next'); scrollByCard(1); });
})();

// Dropdown open/close with debug logs
(function(){
  const dd = document.querySelector('nav .menu .dropdown');
  const ddLink = dd && dd.querySelector('.has-sub');
  console.log('[dropdown] init', {hasDropdown: !!dd, hasLink: !!ddLink});
  if(dd && ddLink){
    ddLink.addEventListener('click', (e)=>{
      e.preventDefault();
      dd.classList.toggle('open');
      console.log('[dropdown] toggle', dd.classList.contains('open'));
    });
    document.addEventListener('click', (e)=>{
      if(!dd.contains(e.target)){
        dd.classList.remove('open');
        console.log('[dropdown] close outside');
      }
    });
  }
})();

// Scroll spy with simple logs
(function(){
  const sections=[...document.querySelectorAll('header, section')];
  const links=[...document.querySelectorAll('nav .menu a')];
  const byId=id=>links.find(a=>a.getAttribute('href')==='#'+id);
  console.log('[scrollspy] start', {sections: sections.length, links: links.length});
  function onScroll(){
    let current='home';
    sections.forEach(sec=>{
      const top=sec.getBoundingClientRect().top;
      if(top<=80){ current=sec.id||current; }
    });
    console.log('[scrollspy] current', current);
    links.forEach(a=>a.classList.remove('active'));
    const active=byId(current);
    if(active){ active.classList.add('active'); }
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
})();

// Cookie consent logic (function only; neutral style)
(function(){
  const KEY='impro_cookie_prefs_v1';
  const bar=document.querySelector('.cookiebar');
  const modal=document.getElementById('cbModal');
  const btnAccept=document.getElementById('cbAcceptBtn');
  const btnOptions=document.getElementById('cbOptionsBtn');
  const btnSave=document.getElementById('cbSave');
  const btnCancel=document.getElementById('cbCancel');
  const chkA=document.getElementById('cbAnalytics');
  const chkM=document.getElementById('cbMarketing');

  function getPrefs(){
    try{return JSON.parse(localStorage.getItem(KEY))||null;}catch(e){return null}
  }
  function setPrefs(p){ localStorage.setItem(KEY, JSON.stringify(p)); }
  function showBar(){ if(bar) bar.style.display='block'; }
  function hideBar(){ if(bar) bar.style.display='none'; }
  function openModal(){ if(modal){ modal.style.display='flex'; modal.setAttribute('aria-hidden','false'); } }
  function closeModal(){ if(modal){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); } }

  const prefs=getPrefs();
  if(!prefs){ showBar(); }

  btnAccept&&btnAccept.addEventListener('click',()=>{
    setPrefs({necessary:true,analytics:true,marketing:true,ts:Date.now()});
    hideBar();
  });

  btnOptions&&btnOptions.addEventListener('click',()=>{
    const p=getPrefs()||{analytics:false,marketing:false};
    if(chkA) chkA.checked=!!p.analytics; if(chkM) chkM.checked=!!p.marketing;
    openModal();
  });

  btnSave&&btnSave.addEventListener('click',()=>{
    setPrefs({necessary:true,analytics:chkA&&chkA.checked,marketing:chkM&&chkM.checked,ts:Date.now()});
    closeModal(); hideBar();
  });
  btnCancel&&btnCancel.addEventListener('click',()=>{ closeModal(); });

  modal&&modal.addEventListener('click',(e)=>{ if(e.target===modal) closeModal(); });
})();


