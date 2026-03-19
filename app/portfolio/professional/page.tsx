// @ts-nocheck
"use client";

import { useState, useEffect } from "react";

/* ─── Global styles: CSS tokens + keyframes only ────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600;700&display=swap');

  :root {
    --background: oklch(0.985 0 0);
    --foreground: oklch(0.205 0 0);
    --card:       oklch(0.970 0 0);
    --primary:    oklch(0.666 0.179 58.318);
    --primary-fg: oklch(0.985 0.001 106.423);
    --muted:      oklch(0.923 0.003 48.717);
    --muted-fg:   oklch(0.216 0.006 56.043);
    --border:     oklch(0.869 0.005 56.366);
    --font-mono:  'Geist Mono', monospace;
  }
  .dm {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.970 0 0);
    --card:       oklch(0.205 0 0);
    --primary:    oklch(0.666 0.179 58.318);
    --primary-fg: oklch(0.970 0.001 106.424);
    --muted:      oklch(0.216 0.006 56.043);
    --muted-fg:   oklch(0.709 0.010 56.259);
    --border:     oklch(0.374 0.010 67.558);
  }

  @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes slideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.4)} }

  .cursor    { animation: blink 1.1s step-end infinite; }
  .reveal    { animation: slideUp 0.55s ease forwards; opacity:0; }
  .d1 { animation-delay:.06s; } .d2 { animation-delay:.13s; }
  .d3 { animation-delay:.20s; } .d4 { animation-delay:.27s; }
  .d5 { animation-delay:.34s; }
  .dot-pulse { animation: pulse 2s ease-in-out infinite; }

  .scanlines::before {
    content:''; position:absolute; inset:0; pointer-events:none; z-index:1;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px,
      rgba(0,0,0,.018) 2px, rgba(0,0,0,.018) 4px);
  }
  .dm .scanlines::before {
    background: repeating-linear-gradient(0deg, transparent, transparent 2px,
      rgba(255,255,255,.018) 2px, rgba(255,255,255,.018) 4px);
  }

  .nav-btn        { transition: color .15s; }
  .nav-btn:hover,
  .nav-btn.on     { color: var(--primary) !important; }

  .obtn:hover     { border-color: var(--primary) !important; color: var(--primary) !important; }
  .rcard:hover    { border-color: var(--primary) !important; }
  .data-table tr:hover td { border-color: var(--primary) !important; }

  .field {
    font-family: var(--font-mono); font-size:12px;
    background: var(--card); color: var(--foreground);
    border: 1px solid var(--border); padding: 10px 12px;
    width:100%; outline:none; transition: border-color .15s; resize:vertical;
  }
  .field:focus { border-color: var(--primary); }

  .data-table { border-collapse: collapse; width:100%; }
  .data-table th, .data-table td {
    border: 1px solid var(--border); padding: 8px 12px;
    font-family: var(--font-mono); font-size:11px; text-align:left;
  }
  .data-table th {
    background: var(--muted); color: var(--muted-fg);
    font-weight:600; text-transform:uppercase; letter-spacing:.08em;
  }
`;

/* ─── Demo data ──────────────────────────────────────────────────────────────── */
const DEMO_USER = {
  login: "octocat", type: "User", site_admin: false,
  avatar_url:  "https://avatars.githubusercontent.com/u/583231?v=4",
  html_url:    "https://github.com/octocat",
  name:        "The Octocat",
  company:     "@github",
  blog:        "https://github.blog",
  location:    "San Francisco, CA",
  bio:         "A mysterious creature that lives on GitHub. Architect of open-source infrastructure powering 100M+ developers across 330M+ repositories worldwide.",
  twitter_username: "github",
  public_repos: 8, public_gists: 8, followers: 14942, following: 9,
  created_at: "2011-01-25T18:44:36Z", updated_at: "2024-03-15T10:22:11Z",
  followers_url: [
    { login:"torvalds",     avatar_url:"https://avatars.githubusercontent.com/u/1024025?v=4",  html_url:"https://github.com/torvalds",     type:"User", site_admin:false },
    { login:"gaearon",      avatar_url:"https://avatars.githubusercontent.com/u/810438?v=4",   html_url:"https://github.com/gaearon",      type:"User", site_admin:false },
    { login:"sindresorhus", avatar_url:"https://avatars.githubusercontent.com/u/170270?v=4",  html_url:"https://github.com/sindresorhus", type:"User", site_admin:false },
    { login:"tj",           avatar_url:"https://avatars.githubusercontent.com/u/25254?v=4",    html_url:"https://github.com/tj",           type:"User", site_admin:false },
    { login:"mrdoob",       avatar_url:"https://avatars.githubusercontent.com/u/370246?v=4",   html_url:"https://github.com/mrdoob",       type:"User", site_admin:false },
  ],
  starred_url: [
    { id:1, name:"next.js",     full_name:"vercel/next.js",           description:"The React Framework for the Web.",                        html_url:"https://github.com/vercel/next.js",           stargazers_count:127000, language:"JavaScript", topics:["react","nextjs"],  visibility:"public", forks:27000,  license:{spdx_id:"MIT"}, owner:{login:"vercel",       avatar_url:"https://avatars.githubusercontent.com/u/14985020?v=4"} },
    { id:2, name:"react",       full_name:"facebook/react",           description:"The library for web and native user interfaces.",          html_url:"https://github.com/facebook/react",           stargazers_count:229000, language:"JavaScript", topics:["ui","library"],    visibility:"public", forks:46800,  license:{spdx_id:"MIT"}, owner:{login:"facebook",     avatar_url:"https://avatars.githubusercontent.com/u/69631?v=4"}    },
    { id:3, name:"tailwindcss", full_name:"tailwindlabs/tailwindcss", description:"A utility-first CSS framework for rapid UI development.",   html_url:"https://github.com/tailwindlabs/tailwindcss", stargazers_count:84000,  language:"CSS",        topics:["css","tailwind"],  visibility:"public", forks:4300,   license:{spdx_id:"MIT"}, owner:{login:"tailwindlabs", avatar_url:"https://avatars.githubusercontent.com/u/67109815?v=4"} },
  ],
  repos_url: [
    { id:1, name:"Hello-World",    full_name:"octocat/Hello-World",    description:"My first repository on GitHub.",                              html_url:"https://github.com/octocat/Hello-World",    stargazers_count:2700,  language:"C",    visibility:"public", forks:3100,   license:{spdx_id:"MIT"}, owner:{login:"octocat",        avatar_url:"https://avatars.githubusercontent.com/u/583231?v=4"}    },
    { id:2, name:"Spoon-Knife",    full_name:"octocat/Spoon-Knife",    description:"This repo is for demonstration purposes only.",              html_url:"https://github.com/octocat/Spoon-Knife",    stargazers_count:12800, language:"HTML", visibility:"public", forks:142700, license:null,            owner:{login:"octocat",        avatar_url:"https://avatars.githubusercontent.com/u/583231?v=4"}    },
    { id:3, name:"linguist",       full_name:"github/linguist",        description:"Language Savant. Provides language breakdown & highlighting.", html_url:"https://github.com/github-linguist/linguist", stargazers_count:12000, language:"Ruby", visibility:"public", forks:3100, license:{spdx_id:"MIT"}, owner:{login:"github-linguist", avatar_url:"https://avatars.githubusercontent.com/u/60648555?v=4"} },
    { id:4, name:"git-consortium", full_name:"octocat/git-consortium", description:"Open source project for collaborative git workflows.",        html_url:"https://github.com/octocat/git-consortium", stargazers_count:200,   language:"Ruby", visibility:"public", forks:20,    license:null,            owner:{login:"octocat",        avatar_url:"https://avatars.githubusercontent.com/u/583231?v=4"}    },
  ],
};

const SKILLS = {
  Languages: ["C","C++","Python","JavaScript","TypeScript","Ruby","Go","Bash"],
  Frontend:  ["React","Next.js","TailwindCSS","HTML5","CSS3","Svelte"],
  Backend:   ["Node.js","Express","Rails","GraphQL","gRPC","FastAPI"],
  Database:  ["PostgreSQL","MySQL","MongoDB","Redis","ClickHouse"],
  DevOps:    ["Git","Docker","Kubernetes","GitHub Actions","Terraform"],
};

const EXPERIENCE = [
  { role:"Staff Software Engineer", company:"GitHub",         period:"Jan 2020", end:"Present", type:"FTE", bullets:["Core platform features serving 100M+ developers across 330M+ repositories.","Led Actions runner infra — reduced median build time by 38%.","Authored and open-sourced Linguist, powering language detection on github.com.","Established platform team RFC process; mentored 6 engineers through promotions."] },
  { role:"Software Engineer",       company:"Octoverse Labs", period:"Mar 2017", end:"Dec 2019", type:"FTE", bullets:["Pull request review redesign — adopted by millions of engineering teams daily.","Reduced CI/CD pipeline latency by 52% via distributed caching.","Designed webhooks v3 API — processed 4B+ events/day at World Cup 2018 peak."] },
  { role:"Core Contributor",        company:"Open Source",    period:"2013",     end:"2017",     type:"VOL", bullets:["Contributed to Ruby on Rails, Homebrew, and 40+ open-source projects.","Maintained npm packages with 500k+ combined weekly downloads."] },
];

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
const fmt  = (n) => n >= 1000 ? `${(n/1000).toFixed(1)}k` : String(n);
const LC   = { JavaScript:"#f7df1e",TypeScript:"#3178c6",Python:"#3572A5",Ruby:"#CC342D",Go:"#00ADD8",C:"#aaa","C++":"#f34b7d",HTML:"#e34c26",CSS:"#563d7c" };
const lc   = (l) => LC[l] || "var(--muted-fg)";
const yr   = (d) => new Date(d).getFullYear();
const NAV  = ["Overview","Experience","Projects","Skills","Network"];

/* ─── Primitives ─────────────────────────────────────────────────────────────── */

/** Centered content container used by every section */
function Wrap({ children, className="" }) {
  return <div className={`w-full max-w-5xl mx-auto px-6 ${className}`}>{children}</div>;
}

function PrimaryBadge({ children }) {
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5"
      style={{ background:"var(--primary)", color:"var(--primary-fg)", fontFamily:"var(--font-mono)" }}>
      {children}
    </span>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-block text-[10px] uppercase tracking-wider px-1.5 py-0.5 border"
      style={{ borderColor:"var(--border)", background:"var(--muted)", color:"var(--muted-fg)", fontFamily:"var(--font-mono)" }}>
      {children}
    </span>
  );
}

function StatusDot() {
  return (
    <span className="flex items-center gap-1.5">
      <span className="dot-pulse inline-block w-2 h-2 rounded-full"
        style={{ background:"var(--primary)", boxShadow:"0 0 5px var(--primary)" }} />
      <span className="text-[10px] uppercase tracking-widest"
        style={{ fontFamily:"var(--font-mono)", color:"var(--primary)" }}>Available</span>
    </span>
  );
}

function SectionHeader({ id, label, index, count }) {
  return (
    <div id={id} className="flex items-baseline gap-3 pt-20 pb-4 mb-8 border-b"
      style={{ borderColor:"var(--border)", scrollMarginTop:"44px" }}>
      <span className="text-[10px] uppercase tracking-[.2em]"
        style={{ fontFamily:"var(--font-mono)", color:"var(--primary)" }}>
        §{String(index).padStart(2,"0")}
      </span>
      <h2 className="text-2xl font-bold tracking-tight"
        style={{ fontFamily:"var(--font-mono)", color:"var(--foreground)" }}>{label}</h2>
      {count !== undefined && (
        <span className="ml-auto text-[10px] tabular-nums"
          style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>{count} records</span>
      )}
    </div>
  );
}

function KpiCell({ label, value, sub }) {
  return (
    <div className="flex flex-col p-5 border-r border-b last:border-r-1"
      style={{ background:"var(--card)", borderColor:"var(--border)" }}>
      <span className="text-[10px] uppercase tracking-widest mb-2"
        style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>{label}</span>
      <span className="text-3xl font-bold leading-none tracking-tighter"
        style={{ fontFamily:"var(--font-mono)", color:"var(--foreground)" }}>{value}</span>
      {sub && <span className="mt-1.5 text-[10px]"
        style={{ fontFamily:"var(--font-mono)", color:"var(--primary)" }}>{sub}</span>}
    </div>
  );
}

function RepoRow({ repo, i }) {
  return (
    <tr className="cursor-pointer" onClick={() => window.open(repo.html_url,"_blank")}>
      <td style={{ color:"var(--muted-fg)", fontVariantNumeric:"tabular-nums" }}>{String(i+1).padStart(2,"0")}</td>
      <td className="font-semibold" style={{ color:"var(--primary)" }}>{repo.name}</td>
      <td className="max-w-xs"><span className="block truncate" style={{ color:"var(--foreground)" }}>{repo.description||"—"}</span></td>
      <td>
        {repo.language
          ? <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:lc(repo.language) }}/><span style={{ color:"var(--foreground)" }}>{repo.language}</span></span>
          : <span style={{ color:"var(--muted-fg)" }}>—</span>}
      </td>
      <td className="text-right tabular-nums" style={{ color:"var(--foreground)" }}>★ {fmt(repo.stargazers_count)}</td>
      <td className="text-right tabular-nums" style={{ color:"var(--foreground)" }}>⑂ {fmt(repo.forks)}</td>
      <td style={{ color:"var(--muted-fg)" }}>{repo.visibility}</td>
      <td>{repo.license ? <Tag>{repo.license.spdx_id}</Tag> : <span style={{ color:"var(--muted-fg)" }}>—</span>}</td>
    </tr>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────────── */
export default function GitHubPortfolioEnterprise({ user = DEMO_USER }) {
  const [dark,      setDark]      = useState(true);
  const [activeNav, setActiveNav] = useState("Overview");
  const [repoTab,   setRepoTab]   = useState("repos");
  const [form,      setForm]      = useState({ name:"", email:"", subject:"", message:"" });
  const [sent,      setSent]      = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const [time,      setTime]      = useState(new Date());

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  // Scroll spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach(e => { if (e.isIntersecting && e.target.dataset.nav) setActiveNav(e.target.dataset.nav); }),
      { rootMargin:"-15% 0px -75% 0px" }
    );
    NAV.forEach(n => { const el = document.getElementById(`sec-${n.toLowerCase()}`); if (el) { el.dataset.nav = n; obs.observe(el); } });
    return () => obs.disconnect();
  }, [mounted]);

  const scrollTo = (id) => document.getElementById(`sec-${id.toLowerCase()}`)?.scrollIntoView({ behavior:"smooth" });

  const repos       = user.repos_url     || [];
  const starred     = user.starred_url   || [];
  const followers   = user.followers_url || [];
  const activeRepos = repoTab === "repos" ? repos : starred;
  const timeStr     = time.toLocaleTimeString("en-US",{ hour12:false, timeZone:"America/Los_Angeles", hour:"2-digit", minute:"2-digit", second:"2-digit" });

  // shorthand token styles
  const bg  = { background:"var(--background)", color:"var(--foreground)", fontFamily:"var(--font-mono)" };
  const bdr = { borderColor:"var(--border)" };

  return (
    <div className={dark ? "dm" : ""} style={bg}>
      <style>{GLOBAL_CSS}</style>

      <div className="min-h-screen transition-colors duration-200" style={bg}>

        {/* ══ TOPBAR ══════════════════════════════════════════════════════════ */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b h-11" style={{ ...bdr, ...bg }}>
          <Wrap className="flex items-center gap-4 h-full py-0">
            {/* Brand */}
            <div className="flex items-center gap-2.5 border-r pr-4 h-full shrink-0" style={bdr}>
              <img src={user.avatar_url} alt="" className="w-5 h-5 grayscale" />
              <span className="text-xs font-bold tracking-tight" style={{ color:"var(--foreground)" }}>{user.login}</span>
            </div>
            {/* Nav */}
            <nav className="flex items-center flex-1 overflow-x-auto">
              {NAV.map(item => (
                <button key={item}
                  onClick={() => scrollTo(item)}
                  className={`nav-btn text-[11px] uppercase tracking-widest px-2.5 py-1 border-none bg-transparent cursor-pointer whitespace-nowrap ${activeNav===item?"on":""}`}
                  style={{ fontFamily:"var(--font-mono)", color:activeNav===item?"var(--primary)":"var(--muted-fg)" }}>
                  {item}
                </button>
              ))}
            </nav>
            {/* Right */}
            <div className="flex items-center gap-4 shrink-0">
              <span className="hidden sm:block text-[10px] tabular-nums" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>
                PDT {timeStr}
              </span>
              <StatusDot />
              <button
                className="obtn text-[10px] uppercase tracking-widest px-2.5 py-1 border cursor-pointer bg-transparent transition-all"
                style={{ fontFamily:"var(--font-mono)", borderColor:"var(--border)", color:"var(--muted-fg)" }}
                onClick={() => setDark(d=>!d)}>
                {dark ? "☀ Light" : "☾ Dark"}
              </button>
            </div>
          </Wrap>
        </header>

        <main className="pt-11">

          {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
          <section id="sec-overview" data-nav="Overview"
            className="scanlines relative border-b min-h-[62vh] flex flex-col justify-end" style={bdr}>

            {/* metadata block — top-right, but inside the centered Wrap horizontally */}
            <div className="absolute top-0 right-0 left-0 z-10 pointer-events-none">
 
            </div>

            {/* Hero body */}
            <Wrap className="pb-12 z-10 relative">
              {mounted && (
                <>
                  <div className="reveal mb-5">
                    <span className="text-[10px] uppercase tracking-[.2em]" style={{ fontFamily:"var(--font-mono)", color:"var(--primary)" }}>
                      ▶ Profile / {user.location} / Member since {yr(user.created_at)}
                    </span>
                  </div>

                  <h1 className="reveal d1 font-bold leading-none tracking-tighter mb-6"
                    style={{ fontFamily:"var(--font-mono)", fontSize:"clamp(42px,8vw,88px)", color:"var(--foreground)" }}>
                    {(user.name||user.login).toUpperCase()}
                    <span className="cursor" style={{ color:"var(--primary)" }}>_</span>
                  </h1>

                  <p className="reveal d2 text-[13px] leading-7 mb-8 max-w-xl border-l-2 pl-4"
                    style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)", borderColor:"var(--primary)" }}>
                    {user.bio}
                  </p>

                  {/* External links */}
                  <div className="reveal d3 flex flex-wrap gap-2 mb-10">
                    {[
                      user.html_url            && ["◆ GitHub ↗",                  user.html_url],
                      user.blog                && [`🔗 ${user.blog.replace(/^https?:\/\//,"")} ↗`, user.blog.startsWith("http")?user.blog:`https://${user.blog}`],
                      user.twitter_username    && [`✕ @${user.twitter_username}`, `https://twitter.com/${user.twitter_username}`],
                    ].filter(Boolean).map(([label,href])=>(
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        className="obtn text-[10px] uppercase tracking-widest px-2.5 py-1 border no-underline transition-all"
                        style={{ fontFamily:"var(--font-mono)", borderColor:"var(--border)", color:"var(--muted-fg)" }}>
                        {label}
                      </a>
                    ))}
                    {user.company && (
                      <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 border"
                        style={{ fontFamily:"var(--font-mono)", borderColor:"var(--border)", color:"var(--muted-fg)" }}>
                        🏢 {user.company}
                      </span>
                    )}
                  </div>

                  {/* KPI row */}
                  <div className="reveal d4 grid grid-cols-2 sm:grid-cols-4 border-t border-l mb-8" style={bdr}>
                    <KpiCell label="Repositories"  value={user.public_repos}   sub={`+${Math.round(user.public_repos*.3)} this year`} />
                    <KpiCell label="Followers"     value={fmt(user.followers)} sub="across github.com" />
                    <KpiCell label="Following"     value={user.following}      sub="curated list" />
                    <KpiCell label="Member Since"  value={yr(user.created_at)} sub={`${new Date().getFullYear()-yr(user.created_at)} yrs active`} />
                  </div>

                  {/* CTAs */}
                  <div className="reveal d5 flex flex-wrap gap-2">
                    <button
                      className="text-[11px] font-bold uppercase tracking-widest px-6 py-2.5 cursor-pointer border-0 transition-opacity hover:opacity-85"
                      style={{ fontFamily:"var(--font-mono)", background:"var(--primary)", color:"var(--primary-fg)" }}
                      onClick={() => scrollTo("Projects")}>
                      View Projects →
                    </button>
                    <button
                      className="obtn text-[11px] uppercase tracking-widest px-6 py-2.5 cursor-pointer bg-transparent border transition-all"
                      style={{ fontFamily:"var(--font-mono)", borderColor:"var(--border)", color:"var(--muted-fg)" }}
                      onClick={() => scrollTo("Network")}>
                      Network
                    </button>
                  </div>
                </>
              )}
            </Wrap>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[.2em] z-10"
              style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>
              ↓ Scroll to explore
            </div>
          </section>

        

          {/* ══ PROJECTS ════════════════════════════════════════════════════════ */}
          <section className="border-b pb-16" style={bdr}>
            <Wrap>
              <SectionHeader id="sec-projects" label="Projects" index={2} count={activeRepos.length} />

              {/* Tabs */}
              <div className="flex border-b mb-0" style={bdr}>
                {[["repos","Own Repositories",repos.length],["starred","Starred ★",starred.length]].map(([id,label,count])=>(
                  <button key={id} onClick={()=>setRepoTab(id)}
                    className="text-[10px] uppercase tracking-widest px-4 py-2 cursor-pointer border-none bg-transparent transition-all -mb-px border-b-2"
                    style={{ fontFamily:"var(--font-mono)", borderBottomColor:repoTab===id?"var(--primary)":"transparent", color:repoTab===id?"var(--primary)":"var(--muted-fg)" }}>
                    {label} <span className="opacity-50">({count})</span>
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th className="w-8">#</th><th>Name</th><th>Description</th>
                      <th>Language</th><th className="text-right">Stars</th>
                      <th className="text-right">Forks</th><th>Visibility</th><th>License</th>
                    </tr>
                  </thead>
                  <tbody>{activeRepos.map((r,i)=><RepoRow key={r.id} repo={r} i={i}/>)}</tbody>
                </table>
              </div>
            </Wrap>
          </section>

          {/* ══ SKILLS ══════════════════════════════════════════════════════════ */}
          <section className="border-b pb-16" style={bdr}>
            <Wrap>
              <SectionHeader id="sec-skills" label="Skills & Technologies" index={3} count={Object.values(SKILLS).flat().length} />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l" style={bdr}>
                {Object.entries(SKILLS).map(([cat,items])=>(
                  <div key={cat} className="border-r border-b p-5" style={bdr}>
                    <div className="text-[10px] font-bold uppercase tracking-[.15em] mb-3" style={{ fontFamily:"var(--font-mono)", color:"var(--primary)" }}>{cat}</div>
                    <div className="flex flex-wrap gap-1.5">{items.map(s=><Tag key={s}>{s}</Tag>)}</div>
                  </div>
                ))}
              </div>
            </Wrap>
          </section>

          {/* ══ NETWORK ═════════════════════════════════════════════════════════ */}
          <section className="border-b pb-16" style={bdr}>
            <Wrap>
              <SectionHeader id="sec-network" label="Network" index={4} count={followers.length} />

              <div className="text-[10px] uppercase tracking-widest mb-3" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>
                Notable followers — {fmt(user.followers)} total
              </div>

              <div className="overflow-x-auto mb-12">
                <table className="data-table">
                  <thead>
                    <tr><th className="w-8">#</th><th>Avatar</th><th>Login</th><th>Type</th><th>Profile</th></tr>
                  </thead>
                  <tbody>
                    {followers.map((f,i)=>(
                      <tr key={f.login} className="cursor-pointer" onClick={()=>window.open(f.html_url,"_blank")}>
                        <td style={{ color:"var(--muted-fg)" }}>{String(i+1).padStart(2,"0")}</td>
                        <td><img src={f.avatar_url} alt="" className="w-6 h-6 grayscale"/></td>
                        <td className="font-semibold" style={{ color:"var(--primary)" }}>{f.login}</td>
                        <td><Tag>{f.type}</Tag></td>
                        <td style={{ color:"var(--muted-fg)" }}>github.com/{f.login}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Contact */}
              <div className="border-t pt-10" style={bdr}>
                <div className="text-[10px] uppercase tracking-widest mb-6" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>
                  Direct Message / Open Inquiry
                </div>
                {sent ? (
                  <div className="inline-block border px-6 py-4" style={{ borderColor:"var(--primary)" }}>
                    <span className="text-xs" style={{ fontFamily:"var(--font-mono)", color:"var(--primary)" }}>▶ MESSAGE_TRANSMITTED // Awaiting response...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px max-w-2xl" style={{ background:"var(--border)" }}>
                    {["name","email"].map(field=>(
                      <div key={field} style={{ background:"var(--background)" }}>
                        <input className="field" placeholder={`${field.toUpperCase()} *`}
                          type={field==="email"?"email":"text"}
                          value={form[field]}
                          onChange={e=>setForm(f=>({...f,[field]:e.target.value}))} />
                      </div>
                    ))}
                    <div className="col-span-1 sm:col-span-2" style={{ background:"var(--background)" }}>
                      <input className="field" placeholder="SUBJECT" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} />
                    </div>
                    <div className="col-span-1 sm:col-span-2" style={{ background:"var(--background)" }}>
                      <textarea className="field" placeholder="MESSAGE *" rows={5} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} />
                    </div>
                    <div className="col-span-1 sm:col-span-2" style={{ background:"var(--background)" }}>
                      <button
                        className="w-full text-[11px] font-bold uppercase tracking-widest py-3 cursor-pointer border-0 transition-opacity hover:opacity-85"
                        style={{ fontFamily:"var(--font-mono)", background:"var(--primary)", color:"var(--primary-fg)" }}
                        onClick={()=>{ if(form.name&&form.email&&form.message) setSent(true); }}>
                        ▶ Transmit Message
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Wrap>
          </section>

          {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
          <footer className="border-t py-4" style={bdr}>
            <Wrap className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[10px]" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>
                © {new Date().getFullYear()} {user.name||user.login} · All rights reserved
              </span>
              <div className="flex items-center gap-5">
                <span className="text-[10px]" style={{ fontFamily:"var(--font-mono)", color:"var(--muted-fg)" }}>github.com/{user.login}</span>
                <StatusDot />
              </div>
            </Wrap>
          </footer>

        </main>
      </div>
    </div>
  );
}