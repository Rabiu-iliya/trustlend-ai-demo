import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useReveal } from "@/hooks/use-reveal";
import {
  Brain, Shield, Coins, BadgeCheck, ArrowRight, Sparkles, Lock,
  TrendingUp, CheckCircle2, Loader2, Wallet, Activity, Users, AlertTriangle, Zap,
  Globe, Fingerprint, LineChart, ShieldCheck, Cpu, KeyRound
} from "lucide-react";
import { processInTEE, type TEEResult } from "@/lib/noxTEE";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

/* ------------------------ Reveal wrapper ------------------------ */
const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

/* ------------------------ Animated counter ------------------------ */
const Counter = ({ to, suffix = "", duration = 1200 }: { to: number; suffix?: string; duration?: number }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

/* ------------------------ Nav ------------------------ */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass shadow-card" : "bg-transparent"}`}>
      <div className="container flex h-16 items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary shadow-glow flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight">TrustLend<span className="text-gradient">AI</span></span>
        </button>
        <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {[
            { id: "problem", label: "Problem" },
            { id: "demo", label: "Demo" },
            { id: "dashboard", label: "Dashboard" },
            { id: "loan", label: "Loan" },
            { id: "privacy", label: "Privacy" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="relative hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gradient-to-r after:from-primary after:to-accent hover:after:w-full after:transition-all after:duration-300"
            >
              {l.label}
            </button>
          ))}
        </div>
        <Button size="sm" onClick={() => scrollTo("demo")} className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow">
          Try Demo
        </Button>
      </div>
    </nav>
  );
};

/* ------------------------ Hero ------------------------ */
const Hero = () => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-16 noise">
    <div className="absolute inset-0 grid-bg opacity-40" />
    <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float" />
    <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary-glow/10 blur-3xl" />

    <div className="container relative z-10 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-glow opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-glow" />
          </span>
          <span className="text-muted-foreground">Live Hackathon Demo · AI × Confidential Compute × DeFi</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          Credit built on<br />
          <span className="text-gradient animate-gradient-shift inline-block">Reputation,</span><br />
          not collateral.
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          TrustLend AI brings privacy-preserving credit to the next billion users.
          Your trust score, computed confidentially — unlocked on-chain.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 animate-fade-in-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
          <Button size="lg" onClick={() => scrollTo("demo")} className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow group">
            Start the Demo <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo("problem")} className="glass border-border hover:bg-secondary/50">
            <Lock className="mr-2 h-4 w-4" /> How It Works
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16 max-w-3xl mx-auto">
          {[
            { icon: Brain, label: "AI Credit Scoring", delay: 600 },
            { icon: Shield, label: "Confidential Risk", delay: 700 },
            { icon: Coins, label: "DeFi Microloans", delay: 800 },
            { icon: BadgeCheck, label: "Soulbound Reputation", delay: 900 },
          ].map((f) => (
            <div
              key={f.label}
              className="glass rounded-xl p-4 hover:shadow-glow transition-all hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${f.delay}ms`, opacity: 0 }}
            >
              <f.icon className="h-6 w-6 text-primary-glow mb-2 mx-auto" />
              <p className="text-sm font-medium">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float text-muted-foreground text-xs tracking-widest opacity-60">
      SCROLL ↓
    </div>
  </section>
);

/* ------------------------ Problem / Storytelling ------------------------ */
const Problem = () => {
  const stats = [
    { value: 1700, suffix: "M+", label: "Adults globally excluded from credit", icon: Globe },
    { value: 73, suffix: "%", label: "Lack a formal credit history", icon: LineChart },
    { value: 0, suffix: "", label: "Banks that protect their private data", icon: Lock },
  ];
  return (
    <section id="problem" className="py-28 relative">
      <div className="container">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-4">The Problem</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            1.7 billion people are <span className="text-gradient">invisible</span> to banks.
          </h2>
          <p className="text-muted-foreground mt-5 text-lg">
            Not because they're unreliable — but because legacy systems can't see them.
            We rebuilt credit from first principles.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <div className="gradient-border p-[1px] h-full">
                <div className="bg-card rounded-[calc(var(--radius)-1px)] p-7 h-full">
                  <s.icon className="h-5 w-5 text-primary-glow mb-6" />
                  <p className="text-5xl font-bold tracking-tight animate-count-up">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Flow diagram */}
        <Reveal delay={300} className="mt-20 max-w-5xl mx-auto">
          <div className="glass rounded-2xl p-6 md:p-10">
            <p className="eyebrow mb-6">The TrustLend Flow</p>
            <div className="grid md:grid-cols-4 gap-4 relative">
              {[
                { step: "01", icon: Fingerprint, title: "Submit", desc: "Encrypted application" },
                { step: "02", icon: Brain, title: "Analyze", desc: "Confidential AI scoring" },
                { step: "03", icon: BadgeCheck, title: "Mint", desc: "Soulbound Trust ID" },
                { step: "04", icon: Coins, title: "Borrow", desc: "On-chain microloan" },
              ].map((f, i) => (
                <div key={f.step} className="relative">
                  <div className="rounded-xl bg-secondary/40 border border-border p-5 hover:border-primary-glow/40 hover:-translate-y-1 transition-all">
                    <p className="text-xs font-mono text-primary-glow">{f.step}</p>
                    <f.icon className="h-6 w-6 mt-3 text-primary-glow" />
                    <p className="font-semibold mt-3">{f.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                  </div>
                  {i < 3 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 h-4 w-4 text-primary-glow/60 z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ------------------------ Demo ------------------------ */
type AnalysisResult = { score: number; risk: string; eligible: number; attestation?: TEEResult["attestation"] };

const DemoSection = ({ onAnalyzed }: { onAnalyzed: (r: AnalysisResult) => void }) => {
  const [form, setForm] = useState({ name: "Amina", income: "450", activity: "Small grocery shop, 3 years" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [stepIdx, setStepIdx] = useState(0);

  const steps = [
    "Encrypting inputs on device…",
    "Sealing data inside Nox TEE enclave…",
    "Running confidential AI model…",
    "Generating attestation & trust score…",
  ];

  const breakdown = [
    { label: "Income Stability", value: 30, color: "from-primary to-primary-glow" },
    { label: "Transaction Behavior", value: 25, color: "from-primary-glow to-accent" },
    { label: "Community Trust", value: 20, color: "from-accent to-primary-glow" },
    { label: "Risk Signals", value: 25, color: "from-primary to-accent" },
  ];

  const analyze = async () => {
    setLoading(true);
    setResult(null);
    setStepIdx(0);
    const stepInterval = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, steps.length - 1));
    }, 550);
    // Nox Protocol TEE confidential compute (simulated)
    const [tee] = await Promise.all([
      processInTEE(form),
      new Promise((r) => setTimeout(r, 2400)),
    ]);
    clearInterval(stepInterval);
    const r: AnalysisResult = {
      score: tee.trustScore,
      risk: tee.risk,
      eligible: 500,
      attestation: tee.attestation,
    };
    setResult(r);
    onAnalyzed(r);
    setLoading(false);
    toast.success("AI analysis complete", { description: "Trust score generated inside Nox TEE." });
  };

  return (
    <section id="demo" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="container relative">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Chapter 01 · The Applicant</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Meet <span className="text-gradient">Amina</span>.
          </h2>
          <p className="text-muted-foreground text-lg">
            A small business owner in Nairobi. Three years of reliable trade.
            Zero credit history. Today, that changes.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Reveal>
            <div className="glass rounded-2xl p-8 shadow-card h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center text-xs font-bold shadow-glow">1</div>
                <div>
                  <h3 className="font-semibold">Applicant Information</h3>
                  <p className="text-xs text-muted-foreground">Encrypted before leaving the device</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 bg-secondary/50 border-border focus:border-primary-glow transition-colors" />
                </div>
                <div>
                  <Label htmlFor="income">Monthly Income (USD)</Label>
                  <Input id="income" value={form.income} onChange={(e) => setForm({ ...form, income: e.target.value })} className="mt-1.5 bg-secondary/50 border-border focus:border-primary-glow transition-colors" />
                </div>
                <div>
                  <Label htmlFor="activity">Business Activity</Label>
                  <Input id="activity" value={form.activity} onChange={(e) => setForm({ ...form, activity: e.target.value })} className="mt-1.5 bg-secondary/50 border-border focus:border-primary-glow transition-colors" />
                </div>
                <Button onClick={analyze} disabled={loading} className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow h-11">
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing confidentially…</>
                  ) : (
                    <><Brain className="mr-2 h-4 w-4" /> Analyze with AI</>
                  )}
                </Button>
                <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5 pt-1">
                  <Lock className="h-3 w-3" /> End-to-end encrypted in a Trusted Execution Environment
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="glass rounded-2xl p-8 shadow-card relative overflow-hidden h-full">
              <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
              {loading && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-glow to-transparent animate-scan-line" />
              )}

              <div className="flex items-center gap-3 mb-6 relative">
                <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center text-xs font-bold shadow-glow">2</div>
                <div>
                  <h3 className="font-semibold">AI Analysis Result</h3>
                  <p className="text-xs text-muted-foreground">Runs on encrypted inputs — never decrypted</p>
                </div>
              </div>

              {loading && (
                <div className="space-y-3 relative">
                  {steps.map((s, i) => {
                    const state = i < stepIdx ? "done" : i === stepIdx ? "active" : "pending";
                    return (
                      <div
                        key={s}
                        className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                          state === "pending" ? "opacity-30" : "opacity-100"
                        }`}
                      >
                        {state === "done" ? (
                          <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                        ) : state === "active" ? (
                          <Loader2 className="h-4 w-4 animate-spin text-primary-glow shrink-0" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-border shrink-0" />
                        )}
                        <span className={state === "active" ? "text-foreground" : "text-muted-foreground"}>{s}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {!loading && !result && (
                <div className="text-center py-14 text-muted-foreground relative">
                  <div className="relative inline-block">
                    <Brain className="h-14 w-14 mx-auto mb-3 opacity-40" />
                    <div className="absolute inset-0 animate-pulse-glow rounded-full" />
                  </div>
                  <p className="text-sm">Click <span className="text-foreground font-medium">Analyze with AI</span> to generate Amina's trust profile.</p>
                </div>
              )}

              {result && (
                <div className="space-y-5 relative animate-scale-in">
                  <div className="flex items-center justify-between rounded-xl bg-gradient-trust border border-primary-glow/30 p-5">
                    <div>
                      <p className="text-xs text-muted-foreground">Trust Score</p>
                      <p className="text-5xl font-bold text-gradient">
                        <Counter to={result.score} />
                        <span className="text-lg text-muted-foreground">/100</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Risk Level</p>
                      <p className="text-2xl font-bold text-success">{result.risk}</p>
                    </div>
                  </div>

                  {/* Nox TEE attestation badge */}
                  <div className="rounded-xl border border-primary-glow/30 bg-primary/5 p-3 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0 shadow-glow">
                      <ShieldCheck className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold flex items-center gap-1.5">
                        🔒 Processed in TEE <span className="text-primary-glow">· Nox Protocol</span>
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono truncate">
                        enclave {result.attestation?.enclave} · att {result.attestation?.hash}
                      </p>
                    </div>
                    <span className="text-[10px] rounded-full bg-success/15 text-success px-2 py-0.5 shrink-0">Verified</span>
                  </div>

                  <p className="text-[11px] text-muted-foreground italic text-center">
                    This score was generated using privacy-preserving AI inside a confidential compute environment.
                  </p>
                  <div className="rounded-xl border border-border p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Loan Eligible</p>
                      <p className="text-2xl font-bold">$<Counter to={result.eligible} /></p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>

                  <div className="space-y-3 pt-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Zap className="h-3 w-3" /> Score Breakdown
                    </p>
                    {breakdown.map((b, i) => (
                      <div key={b.label} style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span>{b.label}</span>
                          <span className="text-muted-foreground">{b.value}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden relative">
                          <div
                            className={`h-full bg-gradient-to-r ${b.color} rounded-full animate-fill-bar relative`}
                            style={{ width: `${b.value * 3.33}%`, animationDelay: `${i * 120}ms` }}
                          >
                            <div className="absolute inset-0 animate-shimmer" />
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
                  <Button onClick={() => scrollTo("dashboard")} variant="outline" className="w-full glass border-border group">
                    View Dashboard <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ------------------------ Dashboard ------------------------ */
const Dashboard = ({ score, bonus }: { score: number; bonus: number }) => {
  const displayScore = score + bonus;
  return (
    <section id="dashboard" className="py-28 relative bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <div className="container">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Chapter 02 · The Reputation</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Her reputation is <span className="text-gradient">hers</span>.
          </h2>
          <p className="text-muted-foreground text-lg">
            Portable across platforms. Owned by Amina. Unforgeable on-chain.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Reveal>
            <div className="glass rounded-2xl p-6 shadow-card h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground shadow-glow">A</div>
                <div>
                  <p className="font-semibold">Amina K.</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-success" /> Verified Member
                  </p>
                </div>
              </div>
              <div className="relative rounded-xl bg-gradient-trust border border-primary-glow/30 p-5 overflow-hidden">
                <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                {bonus > 0 && (
                  <div className="absolute top-2 right-3 text-success font-bold text-sm animate-score-up">+{bonus}</div>
                )}
                <p className="text-xs text-muted-foreground mb-1">Trust Score</p>
                <p className="text-6xl font-bold text-gradient leading-none">
                  <Counter to={displayScore} />
                </p>
                <p className="text-xs text-muted-foreground mt-2">/ 100</p>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Reputation Growth</span>
                  <span className="text-success flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +12%</span>
                </div>
                <Progress value={displayScore} className="h-2" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass rounded-2xl p-6 shadow-card h-full">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold flex items-center gap-2"><Wallet className="h-4 w-4 text-primary-glow" /> Active Loan</p>
                <span className="text-xs rounded-full bg-success/15 text-success px-2 py-0.5 flex items-center gap-1">
                  <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" /></span>
                  Active
                </span>
              </div>
              <p className="text-5xl font-bold mb-1">$<Counter to={500} /></p>
              <p className="text-xs text-muted-foreground mb-5">Issued via smart contract</p>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Repayment Progress</span>
                  <span className="font-mono">60%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden relative">
                  <div className="h-full bg-gradient-primary rounded-full relative" style={{ width: "60%" }}>
                    <div className="absolute inset-0 animate-shimmer" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  {["Paid", "Paid", "Due"].map((s, i) => (
                    <div key={i} className={`rounded-lg border p-2 text-xs transition-all ${s === "Paid" ? "bg-success/10 text-success border-success/30" : "text-muted-foreground border-border"}`}>
                      <p className="font-semibold">Week {i + 1}</p>
                      <p>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="glass rounded-2xl p-6 shadow-card relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-neon opacity-10" />
              <div className="relative">
                <p className="font-semibold mb-4 flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-primary-glow" /> Trust ID Card</p>
                <div className="rounded-xl p-5 bg-gradient-to-br from-primary/30 via-accent/20 to-primary-glow/30 border border-primary-glow/40 shadow-neon relative overflow-hidden animate-pulse-glow">
                  <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-primary-glow/40 blur-2xl" />
                  <div className="absolute inset-0 grid-bg opacity-20" />
                  <div className="relative">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">TrustLend AI</p>
                        <p className="text-xs font-mono mt-1">ID #00123</p>
                      </div>
                      <Shield className="h-6 w-6 text-primary-glow" />
                    </div>
                    <p className="text-xs text-muted-foreground">Score</p>
                    <p className="text-3xl font-bold"><Counter to={displayScore} /></p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Amina K.</span>
                      <span className="text-xs rounded-full bg-success/20 text-success px-2 py-0.5 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-3 text-center font-mono">⎯ Soulbound reputation NFT (simulated) ⎯</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ------------------------ Loan ------------------------ */
const LoanSection = ({ onApproved }: { onApproved: () => void }) => {
  const [approved, setApproved] = useState(false);
  const schedule = [
    { week: 1, amount: 175, status: "Paid" },
    { week: 2, amount: 175, status: "Paid" },
    { week: 3, amount: 175, status: "Due" },
  ];

  const approve = () => {
    setApproved(true);
    onApproved();
    toast.success("Loan issued via smart contract", { description: "Simulated on-chain transaction complete." });
  };

  return (
    <section id="loan" className="py-28">
      <div className="container">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Chapter 03 · The Loan</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Capital, <span className="text-gradient">unlocked</span>.
          </h2>
          <p className="text-muted-foreground text-lg">
            Transparent terms. Instant approval. Zero intermediaries.
          </p>
        </Reveal>

        <Reveal>
          <div className="max-w-3xl mx-auto glass rounded-2xl p-8 md:p-10 shadow-card relative overflow-hidden">
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
            <div className="grid md:grid-cols-3 gap-4 mb-8 relative">
              {[
                { label: "Loan Amount", value: "$500" },
                { label: "Interest Rate", value: "4.5%" },
                { label: "Term", value: "3 weeks" },
              ].map((t, i) => (
                <div key={t.label} className="rounded-xl bg-secondary/50 border border-border p-4 hover:border-primary-glow/40 transition-colors" style={{ animationDelay: `${i * 100}ms` }}>
                  <p className="text-xs text-muted-foreground">{t.label}</p>
                  <p className="text-3xl font-bold mt-1">{t.value}</p>
                </div>
              ))}
            </div>

            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Repayment Schedule</p>
            <div className="space-y-2 mb-6">
              {schedule.map((s) => (
                <div key={s.week} className="flex items-center justify-between rounded-lg border border-border p-3 hover:border-primary-glow/30 transition-colors">
                  <span className="text-sm flex items-center gap-2">
                    {s.status === "Paid" ? <CheckCircle2 className="h-4 w-4 text-success" /> : <div className="h-4 w-4 rounded-full border border-muted-foreground" />}
                    Week {s.week}
                  </span>
                  <span className="text-sm font-semibold font-mono">${s.amount}</span>
                  <span className={`text-xs rounded-full px-2 py-0.5 ${s.status === "Paid" ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground"}`}>{s.status}</span>
                </div>
              ))}
            </div>

            {!approved ? (
              <Button onClick={approve} size="lg" className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow h-12 group">
                <Coins className="mr-2 h-4 w-4" /> Approve Loan
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <div className="rounded-xl bg-success/10 border border-success/30 p-5 flex items-center gap-4 animate-scale-in">
                <div className="relative">
                  <CheckCircle2 className="h-10 w-10 text-success shrink-0" />
                  <div className="absolute inset-0 rounded-full bg-success/30 blur-xl animate-pulse" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-success">Loan issued via smart contract</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1 truncate">tx: 0x8f3a…e19b · block #18472911 (simulated)</p>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ------------------------ Privacy ------------------------ */
const Privacy = () => (
  <section id="privacy" className="py-28 relative overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-30" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary-glow/10 blur-3xl" />
    <div className="container relative">
      <Reveal>
        <div className="max-w-4xl mx-auto gradient-border p-[1px]">
          <div className="bg-card/80 backdrop-blur-xl rounded-[calc(var(--radius)-1px)] p-10 md:p-14 text-center">
            <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-primary shadow-glow items-center justify-center mb-6 animate-pulse-glow">
              <Lock className="h-7 w-7 text-primary-foreground" />
            </div>
            <p className="eyebrow justify-center mb-4">Chapter 04 · The Guarantee</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Privacy, by <span className="text-gradient">design</span>.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
              Income, transactions and identity are sealed in Trusted Execution Environments.
              Even our AI never sees the raw data — only the score.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Lock, title: "Encrypted Data", desc: "All inputs sealed in TEEs" },
                { icon: Brain, title: "Private AI", desc: "Scoring runs on encrypted data" },
                { icon: Users, title: "Zero Leakage", desc: "Nothing exposed to operators" },
              ].map((f, i) => (
                <Reveal key={f.title} delay={i * 120}>
                  <div className="rounded-xl border border-border p-5 bg-secondary/30 hover:bg-secondary/50 hover:-translate-y-1 transition-all h-full">
                    <f.icon className="h-5 w-5 text-primary-glow mb-2 mx-auto" />
                    <p className="font-semibold text-sm">{f.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Closing CTA */}
      <Reveal delay={200} className="text-center mt-20 max-w-2xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          The future of credit is <span className="text-gradient">open</span>.
        </h3>
        <p className="text-muted-foreground mb-6">Experience the demo from the top — in under 60 seconds.</p>
        <Button size="lg" onClick={() => scrollTo("demo")} className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow">
          Run the Demo Again <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Reveal>
    </div>
  </section>
);

/* ------------------------ Footer ------------------------ */
const Footer = () => (
  <footer className="border-t border-border py-10 relative">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded bg-gradient-primary flex items-center justify-center">
          <Shield className="h-3 w-3 text-primary-foreground" />
        </div>
        <span>© 2026 TrustLend AI — Hackathon MVP</span>
      </div>
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-3 w-3" />
        <span>Demo only. All transactions simulated.</span>
      </div>
    </div>
  </footer>
);

/* ------------------------ Page ------------------------ */
const Index = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [repaidBonus, setRepaidBonus] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Problem />
      <DemoSection onAnalyzed={setResult} />
      <Dashboard score={result?.score ?? 82} bonus={repaidBonus} />
      <LoanSection onApproved={() => setTimeout(() => setRepaidBonus(5), 600)} />
      <Privacy />
      <Footer />
    </div>
  );
};

export default Index;
