<script setup lang="ts">
import type { FormError } from "#ui/types";

interface State {
  binaryInput: string;
}

const state = reactive<State>({
  binaryInput: "",
});

const decimalOutput = computed(() => {
  if (!state.binaryInput) return;
  if (state.binaryInput.length > BINARY_MAX_LENGTH) return;

  return convertBinary(state.binaryInput);
});

const validateForm = (state: State): FormError[] => {
  const errors = [];

  if (state.binaryInput && !BINARY_REGEX.test(state.binaryInput))
    errors.push({
      path: "binaryInput",
      message: "Input binary should only contain 0 and 1.",
    });

  if (state.binaryInput.length > BINARY_MAX_LENGTH)
    errors.push({
      path: "binaryInput",
      message: `Input binary should have be fewer than ${BINARY_MAX_LENGTH} characters.`,
    });

  return errors;
};
</script>

<template>
  <UCard class="mx-auto w-96">
    <template #header>
      <UForm :validate="validateForm" :state="state" class="space-y-4">
        <UFormGroup label="Binary" name="binaryInput">
          <UInput v-model="state.binaryInput" data-test="input" />
        </UFormGroup>
      </UForm>
    </template>

    <div class="space-y-2">
      <p class="m-0 block text-sm font-medium text-gray-700 dark:text-gray-200">
        <span class="font-bold">Decimal:&nbsp;</span>
        <span data-test="output">{{ decimalOutput }}</span>
      </p>
    </div>
  </UCard>
</template>
