import { shallowMount } from '@vue/test-utils';
import VEmbed from '../src/VEmbed.vue';

describe('VEmbed', () => {
  test('mounts properly', () => {
    const wrapper = shallowMount(VEmbed);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = shallowMount(VEmbed);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
