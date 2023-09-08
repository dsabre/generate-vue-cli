
# generate-vue-cli

A Vue CLI to generate components instantly.

## Run using npx

```bash
npx @dsabre/generate-vue-cli --dir=src/components --name=HelloWorld
```

## Usage

```bash
# Usage: npx @dsabre/generate-vue-cli [flags]

# Generate a Vue component.

# Flags:
#   --dir        (required)   The directory where the component will be generated.
#   --name       (required)   The name of the component.
#   --prefix     (optional)   Prefix to prepend to component name.
#   --suffix     (optional)   Suffix to append to component name.
#   --template   (optional)   The template path to use.
#
#   -h, --help   Display this help message and exit.

# Example:
#   npx @dsabre/generate-vue-cli --dir="src/components" --name="HelloWorld" --prefix="Prefix" --suffix="Suffix"`);
```

## Examples

Create a src/components/HelloWorld.vue component:

```bash
npx @dsabre/generate-vue-cli --dir=src/components --name=HelloWorld
```

### Using templates

You can specify a custom template of your own (use `[[COMPONENT_NAME]]` token to print the new component name, it will be replaced when the component is created):

```vue
// templates/GenericComponent.vue

<script setup>
const msg = '[[COMPONENT_NAME]] component';
</script>

<template>
    <div>{{ msg }}</div>
</template>
```

then run:

```bash
npx @dsabre/generate-vue-cli --dir=src/components --name=HelloWorld --template=templates/GenericComponent.vue
```

## Authors

- [@dsabre](https://github.com/dsabre)

## License

[MIT](https://choosealicense.com/licenses/mit/)
