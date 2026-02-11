'use client'

import { useState } from 'react'

// ============================================
// NODEFY SALES DASHBOARD
// ============================================

// Navigation tabs
type TabId = 'overview' | 'strategy' | 'linkedin' | 'sales' | 'clients' | 'knowledge'

// KPIs
const kpis = [
  { label: 'Deals/maand', current: '2-3', target: '5+', status: 'warning' },
  { label: 'Avg Retainer', current: '€3-5K', target: '€10K+', status: 'warning' },
  { label: 'Team Size', current: '9', target: '15', status: 'ok' },
  { label: 'Referral/Outbound', current: '90/10', target: '40/60', status: 'warning' },
]

// Strategy documents (from nodefy-scaling + nodefy-2.0)
const strategyDocs = [
  {
    id: 'exec-summary',
    title: 'Executive Summary',
    file: 'nodefy-scaling/EXECUTIVE-SUMMARY.md',
    description: 'Kernboodschap & 5 key findings',
    category: 'Scaling',
  },
  {
    id: 'scaling-frameworks',
    title: 'Scaling Frameworks',
    file: 'nodefy-scaling/1-SCALING-FRAMEWORKS.md',
    description: 'Hoe agencies schalen - onderzoek',
    category: 'Scaling',
  },
  {
    id: 'ai-toepassing',
    title: 'AI Toepassing',
    file: 'nodefy-scaling/2-AI-TOEPASSING.md',
    description: 'AI tools & ROI data',
    category: 'Scaling',
  },
  {
    id: 'sales-expansion',
    title: 'Sales Expansion',
    file: 'nodefy-scaling/3-SALES-EXPANSION.md',
    description: 'Van referrals naar outbound',
    category: 'Scaling',
  },
  {
    id: 'pricing',
    title: 'Pricing Strategy',
    file: 'nodefy-scaling/4-PRICING.md',
    description: 'Naar €10K+ retainers',
    category: 'Scaling',
  },
  {
    id: 'nodefy-analyse',
    title: 'Nodefy Analyse',
    file: 'nodefy-scaling/5-NODEFY-ANALYSE.md',
    description: 'Jullie situatie & concurrentie',
    category: 'Scaling',
  },
  {
    id: 'actieplan-90',
    title: '90-Dagen Actieplan',
    file: 'nodefy-scaling/ACTIEPLAN-90-DAGEN.md',
    description: 'Concrete acties per week',
    category: 'Scaling',
  },
  {
    id: 'nodefy-20',
    title: 'Nodefy 2.0 Plan',
    file: 'nodefy-2.0/PLAN.md',
    description: 'Acceleratie masterplan',
    category: 'Vision',
  },
]

// LinkedIn post ideas (from content calendar)
const linkedinIdeas = [
  { id: 1, title: '"We vervingen 3 uur handwerk door 1 n8n workflow"', category: 'AI & Automation', hook: 'Concrete case, geen hype' },
  { id: 2, title: '"AI agents zijn overhyped. Behalve als je dit doet..."', category: 'AI & Automation', hook: 'Contrarian take + praktische tip' },
  { id: 3, title: '"ChatGPT vs Claude vs Gemini voor marketing werk"', category: 'AI & Automation', hook: 'Eerlijke vergelijking' },
  { id: 4, title: '"De AI tool die niemand kent maar wij dagelijks gebruiken"', category: 'AI & Automation', hook: 'Tool discovery' },
  { id: 5, title: '"Onze AI agent maakte een fout. Dit leerden we."', category: 'AI & Automation', hook: 'Authenticiteit' },
  { id: 6, title: '"90% van de bedrijven meet hun ads verkeerd"', category: 'Data & Tracking', hook: 'Observatie + simpele fix' },
  { id: 7, title: '"Server-side tracking uitgelegd in 60 seconden"', category: 'Data & Tracking', hook: 'Educatief' },
  { id: 8, title: '"We ontdekten dat 40% van conversies niet gemeten werd"', category: 'Data & Tracking', hook: 'Concrete klantcase' },
  { id: 9, title: '"Consent Mode v2: wat marketeers écht moeten weten"', category: 'Data & Tracking', hook: 'Actueel, praktisch' },
  { id: 10, title: '"Van 2 naar 9 man in 4 jaar. 3 dingen die ik anders zou doen."', category: 'Ondernemerschap', hook: 'Reflectie' },
  { id: 11, title: '"Waarom we nee zeggen tegen 50% van de leads"', category: 'Ondernemerschap', hook: 'Positionering' },
  { id: 12, title: '"Het nieuwe kantoor aan de Weteringschans"', category: 'Ondernemerschap', hook: 'Milestone' },
  { id: 13, title: '"Hoe we meetings halveerden zonder chaos"', category: 'Ondernemerschap', hook: 'Operationeel' },
  { id: 14, title: '"LinkedIn ads voor B2B: onze echte resultaten na €50K spend"', category: 'Marketing', hook: 'Transparant' },
  { id: 15, title: '"Performance Max is geen magic button"', category: 'Marketing', hook: 'Hot take' },
  { id: 16, title: '"De beste campagne die we ooit draaiden kostte €200"', category: 'Marketing', hook: 'Tegengeluid' },
  { id: 17, title: '"Waarom je social media manager geen AI moet vrezen"', category: 'Marketing', hook: 'Nuance' },
  { id: 18, title: '"Marketing agencies over 5 jaar: mijn voorspelling"', category: 'Thought Leadership', hook: 'Visie' },
  { id: 19, title: '"Het probleem met full-service agencies"', category: 'Thought Leadership', hook: 'Industry kritiek' },
  { id: 20, title: '"We stoppen met [X]. Dit is waarom."', category: 'Thought Leadership', hook: 'Transparantie' },
]

// Client categories (from nodefy-clients)
const clientCategories = [
  { name: 'E-commerce', count: 11, examples: 'Franky, Lake Cycling, Niata' },
  { name: 'Tourism', count: 8, examples: 'Tours & Tickets, Fjord Tours' },
  { name: 'B2B / SaaS', count: 7, examples: 'Floryn, Stories, Talentcare' },
  { name: 'Hospitality', count: 6, examples: 'Hotels, restaurants' },
  { name: 'Fashion', count: 5, examples: 'Johan Cruyff, Unity Units' },
  { name: 'Real Estate', count: 4, examples: 'Makelaars, vastgoed' },
  { name: 'Other', count: 7, examples: 'Finance, healthcare, etc.' },
]

// Quick wins from actieplan
const quickWins = [
  { task: 'LinkedIn Visibility Boost - 3 posts/week', status: 'todo', priority: 'high' },
  { task: '3 case studies met ROI cijfers', status: 'todo', priority: 'high' },
  { task: 'Test €10K+ "AI Transformation" package', status: 'todo', priority: 'medium' },
  { task: 'Comment strategy op target accounts', status: 'todo', priority: 'medium' },
  { task: 'Website case studies pagina', status: 'todo', priority: 'low' },
]

// Knowledge base items
const knowledgeItems = [
  { title: 'SURF Scaling Framework', file: 'knowledge-base/frameworks/SURF-SCALING.md', type: 'Framework' },
  { title: 'Goede LinkedIn Posts Guide', file: 'nodefy-linkedin/GOEDE-POSTS-GUIDE.md', type: 'Guide' },
  { title: 'Client Upsell Opportunities', file: 'nodefy-clients/UPSELL-OPPORTUNITIES.md', type: 'Analysis' },
  { title: 'E-commerce Clients Deep Dive', file: 'nodefy-clients/klanten/ECOMMERCE.md', type: 'Analysis' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [selectedIdea, setSelectedIdea] = useState<number | null>(null)
  const [generatedPost, setGeneratedPost] = useState<string>('')

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'strategy', label: 'Strategy', icon: '🎯' },
    { id: 'linkedin', label: 'LinkedIn', icon: '📝' },
    { id: 'sales', label: 'Sales', icon: '💰' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'knowledge', label: 'Knowledge', icon: '📚' },
  ]

  const generatePost = (idea: typeof linkedinIdeas[0]) => {
    setSelectedIdea(idea.id)
    // Placeholder - in reality this would call an API
    setGeneratedPost(`[POST DRAFT]\n\n${idea.title}\n\n${idea.hook}\n\n---\n\n[AI genereert de volledige post tekst hier]\n\nCategorie: ${idea.category}`)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Nodefy Sales Dashboard</h1>
              <p className="text-sm text-slate-500">Intern overzicht — Strategy, LinkedIn, Sales</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-400">Updated: {new Date().toLocaleDateString('nl-NL')}</span>
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                N
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <nav className="flex gap-1 mt-4 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPIs */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">KPIs — Huidige Stand vs Target</h2>
              <div className="grid grid-cols-4 gap-4">
                {kpis.map((kpi) => (
                  <div key={kpi.label} className="bg-white rounded-xl p-5 border border-slate-200">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                    <div className="flex items-end gap-2 mt-2">
                      <span className={`text-2xl font-bold ${kpi.status === 'ok' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {kpi.current}
                      </span>
                      <span className="text-sm text-slate-400 mb-1">→ {kpi.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Wins */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Wins — Week 1-2</h2>
              <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
                {quickWins.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600" />
                    <span className="flex-1 text-slate-700">{item.task}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.priority === 'high' ? 'bg-red-100 text-red-700' :
                      item.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <span>🎯</span> Strategy Docs
                </h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">{strategyDocs.length}</p>
                <p className="text-sm text-slate-500 mt-1">Scaling + Vision documents</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <span>📝</span> LinkedIn Ideas
                </h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">{linkedinIdeas.length}</p>
                <p className="text-sm text-slate-500 mt-1">Post ideeën klaar</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <span>👥</span> Active Clients
                </h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">48</p>
                <p className="text-sm text-slate-500 mt-1">In 7 categorieën</p>
              </div>
            </div>

            {/* Key Message */}
            <section className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">🎯 De Kernboodschap</h2>
              <p className="text-blue-800">
                "Nodefy heeft alle ingrediënten voor marktleiderschap. De shift van 'AI-enabled agency' naar 
                <strong> THE AI Marketing Agency van Nederland</strong> vereist systematische sales, hogere pricing 
                confidence, en een public voice die je expertise claimt."
              </p>
            </section>
          </div>
        )}

        {/* STRATEGY TAB */}
        {activeTab === 'strategy' && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">📄 Documents</h2>
              <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
                {strategyDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc.id)}
                    className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${
                      selectedDoc === doc.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">{doc.title}</h3>
                        <p className="text-sm text-slate-500 mt-1">{doc.description}</p>
                      </div>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {doc.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="col-span-8">
              <div className="bg-white rounded-xl border border-slate-200 p-6 min-h-[600px]">
                {selectedDoc ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-slate-900">
                        {strategyDocs.find(d => d.id === selectedDoc)?.title}
                      </h2>
                      <span className="text-xs text-slate-400 font-mono">
                        ~/clawd/{strategyDocs.find(d => d.id === selectedDoc)?.file}
                      </span>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">
                      <p>Document content wordt hier geladen...</p>
                      <p className="mt-2 text-slate-400">
                        (In productie: fetch van /api/docs endpoint of static import)
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <p>← Selecteer een document om te lezen</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LINKEDIN TAB */}
        {activeTab === 'linkedin' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">LinkedIn Content Generator</h2>
                <p className="text-sm text-slate-500">Klik op een idee om een post te genereren</p>
              </div>
              <div className="text-sm text-slate-500">
                Frequentie: <span className="font-medium text-slate-700">1x per 2 weken</span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Ideas List */}
              <div className="col-span-5">
                <div className="bg-white rounded-xl border border-slate-200 max-h-[700px] overflow-y-auto">
                  {linkedinIdeas.map((idea) => (
                    <button
                      key={idea.id}
                      onClick={() => generatePost(idea)}
                      className={`w-full text-left p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                        selectedIdea === idea.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg text-slate-300 font-mono">{idea.id}.</span>
                        <div>
                          <h3 className="font-medium text-slate-900 text-sm">{idea.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                              {idea.category}
                            </span>
                            <span className="text-xs text-slate-400">{idea.hook}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Post Generator */}
              <div className="col-span-7">
                <div className="bg-white rounded-xl border border-slate-200 p-6 min-h-[700px]">
                  {generatedPost ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900">Generated Post</h3>
                        <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          📋 Copy to Clipboard
                        </button>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans">
                          {generatedPost}
                        </pre>
                      </div>
                      <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-sm text-amber-800">
                          💡 <strong>Tip:</strong> Vraag mij via Telegram om deze post volledig uit te schrijven in jouw tone of voice.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <span className="text-4xl mb-4">📝</span>
                      <p>Selecteer een idee om een post te genereren</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SALES TAB */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            {/* Targets */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">90-Dagen Targets</h2>
              <div className="grid grid-cols-5 gap-4">
                {[
                  { label: 'Gem. Retainer', now: '€3-5K', target: '€6-8K', month12: '€10-15K' },
                  { label: 'Deals/maand', now: '2-3', target: '4-5', month12: '8-10' },
                  { label: 'Team Size', now: '~9', target: '12-15', month12: '20-25' },
                  { label: 'Referral/Outbound', now: '90/10', target: '60/40', month12: '40/60' },
                  { label: 'Pipeline Waarde', now: '?', target: '3x MRR', month12: '5x MRR' },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-xs text-slate-500 uppercase">{item.label}</p>
                    <p className="text-xl font-bold text-slate-900 mt-1">{item.now}</p>
                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <p className="text-xs text-slate-400">90d: <span className="text-slate-600">{item.target}</span></p>
                      <p className="text-xs text-slate-400">12m: <span className="text-emerald-600">{item.month12}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Findings */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">5 Key Findings</h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { num: 1, title: 'Specialisatie is verplicht', insight: '84% van succesvolle agencies positioneert als specialist', action: '"AI-Powered Marketing Agency" is je claim. Maak het concreet.' },
                  { num: 2, title: 'Sales is de #1 bottleneck', insight: 'Agencies met gestructureerde outbound groeien 3-5x sneller', action: 'Investeer in LinkedIn outbound + content engine.' },
                  { num: 3, title: 'AI is de multiplier', insight: '95% van marketers gebruikt nu AI tools (HubSpot 2025)', action: 'Focus op client-facing AI transformatie, niet alleen intern.' },
                  { num: 4, title: 'Pricing power komt van waarde', insight: 'Slechts 2% van agencies gebruikt pure value-based pricing', action: 'Verkoop "5x meer leads" niet "10 uur consultancy".' },
                  { num: 5, title: 'Schalen vereist systemen', insight: 'Founder moet uit productie vóór 25 FTE', action: 'Documenteer alles. Bouw playbooks. Train je team.' },
                ].map((finding) => (
                  <div key={finding.num} className="bg-white rounded-xl p-5 border border-slate-200">
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        {finding.num}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{finding.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{finding.insight}</p>
                        <p className="text-sm text-blue-700 mt-2">→ {finding.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* CLIENTS TAB */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">48 Actieve Klanten</h2>
              <a 
                href="#" 
                className="text-sm text-blue-600 hover:underline"
              >
                View full overview →
              </a>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {clientCategories.map((cat) => (
                <div key={cat.name} className="bg-white rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-slate-900">{cat.name}</h3>
                    <span className="text-2xl font-bold text-blue-600">{cat.count}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">{cat.examples}</p>
                </div>
              ))}
            </div>

            {/* Upsell Opportunities */}
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Upsell Opportunities</h2>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium text-slate-900">E-commerce → Automation</h3>
                    <p className="text-sm text-slate-500 mt-1">11 clients zonder n8n/automation setup</p>
                    <p className="text-lg font-bold text-emerald-600 mt-2">~€5.5K MRR potential</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">SEA → SEO Bundle</h3>
                    <p className="text-sm text-slate-500 mt-1">15 clients met alleen paid ads</p>
                    <p className="text-lg font-bold text-emerald-600 mt-2">~€7.5K MRR potential</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Tracking Upgrade</h3>
                    <p className="text-sm text-slate-500 mt-1">20+ clients zonder server-side tracking</p>
                    <p className="text-lg font-bold text-emerald-600 mt-2">~€10K one-time</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* KNOWLEDGE TAB */}
        {activeTab === 'knowledge' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">Knowledge Base</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {knowledgeItems.map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-5 border border-slate-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-400 font-mono mt-1">~/clawd/{item.file}</p>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add more items */}
            <div className="bg-slate-100 rounded-xl p-6 border-2 border-dashed border-slate-300">
              <p className="text-center text-slate-500">
                📚 Knowledge base groeit automatisch naarmate we meer leren
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-slate-400 text-center">
            Nodefy Sales Dashboard — Built by Nodefy AI Agent — Data from ~/clawd/nodefy-*
          </p>
        </div>
      </footer>
    </main>
  )
}
