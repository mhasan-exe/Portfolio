let cfg = JSON.parse(localStorage.getItem("config") || document.body.dataset.config || "{}");
        <p>${p.desc}</p>
      </div>
    `).join('')}
  `;

  // EXPERIENCE
  document.getElementById("experience").innerHTML = `
    <h2>// EXPERIENCE</h2>
    ${(cfg.experience||[]).map(e=>`
      <div>${e.role} @ ${e.org} (${e.year})</div>
    `).join('')}
  `;

  document.getElementById("contact").innerHTML = `
    <h2>// CONTACT</h2>
    <p>GitHub: github.com/mhasan-exe</p>
  `;
}

// PROJECT VIEW TRANSITION
function openProject(i){
  const p = cfg.projects[i];
  const view = document.getElementById("project-view");

  view.innerHTML = `
    <div class='project-full'>
      <h1>${p.name}</h1>
      <p>${p.desc}</p>
      <button onclick='closeProject()'>BACK</button>
    </div>
  `;

  view.style.display = "block";
}

function closeProject(){
  document.getElementById("project-view").style.display = "none";
}

// =========================
// HIDDEN ADMIN MODE
// =========================
let auth = false;
const PASSWORD = "byteadmin";

// open admin: Ctrl + Shift + A
window.addEventListener("keydown", e=>{
  if(e.ctrlKey && e.shiftKey && e.key === "A"){
    const pass = prompt("AUTH REQUIRED");
    if(pass === PASSWORD){
      auth = true;
      openAdmin();
    }
  }
});

function openAdmin(){
  document.getElementById("admin-panel").style.display = "block";
  document.getElementById("editor").value = JSON.stringify(cfg,null,2);
}

function closeAdmin(){
  document.getElementById("admin-panel").style.display = "none";
}

function saveConfig(){
  try {
    cfg = JSON.parse(document.getElementById("editor").value);
    localStorage.setItem("config", JSON.stringify(cfg));
    render();
    alert("UPDATED");
  } catch(e){ alert("INVALID JSON"); }
}
