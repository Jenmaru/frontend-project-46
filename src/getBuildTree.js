import _ from 'lodash';

const buildTree = (firstFile, secondFile) => {
  const fileKeys = _.union(_.keys(firstFile), _.keys(secondFile));
  const mapKeys = fileKeys.map((key) => {
    const firstValue = firstFile[key];
    const secondValue = secondFile[key];
    if (!_.has(secondFile, key)) {
      return { key, status: 'absent', value: firstValue };
    }
    if (!_.has(firstFile, key)) {
      return { key, status: 'present', value: secondValue };
    }
    if (firstValue === secondValue) {
      return { key, status: 'unchanged', value: firstValue };
    }
    if (_.isObject(firstValue) && _.isObject(secondValue)) {
      return { key, status: 'merge', children: buildTree(firstValue, secondValue) };
    }
    const nested = {
      key, status: 'changed', secondValue, firstValue,
    };
    return nested;
  });
  const sortMap = _.sortBy(mapKeys, 'key');
  return sortMap;
};

export default buildTree;
