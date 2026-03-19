// @ts-nocheck
"use client";

import { useState, useEffect } from "react";

// ─── Demo data matching the schema ───────────────────────────────────────────
const DEMO_USER = {
  login: "octocat",
  id: 1,
  avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
  html_url: "https://github.com/octocat",
  name: "The Octocat",
  company: "@github",
  blog: "https://github.blog",
  location: "San Francisco, CA",
  bio: "A mysterious creature that lives on GitHub. Passionate about open source, distributed systems, and building tools that developers love.",
  twitter_username: "github",
  public_repos: 8,
  public_gists: 8,
  followers: 14942,
  following: 9,
  created_at: "2011-01-25T18:44:36Z",
  updated_at: "2024-03-15T10:22:11Z",
  followers_url: [
    { login: "torvalds", avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4", html_url: "https://github.com/torvalds", type: "User" },
    { login: "gaearon", avatar_url: "https://avatars.githubusercontent.com/u/810438?v=4", html_url: "https://github.com/gaearon", type: "User" },
    { login: "sindresorhus", avatar_url: "https://avatars.githubusercontent.com/u/170270?v=4", html_url: "https://github.com/sindresorhus", type: "User" },
  ],
  starred_url: [
    { id: 1, name: "linguist", full_name: "github-linguist/linguist", description: "Language Savant. Provides language breakdown and syntax highlighting.", html_url: "https://github.com/github-linguist/linguist", stargazers_count: 12000, language: "Ruby", topics: ["language", "detection"], visibility: "public", forks: 3100, open_issues: 95, watchers: 12000, default_branch: "main", owner: { login: "github-linguist", avatar_url: "https://avatars.githubusercontent.com/u/60648555?v=4" } },
    { id: 2, name: "Spoon-Knife", full_name: "octocat/Spoon-Knife", description: "This repo is for demonstration purposes only.", html_url: "https://github.com/octocat/Spoon-Knife", stargazers_count: 12800, language: "HTML", topics: ["demo"], visibility: "public", forks: 142700, open_issues: 10, watchers: 12800, default_branch: "main", owner: { login: "octocat", avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4" } },
    { id: 3, name: "Hello-World", full_name: "octocat/Hello-World", description: "My first repository on GitHub!", html_url: "https://github.com/octocat/Hello-World", stargazers_count: 2700, language: "C", topics: ["hello-world"], visibility: "public", forks: 3100, open_issues: 536, watchers: 2700, default_branch: "master", owner: { login: "octocat", avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4" } },
  ],
  repos_url: [
    { id: 1, name: "Hello-World", full_name: "octocat/Hello-World", description: "My first repository on GitHub!", html_url: "https://github.com/octocat/Hello-World", stargazers_count: 2700, language: "C", topics: ["hello-world"], visibility: "public", forks: 3100, open_issues: 536, watchers: 2700, default_branch: "master", owner: { login: "octocat", avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4" } },
    { id: 2, name: "Spoon-Knife", full_name: "octocat/Spoon-Knife", description: "This repo is for demonstration purposes only.", html_url: "https://github.com/octocat/Spoon-Knife", stargazers_count: 12800, language: "HTML", topics: ["demo"], visibility: "public", forks: 142700, open_issues: 10, watchers: 12800, default_branch: "main", owner: { login: "octocat", avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4" } },
    { id: 3, name: "git-consortium", full_name: "octocat/git-consortium", description: "This repo is for demonstration purposes only.", html_url: "https://github.com/octocat/git-consortium", stargazers_count: 200, language: "Ruby", topics: [], visibility: "public", forks: 20, open_issues: 2, watchers: 200, default_branch: "master", owner: { login: "octocat", avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4" } },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (n) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

const langColor = {
  JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3572A5",
  Ruby: "#CC342D", Go: "#00ADD8", Rust: "#dea584", Java: "#b07219",
  C: "#555555", "C++": "#f34b7d", HTML: "#e34c26", CSS: "#563d7c",
  Swift: "#F05138", Kotlin: "#A97BFF", Dart: "#00B4AB",
};

const getLangColor = (lang) => langColor[lang] || "#8b8b8b";

const since = (dateStr) => {
  const d = new Date(dateStr);
  return d.getFullYear();
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function Avatar({ src, alt, size = 96 }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full object-cover ring-2 ring-[#e8e0d4]"
      style={{ width: size, height: size }}
    />
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f0ebe3] text-[#6b5e4e] border border-[#e0d5c7]">
      {children}
    </span>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="flex flex-col items-center py-4 px-6 rounded-2xl bg-[#faf8f5] border border-[#ede8e0]">
      <span className="text-2xl font-semibold text-[#2d2620] tracking-tight">{fmt(value)}</span>
      <span className="text-xs text-[#9c8f82] mt-0.5 tracking-wide uppercase font-medium">{label}</span>
    </div>
  );
}

function RepoCard({ repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 p-5 rounded-2xl bg-[#faf8f5] border border-[#ede8e0] hover:border-[#c9bfb2] hover:bg-[#f5f0e8] transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold text-[#2d2620] text-sm group-hover:text-[#8b5e3c] transition-colors truncate">
          {repo.name}
        </span>
        <svg className="w-3.5 h-3.5 text-[#b5a99a] flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
      {repo.description && (
        <p className="text-xs text-[#9c8f82] leading-relaxed line-clamp-2">{repo.description}</p>
      )}
      <div className="flex items-center gap-3 mt-auto pt-1">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-xs text-[#7a6e65]">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: getLangColor(repo.language) }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs text-[#9c8f82]">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          {fmt(repo.stargazers_count)}
        </span>
        <span className="flex items-center gap-1 text-xs text-[#9c8f82]">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {fmt(repo.forks)}
        </span>
      </div>
    </a>
  );
}

function FollowerPill({ user }) {
  return (
    <a
      href={user.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#faf8f5] border border-[#ede8e0] hover:border-[#c9bfb2] transition-all duration-200"
    >
      <img src={user.avatar_url} alt={user.login} className="w-6 h-6 rounded-full" />
      <span className="text-xs text-[#6b5e4e] font-medium">{user.login}</span>
    </a>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-xs uppercase tracking-[0.15em] font-semibold text-[#b5a99a]">{children}</span>
      <div className="flex-1 h-px bg-[#ede8e0]" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GitHubPortfolio({ user = DEMO_USER }) {
  const [activeTab, setActiveTab] = useState("repos");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const repos = Array.isArray(user.repos_url) ? user.repos_url : [];
  const starred = Array.isArray(user.starred_url) ? user.starred_url : [];
  const followers = Array.isArray(user.followers_url) ? user.followers_url : [];

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background: "linear-gradient(135deg, #fdf9f4 0%, #f7f0e6 50%, #fdf9f4 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Subtle grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-2xl mx-auto px-6 py-16">
        {/* ── Hero ── */}
        <div
          className="mb-14"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="flex items-start gap-5 mb-6">
            <Avatar src={user.avatar_url} alt={user.name || user.login} size={72} />
            <div className="flex-1 min-w-0 pt-1">
              <h1
                className="text-2xl font-semibold text-[#1e1712] tracking-tight mb-0.5"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {user.name || user.login}
              </h1>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#9c8f82] hover:text-[#8b5e3c] transition-colors"
              >
                @{user.login}
              </a>
            </div>
          </div>

          {user.bio && (
            <p className="text-[#4a3f37] leading-relaxed text-[15px] mb-5" style={{ fontFamily: "'Georgia', serif" }}>
              {user.bio}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-5">
            {user.location && (
              <span className="flex items-center gap-1.5 text-sm text-[#9c8f82]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {user.location}
              </span>
            )}
            {user.company && (
              <span className="flex items-center gap-1.5 text-sm text-[#9c8f82]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {user.company}
              </span>
            )}
            {user.blog && (
              <a
                href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-[#9c8f82] hover:text-[#8b5e3c] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {user.blog.replace(/^https?:\/\//, "")}
              </a>
            )}
            {user.twitter_username && (
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-[#9c8f82] hover:text-[#8b5e3c] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @{user.twitter_username}
              </a>
            )}
            <span className="flex items-center gap-1.5 text-sm text-[#9c8f82]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Member since {since(user.created_at)}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Repos" value={user.public_repos} />
            <StatCard label="Followers" value={user.followers} />
            <StatCard label="Following" value={user.following} />
          </div>
        </div>

        {/* ── Followers ── */}
        {followers.length > 0 && (
          <div
            className="mb-14"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <SectionLabel>Notable followers</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {followers.map((f) => (
                <FollowerPill key={f.login} user={f} />
              ))}
            </div>
          </div>
        )}

        {/* ── Repos / Starred tabs ── */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          {/* Tab switcher */}
          <div className="flex items-center gap-1 mb-6 p-1 bg-[#f0ebe3] rounded-xl w-fit border border-[#e5ddd2]">
            {[
              { id: "repos", label: "Repositories", count: repos.length },
              { id: "starred", label: "Starred", count: starred.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-[#2d2620] shadow-sm border border-[#e0d5c7]"
                    : "text-[#9c8f82] hover:text-[#4a3f37]"
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 text-xs ${activeTab === tab.id ? "text-[#9c8f82]" : "text-[#b5a99a]"}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {(activeTab === "repos" ? repos : starred).map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-16 pt-8 border-t border-[#ede8e0] flex items-center justify-between">
          <span className="text-xs text-[#c4b8ab]">
            Built with GitHub API
          </span>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-[#9c8f82] hover:text-[#2d2620] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}