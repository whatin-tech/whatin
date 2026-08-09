import{c as e,f as t,g as n,i as r,p as i,r as a,s as o}from"./firebase-config-Dhjpa17D.js";/* empty css                   */import{t as s}from"./nav-auth-cgdUL366.js";var c=n((()=>{e(),document.addEventListener(`DOMContentLoaded`,async()=>{let e=document.getElementById(`loadingState`),n=document.getElementById(`emptyState`),s=document.getElementById(`placementGrid`);try{let c=i(a(r,`placementBoxes`),t(`order`)),l=await o(c);if(e.style.display=`none`,l.empty){n.style.display=`block`;return}s.innerHTML=l.docs.map(e=>{let t=e.data();return`
                <div class="placement-card pop-scale">
                    <div>
                        <h3>${t.title}</h3>
                        <p>${t.description}</p>
                    </div>
                    <a href="${t.driveLink}" target="_blank" rel="noopener noreferrer" class="btn-premium">
                        View / Download <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>
                    </a>
                </div>
            `}).join(``),s.style.display=`grid`}catch(t){console.error(`Error fetching placement content:`,t),e.innerHTML=`<i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i> Failed to load content. Please try again later.`}})}));s(),c();