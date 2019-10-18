const { describe, it } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');

describe('app', () => {
  it('should render the test page', async test => {
    const { remote } = test;
    // Load the page
    await remote.get('demo/examples.html');
  });
});
