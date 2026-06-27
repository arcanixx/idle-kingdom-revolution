import { describe, it, expect } from "vitest";

describe("build check", () => {
  it("should have next.config.ts", () => {
    const fs = require("fs");
    expect(fs.existsSync("next.config.ts")).toBe(true);
  });

  it("should have tsconfig.json", () => {
    const fs = require("fs");
    expect(fs.existsSync("tsconfig.json")).toBe(true);
  });

  it("should have src directory", () => {
    const fs = require("fs");
    expect(fs.existsSync("src")).toBe(true);
  });
});
