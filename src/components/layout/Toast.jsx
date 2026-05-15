import { useApp } from '../../context/AppContext'

export default function Toast() {
  const { toast } = useApp()

  return (
    <div
      className="fixed z-[999] left-1/2 pointer-events-none"
      style={{
        bottom: 90,
        transform: `translateX(-50%) translateY(${toast.visible ? '0px' : '16px'})`,
        opacity: toast.visible ? 1 : 0,
        transition: 'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
        maxWidth: 'calc(100% - 48px)',
      }}
    >
      <div className="bg-gray-900/95 backdrop-blur-md text-white rounded-2xl px-5 py-3 text-[13px] font-semibold whitespace-nowrap shadow-xl border border-white/10 text-center">
        {toast.message}
      </div>
    </div>
  )
}
