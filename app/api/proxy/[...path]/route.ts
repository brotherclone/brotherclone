/**
 * Server-side proxy for the Fourthwall Storefront API.
 * Keeps the API token out of the client bundle.
 * Usage: GET /api/proxy/v1/products → proxies to Fourthwall API.
 */

import { type NextRequest, NextResponse } from "next/server";

const API_URL = process.env.FOURTHWALL_API_URL ?? "https://storefront.fourthwall.com";
const TOKEN = process.env.FOURTHWALL_STOREFRONT_TOKEN;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  if (!TOKEN) {
    return NextResponse.json(
      { error: "Storefront token not configured" },
      { status: 500 }
    );
  }

  const { path } = await params;
  const upstream = `${API_URL}/api/${path.join("/")}`;
  const search = request.nextUrl.search;

  const res = await fetch(`${upstream}${search}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
