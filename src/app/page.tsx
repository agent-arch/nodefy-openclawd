'use client'

import { useState } from 'react'

// ============================================
// OPENCLAW DASHBOARD
// Last Updated: 2026-04-05 09:00
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
  { id: 'nodefy-dashboard', name: 'Nodefy Dashboard', description: 'Internal dashboard', status: 'done', category: 'Nodefy Internal', url: 'https://nodefy-dashboard.vercel.app', folder: '~/clawd/nodefy-dashboard/', updatedAt: '2026-02-10' },
  { id: 'client-portal', name: 'Client Portal', description: 'Nodefy client portal concept', status: 'paused', category: 'Nodefy Internal', url: 'https://nodefy-client-portal.vercel.app', folder: '~/clawd/nodefy-client-portal/', updatedAt: '2026-02-08' },
  { id: 'linkedin-content', name: 'LinkedIn Content', description: 'LinkedIn content planning', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/nodefy-linkedin/', updatedAt: '2026-02-05' },
  { id: 'client-reports', name: 'Client Reports', description: 'Weekly/monthly client reports', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/client-reports/', updatedAt: '2026-02-14' },
  { id: 'audit-templates', name: 'Audit Templates', description: 'Google/Meta/Tracking audit templates', status: 'done', category: 'Nodefy Internal', folder: '~/clawd/audits/', updatedAt: '2026-02-10' },
  { id: 'cmmi-dashboard', name: 'CMMI Dashboard', description: 'Nodefy maturity tracking (1.75 → 3.0)', status: 'active', category: 'Nodefy Internal', url: 'https://nodefy-cmmi.vercel.app', folder: '~/clawd/nodefy-cmmi/', updatedAt: '2026-02-14' },
  { id: 'website-content', name: 'Website Content', description: 'Content voor Nodefy website redesign', status: 'done', category: 'Nodefy Internal', folder: '~/clawd/nodefy-website-content/', updatedAt: '2026-02-14' },
  
  // === LEAD GEN TOOLS ===
  { id: 'tracking-checker', name: 'Tracking Health Checker', description: 'Server side tracking scanner tool', status: 'blocked', category: 'Lead Gen Tools', folder: '~/clawd/tracking-health-checker/', updatedAt: '2026-02-14' },
  { id: 'meta-analyzer', name: 'Meta Ads Analyzer', description: 'Meta Ads analyse tool', status: 'done', category: 'Lead Gen Tools', folder: '~/clawd/meta-ads-analyzer/', updatedAt: '2026-02-03' },
  { id: 'meta-analyzer-web', name: 'Meta Ads Analyzer v1', description: 'First version of ad analyzer', status: 'done', category: 'Lead Gen Tools', url: 'https://meta-ads-analyzer-web.vercel.app', folder: '~/clawd/meta-ads-analyzer-web/', updatedAt: '2026-02-03' },
  { id: 'nodefy-scanner', name: 'Nodefy Scanner', description: 'Website scanning tool', status: 'done', category: 'Lead Gen Tools', folder: '~/clawd/nodefy-scanner/', updatedAt: '2026-01-28' },
  { id: 'shopify-calc', name: 'Shopify Calculator', description: 'Shopify ROI calculator', status: 'done', category: 'Lead Gen Tools', folder: '~/clawd/shopify-calculator/', updatedAt: '2026-02-05' },
  { id: 'roas-calc', name: 'ROAS Calculator', description: 'ROAS calculation tool', status: 'done', category: 'Lead Gen Tools', folder: '~/clawd/roas-calculator/', updatedAt: '2026-02-14' },
  
  // === CLIENT WEBSITES ===
  { id: 'fpnp', name: 'FPNP Website', description: 'Client website project', status: 'done', category: 'Client Websites', url: 'https://fpnp-website.vercel.app', folder: '~/clawd/fpnp-website/', updatedAt: '2026-02-06' },
  { id: 'foresight', name: 'Foresight Landing', description: 'Recruitment landing page', status: 'done', category: 'Client Websites', url: 'https://foresight-landing.vercel.app', folder: '~/clawd/foresight-landing/', updatedAt: '2026-02-05' },
  { id: 'goldrepublic', name: 'GoldRepublic Landing', description: 'Landing page project', status: 'done', category: 'Client Websites', url: 'https://goldrepublic-landing.vercel.app', folder: '~/clawd/goldrepublic-landing/', updatedAt: '2026-01-28' },
  { id: 'jesse', name: 'Jesse Jewelry', description: 'Jewelry webshop project', status: 'done', category: 'Client Websites', url: 'https://jesse-jewelry.vercel.app', folder: '~/clawd/jesse-jewelry/', updatedAt: '2026-01-25' },
  { id: 'sfi', name: 'SFI Greenmarkets', description: 'Green markets website', status: 'done', category: 'Client Websites', url: 'https://sfi-greenmarkets.vercel.app', folder: '~/clawd/sfi-greenmarkets/', updatedAt: '2026-01-12' },
  { id: 'zinc', name: 'Zinc Website', description: 'Client website', status: 'done', category: 'Client Websites', url: 'https://zinc-website.vercel.app', folder: '~/clawd/zinc-website/', updatedAt: '2026-01-15' },
  { id: 'tolbar', name: 'Tolbar Website', description: 'Client website', status: 'done', category: 'Client Websites', url: 'https://tolbar-website.vercel.app', folder: '~/clawd/tolbar-website/', updatedAt: '2026-01-18' },
  { id: 'aperghis', name: 'Aperghis Website', description: 'Client website', status: 'done', category: 'Client Websites', url: 'https://aperghis-website.vercel.app', folder: '~/clawd/aperghis-website/', updatedAt: '2026-02-01' },
  { id: 'spark', name: 'Spark Advertising', description: 'Advertising agency website', status: 'done', category: 'Client Websites', url: 'https://spark-advertising.vercel.app', folder: '~/clawd/spark-advertising/', updatedAt: '2026-01-10' },
  { id: 'capisoft', name: 'Capisoft Redesign', description: 'Website redesign', status: 'done', category: 'Client Websites', url: 'https://capisoft-redesign.vercel.app', folder: '~/clawd/capisoft-redesign/', updatedAt: '2026-01-30' },
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
  { id: 'whoop', name: 'Whoop Dashboard', description: 'Personal fitness dashboard', status: 'done', category: 'Experiments', url: 'https://whoop-dashboard.vercel.app', folder: '~/clawd/whoop-dashboard/', updatedAt: '2026-02-01' },
  { id: 'polymarket-bot', name: 'Polymarket Bot', description: 'Polymarket trading bot', status: 'done', category: 'Experiments', folder: '~/clawd/polymarket-bot/', updatedAt: '2026-02-01' },
  { id: 'polymarket-yolo', name: 'Polymarket YOLO', description: 'Polymarket trading experiment', status: 'done', category: 'Experiments', url: 'https://polymarket-yolo.vercel.app', folder: '~/clawd/polymarket-yolo/', updatedAt: '2026-01-28' },
  { id: 'sol', name: 'SOL Trader', description: 'Solana trading bot', status: 'done', category: 'Experiments', folder: '~/clawd/sol-trader/', updatedAt: '2026-01-25' },
  { id: 'disco', name: 'Disco Frog Clone', description: 'Interactive website clone', status: 'done', category: 'Experiments', url: 'https://discofrog-clone.vercel.app', folder: '~/clawd/discofrog-clone/', updatedAt: '2026-02-04' },
  { id: 'screensaver', name: 'Moltbot Screensaver', description: 'Idle screen with red lobster mascot', status: 'done', category: 'Experiments', url: 'https://nodefy-screensaver.vercel.app', folder: '~/clawd/screensaver/', updatedAt: '2026-02-04' },
  { id: 'valentijn', name: 'Valentijn', description: 'Video generation with Remotion', status: 'done', category: 'Experiments', url: 'https://valentijn.vercel.app', folder: '~/clawd/valentijn/', updatedAt: '2026-02-14' },
  { id: 'remotion', name: 'Remotion Project', description: 'Video generation with Remotion', status: 'done', category: 'Experiments', folder: '~/clawd/remotion-project/', updatedAt: '2026-01-05' },
  { id: 'blade', name: 'Blade Master Jobs', description: 'Job board project', status: 'done', category: 'Experiments', url: 'https://blade-master-jobs.vercel.app', folder: '~/clawd/blade-master-jobs/', updatedAt: '2026-01-15' },
  { id: 'mission', name: 'Mission Control', description: 'Control dashboard experiment', status: 'done', category: 'Experiments', folder: '~/clawd/mission-control/', updatedAt: '2026-02-05' },
  { id: 'jewber', name: 'Jewber', description: 'Jewelry project', status: 'paused', category: 'Experiments', folder: '~/clawd/jewber/', updatedAt: '2026-01-20' },
  { id: 'seo', name: 'SEO Bulk Network', description: '9 niche sites op Vercel', status: 'active', category: 'Experiments', folder: '~/clawd/seo-bulk-network/', updatedAt: '2026-02-03' },
  { id: 'ajax', name: 'Ajax Kijken', description: 'Live streaming project', status: 'done', category: 'Experiments', folder: '~/clawd/ajax-kijken/', updatedAt: '2026-01-08' },
  { id: 'displine', name: 'Displine Clone', description: 'SaaS website clone', status: 'done', category: 'Experiments', folder: '~/clawd/displine-clone/', updatedAt: '2026-02-05' },
  
  // === NEW (auto-detected 2026-02-15) ===
  { id: 'nodefy-hero', name: 'Nodefy Hero Section', description: 'Hero section design for website', status: 'active', category: 'Nodefy Internal', url: 'https://nodefy-hero-section.vercel.app', folder: '~/clawd/nodefy-hero-section/', updatedAt: '2026-02-15' },
  { id: 'nodefy-meta-analyzer', name: 'Nodefy Meta Analyzer', description: 'Meta Ads analysis tool v2', status: 'active', category: 'Lead Gen Tools', url: 'https://nodefy-meta-analyzer.vercel.app', folder: '~/clawd/nodefy-meta-analyzer/', updatedAt: '2026-02-15' },
  { id: 'nodefy-studio', name: 'Nodefy Studio', description: 'Creative studio tool', status: 'active', category: 'Nodefy Internal', url: 'https://nodefy-studio.vercel.app', folder: '~/clawd/nodefy-studio/', updatedAt: '2026-02-15' },
  { id: 'moltbot-shop', name: 'Moltbot Shop', description: 'Moltbot merchandise/atelier', status: 'active', category: 'Experiments', folder: '~/clawd/moltbot-shop/', updatedAt: '2026-02-15' },
  { id: 'competitive-intel', name: 'Competitive Intelligence', description: 'Ad spy & competitive research', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/competitive-intelligence/', updatedAt: '2026-02-15' },
  { id: 'sol-trader-vercel', name: 'SOL Trader (Vercel)', description: 'Solana trader web version', status: 'done', category: 'Experiments', url: 'https://sol-trader-vercel.vercel.app', folder: '~/clawd/sol-trader-vercel/', updatedAt: '2026-02-15' },
  { id: 'nda-nathan', name: 'NDA Nathan', description: 'NDA document', status: 'done', category: 'Nodefy Internal', folder: '~/clawd/nda-nathan/', updatedAt: '2026-02-16' },
  
  // === NEW (auto-detected 2026-02-17) ===
  { id: 'nodefy-spinoffs', name: 'Nodefy Spinoffs', description: 'US→EU SaaS opportunity explorer', status: 'active', category: 'Experiments', url: 'https://nodefy-spinoffs.vercel.app', folder: '~/clawd/nodefy-spinoffs/', updatedAt: '2026-02-17' },
  
  // === NEW (auto-detected 2026-02-18) ===
  { id: 'aromaclub-landing', name: 'Aromaclub Landing', description: 'Landing page project', status: 'done', category: 'Client Websites', url: 'https://aromaclub-landing.vercel.app', folder: '~/clawd/aromaclub-landing/', updatedAt: '2026-02-18' },
  { id: 'money-research', name: 'Money Research', description: 'AI income & creative monetization research', status: 'active', category: 'Experiments', folder: '~/clawd/money-research/', updatedAt: '2026-02-18' },
  { id: 'nodefy-sales', name: 'Nodefy Sales Data', description: 'Sales forecasting & metrics', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/nodefy-sales/', updatedAt: '2026-02-18' },
  { id: 'sales', name: 'Sales Pitches', description: 'Sales plans & client pitches', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/sales/', updatedAt: '2026-02-18' },
  
  // === NEW (auto-detected 2026-02-19) ===
  { id: 'kapisoft-landing', name: 'Kapisoft Landing', description: 'Landing page project', status: 'done', category: 'Client Websites', url: 'https://kapisoft-landing.vercel.app', folder: '~/clawd/kapisoft-landing/', updatedAt: '2026-02-19' },
  
  // === NEW (auto-detected 2026-02-20) ===
  { id: 'nodefy-presentaties', name: 'Nodefy Presentaties', description: 'Presentation templates & decks', status: 'active', category: 'Nodefy Internal', url: 'https://nodefy-presentaties.vercel.app', folder: '~/clawd/nodefy-presentaties/', updatedAt: '2026-02-20' },
  
  // === NEW (auto-detected 2026-02-21) ===
  { id: 'alabaster-website', name: 'Alabaster Website', description: 'Client website project', status: 'active', category: 'Client Websites', url: 'https://alabaster-website.vercel.app', folder: '~/clawd/alabaster-website/', updatedAt: '2026-02-21' },
  { id: 'code-zero-website', name: 'Code Zero Website', description: 'Client website project', status: 'active', category: 'Client Websites', url: 'https://code-zero-website.vercel.app', folder: '~/clawd/code-zero-website/', updatedAt: '2026-02-21' },
  
  // === NEW (auto-detected 2026-02-22) ===
  { id: 'marketing-agency-directory', name: 'Marketing Agency Directory', description: 'Agency directory/listing platform', status: 'active', category: 'Lead Gen Tools', url: 'https://marketing-agency-directory.vercel.app', folder: '~/clawd/marketing-agency-directory/', updatedAt: '2026-02-22' },
  
  // === NEW (auto-detected 2026-02-24) ===
  { id: 'nodefy-adengine', name: 'Nodefy Ad Engine', description: 'Ad engine/automation tool', status: 'active', category: 'AI Projects', url: 'https://nodefy-adengine.vercel.app', folder: '~/clawd/nodefy-adengine/', updatedAt: '2026-02-24' },
  { id: 'nodefy-audit-tool', name: 'Nodefy Audit Tool', description: 'Automated audit tool', status: 'active', category: 'Lead Gen Tools', url: 'https://nodefy-audit-tool.vercel.app', folder: '~/clawd/nodefy-audit-tool/', updatedAt: '2026-02-24' },
  
  // === NEW (auto-detected 2026-02-25) ===
  { id: 'nodefy-pitchdeck', name: 'Nodefy Pitchdeck', description: 'Pitch deck presentation app', status: 'active', category: 'Nodefy Internal', url: 'https://nodefy-pitchdeck.vercel.app', folder: '~/clawd/nodefy-pitchdeck/', updatedAt: '2026-02-25' },
  { id: 'nodefy-remotion', name: 'Nodefy Remotion', description: 'Video generation with Remotion', status: 'active', category: 'AI Projects', folder: '~/clawd/nodefy-remotion/', updatedAt: '2026-02-25' },
  { id: 'nodefy-roi-calculator', name: 'Nodefy ROI Calculator', description: 'ROI calculation tool', status: 'active', category: 'Lead Gen Tools', url: 'https://nodefy-roi-calculator.vercel.app', folder: '~/clawd/nodefy-roi-calculator/', updatedAt: '2026-02-25' },
  
  // === NEW (auto-detected 2026-02-25) ===
  { id: 'nodefy-onboarding', name: 'Client Onboarding Portal', description: '6-step client onboarding met auto-save en admin panel', status: 'active', category: 'Nodefy Internal', url: 'https://nodefy-onboarding.vercel.app', folder: '~/clawd/nodefy-onboarding/', updatedAt: '2026-02-25' },

  // === NEW (auto-detected 2026-03-08) ===
  { id: 'nodefy-onboarding-v2', name: 'Onboarding Portal v2', description: 'Next-gen client onboarding portal', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/nodefy-onboarding-v2/', updatedAt: '2026-03-08' },

  // === NEW (auto-detected 2026-02-28) ===
  { id: 'nodefy-funnel-planner', name: 'Nodefy Funnel Planner', description: 'Funnel planning tool', status: 'active', category: 'Lead Gen Tools', url: 'https://nodefy-funnel-planner.vercel.app', folder: '~/clawd/nodefy-funnel-planner/', updatedAt: '2026-02-28' },
  { id: 'nodefy-seo-scanner', name: 'Nodefy SEO Scanner', description: 'SEO scanning & analysis tool', status: 'active', category: 'Lead Gen Tools', url: 'https://nodefy-seo-scanner.vercel.app', folder: '~/clawd/nodefy-seo-scanner/', updatedAt: '2026-02-28' },

  // === NEW (auto-detected 2026-03-04) ===
  { id: 'estg-voorstel', name: 'ESTG Voorstel', description: 'ESTG proposal/pitch site', status: 'active', category: 'Client Websites', url: 'https://estg-voorstel.vercel.app', folder: '~/clawd/estg-voorstel/', updatedAt: '2026-03-04' },
  { id: 'nodefy-website', name: 'Nodefy Website', description: 'Main Nodefy website (Next.js)', status: 'active', category: 'Nodefy Internal', url: 'https://nodefy-website.vercel.app', folder: '~/clawd/nodefy-website/', updatedAt: '2026-03-04' },

  // === NEW (auto-detected 2026-03-07) ===
  { id: 'nodefy-adscaler', name: 'Nodefy AdScaler', description: 'Ad scaling automation tool', status: 'active', category: 'AI Projects', url: 'https://nodefy-adscaler.vercel.app', folder: '~/clawd/nodefy-adscaler/', updatedAt: '2026-03-07' },
  { id: 'nodefy-budget-pacer', name: 'Nodefy Budget Pacer', description: 'Budget pacing & management tool', status: 'active', category: 'Lead Gen Tools', url: 'https://nodefy-budget-pacer.vercel.app', folder: '~/clawd/nodefy-budget-pacer/', updatedAt: '2026-03-07' },
  { id: 'nodefy-leadmagnet', name: 'Nodefy Lead Magnet', description: 'Lead magnet creation tool', status: 'active', category: 'Lead Gen Tools', url: 'https://nodefy-leadmagnet.vercel.app', folder: '~/clawd/nodefy-leadmagnet/', updatedAt: '2026-03-07' },
  { id: 'nodefy-proposals', name: 'Nodefy Proposals', description: 'Proposal generation tool', status: 'active', category: 'Nodefy Internal', url: 'https://nodefy-proposals.vercel.app', folder: '~/clawd/nodefy-proposals/', updatedAt: '2026-03-07' },
  { id: 'surebird-redesign', name: 'Surebird Redesign', description: 'Client website redesign', status: 'active', category: 'Client Websites', url: 'https://surebird-redesign.vercel.app', folder: '~/clawd/surebird-redesign/', updatedAt: '2026-03-07' },
  { id: 'nodefy-admanager', name: 'Nodefy Ad Manager', description: 'Ad management platform', status: 'active', category: 'AI Projects', url: 'https://nodefy-admanager.vercel.app', folder: '~/clawd/nodefy-admanager/', updatedAt: '2026-03-07' },
  { id: 'nodefy-methods', name: 'Nodefy Methods', description: 'Methodology & process documentation', status: 'active', category: 'Nodefy Internal', url: 'https://nodefy-methods.vercel.app', folder: '~/clawd/nodefy-methods/', updatedAt: '2026-03-07' },

  // === NEW (auto-detected 2026-03-09) ===
  { id: 'nodefy-tools', name: 'Nodefy Tools', description: 'Internal tools collection (Next.js)', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/nodefy-tools/', updatedAt: '2026-03-09' },

  // === NEW (auto-detected 2026-03-10) ===
  { id: 'cima-redesign', name: 'Cima Redesign', description: 'Client website redesign (Next.js)', status: 'active', category: 'Client Websites', folder: '~/clawd/cima-redesign/', updatedAt: '2026-03-10' },
  { id: 'nodefy-share', name: 'Nodefy Share', description: 'Sharing/collaboration tool (Next.js)', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/nodefy-share/', updatedAt: '2026-03-10' },

  // === NEW (auto-detected 2026-03-11) ===
  { id: 'nodefy-brainstorm', name: 'Nodefy Brainstorm', description: 'Partnership brainstorm & planning tool (Next.js)', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/nodefy-brainstorm/', updatedAt: '2026-03-11' },

  // === NEW (auto-detected 2026-03-12) ===
  { id: 'nodefy-todo', name: 'Nodefy Todo', description: 'Task management app (Next.js)', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/nodefy-todo/', updatedAt: '2026-03-12' },
  { id: 'yoisho-analyse', name: 'Yoisho Analyse', description: 'Yoisho client analysis/report', status: 'done', category: 'Client Websites', folder: '~/clawd/yoisho-analyse/', updatedAt: '2026-03-12' },

  // === NEW (auto-detected 2026-03-14) ===
  { id: 'benjis-redesign', name: 'Benjis Redesign', description: 'Client website redesign (Next.js)', status: 'active', category: 'Client Websites', folder: '~/clawd/benjis-redesign/', updatedAt: '2026-03-14' },
  { id: 'moots-redesign', name: 'Moots Redesign', description: 'Client website redesign (Next.js)', status: 'active', category: 'Client Websites', folder: '~/clawd/moots-redesign/', updatedAt: '2026-03-14' },
  { id: 'nodefy-openclawd', name: 'OpenClaw Dashboard', description: 'This project dashboard (Next.js)', status: 'active', category: 'System', url: 'https://nodefy-openclawd.vercel.app', folder: '~/clawd/nodefy-openclawd/', updatedAt: '2026-03-14' },
  { id: 'nodefy-pandenchecker', name: 'Nodefy Pandenchecker', description: 'Panden/property checker tool (Next.js)', status: 'active', category: 'Lead Gen Tools', folder: '~/clawd/nodefy-pandenchecker/', updatedAt: '2026-03-14' },
  { id: 'lor-finance', name: 'LOR Finance', description: 'Finance landing page', status: 'done', category: 'Client Websites', folder: '~/clawd/lor-finance/', updatedAt: '2026-03-14' },

  // === NEW (auto-detected 2026-03-15) ===
  { id: 'nodefy-bedrijfsplan-site', name: 'Nodefy Bedrijfsplan Site', description: 'Bedrijfsplan presentation site (Next.js)', status: 'active', category: 'Nodefy Internal', folder: '~/clawd/nodefy-bedrijfsplan-site/', updatedAt: '2026-03-15' },

  // === NEW (auto-detected 2026-03-17) ===
  { id: 'pragma-website', name: 'Pragma Website', description: 'Static website (HTML/CSS/JS on Vercel)', status: 'done', category: 'Client Websites', url: 'https://pragma-website.vercel.app', folder: '~/clawd/pragma-website/', updatedAt: '2026-03-17' },

  // === NEW (auto-detected 2026-03-20) ===
  { id: 'cafe-de-wetering', name: 'Cafe de Wetering', description: 'Client website (HTML/Vercel)', status: 'active', category: 'Client Websites', folder: '~/clawd/cafe-de-wetering/', updatedAt: '2026-03-20' },
  { id: 'douwe-website', name: 'Douwe Website', description: 'Client website (static HTML)', status: 'done', category: 'Client Websites', folder: '~/clawd/douwe-website/', updatedAt: '2026-03-20' },

  // === NEW (auto-detected 2026-03-22) ===
  { id: 'nodefy-marketing-grader', name: 'Nodefy Marketing Grader', description: 'Marketing grading/scoring tool (Next.js)', status: 'active', category: 'Lead Gen Tools', folder: '~/clawd/nodefy-marketing-grader/', updatedAt: '2026-03-22' },

  // === NEW (auto-detected 2026-03-24) ===
  { id: 'huizentocht', name: 'Huizentocht', description: 'House hunting/property project', status: 'active', category: 'Experiments', folder: '~/clawd/huizentocht/', updatedAt: '2026-03-24' },
  { id: 'nodefy-skills', name: 'Nodefy Skills', description: 'Skill definitions & templates', status: 'active', category: 'System', folder: '~/clawd/nodefy-skills/', updatedAt: '2026-03-24' },

  // === NEW (auto-detected 2026-03-28) ===
  { id: 'carelli-report', name: 'Carelli Report', description: 'Client report (HTML)', status: 'done', category: 'Client Websites', folder: '~/clawd/carelli-report/', updatedAt: '2026-03-25' },
  { id: 'scaleup-research', name: 'Scaleup Research', description: 'Scaleup research report', status: 'done', category: 'Nodefy Internal', folder: '~/clawd/scaleup-research/', updatedAt: '2026-03-24' },

  // === NEW (auto-detected 2026-03-31) ===
  { id: 'mama-diner', name: 'Mama Diner', description: 'Restaurant/diner website (static HTML)', status: 'active', category: 'Client Websites', folder: '~/clawd/mama-diner/', updatedAt: '2026-03-31' },
  { id: 'nodefy-geo-checker', name: 'Nodefy Geo Checker', description: 'Geolocation checking tool (Next.js)', status: 'active', category: 'Lead Gen Tools', folder: '~/clawd/nodefy-geo-checker/', updatedAt: '2026-03-31' },
  { id: 'shoprise-website', name: 'Shoprise Website', description: 'Shoprise client website (Next.js)', status: 'active', category: 'Client Websites', folder: '~/clawd/shoprise-website/', updatedAt: '2026-03-31' },

  // === NEW (auto-detected 2026-04-03) ===
  { id: 'art-vastgoed', name: 'Art Vastgoed', description: 'Property/real estate art showcase (HTML)', status: 'active', category: 'Client Websites', folder: '~/clawd/art-vastgoed/', updatedAt: '2026-04-03' },
  { id: 'paperclip-os', name: 'Paperclip OS', description: 'Open-source AI agent framework', status: 'active', category: 'AI Projects', folder: '~/clawd/paperclip-os/', updatedAt: '2026-04-03' },
  { id: 'quiz-wiecher', name: 'Quiz Wiecher', description: 'Interactive quiz app (Next.js)', status: 'active', category: 'Experiments', folder: '~/clawd/quiz-wiecher/', updatedAt: '2026-04-03' },
  { id: 'unity-units', name: 'Unity Units', description: 'Data enrichment & scraping scripts', status: 'active', category: 'Lead Gen Tools', folder: '~/clawd/unity-units/', updatedAt: '2026-04-03' },
  { id: 'nodefy-businessplan', name: 'Nodefy Businessplan', description: 'Nodefy business plan document', status: 'done', category: 'Nodefy Internal', folder: '~/clawd/nodefy-businessplan/', updatedAt: '2026-04-03' },

  // === NEW (auto-detected 2026-04-05) ===
  { id: 'mirofish', name: 'MiroFish', description: 'AI fish identification/analysis tool', status: 'active', category: 'AI Projects', folder: '~/clawd/mirofish/', updatedAt: '2026-04-05' },
  { id: 'paperclip-nodefy', name: 'Paperclip × Nodefy', description: 'Paperclip infrastructure integration', status: 'active', category: 'AI Projects', folder: '~/clawd/paperclip-nodefy/', updatedAt: '2026-04-05' },
  { id: 'tecan-sa-crm', name: 'Tecan SA CRM', description: 'CRM data & venue analysis (60 venues)', status: 'done', category: 'Client Websites', folder: '~/clawd/tecan-sa-crm/', updatedAt: '2026-04-05' },
  { id: 'pragma-docs', name: 'Pragma Business', description: 'Pragma AI business plan & docs', status: 'active', category: 'AI Projects', folder: '~/clawd/pragma/', updatedAt: '2026-04-05' },

  // === SYSTEM ===
  { id: 'skills', name: 'Skills', description: 'OpenClaw skill definitions', status: 'active', category: 'System', folder: '~/clawd/skills/', updatedAt: '2026-02-14' },
  { id: 'memory', name: 'Memory', description: 'Daily notes and session memory', status: 'active', category: 'System', folder: '~/clawd/memory/', updatedAt: '2026-02-14' },
  { id: 'tasks', name: 'Tasks', description: 'Task lists and task tracking', status: 'active', category: 'System', folder: '~/clawd/tasks/', updatedAt: '2026-02-14' },
  { id: 'security', name: 'Security', description: 'Security configurations', status: 'active', category: 'System', folder: '~/clawd/security/', updatedAt: '2026-02-10' },
  { id: 'backups', name: 'Backups', description: 'Backup files', status: 'active', category: 'System', folder: '~/clawd/backups/', updatedAt: '2026-02-14' },
]

const categories: Category[] = ['all', 'OpenClaw Agency', 'Nodefy Internal', 'Lead Gen Tools', 'Client Websites', 'AI Projects', 'Experiments', 'System']

const LAST_UPDATED = '2026-04-06 09:00'

type StatusFilter = 'all' | 'active' | 'done' | 'paused' | 'blocked'

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all')
  const [onlyWithUrl, setOnlyWithUrl] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus
    const matchesUrl = !onlyWithUrl || !!p.url
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch && matchesStatus && matchesUrl
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
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
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
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {(['all', 'active', 'done', 'paused', 'blocked'] as StatusFilter[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    selectedStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#161B22] text-gray-400 border border-gray-800 hover:border-gray-600'
                  }`}
                >
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={() => setOnlyWithUrl(!onlyWithUrl)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                onlyWithUrl
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#161B22] text-gray-400 border border-gray-800 hover:border-gray-600'
              }`}
            >
              🔗 Alleen met Vercel URL
            </button>
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
