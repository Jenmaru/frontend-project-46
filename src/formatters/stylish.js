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

const getCleanString = (dirtResult) => {
  const cleanResultIndex = dirtResult.indexOf('},{');
  if (dirtResult.indexOf('},{') === -1) {
    return `{\n${dirtResult.substring(0, cleanResultIndex - 5)}${dirtResult.substring(cleanResultIndex + 3, dirtResult.length)}`;
  }
  return getCleanString(`${dirtResult.substring(0, cleanResultIndex - 5)}${dirtResult.substring(cleanResultIndex + 3, dirtResult.length)}`);
};

const buildTreeFormat = (tree, level = 0) => {
  const result = tree.flatMap((node) => {
    switch (node.state) {
      case 'added':
        return `  ${getIndent(level)}+ ${node.key}: ${stringify(node.value, level)}`;
      case 'unchanged':
        return `    ${getIndent(level)}${node.key}: ${stringify(node.value, level)}`;
      case 'changed':
        return [
          `  ${getIndent(level)}- ${node.key}: ${stringify(node.firstValue, level)}`,
          `  ${getIndent(level)}+ ${node.key}: ${stringify(node.secondValue, level)}`,
        ];
      case 'deleted':
        return `  ${getIndent(level)}- ${node.key}: ${stringify(node.value, level)}`;
      case 'merge':
        return `${getIndent(level + 1)}${node.key}: {\n${buildTreeFormat(node.children, level + 1)}\n${getIndent(level + 1)}}`;
      default:
        throw new Error(`Unknown node status! ${node.state} is wrong!`);
    }
  });
  return result.join('\n');
};

export default (tree) => getCleanString(`{\n${buildTreeFormat(tree)}\n}`);
