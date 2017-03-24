# vue-embed

Embed component is based on [embed.js](https://github.com/ritz078/embed.js) for Vue 2.x.

---------------

## Installation

```bash
# yarn
$ yarn add vue-embed

# npm
$ npm install vue-embed --save
```

## Example

```vue
<template>
  <VEmbed :id="gist" :options="{ emoji: true }">
    <p>https://gist.github.com/yyx990803/7cfec746bb8cd6ae05e72f30104c0d51</p>
  </VEmbed>
</template>

<script>
import VEmbed from 'vue-embed'

export default {
  components: {
    VEmbed
  }
}
</script>
```

You also need to import the embed css file :
```html
<link href="https://cdn.jsdelivr.net/embed.js/4.0.0/embed.min.css" media="all" rel="stylesheet">
```

---------------

[Embed.js Documentation](https://embedjs.readme.io/)
