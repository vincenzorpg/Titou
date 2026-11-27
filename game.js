// Moteur principal de MATH QUEST : Édition Titou (4ème)

(() => {
  const LEGACY_SAVE_KEY = 'mathquest_titou_4e_v1';
  const STORE_KEY = 'mathquest_accounts_v2';
  const QUEST_LENGTH = 8;

  // Rangs évolutifs mêlant Minecraft, Pokémon, Berserk & One Punch Man
  const RANKS = [
    { lvl: 1, name: 'Villageois', icon: '⛏️' },
    { lvl: 2, name: 'Dresseur', icon: '⚡' },
    { lvl: 4, name: 'Classe C', icon: '🥊' },
    { lvl: 6, name: 'Épéiste Noir', icon: '⚔️' },
    { lvl: 9, name: 'Héros Classe S', icon: '🔥' },
    { lvl: 12, name: 'Légende 4ème', icon: '👑' }
  ];

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

      setSyncIndicator('ok');
      if (!silent) showSlashBanner('☁️ SYNC CLOUD RÉUSSIE !');
      return true;
    } catch {
      setSyncIndicator('offline');
      return false;
    }
  }

  function getLevelInfo(xp) {
    // 150 XP par niveau (progression rapide et motivante !)
    const perLevel = 150;
    const level = Math.floor(xp / perLevel) + 1;
    const intoLevel = xp % perLevel;
    const pct = Math.round((intoLevel / perLevel) * 100);
    let rank = RANKS[0];
    for (const r of RANKS) {
      if (level >= r.lvl) rank = r;
    }
    return { level, pct, rank };
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
    $('player-sprite').textContent = meta.playerSprite;
    $('enemy-name').textContent = enemy.name;
    $('enemy-sprite').textContent = enemy.sprite;
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
      const baseXp = 20 + settings.diff * 10;
      const comboBonus = Math.min(session.combo * 5, 30);
      const gainedXp = baseXp + comboBonus + (isCrit ? 20 : 0);
      const gainedGems = 5 + settings.diff * 2 + (isCrit ? 5 : 0);

      session.xpEarned += gainedXp;
      session.gemsEarned += gainedGems;

      const dmg = isCrit ? 24 : 13;
      session.enemyHp = Math.max(0, session.enemyHp - dmg);

      if (isCrit) {
        session.ultCharge = 0;
        SoundFX.crit();
        spawnParticles('#f97316', 36);
        const critLabel =
          session.world === 'boss' ? '👊 SERIOUS PUNCH !!'
          : session.world === 'relatifs' ? '⚔️ DRAGON SLAYER CRITIQUE !'
          : session.world === 'pythagore' ? '💎 COUP CRITIQUE DIAMANT !'
          : '⚡ ATTAQUE SUPER EFFICACE !';
        showSlashBanner(critLabel);
        $('battle-action-text').textContent = `-${dmg}% CRIT !`;
      } else {
        SoundFX.correct(session.combo);
        spawnParticles('#22c55e', 16);
        $('battle-action-text').textContent = `-${dmg}% PV`;
      }

      // Animation ennemi touché
      const eSprite = $('enemy-sprite');
      eSprite.classList.remove('hit-flash');
      void eSprite.offsetWidth;
      eSprite.classList.add('hit-flash');

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

    const newLevel = getLevelInfo(profile.xp).level;
    if (newLevel > oldLevel) {
      SoundFX.levelUp();
      showSlashBanner(`⬆️ NIVEAU ${newLevel} ATTEINT !`);
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
    if (!saveParam) return;
    const decoded = decodeHeroCode(saveParam);
    if (decoded) {
      importDecodedProfile(decoded);
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, '', cleanUrl);
      setTimeout(() => showSlashBanner(`☁️ ${profile.name.toUpperCase()} SYNCHRONISÉ !`), 300);
    }
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
    document.querySelectorAll('.tab-panel').forEach((p) => p.classList.toggle('active', p.id === btn.dataset.tab));
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

  // Raccourcis clavier fluides (1-4 pour QCM, Entrée pour suivant)
  document.addEventListener('keydown', (e) => {
    if (!screens.game.classList.contains('active') || !session) return;
    if (!$('modal-grimoire').classList.contains('hidden') || !$('modal-badges').classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeModal('modal-grimoire');
        closeModal('modal-badges');
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

  // Init
  checkUrlSaveImport();
  renderHUD();
  pullAndMergeCloud(true);
})();
