import plain from './plain.js';
import stylish from './stylish.js';

const formate = (tree, format) => {
  switch (format) {
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      return `{\n${stylish(tree)}\n}`;
  }
};

export default formate;
