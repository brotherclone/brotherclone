/**
 * Vercel Cron endpoint — fires at 16:00 UTC (noon Eastern) daily.
 * Triggers Next.js ISR revalidation so the drop page fetches fresh data.
 *
 * vercel.json schedule: "0 16 * * *"
 */

import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Vercel Cron sets this header; reject anything else in production
  const authHeader = request.headers.get("authorization");
  if (
    process.env.NODE_ENV === "production" &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Bust the cache on the drop page so the new product shows immediately
  revalidatePath("/");
  revalidatePath("/archive");

  return NextResponse.json({ revalidated: true, ts: Date.now() });
}
