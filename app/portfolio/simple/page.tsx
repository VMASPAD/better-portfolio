// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";

// ─── Demo data ────────────────────────────────────────────────────────────────
const DEMO_USER = {
  login: "octocat",
  id: 1,
  avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
  html_url: "https://github.com/octocat",
  name: "The Octocat",
  company: "@github",
  blog: "https://github.blog",
  location: "San Francisco, CA",
  bio: "A mysterious creature that lives on GitHub. Passionate about open source, distributed systems, and building tools developers love every single day.",
  twitter_username: "github",
  public_repos: 8,
  public_gists: 8,
  followers: 14942,
  following: 9,
  created_at: "2011-01-25T18:44:36Z",
  updated_at: "2024-03-15T10:22:11Z",
  followers_url: [
    { login: "torvalds", avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4", html_url: "https://github.com/torvalds", type: "User", site_admin: false },
    { login: "gaearon", avatar_url: "https://avatars.githubusercontent.com/u/810438?v=4", html_url: "https://github.com/gaearon", type: "User", site_admin: false },
    { login: "sindresorhus", avatar_url: "https://avatars.githubusercontent.com/u/170270?v=4", html_url: "https://github.com/sindresorhus", type: "User", site_admin: false },
    { login: "tj", avatar_url: "https://avatars.githubusercontent.com/u/25254?v=4", html_url: "https://github.com/tj", type: "User", site_admin: false },
  ],
  following_url: [
    { login: "defunkt", avatar_url: "https://avatars.githubusercontent.com/u/2?v=4", html_url: "https://github.com/defunkt", type: "User", site_admin: false },
  ],
  starred_url: [
    { id: 1, name: "next.js", full_name: "vercel/next.js", description: "The React Framework for the Web", html_url: "https://github.com/vercel/next.js", stargazers_count: 127000, language: "JavaScript", topics: ["react", "nextjs", "web"], visibility: "public", forks: 27000, open_issues: 2800, watchers: 127000, default_branch: "canary", owner: { login: "vercel", avatar_url: "https://avatars.githubusercontent.com/u/14985020?v=4" } },
    { id: 2, name: "react", full_name: "facebook/react", description: "The library for web and native user interfaces", html_url: "https://github.com/facebook/react", stargazers_count: 229000, language: "JavaScript", topics: ["javascript", "library", "ui"], visibility: "public", forks: 46800, open_issues: 900, watchers: 229000, default_branch: "main", owner: { login: "facebook", avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4" } },
    { id: 3, name: "tailwindcss", full_name: "tailwindlabs/tailwindcss", description: "A utility-first CSS framework for rapid UI development.", html_url: "https://github.com/tailwindlabs/tailwindcss", stargazers_count: 84000, language: "CSS", topics: ["css", "tailwind"], visibility: "public", forks: 4300, open_issues: 40, watchers: 84000, default_branch: "main", owner: { login: "tailwindlabs", avatar_url: "https://avatars.githubusercontent.com/u/67109815?v=4" } },
  ],
  repos_url: [
    { id: 1, name: "Hello-World", full_name: "octocat/Hello-World", description: "My first repository on GitHub!", html_url: "https://github.com/octocat/Hello-World", stargazers_count: 2700, language: "C", topics: ["hello-world"], visibility: "public", forks: 3100, open_issues: 536, watchers: 2700, default_branch: "master", owner: { login: "octocat", avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4" } },
    { id: 2, name: "Spoon-Knife", full_name: "octocat/Spoon-Knife", description: "This repo is for demonstration purposes only.", html_url: "https://github.com/octocat/Spoon-Knife", stargazers_count: 12800, language: "HTML", topics: ["demo", "fork"], visibility: "public", forks: 142700, open_issues: 10, watchers: 12800, default_branch: "main", owner: { login: "octocat", avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4" } },
    { id: 3, name: "linguist", full_name: "github-linguist/linguist", description: "Language Savant. Provides language breakdown and syntax highlighting.", html_url: "https://github.com/github-linguist/linguist", stargazers_count: 12000, language: "Ruby", topics: ["language", "detection", "github"], visibility: "public", forks: 3100, open_issues: 95, watchers: 12000, default_branch: "main", owner: { login: "github-linguist", avatar_url: "https://avatars.githubusercontent.com/u/60648555?v=4" } },
    { id: 4, name: "git-consortium", full_name: "octocat/git-consortium", description: "Open source project for collaborative git workflows.", html_url: "https://github.com/octocat/git-consortium", stargazers_count: 200, language: "Ruby", topics: ["git", "collaboration"], visibility: "public", forks: 20, open_issues: 2, watchers: 200, default_branch: "master", owner: { login: "octocat", avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4" } },
  ],
  subscriptions_url: [],
  type: "User",
  user_view_type: "public",
  site_admin: false,
  email: null,
  hireable: null,
  twitter_username: "github",
  public_gists: 8,
};

const SKILLS = {
  Languages: ["C", "C++", "Python", "JavaScript", "TypeScript", "Ruby"],
  Frontend: ["React", "Next.js", "TailwindCSS", "HTML5", "CSS3"],
  Backend: ["Node.js", "Express", "Rails", "GraphQL"],
  Database: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  DevOps: ["Git", "Docker", "GitHub Actions", "Vercel"],
};

const EXPERIENCE = [
  { company: "GitHub", role: "Staff Software Engineer", period: "Jan 2020 — Present", duration: "4+ yrs", bullets: ["Built and maintained core platform features used by 100M+ developers worldwide.", "Led architecture for new Actions runner infrastructure, improving build times by 38%.", "Open sourced linguist, the language detection library powering all of GitHub."] },
  { company: "Octoverse Labs", role: "Software Engineer", period: "Mar 2017 — Dec 2019", duration: "2 yrs 9 mo", bullets: ["Shipped the pull request review experience redesign adopted by millions of teams.", "Reduced CI/CD pipeline latency by 52% through distributed caching strategies."] },
  { company: "Open Source", role: "Core Contributor", period: "2013 — 2017", duration: "4 yrs", bullets: ["Contributed to Ruby on Rails, Homebrew and dozens of open source projects.", "Maintained several npm packages with combined 500k+ weekly downloads."] },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

const langColor = {
  JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3572A5",
  Ruby: "#CC342D", Go: "#00ADD8", Rust: "#dea584", Java: "#b07219",
  C: "#a8a8a8", "C++": "#f34b7d", HTML: "#e34c26", CSS: "#563d7c",
};
const getLangColor = (l) => langColor[l] || "#666";

const NAV = ["About", "Experience", "Projects", "Skills", "Contact"];

// ─── Components ───────────────────────────────────────────────────────────────

function Tag({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium tracking-wider uppercase border border-[#333] text-[#888] rounded">
      {children}
    </span>
  );
}

function SectionHeading({ id, label, number }) {
  return (
    <div id={id} className="flex items-baseline gap-4 mb-12 pt-24 -mt-24">
      <span className="font-mono text-xs text-[#555] w-6 flex-shrink-0">{number}</span>
      <h2 className="text-2xl font-semibold tracking-tight text-white">{label}</h2>
      <div className="flex-1 h-px bg-[#222] ml-4" />
    </div>
  );
}

function RepoCard({ repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-3 p-5 border border-[#222] hover:border-[#444] transition-all duration-300 bg-[#0a0a0a] hover:bg-[#111] overflow-hidden"
    >
      {/* top-right arrow */}
      <svg className="absolute top-4 right-4 w-3.5 h-3.5 text-[#444] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>

      <div className="flex items-center gap-2 pr-6">
        <img src={repo.owner?.avatar_url} alt="" className="w-4 h-4 rounded-full opacity-60" />
        <span className="text-[11px] text-[#555] font-mono">{repo.owner?.login}/</span>
        <span className="text-sm font-medium text-white truncate">{repo.name}</span>
      </div>

      {repo.description && (
        <p className="text-xs text-[#666] leading-relaxed line-clamp-2">{repo.description}</p>
      )}

      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 3).map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      )}

      <div className="flex items-center gap-4 mt-auto pt-2 border-t border-[#1a1a1a]">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-xs text-[#555]">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLangColor(repo.language) }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs text-[#555] ml-auto">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          {fmt(repo.stargazers_count)}
        </span>
        <span className="flex items-center gap-1 text-xs text-[#555]">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {fmt(repo.forks)}
        </span>
      </div>
    </a>
  );
}

function ExperienceItem({ item, isLast }) {
  return (
    <div className={`relative pl-8 ${!isLast ? "pb-10" : ""}`}>
      {/* timeline line */}
      {!isLast && <div className="absolute left-[3px] top-3 bottom-0 w-px bg-[#222]" />}
      {/* dot */}
      <div className="absolute left-0 top-[6px] w-1.5 h-1.5 rounded-full bg-[#444] border border-[#666]" />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
        <div>
          <h3 className="text-sm font-semibold text-white">{item.role}</h3>
          <span className="text-xs text-[#666] font-mono">{item.company}</span>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-0.5">
          <span className="text-xs text-[#555] font-mono whitespace-nowrap">{item.period}</span>
          <span className="text-[10px] text-[#444] font-mono">{item.duration}</span>
        </div>
      </div>

      <ul className="space-y-1.5">
        {item.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-xs text-[#666] leading-relaxed">
            <span className="text-[#444] flex-shrink-0 mt-px">—</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function GitHubPortfolioVercel({ user = DEMO_USER }) {
  const [activeSection, setActiveSection] = useState("About");
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Scroll spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.dataset.section);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    NAV.forEach((s) => {
      const el = document.getElementById(s.toLowerCase());
      if (el) { el.dataset.section = s; obs.observe(el); }
    });
    return () => obs.disconnect();
  }, [mounted]);


  const repos = Array.isArray(user.repos_url) ? user.repos_url : [];
  const starred = Array.isArray(user.starred_url) ? user.starred_url : [];
  const followers = Array.isArray(user.followers_url) ? user.followers_url : [];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen bg-[#000] text-white"
      style={{ fontFamily: "'Geist', 'Inter', system-ui, sans-serif" }}
    >
      {/* ── Ambient glow top ── */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center top, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
      />

      {/* ── Top nav bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#000]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
            <img src={user.avatar_url} alt={user.login} className="w-5 h-5 rounded-full grayscale" />
            <span className="text-sm font-medium text-white font-mono">{user.login}</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors duration-150 ${
                  activeSection === item
                    ? "text-white bg-[#1a1a1a]"
                    : "text-[#666] hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#333] text-[#888] hover:text-white hover:border-[#666] transition-all rounded"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-12">

        {/* ════ HERO ════ */}
        <section
          id="about"
          className="min-h-screen flex flex-col justify-center py-24 border-b border-[#111]"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Status badge */}
          <div className="flex items-center gap-2 mb-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs text-[#555] font-mono">Available for work</span>
          </div>

          {/* Big name */}
          <h1
            className="text-5xl sm:text-7xl font-bold tracking-tighter text-white mb-6 leading-none"
            style={{ letterSpacing: "-0.04em" }}
          >
            {user.name || user.login}
          </h1>

          <p className="text-lg text-[#666] max-w-lg leading-relaxed mb-10">
            {user.bio}
          </p>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {user.location && (
              <span className="flex items-center gap-1.5 text-xs text-[#555] font-mono">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {user.location}
              </span>
            )}
            {user.company && (
              <span className="flex items-center gap-1.5 text-xs text-[#555] font-mono">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                </svg>
                {user.company}
              </span>
            )}
            {user.twitter_username && (
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#555] font-mono hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @{user.twitter_username}
              </a>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 sm:grid-cols-5 border border-[#1a1a1a] divide-x divide-[#1a1a1a]">
            {[
              { label: "Repos", v: user.public_repos },
              { label: "Followers", v: user.followers },
              { label: "Following", v: user.following },
              { label: "Gists", v: user.public_gists },
              { label: "Since", v: new Date(user.created_at).getFullYear() },
            ].map(({ label, v }) => (
              <div key={label} className="flex flex-col items-center py-5 px-2">
                <span className="text-xl font-semibold text-white tracking-tight">{fmt(v)}</span>
                <span className="text-[10px] text-[#444] uppercase tracking-widest mt-0.5 font-mono">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3 mt-10">
            <button
              onClick={() => scrollTo("Contact")}
              className="px-5 py-2.5 bg-white text-black text-sm font-medium hover:bg-[#e5e5e5] transition-colors rounded"
            >
              Get in touch
            </button>
            <button
              onClick={() => scrollTo("Projects")}
              className="px-5 py-2.5 border border-[#333] text-[#888] text-sm font-medium hover:text-white hover:border-[#666] transition-all rounded"
            >
              View work →
            </button>
          </div>
        </section>

        {/* ════ EXPERIENCE ════ */}
        <section id="experience" className="border-b border-[#111]">
          <SectionHeading id="experience" label="Experience" number="01" />
          <div className="pb-20">
            {EXPERIENCE.map((item, i) => (
              <ExperienceItem key={i} item={item} isLast={i === EXPERIENCE.length - 1} />
            ))}
          </div>

          {/* Followers row */}
          {followers.length > 0 && (
            <div className="pb-16">
              <p className="text-xs text-[#444] uppercase tracking-widest font-mono mb-4">Notable followers</p>
              <div className="flex flex-wrap gap-2">
                {followers.map((f) => (
                  <a
                    key={f.login}
                    href={f.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 border border-[#222] hover:border-[#444] transition-colors rounded text-xs text-[#666] hover:text-white"
                  >
                    <img src={f.avatar_url} alt={f.login} className="w-4 h-4 rounded-full grayscale" />
                    {f.login}
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ════ PROJECTS ════ */}
        <section id="projects" className="border-b border-[#111]">
          <SectionHeading id="projects" label="Projects" number="02" />

          <div className="mb-6">
            <p className="text-xs text-[#444] uppercase tracking-widest font-mono mb-4">Repositories</p>
            <div className="grid sm:grid-cols-2 gap-0 border border-[#1a1a1a] divide-y sm:divide-y-0 sm:divide-x divide-[#1a1a1a]">
              {repos.slice(0, 2).map((r) => <RepoCard key={r.id} repo={r} />)}
            </div>
            {repos.length > 2 && (
              <div className="grid sm:grid-cols-2 gap-0 border-x border-b border-[#1a1a1a] divide-x divide-[#1a1a1a]">
                {repos.slice(2, 4).map((r) => <RepoCard key={r.id} repo={r} />)}
              </div>
            )}
          </div>

          <div className="mb-20">
            <p className="text-xs text-[#444] uppercase tracking-widest font-mono mb-4">Starred</p>
            <div className="grid sm:grid-cols-3 gap-0 border border-[#1a1a1a] divide-y sm:divide-y-0 sm:divide-x divide-[#1a1a1a]">
              {starred.slice(0, 3).map((r) => <RepoCard key={r.id} repo={r} />)}
            </div>
          </div>
        </section>

        {/* ════ SKILLS ════ */}
        <section id="skills" className="border-b border-[#111]">
          <SectionHeading id="skills" label="Skills" number="03" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#1a1a1a] divide-y lg:divide-y-0 divide-[#1a1a1a] mb-20">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category} className="p-6 border-r border-[#1a1a1a] last:border-r-0">
                <p className="text-[10px] text-[#444] uppercase tracking-widest font-mono mb-4">{category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════ CONTACT ════ */}
        <section id="contact" className="py-24">
          <SectionHeading id="contact" label="Contact" number="04" />

          <div className="grid sm:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#666] text-sm leading-relaxed mb-6">
                Have a question or want to work together? Fill out the form and I'll get back to you as soon as possible.
              </p>
              {user.blog && (
                <a
                  href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#555] hover:text-white transition-colors font-mono"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  {user.blog.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>

            {sent ? (
              <div className="border border-[#222] p-8 text-center">
                <div className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center mx-auto mb-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-white font-medium">Message sent</p>
                <p className="text-xs text-[#555] mt-1">I'll get back to you soon.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {[
                  { key: "name", placeholder: "Name", type: "text" },
                  { key: "email", placeholder: "Email", type: "email" },
                ].map(({ key, placeholder, type }) => (
                  <input
                    key={key}
                    type={type}
                    placeholder={placeholder}
                    value={formState[key]}
                    onChange={(e) => setFormState((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full bg-[#0a0a0a] border border-[#222] text-white text-sm px-4 py-2.5 placeholder-[#444] focus:outline-none focus:border-[#555] transition-colors font-mono rounded"
                  />
                ))}
                <textarea
                  placeholder="Message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#222] text-white text-sm px-4 py-2.5 placeholder-[#444] focus:outline-none focus:border-[#555] transition-colors font-mono resize-none rounded"
                />
                <button
                  onClick={() => {
                    if (formState.name && formState.email && formState.message) setSent(true);
                  }}
                  className="w-full py-2.5 bg-white text-black text-sm font-medium hover:bg-[#e5e5e5] transition-colors rounded"
                >
                  Send message
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-[#111] py-8 flex items-center justify-between">
          <span className="text-xs text-[#333] font-mono">© {new Date().getFullYear()} {user.name || user.login}</span>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#444] font-mono hover:text-white transition-colors"
          >
            github.com/{user.login} ↗
          </a>
        </footer>
      </main>
    </div>
  );
}