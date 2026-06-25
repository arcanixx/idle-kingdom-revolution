import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';

const mockNextResponse = { json: vi.fn((data, init) => ({ data, status: init?.status || 200, headers: new Map() })) };
vi.mock('next/server', () => ({ NextResponse: { json: (...args) => mockNextResponse.json(...args) } }));

import { validateRequest, validateQuery, withErrorHandler, withValidatedRequest } from '../../../src/lib/api/validation-middleware';

const TestSchema = z.object({ name: z.string().min(1) });

describe('Validation Middleware', () => {
  describe('validateRequest', () => {
    it('skips validation for GET', async () => {
      const req = { method: 'GET' };
      const r = await validateRequest(req as any, TestSchema);
      expect(r.success).toBe(true);
    });

    it('validates POST body', async () => {
      const req = { method: 'POST', json: () => Promise.resolve({ name: 'test' }) };
      const r = await validateRequest(req as any, TestSchema);
      expect(r.success).toBe(true);
      if (r.success) expect(r.data.name).toBe('test');
    });

    it('rejects invalid POST body', async () => {
      const req = { method: 'POST', json: () => Promise.resolve({}) };
      const r = await validateRequest(req as any, TestSchema);
      expect(r.success).toBe(false);
    });

    it('handles malformed JSON', async () => {
      const req = { method: 'POST', json: () => Promise.reject(new Error('bad json')) };
      const r = await validateRequest(req as any, TestSchema);
      expect(r.success).toBe(false);
    });
  });

  describe('validateQuery', () => {
    it('parses query params', () => {
      const url = new URL('http://localhost?name=hello');
      const req = { nextUrl: url };
      const r = validateQuery(req as any, z.object({ name: z.string() }));
      expect(r.success).toBe(true);
    });

    it('rejects invalid query', () => {
      const url = new URL('http://localhost');
      const req = { nextUrl: url };
      const r = validateQuery(req as any, z.object({ count: z.coerce.number() }));
      expect(r.success).toBe(false);
    });
  });

  describe('withErrorHandler', () => {
    it('returns handler result on success', async () => {
      const r = await withErrorHandler(() => Promise.resolve({ data: 'ok', status: 200 } as any));
      expect(r.data).toBe('ok');
    });

    it('catches errors', async () => {
      const r = await withErrorHandler(() => Promise.reject(new Error('boom')));
      expect(r.data).toEqual({ error: 'boom' });
      expect(r.status).toBe(500);
    });
  });

  describe('withValidatedRequest', () => {
    it('validates and handles', async () => {
      const req = { method: 'POST', json: () => Promise.resolve({ name: 'test' }) };
      const handler = vi.fn().mockResolvedValue({ data: 'success', status: 200 });
      const r = await withValidatedRequest(req as any, TestSchema, handler);
      expect(handler).toHaveBeenCalledWith({ name: 'test' });
    });
  });
});
