import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from './data.js'

gsap.registerPlugin(ScrollTrigger)

function Photo({ src, alt, priority = false, className = '' }) {
  return <img className={className} src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const root = useRef(null)

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    if (!opened) window.scrollTo(0, 0)
    return () => { document.body.style.overflow = '' }
  }, [opened])

  useEffect(() => {
    if (!opened || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => gsap.fromTo(el,{y:34,opacity:0},{y:0,opacity:1,duration:.95,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}))
      gsap.utils.toArray('.drift').forEach((el) => gsap.to(el,{yPercent:5,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:.7}}))
    }, root)
    return () => ctx.revert()
  }, [opened])

  const s = experience.scenes
  const p = experience.photos
  return <main ref={root} className="shell">
    {!opened && <section className="envelope" aria-label="Entry">
      <div className="seal">GL</div><p>{experience.category}</p><h1>{experience.project}</h1><small>{experience.couple.first} + {experience.couple.second}</small>
      <button onClick={() => setOpened(true)}>Open the letter</button>
    </section>}

    <div className={`story ${opened ? 'live' : ''}`} aria-hidden={!opened}>
      <section className="scene hero">
        <Photo src={p[0]} alt="Couple in soft greenhouse light" priority className="cover drift" />
        <div className="glass-grid" aria-hidden="true" />
        <div className="hero-copy reveal"><p>{s[0].label}</p><h2>{s[0].title}</h2><span>{s[0].note}</span></div>
      </section>

      <section className="scene letter-split paper">
        <div className="letter-card reveal"><p>{s[1].label}</p><h2>{s[1].title}</h2><span>{s[1].note}</span><em>Ooty · {experience.couple.date}</em></div>
        <Photo src={p[1]} alt="Arrival portrait" className="tall" />
      </section>

      <section className="scene first-letter pine">
        <div className="oversize">Dear</div><div className="letter-copy reveal"><p>{s[2].label}</p><h2>{s[2].title}</h2><span>{s[2].note}</span></div>
      </section>

      <section className="scene herbarium paper">
        <div className="specimen specimen-a"><Photo src={p[2]} alt="Botanical editorial frame" /></div>
        <div className="specimen specimen-b"><Photo src={p[3]} alt="Pressed-flower inspired portrait" /></div>
        <div className="caption reveal"><p>{s[3].label}</p><h2>{s[3].title}</h2><span>{s[3].note}</span></div>
      </section>

      <section className="scene portrait-room">
        <Photo src={p[4]} alt="Quiet anniversary portrait" className="cover" />
        <div className="portrait-note reveal"><p>{s[4].label}</p><h2>{s[4].title}</h2><span>{s[4].note}</span></div>
      </section>

      <section className="scene tea-table moss">
        <div className="number">06</div><div className="tea-copy reveal"><p>{s[5].label}</p><h2>{s[5].title}</h2><span>{s[5].note}</span></div>
        <Photo src={p[5]} alt="Tea table detail" className="tea-photo" />
      </section>

      <section className="scene window-study pine">
        <div className="window"><Photo src={p[6]} alt="Portrait through rain-softened glass" className="window-photo drift" /></div>
        <div className="window-copy reveal"><p>{s[6].label}</p><h2>{s[6].title}</h2><span>{s[6].note}</span></div>
      </section>

      <section className="scene second-letter paper">
        <div className="rule" /><div className="letter-copy second reveal"><p>{s[7].label}</p><h2>{s[7].title}</h2><span>{s[7].note}</span></div><div className="signature">A.</div>
      </section>

      <section className="scene family-grid">
        {[p[0],p[2],p[5],p[7]].map((src,i)=><Photo key={i} src={src} alt={`Family greenhouse frame ${i+1}`} className="grid-photo" />)}
        <div className="grid-copy reveal"><p>{s[8].label}</p><h2>{s[8].title}</h2><span>{s[8].note}</span></div>
      </section>

      <section className="scene golden-hour clay">
        <Photo src={p[7]} alt="Golden hour celebration portrait" className="gold-photo" />
        <div className="gold-copy reveal"><p>{s[9].label}</p><h2>{s[9].title}</h2><span>{s[9].note}</span></div>
      </section>

      <section className="scene renewal pine">
        <div className="rings" aria-hidden="true"><i/><i/></div><div className="renew-copy reveal"><p>{s[10].label}</p><h2>{s[10].title}</h2><span>{s[10].note}</span></div>
      </section>

      <section className="scene archive paper">
        <p>{s[11].label}</p><h2>{s[11].title}</h2><span>{s[11].note}</span>
        <div className="archive-meta"><strong>{experience.couple.first} + {experience.couple.second}</strong><span>{experience.couple.location}</span><span>{experience.couple.date}</span></div>
      </section>
    </div>
  </main>
}
