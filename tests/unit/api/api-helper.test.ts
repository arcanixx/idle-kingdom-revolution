import { describe, it, expect, vi } from "vitest";

vi.mock("next/server", () => ({
  NextResponse: class {
    data: any;
    status: number;
    constructor(data: any, status: number = 200) {
      this.data = data;
      this.status = status;
    }
    static json(data: any, init?: { status: number }) {
      return new (vi.mocked(class { data: any; status: number; constructor(d: any, s: number = 200) { this.data = d; this.status = s; } }) )(data, init?.status || 200);
    }
  },
}));

import { jsonResponse, errorResponse } from '../../../src/lib/supabase/api-helper';

describe('API Helper', () => {
  it('jsonResponse returns data with 200', () => {
    const r = jsonResponse({ foo: 'bar' });
    expect((r as any).data).toEqual({ foo: 'bar' });
    expect((r as any).status).toBe(200);
  });

  it('jsonResponse returns custom status', () => {
    const r = jsonResponse({}, 201);
    expect((r as any).status).toBe(201);
  });

  it('errorResponse returns error with 400', () => {
    const r = errorResponse('bad request');
    expect((r as any).data).toEqual({ error: 'bad request' });
    expect((r as any).status).toBe(400);
  });

  it('errorResponse returns custom status', () => {
    const r = errorResponse('not found', 404);
    expect((r as any).status).toBe(404);
  });
});
