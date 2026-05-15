import { useApp } from '../../context/AppContext'

const NAV_ITEMS = [
  { id: 'grupos',   icon: 'group',    label: 'Grupos'   },
  { id: 'explorar', icon: 'explore',  label: 'Explorar' },
  { id: 'matchs',   icon: 'favorite', label: 'Matchs',  badge: 4 },
  { id: 'perfil',   icon: 'person',   label: 'Perfil'   },
]

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp()

  return (
    <nav
      className="flex justify-around items-center bg-surface/95 backdrop-blur-md border-t border-outline/30 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50"
      style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))', paddingTop: 8 }}
    >
      {NAV_ITEMS.map(({ id, icon, label, badge }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex flex-col items-center gap-0.5 transition-all"
            style={{ color: isActive ? '#2563eb' : '#737686' }}
          >
            <div
              className="relative py-1 px-4 rounded-full transition-all duration-200"
              style={{ background: isActive ? 'rgba(37,99,235,0.12)' : 'transparent' }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 22,
                  fontVariationSettings: isActive
                    ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24"
                    : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                {icon}
              </span>
              {badge && !isActive && (
                <span className="absolute top-0.5 right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {badge}
                </span>
              )}
            </div>
            <span className={`text-[11px] tracking-wide ${isActive ? 'font-bold' : 'font-medium'}`}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
