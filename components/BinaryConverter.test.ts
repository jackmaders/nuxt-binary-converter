// @vitest-environment nuxt
import type { FormError } from "#ui/types";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { setup } from "@nuxt/test-utils/e2e";
import { describe, expect, test } from "vitest";
import BinaryConverterVue from "./BinaryConverter.vue";

describe("BinaryConverterVue", async () => {
  await setup({
    build: true,
  });

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

  const binaryScenarios = [
    { binary: "0", decimal: 0 },
    { binary: "1", decimal: 1 },
    { binary: "10", decimal: 2 },
    { binary: "01", decimal: 1 },
    { binary: "11001", decimal: 25 },
    { binary: "11111111", decimal: 255 },
  ];

  test.each(binaryScenarios)(
    "convertBinary($binary) -> $decimal",
    async ({ binary, decimal }) => {
      const INPUT_SELECTOR = "[data-test='input']";
      const OUTPUT_SELECTOR = "[data-test='output']";

      const wrapper = await mountSuspended(BinaryConverterVue);

      const input = wrapper.find(INPUT_SELECTOR);
      const output = wrapper.find(OUTPUT_SELECTOR);

      await input.setValue(binary);

      expect((<HTMLInputElement>output.element).innerText).toBe(`${decimal}`);
    },
  );

  test("handles invalid characters", async () => {
    const INPUT_BINARY = "ab";
    const OUTPUT_DECIMAL = "";
    const INPUT_SELECTOR = "[data-test='input']";
    const OUTPUT_SELECTOR = "[data-test='output']";

    const wrapper = await mountSuspended(BinaryConverterVue);

    const input = wrapper.find(INPUT_SELECTOR);
    const output = wrapper.find(OUTPUT_SELECTOR);

    await input.setValue(INPUT_BINARY);

    const formErrors: FormError[] = (wrapper.vm as any).validateForm();
    const invalidBinaryError = formErrors.some((formError) => {
      return formError.message === ERROR_INVALID_BINARY;
    });

    expect((<HTMLInputElement>output.element).innerText).toBe(OUTPUT_DECIMAL);
    expect(invalidBinaryError).toBe(true);
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

    const formErrors: FormError[] = (wrapper.vm as any).validateForm();
    const invalidBinaryError = formErrors.some((formError) => {
      return formError.message === ERROR_BINARY_MAX_LENGTH;
    });

    expect((<HTMLInputElement>output.element).innerText).toBe(OUTPUT_DECIMAL);
    expect(invalidBinaryError).toBe(true);
  });
});
