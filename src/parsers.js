import yaml from 'js-yaml';
import _ from 'lodash';

export const parse = (type, data) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown data type! ${type} is not supported!`);
  }
};

export default parse;