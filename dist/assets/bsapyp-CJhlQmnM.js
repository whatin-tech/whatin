import{_ as e,c as t,d as n,g as r,i,p as a,r as o}from"./firebase-config-CPLHD94k.js";/* empty css              */e((()=>{t(),(()=>{let e=a(o(i,`resources`),r(`category`,`==`,`bsacollege`));n(e,e=>{let t=e.docs.map(e=>e.data());t.sort((e,t)=>(t.createdAt?.seconds||0)-(e.createdAt?.seconds||0));let n={};t.forEach(e=>{n[e.year]||(n[e.year]={}),n[e.year][e.title]||(n[e.year][e.title]=[]),n[e.year][e.title].push(e)}),[`year1`,`year2`,`year3`,`year4`].forEach(e=>{let t=document.getElementById(e);if(!t)return;if(n[e]){let e=t.querySelector(`.coming-soon`);e&&e.remove()}let r=t.querySelector(`.subjects-grid`);r||(r=document.createElement(`div`),r.className=`subjects-grid dynamic-college`,t.appendChild(r)),r.innerHTML=``;let i=n[e]||{};Object.keys(i).forEach(e=>{let t=i[e],n=document.createElement(`div`);n.className=`subject-card college-special-card`,n.style.display=`block`,n.innerHTML=`
                            <div class="card-header-flex" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <div class="sub-icon-premium" style="width: 50px; height: 50px; background: linear-gradient(135deg, var(--accent-secondary), #a855f7); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);">
                                        <i class="fas fa-graduation-cap"></i>
                                    </div>
                                    <div>
                                        <h4 style="margin: 0; font-size: 1.2rem; color: #fff;">${e}</h4>
                                        <span style="font-size: 0.75rem; color: var(--text-secondary);">${t.length} Papers Available</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="papers-grid-layout" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem;">
                                ${t.map(e=>`
                                    <a href="${e.link}" target="_blank" class="paper-download-btn">
                                       <div class="btn-content">
                                            <i class="fas fa-file-pdf"></i>
                                            <span>${e.paperType||`Resource`}</span>
                                       </div>
                                       <i class="fas fa-chevron-right arrow-icon"></i>
                                    </a>
                                `).join(``)}
                            </div>
                        `,r.appendChild(n)})})},e=>{console.error(`Firestore Error:`,e)})})()}))();