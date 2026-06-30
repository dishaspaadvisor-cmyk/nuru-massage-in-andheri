import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/app/lib/mongoose";
import { ContactSubmission } from "@/app/models/ContactSubmission";
import { Lead } from "@/app/models/Lead";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead = {
      name: String(body.name || "").trim().slice(0, 120),
      phone: String(body.phone || "").trim().slice(0, 40),
      service: String(body.service || "").trim().slice(0, 120),
      preferredDate: String(body.preferredDate || "").trim().slice(0, 80),
      message: String(body.message || "").trim().slice(0, 700),
      sourcePath: String(body.sourcePath || "/").trim().slice(0, 250)
    };

    if (!lead.name || !lead.phone) {
      return NextResponse.json({ ok: false, error: "Name and phone are required." }, { status: 400 });
    }

    const connected = await connectMongoose();
    if (connected) {
      await Promise.all([Lead.create(lead), ContactSubmission.create(lead)]);
    }

    return NextResponse.json({ ok: true, stored: Boolean(connected) });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
