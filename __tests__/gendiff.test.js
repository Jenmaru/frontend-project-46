import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const file1 = path.resolve(`./file1.json`);
const file2 = path.resolve(`./file2.json`);
const result = genDiff(file1, file2);

    test('tree', () => {
      expect(genDiff(file1, file2, 'json')).toEqual(result);
    });