import { Hono } from "hono";
import { Env } from './core-utils';
import type { ApiResponse } from '@shared/types';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/test', (c) => c.json({ success: true, data: { name: 'RetroDroid OS' }}));
    // OS Sync Endpoints
    app.get('/api/os/sync', async (c) => {
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.getOSData();
        return c.json({ success: true, data } satisfies ApiResponse);
    });
    app.post('/api/os/settings', async (c) => {
        const body = await c.req.json();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        await stub.saveOSSettings(body);
        return c.json({ success: true } satisfies ApiResponse);
    });
    app.post('/api/os/notes', async (c) => {
        const body = await c.req.json();
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        await stub.saveOSNotes(body);
        return c.json({ success: true } satisfies ApiResponse);
    });
    // Legacy Demo Endpoints
    app.get('/api/demo', async (c) => {
        const stub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
        const data = await stub.getDemoItems();
        return c.json({ success: true, data } satisfies ApiResponse);
    });
}