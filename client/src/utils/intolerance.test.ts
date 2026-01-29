import { describe, expect, it } from "vitest";
import { intolerances } from "./intolerance";

describe("intolerances", () => {
  it("contains labeled items", () => {
    expect(Array.isArray(intolerances)).toBe(true);
    expect(intolerances.length).toBeGreaterThan(0);
    for (const item of intolerances) {
      expect(item.label).toBe(item.value);
    }
  });
});
