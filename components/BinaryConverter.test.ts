// @vitest-environment nuxt
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, test } from "vitest";
import BinaryConverterVue from "./BinaryConverter.vue";

describe("BinaryConverterVue", () => {
  test("renders the component correctly", async () => {
    const wrapper = await mountSuspended(BinaryConverterVue);
    expect(wrapper.exists()).toBe(true);
  });

  test("updates the binaryInput correctly", async () => {
    const INPUT_BINARY = "1010";
    const INPUT_SELECTOR = "[data-test='input']";

    const wrapper = await mountSuspended(BinaryConverterVue);

    const input = wrapper.find(INPUT_SELECTOR);

    await input.setValue(INPUT_BINARY);

    expect((<HTMLInputElement>input.element).value).toBe(INPUT_BINARY);
  });

  test("calculates decimalOutput correctly", async () => {
    const INPUT_BINARY = "1010";
    const OUTPUT_DECIMAL = `${convertBinary(INPUT_BINARY)}`;
    const INPUT_SELECTOR = "[data-test='input']";
    const OUTPUT_SELECTOR = "[data-test='output']";

    const wrapper = await mountSuspended(BinaryConverterVue);

    const input = wrapper.find(INPUT_SELECTOR);
    const output = wrapper.find(OUTPUT_SELECTOR);

    await input.setValue(INPUT_BINARY);

    expect((<HTMLInputElement>output.element).innerText).toBe(OUTPUT_DECIMAL);
  });

  test("handles invalid characters", async () => {
    const INPUT_BINARY = "ab";
    const OUTPUT_DECIMAL = "NaN";
    const INPUT_SELECTOR = "[data-test='input']";
    const OUTPUT_SELECTOR = "[data-test='output']";

    const wrapper = await mountSuspended(BinaryConverterVue);

    const input = wrapper.find(INPUT_SELECTOR);
    const output = wrapper.find(OUTPUT_SELECTOR);

    await input.setValue(INPUT_BINARY);

    expect((<HTMLInputElement>output.element).innerText).toBe(OUTPUT_DECIMAL);

    // TODO: check for error message
  });

  test("handles too many characters", async () => {
    const INPUT_BINARY = "1010101010";
    const OUTPUT_DECIMAL = "";
    const INPUT_SELECTOR = "[data-test='input']";
    const OUTPUT_SELECTOR = "[data-test='output']";

    const wrapper = await mountSuspended(BinaryConverterVue);

    const input = wrapper.find(INPUT_SELECTOR);
    const output = wrapper.find(OUTPUT_SELECTOR);

    await input.setValue(INPUT_BINARY);

    expect((<HTMLInputElement>output.element).innerText).toBe(OUTPUT_DECIMAL);

    // TODO: check for error message
  });
});
