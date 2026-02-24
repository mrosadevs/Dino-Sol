// ─── CANVAS PARTICLES ───
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W, H, pts = [];
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
resize();window.addEventListener('resize',resize);

class Pt{
  constructor(){this.r()}
  r(){
    this.x=Math.random()*W;this.y=H+20;
    this.s=Math.random()*2.5+.8;
    this.vy=-(Math.random()*.5+.15);
    this.vx=(Math.random()-.5)*.25;
    this.life=0;this.max=Math.random()*180+140;
    this.gold=Math.random()>.45;
  }
  u(){this.x+=this.vx;this.y+=this.vy;this.life++;if(this.life>this.max||this.y<-20)this.r()}
  d(){
    const a=Math.sin(this.life/this.max*Math.PI)*(this.gold?.3:.18);
    ctx.save();
    ctx.globalAlpha=a;
    ctx.fillStyle=this.gold?`hsl(38,80%,60%)`:`hsl(28,50%,55%)`;
    ctx.beginPath();ctx.arc(this.x,this.y,this.s,0,Math.PI*2);ctx.fill();
    ctx.restore();
  }
}
for(let i=0;i<70;i++){const p=new Pt();p.life=Math.random()*p.max;pts.push(p)}

function loop(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{p.u();p.d()});requestAnimationFrame(loop)}
loop();

// ─── NAV SCROLL ───
const nav=document.getElementById('mainNav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',scrollY>60);
  // hero parallax
  const svg=document.querySelector('.scene-svg');
  if(svg&&scrollY<innerHeight)svg.style.transform=`translateY(${scrollY*.22}px)`;
},{passive:true});

// ─── 3D CARD TILT ───
const c3d=document.getElementById('card3d');
if(c3d){
  c3d.addEventListener('mousemove',e=>{
    const r=c3d.getBoundingClientRect();
    const dx=(e.clientX-r.left-r.width/2)/(r.width/2);
    const dy=(e.clientY-r.top-r.height/2)/(r.height/2);
    c3d.style.transition='transform .1s ease';
    c3d.style.transform=`rotateY(${dx*14}deg) rotateX(${-dy*9}deg) scale(1.03)`;
  });
  c3d.addEventListener('mouseleave',()=>{
    c3d.style.transition='transform .6s ease';
    c3d.style.transform='rotateY(0) rotateX(0) scale(1)';
  });
}

// ─── INTERSECTION OBSERVER ───
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});
document.querySelectorAll('.reveal,.rm-item,.nft-tile').forEach(el=>obs.observe(el));
document.querySelectorAll('.nft-tile').forEach((el,i)=>el.style.transitionDelay=`${i*.09}s`);
document.querySelectorAll('.rm-item').forEach((el,i)=>el.style.transitionDelay=`${i*.06}s`);

// ─── FAQ ───
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const item=q.parentElement;const was=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!was)item.classList.add('open');
  });
});

// ─── ROADMAP CARD MOUSE GLOW ───
document.querySelectorAll('.rm-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
    card.style.setProperty('--my',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
  });
});

// ─── SMOOTH LINKS ───
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}
  });
});