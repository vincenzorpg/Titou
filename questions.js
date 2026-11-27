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

  function generatePythagore(level) {
    const modeRoll = Math.random();
    const letters = pick([['A', 'B', 'C'], ['M', 'N', 'P'], ['S', 'T', 'V'], ['D', 'E', 'F']]);
    const story = pick(MC_STORIES);

    // Niveaux 8 à 10 : Problèmes complexes multi-étapes (Périmètre, Diagonale d'un rectangle, Échelle)
    if (level >= 8 && modeRoll < 0.45) {
      const sub = randInt(1, 2);
      const [a, b, c] = pick([...PYTH_TRIPLETS_EASY, ...PYTH_TRIPLETS_MED]);
      if (sub === 1) {
        // Problème à 2 étapes : trouver l'hypoténuse PUIS calculer le périmètre du triangle !
        const perim = a + b + c;
        return {
          topic: 'pythagore',
          category: `⛏️ Pythagore • Problème (Palier ${level})`,
          story: '🏰 Défi d’architecte expert ! Tu dois clôturer tout le tour de ta base triangulaire.',
          prompt: `Les deux côtés de l’angle droit mesurent ${a} blocs et ${b} blocs. Quel est le PÉRIMÈTRE TOTAL du triangle ${letters.join('')} ?`,
          visualHtml: renderTriangleSVG({ aLabel: `${a}`, bLabel: `${b}`, cLabel: '?', rightAngle: true, letters }),
          hint: `Problème en 2 étapes : 1) Calcule l’hypoténuse avec Pythagore (${a}² + ${b}² = ${c}²). 2) Additionne les 3 côtés !`,
          answer: fmtNum(perim),
          numericAnswer: perim,
          choices: makeNumericChoices(perim, [c, a + b, perim + 2, perim - 3], false),
          explain: `1) Hypoténuse = √(${a}² + ${b}²) = √${c * c} = <strong>${c}</strong>.<br>2) Périmètre = ${a} + ${b} + ${c} = <strong>${perim}</strong>.`
        };
      }
      // Sub 2 : Problème d'échelle / diagonale de mur (avec aire du triangle !)
      const area = (a * b) / 2;
      return {
        topic: 'pythagore',
        category: `⛏️ Pythagore • Problème Aire (Palier ${level})`,
        story: '💎 Tu veux paver tout le sol de ta salle triangulaire en blocs d’émeraude !',
        prompt: `L’hypoténuse vaut ${c} et la base vaut ${b}. Calcule l’AIRE de ce triangle rectangle :`,
        visualHtml: renderTriangleSVG({ aLabel: '?', bLabel: `${b}`, cLabel: `${c}`, rightAngle: true, letters }),
        hint: `2 étapes : 1) Trouve la hauteur manquante avec Pythagore (√(${c}² − ${b}²)). 2) Aire = (Base × Hauteur) ÷ 2 !`,
        answer: fmtNum(area),
        numericAnswer: area,
        choices: makeNumericChoices(area, [a, a * b, (b * c) / 2, area + 4], false),
        explain: `1) Hauteur = √(${c}² − ${b}²) = √${a * a} = <strong>${a}</strong>.<br>2) Aire = (${b} × ${a}) ÷ 2 = <strong>${fmtNum(area)}</strong>.`
      };
    }

    // 1) Réciproque / Contraposée (dès Palier 3)
    if (level >= 3 && modeRoll < 0.30) {
      const isRight = Math.random() < 0.5;
      let a, b, c;
      if (isRight) {
        const pool = level <= 4 ? PYTH_TRIPLETS_EASY : [...PYTH_TRIPLETS_EASY, ...PYTH_TRIPLETS_MED];
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
        category: `⛏️ Pythagore • Réciproque (Palier ${level})`,
        story,
        prompt: `Le triangle ${letters.join('')} a pour côtés ${a}, ${b} et ${c}. Possède-t-il un angle droit en ${letters[1]} ?`,
        visualHtml: renderTriangleSVG({ aLabel: `${a}`, bLabel: `${b}`, cLabel: `${c}`, rightAngle: false, letters }),
        hint: `Compare le carré du plus grand côté (${c}²) avec la somme des carrés des deux autres (${a}² + ${b}²).`,
        answer: ans,
        choices: ['OUI, il est rectangle', 'NON, pas rectangle'],
        forceQcm: true,
        explain: `Plus grand côté : <strong>${c}² = ${hypSq}</strong>.<br>Autres côtés : <strong>${a}² + ${b}² = ${a * a} + ${b * b} = ${sumSq}</strong>.<br>${
          isRight
            ? `✅ ${hypSq} = ${sumSq} → Le triangle <strong>est rectangle</strong> !`
            : `❌ ${hypSq} ≠ ${sumSq} → Le triangle <strong>n’est pas rectangle</strong> !`
        }`
      };
    }

    // 2) Calculer l'hypoténuse
    if (level <= 2 || modeRoll < 0.65) {
      let a, b, c, approx = false;
      if (level <= 5 || Math.random() < 0.45) {
        const pool = level <= 3 ? PYTH_TRIPLETS_EASY : [...PYTH_TRIPLETS_EASY, ...PYTH_TRIPLETS_MED];
        [a, b, c] = pick(pool);
      } else {
        a = randInt(4, level >= 8 ? 14 : 9);
        b = randInt(5, level >= 8 ? 15 : 10);
        const exact = Math.sqrt(a * a + b * b);
        if (Number.isInteger(exact)) c = exact;
        else {
          c = Math.round(exact * 10) / 10;
          approx = true;
        }
      }

      const sumSq = a * a + b * b;
      const distractors = [a + b, Math.abs(a - b) + 2, Math.round((c + 1) * 10) / 10, Math.round(Math.max(1, c - 1.2) * 10) / 10];

      return {
        topic: 'pythagore',
        category: `⛏️ Pythagore • Hypoténuse (Palier ${level})`,
        story,
        prompt: approx
          ? `Calcule la longueur de l’hypoténuse ${letters[0]}${letters[2]} (arrondie au dixième) :`
          : `Calcule la longueur exacte de l’hypoténuse ${letters[0]}${letters[2]} :`,
        visualHtml: renderTriangleSVG({ aLabel: `${a}`, bLabel: `${b}`, cLabel: `?`, rightAngle: true, letters }),
        hint: `On cherche le plus grand côté : <strong>${letters[0]}${letters[2]}² = ${a}² + ${b}²</strong>, puis racine carrée √.`,
        answer: fmtNum(c),
        numericAnswer: c,
        choices: makeNumericChoices(c, distractors, false),
        explain: `${letters[0]}${letters[2]}² = ${a}² + ${b}² = ${a * a} + ${b * b} = <strong>${sumSq}</strong>.<br>Donc ${letters[0]}${letters[2]} = √${sumSq} ${approx ? '≈' : '='} <strong>${fmtNum(c)}</strong>.`
      };
    }

    // 3) Calculer un côté de l'angle droit
    const pool = level <= 4 ? PYTH_TRIPLETS_EASY : [...PYTH_TRIPLETS_EASY, ...PYTH_TRIPLETS_MED];
    const [a, b, c] = pick(pool);
    const askVertical = Math.random() < 0.5;
    const known = askVertical ? b : a;
    const missing = askVertical ? a : b;
    const missingSeg = askVertical ? `${letters[0]}${letters[1]}` : `${letters[1]}${letters[2]}`;
    const wrongAdd = Math.round(Math.sqrt(c * c + known * known) * 10) / 10;

    return {
      topic: 'pythagore',
      category: `⛏️ Pythagore • Côté manquant (Palier ${level})`,
      story,
      prompt: `L’hypoténuse vaut ${c} et un côté vaut ${known}. Calcule la longueur du côté ${missingSeg} :`,
      visualHtml: renderTriangleSVG({ aLabel: askVertical ? '?' : `${a}`, bLabel: askVertical ? `${b}` : '?', cLabel: `${c}`, rightAngle: true, letters }),
      hint: `On connaît déjà l’hypoténuse (${c}) → il faut <strong>SOUSTRAIRE</strong> : ${missingSeg}² = ${c}² − ${known}².`,
      answer: fmtNum(missing),
      numericAnswer: missing,
      choices: makeNumericChoices(missing, [c - known, wrongAdd, missing + 2, Math.max(1, missing - 1)], false),
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

  function generateRelatifs(level) {
    const story = pick(BERSERK_STORIES);
    const roll = Math.random();
    const diff = level <= 3 ? 1 : level <= 6 ? 2 : 3;

    // Paliers 8 à 10 : Expressions complexes à 2 étages (parenthèses + produit + quotient)
    if (level >= 8 && roll < 0.50) {
      const a = randInt(-6, 5);
      const b = randInt(-6, 6) || -3;
      const c = pick([-4, -3, -2, 3, 4]);
      const d = pick([-6, -4, -3, 3, 4]);
      const q = pick([-5, -4, -3, -2, 2, 3, 4]);
      const div = d * q;
      const part1 = (a + b) * c;
      const ans = part1 + q;
      const expr = `(${a} ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)}) × ${fmtSigned(c)} + ${fmtSigned(div)} ÷ ${fmtSigned(d)}`;
      return {
        topic: 'relatifs',
        category: `⚔️ Relatifs • Défi Expert (Palier ${level})`,
        story,
        prompt: `Calcule cette grande expression étape par étape :`,
        visualHtml: `<div class="math-display" style="font-size:clamp(1.2rem,3vw,1.8rem);">${expr}</div>`,
        hint: `Sépare en 2 blocs : 1) Calcule (${a} ${b >= 0 ? '+' : '−'} ${Math.abs(b)}) × ${fmtSigned(c)}. 2) Calcule ${fmtSigned(div)} ÷ ${fmtSigned(d)}. 3) Additionne les deux !`,
        answer: fmtNum(ans),
        numericAnswer: ans,
        choices: makeNumericChoices(ans, [-ans, part1 - q, ans + 4, ans - 3], true),
        explain: `1) (${a + b}) × ${fmtSigned(c)} = <strong>${part1}</strong>.<br>2) ${fmtSigned(div)} ÷ ${fmtSigned(d)} = <strong>${q}</strong>.<br>3) ${part1} + ${fmtSigned(q)} = <strong>${ans}</strong>.`
      };
    }

    if (level >= 6 && roll < 0.60) {
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

  function generateStats(level) {
    const roll = Math.random();
    const diff = level <= 3 ? 1 : level <= 6 ? 2 : 3;
    const unit = pick(['PV', 'PC', 'ATQ', 'SPD']);

    // Paliers 8 à 10 : Problème inverse complexe (trouver la valeur manquante pour atteindre une moyenne cible !)
    if (level >= 8 && roll < 0.42) {
      const targetMean = randInt(14, 24);
      const count = 4;
      const totalNeeded = targetMean * count;
      const v1 = targetMean + randInt(-5, 4);
      const v2 = targetMean + randInt(-4, 5);
      const v3 = targetMean + randInt(-4, 3);
      const missing = totalNeeded - (v1 + v2 + v3);
      const team = shuffle(POKEMON_POOL).slice(0, 4);
      const items = [
        { ...team[0], val: v1 },
        { ...team[1], val: v2 },
        { ...team[2], val: v3 },
        { ...team[3], val: '?' }
      ];
      return {
        topic: 'stats',
        category: `⚡ Stats • Problème Moyenne (Palier ${level})`,
        story: '🏆 Problème de Ligue Pokémon ! Il manque la stat du 4ᵉ Pokémon de ton équipe.',
        prompt: `Tu veux que ton équipe de 4 Pokémon ait exactement ${targetMean} ${unit} de MOYENNE. Quelle doit être la valeur du 4ᵉ Pokémon ?`,
        visualHtml: renderPokeCards(items, unit),
        hint: `Pour avoir ${targetMean} de moyenne sur 4 Pokémon, la somme totale doit être <strong>${targetMean} × 4 = ${totalNeeded}</strong> !`,
        answer: fmtNum(missing),
        numericAnswer: missing,
        choices: makeNumericChoices(missing, [targetMean, missing + 2, missing - 3, v1 + v2 + v3], false),
        explain: `Somme totale voulue : ${targetMean} × 4 = <strong>${totalNeeded}</strong>.<br>Somme des 3 premiers : ${v1} + ${v2} + ${v3} = ${v1 + v2 + v3}.<br>Valeur manquante : ${totalNeeded} − ${v1 + v2 + v3} = <strong>${missing}</strong>.`
      };
    }

    // 1) Moyenne pondérée / Tableau d'effectifs (dès Palier 5)
    if (level >= 5 && roll < 0.35) {
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

  // ==================== 4. FRACTIONS 4ÈME (SUPER SMASH BROS) ====================
  const SMASH_STORIES = [
    '💥 Final Smash chargé ! Calcule cette fraction pour éjecter Bowser hors du stage !',
    '⚡ Mario et Kirby combinent leurs attaques : simplifie ou calcule cette fraction !',
    '🔥 Bataille sur Destination Finale ! Un calcul exact pour garder tes pourcentages !',
    '🏆 Balle Smash apparue ! Trouve la fraction exacte avant Ganondorf !'
  ];

  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a || 1;
  }

  function simplifyFrac(num, den) {
    if (den < 0) {
      num = -num;
      den = -den;
    }
    const g = gcd(num, den);
    return [num / g, den / g];
  }

  function fmtFracText(num, den) {
    const [n, d] = simplifyFrac(num, den);
    return d === 1 ? `${n}` : `${n}/${d}`;
  }

  function fracHTML(num, den) {
    return `<span class="frac"><span class="frac-n">${num}</span><span class="frac-d">${den}</span></span>`;
  }

  function makeFracChoices(ansNum, ansDen, extras = []) {
    const [an, ad] = simplifyFrac(ansNum, ansDen);
    const correctStr = fmtFracText(an, ad);
    const set = new Set([correctStr]);

    for (const [en, ed] of extras) {
      if (set.size >= 4) break;
      if (!ed || !Number.isFinite(en) || !Number.isFinite(ed)) continue;
      set.add(fmtFracText(en, ed));
    }

    let tries = 0;
    while (set.size < 4 && tries < 50) {
      tries++;
      const dn = randInt(-3, 3);
      const dd = pick([0, 0, 1, 2]);
      const cn = an + (dn === 0 ? 1 : dn);
      const cd = Math.max(2, ad + dd);
      if (cn === 0) continue;
      set.add(fmtFracText(cn, cd));
    }
    return shuffle([...set]);
  }

  function generateFractions(level) {
    const story = pick(SMASH_STORIES);
    const roll = Math.random();
    const diff = level <= 3 ? 1 : level <= 6 ? 2 : 3;

    // Paliers 8 à 10 : Problèmes de partage OU priorités opératoires sur les fractions !
    if (level >= 8 && roll < 0.48) {
      if (Math.random() < 0.5) {
        // Problème de reste (1 - a/b - c/d)
        const combos = [
          [1, 3, 1, 4],
          [1, 2, 1, 5],
          [1, 3, 1, 6],
          [2, 5, 1, 4],
          [1, 4, 2, 5]
        ];
        const [n1, d1, n2, d2] = pick(combos);
        const cd = (d1 * d2) / gcd(d1, d2);
        const taken = n1 * (cd / d1) + n2 * (cd / d2);
        const rem = cd - taken;
        const [an, ad] = simplifyFrac(rem, cd);
        const ans = fmtFracText(an, ad);
        return {
          topic: 'fractions',
          category: `💥 Fractions • Problème (Palier ${level})`,
          story: '💥 Butin Smash Bros ! Deux combattants se partagent un coffre d’objets.',
          prompt: `Mario prend ${n1}/${d1} du coffre et Kirby prend ${n2}/${d2}. Quelle FRACTION du coffre reste-t-il ?`,
          visualHtml: `<div class="math-display frac-display">1 <span class="frac-op">−</span> ${fracHTML(n1, d1)} <span class="frac-op">−</span> ${fracHTML(n2, d2)}</div>`,
          hint: `Mets tout sur le dénominateur commun <strong>${cd}</strong> (rappel : 1 = ${cd}/${cd}), puis soustrais les deux parts !`,
          answer: ans,
          choices: makeFracChoices(an, ad, [[taken, cd], [an + 1, ad], [1, cd]]),
          explain: `Parts prises sur ${cd} : ${n1 * (cd / d1)}/${cd} + ${n2 * (cd / d2)}/${cd} = ${taken}/${cd}.<br>Il reste : ${cd}/${cd} − ${taken}/${cd} = ${rem}/${cd} → <strong>${ans}</strong>.`
        };
      }
      // Priorités : a/b + c/d × e/f
      const [n1, d1] = pick([[1, 2], [1, 3], [1, 4], [2, 3]]);
      const [n2, d2] = pick([[2, 3], [3, 4], [2, 5], [3, 5]]);
      const [n3, d3] = pick([[1, 2], [3, 4], [2, 3], [5, 6]]);
      const [pn, pd] = simplifyFrac(n2 * n3, d2 * d3);
      const cd = (d1 * pd) / gcd(d1, pd);
      const [an, ad] = simplifyFrac(n1 * (cd / d1) + pn * (cd / pd), cd);
      const ans = fmtFracText(an, ad);
      return {
        topic: 'fractions',
        category: `💥 Fractions • Priorités (Palier ${level})`,
        story,
        prompt: `Attention à la priorité de la multiplication ! Calcule :`,
        visualHtml: `<div class="math-display frac-display">${fracHTML(n1, d1)} <span class="frac-op">+</span> ${fracHTML(n2, d2)} <span class="frac-op">×</span> ${fracHTML(n3, d3)}</div>`,
        hint: `Fais d’abord la multiplication ${n2}/${d2} × ${n3}/${d3} (= ${pn}/${pd}), puis additionne avec ${n1}/${d1} !`,
        answer: ans,
        choices: makeFracChoices(an, ad, [[pn, pd], [an + 1, ad], [an, ad + 1]]),
        explain: `1) Produit : ${n2}/${d2} × ${n3}/${d3} = <strong>${pn}/${pd}</strong>.<br>2) Addition : ${n1}/${d1} + ${pn}/${pd} = <strong>${ans}</strong>.`
      };
    }

    // 1) Simplification de fraction (20%)
    if (roll < 0.20) {
      const basePairs = [[1, 2], [2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [3, 7], [5, 6], [4, 7]];
      const [bn, bd] = pick(basePairs);
      const mult = diff === 1 ? pick([2, 3, 4, 5]) : pick([3, 4, 5, 6, 7]);
      const n = bn * mult;
      const d = bd * mult;
      const ans = fmtFracText(bn, bd);

      return {
        topic: 'fractions',
        category: '💥 Fractions • Simplification',
        story,
        prompt: `Simplifie cette fraction au maximum (forme irréductible) :`,
        visualHtml: `<div class="math-display frac-display">${fracHTML(n, d)}</div>`,
        hint: `Cherche un diviseur commun à ${n} et ${d} (ici, essaie de diviser le haut et le bas par <strong>${mult}</strong> !).`,
        answer: ans,
        choices: makeFracChoices(bn, bd, [[bn + 1, bd], [bn, bd + 1], [n / 2 === Math.floor(n / 2) && d / 2 === Math.floor(d / 2) ? n / 2 : bn + 2, bd]]),
        explain: `On divise le numérateur et le dénominateur par <strong>${mult}</strong> :<br>${n} ÷ ${mult} = <strong>${bn}</strong> et ${d} ÷ ${mult} = <strong>${bd}</strong> → <strong>${ans}</strong>.`
      };
    }

    // 2) Multiplication de fractions (28%)
    if (roll < 0.48) {
      const n1 = randInt(1, diff === 1 ? 5 : 7);
      const d1 = randInt(2, diff === 1 ? 6 : 8);
      const n2 = randInt(1, diff === 1 ? 5 : 7);
      const d2 = randInt(2, diff === 1 ? 6 : 8);
      const [an, ad] = simplifyFrac(n1 * n2, d1 * d2);
      const ans = fmtFracText(an, ad);

      return {
        topic: 'fractions',
        category: '💥 Fractions • Multiplication',
        story,
        prompt: `Calcule ce produit (résultat simplifié) :`,
        visualHtml: `<div class="math-display frac-display">${fracHTML(n1, d1)} <span class="frac-op">×</span> ${fracHTML(n2, d2)}</div>`,
        hint: `Pour multiplier deux fractions : <strong>haut × haut</strong> et <strong>bas × bas</strong>, puis simplifie si possible !`,
        answer: ans,
        choices: makeFracChoices(an, ad, [[n1 + n2, d1 + d2], [n1 * d2, d1 * n2], [an + 1, ad]]),
        explain: `Haut × haut : ${n1} × ${n2} = ${n1 * n2}. Bas × bas : ${d1} × ${d2} = ${d1 * d2}.<br>Forme simplifiée : <strong>${ans}</strong>.`
      };
    }

    // 3) Division de fractions — Programme 4ème ! (24% en diff >= 2, 15% en diff 1)
    if (roll < (diff === 1 ? 0.63 : 0.72)) {
      const n1 = randInt(1, 5);
      const d1 = randInt(2, 6);
      const n2 = randInt(1, 5);
      const d2 = randInt(2, 6);
      const [an, ad] = simplifyFrac(n1 * d2, d1 * n2);
      const ans = fmtFracText(an, ad);

      return {
        topic: 'fractions',
        category: '💥 Fractions • Division (Inverse)',
        story,
        prompt: `Calcule ce quotient de fractions (résultat simplifié) :`,
        visualHtml: `<div class="math-display frac-display">${fracHTML(n1, d1)} <span class="frac-op">÷</span> ${fracHTML(n2, d2)}</div>`,
        hint: `Diviser par ${n2}/${d2}, c’est <strong>multiplier par son inverse ${d2}/${n2}</strong> !`,
        answer: ans,
        choices: makeFracChoices(an, ad, [[n1 * n2, d1 * d2], [d1 * n2, n1 * d2], [an + 1, ad]]),
        explain: `On multiplie par l’inverse : ${n1}/${d1} × <strong>${d2}/${n2}</strong> = ${n1 * d2}/${d1 * n2}.<br>Forme simplifiée : <strong>${ans}</strong>.`
      };
    }

    // 4) Addition / Soustraction de fractions (le reste)
    const isSub = Math.random() < 0.45;
    let n1, d1, n2, d2;
    if (diff === 1) {
      // Dénominateur identique ou multiple simple
      if (Math.random() < 0.5) {
        d1 = pick([4, 5, 6, 7, 8, 9]);
        d2 = d1;
        n1 = randInt(2, d1 + 2);
        n2 = randInt(1, isSub ? n1 - 1 : 5);
      } else {
        d1 = pick([2, 3, 4, 5]);
        const k = pick([2, 3]);
        d2 = d1 * k;
        n1 = randInt(1, 4);
        n2 = randInt(1, 5);
        if (isSub && n1 * k <= n2) n1 += 2;
      }
    } else {
      // Dénominateurs différents (ex: 3 et 4, 2 et 5...)
      const pairs = [[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [3, 6], [4, 6]];
      [d1, d2] = pick(pairs);
      n1 = randInt(1, 5);
      n2 = randInt(1, 5);
      if (isSub && diff === 2 && n1 * d2 <= n2 * d1) {
        [n1, d1, n2, d2] = [n2, d2, n1, d1];
        if (n1 * d2 === n2 * d1) n1++;
      }
    }

    const commonDen = (d1 * d2) / gcd(d1, d2);
    const m1 = commonDen / d1;
    const m2 = commonDen / d2;
    const rawNum = isSub ? n1 * m1 - n2 * m2 : n1 * m1 + n2 * m2;
    const [an, ad] = simplifyFrac(rawNum, commonDen);
    const ans = fmtFracText(an, ad);
    const opSym = isSub ? '−' : '+';

    return {
      topic: 'fractions',
      category: isSub ? '💥 Fractions • Soustraction' : '💥 Fractions • Addition',
      story,
      prompt: `Mets au même dénominateur puis calcule (résultat simplifié) :`,
      visualHtml: `<div class="math-display frac-display">${fracHTML(n1, d1)} <span class="frac-op">${opSym}</span> ${fracHTML(n2, d2)}</div>`,
      hint: d1 === d2
        ? `Les dénominateurs sont déjà identiques (${d1}) ! Calcule juste ${n1} ${opSym} ${n2} au numérateur.`
        : `Mets les deux fractions sur <strong>${commonDen}</strong> avant d’additionner ou soustraire les numérateurs !`,
      answer: ans,
      choices: makeFracChoices(an, ad, [[isSub ? n1 - n2 : n1 + n2, d1 + d2], [an + 1, ad], [an, ad + 1]]),
      explain: d1 === d2
        ? `Même dénominateur (${d1}) : (${n1} ${opSym} ${n2}) / ${d1} = ${rawNum}/${commonDen} → <strong>${ans}</strong>.`
        : `Sur ${commonDen} : ${n1 * m1}/${commonDen} ${opSym} ${n2 * m2}/${commonDen} = ${rawNum}/${commonDen} → <strong>${ans}</strong>.`
    };
  }

  // ==================== 5. NOMBRES RATIONNELS 4ÈME (DRAGON BALL) ====================
  const DBZ_STORIES = [
    '🐉 Entraînement dans la Salle de l’Esprit et du Temps ! Dompte les nombres rationnels !',
    '⚡ Freezer concentre son rayon mortel : maîtrise les fractions négatives !',
    '🔥 Cell Parfait teste ton niveau : ne te trompe pas de signe sur ce rationnel !',
    '💥 Kid Buu détruit tout sur son passage : un calcul rationnel parfait pour le stopper !'
  ];

  function generateRationnels(level) {
    const story = pick(DBZ_STORIES);
    const roll = Math.random();

    // Paliers 9–10 : Enchaînements complexes de rationnels relatifs (priorités + négatifs)
    if (level >= 9 && roll < 0.50) {
      const n1 = pick([-1, -2, 1, 2]);
      const d1 = pick([2, 3, 4]);
      const n2 = pick([-2, -3, 2, 3]);
      const d2 = pick([3, 4, 5]);
      const n3 = pick([-3, -2, 2, 4]);
      const d3 = pick([3, 4, 5]);
      const [pn, pd] = simplifyFrac(n2 * n3, d2 * d3);
      const cd = (d1 * pd) / gcd(d1, pd);
      const [an, ad] = simplifyFrac(n1 * (cd / d1) + pn * (cd / pd), cd);
      const ans = fmtFracText(an, ad);

      return {
        topic: 'rationnels',
        category: `🐉 Rationnels • Priorités (Palier ${level})`,
        story,
        prompt: `Calcule cette expression de nombres rationnels (résultat simplifié) :`,
        visualHtml: `<div class="math-display frac-display">${fracHTML(n1, d1)} <span class="frac-op">+</span> (${fracHTML(n2, d2)}) <span class="frac-op">×</span> (${fracHTML(n3, d3)})</div>`,
        hint: `1) Multiplie d’abord (${n2}/${d2}) × (${n3}/${d3}) avec la règle des signes. 2) Mets au même dénominateur avec ${n1}/${d1} !`,
        answer: ans,
        choices: makeFracChoices(an, ad, [[-an, ad], [pn, pd], [an + 1, ad]]),
        explain: `1) Produit : (${n2}/${d2}) × (${n3}/${d3}) = <strong>${fmtFracText(pn, pd)}</strong>.<br>2) Somme : ${n1}/${d1} + (${fmtFracText(pn, pd)}) = <strong>${ans}</strong>.`
      };
    }

    // Paliers 1–3 : Signe et simplification de rationnels négatifs OU conversion décimal <-> fraction
    if (level <= 3 && roll < 0.55) {
      if (Math.random() < 0.5) {
        const [bn, bd] = pick([[1, 2], [2, 3], [3, 4], [2, 5], [3, 5], [5, 6]]);
        const mult = pick([2, 3, 4]);
        const bothNeg = Math.random() < 0.5;
        const n = bothNeg ? -bn * mult : (Math.random() < 0.5 ? -bn * mult : bn * mult);
        const d = bothNeg ? -bd * mult : (n < 0 ? bd * mult : -bd * mult);
        const [an, ad] = simplifyFrac(n, d);
        const ans = fmtFracText(an, ad);

        return {
          topic: 'rationnels',
          category: `🐉 Rationnels • Signes (Palier ${level})`,
          story,
          prompt: `Simplifie ce nombre rationnel (attention aux signes !) :`,
          visualHtml: `<div class="math-display frac-display">${fracHTML(n, d)}</div>`,
          hint: bothNeg
            ? `Deux signes (−) en haut et en bas donnent un résultat <strong>positif (+)</strong> !`
            : `Un seul signe (−) donne un rationnel <strong>négatif (−)</strong>. Simplifie ensuite par ${mult}.`,
          answer: ans,
          choices: makeFracChoices(an, ad, [[-an, ad], [an + 1, ad], [an, ad + 1]]),
          explain: `${bothNeg ? '(−) ÷ (−) = (+).' : 'Signes contraires → résultat (−).'}<br>Simplifié par ${mult} → <strong>${ans}</strong>.`
        };
      }
      // Décimal négatif -> fraction simplifiée
      const decList = [
        { dec: '-0,5', n: -1, d: 2 },
        { dec: '-0,25', n: -1, d: 4 },
        { dec: '-0,75', n: -3, d: 4 },
        { dec: '-1,5', n: -3, d: 2 },
        { dec: '-0,2', n: -1, d: 5 },
        { dec: '-0,4', n: -2, d: 5 }
      ];
      const item = pick(decList);
      const ans = fmtFracText(item.n, item.d);
      return {
        topic: 'rationnels',
        category: `🐉 Rationnels • Décimal → Fraction (Palier ${level})`,
        story,
        prompt: `Écris ce nombre décimal sous forme de fraction irréductible :`,
        visualHtml: `<div class="math-display">${item.dec}</div>`,
        hint: `Transforme d’abord en dixièmes ou centièmes (ex: −0,5 = −5/10), puis simplifie !`,
        answer: ans,
        choices: makeFracChoices(item.n, item.d, [[-item.n, item.d], [item.n - 1, item.d], [item.n, item.d + 1]]),
        explain: `${item.dec} = <strong>${ans}</strong>.`
      };
    }

    // Comparaison de rationnels négatifs (Paliers 2 à 6)
    if (level >= 2 && level <= 6 && roll < 0.35) {
      const pairs = [
        [-2, 3, -5, 6],
        [-1, 2, -3, 4],
        [-3, 4, -5, 8],
        [-2, 5, -3, 10],
        [-1, 3, -4, 9]
      ];
      const [n1, d1, n2, d2] = pick(pairs);
      const v1 = n1 / d1;
      const v2 = n2 / d2;
      const biggest = v1 > v2 ? `${n1}/${d1}` : `${n2}/${d2}`;
      const cd = (d1 * d2) / gcd(d1, d2);

      return {
        topic: 'rationnels',
        category: `🐉 Rationnels • Comparaison (Palier ${level})`,
        story,
        prompt: `Quel est le PLUS GRAND de ces deux nombres rationnels négatifs ?`,
        visualHtml: `<div class="math-display frac-display">${fracHTML(n1, d1)} <span class="frac-op">ou</span> ${fracHTML(n2, d2)}</div>`,
        hint: `Mets les deux fractions sur <strong>${cd}</strong> : chez les négatifs, le plus grand est celui le plus proche de 0 !`,
        answer: biggest,
        choices: [`${n1}/${d1}`, `${n2}/${d2}`],
        forceQcm: true,
        explain: `Sur ${cd} : ${n1}/${d1} = <strong>${n1 * (cd / d1)}/${cd}</strong> et ${n2}/${d2} = <strong>${n2 * (cd / d2)}/${cd}</strong>.<br>Comme ${Math.max(n1 * (cd / d1), n2 * (cd / d2))} > ${Math.min(n1 * (cd / d1), n2 * (cd / d2))}, le plus grand est <strong>${biggest}</strong> !`
      };
    }

    // Produit ou quotient de rationnels négatifs (dès Palier 5)
    if (level >= 5 && roll < 0.72) {
      const isDiv = Math.random() < 0.45;
      const n1 = pick([-5, -4, -3, -2, -1, 2, 3, 4]);
      const d1 = pick([2, 3, 4, 5, 6]);
      const n2 = pick([-5, -4, -3, -2, 2, 3, 4]);
      const d2 = pick([2, 3, 4, 5, 6]);
      const fn1 = n1 > 0 && n2 > 0 ? -n1 : n1;
      const [an, ad] = isDiv ? simplifyFrac(fn1 * d2, d1 * n2) : simplifyFrac(fn1 * n2, d1 * d2);
      const ans = fmtFracText(an, ad);

      return {
        topic: 'rationnels',
        category: isDiv ? `🐉 Rationnels • Division (Palier ${level})` : `🐉 Rationnels • Produit (Palier ${level})`,
        story,
        prompt: `Calcule en appliquant la règle des signes (résultat simplifié) :`,
        visualHtml: `<div class="math-display frac-display">(${fracHTML(fn1, d1)}) <span class="frac-op">${isDiv ? '÷' : '×'}</span> (${fracHTML(n2, d2)})</div>`,
        hint: isDiv
          ? `Multiplie (${fn1}/${d1}) par l’inverse (${d2}/${n2}) et applique la règle des signes !`
          : `Mêmes signes = (+), signes contraires = (−). Puis haut × haut et bas × bas !`,
        answer: ans,
        choices: makeFracChoices(an, ad, [[-an, ad], [an + 1, ad], [fn1 * n2, d1 * d2]]),
        explain: isDiv
          ? `(${fn1}/${d1}) × (${d2}/${n2}) = ${fn1 * d2}/${d1 * n2} → <strong>${ans}</strong>.`
          : `(${fn1} × ${n2}) / (${d1} × ${d2}) = ${fn1 * n2}/${d1 * d2} → <strong>${ans}</strong>.`
      };
    }

    // Somme / Différence de rationnels relatifs
    const isSub = Math.random() < 0.5;
    const pairs = level <= 4 ? [[2, 4], [3, 6], [2, 6], [4, 4], [5, 5]] : [[2, 3], [3, 4], [2, 5], [3, 5], [4, 6]];
    const [d1, d2] = pick(pairs);
    const n1 = pick([-5, -4, -3, -2, -1, 1, 2, 3]);
    const n2 = pick([-4, -3, -2, -1, 1, 2, 3]);
    const fn1 = n1 > 0 && n2 > 0 ? -n1 : n1;
    const cd = (d1 * d2) / gcd(d1, d2);
    const rawNum = isSub ? fn1 * (cd / d1) - n2 * (cd / d2) : fn1 * (cd / d1) + n2 * (cd / d2);
    const [an, ad] = simplifyFrac(rawNum, cd);
    const ans = fmtFracText(an, ad);

    return {
      topic: 'rationnels',
      category: isSub ? `🐉 Rationnels • Différence (Palier ${level})` : `🐉 Rationnels • Somme (Palier ${level})`,
      story,
      prompt: `Calcule ce nombre rationnel (résultat simplifié) :`,
      visualHtml: `<div class="math-display frac-display">${fracHTML(fn1, d1)} <span class="frac-op">${isSub ? '−' : '+'}</span> (${fracHTML(n2, d2)})</div>`,
      hint: `Mets sur le dénominateur commun <strong>${cd}</strong>, puis calcule le numérateur avec les règles des relatifs !`,
      answer: ans,
      choices: makeFracChoices(an, ad, [[-an, ad], [an + 1, ad], [an - 1, ad]]),
      explain: `Sur ${cd} : ${fn1 * (cd / d1)}/${cd} ${isSub ? '−' : '+'} (${n2 * (cd / d2)}/${cd}) = ${rawNum}/${cd} → <strong>${ans}</strong>.`
    };
  }

  // ==================== API PUBLIQUE ====================
  function generateQuest(world, level = 1, count = 8) {
    const lvl = Math.max(1, Math.min(10, Number(level) || 1));
    const list = [];
    for (let i = 0; i < count; i++) {
      if (world === 'pythagore') list.push(generatePythagore(lvl));
      else if (world === 'relatifs') list.push(generateRelatifs(lvl));
      else if (world === 'stats') list.push(generateStats(lvl));
      else if (world === 'fractions') list.push(generateFractions(lvl));
      else if (world === 'rationnels') list.push(generateRationnels(lvl));
      else {
        // Boss Rush One Punch Man : alterne les 5 chapitres !
        const slot = i % 5;
        const q =
          slot === 0 ? generatePythagore(lvl)
          : slot === 1 ? generateRelatifs(lvl)
          : slot === 2 ? generateStats(lvl)
          : slot === 3 ? generateFractions(lvl)
          : generateRationnels(lvl);
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
