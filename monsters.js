// Illustrations SVG badass des Boss (100% hors-ligne, ultra net sur mobile & PC)

const BossArt = (() => {
  const SVGS = {
    creeper: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Creeper Géométrique">
        <defs><radialGradient id="bgC" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#22c55e" stop-opacity="0.45"/><stop offset="100%" stop-color="#0b0f19" stop-opacity="0"/></radialGradient></defs>
        <circle cx="50" cy="50" r="46" fill="url(#bgC)"/>
        <rect x="18" y="18" width="64" height="64" rx="6" fill="#22c55e" stroke="#14532d" stroke-width="4"/>
        <rect x="18" y="18" width="16" height="16" fill="#4ade80" opacity="0.6"/>
        <rect x="66" y="18" width="16" height="16" fill="#16a34a" opacity="0.7"/>
        <rect x="34" y="66" width="32" height="16" fill="#16a34a" opacity="0.5"/>
        <!-- Yeux + bouche Creeper -->
        <rect x="28" y="32" width="16" height="16" fill="#090d16"/>
        <rect x="56" y="32" width="16" height="16" fill="#090d16"/>
        <rect x="34" y="38" width="5" height="5" fill="#ef4444"/>
        <rect x="61" y="38" width="5" height="5" fill="#ef4444"/>
        <rect x="44" y="48" width="12" height="18" fill="#090d16"/>
        <rect x="36" y="56" width="8" height="18" fill="#090d16"/>
        <rect x="56" y="56" width="8" height="18" fill="#090d16"/>
      </svg>`,

    enderman: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Enderman">
        <circle cx="50" cy="50" r="46" fill="#a855f7" opacity="0.22"/>
        <rect x="20" y="18" width="60" height="64" rx="8" fill="#111827" stroke="#7e22ce" stroke-width="3.5"/>
        <!-- Yeux violets brillants -->
        <rect x="24" y="42" width="22" height="10" rx="2" fill="#e879f9"/>
        <rect x="32" y="44" width="8" height="6" fill="#ffffff"/>
        <rect x="54" y="42" width="22" height="10" rx="2" fill="#e879f9"/>
        <rect x="60" y="44" width="8" height="6" fill="#ffffff"/>
        <!-- Particules Ender -->
        <rect x="10" y="24" width="7" height="7" fill="#c084fc"/>
        <rect x="82" y="68" width="8" height="8" fill="#e879f9"/>
        <rect x="80" y="20" width="6" height="6" fill="#a855f7"/>
      </svg>`,

    enderdragon: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Ender Dragon">
        <circle cx="50" cy="50" r="46" fill="#9333ea" opacity="0.28"/>
        <!-- Cornes -->
        <polygon points="22,30 12,8 36,24" fill="#475569" stroke="#0f172a" stroke-width="2"/>
        <polygon points="78,30 88,8 64,24" fill="#475569" stroke="#0f172a" stroke-width="2"/>
        <!-- Tête de dragon -->
        <polygon points="22,26 78,26 84,66 64,84 36,84 16,66" fill="#1e1b4b" stroke="#c084fc" stroke-width="3"/>
        <polygon points="32,64 68,64 62,82 38,82" fill="#0f172a"/>
        <!-- Yeux fluorescents -->
        <polygon points="26,44 44,48 40,56 26,52" fill="#f0abfc"/>
        <polygon points="74,44 56,48 60,56 74,52" fill="#f0abfc"/>
        <!-- Crocs -->
        <polygon points="38,64 42,74 46,64" fill="#f8fafc"/>
        <polygon points="54,64 58,74 62,64" fill="#f8fafc"/>
      </svg>`,

    apostle: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Apôtre des Signes">
        <circle cx="50" cy="50" r="45" fill="#dc2626" opacity="0.26"/>
        <path d="M22,38 Q10,14 28,12 Q30,24 38,28 Z" fill="#991b1b" stroke="#0f172a" stroke-width="2"/>
        <path d="M78,38 Q90,14 72,12 Q70,24 62,28 Z" fill="#991b1b" stroke="#0f172a" stroke-width="2"/>
        <path d="M22,36 Q50,18 78,36 L74,74 Q50,90 26,74 Z" fill="#450a0a" stroke="#ef4444" stroke-width="3"/>
        <polygon points="30,46 46,52 32,56" fill="#facc15"/>
        <polygon points="70,46 54,52 68,56" fill="#facc15"/>
        <path d="M36,70 L42,64 L48,70 L54,64 L60,70 L64,66" fill="none" stroke="#f8fafc" stroke-width="3" stroke-linecap="round"/>
      </svg>`,

    zodd: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Zodd l'Immortel">
        <circle cx="50" cy="50" r="46" fill="#7f1d1d" opacity="0.35"/>
        <!-- Grandes cornes courbées -->
        <path d="M26,34 Q4,20 14,6 Q22,18 34,26 Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
        <path d="M74,34 Q96,20 86,6 Q78,18 66,26 Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
        <!-- Crinière sombre -->
        <polygon points="18,32 50,16 82,32 88,68 50,90 12,68" fill="#1f2937" stroke="#ef4444" stroke-width="3"/>
        <!-- Yeux rouges -->
        <polygon points="28,46 46,52 30,56" fill="#ef4444"/>
        <polygon points="72,46 54,52 70,56" fill="#ef4444"/>
        <!-- Crocs -->
        <polygon points="34,68 39,80 44,68" fill="#ffffff"/>
        <polygon points="56,68 61,80 66,68" fill="#ffffff"/>
      </svg>`,

    eclipse: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Chevalier de l'Éclipse">
        <circle cx="50" cy="50" r="44" fill="#090d16" stroke="#ef4444" stroke-width="4"/>
        <circle cx="50" cy="50" r="36" fill="none" stroke="#f97316" stroke-width="2" stroke-dasharray="5 4"/>
        <!-- Casque faucon noir -->
        <path d="M28,74 L26,38 Q50,14 74,38 L72,74 L50,86 Z" fill="#1e293b" stroke="#94a3b8" stroke-width="2.5"/>
        <polygon points="32,48 48,54 34,58" fill="#38bdf8"/>
        <polygon points="68,48 52,54 66,58" fill="#38bdf8"/>
        <line x1="50" y1="22" x2="50" y2="82" stroke="#64748b" stroke-width="2"/>
      </svg>`,

    rocket: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Team Rocket">
        <circle cx="50" cy="50" r="45" fill="#1e293b" stroke="#ef4444" stroke-width="4"/>
        <text x="50" y="70" text-anchor="middle" fill="#ef4444" font-family="Segoe UI, Arial, sans-serif" font-size="62" font-weight="900">R</text>
        <polygon points="74,16 66,34 76,34 68,50 86,28 76,28" fill="#facc15"/>
      </svg>`,

    mewtwo: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Mewtwo">
        <circle cx="50" cy="50" r="46" fill="#a855f7" opacity="0.32"/>
        <!-- Oreilles / cornes -->
        <polygon points="28,36 22,12 42,26" fill="#e2e8f0" stroke="#7e22ce" stroke-width="2.5"/>
        <polygon points="72,36 78,12 58,26" fill="#e2e8f0" stroke="#7e22ce" stroke-width="2.5"/>
        <!-- Tête -->
        <path d="M24,40 Q50,22 76,40 L70,74 Q50,88 30,74 Z" fill="#f1f5f9" stroke="#9333ea" stroke-width="3"/>
        <!-- Yeux psychiques violets -->
        <polygon points="30,48 46,54 34,58" fill="#a855f7"/>
        <polygon points="70,48 54,54 66,58" fill="#a855f7"/>
        <circle cx="38" cy="53" r="2.2" fill="#fff"/>
        <circle cx="62" cy="53" r="2.2" fill="#fff"/>
        <path d="M40,70 Q50,66 60,70" fill="none" stroke="#6b21a8" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`,

    charizard: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Dracaufeu Noir">
        <circle cx="50" cy="50" r="46" fill="#f97316" opacity="0.28"/>
        <polygon points="26,32 16,10 40,26" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
        <polygon points="74,32 84,10 60,26" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
        <path d="M22,38 Q50,20 78,38 L74,72 Q50,88 26,72 Z" fill="#0f172a" stroke="#f97316" stroke-width="3"/>
        <polygon points="30,48 46,53 32,57" fill="#38bdf8"/>
        <polygon points="70,48 54,53 68,57" fill="#38bdf8"/>
        <!-- Flamme bleue -->
        <path d="M36,72 Q50,62 64,72 Q50,86 36,72 Z" fill="#38bdf8"/>
      </svg>`,

    bowser: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Bowser Smash">
        <circle cx="50" cy="50" r="46" fill="#f97316" opacity="0.28"/>
        <!-- Crinière rouge feu -->
        <polygon points="34,26 42,8 50,22 58,8 66,26" fill="#ef4444" stroke="#0f172a" stroke-width="2"/>
        <!-- Cornes -->
        <path d="M24,36 Q8,24 14,12 Q24,20 34,28 Z" fill="#fef08a" stroke="#0f172a" stroke-width="2.5"/>
        <path d="M76,36 Q92,24 86,12 Q76,20 66,28 Z" fill="#fef08a" stroke="#0f172a" stroke-width="2.5"/>
        <!-- Tête verte/jaune -->
        <path d="M22,38 Q50,22 78,38 L76,72 Q50,86 24,72 Z" fill="#16a34a" stroke="#facc15" stroke-width="3"/>
        <path d="M26,56 Q50,48 74,56 L72,74 Q50,84 28,74 Z" fill="#fde047"/>
        <!-- Yeux rouges -->
        <polygon points="28,44 45,50 32,54" fill="#ef4444"/>
        <polygon points="72,44 55,50 68,54" fill="#ef4444"/>
        <!-- Crocs -->
        <polygon points="36,64 41,74 46,64" fill="#fff"/>
        <polygon points="54,64 59,74 64,64" fill="#fff"/>
      </svg>`,

    ganondorf: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Ganondorf">
        <circle cx="50" cy="50" r="46" fill="#7e22ce" opacity="0.32"/>
        <path d="M22,42 Q26,12 50,14 Q74,12 78,42 Z" fill="#b91c1c"/>
        <path d="M26,38 Q50,26 74,38 L70,78 Q50,88 30,78 Z" fill="#3f6212" stroke="#a855f7" stroke-width="3"/>
        <!-- Gemme frontale dorée -->
        <polygon points="50,28 56,36 50,44 44,36" fill="#facc15" stroke="#fff" stroke-width="1.5"/>
        <!-- Yeux dorés -->
        <polygon points="32,50 46,54 34,58" fill="#facc15"/>
        <polygon points="68,50 54,54 66,58" fill="#facc15"/>
      </svg>`,

    masterhand: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Créa-Main Smash">
        <circle cx="50" cy="50" r="45" fill="#38bdf8" opacity="0.22"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="#facc15" stroke-width="2.5" stroke-dasharray="8 4"/>
        <!-- Gant géant stylisé -->
        <path d="M30,82 L28,48 L22,34 Q24,26 32,30 L38,44 L38,20 Q42,14 48,20 L48,42 L54,18 Q60,14 64,22 L62,44 L70,26 Q76,24 78,32 L72,54 L68,82 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="3" stroke-linejoin="round"/>
        <line x1="36" y1="74" x2="64" y2="74" stroke="#38bdf8" stroke-width="3"/>
      </svg>`,

    seaking: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Roi des Profondeurs">
        <circle cx="50" cy="50" r="46" fill="#06b6d4" opacity="0.28"/>
        <!-- Couronne -->
        <polygon points="30,28 36,10 50,22 64,10 70,28" fill="#facc15" stroke="#0f172a" stroke-width="2"/>
        <path d="M22,36 Q50,22 78,36 L74,76 Q50,88 26,76 Z" fill="#0e7490" stroke="#22d3ee" stroke-width="3"/>
        <polygon points="28,46 46,52 30,56" fill="#facc15"/>
        <polygon points="72,46 54,52 70,56" fill="#facc15"/>
        <path d="M32,68 L40,74 L48,66 L56,74 L68,68" fill="none" stroke="#fff" stroke-width="3"/>
      </svg>`,

    garou: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Garou le Chasseur">
        <circle cx="50" cy="50" r="46" fill="#ef4444" opacity="0.28"/>
        <!-- Cheveux argentés pointus -->
        <polygon points="18,48 10,16 34,26 50,6 66,26 90,16 82,48 Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.5"/>
        <path d="M28,44 Q50,36 72,44 L68,76 Q50,86 32,76 Z" fill="#fde6c4" stroke="#0f172a" stroke-width="2.5"/>
        <polygon points="33,52 46,56 35,60" fill="#ef4444"/>
        <polygon points="67,52 54,56 65,60" fill="#ef4444"/>
        <path d="M40,70 Q50,65 60,70" fill="none" stroke="#0f172a" stroke-width="2.5"/>
      </svg>`,

    boros: `
      <svg viewBox="0 0 100 100" role="img" aria-label="Seigneur Boros">
        <circle cx="50" cy="50" r="46" fill="#38bdf8" opacity="0.32"/>
        <!-- Cheveux d'énergie rose/violet -->
        <polygon points="16,44 10,16 32,26 50,4 68,26 90,16 84,44 Z" fill="#f472b6" stroke="#0f172a" stroke-width="2.5"/>
        <path d="M24,40 Q50,30 76,40 L72,76 Q50,88 28,76 Z" fill="#1e3a8a" stroke="#facc15" stroke-width="3"/>
        <!-- Grand œil cyclopéen lumineux -->
        <ellipse cx="50" cy="54" rx="16" ry="11" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
        <circle cx="50" cy="54" r="7" fill="#38bdf8"/>
        <circle cx="50" cy="54" r="3" fill="#0f172a"/>
      </svg>`
  };

  function get(key) {
    return SVGS[key] || SVGS.creeper;
  }

  return { get };
})();
