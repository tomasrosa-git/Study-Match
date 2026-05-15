import { useState, useRef, useEffect } from 'react'

// ─── AI response engine ───────────────────────────────────────────
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function generateAIResponse(userMessage) {
  const t = userMessage.toLowerCase()

  if (/hola|buenas|buenas tardes|buenas noches|buen día/.test(t)) {
    return pick([
      '¡Hola! ¿Cómo va el estudio? 😊',
      '¡Buenas! ¿En qué te puedo ayudar hoy?',
      '¡Hola! Qué bueno que estés por acá. ¿Arrancamos a repasar?',
    ])
  }
  if (/parcial|examen|final|prueba/.test(t)) {
    return pick([
      '¡Entiendo! Los parciales generan mucha presión. ¿Qué temas entran? Podemos armar un plan de repaso juntos 📚',
      '¿Cuándo es? Si me decís los temas, te doy una mano para organizarte.',
      'Para los finales lo mejor es dividir el material por unidades y repasar de a poco. ¿Cuánto tiempo tenés?',
    ])
  }
  if (/apunte|pdf|material|resumen|guía|gua/.test(t)) {
    return pick([
      'Tengo apuntes sobre ese tema. ¿Te los comparto por acá? 📎',
      '¡Sí! Dame un momento que lo busco. ¿Necesitás todo o alguna unidad específica?',
      'Tengo el resumen completo. Lo hice la semana pasada y está bastante prolijo 😄',
    ])
  }
  if (/cundo|cuándo|horario|hora|juntamos|reunir|día|dias|días/.test(t)) {
    return pick([
      'Yo tengo disponibilidad tardes y fines de semana. ¿Cuándo te viene mejor?',
      '¿Preferís de mañana o de tarde? Así coordino según mi horario 📅',
      'Esta semana podría el jueves después de las 17. ¿Te sirve?',
    ])
  }
  if (/gracias|dale|perfecto|ok|bárbaro|barbaro|genial|bueno/.test(t)) {
    return pick([
      '¡De nada! Cualquier duda más, avisame 😊',
      '¡Genial! Nos vemos entonces. Éxitos en el estudio 🍀',
      '¡Buenísimo! Sigamos así 💪',
    ])
  }
  if (/duda|no entiendo|entend|difícil|difícil|complicado|cuesta/.test(t)) {
    return pick([
      'Contame qué no te queda claro, lo vemos juntos. A veces explicarlo en voz alta ayuda mucho.',
      'Normal, es un tema que cuesta bastante. ¿Qué parte específicamente te traba?',
      'Ese tema me costó también al principio. Hay un truco para entenderlo más fácil, te cuento...',
    ])
  }
  if (/freud|lacan|psicoanalisis|psicoanálisis/.test(t)) {
    return pick([
      'Freud es denso pero una vez que agarrás el hilo se vuelve más claro. ¿Estás con la parte de los sueños o con la metapsicología?',
      'Para Lacan recomiendo empezar por los seminarios más accesibles. ¿Tenés los apuntes de la cátedra?',
    ])
  }
  if (/anatomía|anatomia|neuro|biología|biologia/.test(t)) {
    return pick([
      'Para Neuroanatomía lo mejor es estudiar con imágenes. ¿Tenés el atlas? Te mando el link si no lo conseguís.',
      '¡Ese tema me encanta! Las guías de la cátedra B son muy buenas para repasar. ¿Las tenés?',
    ])
  }
  if (/álgebra|algebra|cálculo|calculo|matemática|matematica/.test(t)) {
    return pick([
      'Para Álgebra lo clave es hacer muchos ejercicios. ¿Con qué tema tenés dificultades?',
      'Cálculo se aprende practicando. Te recomiendo resolver las guías de años anteriores que siempre repiten ejercicios.',
    ])
  }
  if (/biblio|biblioteca|facultad|fac/.test(t)) {
    return pick([
      '¡Dale, nos juntamos en la biblio! ¿A qué hora te viene bien?',
      'La biblio siempre está llena al mediodía, mejor ir temprano o tarde. ¿Qué horario te queda?',
    ])
  }
  if (/tp|trabajo práctico|trabajo practico/.test(t)) {
    return pick([
      'Para el TP podemos dividirnos las partes y después revisamos todo juntos. ¿Cuánto queda para la entrega?',
      'Los TPs grupales son más llevaderos cuando cada uno toma una parte. ¿Empezamos a organizar?',
    ])
  }

  // Respuestas genéricas contextuales
  return pick([
    '¡Entendido! ¿Querés que repasemos ese tema juntos? 📖',
    'Tiene sentido. ¿Hay algo más en lo que te pueda ayudar para el estudio?',
    'Bien! La constancia es clave para aprender bien. ¿Cuándo estudiamos?',
    'De acuerdo. Avisame cuando quieras coordinar 😊',
    '¡Buena idea! Podemos armar una sesión de estudio esta semana.',
    'Interesante. ¿Tenés los materiales o necesitás que te pase algo?',
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

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
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
