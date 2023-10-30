import _ from 'lodash';

const checkValue = (value) => {

  if (_.isObject(value)) {
    return '[complex value]';
  }
  let str = `'${value}'`
  if (str.length === 2) {
    return str;
  }
  if (Number.isNaN(Number(value))) {
    return `'${value}'`;
  }
  
  return value;
};

const plain = (tree) => {
  const iter = (node, path) => {
    const result = node
      .filter((newNode) => newNode.state !== 'unchanged')
      .map((element) => {
        const newProperty = _.trim(`${path}.${element.key}`, '.');
        switch (element.state) {
          case 'changed':
            return `Property '${newProperty}' was updated. From ${checkValue(element.oldValue)} to ${checkValue(element.newValue)}`;
          case 'added':
            return `Property '${newProperty}' was added with value: ${checkValue(element.value)}`;
          case 'deleted':
            return `Property '${newProperty}' was removed`;
          case 'merge':
            return iter(element.children, newProperty);
          default:
            throw new Error(`Unknown node status! ${node.state} is wrong!`);
        }
      });
    return result.join('\n');
  };
  return iter(tree, '');
};


export default plain;