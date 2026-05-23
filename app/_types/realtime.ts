// ============================================================
// Supabase Realtime broadcast event payload types
// Channel name pattern: "session:{code}"
// ============================================================

/** Sent by the guest when they connect to the session channel */
export interface GuestJoinedPayload {
  guestId: string;
}

/** Sent by the host to begin a synchronized countdown */
export interface CountdownStartPayload {
  shotIndex: number;
  /** Unix timestamp (ms) when both devices should capture */
  captureAt: number;
}

/** Sent by both devices after capturing and uploading a photo */
export interface ShotCapturedPayload {
  role: "host" | "guest";
  shotIndex: number;
  photoUrl: string;
}

/** Sent by the host when all shots are done */
export interface SessionCompletePayload {
  sessionId: string;
}

// ============================================================
// Union type for all broadcast events
// ============================================================

export type RealtimeEvent =
  | { type: "guest_joined"; payload: GuestJoinedPayload }
  | { type: "countdown_start"; payload: CountdownStartPayload }
  | { type: "shot_captured"; payload: ShotCapturedPayload }
  | { type: "session_complete"; payload: SessionCompletePayload };

export type RealtimeEventType = RealtimeEvent["type"];
