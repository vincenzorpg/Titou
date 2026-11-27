// Générateur procédural de questions Programme Maths 4ème
// Thèmes : Minecraft (Pythagore), Berserk (Relatifs), Pokémon (Statistiques), One Punch Man (Boss Rush)

const MathGen = (() => {
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const fmtNum = (n) => {
    if (typeof n !== 'number') return String(n);
    const rounded = Math.round(n * 10) / 10;
    return String(rounded).replace('.', ',');
  };

  function makeNumericChoices(correct, candidates = [], allowNegative = false) {
    const set = new Set([fmtNum(correct)]);
    const cleanCandidates = candidates
      .filter((v) => Number.isFinite(v) && (allowNegative || v > 0))
      .map((v) => Math.round(v * 10) / 10);

    for (const c of cleanCandidates) {
      if (set.size >= 4) break;
      set.add(fmtNum(c));
    }

    let tries = 0;
    while (set.size < 4 && tries < 60) {
      tries++;
      const step = Number.isInteger(correct) ? randInt(1, 5) : pick([0.5, 1, 1.5, 2]);
      const sign = Math.random() < 0.5 ? 1 : -1;
      const val = Math.round((correct + sign * step) * 10) / 10;
      if (!allowNegative && val <= 0) continue;
      set.add(fmtNum(val));
    }
    return shuffle([...set]);
  }

  // ==================== 1. PYTHAGORE (MINECRAFT) ====================
  const PYTH_TRIPLETS_EASY = [
    [3, 4, 5],
    [6, 8, 10],
    [5, 12, 13],
    [9, 12, 15],
    [8, 15, 17]
  ];

  const PYTH_TRIPLETS_MED = [
    [7, 24, 25],
    [12, 16, 20],
    [10, 24, 26],
    [15, 20, 25],
    [9, 40, 41],
    [12, 35, 37]
  ];

  const MC_STORIES = [
    '⛏️ Tu construis une rampe en blocs de diamant pour sortir d’une grotte.',
    '🔥 Tu poses un pont en obsidienne au-dessus d’un lac de lave du Nether.',
    '🏰 Tu renforces la tour de ta base Minecraft contre un raid de Pillagers.',
    '💎 Tu creuses un tunnel diagonal vers un filon de diamants.',
    '🧱 Tu installes un circuit Redstone en triangle dans ta forteresse.'
  ];

  function renderTriangleSVG({ aLabel, bLabel, cLabel, rightAngle = true, letters = ['A', 'B', 'C'] }) {
    const [L1, L2, L3] = letters;
    // Triangle rectangle en L2 (coin bas-gauche), L1 en haut-gauche, L3 en bas-droite
    const angleMark = rightAngle
      ? `<rect x="64" y="138" width="18" height="18" fill="none" stroke="#facc15" stroke-width="3"/>`
      : `<path d="M 64 134 A 22 22 0 0 1 86 156" fill="none" stroke="#facc15" stroke-width="2.5" stroke-dasharray="4 3"/>
         <text x="86" y="144" fill="#facc15" font-size="14" font-weight="900">?</text>`;

    return `
      <div class="pyth-svg-box">
        <svg viewBox="0 0 340 190" role="img" aria-label="Triangle géométrique">
          <!-- Grille blocs façon Minecraft -->
          <defs>
            <pattern id="mcGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(74,222,128,0.12)" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="340" height="190" fill="url(#mcGrid)" rx="10"/>

          <!-- Triangle -->
          <polygon points="64,34 64,156 266,156"
            fill="rgba(56,189,248,0.16)" stroke="#38bdf8" stroke-width="4" stroke-linejoin="round"/>
          ${angleMark}

          <!-- Sommets -->
          <circle cx="64" cy="34" r="4" fill="#4ade80"/>
          <circle cx="64" cy="156" r="4" fill="#facc15"/>
          <circle cx="266" cy="156" r="4" fill="#4ade80"/>

          <text x="48" y="30" fill="#e2e8f0" font-size="15" font-weight="900">${L1}</text>
          <text x="46" y="172" fill="#facc15" font-size="15" font-weight="900">${L2}</text>
          <text x="274" y="170" fill="#e2e8f0" font-size="15" font-weight="900">${L3}</text>

          <!-- Mesures -->
          <text x="52" y="100" text-anchor="end" fill="${aLabel.includes('?') ? '#facc15' : '#86efac'}" font-size="16" font-weight="900">${aLabel}</text>
          <text x="165" y="180" text-anchor="middle" fill="${bLabel.includes('?') ? '#facc15' : '#86efac'}" font-size="16" font-weight="900">${bLabel}</text>
          <text x="182" y="84" text-anchor="start" fill="${cLabel.includes('?') ? '#facc15' : '#38bdf8'}" font-size="17" font-weight="900">${cLabel}</text>
        </svg>
      </div>
    `;
  }

  function generatePythagore(diff) {
    const modeRoll = Math.random();
    const letters = pick([['A', 'B', 'C'], ['M', 'N', 'P'], ['S', 'T', 'V'], ['D', 'E', 'F']]);
    const story = pick(MC_STORIES);

    // 1) Réciproque / Contraposée (25% des questions)
    if (modeRoll < 0.27) {
      const isRight = Math.random() < 0.5;
      let a, b, c;
      if (isRight) {
        const pool = diff === 1 ? PYTH_TRIPLETS_EASY : [...PYTH_TRIPLETS_EASY, ...PYTH_TRIPLETS_MED];
        [a, b, c] = pick(pool);
      } else {
        const base = pick(PYTH_TRIPLETS_EASY);
        a = base[0];
        b = base[1];
        c = base[2] + pick([-1, 1, 2]);
        if (c <= Math.max(a, b)) c = base[2] + 1;
      }

      const sumSq = a * a + b * b;
      const hypSq = c * c;
      const ans = isRight ? 'OUI, il est rectangle' : 'NON, pas rectangle';

      return {
        topic: 'pythagore',
        category: '⛏️ Pythagore • Réciproque',
        story,
        prompt: `Le triangle ${letters.join('')} a pour côtés ${a}, ${b} et ${c}. Possède-t-il un angle droit en ${letters[1]} ?`,
        visualHtml: renderTriangleSVG({
          aLabel: `${a}`,
          bLabel: `${b}`,
          cLabel: `${c}`,
          rightAngle: false,
          letters
        }),
        hint: `Compare le carré du plus grand côté (${c}²) avec la somme des carrés des deux autres (${a}² + ${b}²).`,
        answer: ans,
        choices: ['OUI, il est rectangle', 'NON, pas rectangle'],
        forceQcm: true,
        explain: `Plus grand côté : <strong>${c}² = ${hypSq}</strong>.<br>Autres côtés : <strong>${a}² + ${b}² = ${a * a} + ${b * b} = ${sumSq}</strong>.<br>${
          isRight
            ? `✅ ${hypSq} = ${sumSq} → D’après la réciproque de Pythagore, le triangle <strong>est rectangle</strong> !`
            : `❌ ${hypSq} ≠ ${sumSq} → Le triangle <strong>n’est pas rectangle</strong> !`
        }`
      };
    }

    // 2) Calculer l'hypoténuse (40% des questions)
    if (modeRoll < 0.67) {
      let a, b, c, approx = false;
      if (diff === 1 || (diff === 2 && Math.random() < 0.6)) {
        const pool = diff === 1 ? PYTH_TRIPLETS_EASY : [...PYTH_TRIPLETS_EASY, ...PYTH_TRIPLETS_MED];
        [a, b, c] = pick(pool);
      } else {
        // Calcul avec arrondi au dixième
        a = randInt(3, diff === 3 ? 11 : 8);
        b = randInt(4, diff === 3 ? 12 : 9);
        const exact = Math.sqrt(a * a + b * b);
        if (Number.isInteger(exact)) {
          c = exact;
        } else {
          c = Math.round(exact * 10) / 10;
          approx = true;
        }
      }

      const sumSq = a * a + b * b;
      const distractors = [
        a + b,
        Math.abs(a - b) + 2,
        Math.round((c + 1) * 10) / 10,
        Math.round(Math.max(1, c - 1.2) * 10) / 10
      ];

      return {
        topic: 'pythagore',
        category: '⛏️ Pythagore • Hypoténuse',
        story,
        prompt: approx
          ? `Calcule la longueur de l’hypoténuse ${letters[0]}${letters[2]} (arrondie au dixième) :`
          : `Calcule la longueur exacte de l’hypoténuse ${letters[0]}${letters[2]} :`,
        visualHtml: renderTriangleSVG({
          aLabel: `${a}`,
          bLabel: `${b}`,
          cLabel: `?`,
          rightAngle: true,
          letters
        }),
        hint: `On cherche le plus grand côté (en face de l'angle droit) : <strong>${letters[0]}${letters[2]}² = ${a}² + ${b}²</strong>, puis prends la racine carrée √.`,
        answer: fmtNum(c),
        numericAnswer: c,
        choices: makeNumericChoices(c, distractors, false),
        explain: `${letters[0]}${letters[2]}² = ${a}² + ${b}² = ${a * a} + ${b * b} = <strong>${sumSq}</strong>.<br>Donc ${letters[0]}${letters[2]} = √${sumSq} ${approx ? '≈' : '='} <strong>${fmtNum(c)}</strong>.`
      };
    }

    // 3) Calculer un côté de l'angle droit (33% des questions)
    const pool = diff === 1 ? PYTH_TRIPLETS_EASY : [...PYTH_TRIPLETS_EASY, ...PYTH_TRIPLETS_MED];
    const [a, b, c] = pick(pool);
    const askVertical = Math.random() < 0.5;
    const known = askVertical ? b : a;
    const missing = askVertical ? a : b;
    const missingSeg = askVertical ? `${letters[0]}${letters[1]}` : `${letters[1]}${letters[2]}`;

    const wrongAdd = Math.round(Math.sqrt(c * c + known * known) * 10) / 10;
    const distractors = [c - known, wrongAdd, missing + 2, Math.max(1, missing - 1)];

    return {
      topic: 'pythagore',
      category: '⛏️ Pythagore • Côté manquant',
      story,
      prompt: `L’hypoténuse vaut ${c} et un côté vaut ${known}. Calcule la longueur du côté ${missingSeg} :`,
      visualHtml: renderTriangleSVG({
        aLabel: askVertical ? '?' : `${a}`,
        bLabel: askVertical ? `${b}` : '?',
        cLabel: `${c}`,
        rightAngle: true,
        letters
      }),
      hint: `Attention ! On connaît déjà l’hypoténuse (${c}). Il faut <strong>SOUSTRAIRE</strong> : ${missingSeg}² = ${c}² − ${known}².`,
      answer: fmtNum(missing),
      numericAnswer: missing,
      choices: makeNumericChoices(missing, distractors, false),
      explain: `${missingSeg}² = ${c}² − ${known}² = ${c * c} − ${known * known} = <strong>${missing * missing}</strong>.<br>Donc ${missingSeg} = √${missing * missing} = <strong>${missing}</strong>.`
    };
  }

  // ==================== 2. NOMBRES RELATIFS (BERSERK) ====================
  const BERSERK_STORIES = [
    '⚔️ Un Apôtre surgit de l’Éclipse ! Concentre ton coup de Dragon Slayer.',
    '🩸 L’armure du Berserker s’active : équilibre les forces positives et négatives !',
    '🔥 Guts bloque une attaque démonique : ne te trompe pas de signe !',
    '🌑 La Marque du Sacrifice brille… Un calcul exact pour briser la garde ennemie !'
  ];

  const fmtSigned = (n) => (n < 0 ? `(${n})` : `${n}`);

  function generateRelatifs(diff) {
    const story = pick(BERSERK_STORIES);
    const roll = Math.random();

    // Diff 1 : additions, soustractions, multiplications simples
    // Diff 2 : + divisions + petites priorités
    // Diff 3 : priorités + parenthèses + doubles produits

    if (diff === 3 && roll < 0.55) {
      // Priorités opératoires niveau Classe S
      const subtype = randInt(1, 3);
      if (subtype === 1) {
        const a = randInt(-6, 8);
        const b = pick([-5, -4, -3, -2, 2, 3, 4]);
        const c = pick([-6, -5, -4, -3, -2]);
        const prod = b * c;
        const ans = a + prod;
        const expr = `${a} + ${fmtSigned(b)} × ${fmtSigned(c)}`;
        const wrongNoPrio = (a + b) * c;
        return {
          topic: 'relatifs',
          category: '⚔️ Relatifs • Priorités',
          story,
          prompt: `Calcule en respectant les priorités opératoires :`,
          visualHtml: `<div class="math-display">${expr}</div>`,
          hint: `La multiplication (×) est prioritaire ! Calcule d'abord <strong>${fmtSigned(b)} × ${fmtSigned(c)}</strong>.`,
          answer: fmtNum(ans),
          numericAnswer: ans,
          choices: makeNumericChoices(ans, [-ans, wrongNoPrio, a - prod, ans + 2], true),
          explain: `1) Multiplication d'abord : ${fmtSigned(b)} × ${fmtSigned(c)} = <strong>${prod}</strong>.<br>2) Puis addition : ${a} + ${fmtSigned(prod)} = <strong>${ans}</strong>.`
        };
      }
      if (subtype === 2) {
        const a = randInt(-8, 6);
        const b = randInt(-7, 9);
        const c = pick([-4, -3, -2, 3, 4]);
        const par = a + b;
        const ans = par * c;
        const expr = `(${a} ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)}) × ${fmtSigned(c)}`;
        return {
          topic: 'relatifs',
          category: '⚔️ Relatifs • Parenthèses',
          story,
          prompt: `Calcule cette expression :`,
          visualHtml: `<div class="math-display">${expr}</div>`,
          hint: `Commence par l’intérieur des parenthèses, puis multiplie par ${c}.`,
          answer: fmtNum(ans),
          numericAnswer: ans,
          choices: makeNumericChoices(ans, [-ans, a + b * c, ans + c, ans - 2], true),
          explain: `1) Parenthèses : ${a} ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)} = <strong>${par}</strong>.<br>2) Produit : ${par} × ${fmtSigned(c)} = <strong>${ans}</strong>.`
        };
      }
      // Subtype 3 : a - b * c
      const a = randInt(5, 18);
      const b = pick([2, 3, 4, 5]);
      const c = pick([-6, -5, -4, -3, -2]);
      const prod = b * c; // négatif
      const ans = a - prod; // a + |prod|
      const expr = `${a} − ${b} × ${fmtSigned(c)}`;
      return {
        topic: 'relatifs',
        category: '⚔️ Relatifs • Priorités',
        story,
        prompt: `Attention au signe moins ! Calcule :`,
        visualHtml: `<div class="math-display">${expr}</div>`,
        hint: `Calcule d'abord ${b} × (${c}) = ${prod}, puis fais ${a} − (${prod}). Soustraire un négatif revient à additionner !`,
        answer: fmtNum(ans),
        numericAnswer: ans,
        choices: makeNumericChoices(ans, [a + prod, (a - b) * c, -ans, ans - 4], true),
        explain: `1) ${b} × (${c}) = <strong>${prod}</strong>.<br>2) ${a} − (${prod}) = ${a} + ${Math.abs(prod)} = <strong>${ans}</strong>.`
      };
    }

    // Division de relatifs (Diff 2 & 3)
    if (diff >= 2 && roll < 0.45) {
      const divisor = pick([-9, -8, -7, -6, -5, -4, -3, -2, 3, 4, 5, 6, 7, 8]);
      const quotient = pick([-9, -8, -7, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8]);
      // S'assurer qu'il y a au moins un négatif
      const finalDivisor = divisor > 0 && quotient > 0 ? -divisor : divisor;
      const dividend = finalDivisor * quotient;
      const expr = `${fmtSigned(dividend)} ÷ ${fmtSigned(finalDivisor)}`;

      const sameSign = (dividend < 0 && finalDivisor < 0) || (dividend > 0 && finalDivisor > 0);
      return {
        topic: 'relatifs',
        category: '⚔️ Relatifs • Division',
        story,
        prompt: `Calcule ce quotient de nombres relatifs :`,
        visualHtml: `<div class="math-display">${expr}</div>`,
        hint: `Règle des signes : mêmes signes = <strong>(+)</strong>, signes contraires = <strong>(−)</strong>.`,
        answer: fmtNum(quotient),
        numericAnswer: quotient,
        choices: makeNumericChoices(quotient, [-quotient, quotient + 1, quotient - 2, -quotient + 1], true),
        explain: `${sameSign ? 'Mêmes signes → résultat positif (+).' : 'Signes contraires → résultat négatif (−).'}<br>${Math.abs(dividend)} ÷ ${Math.abs(finalDivisor)} = ${Math.abs(quotient)} → <strong>${quotient}</strong>.`
      };
    }

    // Multiplication de relatifs
    if (roll < 0.65) {
      let a = pick([-9, -8, -7, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8]);
      let b = pick([-9, -8, -7, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7]);
      if (a > 0 && b > 0) a = -a;
      const ans = a * b;
      const expr = `${fmtSigned(a)} × ${fmtSigned(b)}`;
      const sameSign = a < 0 && b < 0;

      return {
        topic: 'relatifs',
        category: '⚔️ Relatifs • Multiplication',
        story,
        prompt: `Applique la règle des signes et calcule :`,
        visualHtml: `<div class="math-display">${expr}</div>`,
        hint: `Mêmes signes = <strong>(+)</strong> • Signes contraires = <strong>(−)</strong>.`,
        answer: fmtNum(ans),
        numericAnswer: ans,
        choices: makeNumericChoices(ans, [-ans, a + b, ans + Math.abs(a), ans - Math.abs(b)], true),
        explain: `${sameSign ? '(−) × (−) donne (+)' : 'Signes contraires → résultat (−)'}.<br>${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(ans)} → <strong>${ans}</strong>.`
      };
    }

    // Addition / Soustraction de relatifs
    const isSub = Math.random() < 0.55;
    const maxVal = diff === 1 ? 12 : 20;
    let a = randInt(-maxVal, maxVal);
    let b = randInt(-maxVal, maxVal);
    if (a === 0) a = -5;
    if (b === 0) b = -4;
    if (!isSub && a > 0 && b > 0) a = -a;
    if (isSub && a > 0 && b > 0 && a > b) b = -b;

    const ans = isSub ? a - b : a + b;
    const expr = isSub ? `${a} − ${fmtSigned(b)}` : `${a} + ${fmtSigned(b)}`;

    let explain = '';
    if (isSub && b < 0) {
      explain = `Soustraire (${b}) revient à <strong>ajouter ${Math.abs(b)}</strong> :<br>${a} + ${Math.abs(b)} = <strong>${ans}</strong>.`;
    } else if (isSub) {
      explain = `On part de ${a} et on recule de ${b} → <strong>${ans}</strong>.`;
    } else {
      explain = `${a} + ${fmtSigned(b)} = <strong>${ans}</strong> (pense à l'ascenseur : tu pars à l'étage ${a}).`;
    }

    return {
      topic: 'relatifs',
      category: isSub ? '⚔️ Relatifs • Soustraction' : '⚔️ Relatifs • Addition',
      story,
      prompt: `Calcule rapidement :`,
      visualHtml: `<div class="math-display">${expr}</div>`,
      hint: isSub && b < 0
        ? `Astuce : <strong>− (−${Math.abs(b)})</strong> se transforme en <strong>+ ${Math.abs(b)}</strong> !`
        : `Imagine un ascenseur : tu pars de l’étage ${a}, puis tu montes (+) ou tu descends (−).`,
      answer: fmtNum(ans),
      numericAnswer: ans,
      choices: makeNumericChoices(ans, [-ans, a + b, a - b, ans + 2, ans - 2], true),
      explain
    };
  }

  // ==================== 3. STATISTIQUES (POKÉMON) ====================
  const POKEMON_POOL = [
    { name: 'Pikachu', emoji: '⚡' },
    { name: 'Dracaufeu', emoji: '🔥' },
    { name: 'Ectoplasma', emoji: '👻' },
    { name: 'Ronflex', emoji: '😴' },
    { name: 'Lucario', emoji: '🥊' },
    { name: 'Mewtwo', emoji: '🔮' },
    { name: 'Tortank', emoji: '💧' },
    { name: 'Rayquaza', emoji: '🐉' },
    { name: 'Amphinobi', emoji: '🌊' }
  ];

  function renderPokeCards(items, unit = 'PV') {
    return `
      <div class="poke-cards-row" id="poke-cards-row">
        ${items
          .map(
            (it) => `
          <div class="poke-stat-card" data-val="${it.val}">
            <div class="poke-emoji">${it.emoji}</div>
            <div class="poke-name">${it.name}</div>
            <div class="poke-val">${it.val}</div>
            <div class="poke-sub">${unit}</div>
          </div>`
          )
          .join('')}
      </div>
    `;
  }

  function generateStats(diff) {
    const roll = Math.random();
    const unit = pick(['PV', 'PC', 'ATQ', 'SPD']);

    // 1) Moyenne pondérée / Tableau d'effectifs (Diff 2 & 3)
    if (diff >= 2 && roll < 0.28) {
      // Choisir 3 valeurs et effectifs dont la somme des effectifs = 10 ou 5 pour tomber juste !
      const totalEff = pick([5, 10]);
      let effs;
      if (totalEff === 5) {
        effs = pick([[2, 2, 1], [1, 3, 1], [2, 1, 2]]);
      } else {
        effs = pick([[3, 5, 2], [2, 4, 4], [4, 4, 2], [2, 6, 2]]);
      }
      const base = randInt(1, 3) * 10;
      const vals = [base, base + 10, base + 20];
      const weightedSum = vals[0] * effs[0] + vals[1] * effs[1] + vals[2] * effs[2];
      const mean = Math.round((weightedSum / totalEff) * 10) / 10;

      const tableHtml = `
        <table class="freq-table">
          <thead>
            <tr>
              <th>Puissance (${unit})</th>
              <th>${vals[0]}</th>
              <th>${vals[1]}</th>
              <th>${vals[2]}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Nombre de Pokémon</strong></td>
              <td>${effs[0]}</td>
              <td>${effs[1]}</td>
              <td>${effs[2]}</td>
            </tr>
          </tbody>
        </table>
      `;

      const simpleMean = Math.round(((vals[0] + vals[1] + vals[2]) / 3) * 10) / 10;
      return {
        topic: 'stats',
        category: '⚡ Stats • Moyenne pondérée',
        story: '🧪 Le Professeur Chen analyse ton PC Pokémon pour la Ligue !',
        prompt: `Calcule la puissance moyenne de ce groupe de ${totalEff} Pokémon :`,
        visualHtml: tableHtml,
        hint: `Multiplie chaque puissance par son effectif, additionne tout, puis divise par l'effectif total (${totalEff}).`,
        answer: fmtNum(mean),
        numericAnswer: mean,
        choices: makeNumericChoices(mean, [simpleMean, mean + 2, mean - 2, mean + 5], false),
        explain: `Total = (${vals[0]}×${effs[0]}) + (${vals[1]}×${effs[1]}) + (${vals[2]}×${effs[2]}) = <strong>${weightedSum}</strong>.<br>Effectif total = ${effs.join(' + ')} = <strong>${totalEff}</strong> → Moyenne = ${weightedSum} ÷ ${totalEff} = <strong>${fmtNum(mean)}</strong>.`
      };
    }

    // 2) Étendue (Écart) (~28%)
    if (roll < 0.56) {
      const count = diff === 1 ? 4 : 5;
      const team = shuffle(POKEMON_POOL).slice(0, count);
      const values = team.map(() => randInt(12, diff === 1 ? 65 : 140));
      const items = team.map((p, i) => ({ ...p, val: values[i] }));
      const maxV = Math.max(...values);
      const minV = Math.min(...values);
      const range = maxV - minV;

      return {
        topic: 'stats',
        category: '⚡ Stats • Étendue (Écart)',
        story: '📊 Tu vérifies si ton équipe Pokémon est équilibrée avant l’Arène !',
        prompt: `Quelle est l’étendue (l’écart entre le max et le min) des ${unit} de ton équipe ?`,
        visualHtml: renderPokeCards(items, unit),
        hint: `Repère le Pokémon le PLUS FORT (Max) et le PLUS FAIBLE (Min), puis fais <strong>Max − Min</strong>.`,
        answer: fmtNum(range),
        numericAnswer: range,
        choices: makeNumericChoices(range, [maxV, maxV + minV, range + 4, Math.max(1, range - 3)], false),
        explain: `Maximum = <strong>${maxV}</strong> • Minimum = <strong>${minV}</strong>.<br>Étendue = ${maxV} − ${minV} = <strong>${range}</strong>.`
      };
    }

    // 3) Médiane (~24%) — avec outil interactif "Trier les cartes" !
    if (roll < 0.80) {
      const isEven = diff >= 2 && Math.random() < 0.5;
      const count = isEven ? pick([4, 6]) : pick([5, diff === 3 ? 7 : 5]);
      const team = shuffle(POKEMON_POOL).slice(0, count);

      // Générer des valeurs distinctes pour la clarté
      const valsSet = new Set();
      while (valsSet.size < count) {
        valsSet.add(randInt(10, 90));
      }
      const unsorted = shuffle([...valsSet]);
      const sorted = [...unsorted].sort((a, b) => a - b);

      let median;
      let explain;
      if (!isEven) {
        const midIdx = Math.floor(count / 2);
        median = sorted[midIdx];
        explain = `Série triée : <strong>${sorted.join(' ; ')}</strong>.<br>Il y a ${count} valeurs (impair) : la médiane est la ${midIdx + 1}ᵉ valeur = <strong>${median}</strong>.`;
      } else {
        const m1 = sorted[count / 2 - 1];
        const m2 = sorted[count / 2];
        median = Math.round(((m1 + m2) / 2) * 10) / 10;
        explain = `Série triée : <strong>${sorted.join(' ; ')}</strong>.<br>Il y a ${count} valeurs (pair) : moyenne des 2 du milieu → (${m1} + ${m2}) ÷ 2 = <strong>${fmtNum(median)}</strong>.`;
      }

      const items = team.map((p, i) => ({ ...p, val: unsorted[i] }));
      const wrongUnsortedMid = unsorted[Math.floor(count / 2)];
      const meanWrong = Math.round((unsorted.reduce((s, v) => s + v, 0) / count) * 10) / 10;

      return {
        topic: 'stats',
        category: '⚡ Stats • Médiane',
        story: '⚡ Le Pokédex a mélangé les cartes de ton équipe !',
        prompt: `Quelle est la MÉDIANE des ${unit} de cette série ?`,
        visualHtml: renderPokeCards(items, unit),
        canSortCards: true,
        hint: isEven
          ? `Clique sur "Trier les cartes", puis fais la moyenne des <strong>2 valeurs du milieu</strong> !`
          : `Clique sur "Trier les cartes" du plus petit au plus grand, puis prends la valeur <strong>pile au milieu</strong> !`,
        answer: fmtNum(median),
        numericAnswer: median,
        choices: makeNumericChoices(median, [wrongUnsortedMid, meanWrong, sorted[0], sorted[count - 1]], false),
        explain
      };
    }

    // 4) Moyenne simple (~20%)
    const count = diff === 1 ? 4 : 5;
    const team = shuffle(POKEMON_POOL).slice(0, count);
    // Construire une série dont la moyenne tombe juste (ou .5 en diff >= 2)
    const targetMean = diff === 1 ? randInt(12, 40) : randInt(15, 55);
    const totalTarget = targetMean * count;
    const values = [];
    let running = 0;
    for (let i = 0; i < count - 1; i++) {
      const v = Math.max(5, targetMean + randInt(-12, 12));
      values.push(v);
      running += v;
    }
    let last = totalTarget - running;
    if (last <= 0) {
      // Ajustement propre
      const shift = Math.abs(last) + 10;
      values[0] -= shift;
      if (values[0] < 4) values[0] = 6;
      const sumAll = values.reduce((a, b) => a + b, 0);
      const remainder = sumAll % count;
      last = count - remainder + randInt(1, 4) * count;
    }
    values.push(last);
    const sum = values.reduce((a, b) => a + b, 0);
    const exactMean = Math.round((sum / count) * 10) / 10;
    const items = team.map((p, i) => ({ ...p, val: values[i] }));

    return {
      topic: 'stats',
      category: '⚡ Stats • Moyenne',
      story: '🏆 Tu prépares ton équipe pour affronter le Conseil des 4 !',
      prompt: `Calcule la MOYENNE des ${unit} de ces ${count} Pokémon :`,
      visualHtml: renderPokeCards(items, unit),
      hint: `Additionne les ${count} valeurs (${values.join(' + ')}), puis divise le total par <strong>${count}</strong>.`,
      answer: fmtNum(exactMean),
      numericAnswer: exactMean,
      choices: makeNumericChoices(exactMean, [exactMean + 2, exactMean - 2, exactMean + 4, sum], false),
      explain: `Somme = ${values.join(' + ')} = <strong>${sum}</strong>.<br>Moyenne = ${sum} ÷ ${count} = <strong>${fmtNum(exactMean)}</strong>.`
    };
  }

  // ==================== API PUBLIQUE ====================
  function generateQuest(world, diff, count = 8) {
    const list = [];
    for (let i = 0; i < count; i++) {
      if (world === 'pythagore') list.push(generatePythagore(diff));
      else if (world === 'relatifs') list.push(generateRelatifs(diff));
      else if (world === 'stats') list.push(generateStats(diff));
      else {
        // Boss Rush One Punch Man : alterne les 3 chapitres équitablement !
        const slot = i % 3;
        const q =
          slot === 0 ? generatePythagore(diff)
          : slot === 1 ? generateRelatifs(diff)
          : generateStats(diff);
        q.story = pick([
          '👊 Niveau de menace DÉMON détecté ! Prépare ton coup !',
          '⚡ Genos analyse la cible : il te faut un calcul parfait !',
          '🔥 Saitama arrive en courant pour les promos : finis ce boss vite !',
          '💥 Garou esquive tout sauf les maths exactes !'
        ]);
        list.push(q);
      }
    }
    return list;
  }

  return { generateQuest, fmtNum };
})();
