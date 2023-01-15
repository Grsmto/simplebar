import { isVue3 } from 'vue-demi';

export const lifecycleEventNames = {
  beforeUnmount: isVue3 ? 'beforeUnmount' : 'beforeDestroy',
  unmount: isVue3 ? 'unmount' : 'destroy',
};
