import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import toScreen from './formatters/index.js'

const buildTree = (diffFile1, diffFile2) => {
    const fileKeys = _.union(_.keys(diffFile1), _.keys(diffFile2));
    const mapKeys = fileKeys.map(key => {
        const oldValue = diffFile1[key];
        const newValue = diffFile2[key];
        if (!_.has(diffFile2, key)) {
            return {key, state: 'deleted', value: oldValue};
        }
        if (!_.has(diffFile1, key)) {
            return {key, state: 'added', value: newValue};
        }
        if (oldValue === newValue) {
            return {key, state: 'unchanged', value: oldValue};
        }
        if (_.isObject(oldValue) && _.isObject(newValue)) {
            return {key, state: 'merge', children: buildTree(oldValue, newValue)};
        }
        return {key, state: 'changed', newValue, oldValue};
    });
    return mapKeys;
};

const makeFileData = (pathFile) => {
    const data = fs.readFileSync(path.resolve(pathFile), 'utf-8');
    const type = _.trim(path.extname(pathFile), '.');
  
    return { data, type };
  };

const getCleanString = (dirtResult, format) => {
    if (format.format !== 'getScreenFormat') {
        return dirtResult;
    }
    const cleanResultIndex = dirtResult.indexOf('},{');
    if (dirtResult.indexOf('},{') === -1) {
      return `{\n${dirtResult.substring(0, cleanResultIndex - 7)}${dirtResult.substring(cleanResultIndex +3, dirtResult.length)}`;
    }
    return getCleanString(`${dirtResult.substring(0, cleanResultIndex - 7)}${dirtResult.substring(cleanResultIndex +3, dirtResult.length)}`);
  };

const genDiff = (file1, file2, format) => {
    const file1Data = makeFileData(file1);
    const file2Data = makeFileData(file2);
    const parseFile1 = parse(file1Data.type, file1Data.data);
    const parseFile2 = parse(file2Data.type, file2Data.data);
    const diffTree = buildTree(parseFile1, parseFile2);
    const textScreen = toScreen(diffTree, format);
    return textScreen;
};

export default genDiff;