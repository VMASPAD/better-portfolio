"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type LayoutType = "bento" | "minimal" | "vercel" | "enterprise";

/* ─── Constants ──────────────────────────────────────────────────────────── */
const LAYOUTS: { id: LayoutType; label: string; desc: string; tag: string }[] = [
  { id: "bento",      label: "Bento",      desc: "Asymmetric grid of cards with stats, skills, repos and a contact form.", tag: "Most popular" },
  { id: "minimal",    label: "Minimal",    desc: "Single-column, warm beige palette. Inspired by MagicUI portfolio style.",  tag: "Clean" },
  { id: "vercel",     label: "Vercel",     desc: "Pure black, Geist Mono, hairline borders. Data tables for repos.",         tag: "Sharp" },
  { id: "enterprise", label: "Enterprise", desc: "Bloomberg Terminal aesthetics. Amber accent, live clock, scanlines.",      tag: "Bold" },
];

const DEMO_USERS = ["torvalds", "gaearon", "sindresorhus", "tj", "mrdoob", "vmaspad"];

const FEATURES = [
  { icon: "⚡", title: "Instant generation",  body: "Paste a username. Hit Enter. Your portfolio is live in under a second — no build step, no waiting." },
  { icon: "◆",  title: "GitHub data only",    body: "Pulls name, bio, repos, followers, starred and location straight from the public GitHub API. No forms to fill." },
  { icon: "⬡",  title: "4 layout themes",     body: "Bento, Minimal, Vercel-style and Enterprise. Every theme ships with dark and light mode." },
  { icon: "🔗", title: "Shareable URL",        body: "Every portfolio lives at a permanent URL. Share it on your resume, LinkedIn or Twitter bio." },
  { icon: "◎",  title: "Zero config",          body: "No accounts, no tokens, no YAML. Public GitHub data is all Gitfolio needs." },
  { icon: "⊡",  title: "Open source — MIT",   body: "Fork it, extend it, self-host it. Built by @vmaspad and open to contributions on GitHub." },
];

const TICKER_ITEMS = ["Bento", "Minimal", "Vercel", "Enterprise", "GitHub API", "Open Source", "MIT", "Next.js", "Tailwind", "TypeScript", "Zero Config", "Instant"];

/* ─── Tiny atoms ─────────────────────────────────────────────────────────── */
function Chip({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className="inline-block text-[9px] font-medium uppercase tracking-[.12em] px-2 py-0.5 border"
      style={{
        fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)",
        borderColor: accent ? "var(--primary, #f97316)" : "var(--border, #252525)",
        color: accent ? "var(--primary, #f97316)" : "var(--muted-fg, #555)",
        background: "transparent",
      }}
    >
      {children}
    </span>
  );
}

function PulseDot() {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ background: "var(--primary, #f97316)", boxShadow: "0 0 6px var(--primary, #f97316)" }}
      />
      <span
        className="text-[9px] uppercase tracking-widest"
        style={{ fontFamily: "var(--font-mono)", color: "var(--primary, #f97316)" }}
      >
        Live
      </span>
    </span>
  );
}

/* ─── Layout Preview Card ─────────────────────────────────────────────────── */
function LayoutCard({
  layout,
  active,
  onClick,
}: {
  layout: (typeof LAYOUTS)[0];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left border p-4 transition-all duration-200 cursor-pointer"
      style={{
        background: active ? "rgba(249,115,22,.06)" : "transparent",
        borderColor: active ? "var(--primary, #f97316)" : "var(--border, #252525)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className="text-sm font-bold uppercase tracking-wide"
          style={{ color: active ? "var(--primary, #f97316)" : "var(--foreground, #fff)" }}
        >
          {layout.label}
        </span>
        <Chip accent={active}>{layout.tag}</Chip>
      </div>
      <p className="text-[11px] leading-relaxed" style={{ fontFamily: "var(--font-mono)", color: "var(--muted-fg, #555)" }}>
        {layout.desc}
      </p>
    </button>
  );
}

/* ─── Mock Portfolio Preview ──────────────────────────────────────────────── */
function MockPreview({ layout, username }: { layout: LayoutType; username: string }) {
  const name = username || "your-username";

  const previews: Record<LayoutType, React.ReactNode> = {
    bento: (
      <div className="grid grid-cols-3 gap-1 h-full p-2">
        <div className="col-span-2 row-span-2 border p-3 flex flex-col justify-between" style={{ borderColor: "var(--border, #252525)" }}>
          <div>
            <div className="w-12 h-1 mb-2" style={{ background: "var(--primary, #f97316)" }} />
            <div className="text-xs font-bold uppercase tracking-tighter mb-1" style={{ fontFamily: "var(--font-sans)" }}>{name.toUpperCase()}_</div>
            <div className="w-3/4 h-1 rounded mb-1" style={{ background: "var(--border, #252525)" }} />
            <div className="w-1/2 h-1 rounded" style={{ background: "var(--border, #252525)" }} />
          </div>
          <div className="flex gap-1">
            <div className="h-5 px-2 text-[8px] flex items-center font-bold" style={{ background: "var(--primary, #f97316)", color: "#000" }}>GitHub ↗</div>
            <div className="h-5 px-2 text-[8px] flex items-center border" style={{ borderColor: "var(--border, #252525)", color: "var(--muted-fg, #555)" }}>Blog</div>
          </div>
        </div>
        <div className="border p-2 flex items-center justify-center" style={{ borderColor: "var(--border, #252525)" }}>
          <div className="w-10 h-10 rounded-full" style={{ background: "var(--border, #252525)" }} />
        </div>
        <div className="border p-2 flex flex-col justify-between" style={{ borderColor: "var(--border, #252525)" }}>
          <div className="text-[7px]" style={{ fontFamily: "var(--font-mono)", color: "var(--muted-fg, #555)" }}>FOLLOWERS</div>
          <div className="text-sm font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--primary, #f97316)" }}>14.9k</div>
        </div>
        <div className="col-span-2 border p-2" style={{ borderColor: "var(--border, #252525)" }}>
          <div className="text-[7px] mb-1.5" style={{ fontFamily: "var(--font-mono)", color: "var(--primary, #f97316)" }}>SKILLS</div>
          {["TypeScript", "React", "Node.js"].map(s => (
            <div key={s} className="flex items-center gap-1.5 mb-1">
              <div className="text-[7px] w-14 shrink-0" style={{ fontFamily: "var(--font-mono)", color: "var(--muted-fg, #555)" }}>{s}</div>
              <div className="flex-1 h-0.5" style={{ background: "var(--border, #252525)" }}>
                <div className="h-full" style={{ background: "var(--primary, #f97316)", width: s === "TypeScript" ? "90%" : s === "React" ? "82%" : "75%" }} />
              </div>
            </div>
          ))}
        </div>
        <div className="border p-2 flex flex-col justify-between" style={{ borderColor: "var(--border, #252525)" }}>
          <div className="text-[7px]" style={{ fontFamily: "var(--font-mono)", color: "var(--muted-fg, #555)" }}>REPOS</div>
          <div className="text-sm font-bold" style={{ fontFamily: "var(--font-mono)" }}>8</div>
        </div>
      </div>
    ),

    minimal: (
      <div className="h-full p-4 flex flex-col gap-3" style={{ background: "#faf8f5" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full" style={{ background: "#e0d5c7" }} />
          <div>
            <div className="text-[10px] font-semibold" style={{ color: "#2d2620", fontFamily: "Georgia, serif" }}>{name}</div>
            <div className="text-[8px]" style={{ color: "#9c8f82" }}>@{name}</div>
          </div>
        </div>
        <div className="h-px" style={{ background: "#ede8e0" }} />
        <div className="text-[8px] leading-relaxed" style={{ color: "#4a3f37", fontFamily: "Georgia, serif" }}>
          A mysterious creature that lives on GitHub. Passionate about open-source...
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[["Repos","8"],["Followers","14.9k"],["Since","2011"]].map(([l,v]) => (
            <div key={l} className="text-center py-2 rounded" style={{ background: "#f0ebe3" }}>
              <div className="text-[10px] font-semibold" style={{ color: "#2d2620" }}>{v}</div>
              <div className="text-[7px]" style={{ color: "#9c8f82" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),

    vercel: (
      <div className="h-full p-3 flex flex-col gap-2" style={{ background: "#000" }}>
        <div className="flex items-center justify-between border-b pb-1.5" style={{ borderColor: "#1a1a1a" }}>
          <span className="text-[8px] font-mono uppercase tracking-wider" style={{ color: "#555" }}>{name}</span>
          <span className="text-[7px] font-mono" style={{ color: "#555" }}>PDT 14:22:07</span>
        </div>
        <div className="text-[18px] font-bold tracking-tighter leading-none" style={{ color: "#fff", fontFamily: "var(--font-mono)" }}>
          {name.toUpperCase()}<span style={{ color: "#fff", opacity: 0.4 }}>_</span>
        </div>
        <div className="w-full border-t border-l grid grid-cols-3" style={{ borderColor: "#1a1a1a" }}>
          {[["Repos","8"],["Followers","14.9k"],["Since","2011"]].map(([l,v]) => (
            <div key={l} className="border-b border-r p-1.5" style={{ borderColor: "#1a1a1a" }}>
              <div className="text-[9px] font-bold font-mono" style={{ color: "#fff" }}>{v}</div>
              <div className="text-[7px] font-mono uppercase tracking-wider" style={{ color: "#444" }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="border" style={{ borderColor: "#1a1a1a" }}>
          {[["Hello-World","C","★2.7k"],["Spoon-Knife","HTML","★12.8k"]].map(([n,l,s]) => (
            <div key={n} className="flex items-center gap-2 p-1.5 border-b last:border-0 text-[7px] font-mono" style={{ borderColor: "#1a1a1a", color: "#555" }}>
              <span style={{ color: "#fff" }}>{n}</span>
              <span className="ml-auto">{l}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    ),

    enterprise: (
      <div className="h-full flex flex-col" style={{ background: "var(--background, #000)", fontFamily: "var(--font-mono)" }}>
        <div className="border-b flex items-center justify-between px-2 py-1" style={{ borderColor: "var(--border, #252525)" }}>
          <span className="text-[7px] uppercase tracking-widest" style={{ color: "var(--muted-fg, #555)" }}>{name}</span>
          <span className="text-[7px]" style={{ color: "var(--primary, #f97316)" }}>● AVAILABLE</span>
        </div>
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-[7px] uppercase tracking-widest mb-1" style={{ color: "var(--primary, #f97316)" }}>▶ PROFILE / SAN FRANCISCO</div>
            <div className="text-lg font-bold tracking-tighter leading-none mb-2" style={{ color: "var(--foreground, #fff)" }}>
              {name.toUpperCase()}<span style={{ color: "var(--primary, #f97316)" }}>_</span>
            </div>
            <div className="border-l-2 pl-2 text-[7px] leading-relaxed" style={{ borderColor: "var(--primary, #f97316)", color: "var(--muted-fg, #555)" }}>
              Architect of open-source infrastructure. Building tools developers trust.
            </div>
          </div>
          <div className="border border-l grid grid-cols-3" style={{ borderColor: "var(--border, #252525)" }}>
            {[["REPOS","8"],["FOLLOWERS","14.9k"],["SINCE","2011"]].map(([l,v]) => (
              <div key={l} className="border-r border-b p-1.5" style={{ borderColor: "var(--border, #252525)" }}>
                <div className="text-[9px] font-bold" style={{ color: "var(--foreground, #fff)" }}>{v}</div>
                <div className="text-[6px] uppercase tracking-widest" style={{ color: "var(--muted-fg, #555)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div
      className="relative w-full overflow-hidden border"
      style={{
        aspectRatio: "16/10",
        borderColor: "var(--border, #252525)",
        background: layout === "minimal" ? "#faf8f5" : "var(--background, #000)",
      }}
    >
      {previews[layout]}
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [activeLayout, setActiveLayout] = useState<LayoutType>("bento");
  const [mounted, setMounted] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [demoIndex, setDemoIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Cycle demo usernames in placeholder
  useEffect(() => {
    if (inputFocused || username) return;
    const t = setInterval(() => setDemoIndex(i => (i + 1) % DEMO_USERS.length), 2200);
    return () => clearInterval(t);
  }, [inputFocused, username]);

  const handleGenerate = () => {
    const u = username.trim().replace(/^@/, "");
    if (!u) { inputRef.current?.focus(); return; }
    router.push(`/portfolio?user=${encodeURIComponent(u)}&type=${activeLayout}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleGenerate();
  };

  return (
    <main
      className="min-h-screen"
      style={{
        background: "var(--background, #000)",
        color: "var(--foreground, #fff)",
        fontFamily: "var(--font-sans, 'Chakra Petch', sans-serif)",
      }}
    >
      {/* ── Ticker tape ──────────────────────────────────────────────────── */}
      <div
        className="border-b overflow-hidden py-1.5"
        style={{ borderColor: "var(--border, #252525)" }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: "ticker 20s linear infinite",
            fontFamily: "var(--font-mono)",
          }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-[9px] uppercase tracking-widest mx-5"
              style={{ color: "var(--muted-fg, #555)" }}
            >
              {item}
              <span className="mx-3" style={{ color: "var(--primary, #f97316)" }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 border-b flex items-center justify-between px-5 h-11"
        style={{ background: "var(--background, #000)", borderColor: "var(--border, #252525)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-tight">Gitfolio</span>
          <Chip>Beta</Chip>
        </div>
        <div className="flex items-center gap-4">
          <PulseDot />
          <a
            href="https://github.com/vmaspad/gitfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] uppercase tracking-widest border px-3 py-1.5 transition-all duration-200 no-underline"
            style={{
              fontFamily: "var(--font-mono)",
              borderColor: "var(--border, #252525)",
              color: "var(--muted-fg, #555)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--primary, #f97316)";
              (e.currentTarget as HTMLElement).style.color = "var(--primary, #f97316)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border, #252525)";
              (e.currentTarget as HTMLElement).style.color = "var(--muted-fg, #555)";
            }}
          >
            GitHub ↗
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative border-b" style={{ borderColor: "var(--border, #252525)" }}>
        {/* grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(var(--border, #252525) 1px, transparent 1px), linear-gradient(90deg, var(--border, #252525) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.3,
          }}
        />

        {/* orange glow blob */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center top, oklch(0.6152 0.1657 26.98 / .12) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 py-20 sm:py-28">
          {/* eyebrow */}
          {mounted && (
            <div
              className="flex items-center gap-2 mb-8"
              style={{ animation: "fadeUp .5s ease both" }}
            >
              <Chip accent>Open source</Chip>
              <Chip>MIT License</Chip>
              <Chip>by @vmaspad</Chip>
            </div>
          )}

          {/* Headline */}
          {mounted && (
            <h1
              className="font-bold leading-none tracking-tighter mb-6"
              style={{
                fontSize: "clamp(40px, 8vw, 96px)",
                animation: "fadeUp .55s .06s ease both",
                opacity: 0,
              }}
            >
              Your GitHub.
              <br />
              <span style={{ color: "var(--primary, #f97316)" }}>A portfolio.</span>
              <br />
              <span style={{ color: "var(--muted-fg, #555)" }}>Instantly.</span>
            </h1>
          )}

          {/* Sub */}
          {mounted && (
            <p
              className="text-sm leading-relaxed max-w-lg mb-12"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--muted-fg, #555)",
                animation: "fadeUp .55s .13s ease both",
                opacity: 0,
              }}
            >
              Type any GitHub username. Pick a layout. Get a beautiful, shareable portfolio page — powered entirely by public GitHub data. No sign-up. No config.
            </p>
          )}

          {/* ── INPUT ──────────────────────────────────────────────────── */}
          {mounted && (
            <div
              className="flex flex-col sm:flex-row gap-1 mb-4 max-w-xl"
              style={{ animation: "fadeUp .55s .20s ease both", opacity: 0 }}
            >
              {/* username field */}
              <div
                className="flex items-center flex-1 border transition-all duration-200"
                style={{
                  borderColor: inputFocused ? "var(--primary, #f97316)" : "var(--border, #252525)",
                  background: "transparent",
                }}
              >
                <span
                  className="pl-3 text-sm shrink-0"
                  style={{ color: "var(--muted-fg, #555)", fontFamily: "var(--font-mono)" }}
                >
                  github.com/
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder={DEMO_USERS[demoIndex]}
                  className="flex-1 bg-transparent outline-none px-2 py-3 text-sm"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--foreground, #fff)",
                  }}
                />
              </div>

              {/* CTA button */}
              <button
                onClick={handleGenerate}
                className="px-6 py-3 text-xs font-bold uppercase tracking-widest cursor-pointer border-0 transition-opacity duration-200 hover:opacity-85 shrink-0"
                style={{
                  fontFamily: "var(--font-sans)",
                  background: "var(--primary, #f97316)",
                  color: "#000",
                }}
              >
                Generate →
              </button>
            </div>
          )}

          {/* quick demo links */}
          {mounted && (
            <div
              className="flex flex-wrap gap-2 items-center"
              style={{ animation: "fadeUp .55s .27s ease both", opacity: 0 }}
            >
              <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--muted-fg, #555)" }}>
                Try with:
              </span>
              {DEMO_USERS.map(u => (
                <button
                  key={u}
                  onClick={() => { setUsername(u); inputRef.current?.focus(); }}
                  className="text-[9px] uppercase tracking-widest px-2 py-1 border cursor-pointer bg-transparent transition-all duration-150"
                  style={{
                    fontFamily: "var(--font-mono)",
                    borderColor: username === u ? "var(--primary, #f97316)" : "var(--border, #252525)",
                    color: username === u ? "var(--primary, #f97316)" : "var(--muted-fg, #555)",
                  }}
                >
                  @{u}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── LAYOUT PICKER ────────────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: "var(--border, #252525)" }}>
        <div className="max-w-5xl mx-auto px-6 py-14">
          {/* label */}
          <div className="flex items-center gap-3 mb-8">
            <span
              className="text-[9px] uppercase tracking-[.2em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--primary, #f97316)" }}
            >
              §01
            </span>
            <h2 className="text-xl font-bold uppercase tracking-tight">Choose a layout</h2>
            <div className="flex-1 h-px" style={{ background: "var(--border, #252525)" }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* left: preview */}
            <div>
              <MockPreview layout={activeLayout} username={username} />
              <div
                className="flex items-center justify-between mt-2 px-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span className="text-[9px] uppercase tracking-widest" style={{ color: "var(--muted-fg, #555)" }}>
                  Preview — {activeLayout} / {username || "your-username"}
                </span>
                <button
                  onClick={handleGenerate}
                  className="text-[9px] uppercase tracking-widest cursor-pointer bg-transparent border-0 transition-colors duration-150"
                  style={{ color: "var(--primary, #f97316)" }}
                >
                  Open full ↗
                </button>
              </div>
            </div>

            {/* right: layout cards */}
            <div className="flex flex-col gap-1">
              {LAYOUTS.map(l => (
                <LayoutCard
                  key={l.id}
                  layout={l}
                  active={activeLayout === l.id}
                  onClick={() => setActiveLayout(l.id)}
                />
              ))}
            </div>
          </div>

          {/* Generate CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={handleGenerate}
              className="px-8 py-3 text-xs font-bold uppercase tracking-widest cursor-pointer border-0 transition-opacity hover:opacity-85"
              style={{
                fontFamily: "var(--font-sans)",
                background: "var(--primary, #f97316)",
                color: "#000",
              }}
            >
              Generate {activeLayout} portfolio →
            </button>
            <span
              className="text-[10px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--muted-fg, #555)" }}
            >
              {`/portfolio?user=${username || "vmaspad"}&type=${activeLayout}`}
            </span>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: "var(--border, #252525)" }}>
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 mb-10">
            <span
              className="text-[9px] uppercase tracking-[.2em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--primary, #f97316)" }}
            >
              §02
            </span>
            <h2 className="text-xl font-bold uppercase tracking-tight">Why Gitfolio</h2>
            <div className="flex-1 h-px" style={{ background: "var(--border, #252525)" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l" style={{ borderColor: "var(--border, #252525)" }}>
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="border-r border-b p-6 group transition-all duration-200"
                style={{
                  borderColor: "var(--border, #252525)",
                  background: "transparent",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(249,115,22,.04)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div
                  className="text-xl mb-3 block transition-transform duration-200 group-hover:-translate-y-0.5"
                >
                  {f.icon}
                </div>
                <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--foreground, #fff)" }}>
                  {f.title}
                </div>
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--muted-fg, #555)" }}
                >
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: "var(--border, #252525)" }}>
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 mb-10">
            <span
              className="text-[9px] uppercase tracking-[.2em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--primary, #f97316)" }}
            >
              §03
            </span>
            <h2 className="text-xl font-bold uppercase tracking-tight">How it works</h2>
            <div className="flex-1 h-px" style={{ background: "var(--border, #252525)" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
            {[
              { n: "01", title: "Enter username",  body: "Type any GitHub username in the input field. No OAuth, no permissions — public data only." },
              { n: "02", title: "Pick a layout",   body: "Choose from Bento, Minimal, Vercel or Enterprise. Each has dark and light mode built in." },
              { n: "03", title: "Share your URL",  body: "Your portfolio lives at /portfolio?user=you&type=bento. Copy, share, add to your bio." },
            ].map(step => (
              <div
                key={step.n}
                className="border p-6 relative overflow-hidden"
                style={{ borderColor: "var(--border, #252525)" }}
              >
                <div
                  className="absolute top-3 right-4 text-5xl font-bold leading-none pointer-events-none select-none"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--border, #252525)", opacity: 0.6 }}
                >
                  {step.n}
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-wide mb-3"
                  style={{ color: "var(--primary, #f97316)" }}
                >
                  {step.title}
                </div>
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--muted-fg, #555)" }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="border-b relative overflow-hidden" style={{ borderColor: "var(--border, #252525)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, oklch(0.6152 0.1657 26.98 / .08) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--primary, #f97316), transparent)" }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <Chip accent>Ready?</Chip>
          <h2
            className="text-4xl sm:text-6xl font-bold tracking-tighter leading-none mt-6 mb-6"
          >
            Build your portfolio
            <br />
            <span style={{ color: "var(--primary, #f97316)" }}>in 5 seconds.</span>
          </h2>
          <p
            className="text-sm mb-10 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-mono)", color: "var(--muted-fg, #555)" }}
          >
            No account needed. Just your GitHub username and the layout you prefer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <div
              className="flex items-center border"
              style={{ borderColor: "var(--border, #252525)" }}
            >
              <span
                className="pl-4 text-sm shrink-0"
                style={{ color: "var(--muted-fg, #555)", fontFamily: "var(--font-mono)" }}
              >
                github.com/
              </span>
              <input
                type="text"
                placeholder="your-username"
                className="bg-transparent outline-none px-2 py-3 text-sm w-40"
                style={{ fontFamily: "var(--font-mono)", color: "var(--foreground, #fff)" }}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    const val = (e.currentTarget.value || "vmaspad").trim();
                    router.push(`/portfolio?user=${encodeURIComponent(val)}&type=${activeLayout}`);
                  }
                }}
              />
            </div>
            <button
              onClick={handleGenerate}
              className="px-8 py-3 text-xs font-bold uppercase tracking-widest cursor-pointer border-0 transition-opacity hover:opacity-85"
              style={{
                fontFamily: "var(--font-sans)",
                background: "var(--primary, #f97316)",
                color: "#000",
              }}
            >
              Generate →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t" style={{ borderColor: "var(--border, #252525)" }}>
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold uppercase tracking-tight">Gitfolio</span>
            <span
              className="text-[9px] uppercase tracking-widest"
              style={{ fontFamily: "var(--font-mono)", color: "var(--muted-fg, #555)" }}
            >
              MIT License
            </span>
          </div>

          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[9px] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)", color: "var(--muted-fg, #555)" }}
          >
            <a
              href="https://github.com/vmaspad/gitfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-colors duration-150 hover:text-primary"
              style={{ color: "var(--muted-fg, #555)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--primary, #f97316)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted-fg, #555)")}
            >
              GitHub ↗
            </a>
            <a
              href="https://github.com/vmaspad/gitfolio/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-colors duration-150"
              style={{ color: "var(--muted-fg, #555)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--primary, #f97316)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted-fg, #555)")}
            >
              Docs ↗
            </a>
            <a
              href="/portfolio?user=vmaspad&type=bento"
              className="no-underline transition-colors duration-150"
              style={{ color: "var(--muted-fg, #555)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--primary, #f97316)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted-fg, #555)")}
            >
              Demo ↗
            </a>
          </div>

          <div
            className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)", color: "var(--muted-fg, #555)" }}
          >
            Built by
            <a
              href="https://github.com/vmaspad"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline font-semibold transition-colors duration-150"
              style={{ color: "var(--primary, #f97316)" }}
            >
              @vmaspad
            </a>
          </div>
        </div>
      </footer>

      {/* ── Global keyframes ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .hover\\:text-primary:hover { color: var(--primary, #f97316) !important; }
      `}</style>
    </main>
  );
}