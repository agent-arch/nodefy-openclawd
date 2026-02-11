'use client'

import { useState } from 'react'

// ============================================
// NODEFY PROJECT DASHBOARD
// Overview of all projects + link to Sales
// ============================================

type Category = 'all' | 'OpenClaw Agency' | 'Internal Tools' | 'Lead Gen Tools' | 'Client Projects' | 'Nodefy Internal'

// All projects from ~/clawd/
const projects = [
  // === HIGHLIGHTED ===
  {
    id: 'sales-dashboard',
    name: '🔥 Sales Dashboard',
    description: 'LinkedIn posts, outreach templates, 90-dagen plan',
    status: 'active',
    category: 'Internal Tools',
    url: 'https://nodefy-sales.vercel.app',
    folder: '~/clawd/nodefy-sales-dashboard/',
    updatedAt: '2026-02-11',
    featured: true,
  },
  {
    id: 'morgen-agency',
    name: 'heymorgen.agency',
    description: 'AI-native marketing agency voor kleine webshops',
    status: 'active',
    category: 'OpenClaw Agency',
    url: 'https://morgen-agency.vercel.app',
    folder: '~/clawd/morgen-agency/',
    updatedAt: '2026-02-11',
    featured: true,
  },
  
  // === ACTIVE ===
  {
    id: 'ai-agency',
    name: 'Agency Strategy Docs',
    description: 'Propositie, Brandbook, ICP, Outreach Playbook',
    status: 'active',
    category: 'OpenClaw Agency',
    files: ['PROPOSITIE.md', 'BRANDBOOK.md', 'ICP.md', 'OUTREACH-PLAYBOOK.md'],
    folder: '~/clawd/ai-agency/',
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
    id: 'nodefy-scaling',
    name: 'Scaling Research',
    description: '90-dagen actieplan, pricing, sales expansion',
    status: 'done',
    category: 'Nodefy Internal',
    files: ['EXECUTIVE-SUMMARY.md', 'ACTIEPLAN-90-DAGEN.md'],
    folder: '~/clawd/nodefy-scaling/',
    updatedAt: '2026-01-30',
  },
  {
    id: 'nodefy-2',
    name: 'Nodefy 2.0 Plan',
    description: 'Acceleratie masterplan',
    status: 'done',
    category: 'Nodefy Internal',
    folder: '~/clawd/nodefy-2.0/',
    updatedAt: '2026-01-28',
  },
  
  // === CLIENT WEBSITES ===
  {
    id: 'fpnp-website',
    name: 'FPNP Website',
    description: 'Client website project',
    status: 'done',
    category: 'Client Projects',
    folder: '~/clawd/fpnp-website/',
    updatedAt: '2026-02-06',
  },
  {
    id: 'foresight-landing',
    name: 'Foresight Landing',
    description: 'Recruitment landing page',
    status: 'done',
    category: 'Client Projects',
    folder: '~/clawd/foresight-landing/',
    updatedAt: '2026-02-05',
  },
  
  // === FUN / EXPERIMENTAL ===
  {
    id: 'discofrog',
    name: 'Disco Frog Clone',
    description: 'Fun project - dancing frog',
    status: 'done',
    category: 'Internal Tools',
    folder: '~/clawd/discofrog-clone/',
    updatedAt: '2026-02-04',
  },
  {
    id: 'seo-network',
    name: 'SEO Bulk Network',
    description: '9 niche sites op Vercel',
    status: 'paused',
    category: 'Lead Gen Tools',
    folder: '~/clawd/seo-bulk-network/',
    updatedAt: '2026-02-03',
  },
]

const categories: Category[] = ['all', 'OpenClaw Agency', 'Internal Tools', 'Lead Gen Tools', 'Client Projects', 'Nodefy Internal']

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredProjects = projects.filter(p => p.featured)
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    done: projects.filter(p => p.status === 'done').length,
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-lg text-white">
                N
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Nodefy Projects</h1>
                <p className="text-sm text-slate-500">AI Agent Workspace Overview</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://nodefy-sales.vercel.app"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                📊 Sales Dashboard →
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Featured Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">🔥 Featured</h2>
          <div className="grid grid-cols-2 gap-4">
            {featuredProjects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <p className="text-blue-100 mt-1">{project.description}</p>
                  </div>
                  <span className="text-2xl">→</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">{project.category}</span>
                  <span className="text-xs text-blue-200">{project.updatedAt}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Total Projects</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Active</p>
              <p className="text-3xl font-bold text-emerald-600 mt-1">{stats.active}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Completed</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{stats.done}</p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="mb-6">
          <div className="flex items-center gap-4">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-auto px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 w-64"
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section>
          <div className="grid grid-cols-3 gap-4">
            {filteredProjects.filter(p => !p.featured).map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-slate-900">{project.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    project.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                    project.status === 'done' ? 'bg-blue-100 text-blue-700' :
                    project.status === 'blocked' ? 'bg-red-100 text-red-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-2">{project.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-slate-400">{project.category}</span>
                  <span className="text-xs text-slate-400">{project.updatedAt}</span>
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block text-center py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-700 transition-colors"
                  >
                    Open →
                  </a>
                )}
                {project.folder && !project.url && (
                  <p className="mt-3 text-xs text-slate-400 font-mono truncate">{project.folder}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <p className="text-xs text-slate-400 text-center">
            Nodefy Project Dashboard — Built by AI Agent — Data from ~/clawd/
          </p>
        </div>
      </footer>
    </main>
  )
}
