import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { parse } from './parsers.js';
import formate from './formatters/index.js';
import buildTree from './getBuildTree.js';

const getParseFile = (pathFile) => {
  const data = fs.readFileSync(path.resolve(pathFile), 'utf-8');
  const type = _.trim(path.extname(pathFile), '.');
  const parseFile = parse(type, data);
  return parseFile;
};

const genDiff = (file1, file2, format) => {
  const parseFile1 = getParseFile(file1);
  const parseFile2 = getParseFile(file2);
  const diffTree = buildTree(parseFile1, parseFile2);
  const textScreen = formate(diffTree, format);
  return textScreen;
};

export default genDiff;
