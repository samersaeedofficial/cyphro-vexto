// Hash recognition, profiling, and simulation helpers for Password Cracker

export const KNOWN_RAINBOW_TABLES = [
  {
    id: "md5-alnum-1-8",
    name: "MD5 LowerAlpha + Numeric (1-8)",
    algorithm: "MD5",
    size: "42 GB",
    keyspace: "2.18 × 10¹¹",
    successRate: "99.4%",
    chains: "1,200,000",
  },
  {
    id: "ntlm-all-1-8",
    name: "NTLM Full ASCII (1-8)",
    algorithm: "NTLM",
    size: "89 GB",
    keyspace: "6.09 × 10¹²",
    successRate: "98.2%",
    chains: "2,500,000",
  },
  {
    id: "sha1-alnum-1-7",
    name: "SHA-1 MixAlpha + Numeric (1-7)",
    algorithm: "SHA-1",
    size: "115 GB",
    keyspace: "3.52 × 10¹²",
    successRate: "97.8%",
    chains: "3,100,000",
  },
  {
    id: "sha256-digits-1-10",
    name: "SHA-256 Numeric PINs (1-10)",
    algorithm: "SHA-256",
    size: "18 GB",
    keyspace: "1.11 × 10¹⁰",
    successRate: "99.9%",
    chains: "850,000",
  },
];

export const DEMO_PRESETS = [
  {
    id: "quick-demo",
    title: "⚡ Quick Demo (Fast Multi-Algorithm)",
    description: "5 common hashes ready for immediate demonstration cracking",
    badge: "Recommended",
    hashes: [
      "5f4dcc3b5aa765d61d8327deb882cf99", // password (MD5)
      "2aae6c35c94fcfb415dbe95f408b9ce91ee846ed", // admin123 (SHA-1)
      "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", // admin (SHA-256)
      "329153f560eb3295f3eb24cc8f107ee1", // qwerty123 (NTLM)
      "5d41402abc4b2a76b9719d911017c592", // hello (MD5)
    ],
    plaintexts: {
      "5f4dcc3b5aa765d61d8327deb882cf99": "password",
      "2aae6c35c94fcfb415dbe95f408b9ce91ee846ed": "admin123",
      "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918": "admin",
      "329153f560eb3295f3eb24cc8f107ee1": "qwerty123",
      "5d41402abc4b2a76b9719d911017c592": "hello",
    },
  },
  {
    id: "enterprise-ntlm",
    title: "🏢 Active Directory & NTLM Suite",
    description: "Windows enterprise account dump hashes",
    badge: "Enterprise",
    hashes: [
      "b4b9b02e6f09a9bd760f388b67351e2b", // Welcome2024!
      "329153f560eb3295f3eb24cc8f107ee1", // qwerty123
      "209c6174da490caeb422f3fa5a7ae634", // Password1
      "cc36cf7a851037ebec240f684e6b8607", // Summer2024!
    ],
    plaintexts: {
      "b4b9b02e6f09a9bd760f388b67351e2b": "Welcome2024!",
      "329153f560eb3295f3eb24cc8f107ee1": "qwerty123",
      "209c6174da490caeb422f3fa5a7ae634": "Password1",
      "cc36cf7a851037ebec240f684e6b8607": "Summer2024!",
    },
  },
  {
    id: "web-sha256",
    title: "🌐 Modern Web & Database (SHA-256)",
    description: "High-security hashes from modern SaaS applications",
    badge: "WebSec",
    hashes: [
      "d077f244def8a70e5ea758bd8352fcd8de9d159eeab1f18e3dd68429a5ecd3b3", // dragon
      "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f", // secret123
      "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", // admin
      "fc8252c8dc55839967c58b9ad755a59b61b67c1322016be0123731619e12f842", // hunter2
    ],
    plaintexts: {
      "d077f244def8a70e5ea758bd8352fcd8de9d159eeab1f18e3dd68429a5ecd3b3": "dragon",
      "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f": "secret123",
      "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918": "admin",
      "fc8252c8dc55839967c58b9ad755a59b61b67c1322016be0123731619e12f842": "hunter2",
    },
  },
];

export const WORDLIST_LIBRARY = [
  {
    id: "rockyou.txt",
    name: "rockyou.txt (Security Standard)",
    words: "14,344,392 words",
    size: "133.4 MB",
    popularity: "Most Used",
    desc: "The gold standard wordlist from the RockYou breach, optimal for general cracking.",
    recommendedFor: ["MD5", "SHA-1", "NTLM"],
  },
  {
    id: "seclists-top100k.txt",
    name: "SecLists Top 100K",
    words: "100,000 words",
    size: "1.1 MB",
    popularity: "Ultra Fast",
    desc: "High-density list covering 80% of consumer passwords with lightning speed.",
    recommendedFor: ["Fast Scan", "Brute Check"],
  },
  {
    id: "darkweb-leaks-2024.txt",
    name: "DarkWeb Leaks 2024-2026",
    words: "8,950,000 words",
    size: "92.0 MB",
    popularity: "Modern Trends",
    desc: "Includes recent password trends, current year combinations, and regional variations.",
    recommendedFor: ["Enterprise", "Cloud Auth"],
  },
  {
    id: "crackstation-human.txt",
    name: "CrackStation Human Passwords",
    words: "64,000,000 words",
    size: "680 MB",
    popularity: "Heavy Artillery",
    desc: "Massive dictionary derived from thousands of historical database leaks.",
    recommendedFor: ["Thorough Recovery"],
  },
];

export const RULESET_OPTIONS = [
  { id: "best64.rule", name: "best64.rule (Hashcat Standard - Top 64 rules)", mult: "64x" },
  { id: "d3ad0ne.rule", name: "d3ad0ne.rule (Heavy mutations & replacements)", mult: "340x" },
  { id: "leetspeak.rule", name: "leetspeak.rule (Common @/3/1/0 substitutions)", mult: "128x" },
  { id: "dive.rule", name: "dive.rule (Comprehensive exhaustive mutations)", mult: "1,200x" },
];

export const detectHash = (hashStr) => {
  if (!hashStr) return null;
  const h = hashStr.trim();
  if (!h) return null;

  // Bcrypt
  if (h.startsWith("$2a$") || h.startsWith("$2b$") || h.startsWith("$2y$")) {
    return {
      type: "Bcrypt",
      algorithm: "bcrypt (Blowfish)",
      hashcatMode: "3200",
      johnFormat: "bcrypt",
      speedRating: "Extremely Slow (Salted)",
      difficulty: "High Resistance",
      color: "text-rose-400",
      border: "border-rose-500/40",
      bg: "bg-rose-500/10",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      desc: "Blowfish-based salted password hashing function with adaptive cost factor.",
    };
  }

  // Argon2
  if (h.startsWith("$argon2id$") || h.startsWith("$argon2i$")) {
    return {
      type: "Argon2",
      algorithm: "Argon2id/i",
      hashcatMode: "7300",
      johnFormat: "argon2",
      speedRating: "Memory Hard",
      difficulty: "Maximum Resistance",
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      desc: "Password Hashing Competition winner with tunable memory hardness.",
    };
  }

  // MD5
  if (h.length === 32 && /^[a-fA-F0-9]+$/.test(h)) {
    return {
      type: "MD5",
      algorithm: "Message Digest 5",
      hashcatMode: "0",
      johnFormat: "raw-md5",
      speedRating: "Ultra Fast (Gigahash)",
      difficulty: "Deprecated / Weak",
      color: "text-red-400",
      border: "border-red-500/40",
      bg: "bg-red-500/10",
      badgeColor: "bg-red-500/20 text-red-300 border-red-500/40",
      desc: "128-bit cryptographic hash. Highly susceptible to collisions and dictionary attacks.",
    };
  }

  // SHA-1
  if (h.length === 40 && /^[a-fA-F0-9]+$/.test(h)) {
    return {
      type: "SHA-1",
      algorithm: "Secure Hash Algorithm 1",
      hashcatMode: "100",
      johnFormat: "raw-sha1",
      speedRating: "Fast (Hundreds MH/s)",
      difficulty: "Vulnerable",
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      desc: "160-bit hash. Deprecated by NIST; practical collision attacks demonstrated.",
    };
  }

  // SHA-256
  if (h.length === 64 && /^[a-fA-F0-9]+$/.test(h)) {
    return {
      type: "SHA-256",
      algorithm: "Secure Hash Algorithm 256",
      hashcatMode: "1400",
      johnFormat: "raw-sha256",
      speedRating: "Moderate Speed",
      difficulty: "Cryptographically Solid",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      desc: "256-bit member of SHA-2 family, standard for modern web and blockchain infrastructure.",
    };
  }

  // SHA-512
  if (h.length === 128 && /^[a-fA-F0-9]+$/.test(h)) {
    return {
      type: "SHA-512",
      algorithm: "Secure Hash Algorithm 512",
      hashcatMode: "1700",
      johnFormat: "raw-sha512",
      speedRating: "Slow / Heavy",
      difficulty: "Robust",
      color: "text-cyan-400",
      border: "border-cyan-500/40",
      bg: "bg-cyan-500/10",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      desc: "512-bit digest offering massive keyspace resistance against brute force.",
    };
  }

  // NTLM (Special format check or fallback)
  if (h.length === 32 && /^[a-fA-F0-9]{32}$/.test(h)) {
    return {
      type: "NTLM",
      algorithm: "NT LAN Manager",
      hashcatMode: "1000",
      johnFormat: "nt",
      speedRating: "Very Fast",
      difficulty: "Weak without Salt",
      color: "text-orange-400",
      border: "border-orange-500/40",
      bg: "bg-orange-500/10",
      badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/40",
      desc: "Microsoft Windows authentication hash with no salt, cracked quickly on GPUs.",
    };
  }

  return {
    type: "Custom / Unknown",
    algorithm: "Generic Cryptographic Hash",
    hashcatMode: "N/A",
    johnFormat: "dynamic",
    speedRating: "Unknown",
    difficulty: "Unprofiled",
    color: "text-slate-400",
    border: "border-slate-500/40",
    bg: "bg-slate-500/10",
    badgeColor: "bg-slate-500/20 text-slate-300 border-slate-500/40",
    desc: "Unrecognized format. Verify length or syntax if using salted variations.",
  };
};

export const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num);

export const formatSpeed = (hps) => {
  if (hps >= 1_000_000_000) return `${(hps / 1_000_000_000).toFixed(2)} GH/s`;
  if (hps >= 1_000_000) return `${(hps / 1_000_000).toFixed(2)} MH/s`;
  if (hps >= 1_000) return `${(hps / 1_000).toFixed(1)} KH/s`;
  return `${hps} H/s`;
};

export const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return "00:00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

export const evaluatePasswordStrength = (pwd) => {
  if (!pwd) return { label: "N/A", color: "text-slate-500", bg: "bg-slate-500/20" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return { label: "Very Weak", color: "text-rose-400", bg: "bg-rose-500/20 border-rose-500/30" };
  if (score === 2) return { label: "Weak", color: "text-orange-400", bg: "bg-orange-500/20 border-orange-500/30" };
  if (score === 3) return { label: "Moderate", color: "text-amber-400", bg: "bg-amber-500/20 border-amber-500/30" };
  if (score === 4) return { label: "Strong", color: "text-emerald-400", bg: "bg-emerald-500/20 border-emerald-500/30" };
  return { label: "Elite", color: "text-cyan-400", bg: "bg-cyan-500/20 border-cyan-500/30" };
};
