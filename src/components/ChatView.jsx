import { useState, useRef, useEffect } from 'react'

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
            isMe
              ? 'text-white rounded-br-sm'
              : 'text-on-surface rounded-bl-sm'
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

function DateDivider({ label }) {
  return (
    <div className="flex items-center gap-3 my-3">
      <div className="flex-1 h-px bg-outline/40" />
      <span className="text-[11px] text-on-surface-muted font-medium">{label}</span>
      <div className="flex-1 h-px bg-outline/40" />
    </div>
  )
}

export default function ChatView({ header, initialMessages = [], onBack }) {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function send() {
    const text = input.trim()
    if (!text) return
    const now = new Date()
    setMessages(prev => [
      ...prev,
      { from: 'yo', text, time: now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) },
    ])
    setInput('')
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
