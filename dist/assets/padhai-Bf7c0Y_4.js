import{n as e,t}from"./script-B8465DUt.js";/* empty css              */import{c as n,d as r,i,m as a,r as o,u as s}from"./admin-firebase-config-BEsY7YdG.js";var c=e((()=>{n(),(()=>{let e=r(o(i,`resources`),a(`category`,`==`,`aktu`));s(e,e=>{let t=e.docs.map(e=>e.data());t.sort((e,t)=>(t.createdAt?.seconds||0)-(e.createdAt?.seconds||0)),document.querySelectorAll(`.subjects-grid.dynamic`).forEach(e=>e.innerHTML=``),t.forEach(e=>{let t=document.getElementById(e.year);if(t){let n=t.querySelector(`.coming-soon`);n&&n.remove();let r=t.querySelector(`.subjects-grid`);r||(r=document.createElement(`div`),r.className=`subjects-grid dynamic`,t.appendChild(r));let i=document.createElement(`div`);i.className=`subject-card`,i.innerHTML=`
                            <div class="sub-icon"><i class="${e.icon||`fas fa-file-pdf`}"></i></div>
                            <div class="sub-info">
                                <h4>${e.title}</h4>
                                <a href="${e.link}" target="_blank" class="btn btn-secondary"
                                    style="padding: 0.3rem 0.8rem; font-size: 0.75rem;">Access PDF</a>
                                
                            </div>
                        `,r.appendChild(i)}})})})()}));t(),c();