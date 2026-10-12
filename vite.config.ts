import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { metadata, profile } from './src/data'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const vercelDomain = env.VITE_VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_PROJECT_PRODUCTION_URL
  const origin = (env.VITE_SITE_URL || (vercelDomain ? `https://${vercelDomain}` : metadata.url)).replace(/\/$/, '')
  const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
  return {
    plugins: [react(), {
      name: 'portfolio-metadata',
      transformIndexHtml(html) {
        const values = { TITLE: metadata.title, DESCRIPTION: metadata.description, SOCIAL_DESCRIPTION: metadata.socialDescription, AUTHOR: profile.name, URL: origin, IMAGE: `${origin}/${metadata.socialImage}` }
        for (const [key, value] of Object.entries(values)) html = html.replaceAll(`__${key}__`, escape(value))
        return { html, tags: [{ tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.name, jobTitle: metadata.jobTitle, url: origin, email: profile.email, sameAs: [profile.linkedin], knowsAbout: ['Unity', 'C#', 'TypeScript', 'Pixi.js', 'Game development'] }).replaceAll('<', '\\u003c'), injectTo: 'head' as const }] }
      },
    }],
    base: './',
    build: { target: 'es2022' },
  }
})
