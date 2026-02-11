'use client'

import { useState } from 'react'

// All projects from ~/clawd/
const projects = [
  // === ACTIVE / CURRENT ===
  {
    id: 'morgen-agency',
    name: 'morgen.agency',
    description: 'AI-native marketing agency voor kleine webshops - LIVE',
    status: 'active',
    category: 'OpenClaw Agency',
    url: 'https://morgen-agency.vercel.app',
    folder: '~/clawd/morgen-agency/',
    updatedAt: '2026-02-11',
  },
  {
    id: 'ai-agency',
    name: 'OpenClaw Agency Docs',
    description: 'Propositie, Brandbook, Planning voor de agency',
    status: 'active',
    category: 'OpenClaw Agency',
    files: ['PROPOSITIE.md', 'BRANDBOOK.md', 'PLAN.md'],
    folder: '~/clawd/ai-agency/',
    updatedAt: '2026-02-11',
  },
  {
    id: 'nodefy-openclawd',
    name: 'OpenClaw Dashboard',
    description: 'Dit dashboard - project overzicht',
    status: 'active',
    category: 'Internal Tools',
    url: 'https://nodefy-openclawd.vercel.app',
    folder: '~/clawd/nodefy-openclawd/',
    updatedAt: '2026-02-11',
  },
  {
    id: 'tracking-health-checker',
    name: 'Tracking Health Checker',
    description: 'Server-side tracking scanner tool',
    status: 'blocked',
    category: 'Lead Gen Tools',
    folder: '~/clawd/tracking-health-checker/',
    updatedAt: '2026-02-09',
  },
  {
    id: 'nodefy-clients',
    name: 'Client Overview',
    description: '48 klanten geanalyseerd en gecategoriseerd',
    status: 'done',
    category: 'Nodefy Internal',
    files: ['COMPLEET-OVERZICHT.md', 'ECOMMERCE.md', 'UPSELL-OPPORTUNITIES.md'],
    folder: '~/clawd/nodefy-clients/',
    updatedAt: '2026-02-09',
  },
  {
    id: 'knowledge-base',
    name: 'Knowledge Base',
    description: 'Learnings, frameworks, bronnen monitoring',
    status: 'active',
    category: 'Nodefy Internal',
    folder: '~/clawd/knowledge-base/',
    updatedAt: '2026-02-09',
  },
  {
    id: 'nodefy-sales',
    name: 'Sales Accelerator',
    description: 'LinkedIn content kalender, sales strategie',
    status: 'active',
    category: 'Nodefy Internal',
    folder: '~/clawd/nodefy-sales/',
    updatedAt: '2026-02-07',
  },
  
  // === CLIENT WEBSITES ===
  {
    id: 'fpnp-website',
    name: 'FPNP Website',
    description: 'Client website project',
    status: 'done',
    category: 'Client Websites',
    folder: '~/clawd/fpnp-website/',
    updatedAt: '2026-02-06',
  },
  {
    id: 'foresight-landing',
    name: 'Foresight Landing',
    description: 'Recruitment landing page',
    status: 'done',
    category: 'Client Websites',
    folder: '~/clawd/foresight-landing/',
    updatedAt: '2026-02-05',
  },
  {
    id: 'goldrepublic-landing',
    name: 'GoldRepublic Landing',
    description: 'Landing page project',
    status: 'done',
    category: 'Client Websites',
    folder: '~/clawd/goldrepublic-landing/',
    updatedAt: '2026-02-04',
  },
  {
    id: 'jesse-jewelry',
    name: 'Jesse Jewelry',
    description: 'Jewelry webshop project',
    status: 'done',
    category: 'Client Websites',
    folder: '~/clawd/jesse-jewelry/',
    updatedAt: '2026-02-02',
  },
  {
    id: 'sfi-greenmarkets',
    name: 'SFI Greenmarkets',
    description: 'Green markets website',
    status: 'done',
    category: 'Client Websites',
    folder: '~/clawd/sfi-greenmarkets/',
    updatedAt: '2026-02-01',
  },
  {
    id: 'zinc-website',
    name: 'Zinc Website',
    description: 'Client website',
    status: 'done',
    category: 'Client Websites',
    folder: '~/clawd/zinc-website/',
    updatedAt: '2026-01-31',
  },
  {
    id: 'tolbar-website',
    name: 'Tolbar Website',
    description: 'Client website',
    status: 'done',
    category: 'Client Websites',
    folder: '~/clawd/tolbar-website/',
    updatedAt: '2026-01-31',
  },
  {
    id: 'aperghis-website',
    name: 'Aperghis Website',
    description: 'Client website',
    status: 'done',
    category: 'Client Websites',
    folder: '~/clawd/aperghis-website/',
    updatedAt: '2026-01-31',
  },
  {
    id: 'spark-advertising',
    name: 'Spark Advertising',
    description: 'Advertising agency website',
    status: 'done',
    category: 'Client Websites',
    folder: '~/clawd/spark-advertising/',
    updatedAt: '2026-01-29',
  },
  {
    id: 'capisoft-redesign',
    name: 'Capisoft Redesign',
    description: 'Website redesign project',
    status: 'done',
    category: 'Client Websites',
    folder: '~/clawd/capisoft-redesign/',
    updatedAt: '2026-01-29',
  },
  
  // === LEAD GEN TOOLS ===
  {
    id: 'nodefy-meta-analyzer',
    name: 'Meta Ads Analyzer',
    description: 'Meta Ads analysis tool',
    status: 'done',
    category: 'Lead Gen Tools',
    folder: '~/clawd/nodefy-meta-analyzer/',
    updatedAt: '2026-02-05',
  },
  {
    id: 'meta-ads-analyzer',
    name: 'Meta Ads Analyzer v1',
    description: 'First version of analyzer',
    status: 'archived',
    category: 'Lead Gen Tools',
    folder: '~/clawd/meta-ads-analyzer/',
    updatedAt: '2026-02-05',
  },
  {
    id: 'nodefy-scanner',
    name: 'Nodefy Scanner',
    description: 'Website scanning tool',
    status: 'done',
    category: 'Lead Gen Tools',
    folder: '~/clawd/nodefy-scanner/',
    updatedAt: '2026-01-31',
  },
  {
    id: 'shopify-calculator',
    name: 'Shopify Calculator',
    description: 'Shopify ROI calculator',
    status: 'done',
    category: 'Lead Gen Tools',
    folder: '~/clawd/shopify-calculator/',
    updatedAt: '2026-01-28',
  },
  
  // === NODEFY INTERNAL ===
  {
    id: 'nodefy-scaling',
    name: 'Nodefy Scaling',
    description: 'Scaling strategy & research',
    status: 'done',
    category: 'Nodefy Internal',
    folder: '~/clawd/nodefy-scaling/',
    updatedAt: '2026-01-30',
  },
  {
    id: 'nodefy-2.0',
    name: 'Nodefy 2.0',
    description: 'Nodefy transformation plan',
    status: 'active',
    category: 'Nodefy Internal',
    folder: '~/clawd/nodefy-2.0/',
    updatedAt: '2026-01-28',
  },
  {
    id: 'nodefy-redesign',
    name: 'Nodefy Redesign',
    description: 'Website redesign project',
    status: 'paused',
    category: 'Nodefy Internal',
    folder: '~/clawd/nodefy-redesign/',
    updatedAt: '2026-01-28',
  },
  {
    id: 'nodefy-dashboard',
    name: 'Nodefy Dashboard',
    description: 'Internal dashboard',
    status: 'done',
    category: 'Nodefy Internal',
    folder: '~/clawd/nodefy-dashboard/',
    updatedAt: '2026-02-01',
  },
  {
    id: 'nodefy-client-portal',
    name: 'Client Portal',
    description: 'Nodefy client portal concept',
    status: 'paused',
    category: 'Nodefy Internal',
    folder: '~/clawd/nodefy-client-portal/',
    updatedAt: '2026-02-02',
  },
  {
    id: 'nodefy-linkedin',
    name: 'LinkedIn Content',
    description: 'LinkedIn content planning',
    status: 'active',
    category: 'Nodefy Internal',
    folder: '~/clawd/nodefy-linkedin/',
    updatedAt: '2026-02-03',
  },
  {
    id: 'client-reports',
    name: 'Client Reports',
    description: 'Weekly/monthly client reports',
    status: 'active',
    category: 'Nodefy Internal',
    folder: '~/clawd/client-reports/',
    updatedAt: '2026-02-03',
  },
  {
    id: 'audits',
    name: 'Audit Templates',
    description: 'Google/Meta/Tracking audit templates',
    status: 'done',
    category: 'Nodefy Internal',
    folder: '~/clawd/audits/',
    updatedAt: '2026-02-01',
  },
  
  // === AI / AUTOMATION ===
  {
    id: 'ugc-automation',
    name: 'UGC Automation',
    description: 'AI UGC video platform voor klanten',
    status: 'active',
    category: 'AI Projects',
    folder: '~/clawd/ugc-automation/',
    updatedAt: '2026-02-02',
  },
  {
    id: 'n8n-ai-infrastructure',
    name: 'n8n AI Infrastructure',
    description: 'n8n workflow automation setup',
    status: 'done',
    category: 'AI Projects',
    folder: '~/clawd/n8n-ai-infrastructure/',
    updatedAt: '2026-02-03',
  },
  {
    id: 'n8n-skills-repo',
    name: 'n8n Skills',
    description: 'n8n skill documentation',
    status: 'done',
    category: 'AI Projects',
    folder: '~/clawd/n8n-skills-repo/',
    updatedAt: '2026-02-03',
  },
  {
    id: 'makeugc-research',
    name: 'MakeUGC Research',
    description: 'UGC platform research',
    status: 'done',
    category: 'AI Projects',
    folder: '~/clawd/makeugc-research/',
    updatedAt: '2026-02-03',
  },
  {
    id: 'agents',
    name: 'Space Crew Agents',
    description: '5 specialized AI agents (Houston, Voyager, etc)',
    status: 'done',
    category: 'AI Projects',
    folder: '~/clawd/agents/',
    updatedAt: '2026-02-01',
  },
  
  // === EXPERIMENTS / SIDE PROJECTS ===
  {
    id: 'whoop-dashboard',
    name: 'Whoop Dashboard',
    description: 'Whoop fitness dashboard',
    status: 'done',
    category: 'Experiments',
    folder: '~/clawd/whoop-dashboard/',
    updatedAt: '2026-02-01',
  },
  {
    id: 'polymarket-bot',
    name: 'Polymarket Bot',
    description: 'Polymarket trading bot',
    status: 'done',
    category: 'Experiments',
    folder: '~/clawd/polymarket-bot/',
    updatedAt: '2026-02-01',
  },
  {
    id: 'polymarket-yolo',
    name: 'Polymarket YOLO',
    description: 'Polymarket trading experiment',
    status: 'done',
    category: 'Experiments',
    folder: '~/clawd/polymarket-yolo/',
    updatedAt: '2026-02-01',
  },
  {
    id: 'sol-trader',
    name: 'SOL Trader',
    description: 'Solana trading bot',
    status: 'done',
    category: 'Experiments',
    folder: '~/clawd/sol-trader/',
    updatedAt: '2026-01-31',
  },
  {
    id: 'discofrog-clone',
    name: 'Disco Frog Clone',
    description: 'Interactive website clone',
    status: 'done',
    category: 'Experiments',
    folder: '~/clawd/discofrog-clone/',
    updatedAt: '2026-01-30',
  },
  {
    id: 'screensaver',
    name: 'Moltbot Screensaver',
    description: 'Idle screen with red lobster mascot',
    status: 'done',
    category: 'Experiments',
    folder: '~/clawd/screensaver/',
    updatedAt: '2026-02-02',
  },
  {
    id: 'valentijn',
    name: 'Valentijn',
    description: 'Valentines day project',
    status: 'done',
    category: 'Experiments',
    folder: '~/clawd/valentijn/',
    updatedAt: '2026-02-03',
  },
  {
    id: 'remotion-project',
    name: 'Remotion Project',
    description: 'Video generation with Remotion',
    status: 'done',
    category: 'Experiments',
    folder: '~/clawd/remotion-project/',
    updatedAt: '2026-01-28',
  },
  {
    id: 'blade-master-jobs',
    name: 'Blade Master Jobs',
    description: 'Job board project',
    status: 'done',
    category: 'Experiments',
    folder: '~/clawd/blade-master-jobs/',
    updatedAt: '2026-02-01',
  },
  {
    id: 'mission-control',
    name: 'Mission Control',
    description: 'Control dashboard experiment',
    status: 'done',
    category: 'Experiments',
    folder: '~/clawd/mission-control/',
    updatedAt: '2026-02-01',
  },
  {
    id: 'jewber',
    name: 'Jewber',
    description: 'Jewelry project',
    status: 'paused',
    category: 'Experiments',
    folder: '~/clawd/jewber/',
    updatedAt: '2026-01-29',
  },
  {
    id: 'seo-bulk-network',
    name: 'SEO Bulk Network',
    description: '9 niche sites op Vercel',
    status: 'active',
    category: 'Experiments',
    folder: '~/clawd/seo-bulk-network/',
    updatedAt: '2026-02-02',
  },
  {
    id: 'ajax-kijken',
    name: 'Ajax Kijken',
    description: 'Ajax streaming project',
    status: 'done',
    category: 'Experiments',
    folder: '~/clawd/ajax-kijken/',
    updatedAt: '2026-01-28',
  },
  
  // === SYSTEM / CONFIG ===
  {
    id: 'skills',
    name: 'Skills',
    description: 'OpenClaw skill definitions',
    status: 'active',
    category: 'System',
    folder: '~/clawd/skills/',
    updatedAt: '2026-02-04',
  },
  {
    id: 'memory',
    name: 'Memory',
    description: 'Daily notes and session memory',
    status: 'active',
    category: 'System',
    folder: '~/clawd/memory/',
    updatedAt: '2026-02-11',
  },
  {
    id: 'tasks',
    name: 'Tasks',
    description: 'Todo lists and task tracking',
    status: 'active',
    category: 'System',
    folder: '~/clawd/tasks/',
    updatedAt: '2026-02-03',
  },
]

const categories = [
  'OpenClaw Agency',
  'Nodefy Internal',
  'Lead Gen Tools',
  'Client Websites',
  'AI Projects',
  'Experiments',
  'System',
]

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-teal-500/20 text-teal-400',
    done: 'bg-emerald-500/20 text-emerald-400',
    paused: 'bg-amber-500/20 text-amber-400',
    blocked: 'bg-red-500/20 text-red-400',
    archived: 'bg-zinc-500/20 text-zinc-400',
  }
  const labels: Record<string, string> = {
    active: '● Active',
    done: '✓ Done',
    paused: '◌ Paused',
    blocked: '⊘ Blocked',
    archived: '○ Archived',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.done}`}>
      {labels[status] || status}
    </span>
  )
}

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredProjects = projects.filter(p => {
    const matchesCategory = !selectedCategory || p.category === selectedCategory
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const projectsByCategory = categories.map(cat => ({
    name: cat,
    projects: filteredProjects.filter(p => p.category === cat),
    count: projects.filter(p => p.category === cat).length,
  })).filter(c => c.projects.length > 0)

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    done: projects.filter(p => p.status === 'done').length,
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">OpenClaw Dashboard</h1>
        <p className="text-zinc-500">Nodefy AI Agent Workspace — {stats.total} projects</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8 max-w-md">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="text-2xl font-mono text-white">{stats.total}</div>
          <div className="text-xs text-zinc-500">Total</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="text-2xl font-mono text-teal-400">{stats.active}</div>
          <div className="text-xs text-zinc-500">Active</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="text-2xl font-mono text-emerald-400">{stats.done}</div>
          <div className="text-xs text-zinc-500">Done</div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 w-64"
        />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              !selectedCategory ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selectedCategory === cat ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects by Category */}
      <div className="space-y-8">
        {projectsByCategory.map(category => (
          <section key={category.name}>
            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
              {category.name} ({category.projects.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.projects.map(project => (
                <div
                  key={project.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white">{project.name}</h3>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="text-sm text-zinc-500 mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-3 text-xs text-zinc-600">
                    <span>📁 {project.folder}</span>
                  </div>
                  {project.url && (
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-xs text-teal-400 hover:text-teal-300"
                    >
                      🔗 {project.url.replace('https://', '')}
                    </a>
                  )}
                  <div className="mt-3 text-xs text-zinc-600">
                    Updated: {project.updatedAt}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-zinc-800 text-center text-zinc-600 text-sm">
        OpenClaw Dashboard v2.0 — Nodefy AI Agent
      </footer>
    </main>
  )
}
