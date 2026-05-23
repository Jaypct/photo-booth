import { NextResponse } from "next/server";
import { createClient } from "@/app/_lib/supabase/server";
import { generateSessionCode } from "@/app/broadcast/utils/generateCode";

export async function POST(req: Request) {
  const supabase = await createClient();

  const body = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { mode, templateId, shotCount } = body;

  const code = mode === "duo" ? generateSessionCode() : null;

  const { data, error } = await supabase
    .from("sessions")
    .insert({
      mode,
      code,
      host_id: user.id,
      template_id: templateId,
      shot_count: shotCount,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
