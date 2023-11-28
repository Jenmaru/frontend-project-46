import _ from 'lodash';

const getIndent = (level) => '    '.repeat(level);

const stringify = (value, level) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object.keys(value)
    .map((key) => `  ${getIndent(level + 1)}  ${key}: ${stringify(value[key], level + 1)}`);
  return [
    '{',
    ...lines,
    `${getIndent(level + 1)}}`,
  ].join('\n');
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
  return result.join('\n');
};

export default buildTreeFormat;
