// ============================================================
// Generate a 6-character alphanumeric session code
// Used for duo sessions so the guest device can join
// ============================================================

const CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous: 0/O, 1/I

/**
 * Generates a random 6-character code for session pairing.
 * Uses only unambiguous characters to avoid user confusion
 * when entering codes manually.
 */
export function generateSessionCode(): string {
  let code = "";
  const array = new Uint8Array(6);
  crypto.getRandomValues(array);

  for (let i = 0; i < 6; i++) {
    code += CHARACTERS[array[i] % CHARACTERS.length];
  }

  return code;
}
