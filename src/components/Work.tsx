import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { filters, projects, ui, type FilterId } from '../data'
import ProjectImage from './ProjectImage'

export default function Work() {
  const [filter, setFilter] = useState<FilterId>('all')
  const [selected, setSelected] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const visible = projects.filter(project => filter === 'all' || project.filters.includes(filter))
  const project = visible.find(project => project.slug === selected)
  const number = project ? projects.indexOf(project) + 1 : 0
  const close = (restoreFocus = true) => {
    setSelected(null)
    if (restoreFocus) openerRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    if (!selected) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selected])

  useLayoutEffect(() => {
    if (!selected || !panelRef.current) return
    const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 80
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: Math.max(0, window.scrollY + panelRef.current.getBoundingClientRect().top - headerHeight - 20), behavior: reducedMotion ? 'instant' : 'smooth' })
    panelRef.current.focus({ preventScroll: true })
  }, [selected])

  const cycle = (direction: number) => {
    const index = visible.findIndex(project => project.slug === selected)
    setSelected(visible[(index + direction + visible.length) % visible.length].slug)
  }

  return <>
    <div className="work-toolbar">
      <div className="filters" role="group" aria-label={ui.filterLabel}>
        {filters.map(item => {
          const count = item.id === 'all' ? projects.length : projects.filter(project => project.filters.includes(item.id as Exclude<FilterId, 'all'>)).length
          return <button className={`filter${filter === item.id ? ' is-active' : ''}`} key={item.id} aria-label={`${item.label}, ${count} ${ui.projectsLabel}`} aria-pressed={filter === item.id} onClick={() => { setFilter(item.id); close(false) }}>
            {item.label}<span aria-hidden="true">{count}</span>
          </button>
        })}
      </div>
      <span className="work-count label" aria-live="polite">{String(visible.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
    </div>
    {project && <div id="case-study" className="case-study" ref={panelRef} tabIndex={-1} role="region" aria-labelledby="case-title">
      <ProjectImage key={project.slug} project={project} large />
      <div className="case-content" key={project.slug}>
        <div className="case-toolbar">
          <span className="label">{ui.caseStudy} / P/{String(number).padStart(2, '0')}</span>
          <div className="case-controls">
            <button aria-label={ui.previous} onClick={() => cycle(-1)}>←</button>
            <button aria-label={ui.next} onClick={() => cycle(1)}>→</button>
            <button aria-label={ui.close} onClick={() => close()}>×</button>
          </div>
        </div>
        <h3 id="case-title">{project.title}</h3>
        {project.award && <span className="award">↗ {project.award}</span>}
        <dl className="case-specs">
          {[[ui.studio, project.studio], [ui.role, project.role], [ui.years, project.years]].filter(([, value]) => value).map(([label, value]) => <div key={label}><dt className="label">{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <ul className="detail-list">{project.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
        <ul className="chips" aria-label={ui.technologyLabel}>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
        {project.url && <a className="button button--small case-link" href={project.url} target="_blank" rel="noreferrer">{ui.visitProject}<span aria-hidden="true">↗</span></a>}
      </div>
    </div>}
    <div className="project-grid" key={filter}>
      {visible.map((project, index) => {
        const isSelected = selected === project.slug
        const projectNumber = String(projects.indexOf(project) + 1).padStart(2, '0')
        return <article className={`project-card${isSelected ? ' is-selected' : ''}`} key={project.slug} style={{ '--card-order': Math.min(index, 5) } as CSSProperties}>
          <ProjectImage project={project} />
          <div className="project-content">
            <div className="project-meta label"><span>P/{projectNumber}</span>{project.years && <span>{project.years}</span>}</div>
            <h3>{project.title}</h3>
            <span className="project-studio">{project.studio}</span>
            <p>{project.tagline}</p>
            <button className="project-view label" aria-expanded={isSelected} aria-controls={isSelected ? 'case-study' : undefined} aria-label={`${isSelected ? `${ui.closeAction}, ${ui.open}` : ui.viewAction} ${project.title} ${ui.caseStudyLabel}`} onClick={event => {
              openerRef.current = event.currentTarget
              if (isSelected) close(); else setSelected(project.slug)
            }}>{isSelected ? ui.open : ui.view}<span aria-hidden="true">{isSelected ? '−' : '→'}</span></button>
          </div>
        </article>
      })}
    </div>
  </>
}
