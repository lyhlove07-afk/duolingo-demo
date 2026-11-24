interface DuoOwlProps {
  mood?: 'happy' | 'celebrate' | 'thinking' | 'super';
  className?: string;
  size?: number;
}

export function DuoOwl({ mood = 'happy', className = '', size = 96 }: DuoOwlProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className="drop-shadow-md transition-transform duration-200"
      >
        {/* Super Cape if super */}
        {mood === 'super' && (
          <path
            d="M 25 60 C 15 90, 20 115, 35 110 C 45 95, 45 70, 35 60 Z"
            fill="#CE82FF"
            stroke="#A559D6"
            strokeWidth="3"
          />
        )}
        {mood === 'super' && (
          <path
            d="M 95 60 C 105 90, 100 115, 85 110 C 75 95, 75 70, 85 60 Z"
            fill="#CE82FF"
            stroke="#A559D6"
            strokeWidth="3"
          />
        )}

        {/* Feet */}
        <ellipse cx="45" cy="108" rx="12" ry="7" fill="#FF9600" />
        <ellipse cx="75" cy="108" rx="12" ry="7" fill="#FF9600" />

        {/* Main Body */}
        <path
          d="M 20 65 C 20 30, 45 15, 60 15 C 75 15, 100 30, 100 65 C 100 95, 85 106, 60 106 C 35 106, 20 95, 20 65 Z"
          fill={mood === 'super' ? '#58CC02' : '#58CC02'}
          stroke="#46A302"
          strokeWidth="3.5"
        />

        {/* Belly patch */}
        <path
          d="M 38 70 C 38 52, 50 48, 60 48 C 70 48, 82 52, 82 70 C 82 88, 72 98, 60 98 C 48 98, 38 88, 38 70 Z"
          fill="#86EFAC"
          opacity="0.8"
        />

        {/* Wings */}
        <path
          d={
            mood === 'celebrate'
              ? 'M 22 55 C 8 40, 12 25, 28 38 C 24 48, 22 52, 22 55 Z'
              : 'M 20 60 C 10 70, 12 85, 25 78 C 24 72, 22 65, 20 60 Z'
          }
          fill="#46A302"
        />
        <path
          d={
            mood === 'celebrate'
              ? 'M 98 55 C 112 40, 108 25, 92 38 C 96 48, 98 52, 98 55 Z'
              : 'M 100 60 C 110 70, 108 85, 95 78 C 96 72, 98 65, 100 60 Z'
          }
          fill="#46A302"
        />

        {/* Eyes Outer White */}
        <circle cx="43" cy="48" r="16" fill="white" stroke="#46A302" strokeWidth="2" />
        <circle cx="77" cy="48" r="16" fill="white" stroke="#46A302" strokeWidth="2" />

        {/* Pupils */}
        {mood === 'celebrate' ? (
          <>
            {/* Happy squinting curved eyes */}
            <path
              d="M 33 48 Q 43 38 53 48"
              fill="none"
              stroke="#374151"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 67 48 Q 77 38 87 48"
              fill="none"
              stroke="#374151"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </>
        ) : mood === 'thinking' ? (
          <>
            <circle cx="45" cy="44" r="7" fill="#374151" />
            <circle cx="79" cy="44" r="7" fill="#374151" />
            <circle cx="47" cy="42" r="2.5" fill="white" />
            <circle cx="81" cy="42" r="2.5" fill="white" />
          </>
        ) : (
          <>
            <circle cx="45" cy="48" r="7.5" fill="#374151" />
            <circle cx="75" cy="48" r="7.5" fill="#374151" />
            {/* Catchlight */}
            <circle cx="47" cy="45" r="2.5" fill="white" />
            <circle cx="77" cy="45" r="2.5" fill="white" />
          </>
        )}

        {/* Beak */}
        <polygon
          points="60,54 51,68 69,68"
          fill="#FF9600"
          stroke="#E08000"
          strokeWidth="1.5"
        />

        {/* Super Star Crown if Super */}
        {mood === 'super' && (
          <g transform="translate(60, 16) scale(0.8)">
            <polygon
              points="0,-16 4,-5 15,-5 6,2 10,13 0,6 -10,13 -6,2 -15,-5 -4,-5"
              fill="#FFC800"
              stroke="#E5B200"
              strokeWidth="1.5"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
