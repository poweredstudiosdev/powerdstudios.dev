document.getElementById('yr').textContent = new Date().getFullYear();

  // Cursor
  const cur = document.getElementById('cur'), cr = document.getElementById('cur-r');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  (function t(){
    cur.style.left=mx+'px'; cur.style.top=my+'px';
    rx+=(mx-rx)*.1; ry+=(my-ry)*.1;
    cr.style.left=rx+'px'; cr.style.top=ry+'px';
    requestAnimationFrame(t);
  })();

  // Nav scroll
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => nav.classList.toggle('solid', scrollY>20), {passive:true});

  // Hamburger
  const nt=document.getElementById('nt'), mob=document.getElementById('mob');
  nt.addEventListener('click', () => {
    const o=mob.classList.toggle('open');
    nt.classList.toggle('open',o);
    nt.setAttribute('aria-expanded',o);
  });
  function cm(){ mob.classList.remove('open'); nt.classList.remove('open'); nt.setAttribute('aria-expanded','false'); }

  // Reveal
  const rvs = document.querySelectorAll('.rv');
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('up'); io.unobserve(e.target); } });
  }, {threshold:.1});
  rvs.forEach(el => io.observe(el));

  // Form
  function sf(){
    const n=document.getElementById('fn').value.trim(),
          e=document.getElementById('fe').value.trim(),
          m=document.getElementById('fm').value.trim(),
          fb=document.getElementById('ffb');
    if(!n||!e||!m){ fb.style.color='#ff6060'; fb.textContent='Please fill in all required fields.'; return; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){ fb.style.color='#ff6060'; fb.textContent='Invalid email address.'; return; }
    const sub=encodeURIComponent('Inquiry — '+n+' via poweredstudios.dev');
    const body=encodeURIComponent('Name: '+n+'\nEmail: '+e+'\n\n'+m);
    window.location.href='mailto:poweredstudios.dev@gmail.com?subject='+sub+'&body='+body;
    fb.style.color='#00c2ff'; fb.textContent='✓ Opening email client…';
  }