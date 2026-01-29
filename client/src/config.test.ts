import { describe, expect, it } from "vitest";
import { API_URL } from "./config";

describe("config", () => {
  it("uses localhost on non-ReactNative runtimes", () => {
    expect(API_URL).toBe("http://localhost:3001");
  });
});
