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
      .filter((newNode) => newNode.status !== 'unchanged')
      .map((element) => {
        const newProperty = _.trim(`${path}.${element.key}`, '.');
        switch (element.status) {
          case 'changed':
            return `Property '${newProperty}' was updated. From ${stringify(element.firstValue)} to ${stringify(element.secondValue)}`;
          case 'present':
            return `Property '${newProperty}' was added with value: ${stringify(element.value)}`;
          case 'absent':
            return `Property '${newProperty}' was removed`;
          case 'merge':
            return iter(element.children, newProperty);
          default:
            throw new Error(`Unknown node status! ${node.status} is wrong!`);
        }
      });
    return result.join('\n');
  };
  return iter(tree, '');
};

export default plain;
