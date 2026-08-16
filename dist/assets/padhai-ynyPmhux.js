import{n as e,t}from"./script-B8465DUt.js";import{c as n,d as r,g as i,i as a,p as o,r as s}from"./firebase-config-BpXY52D3.js";/* empty css              */import{t as c}from"./nav-auth-CR9bqec-.js";var l=e((()=>{n(),(()=>{let e=o(s(a,`resources`),i(`category`,`==`,`aktu`));r(e,e=>{let t=e.docs.map(e=>e.data());t.sort((e,t)=>(t.createdAt?.seconds||0)-(e.createdAt?.seconds||0)),document.querySelectorAll(`.subjects-grid.dynamic`).forEach(e=>e.innerHTML=``),t.forEach(e=>{let t=document.getElementById(e.year);if(t){let n=t.querySelector(`.coming-soon`);n&&n.remove();let r=t.querySelector(`.subjects-grid`);r||(r=document.createElement(`div`),r.className=`subjects-grid dynamic`,t.appendChild(r));let i=document.createElement(`div`);i.className=`subject-card`,i.innerHTML=`
                            <div class="sub-icon"><i class="${e.icon||`fas fa-file-pdf`}"></i></div>
                            <div class="sub-info">
                                <h4>${e.title}</h4>
                                <a href="${e.link}" target="_blank" class="btn btn-secondary"
                                    style="padding: 0.3rem 0.8rem; font-size: 0.75rem;">Access PDF</a>
                                
                            </div>
                        `,r.appendChild(i)}})})})()}));t(),l(),c();