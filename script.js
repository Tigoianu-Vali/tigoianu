// IMPORTURI FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB51CN3Ck0dnvF1TxH3d6gISyrLv2u5OLY",
  authDomain: "victortigoianuapp.firebaseapp.com",
  projectId: "victortigoianuapp",
  storageBucket: "victortigoianuapp.firebasestorage.app",
  messagingSenderId: "810917431019",
  appId: "1:810917431019:web:d07c8711a24d7898a160ae"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// CONFIG & TRADUCERI
const trans = {
    ro: {
        title: "Victor Tigoianu", active: "Proiecte Active", client: "Date Client",
        pName: "Nume Client", pAddr: "Adresă Șantier", pDate: "Data Începerii:", pEnd: "Data Finalizării:",
        specs: "Detalii Teren & Logistică", l: "L (m)", w: "l (m)", s: "Pantă %",
        mats: "Materiale", photos: "Documentație Foto", area: "Arie:",
        save: "SALVEAZĂ PROIECT", back: "Înapoi", hint: "Atinge pentru poze",
        stNew: "NOU", stWork: "ÎN LUCRU", stDone: "FINALIZAT",
        mdTitle: "Detalii Proiect", mdMat: "Lista Materiale", mdGal: "Galerie Foto", mdNotes: "Note / Extra",
        mdStatus: "Status Lucrare", mdNav: "Navigație",
        phMatName: "Caută sau scrie material...", phMatQty: "Cant.",
        settingsTitle: "Liste", manageMats: "Materiale Existente", manageUnits: "Unități de Măsură",
        phNewMat: "Material nou...", phNewUnit: "Unitate nouă...",
        weather: "Cer Senin", loadingWeather: "Se localizează...",
        days: ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"],
        shortDays: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sam"],
        months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
        lblArea: "Suprafață (mp)", lblPerim: "Perimetru (ml)",
        lblAccess: "Acces Utilaj", lblDigging: "Tip Săpătură",
        accessOpts: ["Nu (Pietonal)", "Mini-Excavator", "Mare (Camion)"],
        diggingOpts: ["Ușoară/Normală", "Grea (Pietriș)", "Moloz/Beton"]
    },
    de: {
        title: "Victor Tigoianu", active: "Aktive Projekte", client: "Kundendaten",
        pName: "Kundenname", pAddr: "Baustellenadresse", pDate: "Startdatum:", pEnd: "Fertigstellungsdatum:",
        specs: "Gelände & Logistik", l: "L (m)", w: "B (m)", s: "Neig. %",
        mats: "Materialien", photos: "Fotodokumentation", area: "Fläche:",
        save: "PROJEKT SPEICHERN", back: "Zurück", hint: "Tippen für Fotos",
        stNew: "NEU", stWork: "IN ARBEIT", stDone: "FERTIG",
        mdTitle: "Projektdetails", mdMat: "Materialliste", mdGal: "Fotogalerie", mdNotes: "Notizen / Extras",
        mdStatus: "Projektstatus", mdNav: "Navigation",
        phMatName: "Suchen oder eingeben...", phMatQty: "Menge",
        settingsTitle: "Listen verwalten", manageMats: "Vorhandene Materialien", manageUnits: "Maßeinheiten",
        phNewMat: "Neues Material...", phNewUnit: "Neue Einheit...",
        weather: "Heiter", loadingWeather: "Standort wird gesucht...",
        days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        lblArea: "Fläche (m²)", lblPerim: "Umfang (lm)",
        lblAccess: "Maschinenzugang", lblDigging: "Grabungstyp",
        accessOpts: ["Nein (Fußgänger)", "Minibagger", "Groß (LKW)"],
        diggingOpts: ["Leicht/Normal", "Schwer (Stein)", "Bauschutt/Beton"]
    }
};

let currentLang = 'ro';
let projects = [];
let tempMaterialList = [];
let tempPhotosBase64 = []; 
let currentProjectIndex = null; 

let activeMaterialsRO = ["Gazon Rulou", "Pavaj", "Borduri", "Nisip", "Pământ vegetal", "Sistem Irigații"];
let activeMaterialsDE = ["Rollrasen", "Pflastersteine", "Randsteine", "Sand", "Mutterboden", "Bewässerung"];
let activeUnitsRO = ["m²", "m³", "ml", "buc", "kg", "palet"];
let activeUnitsDE = ["m²", "m³", "lm", "Stk", "kg", "Palette"];

const weatherIcons = { 0: "fa-sun", 1: "fa-cloud-sun", 2: "fa-cloud-sun", 3: "fa-cloud", 45: "fa-smog", 51: "fa-cloud-rain", 61: "fa-cloud-rain", 95: "fa-bolt" };

function loadRealtimeData() {
    const q = query(collection(db, "projects"), orderBy("startDate", "desc"));
    onSnapshot(q, (snapshot) => {
        projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderDashboard();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadRealtimeData();
    changeLanguage('ro');
    document.getElementById('btn-lang-ro').classList.add('active-lang');
    updateDateTime(); setInterval(updateDateTime, 1000);
    getRealWeather();
    document.getElementById('in-length').addEventListener('input', updateArea);
    document.getElementById('in-width').addEventListener('input', updateArea);
});

// LOGICA COMPRESIE
function compressImage(file, quality=0.6, maxWidth=800) {
    return new Promise(resolve => {
        const reader = new FileReader(); reader.readAsDataURL(file);
        reader.onload = e => {
            const img = new Image(); img.src = e.target.result;
            img.onload = () => {
                const c = document.createElement('canvas');
                let w = img.width, h = img.height;
                if(w > maxWidth) { h *= maxWidth/w; w = maxWidth; }
                c.width = w; c.height = h;
                c.getContext('2d').drawImage(img,0,0,w,h);
                resolve(c.toDataURL('image/jpeg', quality));
            };
        };
    });
}

function renderPhotoPreviews() {
    const g = document.getElementById('photo-previews');
    g.innerHTML = "";
    tempPhotosBase64.forEach((src, i) => {
        g.innerHTML += `
            <div class="photo-preview-item">
                <img src="${src}">
                <button type="button" class="btn-x" onclick="window.deleteTempPhoto(${i})">×</button>
            </div>
        `;
    });
}

document.getElementById('in-photos').addEventListener('change', async e => {
    const files = Array.from(e.target.files);
    for(const f of files){
        try {
            const b64 = await compressImage(f);
            tempPhotosBase64.push(b64);
        } catch(err) { console.error(err); }
    }
    renderPhotoPreviews();
    e.target.value = "";
});

window.deleteTempPhoto = (index) => {
    tempPhotosBase64.splice(index, 1);
    renderPhotoPreviews();
};

window.changeLanguage = (l) => {
    document.getElementById('btn-lang-ro').classList.remove('active-lang');
    document.getElementById('btn-lang-de').classList.remove('active-lang');
    document.getElementById('btn-lang-' + l).classList.add('active-lang');

    currentLang = l; const t = trans[l];
    
    document.getElementById('label-active-projects').innerText=t.active;
    document.getElementById('form-title').innerText = l==='ro'?"Șantier Nou":"Neue Baustelle";
    document.getElementById('label-client-data').innerHTML=`<i class="fas fa-user-circle"></i> ${t.client}`;
    document.getElementById('in-name').placeholder=t.pName;
    document.getElementById('in-address').placeholder=t.pAddr;
    document.getElementById('label-start-date').innerText=t.pDate;
    document.getElementById('label-specs').innerHTML=`<i class="fas fa-drafting-compass"></i> ${t.specs}`;
    document.getElementById('in-length').placeholder=t.l;
    document.getElementById('in-width').placeholder=t.w;
    document.getElementById('in-slope').placeholder=t.s;
    document.getElementById('lbl-area').innerText = t.lblArea;
    document.getElementById('lbl-perim').innerText = t.lblPerim;
    document.getElementById('lbl-access').innerText = t.lblAccess;
    document.getElementById('lbl-digging').innerText = t.lblDigging;
    document.getElementById('label-materials').innerHTML=`<i class="fas fa-boxes"></i> ${t.mats}`;
    document.getElementById('in-mat-name').placeholder=t.phMatName;
    document.getElementById('in-mat-qty').placeholder=t.phMatQty;
    document.getElementById('label-photos').innerHTML=`<i class="fas fa-images"></i> ${t.photos}`;
    document.getElementById('label-upload-hint').innerText=t.hint;
    document.getElementById('label-notes').innerHTML=`<i class="fas fa-sticky-note"></i> ${t.mdNotes}`;
    document.getElementById('btn-save').innerText=t.save;
    document.getElementById('btn-back-text').innerText=t.back;
    document.getElementById('modal-title').innerText=t.mdTitle;
    document.getElementById('settings-title').innerText=t.settingsTitle;
    document.getElementById('lbl-manage-mats').innerText=t.manageMats;
    document.getElementById('new-mat-input').placeholder=t.phNewMat;
    document.getElementById('lbl-manage-units').innerText=t.manageUnits;
    document.getElementById('new-unit-input').placeholder=t.phNewUnit;

    const sAccess = document.getElementById('in-access'); sAccess.innerHTML = "";
    t.accessOpts.forEach(o => { sAccess.innerHTML += `<option value="${o}">${o}</option>` });
    const sDig = document.getElementById('in-digging'); sDig.innerHTML = "";
    t.diggingOpts.forEach(o => { sDig.innerHTML += `<option value="${o}">${o}</option>` });

    updateDatalist(); updateUnitSelect(); renderDashboard(); updateDateTime(); getRealWeather();
};

function updateDatalist() {
    const dl = document.getElementById('dl-materials'); dl.innerHTML="";
    const list = currentLang === 'ro' ? activeMaterialsRO : activeMaterialsDE;
    list.forEach(m => { dl.innerHTML += `<option value="${m}">` });
    const setList = document.getElementById('settings-mat-list'); setList.innerHTML = "";
    list.forEach((m, i) => { setList.innerHTML += `<li>${m} <button onclick="window.delItem('mat',${i})" style="color:red;border:none;background:none"><i class="fas fa-trash"></i></button></li>`; });
}

function updateUnitSelect() {
    const s = document.getElementById('in-mat-unit'); s.innerHTML = "";
    const list = currentLang === 'ro' ? activeUnitsRO : activeUnitsDE;
    list.forEach(u => { const o = document.createElement('option'); o.value = u; o.text = u; s.appendChild(o); });
    const setList = document.getElementById('settings-unit-list'); setList.innerHTML = "";
    list.forEach((u, i) => { setList.innerHTML += `<li>${u} <button onclick="window.delItem('unit',${i})" style="color:red;border:none;background:none"><i class="fas fa-trash"></i></button></li>`; });
}

window.addMaterial = () => {
    const n = document.getElementById('in-mat-name').value; const q = document.getElementById('in-mat-qty').value; const u = document.getElementById('in-mat-unit').value;
    if(n) { tempMaterialList.push({name:n, qty:q, unit:u}); const li = document.createElement('li'); li.innerHTML = `<span>${n}</span> <span>${q} ${u}</span>`; document.getElementById('mat-list').appendChild(li); document.getElementById('in-mat-name').value = ""; }
};

window.addCustomItem = (type) => {
    const id = type === 'material' ? 'new-mat-input' : 'new-unit-input'; const val = document.getElementById(id).value.trim();
    if(val) { if(type === 'material') (currentLang === 'ro' ? activeMaterialsRO : activeMaterialsDE).push(val); else (currentLang === 'ro' ? activeUnitsRO : activeUnitsDE).push(val);
    type === 'material' ? updateDatalist() : updateUnitSelect(); document.getElementById(id).value = ""; }
};

window.delItem = (type, index) => {
    if(confirm("Stergi?")) { if(type === 'mat') (currentLang === 'ro' ? activeMaterialsRO : activeMaterialsDE).splice(index, 1); else (currentLang === 'ro' ? activeUnitsRO : activeUnitsDE).splice(index, 1);
    type === 'mat' ? updateDatalist() : updateUnitSelect(); }
};

function updateArea(){ const l=parseFloat(document.getElementById('in-length').value)||0; const w=parseFloat(document.getElementById('in-width').value)||0; if(l>0 && w>0) document.getElementById('in-area').value = (l*w).toFixed(2); }

window.getLocationForAddress = () => {
    const field = document.getElementById('in-address'); field.placeholder = "Se caută...";
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(pos => { fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`).then(r => r.json()).then(d => { const a = d.address; const s = a.road || ""; const n = a.house_number || ""; const c = a.city || a.town || ""; field.value = `${s} ${n}, ${c}`.trim().replace(/^,/, '').trim(); }); });
};

function getRealWeather() {
    let lat = 45.65, lon = 25.60; const fetchW = (la, lo) => { fetch(`https://api.open-meteo.com/v1/forecast?latitude=${la}&longitude=${lo}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=4`).then(r=>r.json()).then(d => { if(d.current_weather){ document.getElementById('display-temp').innerText = `${Math.round(d.current_weather.temperature)}°C`; const c = d.current_weather.weathercode; document.getElementById('weather-icon-main').className = `fas ${weatherIcons[c]||"fa-cloud"}`; if(d.daily){ const l=document.getElementById('forecast-list'); l.innerHTML=""; for(let i=1; i<=3; i++){ const dt=new Date(d.daily.time[i]); const dn=trans[currentLang].shortDays[dt.getDay()]; const mx=Math.round(d.daily.temperature_2m_max[i]); const mn=Math.round(d.daily.temperature_2m_min[i]); const ic=weatherIcons[d.daily.weathercode[i]]||"fa-cloud"; l.innerHTML+=`<div class="forecast-day"><span class="f-day">${dn}</span><i class="fas ${ic} f-icon"></i><span class="f-temp">${mx}°/${mn}°</span></div>`; } } } }); };
    if(navigator.geolocation) navigator.geolocation.getCurrentPosition(p=>fetchW(p.coords.latitude, p.coords.longitude), ()=>fetchW(lat,lon)); else fetchW(lat,lon);
}

function updateDateTime(){ const n=new Date(); const t=trans[currentLang]; document.getElementById('display-date').innerText=`${t.days[n.getDay()]}, ${n.getDate()} ${t.months[n.getMonth()]}`; document.getElementById('display-time').innerText=n.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}); }

function renderDashboard(){
    const l=document.getElementById('client-list'); const t=trans[currentLang];
    l.innerHTML=projects.map((p,i)=>{
        let c = p.status==='new'?"status-new":p.status==='work'?"status-work":"status-done";
        let stTxt = p.status==='new'?t.stNew : p.status==='work'?t.stWork : t.stDone;
        let stColorClass = p.status==='new'?"txt-new" : p.status==='work'?"txt-work" : "txt-done";
        let dateStr = new Date(p.startDate).toLocaleDateString(currentLang==='ro'?'ro-RO':'de-DE');
        return `<div class="card client-card ${c}" onclick="openModal(${i})"><div class="card-details"><div class="status-text-row"><span class="${stColorClass}">${stTxt}</span></div><h4>${p.name}</h4><p><i class="fas fa-map-marker-alt"></i> ${p.address}</p><div class="card-date"><i class="far fa-calendar-alt"></i> ${dateStr}</div></div><div class="card-actions-container"><button class="btn-delete" onclick="window.deleteProject(${i}, event)"><i class="fas fa-trash"></i></button>${p.status!=='done'?`<button class="btn-finish" onclick="window.toggleStatus(${i}, event)"><i class="fas fa-check"></i></button>`:`<button class="btn-undo" onclick="window.toggleStatus(${i}, event)"><i class="fas fa-undo"></i></button>`}</div></div>`;
    }).join('');
}

function cleanText(str) { if(!str) return ""; return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
window.showView = (id) => { document.querySelectorAll('.view').forEach(v=>v.classList.remove('active')); document.getElementById('view-'+id).classList.add('active'); document.getElementById('fab-add').style.display=id==='dashboard'?'flex':'none'; };
window.openSettingsModal = () => document.getElementById('modal-settings').classList.remove('hidden');
window.closeSettingsModal = () => document.getElementById('modal-settings').classList.add('hidden');
window.closeModal = () => document.getElementById('modal-details').classList.add('hidden');
window.openLightbox = (src) => { document.getElementById('lightbox-img').src = src; document.getElementById('lightbox-view').classList.remove('hidden'); };
window.closeLightbox = () => document.getElementById('lightbox-view').classList.add('hidden');
window.toggleStatus = async (i,e) => { e.stopPropagation(); const p=projects[i]; const r=doc(db,"projects",p.id); const s=p.status==='done'?'new':'done'; const ed=s==='done'?new Date().toISOString().split('T')[0]:null; await updateDoc(r,{status:s,endDate:ed}); };
window.deleteProject = async (index, event) => { event.stopPropagation(); const confirmMsg = currentLang === 'ro' ? "Sigur ștergi acest proiect?" : "Projekt wirklich löschen?"; if(confirm(confirmMsg)) { const p = projects[index]; try { await deleteDoc(doc(db, "projects", p.id)); } catch (e) { alert("Eroare: " + e.message); } } };
window.toggleEndDateField = (e) => { const c=document.getElementById('end-date-container'); if(e.value==='done'){ const d=new Date().toISOString().split('T')[0]; c.innerHTML=`<div class="detail-row"><div class="detail-label">${trans[currentLang].pEnd}</div><input type="date" id="edit-end-date" class="modal-input" value="${d}"></div>`;} else c.innerHTML=''; };

// SAVE FORM
document.getElementById('project-form').addEventListener('submit',async e=>{ e.preventDefault(); try { await addDoc(collection(db,"projects"), { name:document.getElementById('in-name').value, address:document.getElementById('in-address').value, startDate:document.getElementById('in-start-date').value, endDate:null, status:'new', dims:{ l:parseFloat(document.getElementById('in-length').value)||0, w:parseFloat(document.getElementById('in-width').value)||0, s:parseFloat(document.getElementById('in-slope').value)||0, area:parseFloat(document.getElementById('in-area').value)||0, perim:parseFloat(document.getElementById('in-perim').value)||0, access:document.getElementById('in-access').value, digging:document.getElementById('in-digging').value }, materials:[...tempMaterialList], photos:[...tempPhotosBase64], notes:document.getElementById('in-notes').value }); e.target.reset(); tempMaterialList=[]; document.getElementById('mat-list').innerHTML=""; document.getElementById('photo-previews').innerHTML=""; tempPhotosBase64=[]; window.showView('dashboard'); } catch (err) { alert("Eroare la salvare!"); console.error(err); } });

window.saveEditedProject = async () => {
    if (currentProjectIndex === null) return;
    const p = projects[currentProjectIndex];
    const docRef = doc(db, "projects", p.id);
    
    // Colectam noile materiale din input-uri
    const newMats = [];
    document.querySelectorAll('.editable-material-row').forEach(row => {
        newMats.push({
            name: row.querySelector('.mat-name-edit').value,
            qty: row.querySelector('.mat-qty-edit').value,
            unit: row.querySelector('.mat-unit-edit').value
        });
    });

    const data = { 
        status: document.getElementById('edit-status').value, 
        name: document.getElementById('edit-name').value, 
        address: document.getElementById('edit-address').value, 
        startDate: document.getElementById('edit-date').value, 
        dims: { 
            l: parseFloat(document.getElementById('edit-l').value)||0, 
            w: parseFloat(document.getElementById('edit-w').value)||0, 
            s: parseFloat(document.getElementById('edit-s').value)||0, 
            area: parseFloat(document.getElementById('edit-area').value)||0, 
            perim: parseFloat(document.getElementById('edit-perim').value)||0, 
            access: document.getElementById('edit-access').value, 
            digging: document.getElementById('edit-digging').value 
        }, 
        materials: newMats, // Salvam lista actualizata
        notes: document.getElementById('edit-notes').value 
    }; 
    const ed = document.getElementById('edit-end-date'); 
    if (ed) data.endDate = ed.value; else if (data.status !== 'done') data.endDate = null; 
    
    await updateDoc(docRef, data); 
    document.getElementById('modal-details').classList.add('hidden');
};

window.openModal = (index) => {
    currentProjectIndex = index; const p = projects[index]; const t = trans[currentLang];
    const encodedAddr = encodeURIComponent(p.address); const mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddr}`; const wazeLink = `https://waze.com/ul?q=${encodedAddr}&navigate=yes`;
    let endDateHTML = ''; if (p.status === 'done') endDateHTML = `<div class="detail-row"><div class="detail-label">${t.pEnd}</div><input type="date" id="edit-end-date" class="modal-input" value="${p.endDate || ''}"></div>`;
    const genOpts = (opts, sel) => opts.map(o => `<option value="${o}" ${o===sel?'selected':''}>${o}</option>`).join('');
    
    // GENERARE INPUT-URI MATERIALE
    const matHTML = p.materials?.map((m, i) => `
        <li class="editable-material-row">
            <input type="text" class="mat-name-edit" value="${m.name}" placeholder="Nume">
            <div class="mat-qty-group">
                <input type="number" class="mat-qty-edit" value="${m.qty}" placeholder="0">
                <input type="text" class="mat-unit-edit" value="${m.unit}" placeholder="um">
            </div>
            <button class="btn-del-mat" onclick="this.parentElement.remove()">×</button>
        </li>
    `).join('') || '';

    const photoHTML = `<div class="modal-photos-grid">${p.photos?.map(s => `<img src="${s}" onclick="openLightbox('${s}')">`).join('') || ''}</div>`;
    
    document.getElementById('modal-body').innerHTML = `
        <div class="detail-row"><div class="detail-label">${t.mdStatus}</div><select id="edit-status" class="modal-input" onchange="toggleEndDateField(this)"><option value="new" ${p.status==='new'?'selected':''}>${t.stNew}</option><option value="work" ${p.status==='work'?'selected':''}>${t.stWork}</option><option value="done" ${p.status==='done'?'selected':''}>${t.stDone}</option></select></div>
        <div class="detail-row"><div class="detail-label">${t.pName}</div><input type="text" id="edit-name" class="modal-input" value="${p.name}"></div>
        <div class="detail-row"><div class="detail-label">${t.pAddr}</div><input type="text" id="edit-address" class="modal-input" value="${p.address}">
        <div class="nav-buttons-container">
            <a href="${mapsLink}" target="_blank" class="btn-nav btn-maps"><i class="fas fa-map-marked-alt"></i> Maps</a>
            <a href="${wazeLink}" target="_blank" class="btn-nav btn-waze"><i class="fab fa-waze"></i> Waze</a>
        </div></div>
        <div class="detail-row"><div class="detail-label">${t.pDate}</div><input type="date" id="edit-date" class="modal-input" value="${p.startDate}"></div>
        <div id="end-date-container">${endDateHTML}</div>
        <div class="detail-row grid-3"><div><span>${t.l}</span><input id="edit-l" class="modal-input" value="${p.dims.l}"></div><div><span>${t.w}</span><input id="edit-w" class="modal-input" value="${p.dims.w}"></div><div><span>${t.s}</span><input id="edit-s" class="modal-input" value="${p.dims.s}"></div></div>
        <div class="detail-row grid-2"><div><span>${t.lblArea}</span><input id="edit-area" class="modal-input" value="${p.dims.area||0}"></div><div><span>${t.lblPerim}</span><input id="edit-perim" class="modal-input" value="${p.dims.perim||0}"></div></div>
        <div class="detail-row grid-2"><div><span>${t.lblAccess}</span><select id="edit-access" class="modal-input">${genOpts(t.accessOpts, p.dims.access)}</select></div><div><span>${t.lblDigging}</span><select id="edit-digging" class="modal-input">${genOpts(t.diggingOpts, p.dims.digging)}</select></div></div>
        <div class="detail-row"><div class="detail-label">${t.mdNotes}</div><textarea id="edit-notes" class="modal-textarea">${p.notes||''}</textarea></div>
        
        <div class="detail-row">
            <div class="detail-label" style="display:flex;justify-content:space-between;">${t.mdMat}</div>
            <ul id="edit-mat-list" class="styled-list" style="padding:0">${matHTML}</ul>
        </div>
        
        ${photoHTML}`;
    document.getElementById('modal-details').classList.remove('hidden');
};

window.generatePDFForCurrent = () => { if (currentProjectIndex === null) return; const p = projects[currentProjectIndex]; const { jsPDF } = window.jspdf; const doc = new jsPDF(); const pageWidth = doc.internal.pageSize.getWidth(); const pageHeight = doc.internal.pageSize.getHeight(); doc.setFillColor(252, 252, 252); doc.rect(0, 0, pageWidth, 45, "F"); const logoImg = document.getElementById('pdf-logo-source'); if(logoImg && logoImg.src) { try { doc.addImage(logoImg, 'PNG', 15, 5, 70, 0); } catch(e){} } doc.setTextColor(0, 80, 60); doc.setFontSize(16); doc.setFont("helvetica", "bold"); doc.text("FISA PROIECT / PROJEKTBLATT", pageWidth - 15, 30, {align:"right"}); doc.setFontSize(10); doc.setTextColor(150); doc.setFont("helvetica", "normal"); doc.text("CLIENT & LOCATIE", 20, 60); doc.setFontSize(14); doc.setTextColor(0); doc.text(cleanText(p.name), 20, 68); doc.setFontSize(12); doc.text(doc.splitTextToSize(cleanText(p.address), 100), 20, 75); doc.setFontSize(10); doc.setTextColor(150); doc.text("INFO PROIECT", 130, 60); doc.setFontSize(12); doc.setTextColor(0); doc.text(`Start: ${p.startDate}`, 130, 68); if(p.endDate) doc.text(`Final: ${p.endDate}`, 130, 75); else doc.text(`Status: ${cleanText(trans[currentLang].stWork)}`, 130, 75); doc.setDrawColor(220); doc.line(20, 90, 190, 90); doc.setFontSize(14); doc.setTextColor(0, 150, 136); doc.text("DETALII TEREN", 20, 105); doc.setFontSize(12); doc.setTextColor(0); doc.text(`Dim: ${p.dims.l}m x ${p.dims.w}m (${p.dims.s}%)`, 20, 115); const areaVal = p.dims.area ? p.dims.area : (p.dims.l * p.dims.w).toFixed(2); doc.text(`SUPRAFATA: ${areaVal} mp`, 20, 122); doc.text(`PERIMETRU: ${p.dims.perim || 0} ml`, 100, 122); doc.setFontSize(10); doc.setTextColor(150); doc.text("LOGISTICA", 20, 135); doc.setFontSize(11); doc.setTextColor(0); doc.text(`Acces: ${cleanText(p.dims.access || '-')}`, 20, 142); doc.text(`Sapatura: ${cleanText(p.dims.digging || '-')}`, 100, 142); let y = 155; if(p.notes){ doc.setFontSize(14); doc.setTextColor(0, 150, 136); doc.text("NOTE", 20, y); y+=8; doc.setFontSize(11); doc.setTextColor(50); const splitNotes = doc.splitTextToSize(cleanText(p.notes), 170); doc.text(splitNotes, 20, y); y += splitNotes.length * 7 + 10; } doc.setFontSize(14); doc.setTextColor(0, 150, 136); doc.text("MATERIALE", 20, y); doc.setDrawColor(220); doc.line(20, y+3, 190, y+3); y+=15; doc.setFontSize(10); doc.setTextColor(150); doc.text("DENUMIRE", 20, y); doc.text("CANTITATE", 150, y); y+=10; doc.setFontSize(12); doc.setTextColor(0); if(p.materials) p.materials.forEach(m => { doc.text(cleanText(m.name), 20, y); doc.text(`${m.qty} ${cleanText(m.unit)}`, 150, y); y+=10; }); const dGen = new Date().toLocaleString(); doc.setDrawColor(200); doc.line(20, pageHeight - 15, pageWidth-20, pageHeight - 15); doc.setFontSize(9); doc.setTextColor(150); doc.text(`Generat: ${dGen}`, 20, pageHeight - 8); doc.text("Victor Tigoianu App", pageWidth - 20, pageHeight - 8, {align:"right"}); doc.save(`${cleanText(p.name).replace(/\s+/g,'_')}.pdf`); };