// Parcours pédagogiques interactifs pas-à-pas (Le Dojo des Senseis)
// Conçu pour le TDAH : 4 micro-étapes visuelles + 1 mini-vérification guidée par chapitre

const MathLessons = (() => {
  const COURSES = {
    pythagore: {
      id: 'pythagore',
      title: '⛏️ Dojo Pythagore (Minecraft)',
      subtitle: 'Comprendre le théorème de Pythagore en 4 étapes simples',
      steps: [
        {
          badge: 'ÉTAPE 1 / 4 • LA BASE',
          title: 'Repérer l’Hypoténuse en 2 secondes',
          body: `
            <p>Le théorème de Pythagore ne fonctionne <strong>que dans un triangle rectangle</strong> (qui possède un petit carré d’angle droit).</p>
            <div class="lesson-visual">
              <svg viewBox="0 0 320 155" style="max-width:300px;width:100%;">
                <polygon points="50,25 50,130 250,130" fill="rgba(56,189,248,0.16)" stroke="#38bdf8" stroke-width="3.5"/>
                <rect x="50" y="112" width="18" height="18" fill="none" stroke="#facc15" stroke-width="3"/>
                <line x1="72" y1="108" x2="145" y2="75" stroke="#facc15" stroke-width="2" stroke-dasharray="4 3"/>
                <text x="160" y="68" fill="#facc15" font-size="13" font-weight="900">HYPOTÉNUSE (le + grand)</text>
                <text x="40" y="84" text-anchor="end" fill="#86efac" font-size="12" font-weight="800">Côté 1</text>
                <text x="150" y="148" text-anchor="middle" fill="#86efac" font-size="12" font-weight="800">Côté 2</text>
              </svg>
            </div>
            <div class="lesson-rule">🎯 <strong>Règle d’or :</strong> L’hypoténuse est toujours le côté <strong>en face de l’angle droit</strong> (et c’est toujours le plus long !).</div>
          `
        },
        {
          badge: 'ÉTAPE 2 / 4 • CALCULER L’HYPOTÉNUSE',
          title: 'Tu cherches le plus grand côté ? → ON ADDITIONNE (+)',
          body: `
            <p>Quand tu connais les 2 côtés de l’angle droit (exemple : <strong>3</strong> et <strong>4</strong>) et que tu cherches l’hypoténuse :</p>
            <ol class="lesson-steps-list">
              <li>Mets chaque côté au carré : <code>3² = 9</code> et <code>4² = 16</code></li>
              <li><strong>Additionne</strong> les deux : <code>9 + 16 = 25</code></li>
              <li>Prends la <strong>racine carrée (√)</strong> : <code>√25 = 5</code> !</li>
            </ol>
            <div class="lesson-rule">🧮 <strong>Astuce Calculatrice :</strong> Tape directement <code>√(3² + 4²)</code> puis <code>=</code> !</div>
          `
        },
        {
          badge: 'ÉTAPE 3 / 4 • CALCULER UN PETIT CÔTÉ',
          title: 'Tu connais déjà l’hypoténuse ? → ON SOUSTRAIT (−)',
          body: `
            <p>C’est le piège classique ! Si tu connais déjà l’hypoténuse (ex : <strong>10</strong>) et un côté (ex : <strong>6</strong>), le côté manquant est forcément <strong>plus petit que 10</strong> :</p>
            <ol class="lesson-steps-list">
              <li>Mets les deux au carré : <code>10² = 100</code> et <code>6² = 36</code></li>
              <li><strong>Soustrais</strong> (le grand moins le petit) : <code>100 − 36 = 64</code></li>
              <li>Prends la <strong>racine carrée (√)</strong> : <code>√64 = 8</code> !</li>
            </ol>
            <div class="lesson-rule">💡 <strong>Astuce Calculatrice :</strong> Tape <code>√(10² − 6²)</code> puis <code>=</code> !</div>
          `
        },
        {
          badge: 'ÉTAPE 4 / 4 • VÉRIFICATION RAPIDE',
          title: 'La Réciproque + ton Mini-Test !',
          body: `
            <p>Pour savoir si un triangle (ex : 6, 8 et 10) est <strong>rectangle</strong>, on compare séparément :</p>
            <div class="lesson-compare">
              <div><strong>Plus grand²</strong><br><code>10² = 100</code></div>
              <div class="lesson-vs">VS</div>
              <div><strong>Côté1² + Côté2²</strong><br><code>6² + 8² = 36 + 64 = 100</code></div>
            </div>
            <p style="margin-top:8px;">✅ C’est égal (<code>100 = 100</code>) → <strong>OUI, il est rectangle !</strong><br>❌ Pas égal → <strong>NON, pas rectangle !</strong></p>
          `,
          check: {
            question: 'Mini-test : Un triangle rectangle a pour côtés de l’angle droit 6 et 8. Que vaut l’hypoténuse ?',
            options: ['10 (car √(6² + 8²) = √100)', '14 (car 6 + 8)', '2 (car 8 − 6)'],
            correctIndex: 0,
            okMsg: 'Parfait ! 6² + 8² = 36 + 64 = 100, et √100 = 10. Tu es prêt pour la Forteresse !',
            retryMsg: 'Presque ! On met au carré puis on additionne : 6² + 8² = 36 + 64 = 100, puis √100 = 10.'
          }
        }
      ]
    },

    relatifs: {
      id: 'relatifs',
      title: '⚔️ Dojo des Nombres Relatifs (Berserk)',
      subtitle: 'Maîtriser les signes (+) et (−) sans jamais hésiter',
      steps: [
        {
          badge: 'ÉTAPE 1 / 4 • ADDITION (+)',
          title: 'La technique de l’Ascenseur',
          body: `
            <p>Imagine un immeuble avec le <strong>rez-de-chaussée (0)</strong>, les étages au-dessus (<code>+</code>) et les sous-sols (<code>−</code>) :</p>
            <div class="lesson-elevator">
              <span>-8</span><span>-5</span><span class="zero">0</span><span>+3</span><span>+7</span>
            </div>
            <ul class="lesson-steps-list">
              <li><strong>Même signe :</strong> tu vas dans le même sens.<br>Ex : <code>−4 + (−5) = −9</code> (tu descends encore plus bas).</li>
              <li><strong>Signes différents :</strong> le plus fort gagne et on fait l’écart.<br>Ex : <code>−8 + 5 = −3</code> • <code>−4 + 10 = +6</code>.</li>
            </ul>
          `
        },
        {
          badge: 'ÉTAPE 2 / 4 • SOUSTRACTION (−)',
          title: 'Le super-pouvoir de « − (−) »',
          body: `
            <p>En 4ème, le piège n°1 c’est quand il y a <strong>deux signes moins qui se suivent</strong> :</p>
            <div class="lesson-big-formula">a − (−b)  =  a + b</div>
            <ul class="lesson-steps-list">
              <li><code>7 − (−4)</code> se transforme en <code>7 + 4 = 11</code></li>
              <li><code>−5 − (−8)</code> se transforme en <code>−5 + 8 = +3</code></li>
            </ul>
            <div class="lesson-rule">⚔️ <strong>Astuce :</strong> Enlever un malus (un négatif), c’est gagner un bonus (+) !</div>
          `
        },
        {
          badge: 'ÉTAPE 3 / 4 • MULTIPLICATION (×) ET DIVISION (÷)',
          title: 'La Règle des Signes (super facile !)',
          body: `
            <p>Pour <strong>×</strong> et <strong>÷</strong>, on s’occupe d’abord du <strong>signe</strong>, puis on calcule normalement :</p>
            <div class="sign-grid">
              <span class="sign-ok">(+) et (+) → (+)</span>
              <span class="sign-ok">(−) et (−) → (+)</span>
              <span class="sign-bad">(+) et (−) → (−)</span>
              <span class="sign-bad">(−) et (+) → (−)</span>
            </div>
            <div class="lesson-rule">🧠 <strong>À retenir en 1 phrase :</strong> Mêmes signes = <strong>+</strong> • Signes différents = <strong>−</strong>.<br>Ex : <code>(−4) × (−3) = +12</code> • <code>(−20) ÷ 5 = −4</code>.</div>
          `
        },
        {
          badge: 'ÉTAPE 4 / 4 • PRIORITÉS & MINI-TEST',
          title: 'L’ordre d’attaque dans un grand calcul',
          body: `
            <p>Quand il y a plusieurs opérations mélangées, suis toujours cet ordre :</p>
            <ol class="lesson-steps-list">
              <li><strong>Parenthèses</strong> en premier : <code>( ... )</code></li>
              <li><strong>Multiplications et Divisions</strong> : <code>×</code> et <code>÷</code></li>
              <li><strong>Additions et Soustractions</strong> à la fin : <code>+</code> et <code>−</code></li>
            </ol>
            <p>Ex : <code>10 + (−3) × 4</code> → d’abord <code>(−3) × 4 = −12</code> → puis <code>10 + (−12) = −2</code>.</p>
          `,
          check: {
            question: 'Mini-test : Combien vaut (−5) × (−4) ?',
            options: ['+20 (deux signes − donnent +)', '−20', '−9'],
            correctIndex: 0,
            okMsg: 'Bien joué ! Deux signes (−) multipliés ensemble donnent toujours (+). En avant !',
            retryMsg: 'Rappel : (−) × (−) = (+) car ce sont les mêmes signes ! Donc 5 × 4 = +20.'
          }
        }
      ]
    },

    stats: {
      id: 'stats',
      title: '⚡ Dojo des Statistiques (Pokémon)',
      subtitle: 'Ne plus jamais confondre Moyenne, Médiane et Étendue',
      steps: [
        {
          badge: 'ÉTAPE 1 / 4 • LA MOYENNE',
          title: 'La Moyenne = le partage équitable',
          body: `
            <p>Pour trouver la <strong>moyenne</strong> d’une équipe (exemple : 3 Pokémon avec <strong>20, 30 et 40 PV</strong>) :</p>
            <ol class="lesson-steps-list">
              <li>On <strong>additionne toutes les valeurs</strong> : <code>20 + 30 + 40 = 90</code></li>
              <li>On <strong>divise par le nombre de Pokémon</strong> (ici 3) : <code>90 ÷ 3 = 30</code></li>
            </ol>
            <div class="lesson-big-formula">Moyenne = Somme ÷ Effectif total</div>
          `
        },
        {
          badge: 'ÉTAPE 2 / 4 • LA MÉDIANE',
          title: 'La Médiane = la valeur du MILIEU (après tri !)',
          body: `
            <div class="lesson-rule">⚠️ <strong>PIÈGE N°1 :</strong> Il faut TOUJOURS <strong>TRIER du plus petit au plus grand</strong> avant de chercher le milieu !</div>
            <ul class="lesson-steps-list" style="margin-top:10px;">
              <li><strong>Nombre impair</strong> (ex : 5 cartes triées <code>10 ; 20 ; [35] ; 50 ; 80</code>) → la médiane est pile celle du milieu : <strong>35</strong>.</li>
              <li><strong>Nombre pair</strong> (ex : 4 cartes triées <code>10 ; [20 ; 30] ; 50</code>) → on fait la moyenne des 2 du milieu : <code>(20 + 30) ÷ 2 = 25</code>.</li>
            </ul>
          `
        },
        {
          badge: 'ÉTAPE 3 / 4 • L’ÉTENDUE',
          title: 'L’Étendue = l’écart entre le plus fort et le plus faible',
          body: `
            <p>C’est le calcul le plus rapide du programme de 4ème !</p>
            <div class="lesson-big-formula">Étendue = MAX − MIN</div>
            <p>Exemple avec les PV <code>15 ; 82 ; 40 ; 28</code> :</p>
            <ul class="lesson-steps-list">
              <li>Le plus grand (MAX) = <strong>82</strong></li>
              <li>Le plus petit (MIN) = <strong>15</strong></li>
              <li>Étendue = <code>82 − 15 = 67</code> !</li>
            </ul>
          `
        },
        {
          badge: 'ÉTAPE 4 / 4 • EFFECTIFS & MINI-TEST',
          title: 'Moyenne pondérée (avec un tableau)',
          body: `
            <p>Quand plusieurs Pokémon ont la même puissance (ex : <strong>3 Pokémon à 10 PV</strong> et <strong>2 Pokémon à 20 PV</strong>) :</p>
            <ol class="lesson-steps-list">
              <li>Multiplie chaque valeur par son effectif : <code>(3 × 10) + (2 × 20) = 30 + 40 = 70</code></li>
              <li>Divise par le nombre total de Pokémon (<code>3 + 2 = 5</code>) : <code>70 ÷ 5 = 14</code> !</li>
            </ol>
          `,
          check: {
            question: 'Mini-test : Quelle est la MÉDIANE de cette série déjà triée : 12 ; 18 ; 25 ; 40 ; 90 ?',
            options: ['25 (c’est la valeur pile au milieu)', '78 (90 − 12)', '37 (la moyenne)'],
            correctIndex: 0,
            okMsg: 'Exact ! 25 est la 3ème valeur sur 5, pile au milieu. Tu gères les stats !',
            retryMsg: 'Attention à ne pas confondre ! 78 c’est l’étendue, 37 la moyenne. La médiane est la valeur du milieu : 25.'
          }
        }
      ]
    },

    fractions: {
      id: 'fractions',
      title: '💥 Dojo des Fractions (Smash Bros)',
      subtitle: 'Simplifier, additionner, multiplier et diviser des fractions en 4ème',
      steps: [
        {
          badge: 'ÉTAPE 1 / 4 • SIMPLIFIER',
          title: 'Rendre une fraction irréductible',
          body: `
            <p>Simplifier une fraction, c’est <strong>diviser le haut et le bas par le même nombre</strong> (sans jamais changer sa valeur !).</p>
            <div class="lesson-big-formula">12 / 18  →  (12 ÷ 6) / (18 ÷ 6)  =  2 / 3</div>
            <div class="lesson-rule">💥 <strong>Astuce :</strong> Pense aux tables de 2, 3, 5 et 10 pour repérer vite un diviseur commun !</div>
          `
        },
        {
          badge: 'ÉTAPE 2 / 4 • ADDITION & SOUSTRACTION',
          title: 'Règle d’or : MÊME DÉNOMINATEUR obligatoire !',
          body: `
            <p>On ne peut additionner ou soustraire que des parts de la <strong>même taille</strong> :</p>
            <ol class="lesson-steps-list">
              <li>On transforme les fractions pour avoir le <strong>même nombre en bas</strong>.<br>Ex : <code>1/2 + 1/4</code> → <code>2/4 + 1/4</code></li>
              <li>On additionne (ou soustrait) <strong>uniquement les nombres du haut</strong> : <code>(2 + 1) / 4 = 3/4</code> !</li>
            </ol>
            <div class="lesson-rule">⚠️ <strong>Piège classique :</strong> On n’additionne JAMAIS les dénominateurs entre eux !</div>
          `
        },
        {
          badge: 'ÉTAPE 3 / 4 • MULTIPLICATION (×)',
          title: 'La plus facile : Haut × Haut et Bas × Bas !',
          body: `
            <p>Pour multiplier deux fractions, <strong>pas besoin de même dénominateur</strong> !</p>
            <div class="lesson-big-formula">(2 / 3) × (5 / 7)  =  (2 × 5) / (3 × 7)  =  10 / 21</div>
            <p>Pense juste à simplifier ton résultat final si le haut et le bas ont un diviseur commun.</p>
          `
        },
        {
          badge: 'ÉTAPE 4 / 4 • DIVISION (÷) & MINI-TEST',
          title: 'Le Final Smash de 4ème : Multiplier par l’INVERSE !',
          body: `
            <p>Pour <strong>diviser par une fraction</strong>, tu la retournes (tu prends son inverse) et tu <strong>multiplies</strong> :</p>
            <div class="lesson-big-formula">(2 / 3) ÷ (4 / 5)  =  (2 / 3) × (5 / 4)  =  10 / 12  =  5 / 6</div>
          `,
          check: {
            question: 'Mini-test : Comment calcule-t-on (1 / 2) ÷ (3 / 5) ?',
            options: ['(1 / 2) × (5 / 3) = 5 / 6', '(1 / 2) × (3 / 5) = 3 / 10', '(1 + 3) / (2 + 5) = 4 / 7'],
            correctIndex: 0,
            okMsg: 'GAME SET ! Diviser par 3/5, c’est multiplier par son inverse 5/3 → 5/6 !',
            retryMsg: 'Rappel : on retourne la 2ème fraction ! 3/5 devient 5/3, puis on multiplie : (1×5)/(2×3) = 5/6.'
          }
        }
      ]
    },

    rationnels: {
      id: 'rationnels',
      title: '🐉 Dojo des Nombres Rationnels (Dragon Ball)',
      subtitle: 'Maîtriser les fractions négatives, signes, comparaisons et priorités',
      steps: [
        {
          badge: 'ÉTAPE 1 / 4 • QU’EST-CE QU’UN RATIONNEL ?',
          title: 'Un rationnel = un quotient de deux entiers (positif ou négatif)',
          body: `
            <p>Un <strong>nombre rationnel</strong> peut s’écrire sous forme de fraction <code>a / b</code> (avec <code>b ≠ 0</code>). Il peut être <strong>positif ou négatif</strong> !</p>
            <div class="lesson-big-formula">−(3 / 4)  =  (−3) / 4  =  3 / (−4)</div>
            <div class="lesson-rule">🐉 <strong>Règle des signes :</strong> Si le haut ET le bas sont négatifs, les deux moins s’annulent → <code>(−4) / (−6) = +4/6 = 2/3</code> !</div>
          `
        },
        {
          badge: 'ÉTAPE 2 / 4 • COMPARER & DÉCIMAUX',
          title: 'Passer d’un décimal à une fraction (et comparer)',
          body: `
            <ul class="lesson-steps-list">
              <li><strong>Décimal → Fraction :</strong> <code>−0,5 = −1/2</code> • <code>−0,25 = −1/4</code> • <code>0,75 = 3/4</code>.</li>
              <li><strong>Comparer deux rationnels :</strong> mets-les au <strong>même dénominateur positif</strong>, puis compare les numérateurs !</li>
            </ul>
            <div class="lesson-rule">⚠️ <strong>Attention aux négatifs :</strong> <code>−2/3 = −4/6</code> est <strong>PLUS GRAND</strong> que <code>−5/6</code> (car −4 &gt; −5 !).</div>
          `
        },
        {
          badge: 'ÉTAPE 3 / 4 • OPÉRATIONS AVEC DES SIGNES',
          title: 'Addition, Soustraction, Multiplication & Division de rationnels',
          body: `
            <ol class="lesson-steps-list">
              <li><strong>+ et − :</strong> même dénominateur, puis règle des relatifs au numérateur.<br>Ex : <code>−1/2 + 3/4 = −2/4 + 3/4 = 1/4</code>.</li>
              <li><strong>× et ÷ :</strong> règle des signes (mêmes signes = <code>+</code>, contraires = <code>−</code>), et pour <code>÷</code> on multiplie par l’<strong>inverse</strong> !</li>
            </ol>
            <div class="lesson-big-formula">(−2/3) × (−3/5)  =  +6/15  =  2/5</div>
          `
        },
        {
          badge: 'ÉTAPE 4 / 4 • PRIORITÉS & MINI-TEST',
          title: 'Enchaîner plusieurs opérations sur les rationnels',
          body: `
            <p>Toujours le même ordre sacré : <strong>1. Parenthèses</strong> → <strong>2. × et ÷</strong> → <strong>3. + et −</strong>.</p>
            <p>Ex : <code>1/2 + (−2/3) × (3/4)</code> → d’abord <code>(−2/3) × (3/4) = −1/2</code> → puis <code>1/2 + (−1/2) = 0</code> !</p>
          `,
          check: {
            question: 'Mini-test : Simplifie le nombre rationnel (−6) / (−8) :',
            options: ['3/4 (les deux signes − donnent +)', '−3/4', '−6/8'],
            correctIndex: 0,
            okMsg: 'Kamehameha ! (−) ÷ (−) = (+), et 6/8 simplifié par 2 donne 3/4 !',
            retryMsg: 'Rappel : deux signes négatifs s’annulent ! (−6)/(−8) = +6/8 = 3/4.'
          }
        }
      ]
    }
  };

  return { COURSES };
})();
