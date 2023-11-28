import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (Number.isNaN(Number(value))) {
    return `'${value}'`;
  }

  return value;
};

const plain = (tree) => {
  const iter = (node, path) => {
    const result = node
      .map((element) => {
        const newProperty = _.trim(`${path}.${element.key}`, '.');
        switch (element.differenceType) {
          case 'unchanged':
            return null;
          case 'changed':
            return `Property '${newProperty}' was updated. From ${stringify(element.value1)} to ${stringify(element.value2)}`;
          case 'added':
            return `Property '${newProperty}' was added with value: ${stringify(element.value)}`;
          case 'deleted':
            return `Property '${newProperty}' was removed`;
          case 'nested':
            return iter(element.children, newProperty);
          default:
            throw new Error(`Unknown node status! ${node.differenceType} is wrong!`);
        }
      });
    return result.filter((element) => element !== null).join('\n');
  };
  return iter(tree, '');
};

export default plain;
