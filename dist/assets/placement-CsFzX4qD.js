import{n as e,t}from"./script-B8465DUt.js";/* empty css                   *//* empty css              */import{a as n,l as r,m as i,r as a,u as o,v as s}from"./admin-firebase-config-jejBgzOK.js";var c=e((()=>{o();async function e(){let e=document.getElementById(`loadingState`),t=document.getElementById(`emptyState`),o=document.getElementById(`placementGrid`);try{let c=i(a(n,`resources`),s(`category`,`==`,`placement`)),l=await r(c);if(e.style.display=`none`,l.empty){t.style.display=`block`;return}let u=l.docs.map(e=>e.data());u.sort((e,t)=>(t.createdAt?.seconds||0)-(e.createdAt?.seconds||0)),o.innerHTML=u.map(e=>`
                <div class="placement-card pop-scale">
                    <div>
                        <h3>${e.title}</h3>
                        <p>${e.description}</p>
                    </div>
                    <a href="${e.driveLink}" target="_blank" rel="noopener noreferrer" class="btn-premium">
                        View / Download <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>
                    </a>
                </div>
            `).join(``),o.style.display=`grid`,document.querySelectorAll(`.placement-card`).forEach(e=>{e.addEventListener(`mousemove`,t=>{let n=e.getBoundingClientRect(),r=t.clientX-n.left,i=t.clientY-n.top;e.style.setProperty(`--mouse-x`,`${r}px`),e.style.setProperty(`--mouse-y`,`${i}px`)})})}catch(t){console.error(`Error fetching placement content:`,t),alert(`Error loading placement content: `+t.message),e.innerHTML=`<i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i> Failed to load content. Please try again later.`}}e()}));t(),c();