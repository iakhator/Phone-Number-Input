import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import PhoneNumberInput from '../components/PhoneNumberInput.vue';

describe('PhoneNumberInput', () => {
  it('renders the input with correct placeholder for en-US local', async () => {
    Object.defineProperty(window.navigator, 'language', { value: 'en-US', writable: true });
    const wrapper = mount(PhoneNumberInput, {
      props: { modelValue: '' }
    });

    const input = wrapper.find('input');
    
    expect(input.attributes('placeholder')).toBe('+1 (123) 456-7890');
  });

  it('renders input with correct placeholder for non-en-US locale', () => {
    Object.defineProperty(window.navigator, 'language', { value: 'fr-FR', writable: true });
    const wrapper = mount(PhoneNumberInput, {
      props: { modelValue: '' }
    });
    const input = wrapper.find('input');
    expect(input.element.placeholder).toBe('Phone number');
  });

  it('formats the phone number correctly on valid en-US locale input', async () => {
    Object.defineProperty(window.navigator, 'language', { value: 'en-US', writable: true });
    const wrapper = mount(PhoneNumberInput, {
      props: { modelValue: '' }
    });

    const input = wrapper.find('input');

    await input.setValue('3234567890');
    
    expect(wrapper.vm.phoneNumber).toBe('+1 (323) 456-7890');
  });

  it('formats the phone number correctly on valid non en-US locale input', async () => {
    Object.defineProperty(window.navigator, 'language', { value: 'fr-FR', writable: true });
    const wrapper = mount(PhoneNumberInput, {
      props: { modelValue: '' }
    });

    const input = wrapper.find('input');

    await input.setValue('3234567890');
    
    expect(wrapper.vm.phoneNumber).toBe('3234567890');
  });

  it('prevents typing invalid characters', async () => {
    const wrapper = mount(PhoneNumberInput, {
      props: { modelValue: '' }
    });

    const input = wrapper.find('input');

    await input.trigger('keypress', { key: 'a' });
    
    // The value should not change after typing an invalid character
    expect(input.element.value).toBe('');
  });

  it('emits update:modelValue when the input changes', async () => {
    const wrapper = mount(PhoneNumberInput, {
      props: { modelValue: '' }
    });

    const input = wrapper.find('input');

    await input.setValue('1234567890');
    
    // Check that the component emitted the correct value
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1234567890']);
  });
});
