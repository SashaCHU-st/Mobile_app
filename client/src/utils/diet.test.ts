import { describe, expect, it } from "vitest";
import { diets } from "./diet";

describe("diets", () => {
  it("contains labeled items", () => {
    expect(Array.isArray(diets)).toBe(true);
    expect(diets.length).toBeGreaterThan(0);
    for (const item of diets) {
      expect(item.label).toBe(item.value);
    }
  });
});
