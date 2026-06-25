import { describe, it, expect, vi } from 'vitest';

// Mock NextResponse before importing
const mockJson = vi.fn((data, init) => ({ data, status: init?.status || 200 }));
vi.mock('next/server', () => ({
  NextResponse: { json: (...args) => mockJson(...args) },
}));

import { jsonResponse, errorResponse } from '../../../src/lib/supabase/api-helper';

describe('API Helper', () => {
  it('jsonResponse returns data with 200', () => {
    const r = jsonResponse({ foo: 'bar' });
    expect(r.data).toEqual({ foo: 'bar' });
    expect(r.status).toBe(200);
  });

  it('jsonResponse returns custom status', () => {
    const r = jsonResponse({}, 201);
    expect(r.status).toBe(201);
  });

  it('errorResponse returns error with 400', () => {
    const r = errorResponse('bad request');
    expect(r.data).toEqual({ error: 'bad request' });
    expect(r.status).toBe(400);
  });

  it('errorResponse returns custom status', () => {
    const r = errorResponse('not found', 404);
    expect(r.status).toBe(404);
  });
});
