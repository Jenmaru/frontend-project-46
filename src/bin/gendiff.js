#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../index.js'

const options = program.opts();

program
    .name('gendiff')
    .arguments('<filepath1> <filepath2>')
    .description('Compare two configuration files and shows a difference')
    .version('1.1.0')
    .option('-f, --format [type]', 'output format [getScreenFormat, plain, json]', 'getScreenFormat')
    .action((filepath1, filepath2) => {
        console.log(genDiff(filepath1, filepath2, options));
        console.log(options);
    })
    .parse(process.argv);