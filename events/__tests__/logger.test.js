'use strict';

require('../logger');
const hub = require('../hub');

describe('Logger testing', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log');
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('On saved', () => {
    it('logs and emits the new payload', () => {
      // Arrange
      let file = 'hub.js';

      // Act
      hub.emit('saved', file);

      // Assert
      expect(console.log).toHaveBeenCalledWith(`${file} was saved!`);
    });
  });
});
