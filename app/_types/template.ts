// ============================================================
// Template and LayoutConfig TypeScript types
// ============================================================

export type TemplateMode = "solo" | "duo" | "both";

export interface SelectedTemplateTypes {
  id: string;
  name: string;
  shotCount: number;
  preview: string;
}

export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  mode: TemplateMode;
  shot_count: number;
  layout_config: LayoutConfig;
  preview_url: string | null;
  is_active: boolean;
  created_at: string;
}

// ============================================================
// Layout configuration stored as JSONB in PostgreSQL
// ============================================================

export interface LayoutConfig {
  width: number;
  height: number;
  background: string; // hex color or gradient
  slots: LayoutSlot[];
  overlays?: LayoutOverlay[];
}

export interface LayoutSlot {
  shotIndex: number;
  camera: "host" | "guest"; // which device's photo goes here
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius?: number;
  rotation?: number; // degrees
  border?: string; // CSS border string
}

export interface LayoutOverlay {
  type: "text" | "image";
  // Text overlay
  content?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  // Image overlay
  src?: string;
  // Shared positioning
  x: number;
  y: number;
  width?: number;
  height?: number;
  opacity?: number;
}
