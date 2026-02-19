'use client'

import { useState } from 'react'

// ============================================
// OPENCLAW DASHBOARD
// Last Updated: 2026-02-19 09:00
// Nodefy AI Agent Workspace
// ============================================

type Category = 'all' | 'OpenClaw Agency' | 'Nodefy Internal' | 'Lead Gen Tools' | 'Client Websites' | 'AI Projects' | 'Experiments' | 'System'

interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'done' | 'blocked' | 'paused'
  category: Category
  url?: string
  folder: string
  updatedAt: string
}

const projects: Project[] = [
  // === OPENCLAW AGENCY ===
  { id: 'morgen-agency', name: 'morgen.agency', description: 'AI native marketing agency voor kleine webshops - LIVE', status: 'active', category: 'OpenClaw Agency', url: 'https://heymorgen.agency', folder: '~/clawd/morgen-agency/', updatedAt: '2026-02-11' },
  { id: 'agency-docs', name: 'OpenClaw Agency Docs', description: 'Propositie, Brandbook, Planning en meer', status: 'active', category: 'OpenClaw Agency', folder: '~/clawd/ai-agency/', updatedAt: '2026-02-11' },
  
  // === NODEFY INTERNAL ===
  { id: 'client-overview', name: 'Client Overview', description: '48 klanten geanalyseerd en gecategoriseerd', status: 'done', category: 'Nodefy Internal', folder: '~/clawd/nodefy-clients/', updatedAt: '2026-02-09' },
  { id: 'knowledge-base', name: 'Knowledge Base', description: 'Learnings, frameworks, bronnen monitoring', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/knowledge-base/', updatedAt: '2026-02-09' },
  { id: 'sales-accelerator', name: 'Sales Accelerator', description: 'LinkedIn content kalender, sales strategie', status: 'active', category: 'Nodefy Internal', url: 'https://nodefy-sales-dashboard.vercel.app', folder: '~/clawd/nodefy-sales-dashboard/', updatedAt: '2026-02-14' },
  { id: 'nodefy-scaling', name: 'Nodefy Scaling', description: 'Scaling strategy & research', status: 'done', category: 'Nodefy Internal', folder: '~/clawd/nodefy-scaling/', updatedAt: '2026-01-30' },
  { id: 'nodefy-2', name: 'Nodefy 2.0', description: 'Nodefy transformatie plan', status: 'done', category: 'Nodefy Internal', folder: '~/clawd/nodefy-2.0/', updatedAt: '2026-01-28' },
  { id: 'nodefy-redesign', name: 'Nodefy Redesign', description: 'Website redesign project', status: 'paused', category: 'Nodefy Internal', folder: '~/clawd/nodefy-redesign/', updatedAt: '2026-02-08' },
  { id: 'nodefy-dashboard', name: 'Nodefy Dashboard', description: 'Internal dashboard', status: 'done', category: 'Nodefy Internal', folder: '~/clawd/nodefy-dashboard/', updatedAt: '2026-02-10' },
  { id: 'client-portal', name: 'Client Portal', description: 'Nodefy client portal concept', status: 'paused', category: 'Nodefy Internal', folder: '~/clawd/nodefy-client-portal/', updatedAt: '2026-02-08' },
  { id: 'linkedin-content', name: 'LinkedIn Content', description: 'LinkedIn content planning', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/nodefy-linkedin/', updatedAt: '2026-02-05' },
  { id: 'client-reports', name: 'Client Reports', description: 'Weekly/monthly client reports', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/client-reports/', updatedAt: '2026-02-14' },
  { id: 'audit-templates', name: 'Audit Templates', description: 'Google/Meta/Tracking audit templates', status: 'done', category: 'Nodefy Internal', folder: '~/clawd/audits/', updatedAt: '2026-02-10' },
  { id: 'cmmi-dashboard', name: 'CMMI Dashboard', description: 'Nodefy maturity tracking (1.75 → 3.0)', status: 'active', category: 'Nodefy Internal', url: 'https://nodefy-cmmi.vercel.app', folder: '~/clawd/nodefy-cmmi/', updatedAt: '2026-02-14' },
  { id: 'website-content', name: 'Website Content', description: 'Content voor Nodefy website redesign', status: 'done', category: 'Nodefy Internal', folder: '~/clawd/nodefy-website-content/', updatedAt: '2026-02-14' },
  
  // === LEAD GEN TOOLS ===
  { id: 'tracking-checker', name: 'Tracking Health Checker', description: 'Server side tracking scanner tool', status: 'blocked', category: 'Lead Gen Tools', folder: '~/clawd/tracking-health-checker/', updatedAt: '2026-02-14' },
  { id: 'meta-analyzer', name: 'Meta Ads Analyzer', description: 'Meta Ads analyse tool', status: 'done', category: 'Lead Gen Tools', folder: '~/clawd/meta-ads-analyzer/', updatedAt: '2026-02-03' },
  { id: 'meta-analyzer-web', name: 'Meta Ads Analyzer v1', description: 'First version of ad analyzer', status: 'done', category: 'Lead Gen Tools', folder: '~/clawd/meta-ads-analyzer-web/', updatedAt: '2026-02-03' },
  { id: 'nodefy-scanner', name: 'Nodefy Scanner', description: 'Website scanning tool', status: 'done', category: 'Lead Gen Tools', folder: '~/clawd/nodefy-scanner/', updatedAt: '2026-01-28' },
  { id: 'shopify-calc', name: 'Shopify Calculator', description: 'Shopify ROI calculator', status: 'done', category: 'Lead Gen Tools', folder: '~/clawd/shopify-calculator/', updatedAt: '2026-02-05' },
  { id: 'roas-calc', name: 'ROAS Calculator', description: 'ROAS calculation tool', status: 'done', category: 'Lead Gen Tools', folder: '~/clawd/roas-calculator/', updatedAt: '2026-02-14' },
  
  // === CLIENT WEBSITES ===
  { id: 'fpnp', name: 'FPNP Website', description: 'Client website project', status: 'done', category: 'Client Websites', folder: '~/clawd/fpnp-website/', updatedAt: '2026-02-06' },
  { id: 'foresight', name: 'Foresight Landing', description: 'Recruitment landing page', status: 'done', category: 'Client Websites', folder: '~/clawd/foresight-landing/', updatedAt: '2026-02-05' },
  { id: 'goldrepublic', name: 'GoldRepublic Landing', description: 'Landing page project', status: 'done', category: 'Client Websites', folder: '~/clawd/goldrepublic-landing/', updatedAt: '2026-01-28' },
  { id: 'jesse', name: 'Jesse Jewelry', description: 'Jewelry webshop project', status: 'done', category: 'Client Websites', folder: '~/clawd/jesse-jewelry/', updatedAt: '2026-01-25' },
  { id: 'sfi', name: 'SFI Greenmarkets', description: 'Green markets website', status: 'done', category: 'Client Websites', folder: '~/clawd/sfi-greenmarkets/', updatedAt: '2026-01-12' },
  { id: 'zinc', name: 'Zinc Website', description: 'Client website', status: 'done', category: 'Client Websites', folder: '~/clawd/zinc-website/', updatedAt: '2026-01-15' },
  { id: 'tolbar', name: 'Tolbar Website', description: 'Client website', status: 'done', category: 'Client Websites', folder: '~/clawd/tolbar-website/', updatedAt: '2026-01-18' },
  { id: 'aperghis', name: 'Aperghis Website', description: 'Client website', status: 'done', category: 'Client Websites', folder: '~/clawd/aperghis-website/', updatedAt: '2026-02-01' },
  { id: 'spark', name: 'Spark Advertising', description: 'Advertising agency website', status: 'done', category: 'Client Websites', folder: '~/clawd/spark-advertising/', updatedAt: '2026-01-10' },
  { id: 'capisoft', name: 'Capisoft Redesign', description: 'Website redesign', status: 'done', category: 'Client Websites', folder: '~/clawd/capisoft-redesign/', updatedAt: '2026-01-30' },
  { id: 'namam', name: 'NAMAM Website', description: 'Luxury interior design website', status: 'done', category: 'Client Websites', url: 'https://namam-website.vercel.app', folder: '~/clawd/namam-website/', updatedAt: '2026-02-12' },
  { id: 'godelphi', name: 'Go Delphi Website', description: 'Luxury retreat website', status: 'done', category: 'Client Websites', url: 'https://godelphi-website.vercel.app', folder: '~/clawd/godelphi-website/', updatedAt: '2026-02-14' },
  { id: 'lucky', name: 'Lucky Parcel', description: 'Market stall website', status: 'done', category: 'Client Websites', url: 'https://lucky-parcel.vercel.app', folder: '~/clawd/lucky-parcel/', updatedAt: '2026-02-14' },
  { id: 'adapta', name: 'Adapta Clone', description: 'AI recruitment SaaS design', status: 'active', category: 'Client Websites', url: 'https://adapta-clone.vercel.app', folder: '~/clawd/adapta-clone/', updatedAt: '2026-02-14' },
  { id: 'features', name: 'Features Section', description: 'Isometric workflow design', status: 'active', category: 'Client Websites', url: 'https://nodefy-features-section.vercel.app', folder: '~/clawd/nodefy-features-section/', updatedAt: '2026-02-14' },
  
  // === AI PROJECTS ===
  { id: 'ugc', name: 'UGC Automation', description: 'AI UGC video platform voor klanten', status: 'active', category: 'AI Projects', folder: '~/clawd/ugc-automation/', updatedAt: '2026-02-10' },
  { id: 'n8n-infra', name: 'n8n AI Infrastructure', description: 'n8n ai infra automation setup', status: 'done', category: 'AI Projects', folder: '~/clawd/n8n-ai-infrastructure/', updatedAt: '2026-02-08' },
  { id: 'n8n-skills', name: 'n8n Skills', description: 'n8n skill templates/modules', status: 'active', category: 'AI Projects', folder: '~/clawd/n8n-skills-repo/', updatedAt: '2026-02-05' },
  { id: 'makeugc', name: 'MakeUGC Research', description: 'UGC platform research', status: 'done', category: 'AI Projects', folder: '~/clawd/makeugc-research/', updatedAt: '2026-02-08' },
  { id: 'video-analysis', name: 'Video Analysis', description: 'Frame extraction for design reference', status: 'active', category: 'AI Projects', folder: '~/clawd/video-analysis/', updatedAt: '2026-02-14' },
  
  // === EXPERIMENTS ===
  { id: 'whoop', name: 'Whoop Dashboard', description: 'Personal fitness dashboard', status: 'done', category: 'Experiments', folder: '~/clawd/whoop-dashboard/', updatedAt: '2026-02-01' },
  { id: 'polymarket-bot', name: 'Polymarket Bot', description: 'Polymarket trading bot', status: 'done', category: 'Experiments', folder: '~/clawd/polymarket-bot/', updatedAt: '2026-02-01' },
  { id: 'polymarket-yolo', name: 'Polymarket YOLO', description: 'Polymarket trading experiment', status: 'done', category: 'Experiments', folder: '~/clawd/polymarket-yolo/', updatedAt: '2026-01-28' },
  { id: 'sol', name: 'SOL Trader', description: 'Solana trading bot', status: 'done', category: 'Experiments', folder: '~/clawd/sol-trader/', updatedAt: '2026-01-25' },
  { id: 'disco', name: 'Disco Frog Clone', description: 'Interactive website clone', status: 'done', category: 'Experiments', folder: '~/clawd/discofrog-clone/', updatedAt: '2026-02-04' },
  { id: 'screensaver', name: 'Moltbot Screensaver', description: 'Idle screen with red lobster mascot', status: 'done', category: 'Experiments', folder: '~/clawd/screensaver/', updatedAt: '2026-02-04' },
  { id: 'valentijn', name: 'Valentijn', description: 'Video generation with Remotion', status: 'done', category: 'Experiments', folder: '~/clawd/valentijn/', updatedAt: '2026-02-14' },
  { id: 'remotion', name: 'Remotion Project', description: 'Video generation with Remotion', status: 'done', category: 'Experiments', folder: '~/clawd/remotion-project/', updatedAt: '2026-01-05' },
  { id: 'blade', name: 'Blade Master Jobs', description: 'Job board project', status: 'done', category: 'Experiments', folder: '~/clawd/blade-master-jobs/', updatedAt: '2026-01-15' },
  { id: 'mission', name: 'Mission Control', description: 'Control dashboard experiment', status: 'done', category: 'Experiments', folder: '~/clawd/mission-control/', updatedAt: '2026-02-05' },
  { id: 'jewber', name: 'Jewber', description: 'Jewelry project', status: 'paused', category: 'Experiments', folder: '~/clawd/jewber/', updatedAt: '2026-01-20' },
  { id: 'seo', name: 'SEO Bulk Network', description: '9 niche sites op Vercel', status: 'active', category: 'Experiments', folder: '~/clawd/seo-bulk-network/', updatedAt: '2026-02-03' },
  { id: 'ajax', name: 'Ajax Kijken', description: 'Live streaming project', status: 'done', category: 'Experiments', folder: '~/clawd/ajax-kijken/', updatedAt: '2026-01-08' },
  { id: 'displine', name: 'Displine Clone', description: 'SaaS website clone', status: 'done', category: 'Experiments', folder: '~/clawd/displine-clone/', updatedAt: '2026-02-05' },
  
  // === NEW (auto-detected 2026-02-15) ===
  { id: 'nodefy-hero', name: 'Nodefy Hero Section', description: 'Hero section design for website', status: 'active', category: 'Nodefy Internal', url: 'https://nodefy-hero-section.vercel.app', folder: '~/clawd/nodefy-hero-section/', updatedAt: '2026-02-15' },
  { id: 'nodefy-meta-analyzer', name: 'Nodefy Meta Analyzer', description: 'Meta Ads analysis tool v2', status: 'active', category: 'Lead Gen Tools', folder: '~/clawd/nodefy-meta-analyzer/', updatedAt: '2026-02-15' },
  { id: 'nodefy-studio', name: 'Nodefy Studio', description: 'Creative studio tool', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/nodefy-studio/', updatedAt: '2026-02-15' },
  { id: 'moltbot-shop', name: 'Moltbot Shop', description: 'Moltbot merchandise/atelier', status: 'active', category: 'Experiments', folder: '~/clawd/moltbot-shop/', updatedAt: '2026-02-15' },
  { id: 'competitive-intel', name: 'Competitive Intelligence', description: 'Ad spy & competitive research', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/competitive-intelligence/', updatedAt: '2026-02-15' },
  { id: 'sol-trader-vercel', name: 'SOL Trader (Vercel)', description: 'Solana trader web version', status: 'done', category: 'Experiments', folder: '~/clawd/sol-trader-vercel/', updatedAt: '2026-02-15' },
  { id: 'nda-nathan', name: 'NDA Nathan', description: 'NDA document', status: 'done', category: 'Nodefy Internal', folder: '~/clawd/nda-nathan/', updatedAt: '2026-02-16' },
  
  // === NEW (auto-detected 2026-02-17) ===
  { id: 'nodefy-spinoffs', name: 'Nodefy Spinoffs', description: 'US→EU SaaS opportunity explorer', status: 'active', category: 'Experiments', folder: '~/clawd/nodefy-spinoffs/', updatedAt: '2026-02-17' },
  
  // === NEW (auto-detected 2026-02-18) ===
  { id: 'aromaclub-landing', name: 'Aromaclub Landing', description: 'Landing page project', status: 'done', category: 'Client Websites', folder: '~/clawd/aromaclub-landing/', updatedAt: '2026-02-18' },
  { id: 'money-research', name: 'Money Research', description: 'AI income & creative monetization research', status: 'active', category: 'Experiments', folder: '~/clawd/money-research/', updatedAt: '2026-02-18' },
  { id: 'nodefy-sales', name: 'Nodefy Sales Data', description: 'Sales forecasting & metrics', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/nodefy-sales/', updatedAt: '2026-02-18' },
  { id: 'sales', name: 'Sales Pitches', description: 'Sales plans & client pitches', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/sales/', updatedAt: '2026-02-18' },
  
  // === NEW (auto-detected 2026-02-19) ===
  { id: 'kapisoft-landing', name: 'Kapisoft Landing', description: 'Landing page project', status: 'done', category: 'Client Websites', folder: '~/clawd/kapisoft-landing/', updatedAt: '2026-02-19' },
  
  // === SYSTEM ===
  { id: 'skills', name: 'Skills', description: 'OpenClaw skill definitions', status: 'active', category: 'System', folder: '~/clawd/skills/', updatedAt: '2026-02-14' },
  { id: 'memory', name: 'Memory', description: 'Daily notes and session memory', status: 'active', category: 'System', folder: '~/clawd/memory/', updatedAt: '2026-02-14' },
  { id: 'tasks', name: 'Tasks', description: 'Task lists and task tracking', status: 'active', category: 'System', folder: '~/clawd/tasks/', updatedAt: '2026-02-14' },
  { id: 'security', name: 'Security', description: 'Security configurations', status: 'active', category: 'System', folder: '~/clawd/security/', updatedAt: '2026-02-10' },
  { id: 'backups', name: 'Backups', description: 'Backup files', status: 'active', category: 'System', folder: '~/clawd/backups/', updatedAt: '2026-02-14' },
]

const categories: Category[] = ['all', 'OpenClaw Agency', 'Nodefy Internal', 'Lead Gen Tools', 'Client Websites', 'AI Projects', 'Experiments', 'System']

const LAST_UPDATED = '2026-02-19 09:00'

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    done: projects.filter(p => p.status === 'done').length,
  }

  const groupedProjects = categories.slice(1).map(cat => ({
    category: cat,
    projects: filteredProjects.filter(p => p.category === cat)
  })).filter(g => g.projects.length > 0)

  return (
    <main className="min-h-screen bg-[#0D1117] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 z-50 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">OpenClaw Dashboard</h1>
              <p className="text-sm text-gray-500">Nodefy AI Agent Workspace — {stats.total} projects</p>
            </div>
            <p className="text-xs text-gray-600">Updated: {LAST_UPDATED}</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-white">{stats.total}</span>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-emerald-500">{stats.active}</span>
            <span className="text-sm text-gray-500">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-blue-500">{stats.done}</span>
            <span className="text-sm text-gray-500">Done</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#161B22] border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 w-64"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#161B22] text-gray-400 border border-gray-800 hover:border-gray-600'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Groups */}
        <div className="space-y-8">
          {groupedProjects.map(group => (
            <section key={group.category}>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                {group.category} ({group.projects.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-[#161B22] rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-white text-sm">{project.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${
                        project.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                        project.status === 'done' ? 'bg-blue-500/20 text-blue-400' :
                        project.status === 'blocked' ? 'bg-red-500/20 text-red-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{project.description}</p>
                    <div className="flex items-center justify-between">
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300 truncate max-w-[180px]"
                        >
                          {project.url.replace('https://', '')}
                        </a>
                      ) : (
                        <span className="text-xs text-gray-600 font-mono truncate max-w-[180px]">{project.folder}</span>
                      )}
                      <span className="text-[10px] text-gray-600">{project.updatedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-gray-600 text-center">
            OpenClaw Dashboard v1.5 — Nodefy AI Agent
          </p>
        </div>
      </footer>
    </main>
  )
}
