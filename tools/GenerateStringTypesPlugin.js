const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const _ = require('lodash');

function flattenKeys(data, parentPath = []) {
  const keys = [];

  _.keys(data).forEach(key => {
    const value = data[key];
    const newPath = [...parentPath, key];

    if (Array.isArray(value)) {
      throw new TypeError(`Array is not supported in strings.yaml\nPath: "${newPath.join('.')}"`);
    }

    if (_.isPlainObject(data[key])) {
      keys.push(...flattenKeys(data[key], [...parentPath, key]));
    } else {
      keys.push([...parentPath, key].join('.'));
    }
  });

  keys.sort();

  return keys;
}

function template(content) {
  return `/**
* This file is auto-generated. Please do not modify this file manually.
* Use the command \`yarn strings\` to regenerate this file.
*/
export interface StringsMap {
    ${content}
}`;
}

async function generateStringTypes({ input, output, context }) {
  const content = await fs.promises.readFile(path.resolve(context, input), 'utf8');
  const parsedData = yaml.parse(content);

  const keys = flattenKeys(parsedData)
    .map(key => `${key}: string;`)
    .join('\n');

  return fs.promises.writeFile(path.resolve(context, output), template(keys), 'utf8');
}

class GenerateStringTypesPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const { input, output } = this.options;

    compiler.hooks.emit.tapAsync('GenerateStringTypesPlugin', (compilation, callback) => {
      try {
        generateStringTypes({ input, output, context: compiler.context }).then(
          () => callback(),
          e => callback(e)
        );
      } catch (e) {
        callback(e);
      }
    });
  }
}

module.exports.GenerateStringTypesPlugin = GenerateStringTypesPlugin;
