import { useState } from 'react'
import TopBar from '../components/layout/TopBar'
import ChatView from '../components/ChatView'
import PerfilDetalle from './PerfilDetalle'
import { useApp } from '../context/AppContext'

// ─── Match data ───────────────────────────────────────────────────
const MATCHES = [
  {
    nombre: 'Carolina',
    carrera: 'Psicología',
    año: '2do año',
    universidad: 'UBA',
    compatibilidad: 96,
    materias: ['Neuroanatomía', 'Psicoanálisis', 'Clínica I'],
    materiasComunes: ['Neuroanatomía', 'Psicoanálisis'],
    objetivo: 'Estudio regular',
    objetivos: ['Estudio regular', 'Preparar finales'],
    motivoMatch: '🎓 Misma carrera (Psicología) y 2 materias en común',
    disponibilidad: ['Tardes', 'Noches', 'Fines de semana'],
    bio: 'Psicóloga en formación. Me apasiona el psicoanálisis lacaniano. Busco compañeras responsables para estudiar Freud y preparar el parcial de Clínica I.',
    img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=85',
    nuevo: true,
    online: true,
    mensajes: [
      { from: 'ella', nombre: 'Carolina', text: 'Hola! Veo que también estudiás Psicología en la UBA 😊', time: '10:00', date: 'Ayer' },
      { from: 'yo', text: '¡Hola Carolina! Sí, 2do año. ¿Qué materias estás cursando?', time: '10:05', date: 'Ayer' },
      { from: 'ella', nombre: 'Carolina', text: 'Psicoanálisis y Neuroanatomía. El parcial de Freud me tiene con pánico 😅', time: '10:08', date: 'Ayer' },
      { from: 'yo', text: '¡Igual yo! Tenemos el mismo parcial la semana que viene', time: '10:12', date: 'Ayer' },
      { from: 'ella', nombre: 'Carolina', text: 'Qué coincidencia! ¿Estudiamos juntas? Yo tengo los apuntes de la cátedra B', time: '10:15', date: 'Ayer' },
      { from: 'yo', text: 'Dale! ¿Hoy a las 17 en Puán?', time: '10:20', date: 'Ayer' },
      { from: 'ella', nombre: 'Carolina', text: 'Perfecto! Nos vemos ahí 📚', time: '10:22', date: 'Ayer' },
      { from: 'ella', nombre: 'Carolina', text: '¿Estudiaste algo de Lacan para hoy?', time: '09:30', date: 'Hoy' },
    ],
  },
  {
    nombre: 'Valentina',
    carrera: 'Medicina',
    año: '2do año',
    universidad: 'UBA',
    compatibilidad: 88,
    materias: ['Anatomía', 'Neuroanatomía', 'Biología Celular'],
    materiasComunes: ['Neuroanatomía'],
    objetivo: 'Preparar finales',
    objetivos: ['Preparar finales', 'Intercambio apuntes'],
    motivoMatch: '📚 Materia en común: Neuroanatomía (compartida entre Psicología y Medicina)',
    disponibilidad: ['Mañanas', 'Tardes'],
    bio: 'Estudiante de Medicina. Tengo el PDF completo de Neuroanatomía cátedra B con todos los cortes histológicos. Busco compañeras serias.',
    img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=85',
    nuevo: true,
    online: true,
    mensajes: [
      { from: 'ella', nombre: 'Valentina', text: 'Hola! Match por Neuroanatomía 🧠 Yo la curso en Medicina', time: '11:00', date: 'Lunes' },
      { from: 'yo', text: 'Qué bueno! Yo en Psicología. Los contenidos son casi iguales 😊', time: '11:05', date: 'Lunes' },
      { from: 'ella', nombre: 'Valentina', text: 'Exacto! Tengo el PDF de la cátedra B con todos los cortes histológicos 📄', time: '11:08', date: 'Lunes' },
      { from: 'yo', text: 'Me sirve un montón, ¿me lo mandás?', time: '11:12', date: 'Lunes' },
      { from: 'ella', nombre: 'Valentina', text: '📎 Neuroanatomia_CatedraB_2024.pdf', time: '11:15', date: 'Lunes' },
      { from: 'yo', text: '¡Gracias Valen! ¿Estudiamos juntas la unidad 3 esta semana?', time: '14:25', date: 'Lunes' },
      { from: 'ella', nombre: 'Valentina', text: 'Gracias por compartir el PDF 🙏', time: '14:30', date: 'Lunes' },
    ],
  },
  {
    nombre: 'Lucía',
    carrera: 'Psicología',
    año: '1er año',
    universidad: 'UBA',
    compatibilidad: 91,
    materias: ['Psicoanálisis', 'Sociología', 'Biología'],
    materiasComunes: ['Psicoanálisis'],
    objetivo: 'Estudio regular',
    objetivos: ['Estudio regular', 'Grupo TP'],
    motivoMatch: '🎓 Misma carrera (Psicología) y materia en común: Psicoanálisis',
    disponibilidad: ['Tardes', 'Fines de semana'],
    bio: 'Primer año de Psicología. Me va bien en Psicoanálisis pero me cuesta la parte teórica. Busco compañeras para estudiar de forma constante.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=85',
    nuevo: false,
    online: false,
    mensajes: [
      { from: 'ella', nombre: 'Lucía', text: 'Hola! Me alegró mucho el match 😊 Somos las dos de Psicología', time: '16:30', date: 'Martes' },
      { from: 'yo', text: 'Hola Lucía! ¿En qué año estás?', time: '16:33', date: 'Martes' },
      { from: 'ella', nombre: 'Lucía', text: 'Primer año. Recién arrancando, es todo nuevo jaja', time: '16:35', date: 'Martes' },
      { from: 'yo', text: '¡Ah, yo segundo! Cuándo entré también me perdía en Freud 😅', time: '16:38', date: 'Martes' },
      { from: 'ella', nombre: 'Lucía', text: 'Exacto eso! Si pudieran estudiar juntas sería genial', time: '16:42', date: 'Martes' },
      { from: 'yo', text: '¡Dale! ¿Qué días tenés disponible?', time: '16:45', date: 'Martes' },
      { from: 'ella', nombre: 'Lucía', text: 'Tardes de martes y jueves, y los sábados también puedo', time: '16:48', date: 'Martes' },
    ],
  },
  {
    nombre: 'Sofía',
    carrera: 'Psicología',
    año: '3er año',
    universidad: 'UBA',
    compatibilidad: 94,
    materias: ['Clínica I', 'Psicología Laboral', 'Neuroanatomía'],
    materiasComunes: ['Neuroanatomía'],
    objetivo: 'Grupo TP',
    objetivos: ['Grupo TP', 'Preparar finales'],
    motivoMatch: '🎓 Misma carrera (Psicología) y materia en común: Neuroanatomía',
    disponibilidad: ['Mañanas', 'Tardes'],
    bio: 'Tercer año, con experiencia en la facultad. Puedo ayudar a chicas de años menores con Neuroanatomía. Busco grupo para TP de Clínica.',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=85',
    nuevo: false,
    online: true,
    mensajes: [
      { from: 'ella', nombre: 'Sofía', text: 'Hola! Veo que compartimos Neuroanatomía 🧠', time: '14:00', date: 'Miércoles' },
      { from: 'yo', text: '¡Sí! Yo la curso este cuatrimestre. Vos?', time: '14:05', date: 'Miércoles' },
      { from: 'ella', nombre: 'Sofía', text: 'Yo ya la aprobé, pero puedo ayudarte con los parciales. También busco compañeras para el TP de Clínica I', time: '14:08', date: 'Miércoles' },
      { from: 'yo', text: '¡Qué bueno! Yo tengo Clínica el año que viene pero puedo empezar a ver el material', time: '14:12', date: 'Miércoles' },
      { from: 'ella', nombre: 'Sofía', text: '¿Armamos un grupo de estudio? Conozco otra chica que también está interesada', time: '14:15', date: 'Miércoles' },
    ],
  },
  {
    nombre: 'Nicolás',
    carrera: 'Psicología',
    año: '1er año',
    universidad: 'UBA',
    compatibilidad: 89,
    materias: ['Psicoanálisis', 'Biología', 'Historia de la Psicología'],
    materiasComunes: ['Psicoanálisis'],
    objetivo: 'Estudio regular',
    objetivos: ['Estudio regular', 'Grupo TP'],
    motivoMatch: '🎓 Misma carrera (Psicología) y materia en común: Psicoanálisis',
    disponibilidad: ['Noches', 'Fines de semana'],
    bio: 'Primer año, tratando de entender Freud. Me va bien en la parte práctica pero el teórico me cuesta. Horario nocturno y fines de semana.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85',
    nuevo: false,
    online: false,
    mensajes: [
      { from: 'yo', text: 'Hola Nico! Veo que también estás en Psicología 😊', time: '20:00', date: 'Jueves' },
      { from: 'ella', nombre: 'Nicolás', text: 'Hola! Sí, primer año. Estoy con Psicoanálisis y me está costando mucho Freud', time: '20:05', date: 'Jueves' },
      { from: 'yo', text: 'A mí también me costó cuando entré. Hay un apunte muy bueno de la cátedra', time: '20:10', date: 'Jueves' },
      { from: 'ella', nombre: 'Nicolás', text: '¿Me lo podés pasar? Estaría genial', time: '20:12', date: 'Jueves' },
      { from: 'yo', text: 'Sí, te lo mando. ¿Podemos estudiar algún finde?', time: '20:15', date: 'Jueves' },
      { from: 'ella', nombre: 'Nicolás', text: 'Claro! Los sábados a la tarde me viene perfecto', time: '20:18', date: 'Jueves' },
    ],
  },
  {
    nombre: 'Camila',
    carrera: 'Psicología',
    año: '2do año',
    universidad: 'UBA',
    compatibilidad: 93,
    materias: ['Neuroanatomía', 'Psicología Social', 'Epistemología'],
    materiasComunes: ['Neuroanatomía'],
    objetivo: 'Preparar finales',
    objetivos: ['Estudio regular', 'Preparar finales'],
    motivoMatch: '🎓 Misma carrera (Psicología) y materia en común: Neuroanatomía',
    disponibilidad: ['Tardes', 'Fines de semana'],
    bio: 'Me gustaría hacer un grupo pequeño para repasar los prácticos de Neuro antes de cada parcial. Disponible tardes y sábados.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=85',
    nuevo: false,
    online: true,
    mensajes: [
      { from: 'ella', nombre: 'Camila', text: 'Hola! Misma carrera y Neuroanatomía en común 😊', time: '15:30', date: 'Viernes' },
      { from: 'yo', text: '¡Qué bueno! ¿Cuándo tenés el parcial?', time: '15:35', date: 'Viernes' },
      { from: 'ella', nombre: 'Camila', text: 'El 15. Estoy haciendo las guías de prácticos, me quedan 3', time: '15:38', date: 'Viernes' },
      { from: 'yo', text: 'Yo también! ¿Lo hacemos juntas esta semana?', time: '15:42', date: 'Viernes' },
      { from: 'ella', nombre: 'Camila', text: '¡Dale! El sábado a las 15 en la biblio te parece?', time: '15:45', date: 'Viernes' },
    ],
  },
]

// ─── Sub-components ──────────────────────────────────────────────
function CompatBar({ value }) {
  const color = value >= 85 ? '#22c55e' : value >= 70 ? '#f59e0b' : '#ef4444'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-surface-container overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-[11px] font-bold" style={{ color }}>{value}%</span>
    </div>
  )
}

function MatchCard({ match, onVerPerfil, onChat }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 6px rgba(0,0,0,.07), 0 4px 16px rgba(0,0,0,.04)' }}>
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="relative flex-shrink-0">
            <img src={match.img} className="w-16 h-16 rounded-2xl object-cover object-top" alt={match.nombre} />
            {match.online && <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-0.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-on-surface text-[15px]">{match.nombre}</p>
                  {match.nuevo && <span className="bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">NUEVO</span>}
                </div>
                <p className="text-[12px] text-on-surface-muted">{match.año} · {match.carrera}</p>
              </div>
              <button className="w-8 h-8 flex items-center justify-center text-on-surface-muted hover:text-primary rounded-xl hover:bg-surface-low transition"
                onClick={() => onVerPerfil(match)}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
              </button>
            </div>
            <div className="mt-1.5">
              <p className="text-[10px] text-on-surface-muted mb-1">Compatibilidad</p>
              <CompatBar value={match.compatibilidad} />
            </div>
          </div>
        </div>

        {/* Motivo del match */}
        <div className="bg-primary/5 border border-primary/15 rounded-xl px-3 py-2 mb-3">
          <p className="text-[11px] text-primary font-medium">{match.motivoMatch}</p>
        </div>

        {/* Materias */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {match.materias.slice(0, 3).map(m => (
            <span key={m} className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold ${
              match.materiasComunes?.includes(m) ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface-muted'
            }`}>
              {match.materiasComunes?.includes(m) && '✓ '}{m}
            </span>
          ))}
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <button
            className="flex-1 border-2 border-outline text-on-surface-muted text-[13px] font-semibold py-2.5 rounded-xl hover:border-primary hover:text-primary transition active:scale-95 flex items-center justify-center gap-1.5"
            onClick={() => onVerPerfil(match)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>person</span>
            Ver perfil
          </button>
          <button
            className="flex-[2] bg-primary text-white text-[13px] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-primary-dark transition active:scale-95"
            style={{ boxShadow: '0 2px 8px rgba(37,99,235,.3)' }}
            onClick={() => onChat(match)}
          >
            <span className="material-symbols-outlined fill-icon" style={{ fontSize: 16 }}>chat_bubble</span>
            Coordinar ahora
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main screen ─────────────────────────────────────────────────
export default function Matchs() {
  const [subView, setSubView] = useState(null)  // { tipo: 'perfil'|'chat', data }

  const nuevos = MATCHES.filter(m => m.nuevo).length

  // ── Ver perfil ──
  if (subView?.tipo === 'perfil') {
    return (
      <PerfilDetalle
        match={subView.data}
        onBack={() => setSubView(null)}
        onChat={() => setSubView({ tipo: 'chat', data: subView.data })}
      />
    )
  }

  // ── Chat individual ──
  if (subView?.tipo === 'chat') {
    const m = subView.data
    return (
      <ChatView
        initialMessages={m.mensajes}
        onBack={() => setSubView(null)}
        header={
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative">
              <img src={m.img} className="w-9 h-9 rounded-full object-cover object-top" alt={m.nombre} />
              {m.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-white" />}
            </div>
            <div>
              <p className="font-bold text-on-surface text-[14px]">{m.nombre}</p>
              <p className="text-[11px] text-on-surface-muted">{m.online ? 'En línea' : m.carrera}</p>
            </div>
          </div>
        }
      />
    )
  }

  // ── Match list ──
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <TopBar showBrand notifBadge={nuevos > 0} />

      <div className="flex-1 overflow-y-auto no-scroll px-5 pt-4 pb-24">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-on-surface">Tus Matchs</h2>
          {nuevos > 0 && (
            <span className="bg-primary/10 text-primary text-[12px] font-bold px-3 py-1 rounded-full">{nuevos} nuevos 🎉</span>
          )}
        </div>
        <p className="text-[12px] text-on-surface-muted mb-4">
          {MATCHES.length} compañeros encontrados · Ordenado por compatibilidad
        </p>

        <div className="flex flex-col gap-3">
          {MATCHES.map(m => (
            <MatchCard
              key={m.nombre}
              match={m}
              onVerPerfil={m => setSubView({ tipo: 'perfil', data: m })}
              onChat={m => setSubView({ tipo: 'chat', data: m })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
