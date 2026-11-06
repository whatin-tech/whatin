import{n as e,t}from"./script-B8465DUt.js";/* empty css              */import{a as n,m as r,p as i,r as a,u as o,v as s}from"./admin-firebase-config-qp5uovXZ.js";var c=e((()=>{o();var e=()=>{if(!n){console.error(`Firestore DB instance is not initialized.`);return}let e=r(a(n,`resources`),s(`category`,`==`,`college`));i(e,e=>{let t=e.docs.map(e=>e.data());t.sort((e,t)=>(t.createdAt?.seconds||0)-(e.createdAt?.seconds||0));let n={};t.forEach(e=>{let t=e.year||`year1`,r=e.title||e.subjectName||`General`;n[t]||(n[t]={}),n[t][r]||(n[t][r]=[]),n[t][r].push(e)}),[`year1`,`year2`,`year3`,`year4`].forEach(e=>{let t=document.getElementById(e);if(!t)return;let r=n[e];if(r&&Object.keys(r).length>0){let e=t.querySelector(`.coming-soon`);e&&e.remove();let n=t.querySelector(`.subjects-grid`);n||(n=document.createElement(`div`),n.className=`subjects-grid dynamic-college`,t.appendChild(n)),n.innerHTML=``,Object.keys(r).forEach(e=>{let t=r[e],i=document.createElement(`div`);i.className=`subject-card college-special-card`,i.style.display=`block`,i.innerHTML=`
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
                                        <a href="${e.link||e.driveLink||`#`}" target="_blank" class="paper-download-btn">
                                           <div class="btn-content">
                                                <i class="fas fa-file-pdf"></i>
                                                <span>${e.paperType||`Resource`}</span>
                                           </div>
                                           <i class="fas fa-chevron-right arrow-icon"></i>
                                        </a>
                                    `).join(``)}
                                </div>
                            `,n.appendChild(i)})}})},e=>{console.error(`Firestore Error:`,e)})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,e):e()}));t(),c();