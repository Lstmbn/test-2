import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const body = await request.json();

  // Optional Supabase save. Add env variables in Vercel:
  // NEXT_PUBLIC_SUPABASE_URL
  // SUPABASE_SERVICE_ROLE_KEY
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error } = await supabase.from("project_briefs").insert({
      client_name: body.contact?.name || null,
      client_email: body.contact?.email || null,
      project_location: body.contact?.location || null,
      response: body,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, responseId: crypto.randomUUID() });
}
