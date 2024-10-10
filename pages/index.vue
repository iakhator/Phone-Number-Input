<template>
  <div>
    <p>Demo Phone Number Input</p>
    <PhoneNumberInput v-model="phoneNumber" />
  </div>
</template>

<script lang="ts" setup>

import PhoneNumberInput from '~/components/PhoneNumberInput.vue'

const phoneNumber = ref<string>('')
</script>
