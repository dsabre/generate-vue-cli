#!/usr/bin/env node
"use strict";const fs=require("fs"),{red,green,bold,yellow}=require("chalk"),getArgs=()=>{const s=process.argv.slice(2),e={dir:"",name:""};return s.forEach(n=>{const t=n.split("="),r=t[0].split("--").join("").trim(),o=t[1].trim();e[r]=o}),e},args=getArgs();let hasErrors=!1;args.dir||(console.log(red(`Directory param not provided (pass it with --dir=[...]).
`)),hasErrors=!0),args.name||(console.log(red(`Component name param not provided (pass it with --name=[...]).
`)),hasErrors=!0),hasErrors&&process.exit(1),fs.existsSync(args.dir)||fs.mkdirSync(args.dir);const path=`${args.dir}/${args.name}.vue`,getTemplate=()=>args.template?fs.readFileSync(args.template).toString().split("[[COMPONENT_NAME]]").join(args.name):`<script setup>
const msg = '${args.name} component';
<\/script>

<template>
    <div>{{ msg }}</div>
</template>
`;fs.existsSync(path)&&(console.log(red(`Component ${bold(yellow(path))} already exists.
`)),process.exit(1)),fs.writeFileSync(path,getTemplate(),{flag:"wx"}),console.log(green(`Component ${bold(yellow(path))} successfully created.
`));
