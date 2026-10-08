// Visualizador 3D do layout da NAND3 CMOS: camadas, canais e corrente.
// IIFE porque o script roda em uma pagina de post junto com outros scripts.
(function () {
const wrap=document.getElementById('n3-wrap'),lbl=document.getElementById('n3-lbl');
const W=()=>wrap.clientWidth,H=500;
const r=new THREE.WebGLRenderer({antialias:true,alpha:true});r.setPixelRatio(devicePixelRatio);r.setSize(W(),H);wrap.insertBefore(r.domElement,lbl);
const sc=new THREE.Scene();const cam=new THREE.PerspectiveCamera(40,W()/H,0.1,500);
const ctl=new THREE.OrbitControls(cam,r.domElement);ctl.enableDamping=true;
sc.add(new THREE.AmbientLight(0xffffff,0.65));const dl=new THREE.DirectionalLight(0xffffff,0.6);dl.position.set(20,40,30);sc.add(dl);
const M=(c,o)=>new THREE.MeshLambertMaterial({color:c,transparent:o<1,opacity:o,depthWrite:o>=0.5});
const L={sub:[],well:[],diff:[],ch:[],gox:[],poly:[],cont:[],metal:[],sdg:[],cur:[]};
const lvl={sub:0,well:0,diff:0,ch:0,gox:1,poly:2,metal:3};
function box(k,x0,x1,y0,y1,h0,h1,m,ec,eo){const g=new THREE.BoxGeometry(x1-x0,h1-h0,y1-y0);const me=new THREE.Mesh(g,m);me.position.set((x0+x1)/2-16,(h0+h1)/2,(y0+y1)/2-20);me.userData={h0,h1};sc.add(me);const e=new THREE.LineSegments(new THREE.EdgesGeometry(g),new THREE.LineBasicMaterial({color:ec||0x444441,transparent:true,opacity:eo||0.35}));me.add(e);L[k].push(me);return me}
box('sub',-4,36,-6,42,-5,-0.01,M(0x888780,0.55));
box('well',-2,34,-4,20,-3.2,0,M(0xAFA9EC,0.7));
const pd=M(0xEF9F27,1),nd=M(0x97C459,1);
[[2,7],[9,15],[17,23],[25,30]].forEach(a=>box('diff',a[0],a[1],9,14,-0.9,0.02,pd));
[[2,7],[9,12],[14,17],[19,24]].forEach(a=>box('diff',a[0],a[1],27,31,-0.9,0.02,nd));
const chans=[];const pg=[7,15,23],ng=[7,12,17];
pg.forEach((x,i)=>{const m=new THREE.MeshBasicMaterial({color:0xD4537E,transparent:true,opacity:0.9});chans.push({m:box('ch',x,x+2,9,14,-0.35,0.04,m,0x72243E,1),t:'p',i})});
ng.forEach((x,i)=>{const m=new THREE.MeshBasicMaterial({color:0xD4537E,transparent:true,opacity:0.9});chans.push({m:box('ch',x,x+2,27,31,-0.35,0.04,m,0x72243E,1),t:'n',i})});
const gm=M(0x5DCAA5,1);pg.forEach(x=>box('gox',x,x+2,9,14,0.04,0.3,gm));ng.forEach(x=>box('gox',x,x+2,27,31,0.04,0.3,gm));
const pm=M(0xE24B4A,0.85);
[[7,9,6,33],[15,17,6,19],[12,17,17,19],[12,14,17,33],[23,25,6,25],[17,25,23,25],[17,19,23,33]].forEach(a=>box('poly',a[0],a[1],a[2],a[3],0.3,1.1,pm));
const cm=M(0x2C2C2A,1);
[[4,11.5],[11.5,11.5],[19.5,11.5],[27.5,11.5],[4,29],[22.5,29]].forEach(c=>box('cont',c[0]-1.25,c[0]+1.25,c[1]-1.25,c[1]+1.25,0.02,3,cm));
const mm=M(0x378ADD,0.55);
[[0,32,0,4],[2,6,4,14],[17.5,21.5,4,14],[9.5,13.5,9.5,22],[13.5,25.5,18,22],[25.5,29.5,9.5,22],[20.5,24.5,22,31],[0,32,36,40],[2,6,27,36]].forEach(a=>box('metal',a[0],a[1],a[2],a[3],3,3.8,mm));
const LB=[];
function lab(t,x,y,k,h,st,k2){const s=document.createElement('div');s.textContent=t;s.style.cssText='position:absolute;transform:translate(-50%,-50%);white-space:nowrap;padding:1px 6px;border-radius:6px;border:0.5px solid var(--border);'+(st||'color:var(--text-primary);background:var(--surface-2)');lbl.appendChild(s);const o={s,x:x-16,z:y-20,k,h,k2};LB.push(o);return o}
const gl={A:lab('A',8,4.5,'poly',1.1),B:lab('B',16,4.5,'poly',1.1),C:lab('C',24,4.5,'poly',1.1)};
lab('VDD',26,2,'metal',3.8);lab('GND',26,38,'metal',3.8);lab('Y',31.5,20,'metal',3.8);
const sd='color:#3C3489;background:#EEEDFE',gs='color:#791F1F;background:#FCEBEB';
lab('S',4.5,11.5,'sdg',0.1,sd,'diff');lab('D',12,11.5,'sdg',0.1,sd,'diff');lab('S',20,11.5,'sdg',0.1,sd,'diff');lab('D',27.5,11.5,'sdg',0.1,sd,'diff');
lab('S',4.5,29,'sdg',0.1,sd,'diff');lab('D | S',10.5,29,'sdg',0.1,sd,'diff');lab('D | S',15.5,29,'sdg',0.1,sd,'diff');lab('D',21.5,29,'sdg',0.1,sd,'diff');
['Ā','B̄','C̄'].forEach((t,i)=>lab('G: '+t,pg[i]+1,15.5,'sdg',1.1,gs,'poly'));
['A','B','C'].forEach((t,i)=>lab('G: '+t,ng[i]+1,25.5,'sdg',1.1,gs,'poly'));
let ex=0.6;const off=k=>(lvl[k]||0)*ex*2.2;
const pmat=new THREE.MeshBasicMaterial({color:0xD85A30,depthTest:false,transparent:true});
const nmat=new THREE.MeshBasicMaterial({color:0x185FA5,depthTest:false,transparent:true});
const sg=new THREE.SphereGeometry(0.42,12,12);
const N=14,flows=[];
for(let f=0;f<4;f++){const arr=[];for(let i=0;i<N;i++){const s=new THREE.Mesh(sg,f<3?pmat:nmat);s.renderOrder=10;sc.add(s);L.cur.push(s);arr.push(s)}flows.push({arr,pts:null})}
const inp={A:1,B:0,C:1};
const vis={};
function paths(){const m=3.4+off('metal'),d=-0.15;const P=[];
const pS=[4,19.5,19.5],pD=[11.5,11.5,27.5];
chans.filter(c=>c.t=='p').forEach(c=>{flows[c.i].pts=c.on?[[pS[c.i],2,m],[pS[c.i],11.5,m],[pS[c.i],11.5,d],[pD[c.i],11.5,d],[pD[c.i],11.5,m],[pD[c.i],20,m],[31,20,m]]:null});
const nAll=chans.filter(c=>c.t=='n').every(c=>c.on);
flows[3].pts=nAll?[[31,20,m],[22.5,20,m],[22.5,29,m],[22.5,29,d],[4,29,d],[4,29,m],[4,38,m]]:null;}
function logic(){const k=['A','B','C'];k.forEach(n=>{document.getElementById('n3-b'+n).textContent=n+' = '+inp[n];gl[n].s.textContent=n+' = '+inp[n]});
chans.forEach(c=>{const v=inp[k[c.i]];c.on=c.t=='n'?v==1:v==0});
const pon=chans.filter(c=>c.t=='p'&&c.on).map(c=>'P'+(c.i+1)),nAll=chans.filter(c=>c.t=='n').every(c=>c.on);
document.getElementById('n3-out').textContent='Y = '+(nAll?0:1);
const dir={P1:'P1 (esquerda → direita)',P2:'P2 (direita → esquerda)',P3:'P3 (esquerda → direita)'};
document.getElementById('n3-path').textContent=nAll?'Corrente sai do Y, desce pelo contato da direita e atravessa N3 → N2 → N1 da direita para a esquerda, até o GND.':'Corrente sai do VDD, desce pela fonte, cruza o canal e sobe pelo dreno até o Y: '+pon.map(p=>dir[p]).join(', ')+'.';
chans.forEach(h=>h.m.visible=vis.ch!==false&&h.on);}
['A','B','C'].forEach(n=>document.getElementById('n3-b'+n).onclick=()=>{inp[n]^=1;logic()});
function upd(){for(const k in L){if(k=='cur'||k=='sdg')continue;L[k].forEach(m=>{if(k=='cont'){const a=0.02+off('diff'),b=3+off('metal');m.scale.y=(b-a)/2.98;m.position.y=(a+b)/2}else m.position.y=(m.userData.h0+m.userData.h1)/2+off(k)})}}
document.getElementById('n3-ex').oninput=e=>{ex=+e.target.value;upd()};
document.querySelectorAll('#n3-vis [data-l]').forEach(c=>{const f=()=>{vis[c.dataset.l]=c.checked;if(c.dataset.l!='cur')L[c.dataset.l].forEach(m=>m.visible=c.checked);if(c.dataset.l=='ch')chans.forEach(h=>h.m.visible=c.checked&&h.on)};f();c.onchange=f});
function view(t){if(t){cam.position.set(0,75,0.01)}else{cam.position.set(-34,38,46)}ctl.target.set(0,0,0);ctl.update()}
document.getElementById('n3-top').onclick=()=>view(1);document.getElementById('n3-iso').onclick=()=>view(0);view(0);logic();upd();
function along(pts,u){const seg=[];let tot=0;for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i];const l=Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2]);seg.push(l);tot+=l}
let s=u*tot;for(let i=0;i<seg.length;i++){if(s<=seg[i]||i==seg.length-1){const a=pts[i],b=pts[i+1],f=Math.min(1,s/seg[i]);return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f]}s-=seg[i]}}
const v=new THREE.Vector3();
(function loop(t){requestAnimationFrame(loop);t=t||0;ctl.update();paths();
const pu=0.55+0.4*Math.sin(t/250);chans.forEach(c=>c.m.material.opacity=pu);
flows.forEach(fl=>fl.arr.forEach((s,i)=>{if(!fl.pts||vis.cur===false){s.visible=false;return}s.visible=true;const u=((t/5000)+i/N)%1;const p=along(fl.pts,u);s.position.set(p[0]-16,p[2],p[1]-20)}));
r.render(sc,cam);
LB.forEach(l=>{const y=l.h+off(l.k2||l.k)+0.8;v.set(l.x,y,l.z).project(cam);l.s.style.left=((v.x+1)/2*W())+'px';l.s.style.top=((1-v.y)/2*H)+'px';l.s.style.display=(v.z<1&&vis[l.k]!==false)?'block':'none'})})();
addEventListener('resize',()=>{cam.aspect=W()/H;cam.updateProjectionMatrix();r.setSize(W(),H)});
})();
