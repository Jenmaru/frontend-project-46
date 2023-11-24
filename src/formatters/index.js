import plain from './plain.js';
import getScreenFormat from './stylish.js';

const formate = (tree, format) => {
  switch (format) {
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      return getScreenFormat(tree);
  }
};

export default formate;
