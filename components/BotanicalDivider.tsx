export default function BotanicalDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left line */}
      <line x1="0" y1="14" x2="92" y2="14" stroke="#C4A882" strokeWidth="0.75" />
      {/* Left leaf */}
      <path d="M 94 14 C 99 5 113 5 118 14 C 113 23 99 23 94 14 Z" stroke="#2D5A3D" strokeWidth="1" />
      <line x1="94" y1="14" x2="118" y2="14" stroke="#2D5A3D" strokeWidth="0.5" />
      {/* Left gap to diamond */}
      <line x1="120" y1="14" x2="143" y2="14" stroke="#C4A882" strokeWidth="0.75" />
      {/* Center diamond */}
      <path d="M 150 7 L 157 14 L 150 21 L 143 14 Z" fill="#C4A882" />
      {/* Right gap from diamond */}
      <line x1="157" y1="14" x2="180" y2="14" stroke="#C4A882" strokeWidth="0.75" />
      {/* Right leaf (mirrored) */}
      <path d="M 206 14 C 201 5 187 5 182 14 C 187 23 201 23 206 14 Z" stroke="#2D5A3D" strokeWidth="1" />
      <line x1="182" y1="14" x2="206" y2="14" stroke="#2D5A3D" strokeWidth="0.5" />
      {/* Right line */}
      <line x1="208" y1="14" x2="300" y2="14" stroke="#C4A882" strokeWidth="0.75" />
    </svg>
  );
}
