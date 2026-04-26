type Props = {
  className?: string;
  ariaLabel?: string;
};

/**
 * VL monogram. Uses currentColor for the fill so the surrounding text-color
 * utility controls black vs white.
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
      <path d="M4 14 L13 14 L17 38 L21 14 L30 14 L21 52 L13 52 Z" />
      <path d="M34 14 L43 14 L43 44 L60 44 L60 52 L34 52 Z" />
    </svg>
  );
}
