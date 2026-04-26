type Props = {
  className?: string;
  ariaLabel?: string;
};

/**
 * VL monogram. Uses currentColor for the fill so the surrounding text-color
 * utility controls black vs white (or any tint).
 */
export function Logo({ className, ariaLabel = "Valentin Liegrois" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="currentColor"
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <path d="M8 14 L16 14 L26 50 L18 50 Z" />
      <path d="M36 14 L44 14 L34 50 L26 50 Z" />
      <path d="M48 14 L56 14 L56 42 L62 42 L62 50 L48 50 Z" />
    </svg>
  );
}
