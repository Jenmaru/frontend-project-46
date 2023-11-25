import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { parse } from './parsers.js';
import formate from './formatters/index.js';
import buildTree from './getBuildTree.js';

const makeData = (pathFile) => {
  const data = fs.readFileSync(path.resolve(pathFile), 'utf-8');
  const type = _.trim(path.extname(pathFile), '.');

  return { data, type };
};

const genDiff = (file1, file2, format) => {
  const file1Data = makeData(file1);
  const file2Data = makeData(file2);
  const parseFile1 = parse(file1Data.type, file1Data.data);
  const parseFile2 = parse(file2Data.type, file2Data.data);
  const diffTree = buildTree(parseFile1, parseFile2);
  const textScreen = formate(diffTree, format);
  return textScreen;
};

export default genDiff;
