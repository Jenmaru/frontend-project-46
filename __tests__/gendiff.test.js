import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const extention = ['json', 'yml'];

describe('gendiff', () => {
  const recurciveResult = fs.readFileSync(path.resolve('./__tests__/fixtures/result.diff'), 'utf8');
  const plainResult = fs.readFileSync(path.resolve('./__tests__/fixtures/plain.diff'), 'utf8');
  const jsonResult = fs.readFileSync(path.resolve('./__tests__/fixtures/json.diff'), 'utf8');

  describe.each(extention)('compare two %s files', (ext) => {
    const before = path.resolve(`./__tests__/fixtures/before.${ext}`);
    const after = path.resolve(`./__tests__/fixtures/after.${ext}`);

    test('stylish', () => {
      expect(genDiff(before, after, 'getScreenFormat')).toEqual(recurciveResult);
    });

    test('plain', () => {
      expect(genDiff(before, after, 'plain')).toEqual(plainResult);
    });

    test('tree', () => {
      expect(genDiff(before, after, 'json')).toEqual(jsonResult);
    });
  });
});