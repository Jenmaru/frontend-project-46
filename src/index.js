import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const buildTree = (diffFile1, diffFile2) => {
    const differenceFiles = {};
    const fileKeys = _.union(_.keys(diffFile1), _.keys(diffFile2));
    fileKeys.map(key => {
        const oldValue = diffFile1[key];
        const newValue = diffFile2[key];
        if (!_.has(diffFile2, key)) {
            differenceFiles[`- ${key}`] = oldValue;
        }
        if (!_.has(diffFile1, key)) {
            differenceFiles[`+ ${key}`] = newValue;
        }
        if (_.has(diffFile1, key) && _.has(diffFile2, key)) {
            if (oldValue === newValue) {
                differenceFiles[`  ${key}`] = oldValue;
            } else {
                differenceFiles[`- ${key}`] = oldValue;
                differenceFiles[`+ ${key}`] = newValue;
            }
        }
    })
    return differenceFiles;
};

const makeFileData = (pathFile) => {
    const data = fs.readFileSync(path.resolve(pathFile), 'utf-8');
    const type = _.trim(path.extname(pathFile), '.');
  
    return { data, type };
  };

const genDiff = (file1, file2, format) => {
    const file1Data = makeFileData(file1);
    const file2Data = makeFileData(file2);
    const parseFile1 = JSON.parse(file1Data.data);
    const parseFile2 = JSON.parse(file2Data.data);
    const diffTree = buildTree(parseFile1, parseFile2);
    
  return diffTree;
};

export default genDiff;