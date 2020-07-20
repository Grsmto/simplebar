// Helper function to retrieve options from element attributes
export const getOptions = function (obj) {
  const options = Array.prototype.reduce.call(
    obj,
    (acc, attribute) => {
      const option = attribute.name.match(/data-simplebar-(.+)/);
      if (option) {
        const key = option[1].replace(/\W+(.)/g, (x, chr) => chr.toUpperCase());
        switch (attribute.value) {
          case 'true':
            acc[key] = true;
            break;
          case 'false':
            acc[key] = false;
            break;
          case undefined:
            acc[key] = true;
            break;
          default:
            acc[key] = attribute.value;
        }
      }
      return acc;
    },
    {}
  );
  return options;
};
