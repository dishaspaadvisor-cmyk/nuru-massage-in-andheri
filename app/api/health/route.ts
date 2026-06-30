import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "spa-seo-site",
    mongoConfigured: Boolean(process.env.MONGODB_URI)
  });
}
