import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AVAILABLE, navigation, profile, services, skillGroups, ui } from './data'
import Work from './components/Work'
import Timeline from './components/Timeline'

function SectionHeading({ id, aside }: { id: string; aside?: ReactNode }) {
  const section = navigation.find(item => item.id === id)!
  return <div className="section-heading">
    <div><div className="section-kicker label"><span>{section.number}</span><span>/ {section.title}</span></div><h2 id={`${id}-title`}>{section.heading}</h2></div>
    {aside && <p className="section-aside">{aside}</p>}
  </div>
}

function ServiceIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    browser: <><path d="M3 5h26v22H3zM3 11h26M7 8h1m3 0h1" /><path d="m12 16-4 3 4 3m8-6 4 3-4 3m-3-8-2 12" /></>,
    cube: <><path d="m16 3 12 7v13l-12 7-12-7V10zm0 14v13M4 10l12 7 12-7M10 6.5l12 7" /></>,
    reels: <><path d="M3 6h26v20H3zm9 0v20m8-20v20" /><path d="m6 13 3 3-3 3m9-6 3 3-3 3m9-6 3 3-3 3" /></>,
    arrows: <><path d="M5 10h22m-6-6 6 6-6 6M27 23H5m6-6-6 6 6 6" /></>,
    pipeline: <><path d="M3 4h8v8H3zm18 16h8v8h-8zM11 8h9v16h1M7 12v12h14" /><path d="M16 4h12v8H16" /></>,
    flag: <><path d="M7 29V4m0 0h9l3 3h8v14h-8l-3-3H7M3 29h8" /></>,
  }
  return <svg className="service-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">{paths[name]}</svg>
}

function Contact() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const emailRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async () => {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
    } catch {
      const selection = window.getSelection()
      const range = document.createRange()
      if (emailRef.current) {
        range.selectNodeContents(emailRef.current)
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
      setCopyState('failed')
    }
    timer.current = setTimeout(() => setCopyState('idle'), 1600)
  }
  return <>
    <div className="section-kicker label"><span>{navigation[4].number}</span><span>/ {navigation[4].title}</span></div>
    <div className="contact-intro"><h2 id="contact-title">{profile.contactHeading[0]}<br />{profile.contactHeading[1]}<span className="contact-arrow" aria-hidden="true">↗</span></h2><p>{profile.contactDescription}</p></div>
    <div className="email-row"><a ref={emailRef} className="email-link" href={profile.enquiry}>{profile.email}</a><button className="button button--small copy-button" onClick={copy}><span aria-live="polite">{copyState === 'copied' ? ui.copied : copyState === 'failed' ? ui.copyFailed : ui.copyEmail}</span><span aria-hidden="true">{copyState === 'copied' ? '✓' : '⧉'}</span></button></div>
    <div className="contact-grid cell-grid">
      <div className="contact-cell"><span className="label">{profile.contactLabels.linkedin}</span><a href={profile.linkedin} target="_blank" rel="noreferrer">{profile.linkedinLabel}<span aria-hidden="true">↗</span></a></div>
      <div className="contact-cell"><span className="label">{profile.contactLabels.phone}</span><a href={profile.phoneHref}>{profile.phone}<span aria-hidden="true">↗</span></a></div>
      <div className="contact-cell"><span className="label">{profile.contactLabels.based}</span><span>{profile.location}</span></div>
    </div>
  </>
}

export default function App() {
  return <>
    <a className="skip-link" href="#main">{ui.skipLink}</a>
    <header className="site-header"><div className="container header-inner">
      <a className="brand" href="#top"><strong>{profile.brand}</strong><span>{profile.brandSuffix}</span></a>
      {AVAILABLE && <span className="availability label"><span className="status-square" aria-hidden="true" />{profile.available}</span>}
      <nav aria-label={ui.navigation}>{navigation.map(item => <a key={item.id} href={`#${item.id}`}><span>{item.number}</span>{item.navTitle ?? item.title}</a>)}</nav>
    </div></header>
    <main id="main">
      <section className="hero section" id="top" aria-labelledby="hero-title"><div className="container hero-grid">
        <div className="hero-copy"><p className="hero-label label">{profile.heroLabel}</p><h1 id="hero-title">{profile.headline[0]}<br />{profile.headline[1]}<br />{profile.headline[2]} <span className="highlight">{profile.highlight}</span></h1><p className="hero-description">{profile.introduction}</p><div className="hero-actions"><a className="button button--accent" href={profile.enquiry}>{profile.primaryCta}<span aria-hidden="true">→</span></a><a className="button" href="#work">{profile.secondaryCta}<span aria-hidden="true">↓</span></a></div></div>
        <aside className="spec-sheet" aria-label={ui.profileLabel}><div className="spec-header label"><span>{profile.specTitle}</span><span>{profile.specRevision}</span></div><dl>{profile.specs.map(spec => <div className="spec-row" key={spec.label}><dt className="label">{spec.label}</dt><dd>{spec.value}{spec.detail && <span>{spec.detail}</span>}</dd></div>)}</dl><div className="spec-footer"><span className="crosshair" aria-hidden="true">+</span><span className="label">{profile.specFootnote}</span><span className="crosshair" aria-hidden="true">+</span></div></aside>
      </div></section>
      <section className="section" id="services" aria-labelledby="services-title"><div className="container"><SectionHeading id="services" /><div className="services-grid cell-grid">{services.map(service => <article className="service-cell" key={service.code}><div className="service-top"><span className="label">{service.code}</span><ServiceIcon name={service.icon} /></div><h3>{service.title}</h3><p>{service.description}</p></article>)}</div></div></section>
      <section className="section" id="work" aria-labelledby="work-title"><div className="container"><SectionHeading id="work" aside={ui.workNote} /><Work /></div></section>
      <section className="section" id="timeline" aria-labelledby="timeline-title"><div className="container"><SectionHeading id="timeline" /><Timeline /></div></section>
      <section className="section" id="skills" aria-labelledby="skills-title"><div className="container"><SectionHeading id="skills" /><div className="skills-grid cell-grid">{skillGroups.map(group => <article className="skill-group" key={group.code}><span className="label">{group.code}</span><h3>{group.title}</h3><ul className="chips">{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article>)}</div></div></section>
      <section className="section contact-section" id="contact" aria-labelledby="contact-title"><div className="container"><Contact /></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-inner"><span>{ui.copyright}</span><span>{profile.footerNote}</span><a href="#top">{profile.footerSignature}<span aria-hidden="true">↑</span></a></div></footer>
  </>
}
