import plain from './plain.js';
import getScreenFormat from './stylish.js';

const toScreen = (tree, format) => {
  switch (format) {
    case 'plain':
      return plain(tree).concat('\n');
    case 'json':
      return JSON.stringify(tree).concat('\n');
    default:
      return getScreenFormat(tree);
  }
};

export default toScreen;