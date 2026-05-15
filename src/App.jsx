import { useRef, useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import BottomNav from './components/layout/BottomNav'
import Toast from './components/layout/Toast'
import MatchOverlay from './components/layout/MatchOverlay'
import Grupos from './screens/Grupos'
import Explorar from './screens/Explorar'
import Matchs from './screens/Matchs'
import Perfil from './screens/Perfil'

const SCREENS = { grupos: Grupos, explorar: Explorar, matchs: Matchs, perfil: Perfil }

function AppContent() {
  const { activeTab } = useApp()
  const keyRef = useRef(0)
  const prevTab = useRef(activeTab)

  useEffect(() => {
    if (prevTab.current !== activeTab) {
      keyRef.current += 1
      prevTab.current = activeTab
    }
  }, [activeTab])

  const Screen = SCREENS[activeTab]

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative bg-surface">
      <div key={activeTab} className="flex flex-col flex-1 overflow-hidden screen-enter">
        <Screen />
      </div>
      <BottomNav />
      <Toast />
      <MatchOverlay />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
