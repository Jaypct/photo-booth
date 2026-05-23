// ============================================================
// Utility for conditionally joining CSS class names
// ============================================================

/**
 * Joins class name strings together, filtering out falsy values.
 * Useful for conditionally applying Tailwind classes.
 *
 * @example
 * cn("base-class", isActive && "active", isDisabled && "opacity-50")
 * // => "base-class active" (if isActive is true, isDisabled is false)
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
