import{n as e,t}from"./script-B8465DUt.js";/* empty css                   */import{c as n,g as r,i,p as a,r as o,s}from"./firebase-config-BpXY52D3.js";/* empty css              */import{t as c}from"./nav-auth-CR9bqec-.js";var l=e((()=>{n();async function e(){let e=document.getElementById(`loadingState`),t=document.getElementById(`emptyState`),n=document.getElementById(`placementGrid`);try{let c=a(o(i,`resources`),r(`category`,`==`,`placement`)),l=await s(c);if(e.style.display=`none`,l.empty){t.style.display=`block`;return}let u=l.docs.map(e=>e.data());u.sort((e,t)=>(t.createdAt?.seconds||0)-(e.createdAt?.seconds||0)),n.innerHTML=u.map(e=>`
                <div class="placement-card pop-scale">
                    <div>
                        <h3>${e.title}</h3>
                        <p>${e.description}</p>
                    </div>
                    <a href="${e.driveLink}" target="_blank" rel="noopener noreferrer" class="btn-premium">
                        View / Download <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>
                    </a>
                </div>
            `).join(``),n.style.display=`grid`,document.querySelectorAll(`.placement-card`).forEach(e=>{e.addEventListener(`mousemove`,t=>{let n=e.getBoundingClientRect(),r=t.clientX-n.left,i=t.clientY-n.top;e.style.setProperty(`--mouse-x`,`${r}px`),e.style.setProperty(`--mouse-y`,`${i}px`)})})}catch(t){console.error(`Error fetching placement content:`,t),alert(`Error loading placement content: `+t.message),e.innerHTML=`<i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i> Failed to load content. Please try again later.`}}e()}));t(),c(),l();