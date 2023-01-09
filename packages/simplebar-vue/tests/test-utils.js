const { isVue3 } = require('vue-demi');
const { lifecycleEventNames } = require('../utils.js');

const vtu = isVue3
  ? require('@vue/test-utils')
  : require('@vue/test-utils-vue2');

const { config } = vtu;

if (isVue3) {
  config.global.renderStubDefaultSlot = true;
}

module.exports = vtu;

module.exports.destroyWrapper = function destroyWrapper(wrapper) {
  if (wrapper) wrapper[lifecycleEventNames.unmount]();
};

module.exports.isVue3 = !!isVue3;
