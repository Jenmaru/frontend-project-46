import _ from 'lodash';

const getTab = (level) => '  '.repeat(level);

const getObjectToString = (item, level) => {
    level += 2;
    if (!_.isObject(item)) {
      return item;
    }
    const keys = Object.entries(item);
    const result = keys.map(([key, value]) => {
    return `{\n    ${getTab(level)}${key}: ${getObjectToString(value, level)}\n${getTab(level)}}`;
});
    return result;
};

const getScreenFormat = (tree) => {
    const result = tree.flatMap((node) => {
        switch (node.state) {
          case 'unchanged':
            return `    ${getTab(node.level)}${node.key}: ${getObjectToString(node.value, node.level)}`;
          case 'added':
            return `  ${getTab(node.level)}+ ${node.key}: ${getObjectToString(node.value, node.level)}`;
          case 'deleted':
            return `  ${getTab(node.level)}- ${node.key}: ${getObjectToString(node.value, node.level)}`;
          case 'changed':
            return [
              `  ${getTab(node.level)}- ${node.key}: ${getObjectToString(node.oldValue, node.level)}`,
              `  ${getTab(node.level)}+ ${node.key}: ${getObjectToString(node.newValue, node.level)}`,
            ];
          case 'merge':
            return `  ${getTab(node.level)}${node.key}: {\n${getScreenFormat(node.children, node.level)}\n${getTab(node.level)}}`;
          default:
            throw new Error(`Unknown node status! ${node.state} is wrong!`);
        }
      });
      const dirtResult = String(result.join('\n'));
      const getCleanString = (dirtResult) => {
        const cleanResult = dirtResult.indexOf('},{');
        if (dirtResult.indexOf('},{') === -1) {
          return `${dirtResult.substring(0, cleanResult - 7)}${dirtResult.substring(cleanResult +3, dirtResult.length)}`;
        }
        return getCleanString(`${dirtResult.substring(0, cleanResult - 7)}${dirtResult.substring(cleanResult +3, dirtResult.length)}`)
      }
      return getCleanString(dirtResult); 
}

  export default (tree) => `{\n${getScreenFormat(tree)}\n}`;