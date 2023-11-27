import _ from 'lodash';

const getIndent = (level) => '    '.repeat(level);

const stringify = (value, level) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `{\n${getIndent(level + 2)}${key}: ${stringify(value[key], level + 1)}\n${getIndent(level + 1)}}`);
  return result;
};

const buildTreeFormat = (tree, level = 0) => {
  const result = tree.flatMap((node) => {
    switch (node.differenceType) {
      case 'added':
        return `  ${getIndent(level)}+ ${node.key}: ${stringify(node.value, level)}`;
      case 'unchanged':
        return `    ${getIndent(level)}${node.key}: ${stringify(node.value, level)}`;
      case 'changed':
        return [
          `  ${getIndent(level)}- ${node.key}: ${stringify(node.value1, level)}`,
          `  ${getIndent(level)}+ ${node.key}: ${stringify(node.value2, level)}`,
        ];
      case 'deleted':
        return `  ${getIndent(level)}- ${node.key}: ${stringify(node.value, level)}`;
      case 'nested':
        return `${getIndent(level + 1)}${node.key}: {\n${buildTreeFormat(node.children, level + 1)}\n${getIndent(level + 1)}}`;
      default:
        throw new Error(`Unknown node status! ${node.differenceType} is wrong!`);
    }
  });
  return result.map((key) => key.replace('},{\n    ', '')).join('\n');
};

export default (tree) => (`{\n${buildTreeFormat(tree)}\n}`);
