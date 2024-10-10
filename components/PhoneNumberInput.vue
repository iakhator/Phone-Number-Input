<template>
  <div>
    <input
      type="tel"
      :value="phoneNumber"
      :placeholder="placeholder"
      @input="onInput"
      @keypress="validateInput"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed} from 'vue';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{(e: 'update:modelValue', value: string): void}>();

const phoneNumber = ref<string>(props.modelValue || "");


const locale = computed(() =>  { 
  if (typeof window === 'undefined') return;
  return navigator.language || 'en-US'

}); 
const placeholder = computed(() => {
    return locale.value === 'en-US' ? '+1 (123) 456-7890' : 'Phone number';
});


// Function to format US phone numbers
function formatUSPhoneNumber (value)  {
  let digits = value.replace(/\D/g, "");
  let formatted = "+1 ";

  if (digits.length > 1) {
    formatted += "(" + digits.substring(0, 3);
  }

  if (digits.length > 4) {
    formatted += ") " + digits.substring(3, 6);
  }

  if (digits.length > 7) {
    formatted += "-" + digits.substring(6, 11);
  }

  return formatted;
};

// Handle input and emit the change
function onInput (event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  phoneNumber.value = locale.value === "en-US" ?  formatUSPhoneNumber(value) : value;

  emit('update:modelValue', phoneNumber.value);
};

function validateInput(event: KeyboardEvent): void {
  // Define a regex to allow digits, spaces, (, ), -, and +
  const regex = /[0-9\s\(\)\-\+]/;
  const key = event.key;

  if (!regex.test(key)) {
    event.preventDefault();
  }
}
</script>

<style scoped>
input {
  width: 10%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
