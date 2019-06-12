import { shallowMount } from '@vue/test-utils';
import simplebar from './index.vue';

describe('simplebar', () => {
  it('renders without crashing', () => {
    const wrapper = shallowMount(simplebar);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with options', () => {
    const wrapper = shallowMount(simplebar, {
      propsData: { 'data-simplebar-auto-hide': 'false' }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with default slot', () => {
    const wrapper = shallowMount(simplebar, {
      slots: {
        default: '<div class="inner-content" />'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
