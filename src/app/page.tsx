'use client'

import { useState } from 'react'

// ============================================
// NODEFY SALES DASHBOARD
// Focused: LinkedIn, Sales Targets, Content
// ============================================

// LinkedIn post ideas met volledige concepten
const linkedinPosts = [
  {
    id: 1,
    title: 'We vervingen 3 uur handwerk door 1 n8n workflow',
    category: 'AI & Automation',
    hook: 'Concrete case, geen hype',
    status: 'ready',
    concept: `We vervingen 3 uur handwerk door 1 n8n workflow.

Elke week dezelfde klus:
→ Data uit 3 systemen halen
→ In Excel plakken
→ Rapport maken
→ Mailen naar klant

Niemand had er zin in. Maar het moest.

Tot we het automatiseerden:
1. n8n haalt data uit alle bronnen
2. Formatteert automatisch
3. Mailt elke maandag om 9:00

Tijd bespaard: 3 uur per week
Fouten: van "regelmatig" naar 0
Team happiness: 📈

De tools zijn er. De vraag is: waar besteed jij nog tijd aan dat een machine kan doen?

#automation #n8n #marketing #efficiency`,
  },
  {
    id: 2,
    title: 'AI agents zijn overhyped. Behalve als je dit doet...',
    category: 'AI & Automation',
    hook: 'Contrarian take + praktische tip',
    status: 'ready',
    concept: `AI agents zijn overhyped.

Iedereen heeft het erover.
Niemand gebruikt ze echt.

Waarom? Omdat de meeste implementaties mislukken.

3 redenen:
1. Te ambitieus beginnen ("laat AI alles doen")
2. Geen duidelijke scope ("doe maar wat")
3. Geen feedback loop ("set and forget")

Wat wél werkt:
→ Eén specifieke taak
→ Duidelijke input/output
→ Mens in de loop

Onze AI agent doet precies 1 ding:
Dagelijks campaign performance checken en alerts sturen.

Dat is het. Saai? Ja.
Werkt het? Elke dag.

Begin klein. Schaal later.

#ai #agents #marketing #automation`,
  },
  {
    id: 3,
    title: '90% van de bedrijven meet hun ads verkeerd',
    category: 'Data & Tracking',
    hook: 'Observatie + simpele fix',
    status: 'ready',
    concept: `90% van de bedrijven meet hun ads verkeerd.

Niet een beetje verkeerd.
Compleet verkeerd.

Wat we zien bij nieuwe klanten:
❌ Dubbele conversies (Facebook + Google tellen dezelfde sale)
❌ Geen server-side tracking (30-40% data loss door iOS)
❌ Verkeerde attributie window
❌ Geen consent mode v2

Het resultaat?
→ ROAS cijfers die er goed uitzien
→ Beslissingen op basis van slechte data
→ Budget naar verkeerde kanalen

De fix is niet sexy:
1. Audit je huidige setup
2. Implementeer server-side tracking
3. Deduplicate conversies
4. Check consent compliance

Kost een middag. Bespaart duizenden.

Wanneer heb jij voor het laatst je tracking geaudit?

#tracking #googleads #metaads #data`,
  },
  {
    id: 4,
    title: 'Van 2 naar 9 man in 4 jaar. 3 dingen die ik anders zou doen.',
    category: 'Ondernemerschap',
    hook: 'Reflectie, geen flex',
    status: 'draft',
    concept: `Van 2 naar 9 man in 4 jaar.

Klinkt als een succesverhaal.
Maar ik zou 3 dingen anders doen:

1. Eerder specialiseren
We wilden eerst alles doen. SEO, ads, social, websites.
Resultaat: middelmatig in alles, excellent in niets.
Nu: AI + Data + Performance. Dat is het.

2. Eerder nee zeggen
Elke klant aanpakken voelde als groei.
Maar slechte fits kosten meer dan ze opleveren.
Nu: 50% van de leads wijzen we af.

3. Eerder systemen bouwen
"We doen het later wel"
Later kwam nooit.
Nu: als iets 3x voorkomt, documenteren we het.

Groei is niet alleen omzet.
Het is ook leren wat je niet moet doen.

Wat zou jij anders doen?

#ondernemen #agency #groei #lessons`,
  },
  {
    id: 5,
    title: 'LinkedIn ads voor B2B: onze echte resultaten na €50K spend',
    category: 'Marketing',
    hook: 'Transparant, geen BS',
    status: 'draft',
    concept: `LinkedIn ads voor B2B: onze echte resultaten na €50K spend.

Geen case study met cherry-picked data.
Gewoon de waarheid.

Setup:
→ B2B SaaS klant
→ €50K budget over 6 maanden
→ Doel: qualified leads

Resultaten:
✅ 847 leads
✅ €59 cost per lead
✅ 23% conversion naar demo
✅ 4 closed deals

De wiskunde:
€50K spend → 4 deals × €15K ACV = €60K ARR
Payback: 10 maanden

Was het waard? Ja.
Is het voor iedereen? Nee.

LinkedIn werkt als:
→ Je ACV hoog genoeg is (>€5K)
→ Je targeting specifiek is
→ Je content niet schreeuwerig is

Wat zijn jullie LinkedIn resultaten?

#linkedinads #b2b #saas #marketing`,
  },
  {
    id: 6,
    title: 'De AI tool die niemand kent maar wij dagelijks gebruiken',
    category: 'AI & Automation',
    hook: 'Tool discovery',
    status: 'idea',
    concept: `De AI tool die niemand kent maar wij dagelijks gebruiken.

Het is niet ChatGPT.
Het is niet Claude.
Het is niet Midjourney.

Het is: [tool naam]

Wat het doet:
→ [specifieke functie]
→ [specifieke functie]
→ [specifieke functie]

Waarom het werkt:
Geen hype. Geen fancy UI. Gewoon resultaat.

We besparen er ~[X] uur per week mee.

De beste tools zijn vaak niet de bekendste.

Welke "geheime" tool gebruik jij?

#ai #tools #productivity #marketing`,
  },
  {
    id: 7,
    title: 'Waarom we nee zeggen tegen 50% van de leads',
    category: 'Ondernemerschap',
    hook: 'Positionering, kwaliteit > kwantiteit',
    status: 'idea',
    concept: `Waarom we nee zeggen tegen 50% van de leads.

Klinkt contra-intuïtief.
Maar het is de beste beslissing die we maakten.

Leads die we afwijzen:
❌ "We willen even proberen" (geen commitment)
❌ Budget onder €2K/maand (kunnen we niet helpen)
❌ Geen product-market fit (ads fixen dat niet)
❌ "Kunnen jullie ook X, Y, Z?" (geen focus)

Leads die we aannemen:
✅ Duidelijk doel + budget
✅ Bestaande omzet om te schalen
✅ Bereid om te investeren in data

Resultaat:
→ Betere resultaten (we werken met goede fits)
→ Minder stress (geen onmogelijke verwachtingen)
→ Hogere retentie (95%+ blijft >12 maanden)

Soms is nee zeggen de beste sales strategie.

#sales #agency #positioning #business`,
  },
  {
    id: 8,
    title: 'Server-side tracking uitgelegd in 60 seconden',
    category: 'Data & Tracking',
    hook: 'Educatief, geen jargon',
    status: 'idea',
    concept: `Server-side tracking uitgelegd in 60 seconden.

Oude manier (client-side):
Browser → Pixel → Facebook/Google
Probleem: Adblockers, iOS, consent → 30-40% data loss

Nieuwe manier (server-side):
Browser → Jouw Server → Facebook/Google
Voordeel: Meer controle, meer data, betere resultaten

Wat je nodig hebt:
1. Google Tag Manager Server Container
2. Cloud hosting (Google Cloud, AWS, Stape)
3. Iemand die weet wat ie doet

Kosten: €50-200/maand hosting
ROI: Meestal 20-40% meer gemeten conversies

Is het voor iedereen? Nee.
Is het voor serieuze advertisers? Absoluut.

Vragen? Drop ze hieronder.

#tracking #serverside #googleads #metaads`,
  },
  {
    id: 9,
    title: 'Het probleem met full-service agencies',
    category: 'Thought Leadership',
    hook: 'Industry kritiek, constructief',
    status: 'idea',
    concept: `Het probleem met "full-service" agencies.

Ik heb bij 3 gewerkt. Dit is wat ik zag:

Full-service = jack of all trades, master of none.

Het model:
→ Verkoop alles aan iedereen
→ Junior doet het werk (goedkoop)
→ Senior zit in meetings (duur)
→ Klant betaalt voor overhead

Het resultaat:
→ Middelmatige uitvoering
→ Geen echte expertise
→ "Het loopt wel"

Wat beter werkt:
Specialists die samenwerken.

Wij doen: AI + Data + Performance
We doen NIET: Branding, websites, social content

Voor de rest verwijzen we door.

Klant krijgt experts op elk vlak.
Wij blijven scherp in ons vak.

Full-service is een business model, geen kwaliteitskeuze.

#agency #marketing #specialist #business`,
  },
  {
    id: 10,
    title: 'Performance Max is geen magic button',
    category: 'Marketing',
    hook: 'Hot take met onderbouwing',
    status: 'idea',
    concept: `Performance Max is geen magic button.

Google's pitch: "Laat AI alles doen!"
Realiteit: Garbage in, garbage out.

Wat we zien bij audits:
❌ Alle producten in 1 asset group
❌ Geen audience signals
❌ Stock foto's als assets
❌ Geen brand exclusions
❌ "Laten draaien" zonder analyse

Resultaat: Google optimaliseert op wat makkelijk is, niet op wat winstgevend is.

Wat wél werkt:
→ Segmenteer op marge/categorie
→ Feed audience data (remarketing, customer match)
→ Custom assets per product type
→ Exclude branded search
→ Check placement reports wekelijks

PMax is krachtig.
Maar alleen als je het stuurt.

"Set and forget" is geen strategie.

#googleads #pmax #ecommerce #marketing`,
  },
]

// Sales targets
const salesTargets = {
  current: {
    dealsPerMonth: '2-3',
    avgRetainer: '€3-5K',
    referralOutbound: '90/10',
    pipelineValue: '~€50K',
  },
  target90d: {
    dealsPerMonth: '4-5',
    avgRetainer: '€6-8K',
    referralOutbound: '60/40',
    pipelineValue: '€150K (3x MRR)',
  },
  target12m: {
    dealsPerMonth: '8-10',
    avgRetainer: '€10-15K',
    referralOutbound: '40/60',
    pipelineValue: '€250K (5x MRR)',
  },
}

// Quick actions
const quickActions = [
  { label: 'LinkedIn openen', url: 'https://www.linkedin.com/in/rubenstrootman/', icon: '🔗' },
  { label: 'Post scheduler', url: 'https://www.linkedin.com/post/new/', icon: '📝' },
  { label: 'HubSpot deals', url: 'https://app.hubspot.com/', icon: '💰' },
  { label: 'Nodefy website', url: 'https://nodefy.nl', icon: '🌐' },
]

export default function SalesDashboard() {
  const [selectedPost, setSelectedPost] = useState<typeof linkedinPosts[0] | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const filteredPosts = filter === 'all' 
    ? linkedinPosts 
    : linkedinPosts.filter(p => p.status === filter)

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const categories = [...new Set(linkedinPosts.map(p => p.category))]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-lg">
                N
              </div>
              <div>
                <h1 className="text-xl font-bold">Nodefy Sales</h1>
                <p className="text-sm text-slate-400">LinkedIn • Pipeline • Content</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {quickActions.map((action) => (
                <a
                  key={action.label}
                  href={action.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors flex items-center gap-2"
                >
                  <span>{action.icon}</span>
                  <span className="hidden md:inline">{action.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <section className="mb-8">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10">
              <p className="text-xs text-slate-400 uppercase tracking-wider">Deals/maand</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-bold">{salesTargets.current.dealsPerMonth}</span>
                <span className="text-sm text-emerald-400">→ {salesTargets.target90d.dealsPerMonth}</span>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10">
              <p className="text-xs text-slate-400 uppercase tracking-wider">Avg Retainer</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-bold">{salesTargets.current.avgRetainer}</span>
                <span className="text-sm text-emerald-400">→ {salesTargets.target90d.avgRetainer}</span>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10">
              <p className="text-xs text-slate-400 uppercase tracking-wider">Referral/Outbound</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-bold">{salesTargets.current.referralOutbound}</span>
                <span className="text-sm text-emerald-400">→ {salesTargets.target90d.referralOutbound}</span>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10">
              <p className="text-xs text-slate-400 uppercase tracking-wider">Pipeline</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-bold">{salesTargets.current.pipelineValue}</span>
                <span className="text-sm text-emerald-400">→ {salesTargets.target90d.pipelineValue}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* LinkedIn Posts List */}
          <div className="col-span-5">
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-lg">📝 LinkedIn Posts</h2>
                  <span className="text-xs text-slate-400">{linkedinPosts.length} ideeën</span>
                </div>
                {/* Filters */}
                <div className="flex gap-2">
                  {['all', 'ready', 'draft', 'idea'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1 rounded-full text-xs transition-colors ${
                        filter === f
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {f === 'all' ? 'Alle' : f === 'ready' ? '✅ Ready' : f === 'draft' ? '📝 Draft' : '💡 Idea'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="max-h-[600px] overflow-y-auto">
                {filteredPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className={`w-full text-left p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                      selectedPost?.id === post.id ? 'bg-blue-500/20 border-l-2 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        post.status === 'ready' ? 'bg-emerald-500/20 text-emerald-400' :
                        post.status === 'draft' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {post.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-white truncate">{post.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-slate-300">
                            {post.category}
                          </span>
                          <span className="text-xs text-slate-500">{post.hook}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Post Preview & Editor */}
          <div className="col-span-7">
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden h-full">
              {selectedPost ? (
                <>
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold">{selectedPost.title}</h2>
                      <p className="text-sm text-slate-400">{selectedPost.category} • {selectedPost.hook}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(selectedPost.concept, selectedPost.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          copiedId === selectedPost.id
                            ? 'bg-emerald-500 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        {copiedId === selectedPost.id ? '✓ Copied!' : '📋 Copy'}
                      </button>
                      <a
                        href="https://www.linkedin.com/post/new/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
                      >
                        Open LinkedIn →
                      </a>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="bg-black/30 rounded-xl p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto">
                      {selectedPost.concept}
                    </div>
                    <div className="mt-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                      <p className="text-sm text-blue-300">
                        💡 <strong>Tip:</strong> Pas de post aan naar jouw eigen stem. Voeg concrete voorbeelden uit Nodefy toe voor meer authenticiteit.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400">
                  <span className="text-5xl mb-4">📝</span>
                  <p className="text-lg">Selecteer een post om te bekijken</p>
                  <p className="text-sm mt-2">Klik op een idee links om de volledige tekst te zien</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Overview */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-4">📊 Content per Categorie</h2>
          <div className="grid grid-cols-5 gap-4">
            {categories.map((cat) => {
              const count = linkedinPosts.filter(p => p.category === cat).length
              const ready = linkedinPosts.filter(p => p.category === cat && p.status === 'ready').length
              return (
                <div key={cat} className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
                  <h3 className="font-medium text-sm">{cat}</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-bold">{count}</span>
                    <span className="text-xs text-emerald-400">{ready} ready</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 90-Day Roadmap */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-4">🎯 90-Dagen Sales Roadmap</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur rounded-xl p-5 border border-white/10">
              <h3 className="text-emerald-400 font-medium mb-3">Week 1-4: Foundation</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><span className="text-emerald-400">○</span> LinkedIn 3x/week posten</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">○</span> 3 case studies met ROI</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">○</span> Comment strategy starten</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">○</span> €10K package testen</li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-xl p-5 border border-white/10">
              <h3 className="text-amber-400 font-medium mb-3">Week 5-8: Outbound</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><span className="text-slate-500">○</span> 50 connecties/week</li>
                <li className="flex items-center gap-2"><span className="text-slate-500">○</span> DM sequence starten</li>
                <li className="flex items-center gap-2"><span className="text-slate-500">○</span> Eerste cold outreach</li>
                <li className="flex items-center gap-2"><span className="text-slate-500">○</span> Partnership gesprekken</li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-xl p-5 border border-white/10">
              <h3 className="text-blue-400 font-medium mb-3">Week 9-12: Scale</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><span className="text-slate-500">○</span> Content engine op stoom</li>
                <li className="flex items-center gap-2"><span className="text-slate-500">○</span> 5 meetings/week</li>
                <li className="flex items-center gap-2"><span className="text-slate-500">○</span> Pipeline naar 3x MRR</li>
                <li className="flex items-center gap-2"><span className="text-slate-500">○</span> Playbook documenteren</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-slate-500 text-center">
            Nodefy Sales Dashboard — Built by AI Agent — Frequentie: 1x per 2 weken LinkedIn
          </p>
        </div>
      </footer>
    </main>
  )
}
