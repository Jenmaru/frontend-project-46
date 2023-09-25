import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const extention = ['json'];

describe('gendiff', () => {
  const recursiveResult = fs.readFileSync(path.resolve('./__tests__/fixtures/result'), 'utf8');

    const before = path.resolve(`./__tests__/fixtures/before.json`);
    const after = path.resolve(`./__tests__/fixtures/after.json`);
    const expected = genDiff(after, before, 'stylish');

    test('stylish', () => {
      expect(expected).toEqual(recursiveResult);
    });
  });