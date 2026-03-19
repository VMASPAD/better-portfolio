"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────────────────── */
/*  TYPES                                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

interface GithubLicense { key:string; name:string; spdx_id:string; url:string; node_id:string; }
interface GithubRepoOwner { login:string; id:number; node_id:string; avatar_url:string; gravatar_id:string; url:string; html_url:string; followers_url:string; following_url:string; gists_url:string; starred_url:string; subscriptions_url:string; organizations_url:string; repos_url:string; events_url:string; received_events_url:string; type:string; user_view_type:string; site_admin:boolean; }
interface GithubRepo { id:number; node_id:string; name:string; full_name:string; private:boolean; owner:GithubRepoOwner; html_url:string; description:string|null; fork:boolean; url:string; forks_url:string; keys_url:string; collaborators_url:string; teams_url:string; hooks_url:string; issue_events_url:string; events_url:string; assignees_url:string; branches_url:string; tags_url:string; blobs_url:string; git_tags_url:string; git_refs_url:string; trees_url:string; statuses_url:string; languages_url:string; stargazers_url:string; contributors_url:string; subscribers_url:string; subscription_url:string; commits_url:string; git_commits_url:string; comments_url:string; issue_comment_url:string; contents_url:string; compare_url:string; merges_url:string; archive_url:string; downloads_url:string; issues_url:string; pulls_url:string; milestones_url:string; notifications_url:string; labels_url:string; releases_url:string; deployments_url:string; created_at:string; updated_at:string; pushed_at:string; git_url:string; ssh_url:string; clone_url:string; svn_url:string; homepage:string|null; size:number; stargazers_count:number; watchers_count:number; language:string|null; has_issues:boolean; has_projects:boolean; has_downloads:boolean; has_wiki:boolean; has_pages:boolean; has_discussions:boolean; forks_count:number; mirror_url:null; archived:boolean; disabled:boolean; open_issues_count:number; license:GithubLicense|null; allow_forking:boolean; is_template:boolean; web_commit_signoff_required:boolean; has_pull_requests:boolean; pull_request_creation_policy:string; topics:string[]; visibility:string; forks:number; open_issues:number; watchers:number; default_branch:string; }
interface GithubFollower { login:string; id:number; node_id:string; avatar_url:string; gravatar_id:string; url:string; html_url:string; followers_url:string; following_url:string; gists_url:string; starred_url:string; subscriptions_url:string; organizations_url:string; repos_url:string; events_url:string; received_events_url:string; type:string; user_view_type:string; site_admin:boolean; }
interface GithubUser { login:string; id:number; node_id:string; avatar_url:string; gravatar_id:string; url:string; html_url:string; followers_url:GithubFollower[]; following_url:GithubFollower[]; starred_url:GithubRepo[]; subscriptions_url:GithubRepo[]; repos_url:GithubRepo[]; type:string; user_view_type:string; site_admin:boolean; name:string; company:string; blog:string; location:string; email:string|null; hireable:boolean|null; bio:string; twitter_username:string|null; public_repos:number; public_gists:number; followers:number; following:number; created_at:string; updated_at:string; }

interface Props { user?: GithubUser; }

/* ─────────────────────────────────────────────────────────────────────────── */
/*  DEMO DATA                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */

const DEMO: GithubUser = {
  login:"vmaspad", id:1, node_id:"", gravatar_id:"",
  avatar_url:"https://avatars.githubusercontent.com/u/583231?v=4",
  url:"", html_url:"https://github.com/vmaspad",
  followers_url:[
    {login:"torvalds",id:1,node_id:"",avatar_url:"https://avatars.githubusercontent.com/u/1024025?v=4",gravatar_id:"",url:"",html_url:"https://github.com/torvalds",followers_url:"",following_url:"",gists_url:"",starred_url:"",subscriptions_url:"",organizations_url:"",repos_url:"",events_url:"",received_events_url:"",type:"User",user_view_type:"public",site_admin:false},
    {login:"gaearon",id:2,node_id:"",avatar_url:"https://avatars.githubusercontent.com/u/810438?v=4",gravatar_id:"",url:"",html_url:"https://github.com/gaearon",followers_url:"",following_url:"",gists_url:"",starred_url:"",subscriptions_url:"",organizations_url:"",repos_url:"",events_url:"",received_events_url:"",type:"User",user_view_type:"public",site_admin:false},
    {login:"sindresorhus",id:3,node_id:"",avatar_url:"https://avatars.githubusercontent.com/u/170270?v=4",gravatar_id:"",url:"",html_url:"https://github.com/sindresorhus",followers_url:"",following_url:"",gists_url:"",starred_url:"",subscriptions_url:"",organizations_url:"",repos_url:"",events_url:"",received_events_url:"",type:"User",user_view_type:"public",site_admin:false},
  ],
  following_url:[], starred_url:[], subscriptions_url:[],
  repos_url:[
    {id:1,node_id:"",name:"gitfolio",full_name:"vmaspad/gitfolio",private:false,owner:{login:"vmaspad",id:1,node_id:"",avatar_url:"",gravatar_id:"",url:"",html_url:"",followers_url:"",following_url:"",gists_url:"",starred_url:"",subscriptions_url:"",organizations_url:"",repos_url:"",events_url:"",received_events_url:"",type:"User",user_view_type:"public",site_admin:false},html_url:"https://github.com/vmaspad/gitfolio",description:"Instant developer portfolios powered by GitHub. 4 layouts, dark mode, MIT.",fork:false,url:"",forks_url:"",keys_url:"",collaborators_url:"",teams_url:"",hooks_url:"",issue_events_url:"",events_url:"",assignees_url:"",branches_url:"",tags_url:"",blobs_url:"",git_tags_url:"",git_refs_url:"",trees_url:"",statuses_url:"",languages_url:"",stargazers_url:"",contributors_url:"",subscribers_url:"",subscription_url:"",commits_url:"",git_commits_url:"",comments_url:"",issue_comment_url:"",contents_url:"",compare_url:"",merges_url:"",archive_url:"",downloads_url:"",issues_url:"",pulls_url:"",milestones_url:"",notifications_url:"",labels_url:"",releases_url:"",deployments_url:"",created_at:"2024-01-01",updated_at:"2024-03-15",pushed_at:"2024-03-15",git_url:"",ssh_url:"",clone_url:"",svn_url:"",homepage:"https://gitfolio.dev",size:1200,stargazers_count:842,watchers_count:842,language:"TypeScript",has_issues:true,has_projects:false,has_downloads:true,has_wiki:false,has_pages:false,has_discussions:false,forks_count:93,mirror_url:null,archived:false,disabled:false,open_issues_count:4,license:{key:"mit",name:"MIT License",spdx_id:"MIT",url:"",node_id:""},allow_forking:true,is_template:false,web_commit_signoff_required:false,has_pull_requests:true,pull_request_creation_policy:"member_or_owner",topics:["nextjs","tailwind","github-api","portfolio"],visibility:"public",forks:93,open_issues:4,watchers:842,default_branch:"main"},
    {id:2,node_id:"",name:"ui-components",full_name:"vmaspad/ui-components",private:false,owner:{login:"vmaspad",id:1,node_id:"",avatar_url:"",gravatar_id:"",url:"",html_url:"",followers_url:"",following_url:"",gists_url:"",starred_url:"",subscriptions_url:"",organizations_url:"",repos_url:"",events_url:"",received_events_url:"",type:"User",user_view_type:"public",site_admin:false},html_url:"https://github.com/vmaspad/ui-components",description:"Open-source React component library with dark mode and token-based theming",fork:false,url:"",forks_url:"",keys_url:"",collaborators_url:"",teams_url:"",hooks_url:"",issue_events_url:"",events_url:"",assignees_url:"",branches_url:"",tags_url:"",blobs_url:"",git_tags_url:"",git_refs_url:"",trees_url:"",statuses_url:"",languages_url:"",stargazers_url:"",contributors_url:"",subscribers_url:"",subscription_url:"",commits_url:"",git_commits_url:"",comments_url:"",issue_comment_url:"",contents_url:"",compare_url:"",merges_url:"",archive_url:"",downloads_url:"",issues_url:"",pulls_url:"",milestones_url:"",notifications_url:"",labels_url:"",releases_url:"",deployments_url:"",created_at:"2023-06-01",updated_at:"2024-02-01",pushed_at:"2024-02-01",git_url:"",ssh_url:"",clone_url:"",svn_url:"",homepage:null,size:880,stargazers_count:319,watchers_count:319,language:"TypeScript",has_issues:true,has_projects:false,has_downloads:true,has_wiki:false,has_pages:false,has_discussions:false,forks_count:41,mirror_url:null,archived:false,disabled:false,open_issues_count:2,license:{key:"mit",name:"MIT License",spdx_id:"MIT",url:"",node_id:""},allow_forking:true,is_template:false,web_commit_signoff_required:false,has_pull_requests:true,pull_request_creation_policy:"member_or_owner",topics:["react","tailwind","design-system"],visibility:"public",forks:41,open_issues:2,watchers:319,default_branch:"main"},
    {id:3,node_id:"",name:"cli-toolkit",full_name:"vmaspad/cli-toolkit",private:false,owner:{login:"vmaspad",id:1,node_id:"",avatar_url:"",gravatar_id:"",url:"",html_url:"",followers_url:"",following_url:"",gists_url:"",starred_url:"",subscriptions_url:"",organizations_url:"",repos_url:"",events_url:"",received_events_url:"",type:"User",user_view_type:"public",site_admin:false},html_url:"https://github.com/vmaspad/cli-toolkit",description:"Developer CLI utilities for scaffolding, code generation and local tooling automation",fork:false,url:"",forks_url:"",keys_url:"",collaborators_url:"",teams_url:"",hooks_url:"",issue_events_url:"",events_url:"",assignees_url:"",branches_url:"",tags_url:"",blobs_url:"",git_tags_url:"",git_refs_url:"",trees_url:"",statuses_url:"",languages_url:"",stargazers_url:"",contributors_url:"",subscribers_url:"",subscription_url:"",commits_url:"",git_commits_url:"",comments_url:"",issue_comment_url:"",contents_url:"",compare_url:"",merges_url:"",archive_url:"",downloads_url:"",issues_url:"",pulls_url:"",milestones_url:"",notifications_url:"",labels_url:"",releases_url:"",deployments_url:"",created_at:"2023-01-01",updated_at:"2024-01-01",pushed_at:"2024-01-01",git_url:"",ssh_url:"",clone_url:"",svn_url:"",homepage:null,size:420,stargazers_count:127,watchers_count:127,language:"Go",has_issues:true,has_projects:false,has_downloads:true,has_wiki:false,has_pages:false,has_discussions:false,forks_count:18,mirror_url:null,archived:false,disabled:false,open_issues_count:1,license:{key:"mit",name:"MIT License",spdx_id:"MIT",url:"",node_id:""},allow_forking:true,is_template:false,web_commit_signoff_required:false,has_pull_requests:true,pull_request_creation_policy:"member_or_owner",topics:["go","cli","devtools"],visibility:"public",forks:18,open_issues:1,watchers:127,default_branch:"main"},
    {id:4,node_id:"",name:"design-tokens",full_name:"vmaspad/design-tokens",private:false,owner:{login:"vmaspad",id:1,node_id:"",avatar_url:"",gravatar_id:"",url:"",html_url:"",followers_url:"",following_url:"",gists_url:"",starred_url:"",subscriptions_url:"",organizations_url:"",repos_url:"",events_url:"",received_events_url:"",type:"User",user_view_type:"public",site_admin:false},html_url:"https://github.com/vmaspad/design-tokens",description:"CSS custom properties design token system with oklch color science and Tailwind integration",fork:false,url:"",forks_url:"",keys_url:"",collaborators_url:"",teams_url:"",hooks_url:"",issue_events_url:"",events_url:"",assignees_url:"",branches_url:"",tags_url:"",blobs_url:"",git_tags_url:"",git_refs_url:"",trees_url:"",statuses_url:"",languages_url:"",stargazers_url:"",contributors_url:"",subscribers_url:"",subscription_url:"",commits_url:"",git_commits_url:"",comments_url:"",issue_comment_url:"",contents_url:"",compare_url:"",merges_url:"",archive_url:"",downloads_url:"",issues_url:"",pulls_url:"",milestones_url:"",notifications_url:"",labels_url:"",releases_url:"",deployments_url:"",created_at:"2022-09-01",updated_at:"2024-01-01",pushed_at:"2024-01-01",git_url:"",ssh_url:"",clone_url:"",svn_url:"",homepage:null,size:280,stargazers_count:76,watchers_count:76,language:"CSS",has_issues:true,has_projects:false,has_downloads:true,has_wiki:false,has_pages:false,has_discussions:false,forks_count:9,mirror_url:null,archived:false,disabled:false,open_issues_count:0,license:{key:"mit",name:"MIT License",spdx_id:"MIT",url:"",node_id:""},allow_forking:true,is_template:false,web_commit_signoff_required:false,has_pull_requests:true,pull_request_creation_policy:"member_or_owner",topics:["css","design-tokens","tailwind"],visibility:"public",forks:9,open_issues:0,watchers:76,default_branch:"main"},
  ],
  type:"User", user_view_type:"public", site_admin:false,
  name:"Valentín Maspad", company:"@gitfolio-dev",
  blog:"https://gitfolio.dev", location:"Buenos Aires, AR",
  email:"hi@vmaspad.dev", hireable:true,
  bio:"Frontend developer & open-source builder. I craft interfaces that feel inevitable.",
  twitter_username:"vmaspad",
  public_repos:24, public_gists:6,
  followers:1240, following:89,
  created_at:"2019-03-12T10:00:00Z",
  updated_at:"2024-03-15T10:00:00Z",
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  CONSTANTS                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */

const LANG_DOT: Record<string,string> = {
  TypeScript:"#3178c6", JavaScript:"#f7df1e", Python:"#3572A5",
  Ruby:"#CC342D", Go:"#00ADD8", Rust:"#dea584", CSS:"#563d7c",
  HTML:"#e34c26", Vue:"#41b883", Svelte:"#ff3e00", Java:"#b07219",
};

const STACK = ["React","Next.js","TypeScript","Tailwind CSS","Node.js","Go","PostgreSQL","Docker","Figma","Git","GraphQL","Rust"];
const fmt = (n:number) => n>=1000?`${(n/1000).toFixed(1)}k`:String(n);
const yr  = (d:string) => new Date(d).getFullYear();

/* ─────────────────────────────────────────────────────────────────────────── */
/*  HOOKS                                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target:number, active:boolean, duration=1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const step = (now:number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  ATOMS                                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

function RoseBadge({ children }:{ children:React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wider bg-primary/15 text-primary border border-primary/25">
      {children}
    </span>
  );
}

function TealBadge({ children }:{ children:React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wider bg-secondary/15 text-secondary border border-secondary/25">
      {children}
    </span>
  );
}

function AnimCounter({ target, suffix="", active }:{ target:number; suffix?:string; active:boolean }) {
  const val = useCounter(target, active);
  return <>{fmt(val)}{suffix}</>;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  PROJECT CARD                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

function ProjectCard({ repo, index }:{ repo:GithubRepo; index:number }) {
  const isEven = index % 2 === 0;
  const dot = repo.language ? (LANG_DOT[repo.language] ?? "#888") : null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col bg-card border border-border rounded-lg overflow-hidden no-underline hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
      style={{ boxShadow: "0 0 0 0 transparent" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = isEven ? "0 8px 40px -8px oklch(0.579 0.196 343 / .25)" : "0 8px 40px -8px oklch(0.505 0.090 225 / .25)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 transparent"; }}
    >
      {/* Top gradient line */}
      <div className="h-0.5 w-full" style={{ background: isEven ? "var(--color-primary)" : "var(--color-secondary)" }} />

      {/* Number watermark */}
      <span
        className="absolute top-2 right-3 text-6xl font-black leading-none select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-30"
        style={{ fontFamily:"var(--font-display)", color: isEven ? "oklch(0.579 0.196 343 / .06)" : "oklch(0.505 0.090 225 / .06)", opacity: 0.08 }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <p className="text-[10px] font-mono text-muted-foreground mb-0.5">{repo.owner.login}/</p>
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{repo.name}</h3>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2 font-mono">
          {repo.description ?? "No description provided."}
        </p>

        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {repo.topics.slice(0, 3).map(t => (
              isEven ? <RoseBadge key={t}>{t}</RoseBadge> : <TealBadge key={t}>{t}</TealBadge>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 pt-3 border-t border-border font-mono text-[11px] text-muted-foreground">
          {dot && <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background:dot }} />{repo.language}</span>}
          <span className="ml-auto">★ {fmt(repo.stargazers_count)}</span>
          <span>⑂ {fmt(repo.forks_count)}</span>
        </div>

        <div className="flex gap-2 pt-1">
          <span
            className="flex-1 text-center py-2 rounded text-[10px] font-semibold uppercase tracking-wider border border-border text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all"
          >
            Repository ↗
          </span>
          {repo.homepage && (
            <span
              className="flex-1 text-center py-2 rounded text-[10px] font-semibold uppercase tracking-wider text-white transition-all"
              style={{ background: isEven ? "var(--color-primary)" : "var(--color-secondary)" }}
            >
              Live Demo ↗
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MAIN                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

export default function DisruptivePortfolio({ user = DEMO }: Props) {
  const [dark,    setDark]    = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen,setMenu]    = useState(false);
  const scrollRef             = useRef<HTMLDivElement>(null);

  const statsView  = useInView(0.3);
  const aboutView  = useInView(0.2);
  const skillsView = useInView(0.2);

  useEffect(() => { setMounted(true); }, []);

  const repos     = user.repos_url     ?? [];
  const followers = user.followers_url ?? [];
  const emailSub  = encodeURIComponent("Propuesta de Colaboración");

  /* ── Horizontal scroll drag ── */
  const isDragging   = useRef(false);
  const startX       = useRef(0);
  const scrollLeft   = useRef(0);

  const onMouseDown = useCallback((e:React.MouseEvent) => {
    const el = scrollRef.current; if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
  }, []);
  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  }, []);
  const onMouseMove = useCallback((e:React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x   = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  /* ── Style tag ── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
    :root {
      --font-display: 'Syne', ui-sans-serif, sans-serif;
      --font-mono:    'DM Mono', ui-monospace, monospace;
    }
    html { scroll-behavior: smooth; }
    *  { box-sizing:border-box; }

    /* Marquee */
    @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    .marquee-track { animation: marquee 28s linear infinite; }
    .marquee-track:hover { animation-play-state: paused; }

    /* Reveal */
    @keyframes revealUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes revealLeft { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
    @keyframes revealRight{ from{opacity:0;transform:translateX(28px)}  to{opacity:1;transform:translateX(0)} }
    @keyframes scaleIn    { from{opacity:0;transform:scale(.92)}        to{opacity:1;transform:scale(1)} }
    @keyframes blinkDot   { 0%,100%{opacity:1} 50%{opacity:.2} }

    .rv  { animation: revealUp   .65s ease both; }
    .rl  { animation: revealLeft .65s ease both; }
    .rr  { animation: revealRight.65s ease both; }
    .si  { animation: scaleIn    .6s  ease both; }
    .bd  { animation: blinkDot   2.5s ease-in-out infinite; }

    .d1{animation-delay:.06s} .d2{animation-delay:.13s} .d3{animation-delay:.20s}
    .d4{animation-delay:.27s} .d5{animation-delay:.34s} .d6{animation-delay:.41s}
    .d7{animation-delay:.48s} .d8{animation-delay:.55s}

    /* Gradient text */
    .grad-text {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .grad-border {
      background: linear-gradient(var(--color-background), var(--color-background)) padding-box,
                  linear-gradient(135deg, var(--color-primary), var(--color-secondary)) border-box;
      border: 2px solid transparent;
    }

    /* Horizontal scroll */
    .h-scroll {
      display: flex; gap: 1rem; overflow-x: auto; cursor: grab;
      -webkit-overflow-scrolling: touch; scrollbar-width: none;
      padding-bottom: 4px;
    }
    .h-scroll::-webkit-scrollbar { display: none; }

    /* Clip hero bottom */
    .hero-clip { clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%); }

    /* Noise texture overlay */
    .noise::after {
      content:''; position:absolute; inset:0; pointer-events:none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      mix-blend-mode: overlay; opacity:.35;
    }
  `;

  return (
    <div className={dark ? "dark" : ""}>
      <style>{css}</style>

      <div className="min-h-screen bg-background text-foreground transition-colors duration-300" style={{ fontFamily:"var(--font-display)" }}>

        {/* ══════════════════════════════════════ NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo pill */}
            <a href="#" className="grad-border rounded-full px-4 py-1.5 no-underline">
              <span className="grad-text text-sm font-bold">{user.login}</span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1 bg-card/80 backdrop-blur-md border border-border rounded-full px-2 py-1.5">
              {["About","Projects","Skills","Contact"].map(s => (
                <a key={s} href={`#${s.toLowerCase()}`}
                  className="px-3 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-all no-underline">
                  {s}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setDark(d=>!d)}
                className="w-9 h-9 rounded-full border border-border bg-card/80 backdrop-blur-md flex items-center justify-center text-sm hover:border-primary transition-all">
                {dark ? "☀" : "☾"}
              </button>
              {/* Mobile menu */}
              <button onClick={() => setMenu(m=>!m)}
                className="md:hidden w-9 h-9 rounded-full border border-border bg-card/80 backdrop-blur-md flex items-center justify-center text-sm">
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div className="md:hidden mx-4 mt-1 bg-card border border-border rounded-xl overflow-hidden shadow-xl">
              {["About","Projects","Skills","Contact"].map(s => (
                <a key={s} href={`#${s.toLowerCase()}`}
                  className="block px-5 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-b border-border last:border-0 no-underline"
                  onClick={() => setMenu(false)}>
                  {s}
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* ══════════════════════════════════════ HERO */}
        <header className="hero-clip noise relative min-h-screen flex flex-col justify-center overflow-hidden"
          style={{ background:"var(--color-background)" }}>

          {/* Dual glow blobs */}
          <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full pointer-events-none"
            style={{ background:"oklch(0.579 0.196 343 / .18)", filter:"blur(100px)" }} />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full pointer-events-none"
            style={{ background:"oklch(0.505 0.090 225 / .18)", filter:"blur(120px)" }} />

          {/* Big background number */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
            <span className="font-black text-[30vw] leading-none"
              style={{ fontFamily:"var(--font-display)", color:"oklch(0.579 0.196 343 / .04)", letterSpacing:"-0.05em" }}>
              01
            </span>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">

            {/* Eyebrow */}
            {mounted && (
              <div className="rv d1 flex flex-wrap items-center gap-3 mb-8">
                <span className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span className="bd w-2 h-2 rounded-full bg-primary" />
                  {user.hireable ? "Open to opportunities" : "Not available"}
                </span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-xs font-mono text-muted-foreground">{user.location}</span>
                <span className="text-muted-foreground/40">·</span>
                <RoseBadge>@{user.login}</RoseBadge>
              </div>
            )}

            {/* Main headline split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
              <div>
                {mounted && (
                  <>
                    <h1 className="rv d2 font-black leading-none tracking-tighter mb-6"
                      style={{ fontSize:"clamp(48px,9vw,110px)", fontFamily:"var(--font-display)", letterSpacing:"-0.04em" }}>
                      <span className="block text-foreground">{(user.name ?? user.login).split(" ")[0]}</span>
                      <span className="block grad-text">{(user.name ?? user.login).split(" ").slice(1).join(" ") || user.login}</span>
                    </h1>

                    <p className="rv d3 text-sm leading-relaxed text-muted-foreground max-w-lg mb-8"
                      style={{ fontFamily:"var(--font-mono)" }}>
                      {user.bio}
                    </p>

                    <div className="rv d4 flex flex-wrap gap-3">
                      <a href="#projects"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white no-underline hover:opacity-90 transition-opacity"
                        style={{ background:"linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
                        Ver Proyectos →
                      </a>
                      {user.blog && (
                        <a href={user.blog} target="_blank" rel="noopener noreferrer"
                          className="grad-border inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold no-underline hover:opacity-80 transition-opacity"
                          style={{ color:"var(--color-foreground)" }}>
                          Sitio web ↗
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Avatar */}
              {mounted && (
                <div className="si d3 flex-shrink-0 flex justify-center lg:justify-end">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full"
                      style={{ background:"linear-gradient(135deg, oklch(0.579 0.196 343/.3), oklch(0.505 0.090 225/.3))", filter:"blur(16px)" }} />
                    <div className="relative w-44 h-44 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-card">
                      <img src={user.avatar_url} alt={user.name??user.login} className="object-cover" sizes="224px" />
                    </div>
                    {/* Floating role badge */}
                    <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                      <span className="text-sm">💻</span>
                      <span className="text-[10px] font-bold text-foreground" style={{ fontFamily:"var(--font-mono)" }}>
                        Frontend Dev
                      </span>
                    </div>
                    {/* Floating stat */}
                    <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl px-3 py-2 shadow-lg text-center">
                      <div className="text-base font-black grad-text">{fmt(user.followers)}</div>
                      <div className="text-[9px] text-muted-foreground font-mono">followers</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Network strip */}
            {mounted && (
              <div className="rv d5 flex flex-wrap items-center gap-4 mt-12 pt-8 border-t border-border">
                {[
                  { label:"GitHub",  href:user.html_url },
                  user.twitter_username ? { label:`@${user.twitter_username}`, href:`https://twitter.com/${user.twitter_username}` } : null,
                  user.email ? { label:user.email, href:`mailto:${user.email}?subject=${emailSub}` } : null,
                ].filter(Boolean).map(l => (
                  <a key={l!.label} href={l!.href} target={l!.href.startsWith("mailto")?"_self":"_blank"} rel="noopener noreferrer"
                    className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors no-underline">
                    {l!.label}
                  </a>
                ))}
                <div className="ml-auto flex -space-x-2">
                  {followers.slice(0,4).map(f => (
                    <img key={f.login} src={f.avatar_url} alt={f.login} width={28} height={28}
                      className="rounded-full border-2 border-card object-cover" />
                  ))}
                  {followers.length > 4 && (
                    <div className="w-7 h-7 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[9px] font-bold text-muted-foreground">
                      +{followers.length - 4}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ══════════════════════════════════════ MARQUEE */}
        <div className="border-y border-border bg-muted/50 overflow-hidden py-3">
          <div className="flex whitespace-nowrap marquee-track" style={{ fontFamily:"var(--font-mono)" }}>
            {[...STACK,...STACK].map((s,i) => (
              <span key={i} className="text-[11px] font-medium mx-5 text-muted-foreground">
                {s}
                <span className="mx-4 grad-text font-black">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════ STATS */}
        <section ref={statsView.ref} className="border-b border-border bg-background">
          <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { label:"Repositories",  val:user.public_repos,  color:"var(--color-primary)" },
              { label:"Followers",     val:user.followers,     color:"var(--color-secondary)" },
              { label:"Public Gists",  val:user.public_gists,  color:"var(--color-primary)" },
              { label:"Member Since",  val:yr(user.created_at),color:"var(--color-secondary)" },
            ].map((s,i) => (
              <div key={s.label}
                className="flex flex-col items-center justify-center py-8 border-r border-border last:border-r-0 even:border-r-0 md:even:border-r group hover:bg-muted/40 transition-colors">
                <div className="text-4xl font-black leading-none mb-1 tabular-nums"
                  style={{ fontFamily:"var(--font-display)", color:s.color }}>
                  <AnimCounter target={s.val} active={statsView.inView} />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════ ABOUT */}
        <section id="about" ref={aboutView.ref} className="border-b border-border relative overflow-hidden">
          {/* Background number */}
          <div className="absolute inset-0 flex items-center justify-end pr-8 select-none pointer-events-none">
            <span className="font-black text-[20vw] leading-none"
              style={{ color:"oklch(0.505 0.090 225 / .04)", fontFamily:"var(--font-display)" }}>02</span>
          </div>

          <div className="relative max-w-6xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left */}
              <div className={aboutView.inView ? "rl" : "opacity-0"} style={{ animation: aboutView.inView ? undefined : "none" }}>
                <div className="flex items-center gap-2 mb-4">
                  <TealBadge>About</TealBadge>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <h2 className="text-4xl font-black tracking-tight mb-6" style={{ fontFamily:"var(--font-display)" }}>
                  Crafting the web,
                  <br /><span className="grad-text">one token at a time.</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6" style={{ fontFamily:"var(--font-mono)" }}>
                  {user.bio}
                </p>
                {user.company && (
                  <p className="text-xs text-muted-foreground font-mono mb-6">
                    Currently at <span className="text-foreground font-semibold">{user.company}</span>
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {user.hireable && <RoseBadge>Open to work ✦</RoseBadge>}
                  <TealBadge>{user.location}</TealBadge>
                  <RoseBadge>MIT Licensed</RoseBadge>
                </div>
              </div>

              {/* Right — followers */}
              <div className={aboutView.inView ? "rr" : "opacity-0"} style={{ animation: aboutView.inView ? undefined : "none" }}>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-4">Notable followers</p>
                <div className="flex flex-col gap-2">
                  {followers.slice(0,5).map((f,i) => (
                    <a key={f.login} href={f.html_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:border-primary transition-all no-underline group">
                      <img src={f.avatar_url} alt={f.login} width={32} height={32}
                        className="rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      <span className="text-sm font-semibold text-foreground">{f.login}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity">View ↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ PROJECTS */}
        <section id="projects" className="border-b border-border relative">
          <div className="absolute inset-0 flex items-center justify-start pl-8 select-none pointer-events-none overflow-hidden">
            <span className="font-black text-[20vw] leading-none"
              style={{ color:"oklch(0.579 0.196 343 / .04)", fontFamily:"var(--font-display)" }}>03</span>
          </div>

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-6">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <RoseBadge>Projects</RoseBadge>
                <h2 className="text-4xl font-black tracking-tight mt-3" style={{ fontFamily:"var(--font-display)" }}>
                  Work that <span className="grad-text">ships.</span>
                </h2>
              </div>
              <p className="hidden sm:block text-xs text-muted-foreground font-mono pb-1">
                ← drag to scroll →
              </p>
            </div>
          </div>

          {/* Horizontal scroll */}
          <div
            ref={scrollRef}
            className="h-scroll px-6 pb-8"
            style={{ paddingLeft: "calc(50% - 576px + 24px)" }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
          >
            {repos.map((r,i) => (
              <div key={r.id} className="flex-shrink-0 w-72 sm:w-80">
                <ProjectCard repo={r} index={i} />
              </div>
            ))}
            {/* End spacer */}
            <div className="flex-shrink-0 w-6" />
          </div>
        </section>

        {/* ══════════════════════════════════════ SKILLS */}
        <section id="skills" ref={skillsView.ref} className="border-b border-border">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="flex items-center gap-2 mb-10">
              <TealBadge>Skills</TealBadge>
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-mono text-muted-foreground">{STACK.length} technologies</span>
            </div>

            {/* Tag cloud with alternating colors */}
            <div className="flex flex-wrap gap-3">
              {STACK.map((s,i) => (
                <span key={s}
                  className="px-4 py-2 rounded-full text-sm font-bold cursor-default border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={
                    i % 3 === 0
                      ? { background:"oklch(0.579 0.196 343 / .1)", borderColor:"oklch(0.579 0.196 343 / .3)", color:"var(--color-primary)" }
                      : i % 3 === 1
                        ? { background:"oklch(0.505 0.090 225 / .1)", borderColor:"oklch(0.505 0.090 225 / .3)", color:"var(--color-secondary)" }
                        : { background:"var(--color-muted)", borderColor:"var(--color-border)", color:"var(--color-muted-foreground)" }
                  }
                >
                  {s}
                </span>
              ))}

              {/* Auto-generated from repos */}
              {Array.from(new Set(repos.map(r => r.language).filter(Boolean))).slice(0,6).map((lang,i) => (
                <span key={`lang-${lang}`}
                  className="px-4 py-2 rounded-full text-sm font-bold cursor-default border transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background:"var(--color-muted)", borderColor:"var(--color-border)", color:"var(--color-muted-foreground)" }}>
                  {lang}
                </span>
              ))}
            </div>

            {/* Dual gradient bar */}
            <div className="mt-10 h-1.5 rounded-full overflow-hidden"
              style={{ background:"linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-primary))" }} />
          </div>
        </section>

        {/* ══════════════════════════════════════ CONTACT */}
        <section id="contact" className="relative overflow-hidden">
          {/* Large background text */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
            <span className="font-black text-[18vw] leading-none text-center whitespace-nowrap"
              style={{ color:"oklch(0.579 0.196 343 / .04)", fontFamily:"var(--font-display)", letterSpacing:"-0.05em" }}>
              Let's Talk
            </span>
          </div>

          {/* Dual blobs */}
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
            style={{ background:"oklch(0.579 0.196 343 / .12)", filter:"blur(90px)" }} />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{ background:"oklch(0.505 0.090 225 / .12)", filter:"blur(90px)" }} />

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
            <TealBadge>Contact</TealBadge>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter mt-6 mb-4"
              style={{ fontFamily:"var(--font-display)", letterSpacing:"-0.04em" }}>
              Ready to build
              <br /><span className="grad-text">something great?</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-10" style={{ fontFamily:"var(--font-mono)" }}>
              Whether it's a product, a component library or an open-source idea — reach out. Always happy to connect.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`mailto:${user.email ?? `hi@${user.login}.dev`}?subject=${emailSub}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white no-underline hover:opacity-90 transition-opacity shadow-lg"
                style={{ background:"linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Enviar Correo
              </a>
              <a
                href={user.html_url} target="_blank" rel="noopener noreferrer"
                className="grad-border inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold no-underline hover:opacity-80 transition-opacity"
                style={{ color:"var(--color-foreground)" }}>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Ver GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ FOOTER */}
        <footer className="border-t border-border bg-muted/30">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grad-text text-sm font-black">{user.login}</span>
              <span className="text-[10px] text-muted-foreground font-mono">· MIT License · {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-5">
              {[
                { href:user.html_url,                                                         l:"GitHub"  },
                user.twitter_username ? { href:`https://twitter.com/${user.twitter_username}`, l:"Twitter" } : null,
                user.blog             ? { href:user.blog.startsWith("http")?user.blog:`https://${user.blog}`, l:"Web" } : null,
              ].filter(Boolean).map(link => (
                <a key={link!.l} href={link!.href} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors no-underline font-mono">
                  {link!.l}
                </a>
              ))}
            </div>
            <div
              className="h-1 w-16 rounded-full"
              style={{ background:"linear-gradient(90deg, var(--color-primary), var(--color-secondary))" }}
            />
          </div>
        </footer>

      </div>
    </div>
  );
}