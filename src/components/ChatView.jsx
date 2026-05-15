import { useState, useRef, useEffect } from 'react'

// ─── AI response engine ───────────────────────────────────────────
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function generateAIResponse(userMessage) {
  const t = userMessage.toLowerCase()

  if (/\bhola\b|buenas|buen día|buen dia|buenas tardes|buenas noches|hey|ey\b/.test(t)) {
    return pick([
      '¡Hola! ¿Cómo va el estudio? 😊 Contame en qué andás.',
      '¡Buenas! Qué bueno saber de vos. ¿Qué temas tenés en mente hoy?',
      '¡Hola! Me alegra que estemos en contacto. ¿Arrancamos a organizar algo? 📚',
      '¡Hola! ¿Todo bien? ¿Hay algo puntual con lo que te pueda dar una mano?',
    ])
  }

  if (/parcial|examen|final|prueba|evaluaci/.test(t)) {
    return pick([
      'Entiendo la presión, los parciales son intensos. ¿Cuánto tiempo te queda y qué temas entran? Con eso armamos un plan de repaso concreto 📋',
      '¿Cuándo es? Si me contás los temas principales, te ayudo a priorizar qué estudiar primero y qué podés dejar para el final.',
      'Para los finales lo mejor es dividir el material en bloques y repasar de a poco. ¿Tenés resúmenes o empezamos desde el principio?',
      'La clave para los parciales es no estudiar todo junto el último día. ¿Cuántos días te quedan? Hacemos un cronograma juntos.',
      '¡Vamos que se puede! ¿Con qué unidad querés empezar? A veces conviene arrancar por la que más te cuesta para sacarla de encima.',
    ])
  }

  if (/apunte|pdf|material|resumen|guía|guia|archivo|doc|carpeta/.test(t)) {
    return pick([
      'Tengo apuntes de ese tema, te los comparto ahora mismo. ¿Querés todo el material o alguna unidad en particular? 📎',
      '¡Sí, tengo! Dame un momento que lo busco. ¿Necesitás el resumen completo o solo los puntos clave?',
      'Tengo el resumen que armé para el parcial pasado, está bastante completo. ¿Te sirve si lo dividimos por unidades para que sea más manejable?',
      'Claro, comparto todo lo que tengo. Eso sí, avisame si algo no se entiende bien y lo aclaramos juntos 😄',
    ])
  }

  if (/cuando|cuándo|horario|hora|juntamos|reunir|día|dias|días|semana|disponib|libre/.test(t)) {
    return pick([
      'Yo tengo disponibilidad tardes y fines de semana. ¿Qué días te quedan libres?',
      '¿Preferís de mañana o de tarde? Así coordino mejor según mis clases. También podría ser por videollamada si te queda más cómodo 📅',
      'Esta semana podría el jueves después de las 17 o el sábado a la mañana. ¿Te viene alguno de los dos?',
      '¿Qué tal si nos juntamos esta semana para repasar? Yo me adapto al horario que mejor te quede, tengo bastante flexibilidad.',
    ])
  }

  if (/gracias|muchas gracias|te lo agradezco|genial|perfecto|bárbaro|barbaro|excelente|dale|ok\b|buenísimo|buenisimo/.test(t)) {
    return pick([
      '¡De nada, para eso estamos! Si surge cualquier otra duda, no dudes en escribirme 😊',
      '¡Buenísimo! Nos vemos entonces. ¡Mucho éxito con el estudio! 🍀',
      '¡Genial! Sigamos así, con constancia se llega. ¿Hay algo más que quieras repasar antes de que nos juntemos? 💪',
      '¡Todo bien! Avisame cuando quieras y seguimos coordinando 🙌',
    ])
  }

  if (/no entiendo|no entend|no me queda|duda|confus|difícil|dificil|complicado|cuesta|no sé|no se|perdid/.test(t)) {
    return pick([
      'Contame qué parte específicamente no te queda, lo analizamos juntos. A veces con un ejemplo concreto se entiende mucho mejor.',
      'Normal que cueste, es un tema que tiene bastante profundidad. ¿Qué parte te traba más: la teórica o los ejercicios prácticos?',
      'Ese tema me costó también al principio. Hay una manera de verlo que lo hace más claro, ¿querés que te explique cómo lo entendí yo?',
      '¡No te preocupes! Las dudas son parte del proceso. Explicame qué tenés entendido hasta ahora y vemos desde dónde seguir.',
    ])
  }

  if (/freud|lacan|jung|psicoanálisis|psicoanalisis|inconsciente|aparato psíquico/.test(t)) {
    return pick([
      'Freud es denso pero fascinante una vez que agarrás el hilo. ¿Estás con la parte de los sueños, la metapsicología o los casos clínicos? Así te doy recursos más específicos.',
      'Para Lacan lo mejor es no empezar por los seminarios más técnicos. ¿Tenés los apuntes de la cátedra? Hay resúmenes que lo hacen mucho más accesible.',
      'El psicoanálisis es de esos temas que se entienden mejor leyendo en voz alta y discutiéndolo. ¿Qué texto puntual estás trabajando?',
      'Jung y Freud tienen diferencias importantes que siempre preguntan en el parcial. ¿Querés que repasemos los puntos clave de comparación? 📖',
    ])
  }

  if (/neuroanatomía|neuroanatomia|neuro|anatomía|anatomia|histolog|célula|biolog/.test(t)) {
    return pick([
      'Para Neuroanatomía lo mejor es estudiar con imágenes y esquemas. ¿Tenés el atlas de la cátedra? Si no, te puedo pasar un link muy bueno.',
      '¡Ese tema me resulta muy interesante! Las guías de la cátedra B están muy bien organizadas. ¿Las tenés o te las consigo?',
      'Lo importante en Anatomía es entender la lógica estructural, no memorizar de golpe. ¿Estás con algún sistema en particular?',
      'Neuroanatomía tiene mucho para visualizar. ¿Estudiás con mapas conceptuales o preferís repasar de texto? Así te ayudo de la manera que más te sirva.',
    ])
  }

  if (/álgebra|algebra|cálculo|calculo|matemática|matematica|estadística|estadistica|ecuaci|derivad|integral/.test(t)) {
    return pick([
      'Para Álgebra lo clave es hacer muchos ejercicios, la teoría sola no alcanza. ¿Con qué tema tenés dificultades ahora mismo?',
      'Cálculo se aprende practicando. Te recomiendo resolver las guías de años anteriores, siempre repiten tipos de ejercicios similares.',
      'Estadística es mucho más llevadera cuando entendés para qué sirve cada herramienta. ¿Estás con inferencia, probabilidad o análisis descriptivo?',
      '¿Querés que hagamos ejercicios juntos? Con los de práctica se ve mucho mejor que solo leyendo la teoría. ¿Cuándo te viene bien?',
    ])
  }

  if (/biblio|biblioteca|facultad|fac|aula|campus|puán|puan|ciudad universitaria/.test(t)) {
    return pick([
      '¡Dale, nos juntamos en la biblio! ¿A qué hora te viene bien? Yo prefiero ir temprano antes de que se llene.',
      'La biblio siempre está llena al mediodía, mejor ir temprano a las 9 o después de las 17. ¿Cuál te queda mejor?',
      '¿Preferís estudiar en la facultad o en algún café cerca? Para ciertas materias prefiero un lugar más tranquilo donde se pueda hablar.',
    ])
  }

  if (/tp|trabajo práctico|trabajo practico|entrega|informe|monografía|monografia/.test(t)) {
    return pick([
      'Para el TP podemos dividirnos las secciones y después revisamos todo juntos para que quede coherente. ¿Cuánto queda para la entrega?',
      'Los trabajos grupales son más llevaderos cuando cada uno toma una parte clara. ¿Tenemos el tema definido o todavía estamos en eso?',
      '¿Cuántas páginas tiene que tener? Si me contás los requisitos, organizamos las tareas para que no se acumule todo al final.',
    ])
  }

  if (/grupo|grupal|equipo|compañero|compañera|estudiar juntos/.test(t)) {
    return pick([
      'Estudiar en grupo ayuda un montón, sobre todo para materias con mucho contenido. ¿Tenés otros compañeros que quieran sumarse o somos nosotros dos?',
      '¡Me parece bien! Los grupos pequeños de 2 a 4 personas suelen funcionar mejor. ¿Qué días se juntaría el grupo?',
      'Si armamos un grupo, podemos dividir el material y que cada uno explique su parte. Es la forma más eficiente de cubrir todo antes del parcial.',
    ])
  }

  if (/cansad|estresad|agotad|no puedo más|no puedo mas|abrumad|ansiedad|nervios/.test(t)) {
    return pick([
      'Entiendo, la facultad puede ser muy intensa. Tomarse un descanso corto a veces hace más que seguir a la fuerza. ¿Cuánto tiempo hace que estás estudiando?',
      'Normal sentirse así, es mucho material. Lo importante es ir de a poco sin quemarse. ¿Querés que armemos un plan más manejable para los próximos días?',
      'El estrés antes de los parciales es muy común, no estás solo/a en esto. ¿Hablaste con alguien de la facultad? A veces el apoyo del grupo ayuda bastante.',
    ])
  }

  if (/qué tal|cómo estás|como estas|cómo vas|como vas|bien\?/.test(t)) {
    return pick([
      '¡Bien, gracias! Con muchas ganas de estudiar 😄 ¿Y vos? ¿Cómo van las materias?',
      '¡Todo bien por acá! Bastante ocupada con las cursadas pero con energía. ¿Cómo te va a vos?',
      'Muy bien, gracias por preguntar. ¿Cómo estás con el estudio? ¿Hay algo que te esté costando más?',
    ])
  }

  // Respuestas genéricas contextuales mejoradas
  return pick([
    '¡Entendido! ¿Querés que repasemos ese tema juntos? Puedo ayudarte a organizarte mejor 📖',
    'Tiene sentido lo que decís. ¿Qué más necesitás para avanzar con el estudio? Puedo pasarte material o coordinar una sesión.',
    'La constancia es clave para aprender bien. ¿Cuándo te viene mejor juntarnos para estudiar?',
    'De acuerdo. ¡Avisame cuando quieras coordinar y lo organizamos! 😊',
    '¡Buena idea! ¿Qué tal si esta semana armamos una sesión de estudio? Así aprovechamos el tiempo antes del parcial.',
    'Interesante punto. ¿Tenés los materiales necesarios o te consigo algo? No quiero que te quedes sin recursos.',
    'Me parece bien. Si tenés alguna duda puntual sobre el tema, también podemos resolverla por acá antes de juntarnos.',
  ])
}

// ─── Components ───────────────────────────────────────────────────
function Bubble({ msg, isMe }) {
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-1`}>
      {!isMe && msg.avatar && (
        <div className="w-7 h-7 rounded-full overflow-hidden mr-2 flex-shrink-0 self-end mb-1">
          {msg.avatar.startsWith('http') ? (
            <img src={msg.avatar} className="w-full h-full object-cover" alt="" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white" style={{ background: msg.avatarColor || '#6366f1' }}>
              {msg.avatar}
            </div>
          )}
        </div>
      )}
      <div className="max-w-[72%]">
        {!isMe && msg.nombre && (
          <p className="text-[10px] font-semibold text-on-surface-muted mb-0.5 pl-1">{msg.nombre}</p>
        )}
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
            isMe ? 'text-white rounded-br-sm' : 'text-on-surface rounded-bl-sm'
          }`}
          style={{
            background: isMe ? '#2563eb' : '#fff',
            boxShadow: isMe ? '0 1px 4px rgba(37,99,235,.3)' : '0 1px 4px rgba(0,0,0,.08)',
          }}
        >
          {msg.text}
        </div>
        <p className={`text-[10px] text-on-surface-muted mt-0.5 ${isMe ? 'text-right pr-1' : 'pl-1'}`}>
          {msg.time}
        </p>
      </div>
    </div>
  )
}

function TypingIndicator({ responder }) {
  return (
    <div className="flex items-end gap-2 mb-2">
      {responder && (
        <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
          {responder.img ? (
            <img src={responder.img} className="w-full h-full object-cover" alt="" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: responder.avatarColor || '#6366f1' }}>
              {responder.initial || (responder.nombre ? responder.nombre[0] : '?')}
            </div>
          )}
        </div>
      )}
      <div className="px-4 py-3 bg-white rounded-2xl rounded-bl-sm flex gap-1 items-center"
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,.08)' }}>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" style={{ animation: 'typingDot 1.2s infinite', animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" style={{ animation: 'typingDot 1.2s infinite', animationDelay: '200ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" style={{ animation: 'typingDot 1.2s infinite', animationDelay: '400ms' }} />
      </div>
    </div>
  )
}

function DateDivider({ label }) {
  return (
    <div className="flex items-center gap-3 my-3">
      <div className="flex-1 h-px bg-outline/40" />
      <span className="text-[11px] text-on-surface-muted font-medium">{label}</span>
      <div className="flex-1 h-px bg-outline/40" />
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────
export default function ChatView({ header, initialMessages = [], onBack, aiEnabled = false, aiResponder = null }) {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function send() {
    const text = input.trim()
    if (!text) return
    const now = new Date()
    const timeStr = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })

    setMessages(prev => [
      ...prev,
      { from: 'yo', text, time: timeStr },
    ])
    setInput('')

    if (aiEnabled && aiResponder) {
      // Show typing indicator after a short delay
      const typingDelay = 500 + Math.random() * 300
      const responseDelay = typingDelay + 900 + Math.random() * 700

      setTimeout(() => setTyping(true), typingDelay)
      setTimeout(() => {
        setTyping(false)
        const responseText = generateAIResponse(text)
        const responseTime = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
        const avatarValue = aiResponder.img || aiResponder.initial || (aiResponder.nombre ? aiResponder.nombre[0].toUpperCase() : '?')
        setMessages(prev => [
          ...prev,
          {
            from: aiResponder.nombre,
            nombre: aiResponder.nombre,
            avatar: avatarValue,
            avatarColor: aiResponder.avatarColor,
            text: responseText,
            time: responseTime,
          },
        ])
      }, responseDelay)
    }
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const bottomNavOffset = 'calc(82px + env(safe-area-inset-bottom))'

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ paddingBottom: bottomNavOffset }}>
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 bg-surface/95 backdrop-blur-md border-b border-outline/30 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition flex-shrink-0"
        >
          <span className="material-symbols-outlined text-on-surface-muted" style={{ fontSize: 22 }}>arrow_back</span>
        </button>
        {header}
        {aiEnabled && (
          <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full flex-shrink-0">
            <span className="material-symbols-outlined fill-icon" style={{ fontSize: 13 }}>smart_toy</span>
            <span className="text-[10px] font-bold">IA</span>
          </div>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scroll px-4 py-3" style={{ background: '#f1f3ff' }}>
        {messages.map((msg, i) => {
          const prevMsg = messages[i - 1]
          const showDate = !prevMsg || prevMsg.date !== msg.date
          return (
            <div key={i}>
              {showDate && msg.date && <DateDivider label={msg.date} />}
              <Bubble msg={msg} isMe={msg.from === 'yo'} />
            </div>
          )
        })}
        {typing && <TypingIndicator responder={aiResponder} />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-end gap-2 px-4 py-3 bg-surface border-t border-outline/30">
        <div className="flex-1 bg-surface-container rounded-2xl px-4 py-2.5 flex items-center">
          <input
            className="flex-1 bg-transparent text-[14px] text-on-surface outline-none placeholder:text-on-surface-muted"
            placeholder="Escribí un mensaje..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
          />
        </div>
        <button
          onClick={send}
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 transition hover:bg-primary-dark active:scale-90"
          style={{ boxShadow: '0 2px 8px rgba(37,99,235,.35)' }}
        >
          <span className="material-symbols-outlined fill-icon text-white" style={{ fontSize: 18 }}>send</span>
        </button>
      </div>
    </div>
  )
}
