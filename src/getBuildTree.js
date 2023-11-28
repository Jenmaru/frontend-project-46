import _ from 'lodash';

const buildTree = (file1, file2) => {
  const fileKeys = _.union(_.keys(file1), _.keys(file2));
  const mapKeys = fileKeys.map((key) => {
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      const nested = { key, differenceType: 'nested', children: buildTree(file1[key], file2[key]) };
      return nested;
    }
    if (!_.has(file2, key)) {
      return { key, differenceType: 'deleted', value: file1[key] };
    }
    if (!_.has(file1, key)) {
      return { key, differenceType: 'added', value: file2[key] };
    }
    if (_.isEqual(file1[key], file2[key])) {
      return { key, differenceType: 'unchanged', value: file1[key] };
    }
    const value1 = file1[key];
    const value2 = file2[key];
    return {
      key, differenceType: 'changed', value2, value1,
    };
  });
  const sortMap = _.sortBy(mapKeys, 'key');
  return sortMap;
};

export default buildTree;
