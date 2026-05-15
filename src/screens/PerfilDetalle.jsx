export default function PerfilDetalle({ match, onBack, onChat }) {
  const compatColor = match.compatibilidad >= 85 ? '#22c55e' : match.compatibilidad >= 70 ? '#f59e0b' : '#ef4444'

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Back header */}
      <header className="flex items-center gap-3 px-4 py-3.5 bg-surface/95 backdrop-blur-md border-b border-outline/30 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition"
        >
          <span className="material-symbols-outlined text-on-surface-muted" style={{ fontSize: 22 }}>arrow_back</span>
        </button>
        <span className="font-bold text-on-surface text-[15px]">Perfil</span>
      </header>

      <div className="flex-1 overflow-y-auto no-scroll pb-28">
        {/* Hero photo */}
        <div className="relative h-64">
          {match.img ? (
            <img src={match.img} className="w-full h-full object-cover object-top" alt={match.nombre} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl font-bold" style={{ background: match.color, color: match.textColor }}>
              {match.inicial}
            </div>
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 60%)' }} />
          <div className="absolute bottom-4 left-5 text-white">
            <h2 className="text-2xl font-extrabold">{match.nombre}</h2>
            <p className="text-sm opacity-80">{match.año} · {match.carrera}</p>
          </div>
          {match.online && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-500/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              En línea
            </div>
          )}
        </div>

        <div className="px-5 pt-4 flex flex-col gap-4">

          {/* Compatibilidad */}
          <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 1px 6px rgba(0,0,0,.07)' }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] font-semibold text-on-surface">Compatibilidad</p>
              <span className="text-lg font-extrabold" style={{ color: compatColor }}>{match.compatibilidad}%</span>
            </div>
            <div className="h-2 rounded-full bg-surface-container overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${match.compatibilidad}%`, background: compatColor }} />
            </div>
            <p className="text-[12px] text-on-surface-muted mt-2">
              {match.motivoMatch || 'Coincidencia en materias de estudio'}
            </p>
          </div>

          {/* Materias */}
          <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 1px 6px rgba(0,0,0,.07)' }}>
            <p className="text-[12px] font-bold text-on-surface-muted uppercase tracking-widest mb-2.5">Materias actuales</p>
            <div className="flex flex-wrap gap-2">
              {match.materias.map(m => (
                <span key={m} className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold ${
                  match.materiasComunes?.includes(m)
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'bg-surface-container text-on-surface-muted'
                }`}>
                  {match.materiasComunes?.includes(m) && '✓ '}{m}
                </span>
              ))}
            </div>
            {match.materiasComunes?.length > 0 && (
              <p className="text-[11px] text-primary mt-2 font-medium">
                ✓ = materias en común con vos
              </p>
            )}
          </div>

          {/* Objetivos */}
          <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 1px 6px rgba(0,0,0,.07)' }}>
            <p className="text-[12px] font-bold text-on-surface-muted uppercase tracking-widest mb-2.5">Objetivos</p>
            <div className="flex flex-wrap gap-2">
              {(match.objetivos || [match.objetivo]).map(o => (
                <span key={o} className="bg-primary/10 text-primary rounded-xl px-3 py-1.5 text-[12px] font-semibold">{o}</span>
              ))}
            </div>
          </div>

          {/* Bio */}
          {match.bio && (
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 1px 6px rgba(0,0,0,.07)' }}>
              <p className="text-[12px] font-bold text-on-surface-muted uppercase tracking-widest mb-2">Bio</p>
              <p className="text-[13px] text-on-surface leading-relaxed">{match.bio}</p>
            </div>
          )}

          {/* Disponibilidad */}
          {match.disponibilidad && (
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 1px 6px rgba(0,0,0,.07)' }}>
              <p className="text-[12px] font-bold text-on-surface-muted uppercase tracking-widest mb-2">Disponibilidad</p>
              <div className="flex flex-wrap gap-2">
                {match.disponibilidad.map(d => (
                  <span key={d} className="bg-surface-container text-on-surface-muted rounded-xl px-3 py-1 text-[12px] font-medium">📅 {d}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Coordinar button */}
      <div className="fixed bottom-[68px] left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-2 pt-3 bg-surface/95 backdrop-blur border-t border-outline/20">
        <button
          onClick={onChat}
          className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-primary-dark transition active:scale-95 text-[15px]"
          style={{ boxShadow: '0 4px 20px rgba(37,99,235,.4)' }}
        >
          <span className="material-symbols-outlined fill-icon" style={{ fontSize: 18 }}>chat_bubble</span>
          Coordinar ahora
        </button>
      </div>
    </div>
  )
}
