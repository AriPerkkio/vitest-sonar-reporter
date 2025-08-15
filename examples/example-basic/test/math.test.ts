import { test, expect, describe } from "vitest";

import math from "../src/math";

describe("math", () => {
  test("sum", () => {
    expect(math(5, 7, "+")).toBe(12);
  });

  test("multiply", () => {
    expect(math(5, 2, "*")).toBe(10);
  });
});
