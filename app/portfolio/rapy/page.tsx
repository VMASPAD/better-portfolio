// @ts-nocheck
"use client";

import { useState, useEffect } from "react";

/* ─── Demo data ────────────────────────────────────────────────────────────── */
const DEMO_USER = {
  login: "octocat",
  id: 583231,
  avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
  html_url: "https://github.com/octocat",
  name: "The Octocat",
  company: "@github",
  blog: "https://github.blog",
  location: "San Francisco, CA",
  bio: "A mysterious creature that lives on GitHub. Passionate about open-source infrastructure, distributed systems, and tools that developers trust with their most critical work.",
  twitter_username: "github",
  public_repos: 8,
  public_gists: 8,
  followers: 14942,
  following: 9,
  created_at: "2011-01-25T18:44:36Z",
  updated_at: "2024-03-15T10:22:11Z",
  followers_url: [
    { login: "torvalds", avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4", html_url: "https://github.com/torvalds", type: "User", site_admin: false },
    { login: "gaearon",  avatar_url: "https://avatars.githubusercontent.com/u/810438?v=4",  html_url: "https://github.com/gaearon",  type: "User", site_admin: false },
    { login: "sindresorhus", avatar_url: "https://avatars.githubusercontent.com/u/170270?v=4", html_url: "https://github.com/sindresorhus", type: "User", site_admin: false },
    { login: "tj",       avatar_url: "https://avatars.githubusercontent.com/u/25254?v=4",   html_url: "https://github.com/tj",       type: "User", site_admin: false },
    { login: "mrdoob",   avatar_url: "https://avatars.githubusercontent.com/u/370246?v=4",  html_url: "https://github.com/mrdoob",   type: "User", site_admin: false },
  ],
  starred_url: [
    { id: 1, name: "next.js",      full_name: "vercel/next.js",            description: "The React Framework for the Web — production-grade, opinionated, and battle-tested.", html_url: "https://github.com/vercel/next.js",            stargazers_count: 127000, language: "JavaScript", topics: ["react","nextjs","web"],       visibility: "public", forks: 27000,  open_issues: 2800, watchers: 127000, default_branch: "canary", owner: { login: "vercel",           avatar_url: "https://avatars.githubusercontent.com/u/14985020?v=4" } },
    { id: 2, name: "react",        full_name: "facebook/react",            description: "The library for web and native user interfaces.",                                    html_url: "https://github.com/facebook/react",           stargazers_count: 229000, language: "JavaScript", topics: ["javascript","library","ui"], visibility: "public", forks: 46800,  open_issues: 900,  watchers: 229000, default_branch: "main",   owner: { login: "facebook",         avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4"    } },
    { id: 3, name: "tailwindcss",  full_name: "tailwindlabs/tailwindcss",  description: "A utility-first CSS framework for rapid UI development.",                           html_url: "https://github.com/tailwindlabs/tailwindcss", stargazers_count: 84000,  language: "CSS",        topics: ["css","tailwind"],           visibility: "public", forks: 4300,   open_issues: 40,   watchers: 84000,  default_branch: "main",   owner: { login: "tailwindlabs",     avatar_url: "https://avatars.githubusercontent.com/u/67109815?v=4" } },
  ],
  repos_url: [
    { id: 1, name: "Hello-World",     full_name: "octocat/Hello-World",     description: "My first repository on GitHub — the definitive hello world.",      html_url: "https://github.com/octocat/Hello-World",     stargazers_count: 2700,  language: "C",    topics: ["hello-world"],     visibility: "public", forks: 3100,   open_issues: 536, watchers: 2700,  default_branch: "master", owner: { login: "octocat", avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4" } },
    { id: 2, name: "Spoon-Knife",     full_name: "octocat/Spoon-Knife",     description: "This repo is for demonstration purposes only.",                    html_url: "https://github.com/octocat/Spoon-Knife",     stargazers_count: 12800, language: "HTML", topics: ["demo","fork"],     visibility: "public", forks: 142700, open_issues: 10,  watchers: 12800, default_branch: "main",   owner: { login: "octocat", avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4" } },
    { id: 3, name: "linguist",        full_name: "github-linguist/linguist",description: "Language Savant. Provides language breakdown and syntax highlighting.", html_url: "https://github.com/github-linguist/linguist",stargazers_count: 12000, language: "Ruby", topics: ["language","detection"], visibility: "public", forks: 3100, open_issues: 95, watchers: 12000, default_branch: "main", owner: { login: "github-linguist", avatar_url: "https://avatars.githubusercontent.com/u/60648555?v=4" } },
    { id: 4, name: "git-consortium", full_name: "octocat/git-consortium",  description: "Open source project for collaborative git workflows at scale.",   html_url: "https://github.com/octocat/git-consortium",  stargazers_count: 200,   language: "Ruby", topics: ["git","collaboration"],visibility: "public", forks: 20,    open_issues: 2,   watchers: 200,   default_branch: "master", owner: { login: "octocat", avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4" } },
  ],
};

const EXPERIENCE = [
  {
    role: "Staff Software Engineer",
    company: "GitHub",
    url: "https://github.com",
    period: "Jan 2020 — Present",
    duration: "4+ yrs",
    type: "Full-time",
    bullets: [
      "Built and maintained core platform features used by 100M+ developers worldwide across 330M+ repositories.",
      "Led architecture for the new Actions runner infrastructure — reduced median build time by 38%.",
      "Authored and open-sourced Linguist, the language detection library powering all of github.com.",
      "Mentored 6 engineers through promotion cycles; established the platform team's RFC process.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Octoverse Labs",
    url: "https://github.com",
    period: "Mar 2017 — Dec 2019",
    duration: "2 yrs 9 mo",
    type: "Full-time",
    bullets: [
      "Shipped the pull request review experience redesign, now used by millions of engineering teams daily.",
      "Reduced CI/CD pipeline end-to-end latency by 52% via distributed caching and artifact pre-warming.",
      "Designed the webhooks v3 API — processed 4B+ events/day at peak during World Cup 2018.",
    ],
  },
  {
    role: "Core Contributor",
    company: "Open Source",
    url: "https://github.com/octocat",
    period: "2013 — 2017",
    duration: "4 yrs",
    type: "Volunteer",
    bullets: [
      "Contributed to Ruby on Rails, Homebrew, and 40+ open source projects with merged PRs.",
      "Maintained npm packages with combined 500k+ weekly downloads across the ecosystem.",
    ],
  },
];

const SKILLS = {
  Languages:  ["C", "C++", "Python", "JavaScript", "TypeScript", "Ruby", "Go"],
  Frontend:   ["React", "Next.js", "TailwindCSS", "HTML5", "CSS3", "Svelte"],
  Backend:    ["Node.js", "Express", "Rails", "GraphQL", "gRPC", "FastAPI"],
  Data:       ["PostgreSQL", "MySQL", "MongoDB", "Redis", "ClickHouse"],
  DevOps:     ["Git", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Vercel"],
};

/* ─── Helpers ──────────────────────────────────────────────────────────────── */
const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));
const langColor = {
  JavaScript:"#f7df1e", TypeScript:"#3178c6", Python:"#3572A5", Ruby:"#CC342D",
  Go:"#00ADD8", Rust:"#dea584", Java:"#b07219", C:"#aaaaaa", "C++":"#f34b7d",
  HTML:"#e34c26", CSS:"#563d7c",
};
const lc = (l) => langColor[l] || "#555";

const NAV = ["Overview", "Experience", "Repositories", "Skills", "Followers"];

/* ─── Micro-components ─────────────────────────────────────────────────────── */

function GreenBadge({ children }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider"
      style={{ background: "rgba(62,207,142,0.12)", color: "#3ecf8e", border: "1px solid rgba(62,207,142,0.25)" }}
    >
      {children}
    </span>
  );
}

function GrayBadge({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#232323] text-[#666] border border-[#2e2e2e]">
      {children}
    </span>
  );
}

function SectionAnchor({ id, number, title, subtitle }) {
  return (
    <div id={id} className="pt-28 -mt-28 mb-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-xs text-[#3ecf8e] tracking-widest">{number}</span>
        <div className="h-px flex-1 bg-[#252525]" />
      </div>
      <h2
        className="text-3xl font-bold tracking-tight text-white"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        {title}
      </h2>
      {subtitle && <p className="text-sm text-[#555] mt-1 font-mono">{subtitle}</p>}
    </div>
  );
}

function RepoCard({ repo, index }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-4 p-5 border border-[#232323] hover:border-[#3ecf8e]/30 transition-all duration-300 bg-[#171717] overflow-hidden"
      style={{ "--hover-glow": "rgba(62,207,142,0.04)" }}
    >
      {/* subtle green glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(62,207,142,0.06) 0%, transparent 60%)" }}
      />

      {/* index + arrow */}
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] text-[#333] tracking-widest">{String(index + 1).padStart(2, "0")}</span>
        <svg className="w-3.5 h-3.5 text-[#333] group-hover:text-[#3ecf8e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <img src={repo.owner?.avatar_url} alt="" className="w-3.5 h-3.5 rounded-full opacity-40" />
          <span className="text-[10px] font-mono text-[#444]">{repo.owner?.login}/</span>
        </div>
        <h3 className="text-sm font-semibold text-white group-hover:text-[#3ecf8e] transition-colors duration-200">
          {repo.name}
        </h3>
      </div>

      {repo.description && (
        <p className="text-xs text-[#555] leading-relaxed line-clamp-3 flex-1">{repo.description}</p>
      )}

      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {repo.topics.slice(0, 4).map((t) => <GrayBadge key={t}>{t}</GrayBadge>)}
        </div>
      )}

      <div className="flex items-center gap-4 pt-3 border-t border-[#1f1f1f]">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-[11px] text-[#555] font-mono">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: lc(repo.language) }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 text-[11px] text-[#444] font-mono ml-auto">
          ★ {fmt(repo.stargazers_count)}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-[#444] font-mono">
          ⑂ {fmt(repo.forks)}
        </span>
      </div>
    </a>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────────── */
export default function GitHubPortfolioSupabase({ user = DEMO_USER }) {
  const [mounted, setMounted] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");
  const [repoTab, setRepoTab] = useState("own");

  useEffect(() => {
    setMounted(true);

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting && e.target.dataset.nav) setActiveNav(e.target.dataset.nav); }),
      { rootMargin: "-20% 0px -70% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.toLowerCase());
      if (el) { el.dataset.nav = n; obs.observe(el); }
    });
    return () => obs.disconnect();
  }, []);

  const repos = user.repos_url || [];
  const starred = user.starred_url || [];
  const followers = user.followers_url || [];

  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen text-white" style={{ background: "#111", fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif" }}>

      {/* dot-grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #2a2a2a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.45,
        }}
      />
      {/* top green glow */}
      <div
        className="fixed top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, #3ecf8e 50%, transparent 100%)", opacity: 0.6 }}
      />

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e1e1e]" style={{ background: "rgba(17,17,17,0.85)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-13 flex items-center justify-between" style={{ height: 52 }}>
          <div className="flex items-center gap-3">
            <img src={user.avatar_url} alt={user.login} className="w-6 h-6 rounded-full" style={{ filter: "saturate(0.3)" }} />
            <span className="text-sm font-mono text-[#888]">{user.login}</span>
            <span className="text-[#2a2a2a] mx-1">·</span>
            <GreenBadge>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3ecf8e] inline-block" />
              Available
            </GreenBadge>
          </div>

          <nav className="hidden md:flex items-center gap-0.5">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="px-3 py-1.5 text-xs font-mono rounded transition-all duration-150"
                style={{
                  color: activeNav === item ? "#3ecf8e" : "#555",
                  background: activeNav === item ? "rgba(62,207,142,0.08)" : "transparent",
                }}
              >
                {item}
              </button>
            ))}
          </nav>

          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-[#2a2a2a] text-[#555] hover:border-[#3ecf8e]/40 hover:text-[#3ecf8e] transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub ↗
          </a>
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-6 pt-[52px]">

        {/* ══ HERO / OVERVIEW ════════════════════════════════════════════════ */}
        <section
          id="overview"
          className="min-h-screen flex flex-col justify-center py-20 border-b border-[#1a1a1a]"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(16px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          {/* eyebrow */}
          <div className="flex items-center gap-2 mb-8">
            <span className="font-mono text-xs text-[#3ecf8e] tracking-widest uppercase">Profile — {new Date(user.created_at).getFullYear()} — Present</span>
          </div>

          {/* Big heading — serif italic like the reference */}
          <div className="mb-8">
            <h1
              className="text-6xl sm:text-8xl font-bold leading-none tracking-tight text-white mb-2"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.03em" }}
            >
              {(user.name || user.login).split(" ").map((word, i, arr) =>
                i === arr.length - 1
                  ? <span key={i} style={{ fontStyle: "italic", color: "#3ecf8e" }}>{word}</span>
                  : <span key={i}>{word} </span>
              )}
            </h1>
            <p className="text-sm font-mono text-[#444] mt-3 tracking-widest uppercase">
              {user.company} · {user.location}
            </p>
          </div>

          <p className="text-base text-[#666] max-w-xl leading-relaxed mb-10">
            {user.bio}
          </p>

          {/* links */}
          <div className="flex flex-wrap gap-3 mb-14">
            {user.blog && (
              <a href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-[#555] hover:text-[#3ecf8e] transition-colors">
                🔗 {user.blog.replace(/^https?:\/\//, "")}
              </a>
            )}
            {user.twitter_username && (
              <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-[#555] hover:text-[#3ecf8e] transition-colors">
                ✕ @{user.twitter_username}
              </a>
            )}
            <a href={user.html_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-[#555] hover:text-[#3ecf8e] transition-colors">
              ◆ github.com/{user.login}
            </a>
          </div>

          {/* Stats — grid with green top border on hover */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-[#1e1e1e] border border-[#1e1e1e] rounded-lg overflow-hidden mb-10">
            {[
              { label: "Repositories", v: user.public_repos },
              { label: "Followers",    v: fmt(user.followers) },
              { label: "Following",    v: user.following },
              { label: "Gists",        v: user.public_gists },
              { label: "Member Since", v: new Date(user.created_at).getFullYear() },
            ].map(({ label, v }) => (
              <div
                key={label}
                className="group flex flex-col items-start p-5 bg-[#141414] hover:bg-[#161616] transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-[#3ecf8e] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <span className="text-2xl font-bold text-white font-mono tracking-tighter">{v}</span>
                <span className="text-[10px] text-[#444] uppercase tracking-widest mt-1 font-mono">{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("repositories")}
              className="px-5 py-2.5 text-sm font-semibold rounded text-black transition-all duration-200 hover:opacity-90"
              style={{ background: "#3ecf8e" }}
            >
              View projects →
            </button>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-semibold rounded border border-[#2a2a2a] text-[#888] hover:border-[#3ecf8e]/30 hover:text-[#3ecf8e] transition-all duration-200"
            >
              GitHub profile ↗
            </a>
          </div>

          {/* scroll hint */}
          <div className="mt-16 flex items-center gap-2 text-[#333]">
            <div className="h-8 w-px bg-[#2a2a2a]" />
            <span className="text-xs font-mono tracking-widest">SCROLL TO EXPLORE</span>
          </div>
        </section>

        {/* ══ EXPERIENCE ═════════════════════════════════════════════════════ */}
        <section id="experience" className="border-b border-[#1a1a1a] pb-20">
          <SectionAnchor id="experience" number="— 01" title="Experience" subtitle={`${EXPERIENCE.length} positions documented`} />

          <div className="space-y-px bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#1a1a1a]">
            {EXPERIENCE.map((item, i) => (
              <div
                key={i}
                className="group relative bg-[#141414] hover:bg-[#161616] transition-colors p-6"
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-[#3ecf8e] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <GreenBadge>{item.type}</GreenBadge>
                      <span className="font-mono text-[10px] text-[#333]">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white">{item.role}</h3>
                    <a href={item.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-mono text-[#3ecf8e]/70 hover:text-[#3ecf8e] transition-colors">
                      {item.company} ↗
                    </a>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono text-[#444] whitespace-nowrap">{item.period}</p>
                    <p className="text-[10px] font-mono text-[#333] mt-0.5">{item.duration}</p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {item.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-2.5 text-xs text-[#555] leading-relaxed">
                      <span className="text-[#3ecf8e]/40 flex-shrink-0 mt-px font-mono">→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ══ REPOSITORIES ═══════════════════════════════════════════════════ */}
        <section id="repositories" className="border-b border-[#1a1a1a] pb-20">
          <SectionAnchor id="repositories" number="— 02" title="Repositories" subtitle="Public work, open source contributions" />

          {/* tab */}
          <div className="flex items-center gap-1 mb-6 p-1 rounded-lg border border-[#1e1e1e] bg-[#141414] w-fit">
            {[["own", "Own", repos.length], ["starred", "Starred ★", starred.length]].map(([id, label, count]) => (
              <button
                key={id}
                onClick={() => setRepoTab(id)}
                className="px-4 py-1.5 rounded text-xs font-mono transition-all duration-150"
                style={repoTab === id
                  ? { background: "rgba(62,207,142,0.12)", color: "#3ecf8e", border: "1px solid rgba(62,207,142,0.2)" }
                  : { color: "#555" }}
              >
                {label} <span style={{ opacity: 0.5 }}>{count}</span>
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-px bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#1a1a1a]">
            {(repoTab === "own" ? repos : starred).map((r, i) => (
              <RepoCard key={r.id} repo={r} index={i} />
            ))}
          </div>
        </section>

        {/* ══ SKILLS ═════════════════════════════════════════════════════════ */}
        <section id="skills" className="border-b border-[#1a1a1a] pb-20">
          <SectionAnchor id="skills" number="— 03" title="Skills & Technologies" subtitle="Tools used across production systems" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#1a1a1a]">
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat} className="group bg-[#141414] hover:bg-[#161616] transition-colors p-5 relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-[#3ecf8e] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <p className="text-[10px] font-mono text-[#3ecf8e]/60 uppercase tracking-widest mb-4">{cat}</p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((s) => <GrayBadge key={s}>{s}</GrayBadge>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ FOLLOWERS ══════════════════════════════════════════════════════ */}
        <section id="followers" className="pb-24">
          <SectionAnchor id="followers" number="— 04" title="Network" subtitle={`${fmt(user.followers)} followers · ${user.following} following`} />

          <div className="mb-6">
            <p className="text-[10px] font-mono text-[#333] uppercase tracking-widest mb-4">Notable followers</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#1a1a1a]">
              {followers.map((f, i) => (
                <a
                  key={f.login}
                  href={f.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 p-5 bg-[#141414] hover:bg-[#161616] transition-all relative"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-[#3ecf8e] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="font-mono text-[9px] text-[#2a2a2a] absolute top-2 right-3">{String(i + 1).padStart(2, "0")}</span>
                  <img
                    src={f.avatar_url}
                    alt={f.login}
                    className="w-10 h-10 rounded-full transition-all duration-200 group-hover:ring-2"
                    style={{ filter: "saturate(0.3)", "--tw-ring-color": "#3ecf8e" }}
                    onMouseEnter={e => { e.currentTarget.style.filter = "saturate(1)"; e.currentTarget.style.boxShadow = "0 0 0 2px #3ecf8e"; }}
                    onMouseLeave={e => { e.currentTarget.style.filter = "saturate(0.3)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                  <span className="text-xs font-mono text-[#555] group-hover:text-[#3ecf8e] transition-colors text-center">{f.login}</span>
                  <GrayBadge>{f.type}</GrayBadge>
                </a>
              ))}
            </div>
          </div>

          {/* Big CTA at the bottom */}
          <div
            className="relative mt-16 p-10 rounded-lg border border-[#1e1e1e] overflow-hidden text-center"
            style={{ background: "linear-gradient(135deg, #141414 0%, #111 100%)" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(62,207,142,0.07) 0%, transparent 70%)" }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #3ecf8e, transparent)" }}
            />
            <p className="font-mono text-xs text-[#3ecf8e]/60 uppercase tracking-widest mb-3">Open to opportunities</p>
            <h3
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
            >
              Let's build something
            </h3>
            <p className="text-sm text-[#555] mb-8 max-w-md mx-auto">
              Available for contract work, open source collaboration, and full-time roles. Reach out on GitHub or follow on X.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 text-sm font-semibold rounded text-black hover:opacity-90 transition-opacity"
                style={{ background: "#3ecf8e" }}
              >
                View on GitHub →
              </a>
              {user.twitter_username && (
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 text-sm font-semibold rounded border border-[#2a2a2a] text-[#888] hover:border-[#3ecf8e]/30 hover:text-[#3ecf8e] transition-all"
                >
                  Follow @{user.twitter_username}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ══ FOOTER ═════════════════════════════════════════════════════════ */}
        <footer className="border-t border-[#1a1a1a] py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={user.avatar_url} alt="" className="w-5 h-5 rounded-full" style={{ filter: "saturate(0.3)" }} />
            <span className="text-xs font-mono text-[#333]">{user.name || user.login}</span>
          </div>
          <span className="text-xs font-mono text-[#2a2a2a]">github.com/{user.login} · Member since {new Date(user.created_at).getFullYear()}</span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3ecf8e] animate-pulse" />
            <span className="text-[10px] font-mono text-[#3ecf8e]/60">Active</span>
          </div>
        </footer>
      </main>
    </div>
  );
}