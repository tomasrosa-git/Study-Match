export default function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rounded square background */}
      <rect width="100" height="100" rx="22" fill="#EDE8DC"/>

      {/* Book back cover (left side) */}
      <path d="M18 28 Q18 22 24 22 L50 22 L50 78 L24 78 Q18 78 18 72 Z" fill="#1e3a8a"/>
      {/* Book back cover (right side) */}
      <path d="M82 28 Q82 22 76 22 L50 22 L50 78 L76 78 Q82 78 82 72 Z" fill="#1e3a8a"/>

      {/* Left page */}
      <path d="M50 24 L26 26 Q22 26 22 30 L22 70 Q22 74 26 74 L50 72 Z" fill="#F5F0E0"/>
      {/* Right page */}
      <path d="M50 24 L74 26 Q78 26 78 30 L78 70 Q78 74 74 74 L50 72 Z" fill="#FDFAF2"/>

      {/* Book spine */}
      <path d="M48 23 Q50 22 52 23 L52 77 Q50 78 48 77 Z" fill="#162d6e"/>

      {/* Book bottom curve */}
      <path d="M30 77 Q50 84 70 77" stroke="#1e3a8a" strokeWidth="3.5" strokeLinecap="round" fill="none"/>

      {/* Left arm (maroon/dark red) */}
      <path d="M22 62 Q24 56 30 52 L42 48 Q45 47 46 50 L46 56 Q46 58 43 59 L34 62 Q32 63 32 65 L32 68 Q32 70 30 70 L24 70 Q22 70 22 68 Z" fill="#8B2635"/>
      {/* Left sleeve highlight */}
      <path d="M22 62 Q24 56 30 52 L36 50" stroke="#6B1D28" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* Right arm (dark green) */}
      <path d="M78 62 Q76 56 70 52 L58 48 Q55 47 54 50 L54 56 Q54 58 57 59 L66 62 Q68 63 68 65 L68 68 Q68 70 70 70 L76 70 Q78 70 78 68 Z" fill="#2D5A3D"/>
      {/* Right sleeve highlight */}
      <path d="M78 62 Q76 56 70 52 L64 50" stroke="#1F3D2A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* Handshake - combined hands */}
      {/* Left hand body */}
      <path d="M42 50 Q44 47 47 48 L54 51 Q57 52 56 55 L55 57 Q54 59 51 58 L44 56 Q41 55 42 52 Z" fill="#C68642"/>
      {/* Right hand body */}
      <path d="M58 50 Q56 47 53 48 L46 51 Q43 52 44 55 L45 57 Q46 59 49 58 L56 56 Q59 55 58 52 Z" fill="#B87332"/>

      {/* Fingers left */}
      <path d="M44 50 Q43 46 45 45 Q47 44 48 47" stroke="#C68642" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M46 49 Q45 45 47 44 Q49 43 50 46" stroke="#C68642" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M48 49 Q48 45 50 44 Q52 43 52 46" stroke="#C68642" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Fingers right */}
      <path d="M56 50 Q57 46 55 45 Q53 44 52 47" stroke="#B87332" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M54 49 Q55 45 53 44 Q51 43 50 46" stroke="#B87332" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  )
}
