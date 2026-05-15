import { useState, useRef, useCallback } from 'react'
import { useApp } from '../context/AppContext'

const PERFILES = [
  {
    nombre: 'Carolina',
    año: '2do año',
    carrera: 'Psicología',
    universidad: 'UBA',
    materias: ['Neuroanatomía', 'Psicoanálisis', 'Clínica I'],
    objetivos: ['Estudio regular', 'Preparar finales'],
    bio: 'Psicóloga en formación, apasionada por el psicoanálisis lacaniano. Busco grupo de estudio para Freud y Lacan.',
    img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=85',
    verificado: true,
    online: true,
  },
  {
    nombre: 'Valentina',
    año: '2do año',
    carrera: 'Medicina',
    universidad: 'UBA',
    materias: ['Anatomía', 'Neuroanatomía', 'Biología Celular'],
    objetivos: ['Preparar finales', 'Intercambio apuntes'],
    bio: 'Busco compañero para resolver la guía de Neuroanatomía. Tengo los apuntes de la cátedra B completos.',
    img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=85',
    verificado: true,
    online: true,
  },
  {
    nombre: 'Lucía',
    año: '1er año',
    carrera: 'Psicología',
    universidad: 'UBA',
    materias: ['Psicoanálisis', 'Sociología', 'Biología'],
    objetivos: ['Estudio regular', 'Grupo TP'],
    bio: 'Primera vez en la uni, busco grupo de estudio responsable. Me va bien en Psicoanálisis y quiero estudiar con otros.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=85',
    verificado: false,
    online: false,
  },
  {
    nombre: 'Mateo',
    año: '3er año',
    carrera: 'Ing. Informática',
    universidad: 'UTN',
    materias: ['Algoritmos II', 'Bases de Datos', 'Estadística'],
    objetivos: ['Estudio regular', 'Intercambio apuntes'],
    bio: 'Busco compañero para resolver la guía de Grafos. Tengo todos los apuntes y guías resueltas de los últimos parciales.',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=85',
    verificado: true,
    online: true,
  },
  {
    nombre: 'Camila',
    año: '2do año',
    carrera: 'Psicología',
    universidad: 'UBA',
    materias: ['Neuroanatomía', 'Psicología Social', 'Epistemología'],
    objetivos: ['Estudio regular', 'Preparar finales'],
    bio: 'Busco grupo pequeño para repasar prácticos antes de cada parcial. Tengo disponibilidad tardes y fines de semana.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=85',
    verificado: false,
    online: true,
  },
  {
    nombre: 'Santiago',
    año: '4to año',
    carrera: 'Cs. Económicas',
    universidad: 'UBA',
    materias: ['Macroeconomía', 'Estadística', 'Econometría'],
    objetivos: ['Preparar finales', 'Intercambio apuntes'],
    bio: 'Busco alguien serio para el final de Macro. Tengo todos los resúmenes y guías.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85',
    verificado: true,
    online: false,
  },
  {
    nombre: 'Nicolás',
    año: '1er año',
    carrera: 'Psicología',
    universidad: 'UBA',
    materias: ['Psicoanálisis', 'Biología', 'Historia de la Psicología'],
    objetivos: ['Estudio regular', 'Grupo TP'],
    bio: 'Primer año, tratando de entender la carrera. Necesito compañeros para estudiar Psicoanálisis, me cuesta Freud.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=85',
    verificado: false,
    online: false,
  },
  {
    nombre: 'Sofía',
    año: '3er año',
    carrera: 'Psicología',
    universidad: 'UBA',
    materias: ['Clínica I', 'Psicología Laboral', 'Neuroanatomía'],
    objetivos: ['Grupo TP', 'Preparar finales'],
    bio: 'Buscando compañeras para armar grupo de estudio para Clínica I. También puedo ayudar con Neuroanatomía.',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85',
    verificado: true,
    online: true,
  },
  {
    nombre: 'Andrés',
    año: '2do año',
    carrera: 'Derecho',
    universidad: 'UBA',
    materias: ['Derecho Civil', 'Filosofía del Derecho', 'Procesal Penal'],
    objetivos: ['Preparar finales'],
    bio: 'Busco compañeros para el final de Civil. Tengo los fallos organizados.',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=85',
    verificado: false,
    online: false,
  },
]

const FLY = {
  left:  { transform: 'translateX(-150%) rotate(-22deg)', opacity: 0, transition: 'transform .42s ease-in, opacity .28s' },
  right: { transform: 'translateX(150%)  rotate(22deg)',  opacity: 0, transition: 'transform .42s ease-in, opacity .28s' },
  up:    { transform: 'translateY(-140%)',                opacity: 0, transition: 'transform .42s ease-in, opacity .28s' },
}

function calcMatch(perfil, profile) {
  if (perfil.carrera === profile.carrera) return { match: true, tipo: 'carrera' }
  const shared = perfil.materias.filter(m => (profile.materias || []).includes(m))
  if (shared.length > 0) return { match: true, tipo: 'materia', shared }
  return { match: false }
}

export default function Explorar() {
  const { showToast, showMatch, profile, addMatch, addSeenProfile, seenProfiles } = useApp()

  // Compute deck once at mount — filter profiles already seen in previous sessions
  const [deck] = useState(() => PERFILES.filter(p => !seenProfiles.includes(p.nombre)))

  const [index, setIndex] = useState(0)
  const [done, setDone]   = useState(() => PERFILES.filter(p => !seenProfiles.includes(p.nombre)).length === 0)
  const [fly, setFly]     = useState(null)
  const [drag, setDrag]   = useState({ x: 0, y: 0, active: false })

  const dragging = useRef(false)
  const startX   = useRef(0)
  const startY   = useRef(0)

  const likeOpacity = drag.active && drag.x > 20  ? Math.min(drag.x / 80, 1) : 0
  const nopeOpacity = drag.active && drag.x < -20 ? Math.min(-drag.x / 80, 1) : 0
  const cardDragStyle = drag.active ? { transform: `translate(${drag.x}px,${drag.y}px) rotate(${drag.x * 0.07}deg)` } : {}

  const advance = useCallback(() => {
    setFly(null)
    setDrag({ x: 0, y: 0, active: false })
    setIndex(prev => {
      const next = prev + 1
      if (next >= deck.length) { setDone(true); return prev }
      return next
    })
  }, [deck.length])

  const triggerSwipe = useCallback((dir) => {
    setFly(dir)
    setDrag({ x: 0, y: 0, active: false })
    const perfil = deck[index]
    const result = calcMatch(perfil, profile)

    // Mark as seen in every case
    addSeenProfile(perfil.nombre)

    if (dir === 'left') {
      showToast('Siguiente')
    } else {
      // Right or up swipe → add to matches
      const motivoMatch = result.tipo === 'carrera'
        ? `Misma carrera (${perfil.carrera})`
        : result.tipo === 'materia'
          ? `Materias en común: ${result.shared?.join(', ')}`
          : 'Misma universidad'

      addMatch({
        ...perfil,
        materiasComunes: result.tipo === 'materia' ? result.shared : [],
        motivoMatch,
        disponibilidad: [],
        mensajes: [],
      })

      if (dir === 'up') showToast('⭐ Super Like enviado')
      else showToast('❤️ Like enviado — ¡Es un match!')

      if (result.match) setTimeout(() => showMatch(perfil.nombre), 520)
    }

    setTimeout(advance, 440)
  }, [index, deck, showToast, showMatch, advance, profile, addMatch, addSeenProfile])

  function getCoords(e) {
    return e.touches        ? [e.touches[0].clientX,        e.touches[0].clientY]
         : e.changedTouches ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
         : [e.clientX, e.clientY]
  }
  const onDown = (e) => { dragging.current = true; [startX.current, startY.current] = getCoords(e) }
  const onMove = (e) => {
    if (!dragging.current) return
    const [cx, cy] = getCoords(e)
    setDrag({ x: cx - startX.current, y: cy - startY.current, active: true })
  }
  const onUp = (e) => {
    if (!dragging.current) return
    dragging.current = false
    const [cx, cy] = getCoords(e)
    const dx = cx - startX.current, dy = cy - startY.current
    if      (dx >  88) triggerSwipe('right')
    else if (dx < -88) triggerSwipe('left')
    else if (dy < -80) triggerSwipe('up')
    else setDrag({ x: 0, y: 0, active: false })
  }

  const perfil = deck[index]
  const nextP  = deck[index + 1]
  const result = perfil ? calcMatch(perfil, profile) : null

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-4 sticky top-0 z-20"
        style={{ background: 'rgba(249,249,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(195,198,215,0.3)' }}>
        <button onClick={() => showToast('🔧 Filtros: Universidad · Carrera · Materia')}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition">
          <span className="material-symbols-outlined text-on-surface-muted" style={{ fontSize: 22 }}>tune</span>
        </button>
        <span className="font-bold text-on-surface text-[15px] tracking-wide">Explorar</span>
        <button onClick={() => showToast('🔍 Buscar por nombre...')}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition">
          <span className="material-symbols-outlined text-on-surface-muted" style={{ fontSize: 22 }}>search</span>
        </button>
      </header>

      {/* Full-screen card area */}
      <div className="flex-1 relative overflow-hidden">

        {done ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 px-8">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 80 }}>school</span>
            <h3 className="font-bold text-on-surface text-xl">¡Revisaste todos!</h3>
            <p className="text-sm text-on-surface-muted leading-relaxed">Volvé más tarde para ver nuevos estudiantes o ajustá tus filtros de búsqueda.</p>
            <button className="bg-primary text-white text-sm font-bold px-8 py-3 rounded-full mt-1 hover:bg-primary-dark transition active:scale-95"
              style={{ boxShadow: '0 4px 20px rgba(37,99,235,.35)' }}
              onClick={() => {
                // Reset local state — context seenProfiles persists so next session also filtered
                setDone(false)
                setIndex(0)
              }}>
              Ver de nuevo
            </button>
          </div>
        ) : (
          <>
            {/* Next card (peeking behind) */}
            {nextP && (
              <div className="absolute inset-0" style={{ transform: 'scale(0.92) translateY(12px)', zIndex: 0 }}>
                <img src={nextP.img} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            )}

            {/* Main swipe card */}
            <div
              className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
              style={{
                zIndex: 1,
                ...(fly ? FLY[fly] : {}),
                ...(drag.active && !fly ? cardDragStyle : {}),
                ...(!drag.active && !fly ? { transition: 'transform .32s cubic-bezier(.34,1.56,.64,1)' } : {}),
              }}
              onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
              onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
            >
              <img src={perfil.img} className="w-full h-full object-cover absolute inset-0" alt={perfil.nombre} draggable={false} />

              {/* Gradient */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.3) 50%, transparent 75%)' }} />

              {/* LIKE / NOPE */}
              <div className="absolute top-10 left-5 border-[3px] border-green-400 text-green-400 rounded-xl px-3 py-1 text-xl font-extrabold tracking-widest pointer-events-none"
                style={{ opacity: likeOpacity, transform: 'rotate(-14deg)', transition: 'opacity .08s' }}>LIKE ✓</div>
              <div className="absolute top-10 right-5 border-[3px] border-red-400 text-red-400 rounded-xl px-3 py-1 text-xl font-extrabold tracking-widest pointer-events-none"
                style={{ opacity: nopeOpacity, transform: 'rotate(14deg)', transition: 'opacity .08s' }}>NOPE ✗</div>

              {/* Progress dots */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {deck.map((_, i) => (
                  <div key={i} className="h-1 rounded-full transition-all duration-300"
                    style={{ width: i === index ? 18 : 5, background: i <= index ? '#fff' : 'rgba(255,255,255,0.35)' }} />
                ))}
              </div>

              {/* Bottom info + action buttons */}
              <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ paddingBottom: 80 }}>
                <div className="px-5 pb-3">
                  {/* Match reason tag */}
                  {result?.match && (
                    <div className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-400/40 text-green-300 text-[11px] font-bold px-2.5 py-1 rounded-full mb-2 backdrop-blur-sm">
                      <span className="material-symbols-outlined fill-icon" style={{ fontSize: 12 }}>check_circle</span>
                      {result.tipo === 'carrera' ? 'Misma carrera' : `Comparten: ${result.shared?.join(', ')}`}
                    </div>
                  )}

                  <p className="text-[22px] font-extrabold text-white leading-tight">
                    {perfil.nombre}
                    {perfil.verificado && <span className="text-blue-300 text-base ml-2">✓</span>}
                  </p>
                  <p className="text-[13px] text-white/75 font-medium mb-1.5">{perfil.año} · {perfil.carrera} · {perfil.universidad}</p>

                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined fill-icon text-white/70" style={{ fontSize: 13 }}>school</span>
                    <span className="text-[12px] text-white/75">{perfil.materias.slice(0, 2).join(' · ')}{perfil.materias.length > 2 ? '...' : ''}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {perfil.objetivos.map(o => (
                      <span key={o} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)', color: '#fff' }}>{o}</span>
                    ))}
                  </div>

                  <p className="text-[12px] text-white/80 leading-relaxed line-clamp-2 mb-4">{perfil.bio}</p>

                  {/* Action buttons */}
                  <div className="flex items-center justify-center gap-4 pointer-events-auto">
                    <button onClick={() => triggerSwipe('left')} className="flex flex-col items-center gap-1 group">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all active:scale-90 group-hover:bg-white/30">
                        <span className="material-symbols-outlined text-white" style={{ fontSize: 28 }}>close</span>
                      </div>
                      <span className="text-[10px] text-white/70 font-medium">Pasar</span>
                    </button>

                    <button onClick={() => triggerSwipe('up')} className="flex flex-col items-center gap-1 group">
                      <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all active:scale-90 group-hover:bg-white/30">
                        <span className="material-symbols-outlined text-yellow-300" style={{ fontSize: 22 }}>star</span>
                      </div>
                      <span className="text-[10px] text-white/70 font-medium">Super</span>
                    </button>

                    <button onClick={() => triggerSwipe('right')} className="flex flex-col items-center gap-1 group">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-90 group-hover:opacity-90"
                        style={{ background: 'linear-gradient(135deg,#2563eb,#3b82f6)', boxShadow: '0 4px 20px rgba(37,99,235,.5)' }}>
                        <span className="material-symbols-outlined fill-icon text-white" style={{ fontSize: 28 }}>favorite</span>
                      </div>
                      <span className="text-[10px] text-white/90 font-bold">Like</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
