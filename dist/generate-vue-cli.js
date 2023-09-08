#!/usr/bin/env node
"use strict";var _a,_b;const fs=require("fs"),{red,green,bold,yellow}=require("chalk");(process.argv.slice(2).indexOf("--help")>-1||process.argv.slice(2).indexOf("-h")>-1)&&(console.log(`Usage: npx @dsabre/generate-vue-cli [flags]

Generate a Vue component.

Flags:
    --dir        (required)   The directory where the component will be generated.
    --name       (required)   The name of the component.
    --prefix     (optional)   Prefix to prepend to component name.
    --suffix     (optional)   Suffix to append to component name.
    --template   (optional)   The template path to use.

    -h, --help   Display this help message and exit.

Example:
    npx @dsabre/generate-vue-cli --dir="src/components" --name="HelloWorld" --prefix="Prefix" --suffix="Suffix"`),process.exit());const getArgs=()=>{const n=process.argv.slice(2),e={dir:"",name:""};return n.forEach(o=>{const t=o.split("="),r=t[0].split("--").join("").trim(),s=t[1].trim();e[r]=s}),e},args=getArgs();let hasErrors=!1;args.dir||(console.log(red(`Directory param not provided (pass it with --dir=[...]).
`)),hasErrors=!0),args.name||(console.log(red(`Component name param not provided (pass it with --name=[...]).
`)),hasErrors=!0),hasErrors&&process.exit(1),fs.existsSync(args.dir)||fs.mkdirSync(args.dir,{recursive:!0}),args.name=`${(_a=args.prefix)!==null&&_a!==void 0?_a:""}${args.name}${(_b=args.suffix)!==null&&_b!==void 0?_b:""}`;const path=`${args.dir}/${args.name}.vue`,getTemplate=()=>args.template?fs.readFileSync(args.template).toString().split("[[COMPONENT_NAME]]").join(args.name):`<script setup>
const msg = '${args.name} component';
<\/script>

<template>
    <div>{{ msg }}</div>
</template>
`;fs.existsSync(path)&&(console.log(red(`Component ${bold(yellow(path))} already exists.
`)),process.exit(1)),fs.writeFileSync(path,getTemplate(),{flag:"wx"}),console.log(green(`Component ${bold(yellow(path))} successfully created.
`));
