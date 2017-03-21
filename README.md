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
  <VEmbed :options="{ emoji: false }">
    <p>
    Lotus :smile: eleates vix attrahendams luna est.Advenas mori!Fermiums prarere in cubiculum!Cum cacula cantare, omnes stellaes manifestum azureus, nobilis  https://vuejs.org/ acipenseres.Cum orgia mori, omnes rationees <3 experientia alter, regius :heart: mortemes.Devatios persuadere, tanquam secundus  spatii.Heu, barcas!Cedriums observare!A falsis, lacta talis imber. :P Cur eleates peregrinatione?
    </p>
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
---------------

[Embed.js Documentation](https://embedjs.readme.io/)

---------------

Todo:

- [ ] Add embed css
- [ ] Add examples
- [ ] Publish to NPM
