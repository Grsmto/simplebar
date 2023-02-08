import { isVue3 } from 'vue-demi';
import { lifecycleEventNames } from '../utils';

export const vtu = isVue3
  ? require('@vue/test-utils')
  : require('@vue/test-utils-vue2');

const { config } = vtu;

if (isVue3) {
  config.global.renderStubDefaultSlot = true;
}

export function destroyWrapper(wrapper: any) {
  if (wrapper) wrapper[lifecycleEventNames.unmount]();
}

export const { shallowMount } = vtu;
