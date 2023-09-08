"use strict";
var _a, _b;
const fs = require('fs');
const { red, green, bold, yellow } = require('chalk');
if (process.argv.slice(2).indexOf('--help') > -1 || process.argv.slice(2).indexOf('-h') > -1) {
    console.log(`Usage: npx @dsabre/generate-vue-cli [flags]

Generate a Vue component.

Flags:
    --dir        (required)   The directory where the component will be generated.
    --name       (required)   The name of the component.
    --prefix     (optional)   Prefix to prepend to component name.
    --suffix     (optional)   Suffix to append to component name.
    --template   (optional)   The template path to use.

    -h, --help   Display this help message and exit.

Example:
    npx @dsabre/generate-vue-cli --dir="src/components" --name="HelloWorld" --prefix="Prefix" --suffix="Suffix"`);
    process.exit();
}
const getArgs = () => {
    const args = process.argv.slice(2);
    const ret = {
        dir: '',
        name: ''
    };
    args.forEach((arg) => {
        const argInfo = arg.split('=');
        const k = argInfo[0].split('--').join('').trim();
        const v = argInfo[1].trim();
        ret[k] = v;
    });
    return ret;
};
const args = getArgs();
let hasErrors = false;
if (!args.dir) {
    console.log(red(`Directory param not provided (pass it with --dir=[...]).\n`));
    hasErrors = true;
}
if (!args.name) {
    console.log(red(`Component name param not provided (pass it with --name=[...]).\n`));
    hasErrors = true;
}
if (hasErrors) {
    process.exit(1);
}
if (!fs.existsSync(args.dir)) {
    fs.mkdirSync(args.dir, { recursive: true });
}
args.name = `${(_a = args.prefix) !== null && _a !== void 0 ? _a : ''}${args.name}${(_b = args.suffix) !== null && _b !== void 0 ? _b : ''}`;
const path = `${args.dir}/${args.name}.vue`;
const getTemplate = () => {
    if (args.template) {
        return fs.readFileSync(args.template).toString().split('[[COMPONENT_NAME]]').join(args.name);
    }
    return `<script setup>
const msg = '${args.name} component';
</script>

<template>
    <div>{{ msg }}</div>
</template>
`;
};
if (fs.existsSync(path)) {
    console.log(red(`Component ${bold(yellow(path))} already exists.\n`));
    process.exit(1);
}
fs.writeFileSync(path, getTemplate(), { flag: 'wx' });
console.log(green(`Component ${bold(yellow(path))} successfully created.\n`));
