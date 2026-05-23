// ============================================================
// Session, Shot, and Composite TypeScript types
// Maps to the Supabase PostgreSQL schema
// ============================================================

export type SessionMode = "solo" | "duo";

export type SessionStatus = "waiting" | "active" | "capturing" | "completed";

export interface Session {
  id: string;
  mode: SessionMode;
  code: string | null; // null for solo sessions
  host_id: string;
  guest_id: string | null;
  template_id: string | null;
  shot_count: number;
  status: SessionStatus;
  created_at: string;
  expires_at: string;
}

export interface Shot {
  id: string;
  session_id: string;
  shot_index: number; // 0-based
  host_photo_url: string | null;
  guest_photo_url: string | null;
  captured_at: string | null;
  created_at: string;
}

export interface Composite {
  id: string;
  session_id: string;
  image_url: string;
  created_at: string;
}

// ============================================================
// Request / Response helpers
// ============================================================

export interface CreateSessionRequest {
  mode: SessionMode;
  template_id: string;
  shot_count: number;
}

export interface CreateSessionResponse {
  session: Session;
}

export interface JoinSessionRequest {
  code: string;
}
