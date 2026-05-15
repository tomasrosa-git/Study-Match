import { useState } from 'react'
import TopBar from '../components/layout/TopBar'
import { useApp } from '../context/AppContext'

const UNIVERSIDADES = [
  'Universidad de Buenos Aires (UBA)',
  'Universidad Tecnológica Nacional (UTN)',
  'Universidad Nacional de Córdoba (UNC)',
  'Universidad Nacional de La Plata (UNLP)',
  'Universidad Nacional de Rosario (UNR)',
  'Universidad Nacional de San Martín (UNSAM)',
  'Universidad Nacional de Quilmes (UNQ)',
]

const CARRERAS = [
  'Ingeniería Informática',
  'Psicología',
  'Medicina',
  'Arquitectura',
  'Ciencias Económicas',
  'Ingeniería Industrial',
  'Bioquímica',
  'Derecho',
  'Diseño Gráfico',
  'Sociología',
  'Filosofía',
  'Matemática',
]

const AÑOS = ['1er año', '2do año', '3er año', '4to año', '5to año', '6to año']

const OBJETIVOS = [
  { id: 'regular',    label: 'Estudio regular',    icon: 'menu_book' },
  { id: 'tp',         label: 'Grupo TP',            icon: 'groups' },
  { id: 'apuntes',    label: 'Intercambio apuntes', icon: 'description' },
  { id: 'finales',    label: 'Preparar finales',    icon: 'emoji_events' },
  { id: 'exposicion', label: 'Exposición oral',     icon: 'record_voice_over' },
  { id: 'problemas',  label: 'Resolver problemas',  icon: 'psychology' },
]

const DISPONIBILIDAD_OPTS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábados', 'Domingos']

const ESTILOS = [
  { id: 'individual', label: 'Individual', icon: 'person' },
  { id: 'grupal',     label: 'Grupal',     icon: 'group' },
  { id: 'mixto',      label: 'Mixto',      icon: 'shuffle' },
]

const TURNOS = [
  { id: 'mañana', label: 'Mañana',  icon: 'wb_sunny' },
  { id: 'tarde',  label: 'Tarde',   icon: 'partly_cloudy_day' },
  { id: 'noche',  label: 'Noche',   icon: 'nights_stay' },
]

const MAX_BIO = 160
const STATS = [
  { label: 'Grupos',  value: 3 },
  { label: 'Matchs',  value: 4 },
  { label: 'Horas',   value: 12 },
]

function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-on-surface-muted tracking-widest uppercase px-0.5">
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-on-surface-muted px-0.5">{hint}</p>}
    </div>
  )
}

function SelectField({ value, onChange, options }) {
  return (
    <div className="relative">
      <select className="sm-input appearance-none pr-10" value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-muted pointer-events-none" style={{ fontSize: 20 }}>
        expand_more
      </span>
    </div>
  )
}

export default function Perfil() {
  const { showToast, profile, saveProfile } = useApp()

  const [nombre,       setNombre]       = useState(profile.nombre)
  const [universidad,  setUniversidad]  = useState(profile.universidad)
  const [carrera,      setCarrera]      = useState(profile.carrera)
  const [año,          setAño]          = useState(profile.año || '2do año')
  const [materias,     setMaterias]     = useState(profile.materias || [])
  const [materiaInput, setMateriaInput] = useState('')
  const [objetivos,    setObjetivos]    = useState(profile.objetivos || [])
  const [bio,          setBio]          = useState(profile.bio || '')
  const [disponibilidad, setDisponibilidad] = useState(profile.disponibilidad || [])
  const [estiloEstudio, setEstiloEstudio]   = useState(profile.estiloEstudio || 'mixto')
  const [turno,        setTurno]        = useState(profile.turno || 'tarde')

  function addMateria(e) {
    if (e.key !== 'Enter') return
    const val = materiaInput.trim()
    if (!val || materias.includes(val)) return
    setMaterias(p => [...p, val])
    setMateriaInput('')
  }

  function removeMateria(m) {
    setMaterias(p => p.filter(x => x !== m))
  }

  function toggleObjetivo(id) {
    setObjetivos(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  }

  function toggleDisponibilidad(d) {
    setDisponibilidad(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d])
  }

  function handleSave() {
    saveProfile({ nombre, universidad, carrera, año, materias, objetivos, bio, disponibilidad, estiloEstudio, turno })
    showToast('✅ Perfil guardado exitosamente')
  }

  const bioRemaining = MAX_BIO - bio.length
  const bioColor = bioRemaining <= 20 ? '#ef4444' : bioRemaining <= 40 ? '#f59e0b' : '#737686'

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <TopBar showBrand />

      <div className="flex-1 overflow-y-auto no-scroll pb-24">

        {/* Hero cover + avatar */}
        <div className="relative mb-16">
          <div className="h-28 w-full" style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6, #60a5fa)' }} />
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl cursor-pointer"
                onClick={() => showToast('📷 Función de foto próximamente')}
              >
                {profile.foto ? (
                  <img src={profile.foto} className="w-full h-full object-cover" alt="Foto de perfil" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white" style={{ background: '#2563eb' }}>
                    {nombre.charAt(0)}
                  </div>
                )}
              </div>
              <button
                className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-primary-dark transition"
                onClick={() => showToast('📷 Función de foto próximamente')}
              >
                <span className="material-symbols-outlined text-white" style={{ fontSize: 15 }}>photo_camera</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex justify-center gap-8 mb-5 px-5">
          {STATS.map(s => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-xl font-extrabold text-on-surface">{s.value}</span>
              <span className="text-[11px] text-on-surface-muted font-medium">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4 px-5">

          {/* ── Datos personales ── */}
          <p className="text-[11px] font-bold text-on-surface-muted tracking-widest uppercase mt-1">Datos personales</p>

          <Field label="Nombre completo">
            <input
              className="sm-input"
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Tu nombre real"
            />
          </Field>

          <Field label="Universidad">
            <SelectField value={universidad} onChange={setUniversidad} options={UNIVERSIDADES} />
          </Field>

          <div className="flex gap-3">
            <div className="flex-1">
              <Field label="Carrera">
                <SelectField value={carrera} onChange={setCarrera} options={CARRERAS} />
              </Field>
            </div>
            <div style={{ width: 120 }}>
              <Field label="Año">
                <SelectField value={año} onChange={setAño} options={AÑOS} />
              </Field>
            </div>
          </div>

          {/* ── Estilo de estudio ── */}
          <p className="text-[11px] font-bold text-on-surface-muted tracking-widest uppercase mt-2">Estilo de estudio</p>

          <Field label="Modalidad preferida">
            <div className="flex gap-2">
              {ESTILOS.map(e => {
                const active = estiloEstudio === e.id
                return (
                  <button
                    key={e.id}
                    onClick={() => setEstiloEstudio(e.id)}
                    className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all active:scale-95"
                    style={{
                      background: active ? '#eff6ff' : 'transparent',
                      borderColor: active ? '#2563eb' : '#c3c6d7',
                      color: active ? '#2563eb' : '#737686',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{e.icon}</span>
                    <span className="text-[12px] font-semibold">{e.label}</span>
                  </button>
                )
              })}
            </div>
          </Field>

          <Field label="Turno de estudio">
            <div className="flex gap-2">
              {TURNOS.map(t => {
                const active = turno === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setTurno(t.id)}
                    className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all active:scale-95"
                    style={{
                      background: active ? '#eff6ff' : 'transparent',
                      borderColor: active ? '#2563eb' : '#c3c6d7',
                      color: active ? '#2563eb' : '#737686',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{t.icon}</span>
                    <span className="text-[12px] font-semibold">{t.label}</span>
                  </button>
                )
              })}
            </div>
          </Field>

          <Field label="Disponibilidad semanal">
            <div className="flex flex-wrap gap-2">
              {DISPONIBILIDAD_OPTS.map(d => {
                const active = disponibilidad.includes(d)
                return (
                  <button
                    key={d}
                    onClick={() => toggleDisponibilidad(d)}
                    className="px-3 py-1.5 rounded-xl border-2 text-[12px] font-semibold transition-all active:scale-95"
                    style={{
                      background: active ? '#eff6ff' : 'transparent',
                      borderColor: active ? '#2563eb' : '#c3c6d7',
                      color: active ? '#2563eb' : '#737686',
                    }}
                  >
                    {d}
                  </button>
                )
              })}
            </div>
          </Field>

          {/* ── Materias y objetivos ── */}
          <p className="text-[11px] font-bold text-on-surface-muted tracking-widest uppercase mt-2">Materias y objetivos</p>

          <Field label="Materias actuales" hint="Presioná Enter para agregar">
            <div
              className="sm-input flex flex-wrap gap-2 min-h-[52px] cursor-text"
              onClick={() => document.getElementById('materia-inp').focus()}
            >
              {materias.map(m => (
                <span key={m} className="bg-primary/10 text-primary rounded-xl px-3 py-1 text-[13px] flex items-center gap-1.5 font-medium">
                  {m}
                  <button
                    className="opacity-60 hover:opacity-100 transition leading-none"
                    onClick={e => { e.stopPropagation(); removeMateria(m) }}
                  >
                    ✕
                  </button>
                </span>
              ))}
              <input
                id="materia-inp"
                className="bg-transparent border-none outline-none text-[14px] flex-grow min-w-[110px] p-0 text-on-surface"
                placeholder="Añadir materia..."
                value={materiaInput}
                onChange={e => setMateriaInput(e.target.value)}
                onKeyDown={addMateria}
              />
            </div>
          </Field>

          <Field label="Objetivos de estudio">
            <div className="grid grid-cols-2 gap-2">
              {OBJETIVOS.map(o => {
                const active = objetivos.includes(o.id)
                return (
                  <button
                    key={o.id}
                    onClick={() => toggleObjetivo(o.id)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-[13px] font-semibold transition-all active:scale-95"
                    style={{
                      background: active ? '#eff6ff' : 'transparent',
                      borderColor: active ? '#2563eb' : '#c3c6d7',
                      color: active ? '#2563eb' : '#737686',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{o.icon}</span>
                    <span className="text-left leading-tight">{o.label}</span>
                  </button>
                )
              })}
            </div>
          </Field>

          {/* ── Bio ── */}
          <p className="text-[11px] font-bold text-on-surface-muted tracking-widest uppercase mt-2">Sobre vos</p>

          <Field label="Biografía corta">
            <div className="relative">
              <textarea
                className="sm-input resize-none"
                rows={3}
                maxLength={MAX_BIO}
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Contá cómo sos como compañero de estudio..."
              />
              <span className="absolute bottom-2 right-3 text-[11px] font-semibold" style={{ color: bioColor }}>
                {bio.length}/{MAX_BIO}
              </span>
            </div>
          </Field>

          {/* Save */}
          <button
            className="w-full bg-primary text-white font-bold text-[15px] py-4 rounded-2xl hover:bg-primary-dark transition active:scale-95 mt-2"
            style={{ boxShadow: '0 4px 20px rgba(37,99,235,.35)' }}
            onClick={handleSave}
          >
            Guardar Perfil
          </button>

          <button
            className="w-full text-red-500 text-[13px] font-medium py-2 hover:underline transition"
            onClick={() => showToast('🚪 Cerrar sesión...')}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}
