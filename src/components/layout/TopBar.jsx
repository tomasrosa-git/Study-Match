import Logo from '../Logo'

export default function TopBar({
  title,
  leftIcon,
  rightIcon,
  onLeft,
  onRight,
  showBrand = false,
  notifBadge = false,
}) {
  return (
    <header className="flex items-center justify-between px-5 py-3.5 bg-surface/95 backdrop-blur-md sticky top-0 z-20 border-b border-outline/30">
      {showBrand ? (
        <div className="flex items-center gap-2.5">
          <Logo size={34} />
          <span className="text-primary font-extrabold text-[17px] tracking-wider uppercase">
            Study Match
          </span>
        </div>
      ) : (
        <button
          onClick={onLeft}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition"
        >
          <span className="material-symbols-outlined text-on-surface-muted" style={{ fontSize: 22 }}>
            {leftIcon || 'arrow_back'}
          </span>
        </button>
      )}

      {title && (
        <span className="font-bold text-on-surface text-[15px] tracking-wide">{title}</span>
      )}

      {rightIcon ? (
        <button
          onClick={onRight}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition"
        >
          <span className="material-symbols-outlined text-on-surface-muted" style={{ fontSize: 22 }}>
            {rightIcon}
          </span>
        </button>
      ) : showBrand ? (
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition">
          <span className="material-symbols-outlined text-on-surface-muted" style={{ fontSize: 22 }}>
            notifications
          </span>
          {notifBadge && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-surface" />
          )}
        </button>
      ) : (
        <div className="w-9" />
      )}
    </header>
  )
}
