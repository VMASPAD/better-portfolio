
// @ts-nocheck
"use client";

import { useState, useEffect } from "react";

/* ── Google Fonts + CSS token bridge ──────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,600&family=IBM+Plex+Mono:wght@300;400;500;600&display=swap');

  :root {
    --background:  oklch(1 0 0);
    --foreground:  oklch(0.2178 0 0);
    --card:        oklch(1 0 0);
    --primary:     oklch(0.2264 0 0);
    --primary-fg:  oklch(1 0 0);
    --muted-fg:    oklch(0.6334 0 0);
    --border:      oklch(0.88 0 0);
    --accent:      oklch(0.2264 0 0);
    --font-sans:   'Chakra Petch', ui-sans-serif, sans-serif;
    --font-mono:   'IBM Plex Mono', ui-monospace, monospace;
  }
  .dark {
    --background:  oklch(0 0 0);
    --foreground:  oklch(1 0 0);
    --card:        oklch(0 0 0);
    --primary:     oklch(0.6152 0.1657 26.98);
    --primary-fg:  oklch(0 0 0);
    --muted-fg:    oklch(0.55 0 0);
    --border:      oklch(0.252 0 0);
    --accent:      oklch(0.6152 0.1657 26.98);
    --muted:       oklch(0.2246 0.0094 107.13);
  }

  *, *::before, *::after { box-sizing: border-box; }

  .port-root {
    font-family: var(--font-sans);
    background: var(--background);
    color: var(--foreground);
    min-height: 100vh;
    transition: background .25s, color .25s;
  }

  /* ── Animations ── */
  @keyframes fadeUp   { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes blink    { 0%,100% { opacity:1; } 50% { opacity:0; } }
  @keyframes ticker   { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:.4; } }
  @keyframes shimmer  {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }

  .fu  { animation: fadeUp .55s ease both; }
  .d1  { animation-delay:.05s; } .d2 { animation-delay:.12s; }
  .d3  { animation-delay:.19s; } .d4 { animation-delay:.26s; }
  .d5  { animation-delay:.33s; } .d6 { animation-delay:.40s; }
  .d7  { animation-delay:.47s; } .d8 { animation-delay:.54s; }
  .d9  { animation-delay:.61s; }

  .cursor  { animation: blink 1s step-end infinite; }
  .blink   { animation: pulse 2.2s ease-in-out infinite; }

  /* Ticker tape */
  .ticker-wrap { overflow: hidden; white-space: nowrap; }
  .ticker-inner { display: inline-flex; animation: ticker 22s linear infinite; }
  .ticker-inner:hover { animation-play-state: paused; }

  /* Bento card base */
  .bcard {
    border: 1px solid var(--border);
    background: var(--card);
    overflow: hidden;
    position: relative;
    transition: border-color .2s;
  }
  .bcard:hover { border-color: var(--primary); }

  /* Orange glow on hover */
  .bcard::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at top left, oklch(0.6152 0.1657 26.98 / .06), transparent 60%);
    opacity: 0;
    transition: opacity .3s;
    pointer-events: none;
  }
  .dark .bcard:hover::after { opacity: 1; }

  /* Scanlines on hero */
  .scanlines::before {
    content:''; position:absolute; inset:0; pointer-events:none; z-index:1;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px,
      rgba(255,255,255,.025) 2px, rgba(255,255,255,.025) 4px);
  }

  /* Tag */
  .chip {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: .1em;
    padding: 2px 7px;
    border: 1px solid var(--border);
    color: var(--muted-fg);
    background: transparent;
    transition: border-color .2s, color .2s;
  }
  .chip-accent {
    border-color: var(--primary);
    color: var(--primary);
  }

  /* Skill bar */
  .skill-track {
    height: 2px;
    background: var(--border);
    position: relative;
    overflow: hidden;
  }
  .skill-fill {
    position: absolute;
    top: 0; left: 0; height: 100%;
    background: var(--primary);
    transition: width .8s cubic-bezier(.4,0,.2,1);
  }

  /* Number counter glow */
  .stat-num {
    font-family: var(--font-mono);
    font-weight: 600;
    line-height: 1;
    color: var(--foreground);
  }

  /* Input */
  .cinput {
    font-family: var(--font-mono);
    font-size: 11px;
    background: transparent;
    color: var(--foreground);
    border: 1px solid var(--border);
    padding: 9px 12px;
    width: 100%;
    outline: none;
    transition: border-color .15s;
    resize: none;
  }
  .cinput:focus { border-color: var(--primary); }
  .cinput::placeholder { color: var(--muted-fg); opacity: .6; }
`;

/* ── Demo data ────────────────────────────────────────────────────────────── */
const DEMO = {
  login: "octocat", type:"User", site_admin:false,
  avatar_url:  "https://avatars.githubusercontent.com/u/583231?v=4",
  html_url:    "https://github.com/octocat",
  name:        "The Octocat",
  company:     "@github",
  blog:        "https://github.blog",
  location:    "San Francisco, CA",
  bio:         "Architect of open-source infrastructure. Building tools that 100M+ developers trust every single day.",
  twitter_username: "github",
  public_repos: 8, public_gists: 8, followers: 14942, following: 9,
  created_at: "2011-01-25T18:44:36Z",
  followers_url: [
    { login:"torvalds",     avatar_url:"https://avatars.githubusercontent.com/u/1024025?v=4", html_url:"https://github.com/torvalds",     type:"User" },
    { login:"gaearon",      avatar_url:"https://avatars.githubusercontent.com/u/810438?v=4",  html_url:"https://github.com/gaearon",      type:"User" },
    { login:"sindresorhus", avatar_url:"https://avatars.githubusercontent.com/u/170270?v=4", html_url:"https://github.com/sindresorhus", type:"User" },
    { login:"tj",           avatar_url:"https://avatars.githubusercontent.com/u/25254?v=4",   html_url:"https://github.com/tj",           type:"User" },
    { login:"mrdoob",       avatar_url:"https://avatars.githubusercontent.com/u/370246?v=4",  html_url:"https://github.com/mrdoob",       type:"User" },
  ],
  repos_url: [
    { id:1, name:"Hello-World",    description:"My first repository on GitHub.",           html_url:"https://github.com/octocat/Hello-World",    stargazers_count:2700,  language:"C",    forks:3100,   license:{spdx_id:"MIT"}, topics:["hello-world"] },
    { id:2, name:"Spoon-Knife",    description:"This repo is for demonstration only.",    html_url:"https://github.com/octocat/Spoon-Knife",    stargazers_count:12800, language:"HTML", forks:142700, license:null,            topics:["demo","fork"] },
    { id:3, name:"linguist",       description:"Language Savant for github.com.",          html_url:"https://github.com/github-linguist/linguist",stargazers_count:12000, language:"Ruby", forks:3100,   license:{spdx_id:"MIT"}, topics:["language","detection"] },
    { id:4, name:"git-consortium", description:"Collaborative git workflows at scale.",    html_url:"https://github.com/octocat/git-consortium", stargazers_count:200,   language:"Ruby", forks:20,     license:null,            topics:["git"] },
  ],
  starred_url: [
    { id:10, name:"next.js",     description:"The React Framework for the Web.",           html_url:"https://github.com/vercel/next.js",           stargazers_count:127000, language:"JavaScript", forks:27000, owner:{login:"vercel"} },
    { id:11, name:"react",       description:"The library for web and native UIs.",        html_url:"https://github.com/facebook/react",           stargazers_count:229000, language:"JavaScript", forks:46800, owner:{login:"facebook"} },
    { id:12, name:"tailwindcss", description:"A utility-first CSS framework.",             html_url:"https://github.com/tailwindlabs/tailwindcss", stargazers_count:84000,  language:"CSS",        forks:4300,  owner:{login:"tailwindlabs"} },
  ],
};

const SKILLS = [
  { name:"TypeScript",  pct:92 }, { name:"React / Next.js", pct:90 },
  { name:"Node.js",     pct:85 }, { name:"Ruby / Rails",    pct:78 },
  { name:"PostgreSQL",  pct:75 }, { name:"Docker / K8s",    pct:70 },
  { name:"Go",          pct:62 }, { name:"Rust",            pct:45 },
];

const STACK_CHIPS = ["C","Python","JavaScript","TypeScript","Ruby","Go","React","Next.js","Node.js","Express","Rails","GraphQL","PostgreSQL","Redis","Docker","Kubernetes","Terraform","Git"];

const EXPERIENCE = [
  { co:"GitHub",         role:"Staff SWE",    period:"2020 — now",  color:"var(--primary)" },
  { co:"Octoverse Labs", role:"Engineer",     period:"2017 — 2019", color:"var(--muted-fg)" },
  { co:"Open Source",    role:"Contributor",  period:"2013 — 2017", color:"var(--muted-fg)" },
];

/* ── Helpers ──────────────────────────────────────────────────────────────── */
const fmt  = (n) => n >= 1000 ? `${(n/1000).toFixed(1)}k` : String(n);
const LC   = { JavaScript:"#f7df1e",TypeScript:"#3178c6",Python:"#3572A5",Ruby:"#CC342D",Go:"#00ADD8",C:"#aaaaaa","C++":"#f34b7d",HTML:"#e34c26",CSS:"#563d7c" };
const lc   = (l) => LC[l] || "var(--muted-fg)";
const yr   = (d) => new Date(d).getFullYear();

/* ── Tiny atoms ──────────────────────────────────────────────────────────── */
function Chip({ children, accent }) {
  return <span className={`chip ${accent ? "chip-accent" : ""}`}>{children}</span>;
}

function Dot({ active }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`blink inline-block w-1.5 h-1.5 rounded-full`}
        style={{ background:"var(--primary)", boxShadow:"0 0 6px var(--primary)" }} />
      <span className="text-[9px] uppercase tracking-widest font-mono"
        style={{ fontFamily:"var(--font-mono)", color:"var(--primary)" }}>
        {active ? "Available" : "Offline"}
      </span>
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-[9px] uppercase tracking-[.2em] font-semibold"
        style={{ fontFamily:"var(--font-mono)", color:"var(--primary)" }}>{children}</span>
      <div className="flex-1 h-px" style={{ background:"var(--border)" }} />
    </div>
  );
}

/* ── Bento Card wrapper ──────────────────────────────────────────────────── */
function B({ children, className="" }) {
  return <div className={`bcard ${className}`}>{children}</div>;
}

/* ── Main ────────────────────────────────────────────────────────────────── */
export default function BentoPortfolio({ user = DEMO }) {
  const [dark,    setDark]    = useState(true);
  const [mounted, setMounted] = useState(false);
  const [form,    setForm]    = useState({ name:"", email:"", msg:"" });
  const [sent,    setSent]    = useState(false);
  const [skills,  setSkills]  = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (mounted) setTimeout(() => setSkills(true), 600); }, [mounted]);

  const repos = user.repos_url || [];
  const followers = user.followers_url || [];

  const css = { background:"var(--background)", color:"var(--foreground)", fontFamily:"var(--font-sans)" };

  return (
    <div className={dark ? "dark" : ""} style={css}>
      <style>{GLOBAL_CSS}</style>

      <div className="port-root">

        {/* ── TOPBAR ──────────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 border-b flex items-center justify-between px-5 h-10"
          style={{ background:"var(--background)", borderColor:"var(--border)" }}>
          <div className="flex items-center gap-3">
            <img src={user.avatar_url} alt="" className="w-5 h-5 grayscale opacity-70" />
            <span className="text-xs font-semibold tracking-tight uppercase" style={{ fontFamily:"var(--font-sans)" }}>
              {user.login}
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-widest" style={{ color:"var(--muted-fg)", fontFamily:"var(--font-mono)" }}>
              / portfolio
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Dot active />
            <button
              className="text-[9px] uppercase tracking-widest px-3 py-1 border cursor-pointer bg-transparent transition-all hover:border-primary"
              style={{ fontFamily:"var(--font-mono)", borderColor:"var(--border)", color:"var(--muted-fg)" }}
              onClick={() => setDark(d=>!d)}>
              {dark ? "☀ Light" : "☾ Dark"}
            </button>
          </div>
        </header>

        {/* ── TICKER ──────────────────────────────────────────────────────── */}
        <div className="ticker-wrap border-b py-1.5" style={{ borderColor:"var(--border)" }}>
          <div className="ticker-inner gap-8" style={{ fontFamily:"var(--font-mono)" }}>
            {[...STACK_CHIPS,...STACK_CHIPS].map((s,i) => (
              <span key={i} className="text-[9px] uppercase tracking-widest mx-4" style={{ color:"var(--muted-fg)" }}>
                {s} <span style={{ color:"var(--primary)" }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── BENTO GRID ──────────────────────────────────────────────────── */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 auto-rows-auto">

            {/* ① HERO — spans 4 cols × tall */}
            {mounted && (
              <B className="fu d1 col-span-2 sm:col-span-4 row-span-2 scanlines p-6 flex flex-col justify-between min-h-[320px]">
                <div className="z-10 relative">
                  <div className="flex items-center gap-2 mb-5">
                    <Chip accent>Open to work</Chip>
                    <Chip>{user.location}</Chip>
                  </div>
                  <h1 className="font-bold leading-none tracking-tighter mb-4"
                    style={{ fontSize:"clamp(36px,6vw,72px)", fontFamily:"var(--font-sans)", color:"var(--foreground)" }}>
                    {(user.name||user.login).toUpperCase()}
                    <span className="cursor" style={{ color:"var(--primary)" }}>_</span>
                  </h1>
                  <p className="text-sm leading-relaxed max-w-md"
                    style={{ fontFamily:"var(--font-sans)", color:"var(--muted-fg)", fontWeight:300 }}>
                    {user.bio}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 z-10 relative mt-6">
                  {user.html_url && (
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] uppercase tracking-widest px-4 py-2 font-semibold border-0 cursor-pointer no-underline transition-opacity hover:opacity-80"
                      style={{ fontFamily:"var(--font-sans)", background:"var(--primary)", color:"var(--primary-fg)" }}>
                      GitHub ↗
                    </a>
                  )}
                  {user.blog && (
                    <a href={user.blog} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] uppercase tracking-widest px-4 py-2 border cursor-pointer no-underline transition-all hover:border-primary"
                      style={{ fontFamily:"var(--font-sans)", borderColor:"var(--border)", color:"var(--muted-fg)" }}>
                      Blog ↗
                    </a>
                  )}
                  {user.twitter_username && (
                    <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] uppercase tracking-widest px-4 py-2 border cursor-pointer no-underline transition-all hover:border-primary"
                      style={{ fontFamily:"var(--font-sans)", borderColor:"var(--border)", color:"var(--muted-fg)" }}>
                      ✕ Twitter
                    </a>
                  )}
                </div>
              </B>
            )}

            {/* ② AVATAR */}
            {mounted && (
              <B className="fu d2 col-span-1 sm:col-span-1 flex items-center justify-center p-4">
                <img src={user.avatar_url} alt={user.login}
                  className="w-full max-w-[90px] aspect-square object-cover"
                  style={{ filter:"grayscale(.4) contrast(1.05)" }} />
              </B>
            )}

            {/* ③ MEMBER SINCE — tall stat */}
            {mounted && (
              <B className="fu d3 col-span-1 flex flex-col justify-between p-4">
                <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>
                  Member since
                </span>
                <div>
                  <div className="stat-num" style={{ fontSize:40 }}>{yr(user.created_at)}</div>
                  <div className="text-[9px] mt-1" style={{ fontFamily:"var(--font-mono)", color:"var(--primary)" }}>
                    {new Date().getFullYear() - yr(user.created_at)} yrs active
                  </div>
                </div>
              </B>
            )}

            {/* ④ FOLLOWERS stat */}
            {mounted && (
              <B className="fu d4 col-span-1 flex flex-col justify-between p-4">
                <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>
                  Followers
                </span>
                <div>
                  <div className="stat-num" style={{ fontSize:36, color:"var(--primary)" }}>{fmt(user.followers)}</div>
                  <div className="text-[9px] mt-1" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>github.com</div>
                </div>
              </B>
            )}

            {/* ⑤ REPOS stat */}
            {mounted && (
              <B className="fu d5 col-span-1 flex flex-col justify-between p-4">
                <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>
                  Repos
                </span>
                <div>
                  <div className="stat-num" style={{ fontSize:36 }}>{user.public_repos}</div>
                  <div className="text-[9px] mt-1" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>public</div>
                </div>
              </B>
            )}

            {/* ⑥ EXPERIENCE — wide */}
            {mounted && (
              <B className="fu d6 col-span-2 sm:col-span-2 p-5">
                <SectionLabel>Experience</SectionLabel>
                <div className="flex flex-col gap-3">
                  {EXPERIENCE.map((e,i) => (
                    <div key={i} className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide" style={{ color:e.color }}>{e.co}</div>
                        <div className="text-[10px] mt-0.5" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>{e.role}</div>
                      </div>
                      <span className="text-[9px] shrink-0 mt-0.5" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>{e.period}</span>
                    </div>
                  ))}
                </div>
              </B>
            )}

            {/* ⑦ SKILLS — spans 3 cols */}
            {mounted && (
              <B className="fu d7 col-span-2 sm:col-span-3 p-5">
                <SectionLabel>Skills</SectionLabel>
                <div className="flex flex-col gap-3">
                  {SKILLS.slice(0,6).map(s => (
                    <div key={s.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-wide font-medium" style={{ fontFamily:"var(--font-mono)" }}>{s.name}</span>
                        <span className="text-[9px]" style={{ fontFamily:"var(--font-mono)", color:"var(--primary)" }}>{s.pct}%</span>
                      </div>
                      <div className="skill-track">
                        <div className="skill-fill" style={{ width: skills ? `${s.pct}%` : "0%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </B>
            )}

            {/* ⑧ NOTABLE FOLLOWERS */}
            {mounted && (
              <B className="fu d8 col-span-2 sm:col-span-3 p-5">
                <SectionLabel>Notable followers</SectionLabel>
                <div className="flex flex-col gap-2">
                  {followers.map(f => (
                    <a key={f.login} href={f.html_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 no-underline group">
                      <img src={f.avatar_url} alt={f.login}
                        className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all duration-300"
                        style={{ filter:"grayscale(1)" }}
                        onMouseEnter={e => e.currentTarget.style.filter="grayscale(0)"}
                        onMouseLeave={e => e.currentTarget.style.filter="grayscale(1)"} />
                      <span className="text-[11px] font-medium" style={{ color:"var(--foreground)" }}>{f.login}</span>
                      <span className="text-[9px] ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ fontFamily:"var(--font-mono)", color:"var(--primary)" }}>↗</span>
                    </a>
                  ))}
                </div>
              </B>
            )}

            {/* ⑨ REPOS — spans 4 cols */}
            {mounted && (
              <B className="fu d9 col-span-2 sm:col-span-4 p-5">
                <SectionLabel>Repositories</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {repos.map(r => (
                    <a key={r.id} href={r.html_url} target="_blank" rel="noopener noreferrer"
                      className="block no-underline border p-3 group transition-all"
                      style={{ borderColor:"var(--border)" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor="var(--primary)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor="var(--border)"}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold group-hover:text-primary transition-colors"
                          style={{ color:"var(--foreground)" }}>{r.name}</span>
                        <span className="text-[9px]" style={{ fontFamily:"var(--font-mono)", color:"var(--primary)" }}>↗</span>
                      </div>
                      {r.description && (
                        <p className="text-[10px] leading-relaxed mb-2 line-clamp-2"
                          style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>{r.description}</p>
                      )}
                      <div className="flex items-center gap-3">
                        {r.language && (
                          <span className="flex items-center gap-1 text-[9px]" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>
                            <span className="w-2 h-2 rounded-full" style={{ background:lc(r.language) }} />
                            {r.language}
                          </span>
                        )}
                        <span className="text-[9px]" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>★ {fmt(r.stargazers_count)}</span>
                        <span className="text-[9px]" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>⑂ {fmt(r.forks)}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </B>
            )}

            {/* ⑩ COMPANY / LOCATION widget */}
            {mounted && (
              <B className="fu d5 col-span-2 sm:col-span-2 flex flex-col gap-4 p-5">
                <SectionLabel>About</SectionLabel>
                {[
                  ["🏢", "Company",  user.company],
                  ["📍", "Location", user.location],
                  ["🔗", "Web",      user.blog?.replace(/^https?:\/\//,"")],
                  ["✕",  "Twitter",  user.twitter_username ? `@${user.twitter_username}` : null],
                ].filter(([,,v])=>v).map(([icon,label,val])=>(
                  <div key={label} className="flex items-start gap-2.5">
                    <span className="text-sm mt-px">{icon}</span>
                    <div>
                      <div className="text-[9px] uppercase tracking-widest mb-0.5" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>{label}</div>
                      <div className="text-[11px] font-medium" style={{ color:"var(--foreground)" }}>{val}</div>
                    </div>
                  </div>
                ))}
              </B>
            )}

            {/* ⑪ CONTACT FORM — spans full */}
            {mounted && (
              <B className="fu d6 col-span-2 sm:col-span-6 p-5 sm:p-6">
                <SectionLabel>Get in touch</SectionLabel>
                {sent ? (
                  <div className="flex items-center gap-3 py-4">
                    <span style={{ color:"var(--primary)", fontFamily:"var(--font-mono)", fontSize:12 }}>
                      ▶ Message transmitted — will respond shortly.
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 max-w-3xl">
                    <input className="cinput" placeholder="Name *"
                      value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
                    <input className="cinput" placeholder="Email *" type="email"
                      value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} />
                    <input className="cinput" placeholder="Subject"
                      value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} />
                    <textarea className="cinput sm:col-span-2" placeholder="Message *" rows={3}
                      value={form.msg} onChange={e=>setForm(f=>({...f,msg:e.target.value}))} />
                    <button
                      className="text-[10px] font-bold uppercase tracking-widest cursor-pointer border-0 self-stretch transition-opacity hover:opacity-85"
                      style={{ fontFamily:"var(--font-sans)", background:"var(--primary)", color:"var(--primary-fg)" }}
                      onClick={() => { if(form.name&&form.email&&form.msg) setSent(true); }}>
                      Send →
                    </button>
                  </div>
                )}
              </B>
            )}

          </div>

          {/* Footer */}
          <footer className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor:"var(--border)" }}>
            <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>
              © {new Date().getFullYear()} {user.name||user.login}
            </span>
            <Dot active />
          </footer>
        </main>
      </div>
    </div>
  );
}