// eslint-disable-next-line import/extensions
import plain from './plain.js';
// eslint-disable-next-line import/extensions
import getScreenFormat from './stylish.js';

const toScreen = (tree, format) => {
  switch (format) {
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      return getScreenFormat(tree);
  }
};

export default toScreen;
