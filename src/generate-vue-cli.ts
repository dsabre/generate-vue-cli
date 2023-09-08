const fs = require('fs');
const {red, green, bold, yellow} = require('chalk');

interface IArgs {
    dir: string;
    name: string;
    template?: string;
    prefix?: string;
    suffix?: string;
}

// manage help
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
    const args: string[] = process.argv.slice(2);
    const ret: IArgs = {
        dir: '',
        name: ''
    };

    args.forEach((arg: string) => {
        const argInfo = arg.split('=');
        const k = argInfo[0].split('--').join('').trim() as keyof IArgs;
        const v = argInfo[1].trim();

        ret[k] = v;
    });

    return ret;
};

const args = getArgs();

// check if dir and name are provided
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

// create directory if not exists
if (!fs.existsSync(args.dir)) {
    fs.mkdirSync(args.dir, {recursive: true});
}

args.name = `${args.prefix ?? ''}${args.name}${args.suffix ?? ''}`;

const path = `${args.dir}/${args.name}.vue`;
const getTemplate = () => {
    // if template path is passed, than use it
    if (args.template) {
        return fs.readFileSync(args.template).toString().split('[[COMPONENT_NAME]]').join(args.name);
    }

    // return a default template
    return `<script setup>
const msg = '${args.name} component';
</script>

<template>
    <div>{{ msg }}</div>
</template>
`;
};

// check if file exists
if (fs.existsSync(path)) {
    console.log(red(`Component ${bold(yellow(path))} already exists.\n`));
    process.exit(1);
}

// create file component
fs.writeFileSync(path, getTemplate(), {flag: 'wx'});

console.log(green(`Component ${bold(yellow(path))} successfully created.\n`));
