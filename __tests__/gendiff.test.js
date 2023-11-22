import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const extention = ['json', 'yml', 'yaml'];

describe('gendiff', () => {
  const recurciveResult = fs.readFileSync(path.resolve('./__tests__/fixtures/result.diff'), 'utf8');
  const plainResult = fs.readFileSync(path.resolve('./__tests__/fixtures/plain.diff'), 'utf8');
  const jsonResult = fs.readFileSync(path.resolve('./__tests__/fixtures/json.diff'), 'utf8');

  describe.each(extention)('compare two %s files', (ext) => {
    const file1 = path.resolve(`./__tests__/fixtures/file1.${ext}`);
    const file2 = path.resolve(`./__tests__/fixtures/file2.${ext}`);

    test('stylish', () => {
      expect(genDiff(file1, file2, 'getScreenFormat')).toEqual(recurciveResult);
    });

    test('plain', () => {
      expect(genDiff(file1, file2, 'plain')).toEqual(plainResult);
    });

    test('tree', () => {
      expect(genDiff(file1, file2, 'json')).toEqual(jsonResult);
    });
  });
});