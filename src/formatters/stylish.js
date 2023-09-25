import _ from 'lodash';

const tab = (level) => '    '.repeat(level);

const stringify = (value, lvl) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    console.log(key);
    return `{\n${tab(lvl + 2)}${key}: ${stringify(value[key])}\n${tab(lvl + 1)}}`;
  });
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