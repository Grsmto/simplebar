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

  it('can access SimpleBar instance', () => {
    const wrapper = shallowMount(simplebar);

    expect(wrapper.vm.SimpleBar).toBeDefined();
  });

  it('can access getScrollElement method', () => {
    const wrapper = shallowMount(simplebar);
    const scrollElement = wrapper.vm.getScrollElement();

    expect(scrollElement).toEqual(
      wrapper.find('.simplebar-content-wrapper').element
    );
  });

  it('can access getContentElement method', () => {
    const wrapper = shallowMount(simplebar);
    const scrollElement = wrapper.vm.getContentElement();

    expect(scrollElement).toEqual(wrapper.find('.simplebar-content').element);
  });

  it('can access recalculate method', () => {
    const wrapper = shallowMount(simplebar);

    const recalculateMock = jest.fn();
    wrapper.vm.SimpleBar.recalculate = recalculateMock;
    wrapper.vm.recalculate();

    expect(recalculateMock).toBeCalled();
  });

  it('works with options as attribute', () => {
    const wrapper = shallowMount(simplebar, {
      propsData: { 'data-simplebar-auto-hide': 'false' }
    });
    expect(wrapper.vm.SimpleBar.options.autoHide).toEqual(false);
  });

  it('works with options as prop', () => {
    const wrapper = shallowMount(simplebar, {
      propsData: {
        options: {
          autoHide: false
        }
      }
    });
    expect(wrapper.vm.SimpleBar.options.autoHide).toEqual(false);
  });
});
