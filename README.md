# Cloudflare Workers React Starter

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/boxrui1105/retrodroid-os)

A production-ready fullstack starter template featuring Cloudflare Workers (with Durable Objects), React, Vite, Tailwind CSS, shadcn/ui, TanStack Query, and Hono. Perfect for building fast, scalable web applications with edge deployment.

## Features

- **Cloudflare Workers Backend**: Serverless API with Hono routing and Durable Objects for stateful storage.
- **React Frontend**: Modern UI with React Router, TanStack Query for data fetching, and error boundaries.
- **shadcn/ui Components**: Fully customizable, accessible UI library with Tailwind CSS.
- **Theme Support**: Light/dark mode with persistence.
- **Type-Safe**: Full TypeScript support across frontend, backend, and shared types.
- **Demo Integrations**: Counter, CRUD operations on demo items stored in Durable Objects.
- **Development Tools**: Hot reload, linting, type generation for Workers bindings.
- **Production-Ready**: CORS, logging, error handling, client error reporting, and SPA asset handling.

## Tech Stack

- **Backend**: Cloudflare Workers, Hono, Durable Objects
- **Frontend**: React 18, Vite, React Router, TanStack Query
- **Styling**: Tailwind CSS, shadcn/ui, Lucide Icons
- **Utilities**: Zod (validation), Immer (immutability), Framer Motion (animations), Sonner (toasts)
- **Dev Tools**: Bun, TypeScript, ESLint, Wrangler
- **Other**: Recharts (charts), React Hook Form, UUID

## Quick Start

1. **Prerequisites**:
   - [Bun](https://bun.sh/) installed
   - [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated (`wrangler login`)

2. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   cd neon-droid-os-un88adyeu6lbtaursppnt
   bun install
   ```

3. **Generate Worker Types** (one-time):
   ```bash
   bun run cf-typegen
   ```

4. **Development**:
   ```bash
   bun run dev
   ```
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api/health

## Development

- **Frontend**: Edit `src/` files. Vite handles HMR.
- **Backend Routes**: Add routes in `worker/userRoutes.ts`. Core files (`index.ts`, `durableObject.ts`) are protected.
- **Shared Types**: Use `shared/types.ts` for API contracts.
- **Durable Objects**: State stored in `GlobalDurableObject`. Extend methods as needed.
- **Build & Preview**:
  ```bash
  bun run build
  bun run preview
  ```
- **Lint**:
  ```bash
  bun run lint
  ```

### API Endpoints (Demo)

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/api/health`         | Health check                 |
| GET    | `/api/test`           | Simple test response         |
| GET    | `/api/demo`           | Fetch demo items             |
| POST   | `/api/demo`           | Add demo item                |
| PUT    | `/api/demo/:id`       | Update demo item             |
| DELETE | `/api/demo/:id`       | Delete demo item             |
| GET    | `/api/counter`        | Get counter value            |
| POST   | `/api/counter/increment` | Increment counter         |
| POST   | `/api/client-errors`  | Report client errors         |

Example with `curl`:
```bash
curl -X GET http://localhost:3000/api/demo
curl -X POST http://localhost:3000/api/counter/increment
```

## Deployment

Deploy to Cloudflare Workers with a single command:

```bash
bun run deploy
```

Or manually:
1. Build assets: `bun run build`
2. Deploy: `wrangler deploy`

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/boxrui1105/retrodroid-os)

### Production Notes

- Assets served as SPA (single-page application).
- Durable Objects use SQLite storage (migration `v1` included).
- Custom domain: Update `wrangler.jsonc` and run `wrangler deploy`.
- Environment variables: Set via Wrangler dashboard or `wrangler.toml`.
- Observability: Enabled by default.

## Customization

- **UI**: Replace `src/pages/HomePage.tsx`. Use `AppLayout` for sidebar.
- **API**: Extend `worker/userRoutes.ts`. Add DO methods in `worker/durableObject.ts`.
- **Components**: Install new shadcn/ui via `bunx shadcn-ui@latest add <component>`.
- **Tailwind**: Edit `tailwind.config.js` and `src/index.css`.

## Troubleshooting

- **Worker types**: Run `bun run cf-typegen`.
- **CORS issues**: Routes auto-handle `/api/*`.
- **Bun issues**: Ensure `bun --version` >= 1.1.0.
- **Deployment errors**: Check `wrangler tail` for logs.

## License

MIT License. See [LICENSE](LICENSE) for details.