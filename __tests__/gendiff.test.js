import path from 'path';
import fs from 'fs';
// eslint-disable-next-line import/extensions
import genDiff from '../src/index.js';

const extention = ['json', 'yml', 'yaml'];

// eslint-disable-next-line no-undef
describe('gendiff', () => {
  const recurciveResult = fs.readFileSync(path.resolve('./__tests__/fixtures/result.diff'), 'utf8');
  const plainResult = fs.readFileSync(path.resolve('./__tests__/fixtures/plain.diff'), 'utf8');
  const jsonResult = fs.readFileSync(path.resolve('./__tests__/fixtures/json.diff'), 'utf8');

  // eslint-disable-next-line no-undef
  describe.each(extention)('compare two %s files', (ext) => {
    const file1 = path.resolve(`./__tests__/fixtures/file1.${ext}`);
    const file2 = path.resolve(`./__tests__/fixtures/file2.${ext}`);

    // eslint-disable-next-line no-undef
    test('stylish', () => {
      // eslint-disable-next-line no-undef
      expect(genDiff(file1, file2, 'getScreenFormat')).toEqual(recurciveResult);
    });

    // eslint-disable-next-line no-undef
    test('plain', () => {
      // eslint-disable-next-line no-undef
      expect(genDiff(file1, file2, 'plain')).toEqual(plainResult);
    });

    // eslint-disable-next-line no-undef
    test('tree', () => {
      // eslint-disable-next-line no-undef
      expect(genDiff(file1, file2, 'json')).toEqual(jsonResult);
    });
  });
});
