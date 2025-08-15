import { describe, expect, test } from "vitest";

import { parseName, getInitials } from "../src/user-utils";

describe("parseName", () => {
  test("returns first name", () => {
    expect(parseName("John Doe")).toHaveProperty("first", "John");
  });

  test("returns last name", () => {
    expect(parseName("John Doe")).toHaveProperty("last", "Doe");
  });
});

describe("getInitials", () => {
  test("returns initials", () => {
    expect(getInitials("John Doe")).toBe("J.D");
  });
});
