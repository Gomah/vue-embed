<template>
  <div>
    <slot />
  </div>
</template>
<script>
import EmbedJS from 'embed-js';

export default {
  props: {
    options: {
      type: Object,
      default: () => ({
        plugins: [],
        preset: null,
        inlineEmbed: true,
        replaceUrl: false,
      }),
    },
  },

  data() {
    return {
      vEmbed: {},
    };
  },

  async mounted() {
    const plugins = await this.loadPlugins();

    this.vEmbed = new EmbedJS({
      input: this.$el,
      ...this.options,
      plugins: [
        ...plugins.map(plugin => {
          const options = plugin.options || {};
          return plugin.module.default(options);
        }),
      ],
    });

    this.vEmbed.render();
  },

  methods: {
    loadPlugins() {
      const pluginList = {
        url: () => import('embed-plugin-url'),
        emoji: () => import('embed-plugin-emoji'),
        media: () => import('embed-plugin-media'),
        highlight: () => import('embed-plugin-highlight'),
        github: () => import('embed-plugin-github'),
        youtube: () => import('embed-plugin-youtube'),
        facebook: () => import('embed-plugin-facebook'),
        map: () => import('embed-plugin-map'),
        noembed: () => import('embed-plugin-noembed'),
        twitter: () => import('embed-plugin-twitter'),
        instagram: () => import('embed-plugin-instagram'),
      };

      const pluginsToLoad = this.options.plugins;

      return Promise.all(
        pluginsToLoad.map(async plugin => ({
          module: await pluginList[plugin.name](),
          options: plugin.options,
        }))
      );
    },
  },

  beforeDestroy() {
    if (typeof this.vEmbed.destroy === 'function') {
      this.vEmbed.destroy();
    }
  },
};
</script>
