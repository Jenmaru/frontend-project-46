#!/usr/bin/env node

import { program } from 'commander';

program
    .name('gendiff') 
    .arguments('<filepath1> <filepath2>')
    .description('Compare two configuration files and shows a difference')
    .version('1.1.0')
    .option('-f, --format <type>', 'output format (default: "stylish")')

program.parse();