"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./styles.css"
/* ─────────────────────────────────────────────────────────────────────────── */
/*  TYPES  (derived from JSON Schema)                                          */
/* ─────────────────────────────────────────────────────────────────────────── */

interface GithubUser {
  login:           string;
  id:              number;
  node_id:         string;
  avatar_url:      string;
  gravatar_id:     string;
  url:             string;
  html_url:        string;
  followers_url:   GithubFollower[];
  following_url:   GithubFollower[];
  starred_url:     GithubRepo[];
  subscriptions_url: GithubRepo[];
  repos_url:       GithubRepo[];
  type:            string;
  user_view_type:  string;
  site_admin:      boolean;
  name:            string;
  company:         string;
  blog:            string;
  location:        string;
  email:           string | null;
  hireable:        boolean | null;
  bio:             string;
  twitter_username: string | null;
  public_repos:    number;
  public_gists:    number;
  followers:       number;
  following:       number;
  created_at:      string;
  updated_at:      string;
}

interface GithubFollower {
  login:               string;
  id:                  number;
  node_id:             string;
  avatar_url:          string;
  gravatar_id:         string;
  url:                 string;
  html_url:            string;
  followers_url:       string;
  following_url:       string;
  gists_url:           string;
  starred_url:         string;
  subscriptions_url:   string;
  organizations_url:   string;
  repos_url:           string;
  events_url:          string;
  received_events_url: string;
  type:                string;
  user_view_type:      string;
  site_admin:          boolean;
}

interface GithubRepo {
  id:                          number;
  node_id:                     string;
  name:                        string;
  full_name:                   string;
  private:                     boolean;
  owner:                       GithubRepoOwner;
  html_url:                    string;
  description:                 string | null;
  fork:                        boolean;
  url:                         string;
  forks_url:                   string;
  keys_url:                    string;
  collaborators_url:           string;
  teams_url:                   string;
  hooks_url:                   string;
  issue_events_url:            string;
  events_url:                  string;
  assignees_url:               string;
  branches_url:                string;
  tags_url:                    string;
  blobs_url:                   string;
  git_tags_url:                string;
  git_refs_url:                string;
  trees_url:                   string;
  statuses_url:                string;
  languages_url:               string;
  stargazers_url:              string;
  contributors_url:            string;
  subscribers_url:             string;
  subscription_url:            string;
  commits_url:                 string;
  git_commits_url:             string;
  comments_url:                string;
  issue_comment_url:           string;
  contents_url:                string;
  compare_url:                 string;
  merges_url:                  string;
  archive_url:                 string;
  downloads_url:               string;
  issues_url:                  string;
  pulls_url:                   string;
  milestones_url:              string;
  notifications_url:           string;
  labels_url:                  string;
  releases_url:                string;
  deployments_url:             string;
  created_at:                  string;
  updated_at:                  string;
  pushed_at:                   string;
  git_url:                     string;
  ssh_url:                     string;
  clone_url:                   string;
  svn_url:                     string;
  homepage:                    string | null;
  size:                        number;
  stargazers_count:            number;
  watchers_count:              number;
  language:                    string | null;
  has_issues:                  boolean;
  has_projects:                boolean;
  has_downloads:               boolean;
  has_wiki:                    boolean;
  has_pages:                   boolean;
  has_discussions:             boolean;
  forks_count:                 number;
  mirror_url:                  null;
  archived:                    boolean;
  disabled:                    boolean;
  open_issues_count:           number;
  license:                     GithubLicense | null;
  allow_forking:               boolean;
  is_template:                 boolean;
  web_commit_signoff_required: boolean;
  has_pull_requests:           boolean;
  pull_request_creation_policy: string;
  topics:                      string[];
  visibility:                  string;
  forks:                       number;
  open_issues:                 number;
  watchers:                    number;
  default_branch:              string;
}

interface GithubRepoOwner {
  login:               string;
  id:                  number;
  node_id:             string;
  avatar_url:          string;
  gravatar_id:         string;
  url:                 string;
  html_url:            string;
  followers_url:       string;
  following_url:       string;
  gists_url:           string;
  starred_url:         string;
  subscriptions_url:   string;
  organizations_url:   string;
  repos_url:           string;
  events_url:          string;
  received_events_url: string;
  type:                string;
  user_view_type:      string;
  site_admin:          boolean;
}

interface GithubLicense {
  key:     string;
  name:    string;
  spdx_id: string;
  url:     string;
  node_id: string;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  PROPS                                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

interface PortfolioPageProps {
  user: GithubUser;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  CONSTANTS                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */

const LANG_COLOR: Record<string, string> = {
  JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3572A5",
  Ruby: "#CC342D", Go: "#00ADD8", Rust: "#dea584", Java: "#b07219",
  C: "#555555", "C++": "#f34b7d", HTML: "#e34c26", CSS: "#563d7c",
  Vue: "#41b883", Svelte: "#ff3e00", Shell: "#89e051", Kotlin: "#A97BFF",
};

const SKILL_ICONS: Record<string, string> = {
  "React": "⚛", "Next.js": "▲", "TypeScript": "TS", "JavaScript": "JS",
  "Node.js": "⬡", "Tailwind": "◈", "Git": "⎇", "Docker": "🐳",
  "PostgreSQL": "🐘", "Python": "🐍", "Figma": "◉", "GraphQL": "◇",
};

const NAV_LINKS = [
  { href: "#about",    label: "About"    },
  { href: "#projects", label: "Projects" },
  { href: "#network",  label: "Network"  },
  { href: "#contact",  label: "Contact"  },
];

const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
const yr  = (d: string) => new Date(d).getFullYear();

/* ─────────────────────────────────────────────────────────────────────────── */
/*  DEMO DATA (used when no prop is passed)                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

const DEMO_USER: GithubUser = {
  login: "vmaspad", id: 1, node_id: "", avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
  gravatar_id: "", url: "", html_url: "https://github.com/vmaspad",
  followers_url: [
    { login:"torvalds", id:1, node_id:"", avatar_url:"https://avatars.githubusercontent.com/u/1024025?v=4", gravatar_id:"", url:"", html_url:"https://github.com/torvalds", followers_url:"", following_url:"", gists_url:"", starred_url:"", subscriptions_url:"", organizations_url:"", repos_url:"", events_url:"", received_events_url:"", type:"User", user_view_type:"public", site_admin:false },
    { login:"gaearon",  id:2, node_id:"", avatar_url:"https://avatars.githubusercontent.com/u/810438?v=4",  gravatar_id:"", url:"", html_url:"https://github.com/gaearon",  followers_url:"", following_url:"", gists_url:"", starred_url:"", subscriptions_url:"", organizations_url:"", repos_url:"", events_url:"", received_events_url:"", type:"User", user_view_type:"public", site_admin:false },
  ],
  following_url: [],
  starred_url:   [],
  subscriptions_url: [],
  repos_url: [
    { id:1, node_id:"", name:"gitfolio", full_name:"vmaspad/gitfolio", private:false, owner:{ login:"vmaspad", id:1, node_id:"", avatar_url:"", gravatar_id:"", url:"", html_url:"", followers_url:"", following_url:"", gists_url:"", starred_url:"", subscriptions_url:"", organizations_url:"", repos_url:"", events_url:"", received_events_url:"", type:"User", user_view_type:"public", site_admin:false }, html_url:"https://github.com/vmaspad/gitfolio", description:"Instant developer portfolios powered by GitHub API", fork:false, url:"", forks_url:"", keys_url:"", collaborators_url:"", teams_url:"", hooks_url:"", issue_events_url:"", events_url:"", assignees_url:"", branches_url:"", tags_url:"", blobs_url:"", git_tags_url:"", git_refs_url:"", trees_url:"", statuses_url:"", languages_url:"", stargazers_url:"", contributors_url:"", subscribers_url:"", subscription_url:"", commits_url:"", git_commits_url:"", comments_url:"", issue_comment_url:"", contents_url:"", compare_url:"", merges_url:"", archive_url:"", downloads_url:"", issues_url:"", pulls_url:"", milestones_url:"", notifications_url:"", labels_url:"", releases_url:"", deployments_url:"", created_at:"2024-01-01", updated_at:"2024-03-01", pushed_at:"2024-03-01", git_url:"", ssh_url:"", clone_url:"", svn_url:"", homepage:"https://gitfolio.dev", size:1200, stargazers_count:842, watchers_count:842, language:"TypeScript", has_issues:true, has_projects:false, has_downloads:true, has_wiki:false, has_pages:false, has_discussions:false, forks_count:93, mirror_url:null, archived:false, disabled:false, open_issues_count:4, license:{key:"mit",name:"MIT License",spdx_id:"MIT",url:"",node_id:""}, allow_forking:true, is_template:false, web_commit_signoff_required:false, has_pull_requests:true, pull_request_creation_policy:"member_or_owner", topics:["nextjs","tailwind","github-api","portfolio"], visibility:"public", forks:93, open_issues:4, watchers:842, default_branch:"main" },
    { id:2, node_id:"", name:"ui-components", full_name:"vmaspad/ui-components", private:false, owner:{ login:"vmaspad", id:1, node_id:"", avatar_url:"", gravatar_id:"", url:"", html_url:"", followers_url:"", following_url:"", gists_url:"", starred_url:"", subscriptions_url:"", organizations_url:"", repos_url:"", events_url:"", received_events_url:"", type:"User", user_view_type:"public", site_admin:false }, html_url:"https://github.com/vmaspad/ui-components", description:"Open-source React component library with dark mode and token-based theming", fork:false, url:"", forks_url:"", keys_url:"", collaborators_url:"", teams_url:"", hooks_url:"", issue_events_url:"", events_url:"", assignees_url:"", branches_url:"", tags_url:"", blobs_url:"", git_tags_url:"", git_refs_url:"", trees_url:"", statuses_url:"", languages_url:"", stargazers_url:"", contributors_url:"", subscribers_url:"", subscription_url:"", commits_url:"", git_commits_url:"", comments_url:"", issue_comment_url:"", contents_url:"", compare_url:"", merges_url:"", archive_url:"", downloads_url:"", issues_url:"", pulls_url:"", milestones_url:"", notifications_url:"", labels_url:"", releases_url:"", deployments_url:"", created_at:"2023-06-01", updated_at:"2024-02-01", pushed_at:"2024-02-01", git_url:"", ssh_url:"", clone_url:"", svn_url:"", homepage:null, size:880, stargazers_count:319, watchers_count:319, language:"TypeScript", has_issues:true, has_projects:false, has_downloads:true, has_wiki:false, has_pages:false, has_discussions:false, forks_count:41, mirror_url:null, archived:false, disabled:false, open_issues_count:2, license:{key:"mit",name:"MIT License",spdx_id:"MIT",url:"",node_id:""}, allow_forking:true, is_template:false, web_commit_signoff_required:false, has_pull_requests:true, pull_request_creation_policy:"member_or_owner", topics:["react","tailwind","components","design-system"], visibility:"public", forks:41, open_issues:2, watchers:319, default_branch:"main" },
    { id:3, node_id:"", name:"cli-toolkit", full_name:"vmaspad/cli-toolkit", private:false, owner:{ login:"vmaspad", id:1, node_id:"", avatar_url:"", gravatar_id:"", url:"", html_url:"", followers_url:"", following_url:"", gists_url:"", starred_url:"", subscriptions_url:"", organizations_url:"", repos_url:"", events_url:"", received_events_url:"", type:"User", user_view_type:"public", site_admin:false }, html_url:"https://github.com/vmaspad/cli-toolkit", description:"Developer CLI utilities for scaffolding, code gen and local tooling", fork:false, url:"", forks_url:"", keys_url:"", collaborators_url:"", teams_url:"", hooks_url:"", issue_events_url:"", events_url:"", assignees_url:"", branches_url:"", tags_url:"", blobs_url:"", git_tags_url:"", git_refs_url:"", trees_url:"", statuses_url:"", languages_url:"", stargazers_url:"", contributors_url:"", subscribers_url:"", subscription_url:"", commits_url:"", git_commits_url:"", comments_url:"", issue_comment_url:"", contents_url:"", compare_url:"", merges_url:"", archive_url:"", downloads_url:"", issues_url:"", pulls_url:"", milestones_url:"", notifications_url:"", labels_url:"", releases_url:"", deployments_url:"", created_at:"2023-01-01", updated_at:"2024-01-01", pushed_at:"2024-01-01", git_url:"", ssh_url:"", clone_url:"", svn_url:"", homepage:null, size:420, stargazers_count:127, watchers_count:127, language:"Go", has_issues:true, has_projects:false, has_downloads:true, has_wiki:false, has_pages:false, has_discussions:false, forks_count:18, mirror_url:null, archived:false, disabled:false, open_issues_count:1, license:{key:"mit",name:"MIT License",spdx_id:"MIT",url:"",node_id:""}, allow_forking:true, is_template:false, web_commit_signoff_required:false, has_pull_requests:true, pull_request_creation_policy:"member_or_owner", topics:["go","cli","devtools"], visibility:"public", forks:18, open_issues:1, watchers:127, default_branch:"main" },
  ],
  type: "User", user_view_type: "public", site_admin: false,
  name: "Valentín Maspad", company: "@gitfolio-dev",
  blog: "https://gitfolio.dev", location: "Buenos Aires, AR",
  email: "hi@vmaspad.dev", hireable: true,
  bio: "Frontend developer & open-source builder. I craft interfaces that feel inevitable — obsessed with performance, accessibility and the craft of design systems.",
  twitter_username: "vmaspad",
  public_repos: 24, public_gists: 6,
  followers: 1240, following: 89,
  created_at: "2019-03-12T10:00:00Z",
  updated_at: "2024-03-15T10:00:00Z",
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  REUSABLE ATOMS                                                             */
/* ─────────────────────────────────────────────────────────────────────────── */

function Badge({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded tracking-wider uppercase
        ${accent
          ? "bg-primary/15 text-primary border border-primary/30"
          : "bg-muted text-muted-foreground border border-border"
        }`}
      style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ label, id }: { label: string; id?: string }) {
  return (
    <div className="flex items-center gap-4 mb-10" id={id}>
      <h2
        className="text-2xl font-bold uppercase tracking-tight text-foreground whitespace-nowrap"
        style={{ fontFamily: "var(--font-sans, 'Chakra Petch', sans-serif)" }}
      >
        {label}
      </h2>
      <div className="flex-1 h-px bg-border" />
      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-4 py-3 bg-card border border-border rounded">
      <span
        className="text-xl font-bold text-foreground leading-none"
        style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
      >
        {value}
      </span>
      <span
        className="text-[10px] uppercase tracking-widest text-muted-foreground"
        style={{ fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  PROJECT CARD                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

function ProjectCard({ repo }: { repo: GithubRepo }) {
  const langColor = repo.language ? (LANG_COLOR[repo.language] ?? "#888") : null;

  return (
    <article className="group flex flex-col bg-card border border-border rounded overflow-hidden hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      {/* Top color bar */}
      <div
        className="h-0.5 w-full transition-all duration-300 group-hover:h-1"
        style={{ background: langColor ?? "var(--primary)" }}
      />

      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p
              className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {repo.owner.login}
            </p>
            <h3
              className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {repo.name}
            </h3>
          </div>
          {repo.archived && (
            <Badge>Archived</Badge>
          )}
        </div>

        {/* Description */}
        <p
          className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {repo.description ?? "No description provided."}
        </p>

        {/* Topics */}
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 4).map(t => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 pt-3 border-t border-border">
          {repo.language && (
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: langColor ?? "#888" }} />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground ml-auto" style={{ fontFamily: "var(--font-mono)" }}>
            ★ {fmt(repo.stargazers_count)}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
            ⑂ {fmt(repo.forks_count)}
          </span>
          {repo.license && (
            <Badge>{repo.license.spdx_id}</Badge>
          )}
        </div>

        {/* CTAs */}
        <div className="flex gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-[10px] font-semibold uppercase tracking-wider py-2 rounded border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200 no-underline"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Repository ↗
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-[10px] font-semibold uppercase tracking-wider py-2 rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity no-underline"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MAIN COMPONENT                                                             */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function PortfolioPage({ user = DEMO_USER }: PortfolioPageProps) {
  const [dark, setDark]           = useState(true);
  const [mounted, setMounted]     = useState(false);
  const [navScrolled, setNav]     = useState(false);
  const [showAll, setShowAll]     = useState(false);
  const heroRef                   = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setNav(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const repos         = user.repos_url      ?? [];
  const followers     = user.followers_url  ?? [];
  const visibleRepos  = showAll ? repos : repos.slice(0, 6);
  const emailSubject  = encodeURIComponent("Propuesta de Colaboración / Work Opportunity");

  const skills = Array.from(
    new Set([
      ...(repos.flatMap(r => r.language ? [r.language] : [])),
      "React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Git",
    ])
  ).slice(0, 12);

  /* Global font import injected once */
  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500;600&display=swap');
    :root {
      --font-sans: 'Chakra Petch', ui-sans-serif, sans-serif;
      --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
    }
    html { scroll-behavior: smooth; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes pulse  { 0%,100% { opacity:1; } 50% { opacity:.4; } }
    .fu  { animation: fadeUp .6s ease both; }
    .d1  { animation-delay:.05s; } .d2 { animation-delay:.12s; }
    .d3  { animation-delay:.19s; } .d4 { animation-delay:.26s; }
    .d5  { animation-delay:.34s; } .d6 { animation-delay:.42s; }
    .blink { animation: pulse 2.4s ease-in-out infinite; }

    
  `;

  return (
    <div className={dark ? "dark" : ""}>
      <style>{fontStyle}</style>

      {/* ─────────────────────────────────────── Root wrapper */}
      <div
        className="min-h-screen bg-background text-foreground transition-colors duration-300"
        style={{ fontFamily: "var(--font-sans)" }}
      >

        {/* ═══════════════════════════════════════ NAV */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
            ${navScrolled
              ? "border-b border-border bg-background/80 backdrop-blur-md shadow-sm"
              : "bg-transparent"
            }`}
        >
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 no-underline group"
            >
              <span
                className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold bg-primary text-primary-foreground"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {(user.login[0] ?? "?").toUpperCase()}
              </span>
              <span className="font-bold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
                {user.login}
              </span>
            </a>

            {/* Links */}
            <div className="flex items-center gap-1">
              {NAV_LINKS.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  className="hidden sm:block px-3 py-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors no-underline"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {l.label}
                </a>
              ))}
              {/* Dark toggle 
              <button
                onClick={() => setDark(d => !d)}
                className="ml-2 w-8 h-8 rounded flex items-center justify-center text-sm border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all"
                aria-label="Toggle dark mode"
              >
                {dark ? "☀" : "☾"}
              </button>*/}
            </div>
          </div>
        </nav>

        {/* ═══════════════════════════════════════ HERO */}
        <header
          ref={heroRef}
          className="relative min-h-screen flex items-center border-b border-border overflow-hidden"
        >
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(var(--color-border, #e5e7eb) 1px, transparent 1px),
                linear-gradient(90deg, var(--color-border, #e5e7eb) 1px, transparent 1px)
              `,
              backgroundSize: "52px 52px",
            }}
          />

          {/* Warm glow blob */}
          <div
            className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
            style={{
              background: "radial-gradient(ellipse, var(--color-primary, oklch(0.58 0.22 37)) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left — text */}
              <div>
                {mounted && (
                  <>
                    {/* Eyebrow */}
                    <div className="fu d1 flex items-center gap-2 mb-6">
                      <span
                        className="blink inline-block w-2 h-2 rounded-full bg-primary"
                        style={{ boxShadow: "0 0 8px var(--color-primary)" }}
                      />
                      <span
                        className="text-[10px] uppercase tracking-[.2em] text-muted-foreground"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {user.hireable ? "Open to opportunities" : "Currently unavailable"} · {user.location}
                      </span>
                    </div>

                    {/* Name */}
                    <h1
                      className="fu d2 font-bold leading-none tracking-tighter text-foreground mb-3"
                      style={{ fontSize: "clamp(38px, 6vw, 76px)", fontFamily: "var(--font-sans)" }}
                    >
                      {user.name ?? user.login}
                    </h1>

                    {/* Role */}
                    

                    {/* Bio */}
                    <p
                      className="fu d4 text-sm leading-relaxed text-muted-foreground max-w-md mb-8"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {user.bio}
                    </p>

                    {/* CTAs */}
                    <div className="fu d5 flex flex-wrap gap-3 mb-10">
                      <a
                        href="#projects"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity no-underline"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        Ver Proyectos
                        <span>→</span>
                      </a>
                      {user.blog && (
                        <a
                          href={user.blog}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold border border-border text-foreground hover:border-primary hover:text-primary transition-all no-underline"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          Descargar CV ↗
                        </a>
                      )}
                    </div>

                    {/* Stats strip */}
                    <div className="fu d6 flex flex-wrap gap-2">
                      <StatPill label="Repos"     value={user.public_repos} />
                      <StatPill label="Followers" value={user.followers} />
                      <StatPill label="Gists"     value={user.public_gists} />
                      <StatPill label="Since"     value={yr(user.created_at)} />
                    </div>
                  </>
                )}
              </div>

              {/* Right — avatar */}
              {mounted && (
                <div className="fu d3 flex justify-center lg:justify-end">
                  <div className="relative">
                    {/* Ring */}
                    <div
                      className="absolute -inset-1.5 rounded-full opacity-40"
                      style={{ background: "conic-gradient(from 90deg, var(--color-primary), transparent, var(--color-primary))" }}
                    />
                    <div className="relative w-52 h-52 rounded-full overflow-hidden border-4 border-card shadow-2xl">
                      <img
                        src={user.avatar_url}
                        alt={user.name ?? user.login}
                        className="object-cover"
                        sizes="208px"
                      />
                    </div>
                    {/* Floating badge */}
                    <div
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1 shadow-md whitespace-nowrap"
                    >
                      <span className="w-2 h-2 rounded-full bg-green-500 blink" />
                      <span
                        className="text-[10px] font-semibold text-foreground"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        @{user.login}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Diagonal cut bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 bg-background"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
          />
        </header>

        {/* ═══════════════════════════════════════ NETWORK */}
        <section id="network" className="border-b border-border bg-muted/40">
          <div className="max-w-5xl mx-auto px-6 py-5">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
              {/* GitHub */}
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors no-underline group"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>

              {user.twitter_username && (
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors no-underline"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  @{user.twitter_username}
                </a>
              )}

              {user.blog && (
                <a
                  href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors no-underline"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                  {user.blog.replace(/^https?:\/\//, "")}
                </a>
              )}

              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors no-underline"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  {user.email}
                </a>
              )}

              {user.company && (
                <span className="flex items-center gap-2 text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                  <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"/></svg>
                  {user.company}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ ABOUT */}
        <section id="about" className="border-b border-border">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <SectionTitle label="About" id="about-title" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Bio */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
                    <img
                      src={user.avatar_url}
                      alt={user.name ?? user.login}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground" style={{ fontFamily: "var(--font-sans)" }}>
                      {user.name ?? user.login}
                    </p>
                    <p className="text-[11px] text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                      {user.location}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                  {user.bio}
                </p>

                {/* Mini stats */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ["Public repos",  user.public_repos],
                    ["Followers",     user.followers],
                    ["Following",     user.following],
                    ["Member since",  yr(user.created_at)],
                  ].map(([l, v]) => (
                    <div key={String(l)} className="flex flex-col gap-0.5 p-3 bg-muted rounded border border-border">
                      <span className="text-lg font-bold text-foreground leading-none" style={{ fontFamily: "var(--font-mono)" }}>
                        {String(v)}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                        {String(l)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills grid */}
              <div>
                <p
                  className="text-[10px] uppercase tracking-[.15em] text-muted-foreground mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Tech stack
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {skills.map(skill => (
                    <div
                      key={skill}
                      className="flex flex-col items-center gap-1.5 p-3 bg-card border border-border rounded hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 group cursor-default"
                    >
                      <span
                        className="text-base font-bold group-hover:text-primary transition-colors"
                        style={{
                          color: LANG_COLOR[skill] ?? "var(--color-primary)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {SKILL_ICONS[skill] ?? skill.slice(0, 2).toUpperCase()}
                      </span>
                      <span
                        className="text-[9px] text-center text-muted-foreground group-hover:text-foreground transition-colors leading-tight uppercase tracking-wide"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Notable followers */}
                {followers.length > 0 && (
                  <div className="mt-6">
                    <p
                      className="text-[10px] uppercase tracking-[.15em] text-muted-foreground mb-3"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Notable followers
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {followers.slice(0, 6).map(f => (
                        <a
                          key={f.login}
                          href={f.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-card border border-border rounded hover:border-primary/60 transition-all no-underline group"
                        >
                          <img
                            src={f.avatar_url}
                            alt={f.login}
                            width={18}
                            height={18}
                            className="rounded-full grayscale group-hover:grayscale-0 transition-all"
                          />
                          <span
                            className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors"
                            style={{ fontFamily: "var(--font-mono)" }}
                          >
                            {f.login}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ PROJECTS */}
        <section id="projects" className="border-b border-border">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <SectionTitle label="Projects" />

            {repos.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-12" style={{ fontFamily: "var(--font-mono)" }}>
                No public repositories found.
              </p>
            ) : (
              <>
                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleRepos.map(repo => (
                    <ProjectCard key={repo.id} repo={repo} />
                  ))}
                </div>

                {/* Show more */}
                {repos.length > 6 && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => setShowAll(s => !s)}
                      className="px-6 py-2.5 rounded text-sm font-semibold border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {showAll ? "Show less ↑" : `Show all ${repos.length} repositories ↓`}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════ CONTACT */}
        <section id="contact" className="border-b border-border">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="max-w-xl mx-auto text-center">
              {/* Ambient glow */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, var(--color-primary, oklch(0.58 0.22 37)) 0%, transparent 70%)",
                  filter: "blur(80px)",
                  opacity: 0.08,
                }}
              />

              <div className="relative z-10">
                <div
                  className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10"
                >
                  <span className="blink w-1.5 h-1.5 rounded-full bg-primary" />
                  <span
                    className="text-[10px] uppercase tracking-widest text-primary"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Available for work
                  </span>
                </div>

                <h2
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Let's build something
                  <br />
                  <span className="text-primary">worth shipping.</span>
                </h2>

                <p
                  className="text-sm text-muted-foreground leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Whether it's a full product, a component library or an open-source idea — I'm always interested in collaborating on meaningful work.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`mailto:${user.email ?? `hi@${user.login}.dev`}?subject=${emailSubject}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity no-underline"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    Send Email
                  </a>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm border border-border text-foreground hover:border-primary hover:text-primary transition-all no-underline"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    View GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ FOOTER */}
        <footer className="border-t border-border">
          <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold bg-primary text-primary-foreground"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {(user.login[0] ?? "?").toUpperCase()}
              </span>
              <span
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                © {new Date().getFullYear()} {user.name ?? user.login}. All rights reserved.
              </span>
            </div>

            {/* Repeat network links */}
            <div className="flex items-center gap-4">
              {[
                { href: user.html_url,                                   label: "GitHub" },
                user.twitter_username ? { href: `https://twitter.com/${user.twitter_username}`, label: "Twitter" } : null,
                user.blog             ? { href: user.blog.startsWith("http") ? user.blog : `https://${user.blog}`, label: "Web" } : null,
              ].filter(Boolean).map(link => (
                <a
                  key={link!.label}
                  href={link!.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors no-underline"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {link!.label}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}