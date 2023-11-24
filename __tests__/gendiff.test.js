import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const extention = ['json', 'yml'];
const diffFormat = ['stylish', 'plain', 'json'];

describe('gendiff', () => {
  const stylishResult = fs.readFileSync(path.resolve('./fixtures/result.diff'), 'utf8');
  const plainResult = fs.readFileSync(path.resolve('./fixtures/plain.diff'), 'utf8');
  const jsonResult = fs.readFileSync(path.resolve('./fixtures/json.diff'), 'utf8');
  const results = [stylishResult, plainResult, jsonResult];

  describe.each(extention)('compare two %s files', (ext) => {
    const file1 = path.resolve(`./fixtures/file1.${ext}`);
    const file2 = path.resolve(`./fixtures/file2.${ext}`);

    test.each(diffFormat)('format', (format) => {
      expect(genDiff(file1, file2, format)).toEqual(results[diffFormat.indexOf(format)].trimEnd());
    });
  });
});
