
# generate-vue-cli

A Vue CLI to generate components instantly.

## Run using npx

```bash
  npx @dsabre/generate-vue-cli --dir=src/components --name=HelloWorld
```

## Usage/Examples

Create a src/components/HelloWorld.vue component:

```bash
npx @dsabre/generate-vue-cli --dir=src/components --name=HelloWorld
```

### using templates

You can specify a custom template of your own (use `[[COMPONENT_NAME]]` token to print the new component name, it will be replaced when the component is created):

```vue
// templates/GeneriComponent.vue

<script setup>
const msg = '[[COMPONENT_NAME]] component';
</script>

<template>
    <div>{{ msg }}</div>
</template>
```

then run:

```bash
npx @dsabre/generate-vue-cli --dir=src/components --name=HelloWorld --template=templates/GeneriComponent.vue
```
## Authors

- [@dsabre](https://github.com/dsabre)


## License

[MIT](https://choosealicense.com/licenses/mit/)

