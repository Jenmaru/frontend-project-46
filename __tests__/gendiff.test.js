import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'node:url';
import genDiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const extention = ['json', 'yaml'];
const diffFormat = ['stylish', 'plain', 'json'];

describe('gendiff', () => {
  const stylishResult = fs.readFileSync(path.resolve(getFixturePath('result.txt')), 'utf8');
  const plainResult = fs.readFileSync(path.resolve(getFixturePath('plain.txt')), 'utf8');
  const jsonResult = fs.readFileSync(path.resolve(getFixturePath('json.txt')), 'utf8');
  const results = [stylishResult, plainResult, jsonResult];

  describe.each(extention)('compare two %s files', (ext) => {
    const file1 = path.resolve(getFixturePath(`file1.${ext}`));
    const file2 = path.resolve(getFixturePath(`file2.${ext}`));
    test('default', () => {
      expect(genDiff(file1, file2)).toEqual(stylishResult);
    });
    test.each(diffFormat)('format', (format) => {
      expect(genDiff(file1, file2, format)).toEqual(results[diffFormat.indexOf(format)].trimEnd());
    });
  });
});
