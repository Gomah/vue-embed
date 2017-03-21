<template>
  <div id="embed--container">
    <slot></slot>
  </div>
</template>
<script>
import EmbedJS from 'embed-js';

export default {
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      vEmbed: {},
    };
  },

  mounted() {
    EmbedJS.setOptions(this.options);

    this.vEmbed = new EmbedJS({
      input: document.querySelector('#embed--container'),
    });

    this.vEmbed.render();
  },

  beforeDestroy() {
    this.vEmbed.destroy();
  },
};
</script>
