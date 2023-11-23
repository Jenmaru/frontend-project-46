import _ from 'lodash';

const tab = (level) => '    '.repeat(level);

const stringify = (value, level) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `{\n${tab(level + 2)}${key}: ${stringify(value[key], level + 1)}\n${tab(level + 1)}}`);
  return result;
};

const buildTreeFormat = (tree, level = 0) => {
  const result = tree.flatMap((node) => {
    switch (node.state) {
      case 'added':
        return `  ${tab(level)}+ ${node.key}: ${stringify(node.value, level)}`;
      case 'unchanged':
        return `    ${tab(level)}${node.key}: ${stringify(node.value, level)}`;
      case 'changed':
        return [
          `  ${tab(level)}- ${node.key}: ${stringify(node.oldValue, level)}`,
          `  ${tab(level)}+ ${node.key}: ${stringify(node.newValue, level)}`,
        ];
      case 'deleted':
        return `  ${tab(level)}- ${node.key}: ${stringify(node.value, level)}`;
      case 'merge':
        return `${tab(level + 1)}${node.key}: {\n${buildTreeFormat(node.children, level + 1)}\n${tab(level + 1)}}`;
      default:
        throw new Error(`Unknown node status! ${node.state} is wrong!`);
    }
  });
  return result.join('\n');
};

export default (tree) => `{\n${buildTreeFormat(tree)}\n}`;
