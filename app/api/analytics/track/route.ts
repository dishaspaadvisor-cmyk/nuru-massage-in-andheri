import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/app/lib/mongoose";
import { TrafficEvent } from "@/app/models/TrafficEvent";

export const runtime = "nodejs";

const allowedEvents = new Set(["whatsapp_click", "phone_click", "direction_click"]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventType = String(body.eventType || "").slice(0, 80);

    if (!allowedEvents.has(eventType)) {
      return NextResponse.json({ ok: true, stored: false, ignored: true });
    }

    const connected = await connectMongoose();

    if (!connected) {
      return NextResponse.json({ ok: true, stored: false });
    }

    await TrafficEvent.create({
      eventType,
      path: String(body.path || "/").slice(0, 250),
      href: String(body.href || "").slice(0, 500),
      label: String(body.label || "").slice(0, 160)
    });

    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const connected = await connectMongoose();
    if (!connected) {
      return NextResponse.json({ ok: true, stored: false, totals: {}, byDay: [] });
    }

    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "weekly";
    const now = new Date();
    let from = new Date(now);
    let to = now;

    if (range === "monthly") {
      from.setDate(now.getDate() - 30);
    } else if (range === "custom") {
      const fromParam = searchParams.get("from");
      const toParam = searchParams.get("to");
      if (!fromParam || !toParam) {
        return NextResponse.json({ ok: false, error: "Custom range requires from and to query params." }, { status: 400 });
      }
      from = new Date(fromParam);
      to = new Date(toParam);
      to.setHours(23, 59, 59, 999);
    } else {
      from.setDate(now.getDate() - 7);
    }

    const match = {
      eventType: { $in: Array.from(allowedEvents) },
      createdAt: { $gte: from, $lte: to }
    };

    const [totals, byDay] = await Promise.all([
      TrafficEvent.aggregate([
        { $match: match },
        { $group: { _id: "$eventType", count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      TrafficEvent.aggregate([
        { $match: match },
        {
          $group: {
            _id: {
              day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              eventType: "$eventType"
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.day": 1, "_id.eventType": 1 } }
      ])
    ]);

    return NextResponse.json({
      ok: true,
      range,
      from,
      to,
      totals: totals.reduce<Record<string, number>>((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      byDay: byDay.map((item) => ({
        date: item._id.day,
        eventType: item._id.eventType,
        count: item.count
      }))
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
