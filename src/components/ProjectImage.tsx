import { useState } from 'react'
import { ui, type Project } from '../data'

export default function ProjectImage({ project, large = false }: { project: Project; large?: boolean }) {
  const imagePath = project.image === undefined ? `work/${project.slug}.jpg` : project.image
  const [failed, setFailed] = useState(!!project.withheld || !imagePath)
  return (
    <div className={`project-image project-image--${project.slug}${failed ? ' is-placeholder' : ''}`}>
      {!failed && <img src={`${import.meta.env.BASE_URL}${imagePath}`} alt={`${project.title} — ${ui.artworkLabel}`} loading="lazy" decoding="async" width="800" height="500" onError={() => setFailed(true)} />}
      {failed && <div className="image-placeholder" aria-label={project.title}>
        <svg className="placeholder-pattern" width="100%" height="100%" aria-hidden="true"><defs><pattern id={`stripes-${project.slug}-${large ? 'large' : 'card'}`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V12" stroke="currentColor" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill={`url(#stripes-${project.slug}-${large ? 'large' : 'card'})`} /></svg>
        <span className="placeholder-label">{project.slug === 'slots' ? ui.ndaLabel : ui.imageLabel}</span>
        <span className="placeholder-title">{project.title}</span>
        <span className="placeholder-cross" aria-hidden="true">+</span>
      </div>}
    </div>
  )
}
