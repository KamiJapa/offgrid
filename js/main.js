import {products} from '../data/products.js';

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
document.documentElement.classList.add('js-enabled');
const header=$('#header');
let scrollScheduled=false;
function updateHeader(){header.classList.toggle('scrolled',window.scrollY>20);scrollScheduled=false;}
window.addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateHeader);}},{passive:true});
updateHeader();

// Native modal dialogs provide background inertness, Escape and focus containment.
const openers=new WeakMap();
function openDialog(dialog,opener){openers.set(dialog,opener||document.activeElement);dialog.showModal();document.body.classList.add('dialog-open');}
function closeDialog(dialog){dialog.close();}
$$('dialog').forEach(dialog=>{
  // Explicit wrapping also avoids focus escaping into browser chrome at an edge.
  dialog.addEventListener('keydown',event=>{
    if(event.key!=='Tab')return;
    const controls=$$('a[href],button:not([disabled]),input:not([disabled]),[tabindex="0"]',dialog).filter(el=>el.getClientRects().length);
    const first=controls[0],last=controls.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
  });
  dialog.addEventListener('click',event=>{
    if(event.target.closest('[data-close]')) closeDialog(dialog);
    if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(dialog);}
  });
  dialog.addEventListener('close',()=>{if(!$('dialog[open]'))document.body.classList.remove('dialog-open');openers.get(dialog)?.focus({preventScroll:true});});
});
const menu=$('#mobile-menu'),toggle=$('.menu-toggle');
toggle.addEventListener('click',()=>{openDialog(menu,toggle);toggle.setAttribute('aria-expanded','true');if(window.gsap&&!reduced.matches)gsap.fromTo($$('nav a',menu),{y:25,opacity:0},{y:0,opacity:1,duration:.35,stagger:.05,clearProps:'all'});});
menu.addEventListener('close',()=>toggle.setAttribute('aria-expanded','false'));
$$('nav a',menu).forEach(link=>link.addEventListener('click',event=>{event.preventDefault();const target=$(link.hash);closeDialog(menu);requestAnimationFrame(()=>{history.replaceState(null,'',link.hash);target.scrollIntoView({behavior:reduced.matches?'instant':'smooth'});target.setAttribute('tabindex','-1');target.focus({preventScroll:true});});}));
window.matchMedia('(min-width:768px)').addEventListener('change',event=>{if(event.matches&&menu.open)closeDialog(menu);});

// Product content is pre-rendered by the build, with filtering as an enhancement.
const grid=$('#product-grid');
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  const category=button.dataset.filter;let visible=0;
  $$('[data-filter]').forEach(filter=>filter.setAttribute('aria-pressed',String(filter===button)));
  grid.classList.toggle('filtered',category!=='All');
  $$('.product',grid).forEach(card=>{card.hidden=category!=='All'&&card.dataset.category!==category;if(!card.hidden)visible++;});
  $('#product-count').textContent=`${String(visible).padStart(2,'0')} / 06 PIECES`;
  if(window.gsap&&!reduced.matches){const cards=$$('.product:not([hidden])',grid);gsap.killTweensOf(cards);gsap.fromTo(cards,{opacity:.4,y:10},{opacity:1,y:0,duration:.25,stagger:.03,clearProps:'all'});}
  window.ScrollTrigger?.refresh();
}));
const productDialog=$('#product-dialog');
grid.addEventListener('click',event=>{
  const link=event.target.closest('[data-product]');if(!link)return;
  const product=products.find(p=>p.id===link.dataset.product);if(!product)return;event.preventDefault();
  $('#dialog-product-image').src=`assets/images/${product.image}.webp`;
  $('#dialog-product-image').alt=`${product.name.toLowerCase()} in ${product.colour.toLowerCase()}`;
  $('#dialog-code').textContent=`${product.id} / UNIFORM_001`;
  $('#product-dialog-title').textContent=product.name;
  $('#dialog-price').textContent=`£${product.price} — concept price`;
  $('#dialog-description').textContent=product.description;
  $('#dialog-category').textContent=product.category;
  $('#dialog-colour').textContent=product.colour;
  openDialog(productDialog,link);productDialog.scrollTop=0;
});

const looks=$$('[data-look]'),lightbox=$('#lightbox');let currentLook=0;
function renderLook(){const source=looks[currentLook];const img=$('img',source);$('#lightbox-image').src=source.getAttribute('href');$('#lightbox-image').alt=img.alt;$('#lightbox-caption').textContent=$('figcaption span',source).textContent;$('#look-counter').textContent=`${String(currentLook+1).padStart(2,'0')} / 06`;}
function advanceLook(direction){currentLook=(currentLook+direction+looks.length)%looks.length;renderLook();}
looks.forEach((look,index)=>look.addEventListener('click',event=>{event.preventDefault();currentLook=index;renderLook();openDialog(lightbox,look);}));
$('#previous-look').addEventListener('click',()=>advanceLook(-1));
$('#next-look').addEventListener('click',()=>advanceLook(1));
lightbox.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();advanceLook(event.key==='ArrowRight'?1:-1);}});

// Deliberately no request, storage, analytics or subscription endpoint.
$('#newsletter-form').addEventListener('submit',event=>{event.preventDefault();if(!event.currentTarget.reportValidity())return;$('#newsletter-feedback').textContent='Demo complete. No subscription was created and your email has not been sent or stored.';event.currentTarget.reset();});

function initialiseMotion(){
  if(!window.gsap)return;
  if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
  const mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',()=>{
    gsap.timeline({defaults:{ease:'power2.out'}})
      .from('.hero-eyebrow',{opacity:0,y:8,duration:.3})
      .from('.hero h1>span',{y:35,opacity:0,duration:.65,stagger:.09},.1)
      .from('.hero-image',{scale:1.035,duration:1.1},0)
      .from('.hero-support, .hero-actions',{opacity:0,y:12,duration:.4,stagger:.08},.4)
      .from('.hero-meta, .hero-scroll',{opacity:0,duration:.4},.6);
    if(window.ScrollTrigger)$$('.reveal').forEach(element=>gsap.from(element,{y:28,opacity:.35,duration:.65,scrollTrigger:{trigger:element,start:'top 92%',once:true},clearProps:'all'}));
  });
  window.addEventListener('pagehide',()=>mm.revert(),{once:true});
}
if(document.readyState==='complete')initialiseMotion();else window.addEventListener('load',initialiseMotion,{once:true});
