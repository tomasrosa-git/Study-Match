import { useState } from 'react'
import TopBar from '../components/layout/TopBar'
import ChatView from '../components/ChatView'
import { useApp } from '../context/AppContext'

// ─── Data ────────────────────────────────────────────────────────
const AV = (i, color) => ({ inicial: i, color })

const GRUPOS = [
  {
    nombre: 'Álgebra II',
    icono: 'calculate',
    color: '#ede9fe',
    iconColor: '#7c3aed',
    tiempo: 'Hoy, 14:30',
    miembros: 3,
    ultimo: 'Agustín: ¿Alguien resolvió el punto 4?',
    nuevos: 2,
    miembrosList: ['Agustín R.', 'Lucía M.', 'Mateo V.'],
    avatares: [AV('A','#6366f1'), AV('L','#ec4899'), AV('M','#f59e0b')],
    aiResponder: { nombre: 'Agustín', initial: 'A', avatarColor: '#6366f1' },
    mensajes: [
      { from: 'Mateo',   nombre: 'Mateo',   avatar: 'M', avatarColor: '#f59e0b', text: 'Chicos, ¿para cuándo tienen que entregar la guía 3?', time: '13:40', date: 'Hoy' },
      { from: 'Lucía',   nombre: 'Lucía',   avatar: 'L', avatarColor: '#ec4899', text: 'El viernes antes del parcial. Yo ya hice los primeros 3 puntos 🙋‍♀️', time: '13:44', date: 'Hoy' },
      { from: 'Agustín', nombre: 'Agustín', avatar: 'A', avatarColor: '#6366f1', text: 'Re bien. El 3 me costó pero lo resolví con eliminación gaussiana', time: '13:48', date: 'Hoy' },
      { from: 'Mateo',   nombre: 'Mateo',   avatar: 'M', avatarColor: '#f59e0b', text: 'Yo estaba usando Cramer y me daba inconsistente 😭', time: '13:52', date: 'Hoy' },
      { from: 'Lucía',   nombre: 'Lucía',   avatar: 'L', avatarColor: '#ec4899', text: 'Con Gauss queda más prolijo para sistemas 3x3. Te mando mis apuntes', time: '13:55', date: 'Hoy' },
      { from: 'Agustín', nombre: 'Agustín', avatar: 'A', avatarColor: '#6366f1', text: 'Nos juntamos mañana a las 16 en la biblio para terminar la guía?', time: '14:10', date: 'Hoy' },
      { from: 'Lucía',   nombre: 'Lucía',   avatar: 'L', avatarColor: '#ec4899', text: 'Dale! Yo llevo el resumen de autovalores que hice el otro día', time: '14:12', date: 'Hoy' },
      { from: 'Agustín', nombre: 'Agustín', avatar: 'A', avatarColor: '#6366f1', text: '¿Alguien resolvió el punto 4? Ese no me cierra con ningún método 😅', time: '14:30', date: 'Hoy' },
    ],
  },
  {
    nombre: 'Cálculo II',
    icono: 'bar_chart',
    color: '#dbeafe',
    iconColor: '#1d4ed8',
    tiempo: 'Hace 5m',
    miembros: 5,
    ultimo: 'Carlos: ¿Nos juntamos mañana en la biblio?',
    nuevos: 0,
    miembrosList: ['Julia S.', 'Carlos T.', 'Ana P.', 'Rodrigo M.', 'Vos'],
    avatares: [AV('J','#2563eb'), AV('C','#10b981'), AV('+3','#8b5cf6')],
    aiResponder: { nombre: 'Julia', initial: 'J', avatarColor: '#2563eb' },
    mensajes: [
      { from: 'Julia',   nombre: 'Julia',   avatar: 'J', avatarColor: '#2563eb',  text: 'Gente, el parcial es el VIERNES. Pánico total 😰', time: '09:10', date: 'Ayer' },
      { from: 'Carlos',  nombre: 'Carlos',  avatar: 'C', avatarColor: '#10b981',  text: 'Yo tengo dudas con integrales impropias, ¿eso entra?', time: '09:15', date: 'Ayer' },
      { from: 'Julia',   nombre: 'Julia',   avatar: 'J', avatarColor: '#2563eb',  text: 'Sí, la profe lo dijo el martes. Entra todo desde unidad 3', time: '09:18', date: 'Ayer' },
      { from: 'Ana',     nombre: 'Ana',     avatar: 'A', avatarColor: '#f59e0b',  text: 'Tengo el resumen de la unidad 4, se los paso ahora 📎', time: '09:25', date: 'Ayer' },
      { from: 'Rodrigo', nombre: 'Rodrigo', avatar: 'R', avatarColor: '#ef4444',  text: 'Gracias Ana! Alguien tiene los apuntes del martes? No fui a clase', time: '10:00', date: 'Ayer' },
      { from: 'Julia',   nombre: 'Julia',   avatar: 'J', avatarColor: '#2563eb',  text: 'Yo los tengo, te los mando en un rato Rodri', time: '10:05', date: 'Ayer' },
      { from: 'Carlos',  nombre: 'Carlos',  avatar: 'C', avatarColor: '#10b981',  text: '¿Nos juntamos mañana en la biblio a estudiar?', time: '10:20', date: 'Hoy' },
    ],
  },
  {
    nombre: 'Sistemas Operativos',
    icono: 'computer',
    color: '#dcfce7',
    iconColor: '#15803d',
    tiempo: 'Ayer',
    miembros: 2,
    ultimo: 'Santiago: Pasen el PDF de la clase',
    nuevos: 0,
    miembrosList: ['Santiago B.', 'Valentina C.'],
    avatares: [AV('S','#ef4444'), AV('V','#06b6d4')],
    aiResponder: { nombre: 'Santiago', initial: 'S', avatarColor: '#ef4444' },
    mensajes: [
      { from: 'Valentina', nombre: 'Valentina', avatar: 'V', avatarColor: '#06b6d4', text: '¿Para cuándo es el TP 2?', time: '15:00', date: 'Ayer' },
      { from: 'Santiago',  nombre: 'Santiago',  avatar: 'S', avatarColor: '#ef4444', text: 'Para el 20. Hay que implementar un scheduler con semáforos 😅', time: '15:05', date: 'Ayer' },
      { from: 'Valentina', nombre: 'Valentina', avatar: 'V', avatarColor: '#06b6d4', text: 'Uff. ¿Con semáforos de POSIX o los de la cátedra?', time: '15:10', date: 'Ayer' },
      { from: 'Santiago',  nombre: 'Santiago',  avatar: 'S', avatarColor: '#ef4444', text: 'POSIX. Y además hay que manejar deadlock en el enunciado 3', time: '15:14', date: 'Ayer' },
      { from: 'Valentina', nombre: 'Valentina', avatar: 'V', avatarColor: '#06b6d4', text: 'Arranquemos el finde? Así tenemos tiempo antes del 20', time: '15:20', date: 'Ayer' },
      { from: 'Santiago',  nombre: 'Santiago',  avatar: 'S', avatarColor: '#ef4444', text: 'Pasen el PDF de la clase del jueves, no lo tengo 🙏', time: '16:30', date: 'Ayer' },
    ],
  },
]

const CHATS_DATA = [
  {
    inicial: 'L',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    nombre: 'Lucía',
    carrera: 'Ing. Industrial',
    tiempo: '14:30',
    ultimo: '¿Pudiste revisar los apuntes de la clase?',
    badge: 0,
    online: true,
    mensajes: [
      { from: 'ella', nombre: 'Lucía', text: 'Hola! Veo que coincidimos en Cálculo II 😊', time: '16:30', date: 'Ayer' },
      { from: 'yo', text: 'Hola Lucía! Sí, tengo el parcial el viernes y estoy perdida con integrales', time: '16:35', date: 'Ayer' },
      { from: 'ella', nombre: 'Lucía', text: 'Yo también jaja. Igual tengo los apuntes de la clase del martes, están completos', time: '16:38', date: 'Ayer' },
      { from: 'yo', text: '¿Podemos estudiar juntas esta semana?', time: '16:42', date: 'Ayer' },
      { from: 'ella', nombre: 'Lucía', text: '¡Dale! ¿Hoy a las 17 en la biblio?', time: '16:45', date: 'Ayer' },
      { from: 'yo', text: 'Perfecto, nos vemos ahí 📚', time: '16:47', date: 'Ayer' },
      { from: 'ella', nombre: 'Lucía', text: '¿Pudiste revisar los apuntes de la clase?', time: '14:30', date: 'Hoy' },
    ],
  },
  {
    inicial: 'M',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80',
    nombre: 'Mateo',
    carrera: 'Arquitectura',
    tiempo: 'Ayer',
    ultimo: '¡Perfecto! Nos vemos en la biblioteca a las 17hs',
    badge: 0,
    online: false,
    mensajes: [
      { from: 'yo', text: 'Hola Mateo! ¿Cómo va el TP de Diseño?', time: '11:00', date: 'Ayer' },
      { from: 'ella', nombre: 'Mateo', text: 'Bien! Estoy terminando la maqueta digital. Me trabé en el render 😅', time: '11:05', date: 'Ayer' },
      { from: 'yo', text: 'Yo tenía ese problema con Revit. ¿Usás 3ds Max o Rhino?', time: '11:10', date: 'Ayer' },
      { from: 'ella', nombre: 'Mateo', text: 'Rhino + Grasshopper. ¿Vos sabés usarlo?', time: '11:15', date: 'Ayer' },
      { from: 'yo', text: 'Un poco! ¿Nos juntamos a trabajar?', time: '11:20', date: 'Ayer' },
      { from: 'ella', nombre: 'Mateo', text: '¡Perfecto! Nos vemos en la biblioteca a las 17hs', time: '11:25', date: 'Ayer' },
    ],
  },
  {
    inicial: 'V',
    img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=80&q=80',
    nombre: 'Valentina',
    carrera: 'Medicina',
    tiempo: 'Lunes',
    ultimo: 'Gracias por compartir el PDF 🙏',
    badge: 1,
    online: true,
    mensajes: [
      { from: 'ella', nombre: 'Valentina', text: 'Hola! Match por Neuroanatomía 🧠 Yo lo curso en Medicina', time: '11:00', date: 'Lunes' },
      { from: 'yo', text: 'Qué bueno! Yo en Psicología. Los contenidos son casi iguales 😊', time: '11:05', date: 'Lunes' },
      { from: 'ella', nombre: 'Valentina', text: 'Exacto. Tengo el PDF de la cátedra B con todos los cortes histológicos', time: '11:08', date: 'Lunes' },
      { from: 'yo', text: 'Me sirve un montón, ¿me lo mandás?', time: '11:12', date: 'Lunes' },
      { from: 'ella', nombre: 'Valentina', text: '📎 Neuroanatomia_CatedraB_2024.pdf', time: '11:15', date: 'Lunes' },
      { from: 'yo', text: '¡Gracias! ¿Estudiamos juntas la unidad 3 esta semana?', time: '14:25', date: 'Lunes' },
      { from: 'ella', nombre: 'Valentina', text: 'Gracias por compartir el PDF 🙏', time: '14:30', date: 'Lunes' },
    ],
  },
  {
    inicial: 'S',
    img: null,
    color: '#f0fdf4',
    textColor: '#16a34a',
    nombre: 'Santiago',
    carrera: 'Cs. Económicas',
    tiempo: '12 Oct',
    ultimo: 'Dale, avisame cuando tengas un rato libre',
    badge: 0,
    online: false,
    mensajes: [
      { from: 'yo', text: 'Hola Santiago! ¿Cómo te va con Macro?', time: '10:00', date: '12 Oct' },
      { from: 'ella', nombre: 'Santiago', text: 'Bien! Aunque el parcial me comió, jaja', time: '10:10', date: '12 Oct' },
      { from: 'yo', text: '¿Para cuándo es el final?', time: '10:12', date: '12 Oct' },
      { from: 'ella', nombre: 'Santiago', text: 'Diciembre. Tengo tiempo pero quiero arrancar ya', time: '10:15', date: '12 Oct' },
      { from: 'yo', text: '¿Querés que armemos un cronograma de estudio?', time: '10:20', date: '12 Oct' },
      { from: 'ella', nombre: 'Santiago', text: 'Dale, avisame cuando tengas un rato libre', time: '10:30', date: '12 Oct' },
    ],
  },
]

// ─── Sub-components ──────────────────────────────────────────────
function AvatarStack({ avatares }) {
  return (
    <div className="flex">
      {avatares.map((av, i) => (
        <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-bold text-white"
          style={{ background: av.color, marginRight: i < avatares.length - 1 ? -8 : 0, zIndex: avatares.length - i }}>
          {av.inicial}
        </div>
      ))}
    </div>
  )
}

function GrupoCard({ grupo, onPress }) {
  return (
    <div className="bg-white rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-all duration-150"
      style={{ boxShadow: '0 1px 6px rgba(0,0,0,.07), 0 4px 16px rgba(0,0,0,.04)' }}
      onClick={() => onPress(grupo)}>
      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: grupo.color }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: grupo.iconColor }}>{grupo.icono}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-on-surface text-[14px]">{grupo.nombre}</p>
            <div className="flex items-center gap-1.5">
              {grupo.nuevos > 0 && (
                <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">{grupo.nuevos}</span>
              )}
              <span className="text-[11px] text-primary font-medium">{grupo.tiempo}</span>
            </div>
          </div>
          <p className="text-xs text-on-surface-muted">{grupo.miembros} miembros</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5 bg-surface-low rounded-xl px-3 py-2">
        <AvatarStack avatares={grupo.avatares} />
        <p className="text-xs text-on-surface-muted truncate flex-1">"{grupo.ultimo}"</p>
        <span className="material-symbols-outlined text-outline-dark flex-shrink-0" style={{ fontSize: 16 }}>chevron_right</span>
      </div>
    </div>
  )
}

function ChatItem({ chat, onPress }) {
  return (
    <div className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-surface-low cursor-pointer transition-all active:scale-[0.98]"
      onClick={() => onPress(chat)}>
      <div className="relative flex-shrink-0">
        {chat.img
          ? <img src={chat.img} className="w-12 h-12 rounded-full object-cover" alt={chat.nombre} />
          : <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: chat.color, color: chat.textColor }}>{chat.inicial}</div>
        }
        {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-surface pulse-dot" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <p className={`text-[14px] ${chat.badge > 0 ? 'font-bold' : 'font-semibold'} text-on-surface`}>{chat.nombre}</p>
          <span className={`text-[11px] font-medium flex-shrink-0 ml-2 ${chat.badge > 0 ? 'text-primary' : 'text-on-surface-muted'}`}>{chat.tiempo}</span>
        </div>
        <p className={`text-[12px] truncate ${chat.badge > 0 ? 'font-semibold text-on-surface' : 'text-on-surface-muted'}`}>{chat.ultimo}</p>
      </div>
      {chat.badge > 0 && (
        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">{chat.badge}</div>
      )}
    </div>
  )
}

// ─── Main screen ─────────────────────────────────────────────────
export default function Grupos() {
  const [tab, setTab] = useState('materias')
  const [subView, setSubView] = useState(null)
  const { setActiveTab } = useApp()

  // ── Group chat sub-view ──
  if (subView?.tipo === 'grupo') {
    const g = subView.data
    return (
      <ChatView
        initialMessages={g.mensajes}
        onBack={() => setSubView(null)}
        aiEnabled
        aiResponder={g.aiResponder}
        header={
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: g.color }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: g.iconColor }}>{g.icono}</span>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-on-surface text-[14px] leading-tight">{g.nombre}</p>
              <p className="text-[11px] text-on-surface-muted">{g.miembros} miembros · {g.miembrosList.join(', ')}</p>
            </div>
          </div>
        }
      />
    )
  }

  // ── Individual chat sub-view ──
  if (subView?.tipo === 'chat') {
    const c = subView.data
    return (
      <ChatView
        initialMessages={c.mensajes}
        onBack={() => setSubView(null)}
        aiEnabled
        aiResponder={{ nombre: c.nombre, img: c.img, initial: c.inicial, avatarColor: c.color }}
        header={
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative">
              {c.img
                ? <img src={c.img} className="w-9 h-9 rounded-full object-cover" alt={c.nombre} />
                : <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: c.color, color: c.textColor }}>{c.inicial}</div>
              }
              {c.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-white" />}
            </div>
            <div>
              <p className="font-bold text-on-surface text-[14px]">{c.nombre}</p>
              <p className="text-[11px] text-on-surface-muted">{c.online ? 'En línea' : c.carrera}</p>
            </div>
          </div>
        }
      />
    )
  }

  // ── Main list view ──
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <TopBar showBrand notifBadge />
      <div className="flex-1 overflow-y-auto no-scroll px-5 pt-3 pb-24">

        {/* Tabs pill */}
        <div className="flex gap-1 bg-surface-container rounded-2xl p-1 mb-4">
          {[['materias','Grupos'], ['chats','Mensajes']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className="flex-1 text-center py-2 text-[13px] font-semibold rounded-xl transition-all duration-200"
              style={{ background: tab === id ? '#fff' : 'transparent', color: tab === id ? '#2563eb' : '#737686', boxShadow: tab === id ? '0 1px 4px rgba(0,0,0,.08)' : 'none' }}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'materias' && (
          <>
            <p className="text-[11px] font-bold text-on-surface-muted tracking-widest uppercase mb-3 px-1">Grupos de estudio</p>
            <div className="flex flex-col gap-3">
              {GRUPOS.map(g => <GrupoCard key={g.nombre} grupo={g} onPress={g => setSubView({ tipo: 'grupo', data: g })} />)}
            </div>
            <div className="mt-4 rounded-2xl p-4 border border-blue-100" style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)' }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#dbeafe' }}>
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: 24 }}>search</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-primary text-[14px] mb-0.5">¿Buscas más compañeros?</p>
                  <p className="text-xs text-blue-700 mb-3 leading-relaxed">Hay 12 estudiantes nuevos de Álgebra II cerca de vos.</p>
                  <button className="bg-primary text-white text-xs font-bold px-5 py-2 rounded-full hover:bg-primary-dark transition active:scale-95"
                    onClick={() => setActiveTab('explorar')}>
                    Descubrir ahora →
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'chats' && (
          <div className="flex flex-col">
            {CHATS_DATA.map(c => <ChatItem key={c.nombre} chat={c} onPress={c => setSubView({ tipo: 'chat', data: c })} />)}
          </div>
        )}
      </div>
    </div>
  )
}
