jest.mock('fs');

const writeFile = require('../writeFile');
const hub = require('../hub');
const fs = require('fs');
const promisify = require('../util/promisify');
const readFile = promisify(fs.readFile);

describe('writeFile', () => {
  beforeEach(() => {
    jest.spyOn(hub, 'emit');
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('writes to good file and emites saved', async () => {
    // Arrange
    let file = 'test file.txt';

    // Act
    await writeFile(file, 'testing!');

    // Assert
    expect(await readFile(file))
      .toEqual(Buffer.from('testing!'));
    expect(hub.emit)
      .toHaveBeenCalledWith('saved', file);
  });

  it('does not emit for bad file', async () => {
    // Arrange
    let file = 'bad file.txt';

    // Act
    try {
      await writeFile(file, 'testing!');
      throw 'Expected error!';
    }
    catch (err) {
      // Assert
      expect(err).toBe('Invalid File');
      expect(hub.emit)
        .not.toHaveBeenCalled();
    }
  });
});
