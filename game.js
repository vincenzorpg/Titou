// Moteur principal de MATH QUEST : Édition Titou (4ème)

(() => {
  const LEGACY_SAVE_KEY = 'mathquest_titou_4e_v1';
  const STORE_KEY = 'mathquest_accounts_v2';
  const QUEST_LENGTH = 8;

  // 12 Transformations épiques du Niveau 1 au Niveau 100 !
  const RANKS = [
    { lvl: 1,   name: 'Villageois Cubique',        sub: 'Début de l’aventure',      icon: '⛏️', hair: '#475569', eyes: '#38bdf8', aura: 'none',   bolts: false, crown: false, style: 'base' },
    { lvl: 5,   name: 'Dresseur d’Élite',          sub: 'Maître des stats',         icon: '⚡', hair: '#1e293b', eyes: '#facc15', aura: '#facc15', bolts: false, crown: false, style: 'base' },
    { lvl: 10,  name: 'Héros Classe C',            sub: 'Association des Héros',    icon: '🥊', hair: '#334155', eyes: '#f97316', aura: '#f97316', bolts: false, crown: false, style: 'spiky' },
    { lvl: 18,  name: 'Épéiste Noir',              sub: 'Porteur de Dragon Slayer', icon: '⚔️', hair: '#0f172a', eyes: '#ef4444', aura: '#ef4444', bolts: false, crown: false, style: 'spiky' },
    { lvl: 26,  name: 'Héros Classe S',            sub: 'Puissance Serious Punch',  icon: '🔥', hair: '#fde047', eyes: '#f97316', aura: '#f97316', bolts: false, crown: false, style: 'spiky' },
    { lvl: 35,  name: 'Super Saiyan 1',            sub: 'Éveil doré',               icon: '🟡', hair: '#facc15', eyes: '#22d3ee', aura: '#facc15', bolts: false, crown: false, style: 'ssj' },
    { lvl: 45,  name: 'Super Saiyan 2',            sub: 'Éclairs de foudre',        icon: '⚡', hair: '#fde047', eyes: '#22d3ee', aura: '#facc15', bolts: true,  crown: false, style: 'ssj' },
    { lvl: 55,  name: 'Super Saiyan 3',            sub: 'Crinière surpuissante',    icon: '🔥', hair: '#fbbf24', eyes: '#38bdf8', aura: '#f59e0b', bolts: true,  crown: false, style: 'ssj3' },
    { lvl: 65,  name: 'Super Saiyan God',          sub: 'Flammes divines',          icon: '🔴', hair: '#ef4444', eyes: '#fca5a5', aura: '#ef4444', bolts: false, crown: false, style: 'ssj' },
    { lvl: 75,  name: 'Super Saiyan Blue',         sub: 'Ki divin maîtrisé',        icon: '💎', hair: '#38bdf8', eyes: '#bae6fd', aura: '#38bdf8', bolts: true,  crown: false, style: 'ssj' },
    { lvl: 88,  name: 'Ultra Instinct Maîtrisé',   sub: 'Esquive absolue',          icon: '⚪', hair: '#f8fafc', eyes: '#e2e8f0', aura: '#e2e8f0', bolts: true,  crown: false, style: 'ssj' },
    { lvl: 100, name: 'Sangoku Super Saiyan 6',    sub: 'OMNI-INFINI • LÉGENDE',    icon: '🌌', hair: 'url(#ssj6Hair)', eyes: '#fde047', aura: '#e879f9', bolts: true, crown: true, style: 'ssj6' }
  ];

  function renderHeroAvatarSVG(rank) {
    const isSSJ6 = rank.style === 'ssj6';
    const isSSJ3 = rank.style === 'ssj3';
    const isSpiky = rank.style !== 'base';
    const auraColor = rank.aura === 'none' ? 'transparent' : rank.aura;

    const hairPath = isSSJ6
      ? 'M18,52 L8,24 L26,30 L20,6 L40,22 L50,2 L60,22 L80,6 L74,30 L92,24 L82,52 L88,78 L72,64 L50,74 L28,64 L12,78 Z'
      : isSSJ3
      ? 'M18,50 L10,26 L26,32 L24,10 L42,24 L50,6 L58,24 L76,10 L74,32 L90,26 L82,50 L86,84 L70,70 L50,82 L30,70 L14,84 Z'
      : isSpiky
      ? 'M22,50 L12,28 L28,34 L24,12 L42,26 L50,8 L58,26 L76,12 L72,34 L88,28 L78,50 Z'
      : 'M26,48 Q26,20 50,20 Q74,20 74,48 L72,38 Q50,28 28,38 Z';

    const boltsSvg = rank.bolts
      ? `<polyline points="12,68 22,52 16,52 26,34" fill="none" stroke="${isSSJ6 ? '#facc15' : '#38bdf8'}" stroke-width="3" stroke-linecap="round"/>
         <polyline points="88,68 78,52 84,52 74,34" fill="none" stroke="${isSSJ6 ? '#38bdf8' : '#facc15'}" stroke-width="3" stroke-linecap="round"/>`
      : '';

    const crownSvg = rank.crown
      ? `<polygon points="34,14 42,4 50,12 58,4 66,14 62,20 38,20" fill="#facc15" stroke="#fff" stroke-width="1.5"/>`
      : '';

    return `
      <svg viewBox="0 0 100 100" role="img" aria-label="${rank.name}">
        <defs>
          <linearGradient id="ssj6Hair" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="45%" stop-color="#facc15"/>
            <stop offset="100%" stop-color="#e879f9"/>
          </linearGradient>
        </defs>
        <!-- Aura -->
        <circle cx="50" cy="52" r="44" fill="${auraColor}" opacity="${isSSJ6 ? '0.32' : '0.22'}"/>
        ${isSSJ6 ? '<circle cx="50" cy="52" r="38" fill="none" stroke="#facc15" stroke-width="2.5" stroke-dasharray="6 4"/>' : ''}
        <!-- Cheveux -->
        <path d="${hairPath}" fill="${rank.hair}" stroke="#0b0f19" stroke-width="2.5" stroke-linejoin="round"/>
        ${crownSvg}
        <!-- Visage -->
        <path d="M30,44 Q30,74 50,76 Q70,74 70,44 Q50,38 30,44 Z" fill="#fde6c4" stroke="#0b0f19" stroke-width="2.5"/>
        <!-- Sourcils déterminés -->
        <line x1="35" y1="49" x2="46" y2="52" stroke="#0b0f19" stroke-width="2.6" stroke-linecap="round"/>
        <line x1="65" y1="49" x2="54" y2="52" stroke="#0b0f19" stroke-width="2.6" stroke-linecap="round"/>
        <!-- Yeux anime -->
        <ellipse cx="41" cy="55" rx="4.2" ry="3.2" fill="#fff"/>
        <circle cx="41.5" cy="55" r="2.3" fill="${rank.eyes}"/>
        <ellipse cx="59" cy="55" rx="4.2" ry="3.2" fill="#fff"/>
        <circle cx="58.5" cy="55" r="2.3" fill="${rank.eyes}"/>
        <!-- Sourire confiant -->
        <path d="M43,66 Q50,70 57,65" fill="none" stroke="#0b0f19" stroke-width="2.4" stroke-linecap="round"/>
        <!-- Éclairs -->
        ${boltsSvg}
      </svg>
    `;
  }

  // Trophées déblocables
  const BADGES = [
    { id: 'first_quest', icon: '🎮', title: 'Premier Combat', desc: 'Terminer ta première quête.' },
    { id: 'pyth_master', icon: '⛏️', title: 'Architecte Diamant', desc: 'Obtenir 3★ dans la Forteresse de Pythagore.' },
    { id: 'rel_master', icon: '⚔️', title: 'Dragon Slayer', desc: 'Obtenir 3★ dans l’Arène des Relatifs.' },
    { id: 'stat_master', icon: '⚡', title: 'Maître Pokédex', desc: 'Obtenir 3★ au Labo des Statistiques.' },
    { id: 'boss_master', icon: '👊', title: 'One Punch Math', desc: 'Vaincre le Boss Rush Classe S (≥ 6/8).' },
    { id: 'combo_5', icon: '🔥', title: 'Série Infernale', desc: 'Atteindre un combo de 5 bonnes réponses.' },
    { id: 'perfect', icon: '💎', title: 'Sans-Faute Absolu', desc: 'Faire 8/8 sur n’importe quelle quête.' },
    { id: 'turbo_win', icon: '⏱️', title: 'Vitesse Sonic', desc: 'Gagner une quête en mode Turbo (chrono).' }
  ];

  const WORLD_META = {
    pythagore: {
      label: '⛏️ Forteresse de Pythagore',
      enemies: [
        { name: 'Creeper Géométrique', sprite: '🟩' },
        { name: 'Enderman des Angles', sprite: '👾' },
        { name: 'Ender Dragon', sprite: '🐉' }
      ],
      playerSprite: '⛏️'
    },
    relatifs: {
      label: '⚔️ Arène des Relatifs',
      enemies: [
        { name: 'Apôtre des Signes', sprite: '👹' },
        { name: 'Zodd l’Immortel', sprite: '🐃' },
        { name: 'Chevalier de l’Éclipse', sprite: '🌑' }
      ],
      playerSprite: '⚔️'
    },
    stats: {
      label: '⚡ Labo des Statistiques',
      enemies: [
        { name: 'Team Rocket Stats', sprite: '🚀' },
        { name: 'Mewtwo Sauveur', sprite: '🔮' },
        { name: 'Champion de la Ligue', sprite: '🏆' }
      ],
      playerSprite: '⚡'
    },
    boss: {
      label: '🥊 Boss Rush : Classe S',
      enemies: [
        { name: 'Roi des Profondeurs', sprite: '🐙' },
        { name: 'Garou le Chasseur', sprite: '🐺' },
        { name: 'Seigneur Boros', sprite: '☄️' }
      ],
      playerSprite: '👊'
    }
  };

  // ==================== ÉTAT & MULTI-COMPTES ====================
  function slugifyId(name) {
    return (
      String(name || 'joueur')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'joueur'
    );
  }

  function defaultProfile(name = 'Titou', id = null) {
    return {
      id: id || slugifyId(name),
      name,
      xp: 0,
      gems: 0,
      bestCombo: 0,
      stars: { pythagore: 0, relatifs: 0, stats: 0, boss: 0 },
      badges: [],
      sound: true
    };
  }

  function normalizeProfile(raw, fallbackName = 'Titou') {
    const base = defaultProfile(raw?.name || fallbackName, raw?.id);
    return {
      ...base,
      ...(raw || {}),
      name: (raw?.name || fallbackName).trim() || fallbackName,
      id: raw?.id || slugifyId(raw?.name || fallbackName),
      stars: { ...base.stars, ...(raw?.stars || {}) },
      badges: Array.isArray(raw?.badges) ? raw.badges : []
    };
  }

  function loadStore() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.profiles && Object.keys(parsed.profiles).length > 0) {
          const profiles = {};
          for (const [k, v] of Object.entries(parsed.profiles)) {
            profiles[k] = normalizeProfile({ ...v, id: k }, v?.name || k);
          }
          const activeId = profiles[parsed.activeId] ? parsed.activeId : Object.keys(profiles)[0];
          return { activeId, profiles };
        }
      }
      // Migration automatique d'une sauvegarde Titou v1 si présente
      const legacyRaw = localStorage.getItem(LEGACY_SAVE_KEY);
      const titou = legacyRaw
        ? normalizeProfile({ ...JSON.parse(legacyRaw), id: 'titou', name: 'Titou' }, 'Titou')
        : defaultProfile('Titou', 'titou');
      return { activeId: 'titou', profiles: { titou } };
    } catch {
      const titou = defaultProfile('Titou', 'titou');
      return { activeId: 'titou', profiles: { titou } };
    }
  }

  let store = loadStore();
  let profile = store.profiles[store.activeId];

  function persistSave(pushCloud = true) {
    store.profiles[store.activeId] = profile;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch {}
    if (pushCloud) pushCloudSave();
  }

  function switchProfile(id) {
    if (!store.profiles[id]) return;
    stopTimer();
    store.activeId = id;
    profile = store.profiles[id];
    persistSave(false);
    renderHUD();
    showScreen('menu');
    pullAndMergeCloud(true);
  }

  function createProfile(name) {
    const cleanName = String(name || '').trim().slice(0, 18);
    if (!cleanName) return null;
    let id = slugifyId(cleanName);
    let suffix = 2;
    while (store.profiles[id]) {
      id = `${slugifyId(cleanName)}-${suffix++}`;
    }
    const p = defaultProfile(cleanName, id);
    store.profiles[id] = p;
    store.activeId = id;
    profile = p;
    persistSave(true);
    renderHUD();
    return p;
  }

  function deleteProfile(id) {
    const keys = Object.keys(store.profiles);
    if (keys.length <= 1 || !store.profiles[id]) return false;
    delete store.profiles[id];
    deleteProfileFromCloud(id);
    if (store.activeId === id) {
      store.activeId = Object.keys(store.profiles)[0];
      profile = store.profiles[store.activeId];
    }
    persistSave(false);
    renderHUD();
    return true;
  }

  // Fusion intelligente (garde toujours le meilleur progrès entre Mobile et PC)
  function mergeProfiles(localP, incomingP) {
    if (!incomingP || typeof incomingP !== 'object') return localP;
    const base = defaultProfile(localP.name || incomingP.name || 'Titou', localP.id);
    const mergedStars = { ...base.stars };
    for (const k of Object.keys(mergedStars)) {
      mergedStars[k] = Math.max(localP.stars?.[k] || 0, incomingP.stars?.[k] || 0);
    }
    const badgesSet = new Set([
      ...(Array.isArray(localP.badges) ? localP.badges : []),
      ...(Array.isArray(incomingP.badges) ? incomingP.badges : [])
    ]);
    return {
      ...base,
      xp: Math.max(Number(localP.xp) || 0, Number(incomingP.xp) || 0),
      gems: Math.max(Number(localP.gems) || 0, Number(incomingP.gems) || 0),
      bestCombo: Math.max(Number(localP.bestCombo) || 0, Number(incomingP.bestCombo) || 0),
      stars: mergedStars,
      badges: [...badgesSet],
      sound: localP.sound !== undefined ? localP.sound : true
    };
  }

  function encodeHeroCode(p) {
    const compact = {
      n: p.name,
      x: p.xp,
      g: p.gems,
      c: p.bestCombo,
      s: [p.stars.pythagore || 0, p.stars.relatifs || 0, p.stars.stats || 0, p.stars.boss || 0],
      b: p.badges
    };
    const json = JSON.stringify(compact);
    const b64 = btoa(unescape(encodeURIComponent(json)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    return `TITOU-${b64}`;
  }

  function decodeHeroCode(raw) {
    if (!raw) return null;
    let code = String(raw).trim();
    const match = code.match(/[?&]save=([^&#]+)/);
    if (match) code = decodeURIComponent(match[1]);
    if (code.startsWith('TITOU-')) code = code.slice(6);
    code = code.replace(/-/g, '+').replace(/_/g, '/');
    while (code.length % 4) code += '=';
    try {
      const json = decodeURIComponent(escape(atob(code)));
      const d = JSON.parse(json);
      if (typeof d.x !== 'number') return null;
      return {
        name: typeof d.n === 'string' && d.n.trim() ? d.n.trim() : null,
        xp: d.x || 0,
        gems: d.g || 0,
        bestCombo: d.c || 0,
        stars: {
          pythagore: d.s?.[0] || 0,
          relatifs: d.s?.[1] || 0,
          stats: d.s?.[2] || 0,
          boss: d.s?.[3] || 0
        },
        badges: Array.isArray(d.b) ? d.b : []
      };
    } catch {
      return null;
    }
  }

  function buildMagicLink() {
    const code = encodeHeroCode(profile);
    const url = new URL(window.location.href);
    url.search = `?save=${encodeURIComponent(code)}`;
    url.hash = '';
    return url.toString();
  }

  // ==================== SYNC CLOUD AUTOMATIQUE (FIREBASE RTDB) ====================
  const DEFAULT_CLOUD_URL = 'https://math-quest-titou-default-rtdb.europe-west1.firebasedatabase.app';
  const DEFAULT_FAMILY_KEY = 'famille-titou-4e';
  const CLOUD_CFG_KEY = 'mathquest_titou_cloud_v1';

  function getCloudConfig() {
    try {
      const saved = JSON.parse(localStorage.getItem(CLOUD_CFG_KEY) || 'null');
      if (saved && saved.url) return saved;
    } catch {}
    return { url: DEFAULT_CLOUD_URL, key: DEFAULT_FAMILY_KEY };
  }

  function saveCloudConfig(url, key) {
    const cleanUrl = url.trim().replace(/\/+$/, '');
    const cleanKey = key.trim().replace(/[^a-zA-Z0-9_-]/g, '') || DEFAULT_FAMILY_KEY;
    if (!cleanUrl) {
      localStorage.removeItem(CLOUD_CFG_KEY);
      return getCloudConfig();
    }
    const cfg = { url: cleanUrl, key: cleanKey };
    localStorage.setItem(CLOUD_CFG_KEY, JSON.stringify(cfg));
    return cfg;
  }

  function setSyncIndicator(state) {
    const btn = $('btn-sync');
    if (!btn) return;
    if (state === 'ok') {
      btn.innerHTML = '☁️ <span>Sync ✓</span>';
      btn.title = 'Connecté au Cloud Firebase (PC ↔ Mobile automatique)';
    } else if (state === 'syncing') {
      btn.innerHTML = '🔄 <span>Sync...</span>';
    } else {
      btn.innerHTML = '☁️ <span>Hors-ligne</span>';
      btn.title = 'Sauvegardé localement — synchronisera au retour du réseau';
    }
  }

  async function pushProfileToCloud(p = profile) {
    const cfg = getCloudConfig();
    if (!cfg || !cfg.url || !p || !p.id) return false;
    try {
      const res = await fetch(`${cfg.url}/families/${cfg.key}/profiles/${encodeURIComponent(p.id)}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...p, updatedAt: Date.now() })
      });
      if (res.ok) {
        // Mettre à jour l'écran de choix de profil s'il est encore ouvert
      if (!$('welcome-overlay').classList.contains('hidden')) {
        renderWelcomeOverlay();
      }

      setSyncIndicator('ok');
        return true;
      }
      setSyncIndicator('offline');
      return false;
    } catch {
      setSyncIndicator('offline');
      return false;
    }
  }

  async function deleteProfileFromCloud(id) {
    const cfg = getCloudConfig();
    if (!cfg || !cfg.url || !id) return;
    try {
      await fetch(`${cfg.url}/families/${cfg.key}/profiles/${encodeURIComponent(id)}.json`, {
        method: 'DELETE'
      });
    } catch {}
  }

  async function pushCloudSave() {
    return pushProfileToCloud(profile);
  }

  async function pullAndMergeCloud(silent = true) {
    const cfg = getCloudConfig();
    if (!cfg || !cfg.url) return false;
    setSyncIndicator('syncing');
    try {
      const res = await fetch(`${cfg.url}/families/${cfg.key}/profiles.json`);
      if (!res.ok) {
        setSyncIndicator('offline');
        return false;
      }
      const remoteAll = await res.json();
      const remoteMap = remoteAll && typeof remoteAll === 'object' ? remoteAll : {};

      // 1) Fusionner tous les profils distants dans le store local
      for (const [id, rProf] of Object.entries(remoteMap)) {
        if (!rProf || typeof rProf !== 'object') continue;
        const cleanRemote = normalizeProfile({ ...rProf, id }, rProf.name || id);
        if (store.profiles[id]) {
          store.profiles[id] = mergeProfiles(store.profiles[id], cleanRemote);
        } else {
          store.profiles[id] = cleanRemote;
        }
      }

      // Mettre à jour le profil actif après fusion
      if (!store.profiles[store.activeId]) {
        store.activeId = Object.keys(store.profiles)[0];
      }
      profile = store.profiles[store.activeId];
      persistSave(false);
      renderHUD();

      // 2) Pousser les profils locaux nouveaux ou plus avancés vers le Cloud
      const pushTasks = [];
      for (const [id, lProf] of Object.entries(store.profiles)) {
        const rProf = remoteMap[id];
        const needsPush =
          !rProf ||
          (lProf.xp || 0) > (rProf.xp || 0) ||
          (lProf.gems || 0) > (rProf.gems || 0) ||
          (lProf.badges || []).length > (rProf.badges || []).length;
        if (needsPush) {
          pushTasks.push(pushProfileToCloud(lProf));
        }
      }
      if (pushTasks.length > 0) {
        await Promise.all(pushTasks);
      }

      // Mettre à jour l'écran de choix de profil s'il est encore ouvert
      if (!$('welcome-overlay').classList.contains('hidden')) {
        renderWelcomeOverlay();
      }

      setSyncIndicator('ok');
      if (!silent) showSlashBanner('☁️ SYNC CLOUD RÉUSSIE !');
      return true;
    } catch {
      setSyncIndicator('offline');
      return false;
    }
  }

  function xpNeededForLevel(lvl) {
    // Progression fluide de 1 à 100 : rapide au début, épique vers le Niv. 100 !
    return 100 + (lvl - 1) * 10;
  }

  function getLevelInfo(xp) {
    const MAX_LVL = 100;
    let remaining = Math.max(0, Math.floor(xp || 0));
    let level = 1;
    while (level < MAX_LVL) {
      const need = xpNeededForLevel(level);
      if (remaining < need) break;
      remaining -= need;
      level++;
    }
    const needNext = xpNeededForLevel(level);
    const pct = level >= MAX_LVL ? 100 : Math.round((remaining / needNext) * 100);
    const xpToNext = level >= MAX_LVL ? 0 : needNext - remaining;

    let rank = RANKS[0];
    let nextRank = null;
    for (let i = 0; i < RANKS.length; i++) {
      if (level >= RANKS[i].lvl) {
        rank = RANKS[i];
        nextRank = RANKS[i + 1] || null;
      }
    }
    return { level, pct, rank, nextRank, xpToNext };
  }

  // ==================== RÉGLAGES & ÉTAT DE PARTIE ====================
  const settings = {
    diff: 1,
    inputMode: 'qcm', // 'qcm' | 'type'
    timerMode: 'off'  // 'off' | 'on'
  };

  let session = null;
  let timerInterval = null;

  // ==================== RÉFÉRENCES DOM ====================
  const $ = (id) => document.getElementById(id);
  const screens = {
    menu: $('screen-menu'),
    game: $('screen-game'),
    result: $('screen-result')
  };

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove('active'));
    screens[name].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== MISE À JOUR HUD ====================
  function renderHUD() {
    const { level, pct, rank } = getLevelInfo(profile.xp);
    $('hud-avatar').textContent = rank.icon;
    $('hud-player-name').textContent = profile.name;
    $('hud-rank-name').textContent = rank.name;
    $('hud-level').textContent = level;
    $('hud-xp-fill').style.width = `${pct}%`;
    $('hud-gems').textContent = profile.gems;
    $('hud-best-combo').textContent = profile.bestCombo;
    $('hud-badge-count').textContent = `${profile.badges.length}/${BADGES.length}`;
    $('btn-sound').textContent = profile.sound ? '🔊' : '🔇';
    SoundFX.setEnabled(profile.sound);

    // Prénom dynamique partout dans l'interface
    const heroName = $('hero-player-name');
    if (heroName) heroName.textContent = profile.name;
    const battleName = $('battle-player-name');
    if (battleName) battleName.textContent = profile.name;
    const badgesName = $('badges-player-name');
    if (badgesName) badgesName.textContent = profile.name;

    // Étoiles sur les cartes du menu
    ['pythagore', 'relatifs', 'stats', 'boss'].forEach((w) => {
      const s = profile.stars[w] || 0;
      const el = $(`stars-${w}`);
      if (el) el.textContent = '★'.repeat(s) + '☆'.repeat(3 - s);
    });
  }

  // ==================== EFFETS VISUELS (PARTICULES & SLASH) ====================
  function spawnParticles(color = '#facc15', count = 22) {
    const layer = $('fx-layer');
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.45;
    const colors = [color, '#facc15', '#38bdf8', '#22c55e', '#f97316'];

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const angle = Math.random() * Math.PI * 2;
      const dist = 70 + Math.random() * 190;
      p.style.left = `${cx}px`;
      p.style.top = `${cy}px`;
      p.style.background = colors[i % colors.length];
      p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      p.style.setProperty('--dy', `${Math.sin(angle) * dist - 40}px`);
      layer.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }
  }

  function triggerSpeedLines() {
    const el = $('speed-lines');
    if (!el) return;
    el.classList.remove('hidden');
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
    setTimeout(() => el.classList.add('hidden'), 680);
  }

  function playAttackAnimation({ isCrit, dmg, combo }) {
    const stage = $('battle-stage');
    const pSprite = $('player-sprite');
    const eSprite = $('enemy-sprite');
    const beam = $('battle-beam');
    const dmgLayer = $('floating-dmg-layer');

    // 1. Le héros bondit
    pSprite.classList.remove('lunge');
    void pSprite.offsetWidth;
    pSprite.classList.add('lunge');

    // 2. Rayon d'énergie vers l'ennemi
    beam.className = 'battle-fx-beam';
    void beam.offsetWidth;
    beam.classList.add(isCrit ? 'fire-crit' : 'fire-normal');

    // 3. Impact sur le boss + secousse d'arène + nombre de dégâts flottant
    setTimeout(() => {
      eSprite.classList.remove('hit-flash');
      void eSprite.offsetWidth;
      eSprite.classList.add('hit-flash');

      stage.classList.remove('stage-shake');
      void stage.offsetWidth;
      stage.classList.add('stage-shake');

      const pop = document.createElement('div');
      pop.className = `dmg-pop ${isCrit ? 'crit' : ''}`;
      const powerNum = dmg * 10 + combo * 15;
      pop.textContent = isCrit ? `💥 CRIT -${powerNum} !!` : `-${powerNum} !`;
      dmgLayer.appendChild(pop);
      setTimeout(() => pop.remove(), 980);

      if (session && session.enemyHp <= 0) {
        eSprite.classList.add('ko');
      }
    }, 150);

    // 4. Lignes de vitesse manga sur Coup Critique ou Combo >= 4
    if (isCrit || combo >= 4) {
      triggerSpeedLines();
    }
  }

  function updatePlayerBattleAura() {
    const pSprite = $('player-sprite');
    if (!pSprite) return;
    const { level, rank } = getLevelInfo(profile.xp);
    pSprite.innerHTML = renderHeroAvatarSVG(rank);
    pSprite.classList.remove('aura-blue', 'aura-gold', 'aura-cosmic');
    const combo = session ? session.combo : 0;
    if (rank.style === 'ssj6' || combo >= 5) pSprite.classList.add('aura-cosmic');
    else if (level >= 35 || combo >= 3) pSprite.classList.add('aura-gold');
    else if (combo >= 2) pSprite.classList.add('aura-blue');

    const rankMini = $('battle-player-rank');
    if (rankMini) rankMini.textContent = `Niv. ${level}`;
  }
  function showSlashBanner(text) {
    const el = document.createElement('div');
    el.className = 'slash-banner';
    el.textContent = text;
    $('fx-layer').appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  // ==================== DÉMARRAGE D'UNE QUÊTE ====================
  function startQuest(world) {
    SoundFX.click();
    stopTimer();

    const meta = WORLD_META[world];
    const enemy = meta.enemies[Math.min(settings.diff - 1, meta.enemies.length - 1)];

    session = {
      world,
      diff: settings.diff,
      questions: MathGen.generateQuest(world, settings.diff, QUEST_LENGTH),
      index: 0,
      results: [], // 'correct' | 'wrong'
      score: 0,
      combo: 0,
      maxCombo: 0,
      ultCharge: 0, // 0..3
      xpEarned: 0,
      gemsEarned: 0,
      enemyHp: 100,
      answered: false,
      hintUsed: false,
      enemy,
      meta
    };

    $('game-world-label').textContent = meta.label;
    $('enemy-name').textContent = enemy.name;
    $('enemy-sprite').textContent = enemy.sprite;
    $('enemy-sprite').classList.remove('ko');
    updatePlayerBattleAura();
    updateBattleBars();
    renderProgressDots();
    showScreen('game');
    renderCurrentQuestion();
  }

  function renderProgressDots() {
    const wrap = $('progress-dots');
    wrap.innerHTML = '';
    for (let i = 0; i < QUEST_LENGTH; i++) {
      const dot = document.createElement('div');
      dot.className = 'p-dot';
      if (i < session.results.length) dot.classList.add(session.results[i]);
      else if (i === session.index) dot.classList.add('current');
      wrap.appendChild(dot);
    }
    $('game-q-counter').textContent = `Défi ${Math.min(session.index + 1, QUEST_LENGTH)} / ${QUEST_LENGTH}`;
  }

  function updateBattleBars() {
    $('enemy-hp-fill').style.width = `${Math.max(0, session.enemyHp)}%`;
    $('enemy-hp-text').textContent = Math.max(0, Math.round(session.enemyHp));
    $('ult-fill').style.width = `${Math.min(100, Math.round((session.ultCharge / 3) * 100))}%`;
    $('live-combo').textContent = session.combo;
    const comboPill = $('combo-pill');
    comboPill.classList.toggle('hot', session.combo >= 3);
  }

  // ==================== AFFICHAGE QUESTION ====================
  function renderCurrentQuestion() {
    stopTimer();
    const q = session.questions[session.index];
    session.answered = false;
    session.hintUsed = false;

    renderProgressDots();

    $('q-category').textContent = q.category;
    $('q-story').textContent = q.story;
    $('q-prompt').textContent = q.prompt;
    $('q-visual').innerHTML = q.visualHtml || '';

    // Outil interactif de tri pour la médiane (Pokémon)
    const tools = $('q-helper-tools');
    tools.innerHTML = '';
    if (q.canSortCards) {
      const sortBtn = document.createElement('button');
      sortBtn.type = 'button';
      sortBtn.className = 'tool-chip-btn';
      sortBtn.textContent = '🔀 Trier les Pokémon (du plus petit au plus grand)';
      sortBtn.addEventListener('click', () => {
        SoundFX.click();
        const row = $('poke-cards-row');
        if (!row) return;
        const cards = [...row.querySelectorAll('.poke-stat-card')];
        cards.sort((a, b) => Number(a.dataset.val) - Number(b.dataset.val));
        row.innerHTML = '';
        cards.forEach((c) => row.appendChild(c));
        // Mettre en évidence le(s) milieu(x)
        const n = cards.length;
        if (n % 2 === 1) {
          cards[Math.floor(n / 2)].classList.add('highlight-mid');
        } else {
          cards[n / 2 - 1].classList.add('highlight-mid');
          cards[n / 2].classList.add('highlight-mid');
        }
        sortBtn.disabled = true;
        sortBtn.textContent = '✅ Cartes triées ! Repère le milieu';
      });
      tools.appendChild(sortBtn);
    }

    // Reset indice & feedback
    $('hint-box').classList.add('hidden');
    $('hint-box').innerHTML = '';
    $('btn-hint').disabled = false;
    $('feedback-box').classList.add('hidden');
    $('feedback-box').classList.remove('is-correct', 'is-wrong');

    // Mode QCM vs Mode Clavier
    const useQcm = settings.inputMode === 'qcm' || q.forceQcm;
    const qcmBox = $('answers-qcm');
    const typeForm = $('answer-type-form');

    if (useQcm) {
      qcmBox.classList.remove('hidden');
      typeForm.classList.add('hidden');
      qcmBox.innerHTML = '';
      q.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'answer-btn';
        btn.dataset.val = choice;
        btn.innerHTML = `<span class="answer-key">${idx + 1}</span><span>${choice}</span>`;
        btn.addEventListener('click', () => handleAnswer(choice, btn));
        qcmBox.appendChild(btn);
      });
    } else {
      qcmBox.classList.add('hidden');
      typeForm.classList.remove('hidden');
      const input = $('answer-input');
      input.value = '';
      input.disabled = false;
      setTimeout(() => input.focus(), 50);
    }

    // Chrono Turbo (si activé)
    const timerPill = $('timer-pill');
    if (settings.timerMode === 'on') {
      const baseTime = q.topic === 'relatifs' ? 18 : 28;
      let left = baseTime;
      timerPill.classList.remove('hidden', 'urgent');
      $('live-timer').textContent = left;
      timerInterval = setInterval(() => {
        left--;
        $('live-timer').textContent = left;
        if (left <= 5) timerPill.classList.add('urgent');
        if (left <= 0) {
          stopTimer();
          handleAnswer('__TIMEOUT__', null);
        }
      }, 1000);
    } else {
      timerPill.classList.add('hidden');
    }
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // ==================== VALIDATION DE RÉPONSE ====================
  function normalizeInput(str) {
    return String(str)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(',', '.')
      .replace('−', '-');
  }

  function isCorrectAnswer(userVal, q) {
    if (userVal === '__TIMEOUT__') return false;
    if (q.forceQcm) return userVal === q.answer;
    const uNorm = normalizeInput(userVal);
    const aNorm = normalizeInput(q.answer);
    if (uNorm === aNorm) return true;
    const uNum = Number(uNorm);
    const aNum = Number(aNorm);
    if (Number.isFinite(uNum) && Number.isFinite(aNum)) {
      return Math.abs(uNum - aNum) < 0.05;
    }
    return false;
  }

  function handleAnswer(userVal, clickedBtn) {
    if (session.answered) return;
    session.answered = true;
    stopTimer();

    const q = session.questions[session.index];
    const ok = isCorrectAnswer(userVal, q);

    // Désactiver les boutons / input
    const qcmBtns = [...$('answers-qcm').querySelectorAll('.answer-btn')];
    qcmBtns.forEach((b) => {
      b.disabled = true;
      if (b.dataset.val === q.answer) b.classList.add('correct');
    });
    if (clickedBtn && !ok) clickedBtn.classList.add('wrong');
    $('answer-input').disabled = true;
    $('btn-hint').disabled = true;

    const fbBox = $('feedback-box');
    const fbBadge = $('feedback-badge');
    const fbXp = $('feedback-xp');
    const fbExplain = $('feedback-explain');

    if (ok) {
      session.score++;
      session.combo++;
      if (session.combo > session.maxCombo) session.maxCombo = session.combo;
      session.ultCharge++;
      session.results.push('correct');

      const isCrit = session.ultCharge >= 3;
      const baseXp = 35 + settings.diff * 15;
      const comboBonus = Math.min(session.combo * 10, 60);
      const gainedXp = baseXp + comboBonus + (isCrit ? 40 : 0);
      const gainedGems = 8 + settings.diff * 3 + (isCrit ? 10 : 0);

      session.xpEarned += gainedXp;
      session.gemsEarned += gainedGems;

      const dmg = isCrit ? 24 : 13;
      session.enemyHp = Math.max(0, session.enemyHp - dmg);

      if (isCrit) {
        session.ultCharge = 0;
        SoundFX.crit();
        spawnParticles('#f97316', 44);
        const { rank } = getLevelInfo(profile.xp);
        const critLabel =
          rank.style === 'ssj6' ? '🌌 KAMEHAMEHA OMNI-INFINI !!'
          : rank.lvl >= 35 ? '⚡ SUPER KAMEHAMEHA CRITIQUE !!'
          : session.world === 'boss' ? '👊 SERIOUS PUNCH !!'
          : session.world === 'relatifs' ? '⚔️ DRAGON SLAYER CRITIQUE !'
          : session.world === 'pythagore' ? '💎 COUP CRITIQUE DIAMANT !'
          : '⚡ ATTAQUE SUPER EFFICACE !';
        showSlashBanner(critLabel);
        $('battle-action-text').textContent = `CRIT !`;
      } else {
        SoundFX.correct(session.combo);
        spawnParticles('#22c55e', 24);
        $('battle-action-text').textContent = session.combo >= 2 ? `COMBO x${session.combo} !` : `TOUCHÉ !`;
      }

      playAttackAnimation({ isCrit, dmg, combo: session.combo });
      updatePlayerBattleAura();

      fbBox.classList.add('is-correct');
      fbBadge.textContent = isCrit ? '💥 COUP CRITIQUE !' : `✅ BIEN JOUÉ ${profile.name.toUpperCase()} !`;
      fbXp.textContent = `+${gainedXp} XP • +${gainedGems} 💎`;
      fbExplain.innerHTML = q.explain;
    } else {
      session.combo = 0;
      session.ultCharge = 0;
      session.results.push('wrong');
      SoundFX.wrong();

      const card = $('question-card');
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');

      $('battle-action-text').textContent = userVal === '__TIMEOUT__' ? '⏱️ TEMPS ÉCOULÉ' : '🛡️ BLOQUÉ !';

      fbBox.classList.add('is-wrong');
      fbBadge.textContent =
        userVal === '__TIMEOUT__'
          ? `⏱️ Temps écoulé ! La réponse était : ${q.answer}`
          : `❌ Pas tout à fait ! Réponse : ${q.answer}`;
      fbXp.textContent = 'Continue, tu vas l’avoir !';
      fbExplain.innerHTML = q.explain;
      $('btn-feedback-course').classList.remove('hidden');
    }

    if (ok) {
      $('btn-feedback-course').classList.add('hidden');
    }

    updateBattleBars();
    renderProgressDots();

    $('btn-next').textContent =
      session.index === QUEST_LENGTH - 1 ? '🏆 Voir mon résultat →' : 'Défi suivant →';
    fbBox.classList.remove('hidden');
  }

  function nextQuestion() {
    SoundFX.click();
    if (session.index < QUEST_LENGTH - 1) {
      session.index++;
      renderCurrentQuestion();
    } else {
      finishQuest();
    }
  }

  // ==================== FIN DE QUÊTE & BADGES ====================
  function finishQuest() {
    stopTimer();
    const oldLevel = getLevelInfo(profile.xp).level;

    profile.xp += session.xpEarned;
    profile.gems += session.gemsEarned;
    if (session.maxCombo > profile.bestCombo) profile.bestCombo = session.maxCombo;

    // Calcul des étoiles
    const stars = session.score >= 7 ? 3 : session.score >= 5 ? 2 : session.score >= 3 ? 1 : 0;
    if (stars > (profile.stars[session.world] || 0)) {
      profile.stars[session.world] = stars;
    }

    // Vérification des nouveaux badges
    const newlyUnlocked = [];
    const unlock = (id) => {
      if (!profile.badges.includes(id)) {
        profile.badges.push(id);
        const b = BADGES.find((x) => x.id === id);
        if (b) newlyUnlocked.push(b);
      }
    };

    unlock('first_quest');
    if (session.world === 'pythagore' && stars === 3) unlock('pyth_master');
    if (session.world === 'relatifs' && stars === 3) unlock('rel_master');
    if (session.world === 'stats' && stars === 3) unlock('stat_master');
    if (session.world === 'boss' && session.score >= 6) unlock('boss_master');
    if (session.maxCombo >= 5) unlock('combo_5');
    if (session.score === QUEST_LENGTH) unlock('perfect');
    if (settings.timerMode === 'on' && session.score >= 5) unlock('turbo_win');

    persistSave();
    renderHUD();

    const newInfo = getLevelInfo(profile.xp);
    if (newInfo.level > oldLevel) {
      SoundFX.levelUp();
      triggerSpeedLines();
      showSlashBanner(
        newInfo.level >= 100
          ? '🌌 NIVEAU 100 : SUPER SAIYAN 6 !'
          : `⬆️ NIVEAU ${newInfo.level} ATTEINT !`
      );
    } else {
      SoundFX.victory();
    }
    spawnParticles('#facc15', 45);

    // Remplir l'écran résultat
    $('result-trophy').textContent = stars === 3 ? '🏆' : stars === 2 ? '⚔️' : '💪';
    $('result-title').textContent =
      session.score === QUEST_LENGTH
        ? 'SANS-FAUTE LÉGENDAIRE !'
        : stars >= 2
        ? 'QUÊTE RÉUSSIE !'
        : 'BON ENTRAÎNEMENT !';
    $('result-subtitle').textContent =
      stars === 3
        ? `Même Saitama serait impressionné, ${profile.name} !`
        : stars === 2
        ? 'Solide ! Encore un petit effort pour les 3 étoiles.'
        : 'Tu progresses à chaque essai — jette un œil au Grimoire si besoin !';

    $('result-stars').textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    $('res-score').textContent = `${session.score} / ${QUEST_LENGTH}`;
    $('res-xp').textContent = `+${session.xpEarned} XP`;
    $('res-gems').textContent = `+${session.gemsEarned} 💎`;
    $('res-combo').textContent = `🔥 x${session.maxCombo}`;

    const badgeBox = $('unlocked-badges-box');
    const badgeList = $('unlocked-list');
    if (newlyUnlocked.length > 0) {
      badgeBox.classList.remove('hidden');
      badgeList.innerHTML = newlyUnlocked
        .map((b) => `<span class="unlocked-chip">${b.icon} ${b.title}</span>`)
        .join('');
    } else {
      badgeBox.classList.add('hidden');
    }

    showScreen('result');
  }

  // ==================== MODALES (GRIMOIRE, BADGES, SYNC & PROFILS) ====================
  function openModal(id) {
    SoundFX.click();
    if (id === 'modal-badges') renderBadgesModal();
    if (id === 'modal-sync') renderSyncModal();
    if (id === 'modal-profiles') {
      renderProfilesModal();
      pullAndMergeCloud(true).then(() => renderProfilesModal());
    }
    $(id).classList.remove('hidden');
  }

  function renderProfilesModal() {
    const list = $('profiles-list');
    const all = Object.values(store.profiles).sort((a, b) => (b.xp || 0) - (a.xp || 0));
    const canDelete = all.length > 1;

    list.innerHTML = all
      .map((p, idx) => {
        const info = getLevelInfo(p.xp || 0);
        const totalStars = Object.values(p.stars || {}).reduce((s, v) => s + (v || 0), 0);
        const isActive = p.id === store.activeId;
        const medal = idx === 0 && all.length > 1 ? '🥇 ' : idx === 1 ? '🥈 ' : idx === 2 ? '🥉 ' : '';
        return `
          <div class="profile-row ${isActive ? 'active' : ''}" data-profile-id="${p.id}">
            <div class="profile-row-left">
              <div class="profile-row-ico">${info.rank.icon}</div>
              <div>
                <div class="profile-row-name">
                  ${medal}${p.name}
                  ${isActive ? '<span class="active-tag">ACTIF</span>' : ''}
                </div>
                <div class="profile-row-meta">
                  Niv. ${info.level} (${info.rank.name}) • ${p.xp || 0} XP • ${totalStars}/12 ★ • ${(p.badges || []).length}/${BADGES.length} 🏆
                </div>
              </div>
            </div>
            ${
              canDelete
                ? `<button type="button" class="profile-del-btn" data-del-id="${p.id}" title="Supprimer ce compte">🗑️</button>`
                : ''
            }
          </div>
        `;
      })
      .join('');

    list.querySelectorAll('.profile-row').forEach((row) => {
      row.addEventListener('click', (e) => {
        const delBtn = e.target.closest('.profile-del-btn');
        if (delBtn) {
          e.stopPropagation();
          const id = delBtn.dataset.delId;
          const target = store.profiles[id];
          if (target && confirm(`Supprimer définitivement le compte "${target.name}" ?`)) {
            SoundFX.click();
            deleteProfile(id);
            renderProfilesModal();
          }
          return;
        }
        const id = row.dataset.profileId;
        SoundFX.correct(1);
        switchProfile(id);
        closeModal('modal-profiles');
      });
    });
  }

  function renderSyncModal() {
    $('sync-code-out').value = encodeHeroCode(profile);
    $('sync-code-in').value = '';
    $('sync-status-msg').textContent = '';
    $('sync-status-msg').classList.remove('error');
    const cfg = getCloudConfig();
    if (cfg) {
      $('cloud-url-input').value = cfg.url || '';
      $('cloud-key-input').value = cfg.key || 'titou-4e';
      $('cloud-status-msg').textContent = `✅ Sync Cloud active (profil : ${cfg.key})`;
      $('cloud-status-msg').classList.remove('error');
    }
  }

  function closeModal(id) {
    $(id).classList.add('hidden');
  }

  function renderBadgesModal() {
    // 1. Grille des 12 Transformations (Niv. 1 → 100)
    const { level, rank, nextRank, xpToNext } = getLevelInfo(profile.xp);
    const summary = $('evo-summary');
    if (summary) {
      summary.innerHTML = nextRank
        ? `🔥 Forme actuelle : <strong>${rank.icon} ${rank.name}</strong> (Niv. ${level}/100) — Encore <strong>${xpToNext} XP</strong> pour le Niv. ${level + 1} • Prochaine transfo : <strong>${nextRank.name}</strong> (Niv. ${nextRank.lvl}) !`
        : `🌌 FORME ULTIME ATTEINTE : <strong>${rank.name} (NIVEAU 100 / 100)</strong> — Tu es une légende absolue des Maths !`;
    }

    const evoGrid = $('evo-grid');
    if (evoGrid) {
      evoGrid.innerHTML = RANKS.map((r) => {
        const unlocked = level >= r.lvl;
        const isCurrent = rank.lvl === r.lvl;
        const isSSJ6 = r.lvl === 100;
        return `
          <div class="evo-card ${unlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''} ${isSSJ6 ? 'ssj6-card' : ''}">
            <div class="evo-lvl-tag">NIV. ${r.lvl}</div>
            <div class="evo-avatar-wrap">${renderHeroAvatarSVG(r)}</div>
            <div class="evo-name">${unlocked || isSSJ6 ? r.name : '???'}</div>
            <div class="evo-sub">${unlocked ? r.sub : isSSJ6 ? 'Objectif Ultime Niv. 100 !' : `Débloqué au Niv. ${r.lvl}`}</div>
          </div>
        `;
      }).join('');
    }

    // 2. Grille des 8 Trophées
    const grid = $('badges-grid');
    grid.innerHTML = BADGES.map((b) => {
      const unlocked = profile.badges.includes(b.id);
      return `
        <div class="badge-item ${unlocked ? 'unlocked' : 'locked'}">
          <div class="badge-ico">${b.icon}</div>
          <div class="badge-title">${b.title}</div>
          <div class="badge-desc">${b.desc}</div>
        </div>
      `;
    }).join('');
  }

  // ==================== ÉVÉNEMENTS ====================
  // Sélecteurs du menu
  $('diff-selector').addEventListener('click', (e) => {
    const btn = e.target.closest('.seg-btn');
    if (!btn) return;
    SoundFX.click();
    settings.diff = Number(btn.dataset.diff);
    $('diff-selector').querySelectorAll('.seg-btn').forEach((b) => b.classList.toggle('active', b === btn));
  });

  $('input-mode-selector').addEventListener('click', (e) => {
    const btn = e.target.closest('.seg-btn');
    if (!btn) return;
    SoundFX.click();
    settings.inputMode = btn.dataset.input;
    $('input-mode-selector').querySelectorAll('.seg-btn').forEach((b) => b.classList.toggle('active', b === btn));
  });

  $('timer-mode-selector').addEventListener('click', (e) => {
    const btn = e.target.closest('.seg-btn');
    if (!btn) return;
    SoundFX.click();
    settings.timerMode = btn.dataset.timer;
    $('timer-mode-selector').querySelectorAll('.seg-btn').forEach((b) => b.classList.toggle('active', b === btn));
  });

  // Lancement des mondes
  document.querySelectorAll('.world-card').forEach((card) => {
    card.addEventListener('click', () => startQuest(card.dataset.world));
  });

  // Bouton Indice
  $('btn-hint').addEventListener('click', () => {
    if (!session || session.answered) return;
    SoundFX.click();
    const q = session.questions[session.index];
    session.hintUsed = true;
    $('hint-box').innerHTML = `💡 <strong>Astuce :</strong> ${q.hint}`;
    $('hint-box').classList.remove('hidden');
    $('btn-hint').disabled = true;
  });

  // Formulaire clavier
  $('answer-type-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!session || session.answered) return;
    const val = $('answer-input').value.trim();
    if (!val) return;
    handleAnswer(val, null);
  });

  // Boutons de navigation
  $('btn-next').addEventListener('click', nextQuestion);
  $('btn-quit-game').addEventListener('click', () => {
    stopTimer();
    SoundFX.click();
    showScreen('menu');
  });
  $('btn-home-logo').addEventListener('click', () => {
    stopTimer();
    SoundFX.click();
    showScreen('menu');
  });
  $('btn-replay').addEventListener('click', () => {
    if (session) startQuest(session.world);
  });
  $('btn-back-menu').addEventListener('click', () => {
    SoundFX.click();
    showScreen('menu');
  });

  // Bouton ± pour faciliter les nombres négatifs sur mobile
  $('btn-toggle-sign').addEventListener('click', () => {
    const input = $('answer-input');
    if (input.disabled) return;
    SoundFX.click();
    const v = input.value.trim();
    input.value = v.startsWith('-') ? v.slice(1) : `-${v}`;
    input.focus();
  });

  // Topbar actions
  $('hud-rank-pill').addEventListener('click', () => openModal('modal-profiles'));
  $('btn-sync').addEventListener('click', () => openModal('modal-sync'));
  $('btn-grimoire').addEventListener('click', () => openModal('modal-grimoire'));
  $('btn-badges').addEventListener('click', () => openModal('modal-badges'));

  // Création d'un nouveau compte
  $('create-profile-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('new-profile-name');
    const name = input.value.trim();
    if (!name) return;
    SoundFX.victory();
    createProfile(name);
    input.value = '';
    renderProfilesModal();
    closeModal('modal-profiles');
    showSlashBanner(`👤 BIENVENUE ${name.toUpperCase()} !`);
  });

  // Actions de la modale Sync PC ↔ Mobile
  $('btn-share-link').addEventListener('click', async () => {
    const link = buildMagicLink();
    const msg = $('sync-status-msg');
    msg.classList.remove('error');
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MATH QUEST — Sauvegarde de Titou',
          text: 'Ouvre ce lien pour récupérer la progression de Titou !',
          url: link
        });
        msg.textContent = '✅ Lien partagé !';
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(link);
      msg.textContent = '✅ Lien magique copié ! Envoie-le sur ton téléphone ou PC.';
    } catch {
      msg.textContent = 'Copie le Code Héros ci-dessous.';
    }
  });

  $('btn-copy-link').addEventListener('click', async () => {
    const link = buildMagicLink();
    const msg = $('sync-status-msg');
    msg.classList.remove('error');
    try {
      await navigator.clipboard.writeText(link);
      SoundFX.correct(1);
      msg.textContent = '✅ Lien magique copié ! Ouvre-le sur ton autre appareil.';
    } catch {
      msg.textContent = link;
    }
  });

  $('btn-copy-code').addEventListener('click', async () => {
    const code = $('sync-code-out').value;
    const msg = $('sync-status-msg');
    msg.classList.remove('error');
    try {
      await navigator.clipboard.writeText(code);
      SoundFX.correct(1);
      msg.textContent = '✅ Code Héros copié !';
    } catch {
      $('sync-code-out').select();
    }
  });

  function importDecodedProfile(decoded) {
    if (!decoded) return false;
    // Si le code porte un nom de profil (ex: "Titou"), on fusionne dans CE profil (ou on le crée)
    if (decoded.name) {
      const targetId = slugifyId(decoded.name);
      const existing = store.profiles[targetId];
      const base = existing || defaultProfile(decoded.name, targetId);
      store.profiles[targetId] = mergeProfiles(base, decoded);
      store.activeId = targetId;
      profile = store.profiles[targetId];
    } else {
      profile = mergeProfiles(profile, decoded);
    }
    persistSave();
    renderHUD();
    return true;
  }

  $('btn-import-code').addEventListener('click', () => {
    const raw = $('sync-code-in').value.trim();
    const msg = $('sync-status-msg');
    const decoded = decodeHeroCode(raw);
    if (!decoded) {
      msg.textContent = '❌ Code ou lien invalide. Vérifie que tu as tout copié.';
      msg.classList.add('error');
      SoundFX.wrong();
      return;
    }
    importDecodedProfile(decoded);
    $('sync-code-out').value = encodeHeroCode(profile);
    msg.classList.remove('error');
    msg.textContent = `✅ Progression de ${profile.name} importée et fusionnée !`;
    SoundFX.victory();
    showSlashBanner(`☁️ ${profile.name.toUpperCase()} SYNCHRONISÉ !`);
  });

  $('btn-save-cloud').addEventListener('click', async () => {
    const url = $('cloud-url-input').value;
    const key = $('cloud-key-input').value;
    const msg = $('cloud-status-msg');
    const cfg = saveCloudConfig(url, key);
    if (!cfg) {
      msg.textContent = 'Sync Cloud désactivée.';
      return;
    }
    msg.textContent = 'Connexion en cours...';
    const ok = await pullAndMergeCloud(false);
    if (ok) {
      msg.classList.remove('error');
      msg.textContent = `✅ Sync Cloud activée et synchronisée (${cfg.key}) !`;
    } else {
      msg.classList.add('error');
      msg.textContent = '❌ Impossible de joindre Firebase. Vérifie l’URL et les règles de lecture/écriture.';
    }
  });

  $('btn-sync-now').addEventListener('click', async () => {
    const msg = $('cloud-status-msg');
    const ok = await pullAndMergeCloud(false);
    msg.classList.toggle('error', !ok);
    msg.textContent = ok ? '✅ Synchronisation effectuée !' : '❌ Configure d’abord ton URL Firebase ci-dessus.';
  });

  // ==================== PWA : INSTALLATION & SERVICE WORKER ====================
  let deferredInstallPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    $('btn-install-pwa').classList.remove('hidden');
  });

  $('btn-install-pwa').addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    const res = await deferredInstallPrompt.userChoice;
    if (res.outcome === 'accepted') {
      $('btn-install-pwa').classList.add('hidden');
    }
    deferredInstallPrompt = null;
  });

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  // Import automatique si ouvert via un Lien Magique (?save=...)
  function checkUrlSaveImport() {
    const params = new URLSearchParams(window.location.search);
    const saveParam = params.get('save');
    if (!saveParam) return false;
    const decoded = decodeHeroCode(saveParam);
    if (decoded) {
      importDecodedProfile(decoded);
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, '', cleanUrl);
      setTimeout(() => showSlashBanner(`☁️ ${profile.name.toUpperCase()} SYNCHRONISÉ !`), 300);
      return true;
    }
    return false;
  }
  $('btn-sound').addEventListener('click', () => {
    profile.sound = !profile.sound;
    persistSave();
    renderHUD();
    if (profile.sound) SoundFX.click();
  });

  // Onglets du Grimoire
  $('grimoire-tabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    SoundFX.click();
    $('grimoire-tabs').querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('active', b === btn));
    document.querySelectorAll('#modal-grimoire .tab-panel').forEach((p) => p.classList.toggle('active', p.id === btn.dataset.tab));
  });

  // Onglets de la modale Trophées & Transformations
  $('badges-tabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    SoundFX.click();
    $('badges-tabs').querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('active', b === btn));
    document.querySelectorAll('#modal-badges .tab-panel').forEach((p) => p.classList.toggle('active', p.id === btn.dataset.btab));
  });

  // Fermeture des modales
  document.querySelectorAll('.modal-close').forEach((btn) => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
  });
  document.querySelectorAll('.modal-backdrop').forEach((bg) => {
    bg.addEventListener('click', (e) => {
      if (e.target === bg) bg.classList.add('hidden');
    });
  });

  // Reset sauvegarde du compte actif
  $('btn-reset-save').addEventListener('click', () => {
    if (confirm(`Réinitialiser tout l’XP, les étoiles et les trophées de ${profile.name} ?`)) {
      profile = defaultProfile(profile.name, profile.id);
      persistSave();
      renderHUD();
      renderBadgesModal();
    }
  });

  // ==================== DOJO PÉDAGOGIQUE INTERACTIF (COURS PAS-À-PAS) ====================
  const Dojo = (() => {
    let courseId = 'pythagore';
    let stepIndex = 0;
    let openedFromGame = false;
    let checkAnswered = false;

    function render() {
      const course = MathLessons.COURSES[courseId] || MathLessons.COURSES.pythagore;
      const steps = course.steps;
      const step = steps[stepIndex];
      checkAnswered = false;

      $('dojo-title').textContent = course.title;
      $('dojo-subtitle').textContent = course.subtitle;

      // Onglets chapitres
      $('dojo-topic-tabs').querySelectorAll('.tab-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.course === courseId);
      });

      const pct = Math.round(((stepIndex + 1) / steps.length) * 100);
      $('dojo-progress-fill').style.width = `${pct}%`;
      $('dojo-step-badge').textContent = step.badge;
      $('dojo-step-title').textContent = step.title;
      $('dojo-step-content').innerHTML = step.body;
      $('dojo-step-dots').textContent = `Étape ${stepIndex + 1} / ${steps.length}`;

      // Boutons Précédent / Suivant
      $('dojo-prev-btn').disabled = stepIndex === 0;
      $('dojo-prev-btn').style.opacity = stepIndex === 0 ? '0.45' : '1';
      $('dojo-next-btn').textContent =
        stepIndex === steps.length - 1
          ? openedFromGame
            ? '⚔️ Retourner au combat !'
            : '✅ J’ai compris !'
          : 'Étape suivante →';

      // Mini-vérification interactive en dernière étape
      const checkBox = $('dojo-check-box');
      if (step.check) {
        checkBox.classList.remove('hidden');
        $('dojo-check-q').textContent = step.check.question;
        const optsWrap = $('dojo-check-opts');
        const fb = $('dojo-check-fb');
        fb.classList.add('hidden');
        fb.textContent = '';
        optsWrap.innerHTML = '';

        step.check.options.forEach((optText, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'dojo-opt-btn';
          btn.textContent = optText;
          btn.addEventListener('click', () => {
            if (checkAnswered) return;
            checkAnswered = true;
            const isOk = idx === step.check.correctIndex;
            optsWrap.querySelectorAll('.dojo-opt-btn').forEach((b, i) => {
              b.disabled = true;
              if (i === step.check.correctIndex) b.classList.add('ok');
            });
            if (!isOk) btn.classList.add('ko');

            fb.classList.remove('hidden');
            if (isOk) {
              SoundFX.correct(3);
              spawnParticles('#22c55e', 20);
              fb.style.color = '#86efac';
              fb.textContent = `✅ ${step.check.okMsg} (+30 XP bonus !)`;
              profile.xp += 30;
              persistSave();
              renderHUD();
            } else {
              SoundFX.wrong();
              fb.style.color = '#fde047';
              fb.textContent = `💡 ${step.check.retryMsg}`;
            }
          });
          optsWrap.appendChild(btn);
        });
      } else {
        checkBox.classList.add('hidden');
      }

      $('dojo-body').scrollTop = 0;
    }

    function open(topic = 'pythagore', fromGame = false) {
      SoundFX.click();
      courseId = MathLessons.COURSES[topic] ? topic : 'pythagore';
      stepIndex = 0;
      openedFromGame = fromGame;
      if (fromGame) stopTimer(); // Pause le chrono pendant que Titou lit le cours !
      render();
      $('modal-dojo').classList.remove('hidden');
    }

    function close() {
      $('modal-dojo').classList.add('hidden');
    }

    function setCourse(id) {
      if (!MathLessons.COURSES[id]) return;
      SoundFX.click();
      courseId = id;
      stepIndex = 0;
      render();
    }

    function prev() {
      if (stepIndex > 0) {
        SoundFX.click();
        stepIndex--;
        render();
      }
    }

    function next() {
      const steps = (MathLessons.COURSES[courseId] || MathLessons.COURSES.pythagore).steps;
      if (stepIndex < steps.length - 1) {
        SoundFX.click();
        stepIndex++;
        render();
      } else {
        SoundFX.correct(1);
        close();
      }
    }

    return { open, close, setCourse, prev, next };
  })();

  $('btn-open-dojo-menu').addEventListener('click', () => Dojo.open('pythagore', false));
  $('btn-need-course').addEventListener('click', () => {
    const topic = session && session.questions[session.index] ? session.questions[session.index].topic : 'pythagore';
    Dojo.open(topic, true);
  });
  $('btn-feedback-course').addEventListener('click', () => {
    const topic = session && session.questions[session.index] ? session.questions[session.index].topic : 'pythagore';
    Dojo.open(topic, true);
  });
  $('dojo-topic-tabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (btn) Dojo.setCourse(btn.dataset.course);
  });
  $('dojo-prev-btn').addEventListener('click', () => Dojo.prev());
  $('dojo-next-btn').addEventListener('click', () => Dojo.next());

  // ==================== CALCULATRICE COLLÈGE 4ÈME ====================
  const Calc = (() => {
    let expr = '';
    let lastResult = null;
    let justEvaluated = false;

    const drawer = () => $('calc-drawer');
    const isOpen = () => drawer() && !drawer().classList.contains('hidden');

    function fmtCalc(n) {
      if (!Number.isFinite(n)) return 'Erreur';
      const rounded = Math.round(n * 100000) / 100000;
      return String(rounded).replace('.', ',');
    }

    function replaceSquares(str) {
      let s = str;
      let guard = 0;
      while (s.includes('²') && guard < 30) {
        guard++;
        const idx = s.indexOf('²');
        let start = idx - 1;
        if (start < 0) throw new Error('Invalid square');

        if (s[start] === ')') {
          // Remonter jusqu'à la parenthèse ouvrante correspondante (+ éventuel Math.sqrt / Math.pow)
          let depth = 0;
          while (start >= 0) {
            if (s[start] === ')') depth++;
            else if (s[start] === '(') {
              depth--;
              if (depth === 0) break;
            }
            start--;
          }
          if (depth !== 0) throw new Error('Unmatched paren');
          // Inclure un préfixe éventuel comme Math.sqrt ou Math.pow
          while (start > 0 && /[a-zA-Z0-9_.]/.test(s[start - 1])) {
            start--;
          }
        } else if (/[0-9.]/.test(s[start])) {
          while (start > 0 && /[0-9.]/.test(s[start - 1])) {
            start--;
          }
        } else {
          throw new Error('Invalid square operand');
        }

        const operand = s.slice(start, idx);
        s = `${s.slice(0, start)}Math.pow(${operand},2)${s.slice(idx + 1)}`;
      }
      return s;
    }

    function safeEval(str) {
      let s = str
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/,/g, '.')
        .replace(/\s+/g, '')
        .trim();

      if (!s) throw new Error('Empty');

      // Auto-fermer les parenthèses oubliées à la fin (comme sur Casio Collège)
      let openCount = 0;
      for (const ch of s) {
        if (ch === '(') openCount++;
        else if (ch === ')') openCount--;
      }
      if (openCount < 0) throw new Error('Bad parens');
      if (openCount > 0) s += ')'.repeat(openCount);

      // Multiplications implicites : 2(3), 2√(9), )√(9), ²(, ²√(
      s = s
        .replace(/([0-9.)²])√\(/g, '$1*√(')
        .replace(/([0-9.)²])\(/g, '$1*(')
        .replace(/\)([0-9.])/g, ')*$1');

      // Remplacer √( par Math.sqrt(
      s = s.replace(/√\(/g, 'Math.sqrt(');

      // Remplacer les carrés ² par Math.pow(..., 2)
      s = replaceSquares(s);

      // Validation stricte avant évaluation
      const stripped = s.replace(/Math\.sqrt/g, '').replace(/Math\.pow/g, '');
      if (!/^[0-9+\-*/().,]+$/.test(stripped)) {
        throw new Error('Invalid');
      }

      // eslint-disable-next-line no-new-func
      const val = Function(`"use strict"; return (${s});`)();
      if (typeof val !== 'number' || !Number.isFinite(val)) throw new Error('NaN');
      return val;
    }

    function updateUI(historyText = null) {
      if (historyText !== null) $('calc-expr').textContent = historyText || '\u00A0';
      $('calc-display').textContent = expr || '0';
      const useBtn = $('calc-use-btn');
      const canInsert =
        screens.game.classList.contains('active') &&
        !$('answer-type-form').classList.contains('hidden') &&
        !$('answer-input').disabled &&
        lastResult !== null;
      useBtn.classList.toggle('hidden', !canInsert);
    }

    function open() {
      SoundFX.click();
      drawer().classList.remove('hidden');
      updateUI();
    }

    function close() {
      drawer().classList.add('hidden');
    }

    function toggle() {
      if (isOpen()) close();
      else open();
    }

    function pressVal(v) {
      SoundFX.click();
      const isOp = ['+', '-', '×', '÷'].includes(v);
      if (justEvaluated) {
        if (isOp && lastResult !== null) {
          expr = fmtCalc(lastResult) + v;
        } else {
          expr = v === ',' ? '0,' : v;
        }
        justEvaluated = false;
      } else {
        if (expr === 'Erreur') expr = '';
        if (v === ',' && (!expr || /[+\-×÷(]$/.test(expr))) {
          expr += '0,';
        } else {
          expr += v;
        }
      }
      updateUI();
    }

    function pressAct(act) {
      SoundFX.click();
      if (act === 'clear') {
        expr = '';
        lastResult = null;
        justEvaluated = false;
        updateUI('');
        return;
      }
      if (act === 'back') {
        if (justEvaluated) {
          expr = '';
          justEvaluated = false;
        } else if (expr.endsWith('√(')) {
          expr = expr.slice(0, -2);
        } else {
          expr = expr.slice(0, -1);
        }
        updateUI();
        return;
      }
      if (act === 'neg') {
        if (!expr || expr === 'Erreur') {
          expr = '-';
        } else if (expr.startsWith('-')) {
          expr = expr.slice(1);
        } else {
          expr = `-${expr}`;
        }
        justEvaluated = false;
        updateUI();
        return;
      }
      if (act === 'sq') {
        if (expr === 'Erreur') expr = '';
        if (justEvaluated && lastResult !== null) {
          expr = `${fmtCalc(lastResult)}²`;
          justEvaluated = false;
        } else if (expr && /[0-9)]$/.test(expr)) {
          expr += '²';
        }
        updateUI();
        return;
      }
      if (act === 'sqrt') {
        if (justEvaluated || expr === 'Erreur') {
          expr = '√(';
          justEvaluated = false;
        } else {
          expr += '√(';
        }
        updateUI();
        return;
      }
      if (act === 'eq') {
        if (!expr) return;
        try {
          const hist = `${expr} =`;
          const res = safeEval(expr);
          lastResult = res;
          expr = fmtCalc(res);
          justEvaluated = true;
          updateUI(hist);
        } catch {
          expr = 'Erreur';
          lastResult = null;
          justEvaluated = true;
          updateUI();
        }
      }
    }

    function insertIntoAnswer() {
      if (lastResult === null) return;
      const input = $('answer-input');
      if (!input || input.disabled) return;
      const rounded = Math.round(lastResult * 10) / 10;
      input.value = String(rounded).replace('.', ',');
      SoundFX.correct(1);
      close();
      input.focus();
    }

    return { isOpen, open, close, toggle, pressVal, pressAct, insertIntoAnswer, updateUI };
  })();

  $('btn-calc-top').addEventListener('click', () => Calc.toggle());
  $('btn-calc-game').addEventListener('click', () => Calc.toggle());
  $('calc-close-btn').addEventListener('click', () => Calc.close());
  $('calc-use-btn').addEventListener('click', () => Calc.insertIntoAnswer());

  $('calc-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('.c-btn');
    if (!btn) return;
    if (btn.dataset.act) Calc.pressAct(btn.dataset.act);
    else if (btn.dataset.val) Calc.pressVal(btn.dataset.val);
  });

  // Raccourcis clavier fluides (1-4 pour QCM, Entrée pour suivant)
  document.addEventListener('keydown', (e) => {
    if (Calc.isOpen()) {
      if (e.key === 'Escape') {
        Calc.close();
        return;
      }
      if (document.activeElement !== $('answer-input')) {
        if (/^[0-9()]$/.test(e.key)) { e.preventDefault(); Calc.pressVal(e.key); return; }
        if (e.key === '.' || e.key === ',') { e.preventDefault(); Calc.pressVal(','); return; }
        if (e.key === '+') { e.preventDefault(); Calc.pressVal('+'); return; }
        if (e.key === '-') { e.preventDefault(); Calc.pressVal('-'); return; }
        if (e.key === '*') { e.preventDefault(); Calc.pressVal('×'); return; }
        if (e.key === '/') { e.preventDefault(); Calc.pressVal('÷'); return; }
        if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); Calc.pressAct('eq'); return; }
        if (e.key === 'Backspace') { e.preventDefault(); Calc.pressAct('back'); return; }
      }
      return;
    }

    if (!screens.game.classList.contains('active') || !session) return;
    if (
      !$('modal-grimoire').classList.contains('hidden') ||
      !$('modal-badges').classList.contains('hidden') ||
      !$('modal-sync').classList.contains('hidden') ||
      !$('modal-profiles').classList.contains('hidden') ||
      !$('modal-dojo').classList.contains('hidden')
    ) {
      if (e.key === 'Escape') {
        closeModal('modal-grimoire');
        closeModal('modal-badges');
        closeModal('modal-sync');
        closeModal('modal-profiles');
        closeModal('modal-dojo');
      }
      return;
    }

    if (session.answered && e.key === 'Enter') {
      e.preventDefault();
      nextQuestion();
      return;
    }

    if (!session.answered && ['1', '2', '3', '4'].includes(e.key)) {
      const qcmBox = $('answers-qcm');
      if (!qcmBox.classList.contains('hidden')) {
        const idx = Number(e.key) - 1;
        const btn = qcmBox.querySelectorAll('.answer-btn')[idx];
        if (btn && !btn.disabled) btn.click();
      }
    }
  });

  // Auto-sync au retour sur l'appli ou au retour du réseau
  window.addEventListener('online', () => pullAndMergeCloud(true));
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) pullAndMergeCloud(true);
  });

  // ==================== ÉCRAN "QUI JOUE ?" AU DÉMARRAGE ====================
  function renderWelcomeOverlay() {
    const grid = $('welcome-profiles-grid');
    if (!grid) return;
    const all = Object.values(store.profiles).sort((a, b) => (b.xp || 0) - (a.xp || 0));
    grid.innerHTML = all
      .map((p) => {
        const info = getLevelInfo(p.xp || 0);
        const totalStars = Object.values(p.stars || {}).reduce((s, v) => s + (v || 0), 0);
        return `
          <button type="button" class="welcome-card" data-pid="${p.id}">
            <div class="welcome-card-ico">${info.rank.icon}</div>
            <div class="welcome-card-name">${p.name}</div>
            <div class="welcome-card-meta">Niv. ${info.level} • ${p.xp || 0} XP • ${totalStars}★</div>
          </button>
        `;
      })
      .join('');

    grid.querySelectorAll('.welcome-card').forEach((card) => {
      card.addEventListener('click', () => {
        SoundFX.correct(2);
        switchProfile(card.dataset.pid);
        $('welcome-overlay').classList.add('hidden');
      });
    });
  }

  function showWelcomePicker() {
    renderWelcomeOverlay();
    $('welcome-overlay').classList.remove('hidden');
  }

  $('welcome-create-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('welcome-new-name');
    const name = input.value.trim();
    if (!name) return;
    SoundFX.victory();
    createProfile(name);
    input.value = '';
    $('welcome-overlay').classList.add('hidden');
    showSlashBanner(`👤 BIENVENUE ${name.toUpperCase()} !`);
  });

  // Init
  const importedFromUrl = checkUrlSaveImport();
  renderHUD();
  if (!importedFromUrl) {
    showWelcomePicker();
  }
  pullAndMergeCloud(true);
})();
