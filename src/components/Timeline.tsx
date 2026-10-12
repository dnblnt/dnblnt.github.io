import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { career, timeline } from '../data'

export function monthIndex(value: string) {
  const [year, month] = value.split('-').map(Number)
  return year * 12 + month - 1
}

function currentMonth() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit' }).formatToParts(new Date())
  return Number(parts.find(part => part.type === 'year')!.value) * 12 + Number(parts.find(part => part.type === 'month')!.value) - 1
}

function dateLabel(index: number) {
  return `${timeline.months[index % 12]} ${Math.floor(index / 12)}`
}

export default function Timeline() {
  const start = monthIndex(timeline.start)
  const end = monthIndex(timeline.end)
  const now = Math.min(currentMonth(), end - 1)
  const range = end - start
  const [cursor, setCursor] = useState(Math.min(monthIndex(timeline.initial), now))
  const [playing, setPlaying] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const active = career.filter(role => cursor >= monthIndex(role.start) && cursor <= (role.end ? monthIndex(role.end) : now))
  const position = (index: number) => ((index - start) / range) * 100
  const label = cursor === now ? `${timeline.nowLabel} — ${Math.floor(now / 12)}` : dateLabel(cursor)

  useEffect(() => {
    const scroller = scrollRef.current
    if (scroller && scroller.scrollWidth > scroller.clientWidth) {
      scroller.scrollLeft = ((monthIndex(timeline.initial) - start) / range) * scroller.scrollWidth - scroller.clientWidth / 2
    }
  }, [start, range])

  useEffect(() => {
    if (!playing) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCursor(now)
      setPlaying(false)
      return
    }
    let animationId = 0
    let began: number | undefined
    const animate = (timestamp: number) => {
      began ??= timestamp
      const progress = Math.min((timestamp - began) / 18000, 1)
      setCursor(Math.round(start + (now - start) * progress))
      if (progress < 1) animationId = window.requestAnimationFrame(animate)
      else setPlaying(false)
    }
    animationId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(animationId)
  }, [playing, start, now])

  const scrub = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const fraction = (event.clientX - bounds.left) / bounds.width
    setCursor(Math.max(start, Math.min(now, Math.round(start + fraction * range))))
  }
  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    let next = cursor
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next -= event.shiftKey ? 12 : 1
    else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next += event.shiftKey ? 12 : 1
    else if (event.key === 'Home') next = start
    else if (event.key === 'End') next = now
    else return
    event.preventDefault()
    setPlaying(false)
    setCursor(Math.max(start, Math.min(now, next)))
  }

  return <div className="timeline">
    <div className="timeline-toolbar">
      <p>{timeline.description}</p>
      <button className="button button--small" aria-pressed={playing} onClick={() => {
        if (!playing) setCursor(start)
        setPlaying(!playing)
      }}><span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>{playing ? timeline.pause : timeline.play}</button>
    </div>
    <div className="timeline-scroll" ref={scrollRef}>
      <div className="timeline-track" ref={trackRef} role="slider" tabIndex={0} aria-label={timeline.accessibleLabel} aria-valuemin={start} aria-valuemax={now} aria-valuenow={cursor} aria-valuetext={`${label}, ${active.length} active roles`} onKeyDown={handleKey}
        onPointerDown={event => {
          if (event.button !== 0) return
          setPlaying(false)
          event.currentTarget.focus({ preventScroll: true })
          event.currentTarget.setPointerCapture(event.pointerId)
          scrub(event)
        }}
        onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) scrub(event) }}
        onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId) }}
        onPointerCancel={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId) }}>
        {Array.from({ length: range / 12 }, (_, index) => <div className="year-tick" key={index} style={{ left: `${position(start + index * 12)}%` }} aria-hidden="true"><span>’{String(Math.floor(start / 12) + index).slice(-2)}</span></div>)}
        {[0, 1, 2].map(lane => <div className="lane-guide" key={lane} style={{ top: `${67 + lane * 58}px` }} aria-hidden="true" />)}
        {career.map(role => {
          const roleStart = monthIndex(role.start)
          const roleEnd = Math.min(role.end ? monthIndex(role.end) + 1 : now + 1, end)
          return <div key={role.id} className={`career-bar${active.includes(role) ? ' is-active' : ''}`} style={{ left: `${position(roleStart)}%`, width: `${((roleEnd - roleStart) / range) * 100}%`, top: `${47 + role.lane * 58}px` }} title={`${role.studio} — ${role.role}`}>
            <strong>{role.studio}</strong><span>{role.role}</span>
          </div>
        })}
        <div className="timeline-cursor" style={{ left: `${position(cursor)}%` }} aria-hidden="true"><span className="cursor-handle" /><span className="cursor-month">{dateLabel(cursor)}</span></div>
      </div>
    </div>
    <p className="timeline-hint label">{timeline.hint}</p>
    <div className="timeline-readout" aria-live={playing ? 'off' : 'polite'} aria-atomic="true"><h3>{label}</h3><span className="label"><span className="status-square" aria-hidden="true" />{active.length} {timeline.activeRolesLabel}</span></div>
    <div className="career-details cell-grid">
      {active.length ? active.map(role => <article className="career-detail" key={role.id}>
        <div className="career-meta label"><span>{dateLabel(monthIndex(role.start))} → {role.end ? dateLabel(monthIndex(role.end)) : timeline.nowLabel}</span><span>{role.location}</span></div>
        <h4>{role.studio}</h4><p className="career-role">{role.role}</p><p className="career-work">{role.work}</p>
        <ul className="detail-list">{role.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
      </article>) : <article className="career-detail"><h4>{timeline.emptyHeading}</h4><p>{timeline.emptyDescription}</p></article>}
    </div>
  </div>
}
