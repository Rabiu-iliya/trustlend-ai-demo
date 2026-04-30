import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Brain, Shield, Coins, BadgeCheck, ArrowRight, Sparkles, Lock,
  TrendingUp, CheckCircle2, Loader2, Wallet, Activity, Users, AlertTriangle, Zap
} from "lucide-react";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Nav = () => (
  <nav className="fixed top-0 inset-x-0 z-50 glass">
    <div className="container flex h-16 items-center justify-between">
      <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-primary shadow-glow flex items-center justify-center">
          <Shield className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg">TrustLend<span className="text-gradient">AI</span></span>
      </button>
      <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
        <button onClick={() => scrollTo("demo")} className="hover:text-foreground transition-colors">Demo</button>
        <button onClick={() => scrollTo("dashboard")} className="hover:text-foreground transition-colors">Dashboard</button>
        <button onClick={() => scrollTo("loan")} className="hover:text-foreground transition-colors">Loan</button>
        <button onClick={() => scrollTo("privacy")} className="hover:text-foreground transition-colors">Privacy</button>
      </div>
      <Button size="sm" onClick={() => scrollTo("demo")} className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0">
        Try Demo
      </Button>
    </div>
  </nav>
);

const Hero = () => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-16">
    <div className="absolute inset-0 grid-bg opacity-40" />
    <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float" />
    <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

    <div className="container relative z-10 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs">
          <Sparkles className="h-3 w-3 text-primary-glow" />
          <span className="text-muted-foreground">AI-Powered Confidential Lending</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          Access Credit Through<br />
          <span className="text-gradient">Reputation</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-powered, privacy-preserving lending for the next billion users.
          No collateral. No banks. Just your trust score.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button size="lg" onClick={() => scrollTo("demo")} className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow">
            Try Demo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo("privacy")} className="glass border-border">
            <Lock className="mr-2 h-4 w-4" /> How It Works
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16 max-w-3xl mx-auto">
          {[
            { icon: Brain, label: "AI Credit Scoring" },
            { icon: Shield, label: "Confidential Risk" },
            { icon: Coins, label: "DeFi Microloans" },
            { icon: BadgeCheck, label: "Tokenized Reputation" },
          ].map((f) => (
            <div key={f.label} className="glass rounded-xl p-4 hover:shadow-glow transition-all hover:-translate-y-1">
              <f.icon className="h-6 w-6 text-primary-glow mb-2 mx-auto" />
              <p className="text-sm font-medium">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

type AnalysisResult = { score: number; risk: string; eligible: number };

const DemoSection = ({ onAnalyzed }: { onAnalyzed: (r: AnalysisResult) => void }) => {
  const [form, setForm] = useState({ name: "Amina", income: "450", activity: "Small grocery shop, 3 years" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const breakdown = [
    { label: "Income Stability", value: 30, color: "from-primary to-primary-glow" },
    { label: "Transaction Behavior", value: 25, color: "from-primary-glow to-accent" },
    { label: "Community Trust", value: 20, color: "from-accent to-primary-glow" },
    { label: "Risk Signals", value: 25, color: "from-primary to-accent" },
  ];

  const analyze = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const r = { score: 82, risk: "Low", eligible: 500 };
      setResult(r);
      onAnalyzed(r);
      setLoading(false);
      toast.success("AI analysis complete", { description: "Trust score generated confidentially." });
    }, 2200);
  };

  return (
    <section id="demo" className="py-24 relative">
      <div className="container">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs mb-4">
            <Activity className="h-3 w-3 text-primary-glow" /> Live Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet <span className="text-gradient">Amina</span></h2>
          <p className="text-muted-foreground">A small business owner accessing credit for the first time — powered by her reputation.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-8 shadow-card">
            <h3 className="font-semibold mb-6 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center text-xs font-bold">1</div>
              Applicant Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 bg-secondary/50 border-border" />
              </div>
              <div>
                <Label htmlFor="income">Monthly Income (USD)</Label>
                <Input id="income" value={form.income} onChange={(e) => setForm({ ...form, income: e.target.value })} className="mt-1.5 bg-secondary/50 border-border" />
              </div>
              <div>
                <Label htmlFor="activity">Business Activity</Label>
                <Input id="activity" value={form.activity} onChange={(e) => setForm({ ...form, activity: e.target.value })} className="mt-1.5 bg-secondary/50 border-border" />
              </div>
              <Button onClick={analyze} disabled={loading} className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow">
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing confidentially…</> : <><Brain className="mr-2 h-4 w-4" /> Analyze with AI</>}
              </Button>
            </div>
          </div>

          <div className="glass rounded-2xl p-8 shadow-card relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
            <h3 className="font-semibold mb-6 flex items-center gap-2 relative">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center text-xs font-bold">2</div>
              AI Analysis Result
            </h3>

            {loading && (
              <div className="space-y-4 relative animate-fade-in">
                {["Fetching encrypted data…", "Running confidential AI model…", "Computing trust score…"].map((s, i) => (
                  <div key={s} className="flex items-center gap-3 text-sm text-muted-foreground" style={{ animationDelay: `${i * 0.3}s` }}>
                    <Loader2 className="h-4 w-4 animate-spin text-primary-glow" /> {s}
                  </div>
                ))}
              </div>
            )}

            {!loading && !result && (
              <div className="text-center py-12 text-muted-foreground relative">
                <Brain className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Click "Analyze with AI" to generate Amina's trust profile.</p>
              </div>
            )}

            {result && (
              <div className="space-y-6 relative animate-scale-in">
                <div className="flex items-center justify-between rounded-xl bg-gradient-trust border border-border p-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Trust Score</p>
                    <p className="text-4xl font-bold text-gradient">{result.score}<span className="text-lg text-muted-foreground">/100</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Risk Level</p>
                    <p className="text-2xl font-bold text-success">{result.risk}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Loan Eligible</p>
                    <p className="text-2xl font-bold">${result.eligible}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Zap className="h-3 w-3" /> Score Breakdown
                  </p>
                  {breakdown.map((b) => (
                    <div key={b.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span>{b.label}</span>
                        <span className="text-muted-foreground">{b.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${b.color} rounded-full animate-fill-bar`} style={{ width: `${b.value * 3.33}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={() => scrollTo("dashboard")} variant="outline" className="w-full glass border-border">
                  View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Dashboard = ({ score, bonus }: { score: number; bonus: number }) => {
  const displayScore = score + bonus;
  return (
    <section id="dashboard" className="py-24 relative bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <div className="container">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Reputation <span className="text-gradient">Dashboard</span></h2>
          <p className="text-muted-foreground">Track your trust score, active loans and repayment — all in one place.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground">A</div>
              <div>
                <p className="font-semibold">Amina K.</p>
                <p className="text-xs text-muted-foreground">Verified Member</p>
              </div>
            </div>
            <div className="relative rounded-xl bg-gradient-trust border border-border p-5 overflow-hidden">
              {bonus > 0 && (
                <div className="absolute top-2 right-3 text-success font-bold text-sm animate-score-up">+{bonus}</div>
              )}
              <p className="text-xs text-muted-foreground mb-1">Trust Score</p>
              <p className="text-5xl font-bold text-gradient">{displayScore}</p>
              <p className="text-xs text-muted-foreground mt-1">/ 100</p>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Reputation Growth</span>
                <span className="text-success flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +12%</span>
              </div>
              <Progress value={displayScore} className="h-2" />
            </div>
          </div>

          <div className="glass rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold flex items-center gap-2"><Wallet className="h-4 w-4 text-primary-glow" /> Active Loan</p>
              <span className="text-xs rounded-full bg-success/15 text-success px-2 py-0.5">Active</span>
            </div>
            <p className="text-4xl font-bold mb-1">$500</p>
            <p className="text-xs text-muted-foreground mb-5">Issued via smart contract</p>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Repayment Progress</span>
                <span>60%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-gradient-primary rounded-full" style={{ width: "60%" }} />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                {["Paid", "Paid", "Due"].map((s, i) => (
                  <div key={i} className={`rounded-lg border border-border p-2 text-xs ${s === "Paid" ? "bg-success/10 text-success" : "text-muted-foreground"}`}>
                    <p className="font-semibold">Week {i + 1}</p>
                    <p>{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 shadow-card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-neon opacity-10" />
            <div className="relative">
              <p className="font-semibold mb-4 flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-primary-glow" /> Trust ID Card</p>
              <div className="rounded-xl p-5 bg-gradient-to-br from-primary/30 via-accent/20 to-primary-glow/30 border border-primary-glow/30 shadow-neon relative overflow-hidden animate-pulse-glow">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-primary-glow/40 blur-2xl" />
                <div className="relative">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">TrustLend AI</p>
                      <p className="text-xs font-mono mt-1">ID #00123</p>
                    </div>
                    <Shield className="h-6 w-6 text-primary-glow" />
                  </div>
                  <p className="text-xs text-muted-foreground">Score</p>
                  <p className="text-3xl font-bold">{displayScore}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Amina K.</span>
                    <span className="text-xs rounded-full bg-success/20 text-success px-2 py-0.5 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-3 text-center">Soulbound reputation NFT (simulated)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
    <section id="loan" className="py-24">
      <div className="container">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Loan <span className="text-gradient">Simulation</span></h2>
          <p className="text-muted-foreground">Transparent terms. Instant approval. Fully simulated smart contract.</p>
        </div>

        <div className="max-w-3xl mx-auto glass rounded-2xl p-8 shadow-card">
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl bg-secondary/50 border border-border p-4">
              <p className="text-xs text-muted-foreground">Loan Amount</p>
              <p className="text-2xl font-bold">$500</p>
            </div>
            <div className="rounded-xl bg-secondary/50 border border-border p-4">
              <p className="text-xs text-muted-foreground">Interest Rate</p>
              <p className="text-2xl font-bold">4.5%</p>
            </div>
            <div className="rounded-xl bg-secondary/50 border border-border p-4">
              <p className="text-xs text-muted-foreground">Term</p>
              <p className="text-2xl font-bold">3 weeks</p>
            </div>
          </div>

          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Repayment Schedule</p>
          <div className="space-y-2 mb-6">
            {schedule.map((s) => (
              <div key={s.week} className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm">Week {s.week}</span>
                <span className="text-sm font-semibold">${s.amount}</span>
                <span className={`text-xs rounded-full px-2 py-0.5 ${s.status === "Paid" ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground"}`}>{s.status}</span>
              </div>
            ))}
          </div>

          {!approved ? (
            <Button onClick={approve} size="lg" className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 shadow-glow">
              <Coins className="mr-2 h-4 w-4" /> Approve Loan
            </Button>
          ) : (
            <div className="rounded-xl bg-success/10 border border-success/30 p-5 flex items-center gap-4 animate-scale-in">
              <CheckCircle2 className="h-10 w-10 text-success shrink-0" />
              <div>
                <p className="font-semibold text-success">Loan issued via smart contract</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">tx: 0x8f3a…e19b (simulated)</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Privacy = () => (
  <section id="privacy" className="py-24 relative">
    <div className="absolute inset-0 grid-bg opacity-30" />
    <div className="container relative">
      <div className="max-w-4xl mx-auto glass rounded-3xl p-10 md:p-14 shadow-card text-center">
        <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-primary shadow-glow items-center justify-center mb-6">
          <Lock className="h-7 w-7 text-primary-foreground" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Privacy <span className="text-gradient">First</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
          User data is processed using confidential compute — your income, transactions and identity
          are encrypted end-to-end and never exposed, even during AI analysis.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Lock, title: "Encrypted Data", desc: "All inputs sealed in TEEs" },
            { icon: Brain, title: "Private AI", desc: "Scoring runs on encrypted data" },
            { icon: Users, title: "Zero Leakage", desc: "Nothing exposed to operators" },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-border p-5 bg-secondary/30">
              <f.icon className="h-5 w-5 text-primary-glow mb-2 mx-auto" />
              <p className="font-semibold text-sm">{f.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border py-10">
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

const Index = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [repaidBonus, setRepaidBonus] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <DemoSection onAnalyzed={setResult} />
      <Dashboard score={result?.score ?? 82} bonus={repaidBonus} />
      <LoanSection onApproved={() => setTimeout(() => setRepaidBonus(5), 600)} />
      <Privacy />
      <Footer />
    </div>
  );
};

export default Index;
