import{n as e,t}from"./script-B8465DUt.js";/* empty css              */import{c as n,d as r,i,m as a,r as o,u as s}from"./admin-firebase-config-BEsY7YdG.js";var c=e((()=>{n(),document.addEventListener(`DOMContentLoaded`,()=>{let e=document.querySelectorAll(`.year-tab`);e.forEach(t=>{t.addEventListener(`click`,()=>{e.forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),c(t.dataset.year)})});let t=[],n=r(o(i,`resources`),a(`category`,`==`,`notes`));s(n,e=>{t=e.docs.map(e=>({id:e.id,...e.data()}));let n=document.querySelector(`.year-tab.active`);n&&c(n.dataset.year)},e=>{console.error(`Error fetching notes: `,e),document.getElementById(`notesContainerWrapper`).innerHTML=`<p style="text-align:center; color: #ff6b6b;">Error loading notes. Please try again later.</p>`});function c(e){let n=document.getElementById(`notesContainerWrapper`);if(!n)return;let r=t.filter(t=>t.year===e);if(r.length===0){n.innerHTML=`
                <div class="year-section active">
                    <div style="text-align: center; padding: 4rem; opacity: 0.5;">
                        <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-secondary);"></i>
                        <h3>No notes available for this year yet.</h3>
                        <p>Check back later for updates.</p>
                    </div>
                </div>`;return}r.sort((e,t)=>(t.createdAt?.seconds||0)-(e.createdAt?.seconds||0));let i={};r.forEach(e=>{let t=e.subjectName||`Unknown Subject`;i[t]||(i[t]={description:``,pdfs:[]}),e.description&&!i[t].description&&(i[t].description=e.description),i[t].pdfs.push({title:e.pdfTitle,link:e.driveLink,createdAt:e.createdAt?.seconds||0})});let a=`<div class="year-section active"><div class="subjects-grid">`;for(let[e,t]of Object.entries(i)){t.pdfs.sort((e,t)=>e.createdAt-t.createdAt);let n=t.pdfs.map(e=>`
                <a href="${e.link}" target="_blank" class="pdf-link-btn">
                    <div style="display:flex; align-items:center;">
                        <i class="fas fa-file-pdf"></i>
                        <span style="margin-left: 0.5rem;">${e.title}</span>
                    </div>
                    <i class="fas fa-external-link-alt" style="font-size:0.8rem; color:var(--text-secondary); margin:0;"></i>
                </a>
            `).join(``);a+=`
                <div class="subject-card">
                    <div class="subject-header">
                        <div class="sub-icon"><i class="fas fa-book"></i></div>
                        <h4>${e}</h4>
                    </div>
                    <p class="subject-desc">${t.description}</p>
                    <div class="pdf-links-container">
                        ${n}
                    </div>
                </div>
            `}a+=`</div></div>`,n.innerHTML=a}})}));t(),c();