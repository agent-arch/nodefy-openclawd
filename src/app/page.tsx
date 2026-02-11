'use client'

import { useState } from 'react'

// Project data - this would come from an API in production
const projects = [
  {
    id: 'openclaw-agency',
    name: 'OpenClaw Agency',
    description: 'AI-native marketing agency voor kleine webshops',
    status: 'active',
    agents: [
      { name: 'Propositie Agent', status: 'done', output: 'PROPOSITIE.md' },
      { name: 'Brand Agent', status: 'done', output: 'BRANDBOOK.md' },
      { name: 'Website Agent', status: 'pending', output: null },
    ],
    files: [
      { name: 'PROPOSITIE.md', path: '~/clawd/ai-agency/PROPOSITIE.md', type: 'document' },
      { name: 'BRANDBOOK.md', path: '~/clawd/ai-agency/BRANDBOOK.md', type: 'document' },
      { name: 'PLAN.md', path: '~/clawd/ai-agency/PLAN.md', type: 'document' },
      { name: 'OPENCLAW-AGENCY-PLAN.md', path: '~/clawd/ai-agency/OPENCLAW-AGENCY-PLAN.md', type: 'document' },
    ],
    folder: '~/clawd/ai-agency/',
    createdAt: '2026-02-11',
  },
  {
    id: 'tracking-health-checker',
    name: 'Tracking Health Checker',
    description: 'Server-side tracking scanner tool',
    status: 'blocked',
    agents: [],
    files: [
      { name: 'README.md', path: '~/clawd/tracking-health-checker/README.md', type: 'document' },
      { name: 'page.tsx', path: '~/clawd/tracking-health-checker/src/app/page.tsx', type: 'code' },
    ],
    folder: '~/clawd/tracking-health-checker/',
    createdAt: '2026-02-09',
  },
  {
    id: 'nodefy-clients',
    name: 'Client Overview',
    description: '48 klanten geanalyseerd en gecategoriseerd',
    status: 'done',
    agents: [],
    files: [
      { name: 'COMPLEET-OVERZICHT.md', path: '~/clawd/nodefy-clients/COMPLEET-OVERZICHT.md', type: 'document' },
      { name: 'ECOMMERCE.md', path: '~/clawd/nodefy-clients/klanten/ECOMMERCE.md', type: 'document' },
      { name: 'UPSELL-OPPORTUNITIES.md', path: '~/clawd/nodefy-clients/UPSELL-OPPORTUNITIES.md', type: 'document' },
    ],
    folder: '~/clawd/nodefy-clients/',
    createdAt: '2026-02-11',
  },
]

function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: 'status-active',
    done: 'status-done',
    pending: 'status-pending',
    blocked: 'bg-red-500/20 text-red-400',
  }
  const labels = {
    active: '● Actief',
    done: '✓ Klaar',
    pending: '◌ Wacht',
    blocked: '⊘ Blocked',
  }
  return (
    <span className={`status-badge ${styles[status as keyof typeof styles]}`}>
      {labels[status as keyof typeof labels]}
    </span>
  )
}

function FileIcon({ type }: { type: string }) {
  if (type === 'code') return <span className="text-amber-400">{'</>'}</span>
  return <span className="text-zinc-400">📄</span>
}

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState<string | null>('openclaw-agency')
  
  const activeProject = projects.find(p => p.id === selectedProject)

  return (
    <main className="min-h-screen p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">OpenClaw Dashboard</h1>
        <p className="text-zinc-500">Nodefy AI Agent Workspace</p>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar - Project List */}
        <aside className="col-span-3">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Projecten
          </h2>
          <div className="space-y-2">
            {projects.map(project => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedProject === project.id
                    ? 'bg-zinc-800 border-teal/50'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-white">{project.name}</h3>
                  <StatusBadge status={project.status} />
                </div>
                <p className="text-sm text-zinc-500 line-clamp-2">{project.description}</p>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="col-span-9">
          {activeProject ? (
            <div className="space-y-6">
              {/* Project Header */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">{activeProject.name}</h2>
                    <p className="text-zinc-500">{activeProject.description}</p>
                  </div>
                  <StatusBadge status={activeProject.status} />
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <span>📁 {activeProject.folder}</span>
                  <span>📅 {activeProject.createdAt}</span>
                </div>
              </div>

              {/* Agents */}
              {activeProject.agents.length > 0 && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                    Agents
                  </h3>
                  <div className="space-y-3">
                    {activeProject.agents.map((agent, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🤖</span>
                          <span className="font-medium text-white">{agent.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {agent.output && (
                            <span className="text-sm text-zinc-500">→ {agent.output}</span>
                          )}
                          <StatusBadge status={agent.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Files */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                  Bestanden
                </h3>
                <div className="space-y-2">
                  {activeProject.files.map((file, i) => (
                    <div key={i} className="file-item">
                      <FileIcon type={file.type} />
                      <div className="flex-1">
                        <span className="font-medium text-white">{file.name}</span>
                        <span className="text-xs text-zinc-600 ml-2">{file.path}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 text-zinc-600">
              Selecteer een project
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
