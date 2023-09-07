import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const myIniParse = (data) => {
  const parseFile = ini.parse(data);

  const normalize = (config) => {
    const configKeys = _.keys(config);
    const result = configKeys.reduce((acc, key) => {
      if (_.isObject(config[key])) {
        return { ...acc, [key]: normalize(config[key]) };
      }
      if (_.isBoolean(config[key])) {
        return { ...acc, [key]: config[key] };
      }
      if (Number.isNaN(Number(config[key]))) {
        return { ...acc, [key]: config[key] };
      }
      return { ...acc, [key]: Number(config[key]) };
    }, {});
    return result;
  };

  return normalize(parseFile);
};

export const parse = (type, data) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.safeLoad(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return myIniParse(data);
    default:
      throw new Error(`Unknown data type! ${type} is not supported!`);
  }
};

export default parse;