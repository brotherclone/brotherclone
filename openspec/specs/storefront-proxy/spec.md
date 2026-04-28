# Capability: storefront-proxy

## Purpose
Keeps the Fourthwall API token server-side by routing all Fourthwall Storefront API calls through a Next.js route handler at `/api/proxy/[...path]`.

## Requirements

### Requirement: Token Isolation
The Fourthwall `FOURTHWALL_STOREFRONT_TOKEN` MUST NOT appear in any client bundle or browser-visible response. All calls to the Fourthwall Storefront API SHALL go through the server-side proxy.

> **Note:** This requirement targets client-initiated and externally-originating requests. Server-side lib code (e.g. `lib/fourthwall.ts`) running inside Next.js server components may call the Fourthwall API directly, because the token is never serialised into the client bundle in that context. Routing a server component through the proxy would create a needless internal HTTP roundtrip without improving token safety.

#### Scenario: Proxy call succeeds
- **WHEN** the server calls `GET /api/proxy/v1/products`
- **THEN** the handler adds the `Authorization: Bearer <token>` header, forwards to Fourthwall, and returns the response body with the same HTTP status

#### Scenario: Token not configured
- **WHEN** `FOURTHWALL_STOREFRONT_TOKEN` env var is missing
- **THEN** the proxy returns `500 { "error": "Storefront token not configured" }`

### Requirement: Query Parameter Forwarding
The proxy SHALL forward all query parameters from the incoming request to the upstream Fourthwall URL unchanged.

#### Scenario: Tag filter forwarded
- **WHEN** the server calls `GET /api/proxy/v1/products?tag=active-drop`
- **THEN** Fourthwall receives `?tag=active-drop` and returns only matching products

### Requirement: Path Passthrough
The proxy SHALL accept any trailing path segment and append it to the Fourthwall base URL under `/api/`.

#### Scenario: Nested path
- **WHEN** the request path is `/api/proxy/v1/products/abc123`
- **THEN** the upstream URL is `<FOURTHWALL_API_URL>/api/v1/products/abc123`
