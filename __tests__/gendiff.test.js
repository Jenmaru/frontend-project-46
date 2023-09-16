import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const extention = ['json'];

describe('gendiff', () => {
  const recursiveResult = fs.readFileSync(path.resolve('./__tests__/fixtures/result'), 'utf8');
  const plainResult = fs.readFileSync(path.resolve('./__tests__/fixtures/plain'), 'utf8');
  const jsonResult = fs.readFileSync(path.resolve('./__tests__/fixtures/json'), 'utf8');

  describe.each(extention)('compare two %s files', (ext) => {
    const before = path.resolve(`./__tests__/fixtures/before.json`);
    const after = path.resolve(`./__tests__/fixtures/after.json`);
    const expected = genDiff(after, before);

    test('stylish', () => {
      expect(expected).toEqual(recursiveResult);
    });
  });
});