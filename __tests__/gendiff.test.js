import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const extention = ['json', 'yml', 'ini'];
const format = { format: 'getScreenFormat' };

describe('gendiff', () => {
  const recurciveResult = fs.readFileSync(path.resolve('./__tests__/fixtures/result'), 'utf8');
  const plainResult = fs.readFileSync(path.resolve('./__tests__/fixtures/plain'), 'utf8');
  const jsonResult = fs.readFileSync(path.resolve('./__tests__/fixtures/json'), 'utf8');

    const before = path.resolve(`./__tests__/fixtures/before.json`);
    const after = path.resolve(`./__tests__/fixtures/after.json`);

    test('stylish', () => {
      expect(genDiff(before, after, format)).toEqual(recurciveResult);
    });

    test('plain', () => {
      expect(genDiff(before, after, { format: 'plain'})).toEqual(plainResult);
    });

    test('tree', () => {
      expect(genDiff(before, after, { format: 'json'})).toEqual(jsonResult);
    });
  });