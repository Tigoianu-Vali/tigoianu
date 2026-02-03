// Victor Tigoianu Management - Main Application Script

// ==================== STATE & STORAGE ====================
let state = {
    projects: [],
    currentProject: null,
    lang: 'RO',
    theme: 'dark',
    editingPhotos: [],
    editingMaterials: [],
    materialsLibrary: [],
    customUnits: ['buc', 'ml', 'mp', 'mc', 'kg', 'tone', 'sac', 'balot']
};

// Load from LocalStorage
if (localStorage.getItem('victorProjects')) {
    try { state.projects = JSON.parse(localStorage.getItem('victorProjects')) } catch(e) { state.projects = [] }
}
if (localStorage.getItem('victorLang')) state.lang = localStorage.getItem('victorLang');
if (localStorage.getItem('victorTheme')) state.theme = localStorage.getItem('victorTheme');
if (localStorage.getItem('victorMaterialsLibrary')) {
    try { state.materialsLibrary = JSON.parse(localStorage.getItem('victorMaterialsLibrary')) } catch(e) {}
} else {
    // Default materials with units
    state.materialsLibrary = [
        { name: 'Piatra', unit: 'tone' },
        { name: 'Nisip', unit: 'tone' },
        { name: 'Ciment', unit: 'sac' },
        { name: 'Beton', unit: 'mc' },
        { name: 'Balastru', unit: 'tone' },
        { name: 'Pamant', unit: 'mc' },
        { name: 'Gravel', unit: 'tone' },
        { name: 'BCA', unit: 'buc' },
        { name: 'Caramida', unit: 'buc' },
        { name: 'Plasa', unit: 'mp' }
    ];
}
if (localStorage.getItem('victorUnits')) {
    try { state.customUnits = JSON.parse(localStorage.getItem('victorUnits')) } catch(e) {}
}

// ==================== TRANSLATIONS ====================
const translations = {
    RO: {
        // UI
        "subtitle": "Management",
        "search_placeholder": "Cauta...",
        "filters": ["Toate", "Noi", "In Lucru", "Finalizate"],
        "active_projects": "Proiecte Active",
        "add_new": "Proiect Nou",
        "client_details": "Detalii Client",
        "call": "Suna",
        "message": "Mesaj",
        "waze": "Waze",
        "maps": "Maps",
        "status_work": "Status Lucrare",
        "status_new": "Nou",
        "status_work_btn": "In Lucru",
        "status_done": "Finalizat",
        "terrain_details": "Detalii Teren",
        "materials": "Materiale",
        "photos": "Fotografii",
        "notes": "Note",
        "delete_project": "Sterge Proiectul",
        "edit_project": "Editeaza",
        "save": "Salveaza",
        "cancel": "Anuleaza",
        "client": "Client",
        "address": "Adresa",
        "project_name": "Denumire proiect",
        "add_photo": "Adauga foto",
        "loading": "Se incarca...",
        "delete_material": "Sterge",
        "save_materials": "Salveaza Materialele",
        "units_manager": "Unitati de Masura",
        "add_unit": "Adauga Unitate",
        "save_units": "Salveaza",
        "materials_library": "Biblioteca de Materiale",
        "add_material": "Adauga Material",
        "new_project": "Proiect Nou",
        "gps_status": "Obtinere coordonate GPS...",
        "gps_success": "Adresa obtinuta!",
        "gps_error": "Nu s-a putut obtine adresa",
        "photo_count": "0",
        "create": "Creeaza",
        "fill_all": "Completeaza toate datele",
        "no_materials": "Nu exista materiale",
        "no_photos": "Nu exista fotografii",
        "library": "Biblioteca",
        "add": "Adauga",
        "edit": "Editeaza",
        "close": "Inchide",
        "paid": "PLATIT",
        
        // Terrain
        "lungime": "Lungime",
        "latime": "Latime",
        "panta": "Panta",
        "suprafata": "Suprafata",
        "perimeter": "Perimetru",
        "inaltime": "Inaltime",
        "volume": "Volum",
        "access": "Acces Utilaje",
        "digging": "Tip Sapatura",
        "terrain_type": "Tip Teren",
        "vegetation": "Vegetatie",
        
        // Units
        "m": "m",
        "mp": "mp",
        "ml": "ml",
        "mc": "mc",
        "buc": "buc",
        "kg": "kg",
        "tone": "tone",
        "percent": "%",
        
        // Terrain values
        "acces_usor": "Acces usor",
        "acces_mediu": "Acces mediu",
        "acces_dificil": "Acces dificil",
        "manuala": "Manuala",
        "mecanizata": "Mecanizata",
        "mixta": "Mixta",
        "plana": "Plana",
        "inclinata": "Inclinata",
        "abupta": "Abupta",
        "fara": "Fara",
        "iarba": "Iarba",
        "buruieni": "Buruieni",
        "arbori": "Arbori",
        "tufe": "Tufe",
        
        // Weather
        "senin": "Senin",
        "partial_noros": "Partial noros",
        "innorat": "Innorat",
        "acoperit": "Acoperit",
        "ceata": "Ceata",
        "ploaie": "Ploaie",
        "ninsoare": "Ninsoare",
        "aversi": "Aversi",
        "furtuna": "Furtuna",
        "maine": "Maine",
        "offline": "Offline",
        "localizare": "Localizare...",
        "no_projects": "Nu exista proiecte active."
    },
    DE: {
        // UI
        "subtitle": "Management",
        "search_placeholder": "Suchen...",
        "filters": ["Alle", "Neu", "In Arbeit", "Abgeschlossen"],
        "active_projects": "Aktive Projekte",
        "add_new": "Neues Projekt",
        "client_details": "Kundendetails",
        "call": "Anrufen",
        "message": "Nachricht",
        "waze": "Waze",
        "maps": "Maps",
        "status_work": "Arbeitsstatus",
        "status_new": "Neu",
        "status_work_btn": "In Arbeit",
        "status_done": "Abgeschlossen",
        "terrain_details": "Geländedetails",
        "materials": "Materialien",
        "photos": "Fotos",
        "notes": "Notizen",
        "delete_project": "Projekt löschen",
        "edit_project": "Bearbeiten",
        "save": "Speichern",
        "cancel": "Abbrechen",
        "client": "Kunde",
        "address": "Adresse",
        "project_name": "Projektname",
        "add_photo": "Foto hinzufügen",
        "loading": "Lädt...",
        "delete_material": "Löschen",
        "save_materials": "Materialien speichern",
        "units_manager": "Maßeinheiten",
        "add_unit": "Einheit hinzufügen",
        "save_units": "Speichern",
        "materials_library": "Materialbibliothek",
        "add_material": "Material hinzufügen",
        "new_project": "Neues Projekt",
        "gps_status": "GPS-Koordinaten werden abgerufen...",
        "gps_success": "Adresse erhalten!",
        "gps_error": "Adresse konnte nicht abgerufen werden",
        "photo_count": "0",
        "create": "Erstellen",
        "fill_all": "Alle Daten ausfüllen",
        "no_materials": "Keine Materialien",
        "no_photos": "Keine Fotos",
        "library": "Bibliothek",
        "add": "Hinzufügen",
        "edit": "Bearbeiten",
        "close": "Schließen",
        "paid": "BEZAHLT",
        
        // Terrain
        "lungime": "Länge",
        "latime": "Breite",
        "panta": "Gefälle",
        "suprafata": "Fläche",
        "perimeter": "Umfang",
        "inaltime": "Höhe",
        "volume": "Volumen",
        "access": "Maschinenzugang",
        "digging": "Grabtyp",
        "terrain_type": "Geländeart",
        "vegetation": "Vegetation",
        
        // Units
        "m": "m",
        "mp": "m²",
        "ml": "m",
        "mc": "m³",
        "buc": "Stk",
        "kg": "kg",
        "tone": "t",
        "percent": "%",
        
        // Terrain values
        "acces_usor": "Einfacher Zugang",
        "acces_mediu": "Mittlerer Zugang",
        "acces_dificil": "Schwieriger Zugang",
        "manuala": "Manuell",
        "mecanizata": "Mechanisiert",
        "mixta": "Gemischt",
        "plana": "Eben",
        "inclinata": "Geneigt",
        "abupta": "Steil",
        "fara": "Keine",
        "iarba": "Gras",
        "buruieni": "Unkraut",
        "arbori": "Bäume",
        "tufe": "Büsche",
        
        // Weather
        "senin": "Klar",
        "partial_noros": "Teils wolkig",
        "innorat": "Bewölkt",
        "acoperit": "Bedeckt",
        "ceata": "Nebel",
        "ploaie": "Regen",
        "ninsoare": "Schnee",
        "aversi": "Schauer",
        "furtuna": "Gewitter",
        "maine": "Morgen",
        "offline": "Offline",
        "localizare": "Lokalisierung...",
        "no_projects": "Keine aktiven Projekte."
    }
};

const terrainIcons = {
    lungime: { icon: "straighten", color: "text-orange-500" },
    latime: { icon: "width", color: "text-orange-500" },
    panta: { icon: "signal_cellular_alt", color: "text-orange-500" },
    suprafata: { icon: "square", color: "text-green-500" },
    perimeter: { icon: "pentagon", color: "text-orange-500" },
    inaltime: { icon: "height", color: "text-orange-500" },
    machinery: { icon: "agriculture", color: "text-orange-500" },
    digging: { icon: "content_cut", color: "text-orange-500" },
    terrain_type: { icon: "terrain", color: "text-orange-500" },
    vegetation: { icon: "forest", color: "text-orange-500" }
};

// ==================== UTILS ====================
function t(key) {
    const dict = translations[state.lang];
    return dict ? dict[key] || key : key;
}

function tValue(key) {
    const val = key || '';
    const mapRO = {
        'Acces usor': 'acces_usor', 'Acces mediu': 'acces_mediu', 'Acces dificil': 'acces_dificil',
        'Manuala': 'manuala', 'Mecanizata': 'mecanizata', 'Mixta': 'mixta',
        'Plana': 'plana', 'Inclinata': 'inclinata', 'Abupta': 'abupta',
        'Fara': 'fara', 'Iarba': 'iarba', 'Buruieni': 'buruieni', 'Arbori': 'arbori', 'Tufe': 'tufe'
    };
    const mapDE = {
        'Einfacher Zugang': 'acces_usor', 'Mittlerer Zugang': 'acces_mediu', 'Schwieriger Zugang': 'acces_dificil',
        'Manuell': 'manuala', 'Mechanisiert': 'mecanizata', 'Gemischt': 'mixta',
        'Eben': 'plana', 'Geneigt': 'inclinata', 'Steil': 'abupta',
        'Keine': 'fara', 'Gras': 'iarba', 'Unkraut': 'buruieni', 'Bäume': 'arbori', 'Büsche': 'tufe'
    };
    
    const map = state.lang === 'RO' ? mapRO : mapDE;
    const translatedKey = map[val] || val;
    return t(translatedKey);
}

function tUnit(key) {
    return t(key || 'm');
}

function saveProjects() {
    localStorage.setItem('victorProjects', JSON.stringify(state.projects));
}

function saveMaterialsLibrary() {
    localStorage.setItem('victorMaterialsLibrary', JSON.stringify(state.materialsLibrary));
}

function saveUnits() {
    localStorage.setItem('victorUnits', JSON.stringify(state.customUnits));
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatCurrency(val) {
    return Number(val || 0).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}

function truncateAddress(addr) {
    if (!addr) return '';
    return addr.length > 30 ? addr.substring(0, 30) + '...' : addr;
}

function getInitials(name) {
    if (!name) return 'VI';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

const avatarColors = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-yellow-500 to-yellow-600',
    'from-indigo-500 to-indigo-600',
    'from-teal-500 to-teal-600',
    'from-cyan-500 to-cyan-600'
];

function getRandomAvatarColor(name) {
    if (!name) return avatarColors[0];
    // Use name to generate consistent color
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarColors[Math.abs(hash) % avatarColors.length];
}

function formatTimeAgo(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now - d;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    
    if (state.lang === 'RO') {
        if (mins < 1) return 'Acum cateva secunde';
        if (mins < 60) return `Acum ${mins} min`;
        if (hours < 24) return `Acum ${hours} ore`;
        if (days < 7) return `Acum ${days} zile`;
        if (weeks < 4) return `Acum ${weeks} saptamani`;
        return `Acum ${months} luni`;
    } else {
        if (mins < 1) return 'Vor ein paar Sekunden';
        if (mins < 60) return `Vor ${mins} Min`;
        if (hours < 24) return `Vor ${hours} Std`;
        if (days < 7) return `Vor ${days} Tagen`;
        if (weeks < 4) return `Vor ${weeks} Wochen`;
        return `Vor ${months} Monaten`;
    }
}

function formatDateFull(date) {
    if (!date) return '-';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

// ==================== UI CONTROLS ====================
function initUI() {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
    document.getElementById('lang-btn').textContent = state.lang;
    
    // Get GPS location on init
    getUserLocation();
    
    renderProjects();
    renderWeather();
    applyTranslations();
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('victorTheme', state.theme);
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
}

function toggleLanguage() {
    state.lang = state.lang === 'RO' ? 'DE' : 'RO';
    localStorage.setItem('victorLang', state.lang);
    const btn = document.getElementById('lang-btn');
    btn.textContent = state.lang;
    
    // Add animation class
    btn.classList.add('changed');
    setTimeout(() => btn.classList.remove('changed'), 500);
    
    renderProjects();
    renderWeather();
    applyTranslations();
}

function applyTranslations() {
    document.getElementById('weather-desc').textContent = t('loading');
    document.getElementById('weather-location').textContent = t('localizare');
    document.getElementById('weather-forecast').innerHTML = '';
    document.getElementById('detail-title').textContent = t('client_details');
    
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns[0].textContent = t('filters')[0];
    filterBtns[1].textContent = t('filters')[1];
    filterBtns[2].textContent = t('filters')[2];
    filterBtns[3].textContent = t('filters')[3];
    
    // Section headers
    const sections = document.querySelectorAll('#details-page h2');
    if (sections[0]) sections[0].textContent = t('client_details');
    if (sections[1]) sections[1].textContent = t('status_work');
    if (sections[2]) sections[2].textContent = t('terrain_details');
    if (sections[3]) sections[3].textContent = t('materials');
    if (sections[4]) sections[4].textContent = t('photos');
    if (sections[5]) sections[5].textContent = t('notes');
    
    // Status buttons
    const statusBtns = document.querySelectorAll('#status-new, #status-work, #status-done');
    if (statusBtns[0]) statusBtns[0].querySelector('span:last-child').textContent = t('status_new');
    if (statusBtns[1]) statusBtns[1].querySelector('span:last-child').textContent = t('status_work_btn');
    if (statusBtns[2]) statusBtns[2].querySelector('span:last-child').textContent = t('status_done');
    
    // No materials / no photos
    const noMaterials = document.querySelector('#materials-list li');
    if (noMaterials && (noMaterials.textContent.includes('Nu exista') || noMaterials?.textContent.includes('Keine'))) {
        noMaterials.textContent = t('no_materials');
    }
    
    renderProjects();
}

function showDashboard() {
    document.getElementById('dashboard-page').classList.remove('hidden');
    document.getElementById('details-page').classList.add('hidden');
    document.getElementById('edit-page').classList.add('hidden');
    document.getElementById('lightbox-container').innerHTML = '';
    state.currentProject = null;
}

function showDetails(project) {
    state.currentProject = project;
    document.getElementById('dashboard-page').classList.add('hidden');
    document.getElementById('details-page').classList.remove('hidden');
    document.getElementById('edit-page').classList.add('hidden');
    
    renderDetailsPage(project);
}

function showEditPage() {
    if (!state.currentProject) return;
    document.getElementById('dashboard-page').classList.add('hidden');
    document.getElementById('details-page').classList.add('hidden');
    document.getElementById('edit-page').classList.remove('hidden');
    renderEditPage(state.currentProject);
}

// ==================== GPS LOCATION ====================
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                localStorage.setItem('weatherLoc', `${pos.coords.latitude},${pos.coords.longitude}`);
                localStorage.setItem('userLat', pos.coords.latitude);
                localStorage.setItem('userLon', pos.coords.longitude);
                renderWeather();
            },
            () => {
                localStorage.setItem('weatherLoc', '44.4268,26.1025');
                renderWeather();
            }
        );
    } else {
        renderWeather();
    }
}

function getGpsAddress() {
    const statusEl = document.getElementById('gps-status');
    statusEl.textContent = t('gps_status');
    
    if (!navigator.geolocation) {
        statusEl.textContent = t('gps_error');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
            const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await resp.json();
            // Extract only street and city (locality)
            const addressParts = data.address;
            let shortAddress = '';
            if (addressParts.road) shortAddress += addressParts.road;
            if (addressParts.house_number && shortAddress) shortAddress += ' ' + addressParts.house_number;
            if (addressParts.city) {
                if (shortAddress) shortAddress += ', ';
                shortAddress += addressParts.city;
            } else if (addressParts.town) {
                if (shortAddress) shortAddress += ', ';
                shortAddress += addressParts.town;
            } else if (addressParts.village) {
                if (shortAddress) shortAddress += ', ';
                shortAddress += addressParts.village;
            }
            document.getElementById('edit-address').value = shortAddress || data.display_name || '';
            statusEl.textContent = t('gps_success');
        } catch {
            statusEl.textContent = t('gps_error');
        }
    }, () => {
        statusEl.textContent = t('gps_error');
    });
}

// ==================== PROJECTS LIST ====================
let currentFilter = 'all';

function setFilter(status) {
    currentFilter = status;
    document.querySelectorAll('.filter-btn').forEach((btn, i) => {
        const isActive = (status === 'all' && i === 0) || 
                         (status === 'new' && i === 1) ||
                         (status === 'work' && i === 2) ||
                         (status === 'done' && i === 3);
        btn.className = `filter-btn px-4 py-2 rounded-full text-sm font-bold ${isActive ? 'bg-green-500 text-white' : 'bg-green-900/50 text-green-300'} whitespace-nowrap`;
    });
    renderProjects();
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    const search = document.getElementById('search-input').value.toLowerCase();
    
    // Filter and search (client name priority)
    let filtered = state.projects.filter(p => {
        if (currentFilter !== 'all' && p.status !== currentFilter) return false;
        if (search) {
            const clientName = (p.clientName || '').toLowerCase();
            const projectName = (p.projectName || '').toLowerCase();
            const address = (p.address || '').toLowerCase();
            // Client name has priority in search
            if (clientName.includes(search) || projectName.includes(search) || address.includes(search)) return true;
            return false;
        }
        return true;
    });
    
    // Sort descending by date
    filtered.sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
    
    if (filtered.length === 0) {
        container.innerHTML = `<div class="text-center py-10 text-slate-500">${t('no_projects')}</div>`;
        return;
    }
    
    container.innerHTML = filtered.map(p => {
        const avatarColor = getRandomAvatarColor(p.clientName);
        
        return `
            <div onclick="showDetails(state.projects.find(x => x.id === '${p.id}'))" class="bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer border border-green-500/30">
                <div class="p-4">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-14 h-14 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">${getInitials(p.clientName)}</div>
                        <div class="flex-1 min-w-0">
                            <h4 class="font-bold text-slate-900 dark:text-white truncate">${p.clientName || 'Untitled'}</h4>
                            <p class="text-sm text-slate-500 truncate">${p.projectName || '-'}</p>
                        </div>
                    </div>
                    
                    <!-- 3-Bar Status Indicator -->
                    <div class="flex gap-1 mb-2">
                        <div class="flex-1 h-2 rounded-full ${p.status === 'new' ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-600'}"></div>
                        <div class="flex-1 h-2 rounded-full ${p.status === 'work' ? 'bg-orange-500' : 'bg-slate-200 dark:bg-slate-600'}"></div>
                        <div class="flex-1 h-2 rounded-full ${p.status === 'done' ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-600'}"></div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1 text-slate-400">
                            <span class="material-symbols-outlined text-sm">location_on</span>
                            <span class="text-xs truncate max-w-[150px]">${truncateAddress(p.address)}</span>
                        </div>
                        <span class="text-xs text-slate-400">${formatTimeAgo(p.updatedAt || p.createdAt)}</span>
                    </div>
                    ${p.lat && p.lng ? `
                    <div class="mt-2">
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address || '')}" target="_blank" class="block w-full h-16 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 relative">
                            <img src="https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${p.lng},${p.lat}&size=300,100&z=13&l=map&pt=${p.lng},${p.lat},pm2rdm" 
                                 alt="Map location" 
                                 class="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity">
                            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span class="material-symbols-outlined text-white text-2xl drop-shadow-lg">map</span>
                            </div>
                        </a>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

document.getElementById('search-input').addEventListener('input', renderProjects);

// ==================== PROJECT DETAILS ====================
function renderDetailsPage(p) {
    document.getElementById('detail-title').textContent = p.projectName || 'Untitled';
    document.getElementById('detail-client-name').textContent = p.clientName || '-';
    document.getElementById('detail-client-address').textContent = truncateAddress(p.address);
    document.getElementById('detail-client-avatar').innerHTML = getInitials(p.clientName);
    document.getElementById('detail-client-avatar').className = `w-14 h-14 rounded-full bg-gradient-to-br ${getRandomAvatarColor(p.clientName)} flex items-center justify-center text-white font-bold text-lg shadow-lg`;
    
    // Map Preview
    const mapContainer = document.getElementById('detail-map');
    if (p.lat && p.lng) {
        mapContainer.classList.remove('hidden');
        document.getElementById('map-preview-img').src = `https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${p.lng},${p.lat}&size=150,60&z=15&l=map&pt=${p.lng},${p.lat},pm2rdm`;
        document.getElementById('btn-map-preview').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address || '')}`;
    } else {
        mapContainer.classList.add('hidden');
    }
    
    if (p.phone) {
        document.getElementById('btn-call').href = `tel:${p.phone}`;
        document.getElementById('btn-message').href = `sms:${p.phone}`;
        document.getElementById('detail-client-phone').classList.remove('hidden');
        document.getElementById('detail-client-phone').textContent = p.phone;
    } else {
        document.getElementById('btn-call').href = '#';
        document.getElementById('btn-message').href = '#';
    }
    
    // Navigation
    const addr = encodeURIComponent(p.address || '');
    document.getElementById('btn-waze').href = `https://waze.com/ul?q=${addr}`;
    document.getElementById('btn-maps').href = `https://www.google.com/maps/search/?api=1&query=${addr}`;
    
    // Status buttons - highlight active
    document.querySelectorAll('#status-new, #status-work, #status-done').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-slate-500', 'ring-offset-2');
        if (btn.id === `status-${p.status}`) {
            btn.classList.add('ring-2', 'ring-slate-500', 'ring-offset-2');
        }
    });
    
    // Terrain Details
    document.getElementById('terrain-container').innerHTML = `
        <div class="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-2 text-center"><span class="material-symbols-outlined block mx-auto mb-1 ${terrainIcons.lungime.color}">${terrainIcons.lungime.icon}</span><div class="text-xs text-slate-500">${t('lungime')}</div><div class="font-bold text-slate-900 dark:text-white text-xs">${p.lungime || 0} ${tUnit('m')}</div></div>
        <div class="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-2 text-center"><span class="material-symbols-outlined block mx-auto mb-1 ${terrainIcons.latime.color}">${terrainIcons.latime.icon}</span><div class="text-xs text-slate-500">${t('latime')}</div><div class="font-bold text-slate-900 dark:text-white text-xs">${p.latime || 0} ${tUnit('m')}</div></div>
        <div class="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-2 text-center"><span class="material-symbols-outlined block mx-auto mb-1 ${terrainIcons.panta.color}">${terrainIcons.panta.icon}</span><div class="text-xs text-slate-500">${t('panta')}</div><div class="font-bold text-slate-900 dark:text-white text-xs">${p.panta || 0}${tUnit('percent')}</div></div>
        <div class="bg-green-50 dark:bg-green-900/30 rounded-xl p-2 text-center"><span class="material-symbols-outlined block mx-auto mb-1 ${terrainIcons.suprafata.color}">${terrainIcons.suprafata.icon}</span><div class="text-xs text-slate-500">${t('suprafata')}</div><div class="font-bold text-slate-900 dark:text-white text-xs">${p.suprafata || 0} ${tUnit('mp')}</div></div>
        <div class="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-2 text-center"><span class="material-symbols-outlined block mx-auto mb-1 ${terrainIcons.perimeter.color}">${terrainIcons.perimeter.icon}</span><div class="text-xs text-slate-500">${t('perimeter')}</div><div class="font-bold text-slate-900 dark:text-white text-xs">${p.perimeter || 0} ${tUnit('ml')}</div></div>
        <div class="bg-red-50 dark:bg-red-900/30 rounded-xl p-2 text-center"><span class="material-symbols-outlined block mx-auto mb-1 ${terrainIcons.machinery.color}">${terrainIcons.machinery.icon}</span><div class="text-xs text-slate-500">${t('access')}</div><div class="font-bold text-slate-900 dark:text-white text-xs">${tValue(p.machinery)}</div></div>
        <div class="bg-cyan-50 dark:bg-cyan-900/30 rounded-xl p-2 text-center"><span class="material-symbols-outlined block mx-auto mb-1 ${terrainIcons.digging.color}">${terrainIcons.digging.icon}</span><div class="text-xs text-slate-500">${t('digging')}</div><div class="font-bold text-slate-900 dark:text-white text-xs">${tValue(p.digging)}</div></div>
        <div class="bg-pink-50 dark:bg-pink-900/30 rounded-xl p-2 text-center"><span class="material-symbols-outlined block mx-auto mb-1 ${terrainIcons.vegetation.color}">${terrainIcons.vegetation.icon}</span><div class="text-xs text-slate-500">${t('vegetation')}</div><div class="font-bold text-slate-900 dark:text-white text-xs">${tValue(p.vegetation)}</div></div>
        <div class="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-2 text-center"><span class="material-symbols-outlined block mx-auto mb-1 ${terrainIcons.terrain_type.color}">${terrainIcons.terrain_type.icon}</span><div class="text-xs text-slate-500">${t('terrain_type')}</div><div class="font-bold text-slate-900 dark:text-white text-xs">${tValue(p.terrain_type)}</div></div>
    `;
    
    // Materials
    const materialsList = document.getElementById('materials-list');
    if (p.materials && p.materials.length > 0) {
        materialsList.innerHTML = p.materials.map(m => `
            <li class="bg-gray-50 dark:bg-slate-700 rounded-lg p-2 flex justify-between text-sm">
                <span class="text-gray-700 dark:text-slate-300">${m.name}</span>
                <span class="font-bold text-slate-900 dark:text-white">${m.qty} ${tUnit(m.unit)}</span>
            </li>
        `).join('');
    } else {
        materialsList.innerHTML = `<li class="text-sm text-slate-400 text-center py-2">${t('no_materials')}</li>`;
    }
    
    // Photos
    const photosContainer = document.getElementById('photos-container');
    document.getElementById('photos-count').textContent = p.photos ? p.photos.length : 0;
    if (p.photos && p.photos.length > 0) {
        photosContainer.innerHTML = p.photos.map((url, i) => `
            <div onclick="openLightbox(${i})" class="aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-pointer">
                <img class="w-full h-full object-cover" src="${url}">
            </div>
        `).join('');
    } else {
        photosContainer.innerHTML = '<div class="col-span-3 text-center py-4 text-slate-400 text-sm">' + t('no_photos') + '</div>';
    }
    
    // Notes
    document.getElementById('detail-notes').textContent = p.notes || '-';
}

function changeProjectStatus(status) {
    if (!state.currentProject) return;
    state.currentProject.status = status;
    state.currentProject.updatedAt = new Date().toISOString();
    saveProjects();
    renderDetailsPage(state.currentProject);
    renderProjects();
}

function deleteCurrentProject() {
    if (!state.currentProject) return;
    if (confirm(state.lang === 'RO' ? 'Esti sigur ca vrei sa stergi acest proiect?' : 'Möchten Sie dieses Projekt wirklich löschen?')) {
        state.projects = state.projects.filter(p => p.id !== state.currentProject.id);
        saveProjects();
        showDashboard();
    }
}

// ==================== MATERIALS EDITOR ====================
function openMaterialsEditor() {
    if (!state.currentProject) return;
    state.editingMaterials = state.currentProject.materials ? [...state.currentProject.materials] : [];
    renderMaterialsEditor();
    document.getElementById('materials-modal').classList.remove('hidden');
}

function closeMaterialsModal() {
    document.getElementById('materials-modal').classList.add('hidden');
}

function renderMaterialsEditor() {
    const container = document.getElementById('materials-editor-list');
    
    // Create/update datalist for materials with autocomplete suggestions
    let matDatalist = document.getElementById('materials-datalist');
    if (!matDatalist) {
        matDatalist = document.createElement('datalist');
        matDatalist.id = 'materials-datalist';
        document.body.appendChild(matDatalist);
    }
    matDatalist.innerHTML = state.materialsLibrary.map(m => `<option value="${m.name}">`).join('');
    
    // Create datalist for units
    let unitDatalist = document.getElementById('units-datalist');
    if (!unitDatalist) {
        unitDatalist = document.createElement('datalist');
        unitDatalist.id = 'units-datalist';
        document.body.appendChild(unitDatalist);
    }
    unitDatalist.innerHTML = state.customUnits.map(u => `<option value="${u}">`).join('');
    
    container.innerHTML = state.editingMaterials.map((m, i) => `
        <div class="flex gap-2 items-center">
            <input type="text" value="${m.name}" list="materials-datalist" onchange="updateMaterial(${i}, 'name', this.value)" placeholder="Material" class="flex-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm">
            <input type="number" value="${m.qty}" onchange="updateMaterial(${i}, 'qty', this.value)" placeholder="Qty" class="w-16 p-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm">
            <input type="text" value="${m.unit}" list="units-datalist" onchange="updateMaterial(${i}, 'unit', this.value)" placeholder="Unit" class="w-16 p-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm">
            <button onclick="deleteMaterialRow(${i})" class="p-2 text-red-500"><span class="material-symbols-outlined">delete</span></button>
        </div>
    `).join('');
}

function updateMaterial(index, field, value) {
    state.editingMaterials[index][field] = value;
}

function deleteMaterialRow(index) {
    state.editingMaterials.splice(index, 1);
    renderMaterialsEditor();
}

function addNewMaterialRow() {
    state.editingMaterials.push({ name: '', qty: 0, unit: 'buc' });
    renderMaterialsEditor();
}

function saveMaterials() {
    if (!state.currentProject) return;
    state.currentProject.materials = state.editingMaterials;
    state.currentProject.updatedAt = new Date().toISOString();
    saveProjects();
    closeMaterialsModal();
    renderDetailsPage(state.currentProject);
}

// ==================== MATERIALS LIBRARY ====================
function openMaterialsLibrary() {
    state.tempMaterialsLibrary = state.materialsLibrary.map(m => ({...m}));
    renderMaterialsLibrary();
    document.getElementById('materials-library-modal').classList.remove('hidden');
}

function closeMaterialsLibrary() {
    document.getElementById('materials-library-modal').classList.add('hidden');
}

function renderMaterialsLibrary() {
    const container = document.getElementById('materials-library-list');
    
    // Create datalist for units
    let unitDatalist = document.getElementById('library-units-datalist');
    if (!unitDatalist) {
        unitDatalist = document.createElement('datalist');
        unitDatalist.id = 'library-units-datalist';
        document.body.appendChild(unitDatalist);
    }
    unitDatalist.innerHTML = state.customUnits.map(u => `<option value="${u}">`).join('');
    
    container.innerHTML = state.tempMaterialsLibrary.map((m, i) => `
        <div class="flex gap-2 items-center">
            <input type="text" value="${m.name}" onchange="updateLibraryMaterial(${i}, 'name', this.value)" placeholder="Material" class="flex-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm">
            <input type="text" value="${m.unit}" list="library-units-datalist" onchange="updateLibraryMaterial(${i}, 'unit', this.value)" placeholder="Unitate" class="w-20 p-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm">
            <button onclick="deleteLibraryMaterial(${i})" class="p-2 text-red-500"><span class="material-symbols-outlined">delete</span></button>
        </div>
    `).join('');
}

function updateLibraryMaterial(index, field, value) {
    state.tempMaterialsLibrary[index][field] = value;
}

function deleteLibraryMaterial(index) {
    state.tempMaterialsLibrary.splice(index, 1);
    renderMaterialsLibrary();
}

function addNewLibraryMaterial() {
    state.tempMaterialsLibrary.push({ name: '', unit: 'buc' });
    renderMaterialsLibrary();
}

function saveMaterialsLibrary() {
    state.materialsLibrary = state.tempMaterialsLibrary.filter(m => m.name.trim() !== '');
    saveMaterialsLibrary();
    closeMaterialsLibrary();
}

// ==================== LIGHTBOX ====================
function openLightbox(index) {
    if (!state.currentProject || !state.currentProject.photos) return;
    
    const container = document.getElementById('lightbox-container');
    container.innerHTML = `
        <div class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
            <button onclick="this.parentElement.remove()" class="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10"><span class="material-symbols-outlined text-3xl">close</span></button>
            <button onclick="navLightbox(-1)" class="absolute left-4 text-white p-2 rounded-full hover:bg-white/10"><span class="material-symbols-outlined text-5xl">chevron_left</span></button>
            <img id="lightbox-img" class="max-h-[80vh] max-w-[90vw] object-contain rounded-lg" src="${state.currentProject.photos[index]}">
            <button onclick="navLightbox(1)" class="absolute right-4 text-white p-2 rounded-full hover:bg-white/10"><span class="material-symbols-outlined text-5xl">chevron_right</span></button>
            <div class="absolute bottom-4 text-white font-bold">${index + 1} / ${state.currentProject.photos.length}</div>
        </div>
    `;
    window.lightboxIndex = index;
}

function navLightbox(dir) {
    if (!state.currentProject || !state.currentProject.photos) return;
    window.lightboxIndex = (window.lightboxIndex + dir + state.currentProject.photos.length) % state.currentProject.photos.length;
    document.getElementById('lightbox-img').src = state.currentProject.photos[window.lightboxIndex];
}

// ==================== PHOTO UPLOAD ====================
async function addPhoto() {
    if (!state.currentProject) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    
    input.onchange = async (e) => {
        const files = Array.from(e.target.files);
        for (const file of files) {
            try {
                const base64 = await compressImage(file);
                if (!state.currentProject.photos) state.currentProject.photos = [];
                state.currentProject.photos.push(base64);
            } catch (err) {
                console.error('Photo upload error:', err);
            }
        }
        saveProjects();
        renderDetailsPage(state.currentProject);
        renderProjects();
    };
    
    input.click();
}

function addEditPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    
    input.onchange = async (e) => {
        const files = Array.from(e.target.files);
        for (const file of files) {
            try {
                const base64 = await compressImage(file);
                state.editingPhotos.push(base64);
            } catch (err) {
                console.error('Photo upload error:', err);
            }
        }
        renderEditPhotos();
    };
    
    input.click();
}

function compressImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_SIZE = 800;
                let width = img.width;
                let height = img.height;
                
                if (width > height && width > MAX_SIZE) {
                    height = Math.round(height * MAX_SIZE / width);
                    width = MAX_SIZE;
                } else if (height > MAX_SIZE) {
                    width = Math.round(width * MAX_SIZE / height);
                    height = MAX_SIZE;
                }
                
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}

function deletePhoto(index) {
    state.editingPhotos.splice(index, 1);
    renderEditPhotos();
}

function renderEditPhotos() {
    const container = document.getElementById('edit-photos-container');
    container.innerHTML = state.editingPhotos.map((url, i) => `
        <div class="aspect-square rounded-xl overflow-hidden bg-slate-100 relative">
            <img class="w-full h-full object-cover" src="${url}">
            <button onclick="deletePhoto(${i})" class="absolute top-1 right-1 size-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">×</button>
        </div>
    `).join('');
}

// ==================== CALCULATIONS ====================
function renderEditMaterials() {
    const list = document.getElementById('edit-materials-list');
    if (!state.editingMaterials || state.editingMaterials.length === 0) {
        list.innerHTML = '<p class="text-sm text-slate-400 text-center py-2">Nu exista materiale</p>';
        return;
    }
    list.innerHTML = state.editingMaterials.map((m, i) => `
        <li class="bg-slate-50 dark:bg-slate-700 rounded-lg p-2 flex justify-between items-center text-sm">
            <span class="text-slate-700 dark:text-slate-300">${m.name}</span>
            <div class="flex items-center gap-2">
                <span class="font-bold text-slate-900 dark:text-white">${m.qty} ${m.unit}</span>
                <button onclick="removeEditMaterial(${i})" class="text-red-500 hover:text-red-700"><span class="material-symbols-outlined text-sm">close</span></button>
            </div>
        </li>
    `).join('');
}

function addEditMaterial() {
    const name = document.getElementById('edit-material-name').value.trim();
    const qty = parseFloat(document.getElementById('edit-material-qty').value) || 0;
    const unit = document.getElementById('edit-material-unit').value;
    
    if (!name) {
        alert('Introduceți numele materialului');
        return;
    }
    
    state.editingMaterials.push({ name, qty, unit });
    document.getElementById('edit-material-name').value = '';
    document.getElementById('edit-material-qty').value = '';
    renderEditMaterials();
}

function removeEditMaterial(index) {
    state.editingMaterials.splice(index, 1);
    renderEditMaterials();
}

function calcArea() {
    const lungime = parseFloat(document.getElementById('edit-lungime').value) || 0;
    const latime = parseFloat(document.getElementById('edit-latime').value) || 0;
    document.getElementById('edit-suprafata').value = Math.round(lungime * latime * 100) / 100;
    
    const perimetru = 2 * (lungime + latime);
    document.getElementById('edit-perimeter').value = Math.round(perimetru * 100) / 100;
}

// ==================== NEW PROJECT ====================
function openNewProjectForm() {
    document.getElementById('new-project-modal').classList.remove('hidden');
}

function closeNewProjectModal() {
    document.getElementById('new-project-modal').classList.add('hidden');
}

function createQuickProject(e) {
    e.preventDefault();
    
    const project = {
        id: generateId(),
        projectName: document.getElementById('new-project-name').value,
        clientName: document.getElementById('new-client-name').value,
        status: 'new',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    state.projects.unshift(project);
    saveProjects();
    closeNewProjectModal();
    renderProjects();
    
    // Go back to dashboard, project is now visible in list
    showDashboard();
}

function openFullEditForNew() {
    const name = document.getElementById('new-project-name').value;
    const client = document.getElementById('new-client-name').value;
    closeNewProjectModal();
    
    // Create project and go directly to edit page
    const project = {
        id: generateId(),
        projectName: name,
        clientName: client,
        status: 'new',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    state.projects.unshift(project);
    saveProjects();
    renderProjects();
    
    // Go to edit page for full editing
    state.currentProject = project;
    document.getElementById('dashboard-page').classList.add('hidden');
    document.getElementById('edit-page').classList.remove('hidden');
    renderEditPage(project);
}

function openNewProject() {
    document.getElementById('dashboard-page').classList.add('hidden');
    document.getElementById('edit-page').classList.remove('hidden');
    state.currentProject = null;
    
    document.getElementById('edit-project-name').value = '';
    document.getElementById('edit-client-name').value = '';
    document.getElementById('edit-phone').value = '';
    document.getElementById('edit-address').value = '';
    document.getElementById('edit-start-date').value = '';
    document.getElementById('edit-lungime').value = '';
    document.getElementById('edit-latime').value = '';
    document.getElementById('edit-panta').value = '';
    document.getElementById('edit-suprafata').value = '';
    document.getElementById('edit-perimeter').value = '';
    document.getElementById('edit-inaltime').value = '';
    document.getElementById('edit-machinery').value = '';
    document.getElementById('edit-digging').value = '';
    document.getElementById('edit-terrain-type').value = '';
    document.getElementById('edit-vegetation').value = '';
    document.getElementById('edit-notes').value = '';
    state.editingPhotos = [];
    state.editingMaterials = [];
    renderEditPhotos();
}

// ==================== EDIT PROJECT ====================
function openEditProject() {
    if (!state.currentProject) return;
    document.getElementById('details-page').classList.add('hidden');
    document.getElementById('edit-page').classList.remove('hidden');
    renderEditPage(state.currentProject);
}

function cancelEdit() {
    if (state.currentProject) {
        document.getElementById('edit-page').classList.add('hidden');
        document.getElementById('details-page').classList.remove('hidden');
    } else {
        showDashboard();
    }
}

function renderEditPage(p) {
    document.getElementById('edit-project-name').value = p.projectName || '';
    document.getElementById('edit-client-name').value = p.clientName || '';
    document.getElementById('edit-phone').value = p.phone || '';
    document.getElementById('edit-address').value = p.address || '';
    document.getElementById('edit-start-date').value = p.startDate || '';
    document.getElementById('edit-lungime').value = p.lungime || '';
    document.getElementById('edit-latime').value = p.latime || '';
    document.getElementById('edit-panta').value = p.panta || '';
    document.getElementById('edit-suprafata').value = p.suprafata || '';
    document.getElementById('edit-perimeter').value = p.perimeter || '';
    document.getElementById('edit-inaltime').value = p.inaltime || '';
    document.getElementById('edit-machinery').value = p.machinery || '';
    document.getElementById('edit-digging').value = p.digging || '';
    document.getElementById('edit-terrain-type').value = p.terrain_type || '';
    document.getElementById('edit-vegetation').value = p.vegetation || '';
    document.getElementById('edit-notes').value = p.notes || '';
    state.editingPhotos = p.photos ? [...p.photos] : [];
    state.editingMaterials = p.materials ? [...p.materials] : [];
    renderEditPhotos();
    renderEditMaterials();
}

function saveProject() {
    if (!state.currentProject) {
        // New project
        const project = {
            id: generateId(),
            projectName: document.getElementById('edit-project-name').value,
            clientName: document.getElementById('edit-client-name').value,
            phone: document.getElementById('edit-phone').value,
            address: document.getElementById('edit-address').value,
            startDate: document.getElementById('edit-start-date').value,
            status: 'new',
            lungime: parseFloat(document.getElementById('edit-lungime').value) || 0,
            latime: parseFloat(document.getElementById('edit-latime').value) || 0,
            panta: parseFloat(document.getElementById('edit-panta').value) || 0,
            suprafata: parseFloat(document.getElementById('edit-suprafata').value) || 0,
            perimeter: parseFloat(document.getElementById('edit-perimeter').value) || 0,
            inaltime: parseFloat(document.getElementById('edit-inaltime').value) || 0,
            machinery: document.getElementById('edit-machinery').value,
            digging: document.getElementById('edit-digging').value,
            terrain_type: document.getElementById('edit-terrain-type').value,
            vegetation: document.getElementById('edit-vegetation').value,
            materials: state.editingMaterials,
            photos: state.editingPhotos,
            cover: state.editingPhotos[0] || null,
            notes: document.getElementById('edit-notes').value,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        state.projects.unshift(project);
        saveProjects();
        
        // Show saved feedback
        showToast('Salvat!', 'success');
        
        showDetails(project);
        renderProjects();
    } else {
        // Update existing
        state.currentProject.projectName = document.getElementById('edit-project-name').value;
        state.currentProject.clientName = document.getElementById('edit-client-name').value;
        state.currentProject.phone = document.getElementById('edit-phone').value;
        state.currentProject.address = document.getElementById('edit-address').value;
        state.currentProject.startDate = document.getElementById('edit-start-date').value;
        state.currentProject.lungime = parseFloat(document.getElementById('edit-lungime').value) || 0;
        state.currentProject.latime = parseFloat(document.getElementById('edit-latime').value) || 0;
        state.currentProject.panta = parseFloat(document.getElementById('edit-panta').value) || 0;
        state.currentProject.suprafata = parseFloat(document.getElementById('edit-suprafata').value) || 0;
        state.currentProject.perimeter = parseFloat(document.getElementById('edit-perimeter').value) || 0;
        state.currentProject.inaltime = parseFloat(document.getElementById('edit-inaltime').value) || 0;
        state.currentProject.machinery = document.getElementById('edit-machinery').value;
        state.currentProject.digging = document.getElementById('edit-digging').value;
        state.currentProject.terrain_type = document.getElementById('edit-terrain-type').value;
        state.currentProject.vegetation = document.getElementById('edit-vegetation').value;
        state.currentProject.materials = state.editingMaterials;
        state.currentProject.notes = document.getElementById('edit-notes').value;
        state.currentProject.photos = state.editingPhotos;
        state.currentProject.cover = state.editingPhotos[0] || null;
        state.currentProject.updatedAt = new Date().toISOString();
        
        saveProjects();
        
        // Show saved feedback
        showToast('Salvat!', 'success');
        
        showDetails(state.currentProject);
        renderProjects();
    }
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-24 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full font-bold text-white shadow-lg z-[100] ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ==================== WEATHER ====================
function renderWeather() {
    const loc = localStorage.getItem('weatherLoc') || '44.4268,26.1025';
    const [lat, lon] = loc.split(',').map(parseFloat);
    
    const userLat = localStorage.getItem('userLat');
    const userLon = localStorage.getItem('userLon');
    const locationEl = document.getElementById('weather-location');
    
    if (userLat && userLon) {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLon}`)
            .then(r => r.json())
            .then(data => {
                // Extract city/town from address
                const addr = data.address || {};
                const city = addr.city || addr.town || addr.village || addr.county || 'Locatia ta';
                locationEl.textContent = city;
            })
            .catch(() => {
                locationEl.textContent = 'Locatia ta';
            });
    }
    
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`)
        .then(r => r.json())
        .then(d => {
            document.querySelector('#weather-widget .text-3xl').textContent = Math.round(d.current.temperature_2m);
            document.querySelector('#weather-widget .text-lg').textContent = '°C';
            document.getElementById('weather-desc').textContent = getWeatherIcon(d.current.weather_code);
            document.getElementById('weather-desc').className = 'text-2xl';
            document.getElementById('weather-icon').textContent = getWeatherIcon(d.current.weather_code);
            document.getElementById('weather-icon').className = 'text-5xl';
            
            const fc = document.getElementById('weather-forecast');
            fc.innerHTML = [0,1,2,3,4].map(i => {
                const date = new Date(d.daily.time[i]);
                const dayName = i === 0 ? 'Acum' : ['Du','Lu','Ma','Mi','Jo','Vi','Sa'][date.getDay()];
                const icon = getWeatherIcon(d.daily.weather_code[i]);
                return `
                    <div class="flex flex-col items-center">
                        <span class="text-xs font-bold text-slate-500 mb-1">${dayName}</span>
                        <span class="text-2xl">${icon}</span>
                        <span class="font-bold text-slate-800 dark:text-white">${Math.round(d.daily.temperature_2m_max[i])}°</span>
                        <span class="text-xs text-slate-400">${Math.round(d.daily.temperature_2m_min[i])}°</span>
                    </div>
                `;
            }).join('');
        })
        .catch(() => {
            document.querySelector('#weather-widget .text-3xl').textContent = '--';
            document.getElementById('weather-desc').textContent = t('offline');
        });
}

function getWeatherDesc(code) {
    // Return icon name instead of text for weather description
    return getWeatherIcon(code);
}

function getWeatherIcon(code) {
    // Use emojis for weather icons - universally supported
    const map = { 
        0: '☀️',   // Clear sky -> sun
        1: '⛅',  // Partly cloudy -> sun behind cloud
        2: '☁️',  // Cloudy -> cloud
        3: '☁️',  // Overcast -> cloud
        45: '🌫️', // Fog -> fog
        48: '🌫️', // Fog -> fog
        51: '🌧️', // Drizzle -> rain
        53: '🌧️', // Drizzle -> rain
        55: '🌧️', // Drizzle -> rain
        61: '🌧️', // Rain -> rain
        63: '🌧️', // Rain -> rain
        65: '🌧️', // Rain -> rain
        71: '❄️', // Snow -> snow
        73: '❄️', // Snow -> snow
        75: '❄️', // Snow -> snow
        80: '⛈️', // Rain showers -> thunderstorm
        81: '⛈️', // Rain showers -> thunderstorm
        82: '⛈️', // Violent rain showers -> thunderstorm
        95: '⛈️', // Thunderstorm -> thunderstorm
        96: '⛈️', // Thunderstorm with hail -> thunderstorm
        99: '⛈️'  // Heavy thunderstorm -> thunderstorm
    };
    return map[code] || '☁️';
}

// ==================== PDF EXPORT ====================
async function exportToPdf() {
    if (!state.currentProject) return;
    const p = state.currentProject;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Try to add logo with preserved aspect ratio
    try {
        const logoImg = new Image();
        logoImg.src = 'logo.png';
        await new Promise(resolve => {
            logoImg.onload = resolve;
            logoImg.onerror = () => resolve(false);
        });
        
        // Calculate aspect ratio
        const logoWidth = 25;
        const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
        doc.addImage('logo.png', 'PNG', 15, 10, logoWidth, logoHeight);
    } catch(e) {}
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text('VICTOR TIGOIANU', 45, 20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('LANDSCAPING & CONSTRUCTII', 45, 27);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(p.projectName || 'Untitled Project', 15, 50);
    
    doc.setFillColor(248, 248, 248);
    doc.roundedRect(15, 55, 180, 25, 2, 2, 'F');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`${p.clientName || '-'} | ${p.phone || '-'}`, 20, 65);
    doc.setTextColor(100, 100, 100);
    doc.text(truncateAddress(p.address || '-'), 20, 73);
    
    const statusColors = {new: [59, 130, 246], work: [249, 115, 22], done: [17, 212, 115]};
    const c = statusColors[p.status] || [128, 128, 128];
    doc.setFillColor(...c);
    doc.roundedRect(160, 55, 30, 8, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text(p.status.toUpperCase(), 175, 60, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('DETALII TEREN', 15, 80);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const terrainData = [
        `${t('lungime')}: ${p.lungime || 0}${tUnit('m')}  |  ${t('latime')}: ${p.latime || 0}${tUnit('m')}  |  ${t('panta')}: ${p.panta || 0}${tUnit('percent')}`,
        `${t('suprafata')}: ${p.suprafata || 0} ${tUnit('mp')}  |  ${t('perimeter')}: ${p.perimeter || 0} ${tUnit('ml')}`,
        `${t('inaltime')}: ${p.inaltime || 0}${tUnit('m')}  |  ${t('access')}: ${tValue(p.machinery)}  |  ${t('digging')}: ${tValue(p.digting)}`,
        `${t('terrain_type')}: ${tValue(p.terrain_type)}`
    ];
    terrainData.forEach((row, i) => {
        doc.text(row, 15, 138 + (i * 6));
    });
    
    if (p.materials && p.materials.length > 0) {
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.text('MATERIALE', 15, 165);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        p.materials.forEach((m, i) => {
            doc.text(`• ${m.name}: ${m.qty} ${tUnit(m.unit)}`, 15, 173 + (i * 5));
        });
    }
    
    if (p.notes) {
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.text('NOTE', 15, 200);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        const splitNotes = doc.splitTextToSize(p.notes, 180);
        doc.text(splitNotes, 15, 208);
    }
    
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generat: ${formatDateFull(new Date())}`, 105, 285, { align: 'center' });
    
    doc.save(`${p.projectName || 'project'}.pdf`);
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    initUI();
});
