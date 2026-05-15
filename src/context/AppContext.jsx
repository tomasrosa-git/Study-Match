import { createContext, useContext, useState, useCallback, useRef } from 'react'

const AppContext = createContext(null)

const DEFAULT_PROFILE = {
  nombre: 'María González',
  universidad: 'Universidad de Buenos Aires (UBA)',
  carrera: 'Psicología',
  año: '2do año',
  materias: ['Neuroanatomía', 'Psicoanálisis'],
  objetivos: ['regular', 'tp'],
  bio: 'Busco compañeros responsables para estudiar los fines de semana.',
  disponibilidad: ['Tardes', 'Fines de semana'],
  estiloEstudio: 'grupal',
  turno: 'tarde',
  foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=85',
}

function loadProfile() {
  try { return { ...DEFAULT_PROFILE, ...JSON.parse(localStorage.getItem('sm_profile') || '{}') } }
  catch { return DEFAULT_PROFILE }
}

function loadMatches() {
  try { return JSON.parse(localStorage.getItem('sm_matches') || '[]') }
  catch { return [] }
}

function loadSeen() {
  try { return JSON.parse(localStorage.getItem('sm_seen') || '[]') }
  catch { return [] }
}

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState('grupos')
  const [toast, setToast] = useState({ visible: false, message: '' })
  const [matchOverlay, setMatchOverlay] = useState({ visible: false, name: '' })
  const [profile, setProfileState] = useState(loadProfile)
  const [matches, setMatches] = useState(loadMatches)
  const [seenProfiles, setSeenProfiles] = useState(loadSeen)
  const toastTimer = useRef(null)

  const showToast = useCallback((message) => {
    setToast({ visible: true, message })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast({ visible: false, message: '' }), 2500)
  }, [])

  const showMatch = useCallback((name) => setMatchOverlay({ visible: true, name }), [])
  const closeMatch = useCallback(() => setMatchOverlay({ visible: false, name: '' }), [])

  const saveProfile = useCallback((data) => {
    const next = { ...data }
    setProfileState(next)
    try { localStorage.setItem('sm_profile', JSON.stringify(next)) } catch {}
  }, [])

  const addMatch = useCallback((perfil) => {
    setMatches(prev => {
      if (prev.find(m => m.nombre === perfil.nombre)) return prev
      const next = [{ ...perfil, nuevo: true, mensajes: [] }, ...prev]
      try { localStorage.setItem('sm_matches', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const addSeenProfile = useCallback((nombre) => {
    setSeenProfiles(prev => {
      if (prev.includes(nombre)) return prev
      const next = [...prev, nombre]
      try { localStorage.setItem('sm_seen', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const clearSeen = useCallback(() => {
    setSeenProfiles([])
    try { localStorage.removeItem('sm_seen') } catch {}
  }, [])

  return (
    <AppContext.Provider value={{
      activeTab, setActiveTab,
      toast, showToast,
      matchOverlay, showMatch, closeMatch,
      profile, saveProfile,
      matches, addMatch,
      seenProfiles, addSeenProfile, clearSeen,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() { return useContext(AppContext) }
