/* Ranking for the command palette. Pure functions, no imports: the data
   comes from src/constants/commands.js, and keeping this file free of
   project imports means it can be exercised in plain Node without Vite's
   extensionless-import resolution. */

/* Fixed display order for the grouped (empty-query) view. */
export const GROUPS = [
  { key: "navigate", label: "navigate" },
  { key: "case-studies", label: "case studies" },
  { key: "builds", label: "builds" },
  { key: "connect", label: "connect" },
];

/* Lower-case, strip accents, so "Dooz" matches "dooz" and a typed "e"
   matches an "é" in a project name. */
const norm = (s) =>
  String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/* True when every character of `needle` appears in `hay` in order:
   "lopdin" -> "loopedin". Cheap typo tolerance for the label only. */
const subsequence = (hay, needle) => {
  let i = 0;
  for (const ch of hay) {
    if (ch === needle[i]) i += 1;
    if (i === needle.length) return true;
  }
  return i === needle.length;
};

/* Score one command against one query token. 0 means no match.
   Prefix of the label beats a word-prefix beats a substring; keywords
   (stack, category) beat the subtitle, since "nestjs" should surface the
   project built with it before a project whose tagline merely mentions
   it. Fuzzy subsequence is the last resort and only for tokens long
   enough not to match everything. */
const scoreToken = (c, t) => {
  if (c.label.startsWith(t)) return 10;
  if (c.words.some((w) => w.startsWith(t))) return 7;
  if (c.label.includes(t)) return 5;
  if (c.keywords.includes(t)) return 3;
  if (c.sub.includes(t)) return 2;
  if (t.length >= 3 && subsequence(c.label, t)) return 1;
  return 0;
};

/* Pre-normalise once, not once per keystroke. */
const index = (commands) =>
  commands.map((cmd) => {
    const label = norm(cmd.label);
    return {
      cmd,
      label,
      words: label.split(/\s+/),
      sub: norm(cmd.sub),
      keywords: (cmd.keywords || []).map(norm).join(" "),
    };
  });

/* Returns the commands matching `query`, best first. Every whitespace-
   separated token must match somewhere; the score is the sum. With an
   empty query the list comes back untouched, in its authored order, so
   the grouped view is stable. Ties keep authored order (Array#sort is
   stable). */
export const filterCommands = (commands, query) => {
  const q = norm(query).trim();
  if (!q) return commands;
  const tokens = q.split(/\s+/);
  const hits = [];
  for (const c of index(commands)) {
    let score = 0;
    for (const t of tokens) {
      const s = scoreToken(c, t);
      if (!s) {
        score = 0;
        break;
      }
      score += s;
    }
    if (score) hits.push({ cmd: c.cmd, score });
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.map((h) => h.cmd);
};

/* Capability readout for the palette footer. Only what the CSS already
   responds to — pointer type, motion preference, viewport, pixel ratio.
   Deliberately no user-agent parsing: "touch-first high-DPI device" is
   all the page adapts to, so it is all the page should claim to know. */
export const readSystem = () => {
  if (typeof window === "undefined" || !window.matchMedia) return null;
  const mm = (q) => window.matchMedia(q).matches;
  const input = mm("(hover: hover) and (pointer: fine)")
    ? "fine"
    : mm("(pointer: coarse)")
    ? "coarse"
    : "unknown";
  const motion = mm("(prefers-reduced-motion: reduce)") ? "reduced" : "full";
  const dpr = Math.round((window.devicePixelRatio || 1) * 10) / 10;
  return `input ${input} · motion ${motion} · ${window.innerWidth}×${window.innerHeight} @${dpr}x`;
};
