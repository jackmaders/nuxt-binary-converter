import { describe, expect, test } from "vitest";
import convertBinary from "./convertBinary";

describe("Static tests", () => {
  const staticScenarios = [
    { binary: "0", decimal: 0 },
    { binary: "1", decimal: 1 },
    { binary: "10", decimal: 2 },
    { binary: "11111111", decimal: 255 },
  ];

  test.each(staticScenarios)(
    "convertBinary($binary) -> $decimal",
    ({ binary, decimal }) => {
      const result = convertBinary(binary);
      expect(result).toBe(decimal);
    },
  );
});

describe("Random tests", () => {
  const randomScenarios = Array(10)
    .fill(null)
    .map(() => {
      const decimal = Math.floor(Math.random() * 255);
      const binary = decimal.toString(2);
      return {
        binary,
        decimal,
      };
    });

  test.each(randomScenarios)(
    "convertBinary($binary) -> $decimal",
    ({ binary, decimal }) => {
      const result = convertBinary(binary);
      expect(result).toBe(decimal);
    },
  );
});

describe("Edge cases", () => {
  test("Empty string returns NaN", () => {
    const result = convertBinary("");
    expect(result).toBe(NaN);
  });

  test("Non-numeric returns Nan", () => {
    const result = convertBinary("ab");
    expect(result).toBe(NaN);
  });

  test("Non-binary returns Nan", () => {
    const result = convertBinary("2");
    expect(result).toBe(NaN);
  });
});
