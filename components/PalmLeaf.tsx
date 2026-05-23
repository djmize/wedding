type PalmLeafProps = {
  className?: string;
  flip?: boolean;
};

export default function PalmLeaf({ className, flip = false }: PalmLeafProps) {
  return (
    <svg
      viewBox="0 0 140 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      {/* Blade 1 — straight up, slight curve */}
      <path d="M 65 200 C 62 155 58 110 54 35 C 62 110 67 155 65 200 Z" fill="#2D5A3D" opacity="0.5" />
      {/* Blade 2 — upper right */}
      <path d="M 68 192 C 80 155 100 118 128 62 C 104 120 80 158 68 192 Z" fill="#2D5A3D" opacity="0.45" />
      {/* Blade 3 — right */}
      <path d="M 71 178 C 90 158 115 142 140 132 C 116 146 90 164 71 178 Z" fill="#2D5A3D" opacity="0.38" />
      {/* Blade 4 — upper left */}
      <path d="M 62 192 C 50 155 30 118 2 62 C 26 120 50 158 62 192 Z" fill="#2D5A3D" opacity="0.45" />
      {/* Blade 5 — left */}
      <path d="M 59 178 C 40 158 15 142 -10 132 C 14 146 40 164 59 178 Z" fill="#2D5A3D" opacity="0.38" />
      {/* Central stem */}
      <path d="M 66 200 C 64 160 62 120 58 35" stroke="#2D5A3D" strokeWidth="1.25" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}
