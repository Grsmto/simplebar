import { shallowMount, destroyWrapper, isVue3 } from './test-utils';
import simplebar from '../index.vue';
import SimpleBar from 'simplebar';

describe('simplebar', () => {
  describe('snapshots', () => {
    /**
     * jest-serializer-vue is not compatible with vue3 yet, so you
     * cannot pass the wrapper object directly. Call .html() before
     * @see {@link https://github.com/eddyerburgh/jest-serializer-vue/pull/56}
     */
    it('renders without crashing', () => {
      const wrapper = shallowMount(simplebar);
      expect(wrapper.html()).toMatchSnapshot();

      destroyWrapper(wrapper);
    });

    it('renders with options', () => {
      const wrapper = shallowMount(simplebar, {
        attrs: { 'data-simplebar-auto-hide': 'false' }
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders with default slot', () => {
      const wrapper = shallowMount(simplebar, {
        slots: {
          default: '<div class="inner-content" />'
        }
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  it('can access SimpleBar instance', () => {
    const wrapper = shallowMount(simplebar);
    expect(wrapper.vm.SimpleBar).toBeInstanceOf(SimpleBar);
  });

  it('can access root element ref property', () => {
    const wrapper = shallowMount(simplebar);
    expect(wrapper.element).toEqual(wrapper.vm.$refs.element);
  });

  it('can access scrollElement property', () => {
    const wrapper = shallowMount(simplebar);
    const scrollElement = wrapper.vm.scrollElement;

    expect(scrollElement).toEqual(
      wrapper.find('.simplebar-content-wrapper').element
    );
  });

  it('can access contentElement property', () => {
    const wrapper = shallowMount(simplebar);
    const scrollElement = wrapper.vm.contentElement;

    expect(scrollElement).toEqual(wrapper.find('.simplebar-content').element);
  });

  it('works with options as  data attributes', () => {
    const wrapper = shallowMount(simplebar, {
      attrs: { 'data-simplebar-auto-hide': 'false' }
    });
    expect(wrapper.vm.SimpleBar.options.autoHide).toEqual(false);
  });

  it('works with options as props', () => {
    const wrapper = shallowMount(simplebar, {
      [isVue3 ? 'props' : 'propsData']: { autoHide: false }
    });
    expect(wrapper.vm.SimpleBar.options.autoHide).toEqual(false);
  });
});
