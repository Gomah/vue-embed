<template>
  <div :id="id">
    <slot></slot>
  </div>
</template>
<script>
import EmbedJS from 'embed-js';

export default {
  props: {
    id: {
      type: String,
      default: 'embed__container',
    },
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
      input: document.querySelector(`#${this.id}`),
    });

    this.vEmbed.render();
  },

  beforeDestroy() {
    this.vEmbed.destroy();
  },
};
</script>
