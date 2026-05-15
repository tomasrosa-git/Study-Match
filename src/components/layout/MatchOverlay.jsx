import Logo from '../Logo'
import { useApp } from '../../context/AppContext'

const MATCH_IMGS = {
  Valentina: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&q=80',
  Mateo:     'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80',
  Lucía:     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
  Santiago:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
  Camila:    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
  Nicolás:   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
}

export default function MatchOverlay() {
  const { matchOverlay, closeMatch, showToast, setActiveTab } = useApp()

  if (!matchOverlay.visible) return null

  const matchImg = MATCH_IMGS[matchOverlay.name]

  function handleCoordinate() {
    closeMatch()
    showToast('💬 Iniciando conversación...')
    setActiveTab('grupos')
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(10,15,40,0.82)', backdropFilter: 'blur(4px)' }}
      onClick={closeMatch}
    >
      <div
        className="rounded-3xl text-center text-white w-[88%] max-w-sm overflow-hidden animate-pop shadow-2xl"
        style={{ background: 'linear-gradient(160deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Stars/confetti header */}
        <div className="px-8 pt-8 pb-4">
          <div className="text-4xl mb-2 select-none">🎉</div>
          <h2 className="text-2xl font-extrabold tracking-tight">¡Es un Match!</h2>
          <p className="text-blue-200 text-[13px] mt-1">
            Vos y <strong className="text-white">{matchOverlay.name}</strong> quieren estudiar juntos
          </p>
        </div>

        {/* Avatars */}
        <div className="flex items-center justify-center gap-3 py-4">
          {/* My avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-white/40 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80"
              className="w-full h-full object-cover"
              alt="Tu foto"
            />
          </div>
          {/* Heart */}
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-white fill-icon" style={{ fontSize: 22 }}>favorite</span>
          </div>
          {/* Match avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-white/40 shadow-lg">
            {matchImg ? (
              <img src={matchImg} className="w-full h-full object-cover" alt={matchOverlay.name} />
            ) : (
              <div className="w-full h-full bg-blue-400 flex items-center justify-center text-2xl font-bold">
                {matchOverlay.name?.[0]}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-8 pt-2 flex flex-col gap-2.5">
          <button
            className="w-full bg-white text-primary font-bold py-3.5 rounded-2xl hover:bg-blue-50 transition active:scale-95 text-[15px] shadow-md"
            onClick={handleCoordinate}
          >
            Coordinar ahora
          </button>
          <button
            className="w-full text-blue-200 text-[13px] font-medium hover:text-white transition py-1"
            onClick={closeMatch}
          >
            Seguir explorando
          </button>
        </div>
      </div>
    </div>
  )
}
