import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedButton from '@/components/AnimatedButton';
import {
  ArrowRight,
  ExternalLink,
  Zap,
  Layers,
  Shuffle,
  Rocket,
  Gamepad2,
  Globe,
  ChevronRight,
  Star,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

type Tag = 'DeFi' | 'Gaming' | 'DEX' | 'Token Launch' | 'Bridge' | 'On-Chain';

interface DApp {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  tags: Tag[];
  status: 'Live' | 'Coming Soon' | 'Beta';
  features: string[];
  highlight?: string;
  accentColor: string;
}

const dapps: DApp[] = [
  {
    id: 'forge',
    name: 'XelisForge',
    tagline: 'The core hub for XELIS asset creation and trading.',
    description:
      'XelisForge is the central platform for launching, trading, and bridging assets on XELIS. A fully functional DEX lets anyone swap tokens with no intermediaries. The no-code token launcher means launching a token requires zero development experience — just a few clicks.',
    url: 'https://xelisforge.app',
    icon: <Rocket className="h-7 w-7" />,
    tags: ['DeFi', 'DEX', 'Token Launch', 'Bridge'],
    status: 'Live',
    accentColor: '#3b82f6',
    highlight: 'Core Ecosystem Platform',
    features: [
      'Fully functional DEX for XELIS-native token trading',
      'No-code token launcher — deploy with zero coding',
      'Token launchpad for raising liquidity (coming soon)',
      'Cross-chain bridge integration (coming soon)',
    ],
  },
  {
    id: 'dagbox',
    name: 'DAGBox',
    tagline: 'A fully on-chain game proving XELIS smart contracts are production-ready.',
    description:
      'DAGBox is a provably fair, 100% on-chain game built by developer CodeHalo. Players stake on cells, a key cell is chosen via contract-defined randomness, and winners share the reward pool. Every round is sealed by DAG-based rules, meaning outcomes are transparent and trustless by design.',
    url: 'https://dagbox.ai',
    icon: <Gamepad2 className="h-7 w-7" />,
    tags: ['Gaming', 'On-Chain'],
    status: 'Live',
    accentColor: '#10b981',
    highlight: 'First On-Chain Game',
    features: [
      'Players choose from 16 cells per round',
      'Key cell selected by on-chain randomness',
      'Parimutuel reward pool — winners share proportionally',
      'Reward rolls over if no winner',
      'Multi-cell strategies for variable risk/reward',
      'DAG-based sealing rules for dynamic round finalization',
    ],
  },
];

const TAG_COLORS: Record<Tag, string> = {
  DeFi:         'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Gaming:       'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  DEX:          'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  'Token Launch':'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  Bridge:       'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  'On-Chain':   'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
};

const ALL_TAGS: Tag[] = ['DeFi', 'Gaming', 'DEX', 'Token Launch', 'Bridge', 'On-Chain'];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: DApp['status'] }) => {
  const map = {
    Live:         'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
    Beta:         'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300',
    'Coming Soon':'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
  };
  const dot = {
    Live: 'bg-emerald-500',
    Beta: 'bg-yellow-500',
    'Coming Soon': 'bg-gray-400',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${map[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[status]} ${status === 'Live' ? 'animate-pulse' : ''}`} />
      {status}
    </span>
  );
};

const DAppCard = ({ app }: { app: DApp }) => (
  <div className="glass-card flex flex-col h-full bg-white/90 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
    {/* Card header strip */}
    <div
      className="h-1.5 w-full"
      style={{ background: `linear-gradient(90deg, ${app.accentColor}, ${app.accentColor}88)` }}
    />

    <div className="p-6 flex flex-col h-full">
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="p-3 rounded-xl text-white shadow-md"
          style={{ backgroundColor: app.accentColor }}
        >
          {app.icon}
        </div>
        <StatusBadge status={app.status} />
      </div>

      {/* Name + tagline */}
      <div className="mb-1">
        {app.highlight && (
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: app.accentColor }}>
            {app.highlight}
          </p>
        )}
        <h3 className="text-xl font-bold dark:text-white mb-1">{app.name}</h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{app.tagline}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {app.tags.map(tag => (
          <span key={tag} className={`text-xs font-medium px-2 py-0.5 rounded-full ${TAG_COLORS[tag]}`}>
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
        {app.description}
      </p>

      {/* Features */}
      <div className="mb-6 flex-grow">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Key Features</p>
        <ul className="space-y-1.5">
          {app.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm dark:text-gray-300">
              <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: app.accentColor }} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <AnimatedButton
        variant="primary"
        className="w-full justify-center mt-auto"
        onClick={() => window.open(app.url, '_blank')}
      >
        Visit {app.name}
        <ExternalLink className="ml-2 h-4 w-4" />
      </AnimatedButton>
    </div>
  </div>
);

// ─── Submit dApp card ─────────────────────────────────────────────────────────

const SubmitCard = () => (
  <div className="glass-card flex flex-col items-center justify-center text-center bg-white/60 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-10 hover:border-xelis-blue dark:hover:border-xelis-blue transition-colors duration-300 min-h-[320px]">
    <div className="bg-gray-100 dark:bg-white/10 p-4 rounded-full mb-4">
      <Globe className="h-7 w-7 text-gray-400 dark:text-gray-500" />
    </div>
    <h3 className="text-lg font-bold dark:text-white mb-2">Building on XELIS?</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 max-w-xs">
      Launching a dApp on the XELIS Virtual Machine? Get listed in the ecosystem directory.
    </p>
    <AnimatedButton
      variant="secondary"
      onClick={() => window.open('https://discord.gg/xelis', '_blank')}
      className="flex items-center"
    >
      Submit Your Project
      <ArrowRight className="ml-2 h-4 w-4" />
    </AnimatedButton>
  </div>
);

// ─── Stats bar ────────────────────────────────────────────────────────────────

const stats = [
  { label: 'Live dApps',      value: '2',        icon: <Layers className="h-5 w-5" /> },
  { label: 'Smart Contracts', value: 'XVM-Powered', icon: <Zap className="h-5 w-5" /> },
  { label: 'DEX + Gaming',    value: 'Real Usage',  icon: <Shuffle className="h-5 w-5" /> },
  { label: 'Ecosystem Stage', value: 'Growing',     icon: <Star className="h-5 w-5" /> },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const Ecosystem = () => {
  const [activeFilter, setActiveFilter] = useState<Tag | 'All'>('All');

  const filtered = activeFilter === 'All'
    ? dapps
    : dapps.filter(d => d.tags.includes(activeFilter));

  return (
    <div className="min-h-screen flex flex-col dark:bg-black">
      <Navbar />

      <main className="flex-grow pt-24">

        {/* ── Hero ── */}
        <section className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-xelis-blue text-black text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
  XELIS Virtual Machine
</span>
            <h1 className="text-4xl md:text-6xl font-extrabold dark:text-white mb-5 leading-tight tracking-tight">
              The XELIS<br className="hidden md:block" /> Ecosystem
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              A growing suite of decentralized applications built on the XELIS smart contract platform and XVM. Every dApp here runs natively on-chain, inheriting XELIS's privacy, speed, and BlockDAG architecture.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <AnimatedButton
                onClick={() => window.open('https://docs.xelis.io', '_blank')}
                className="flex items-center"
              >
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
              <AnimatedButton
                variant="secondary"
                onClick={() => window.open('https://github.com/xelis-project', '_blank')}
                className="flex items-center"
              >
                View on GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="container mx-auto px-4 pb-10">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="glass-card bg-white/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl p-4 flex flex-col items-center text-center shadow-sm"
              >
                <div className="text-xelis-blue mb-2">{s.icon}</div>
                <p className="text-lg font-bold dark:text-white leading-tight">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── dApp Grid ── */}
        <section className="container mx-auto px-4 py-10 bg-gray-50 dark:bg-black rounded-3xl mb-6">
          <div className="max-w-5xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold dark:text-white">
                Live Applications
              </h2>
              {/* Filter pills */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter('All')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                    activeFilter === 'All'
                      ? 'bg-xelis-blue text-white border-xelis-blue'
                      : 'border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:border-xelis-blue hover:text-xelis-blue'
                  }`}
                >
                  All
                </button>
                {ALL_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                      activeFilter === tag
                        ? 'bg-xelis-blue text-white border-xelis-blue'
                        : 'border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:border-xelis-blue hover:text-xelis-blue'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map(app => (
                <DAppCard key={app.id} app={app} />
              ))}
              <SubmitCard />
            </div>
          </div>
        </section>

        {/* ── Build on XELIS CTA ── */}
        <section className="container mx-auto px-4 py-12 md:py-16 mb-12">
          <div className="max-w-4xl mx-auto glass-card bg-white/90 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <div className="inline-flex items-center justify-center bg-xelis-blue/10 p-4 rounded-full mb-6">
              <Zap className="h-8 w-8 text-xelis-blue" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white mb-4">
              Ready to Build?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
              The XELIS Virtual Machine gives developers a powerful, privacy-native environment for building smart contracts and decentralized applications. Full documentation, a developer playground, and an active community are waiting for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <AnimatedButton
                onClick={() => window.open('https://docs.xelis.io', '_blank')}
                className="flex items-center"
              >
                Read the Docs
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
              <AnimatedButton
                variant="secondary"
                onClick={() => window.open('https://playground.xelis.io', '_blank')}
                className="flex items-center"
              >
                Developer Playground
                <ExternalLink className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Ecosystem;