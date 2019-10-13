# vue-embed

Embed component is based on [embed.js](https://github.com/ritz078/embed.js) for Vue 2.x.

> Embed.js is a lightweight JavaScript plugin to embed emojis, media, maps, tweets, code and services.

[![circle-ci][circle-src]][circle-href]
[![npm version][npm-version-src]][npm-version-href]
[![Dependencies][david-dm-src]][david-dm-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![code style: prettier](https://img.shields.io/badge/code_style-airbnb/prettier-FF5A5F.svg?style=flat-square)](https://github.com/airbnb/javascript)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

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
  <section class="section">
    <v-embed :options="options">
      Cur rumor nocere ? :smile: :smile: :smile: :smile: :smile: :smile:
      Emeritis adelphis satis perderes domina est.Gloss cadunt in bi-color
      brema!
    </v-embed>
  </section>
</template>

<script>
import VEmbed from vue-embed';

export default {
  name: 'Hello',

  components: {
    VEmbed,
  },

  data: () => ({
    options: {
      plugins: [{ name: 'emoji' }],
    },
  }),
};
</script>
```

## Options

| option          | default                            | Description                                                                                                                                                                                                                                                                                                                                                                          |
| --------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **plugins**     | []                                 | Accepts an array of plugins. See below                                                                                                                                                                                                                                                                                                                                               |
| **preset**      | null                               | Accepts a preset. Currently accpets only one preset. It can be combined with plugins.                                                                                                                                                                                                                                                                                                |
| **inlineEmbed** | true                               | If case you want to to embed contents at the end of texts, turn this to false.                                                                                                                                                                                                                                                                                                       |
| **replaceUrl**  | false                              | Useful when **inlineEmbed** is set to true. Replace text with the embed.                                                                                                                                                                                                                                                                                                             |
| **fetch**       | `window.fetch` or `window.unfetch` | If you are willing to use the library on both server and client side you need to pass an isomorphic fetch library like [isomorphic-unfetch](https://github.com/developit/unfetch/tree/master/packages/isomorphic-unfetch) or [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch). This is only needed if you are using a plugin that has to make a HTTP request. |

### Plugins

#### [url](https://github.com/ritz078/embed-js/tree/v5/packages/embed-plugin-url)

> A plugin that can be used to parse urls into anchor tags.

```vue
<script>
import VEmbed from vue-embed';

export default {
  name: 'Hello',

  components: {
    VEmbed,
  },

  data: () => ({
    options: {
      plugins: [
        {
          name: 'url',
          options: {
            attributes: {}, // a hash of attributes to be added in the url
            escape: false   // whether on not to escape special characters in url
          }
        }],
    },
  }),
};
</script>
```

Note : Avoid using `escape: true` when using with the _highlight_ plugin.

#### [emoji](https://github.com/ritz078/embed-js/tree/v5/packages/embed-plugin-emoji)

> A plugin that can be used to convert :emoji_name: to actual emojis.

It supports all the emojis supported by [emoji.css](https://github.com/IonicaBizau/emoji.css). If you are using this plugin, you need to load

```vue
<script>
import VEmbed from vue-embed';

export default {
  name: 'Hello',

  components: {
    VEmbed,
  },

  data: () => ({
    options: {
      plugins: [
        {
          name: 'emoji',
          options: {
            regex: /emojiRegex/gi, // in case you want to define a custom regex
            template(emojiName) {
              // optional template
            }
          }
        }],
    },
  }),
};
</script>
```

Known issue : It doesn't check if a particular name is a valid emoji name. So if you use a test like :not_valid_emoji_name:, it will still convert it to a span element with that class name.

You also need to import the embed css file :

```html
<link
  href="https://unpkg.com/emoji.css/dist/emoji.min.css"
  media="all"
  rel="stylesheet"
/>
```

#### [Media](https://github.com/ritz078/embed-js/tree/v5/packages/embed-plugin-media)

> A plugin that can be used to embed video, audio or image those are supported by the browser.

```vue
<script>
import VEmbed from vue-embed';

export default {
  name: 'Hello',

  components: {
    VEmbed,
  },

  data: () => ({
    options: {
      plugins: [
        {
          name: 'media',
          options: {
            regex: /regex/gi, // in case you want to define a custom regex
            template(args) {
              // optional template
            },
            onLoad(element) {} // in case you want to do something when the component has loaded on the client.
          }
        }],
    },
  }),
};
</script>
```

#### [Highlight](https://github.com/ritz078/embed-js/tree/v5/packages/embed-plugin-highlight)

> A plugin that can be used to syntax highlight code.

You need [Prism.js ](http://prismjs.com/) to use this plugins. So import the necessary libraries to support it.

```html
<!-- import the theme of your choice -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-dark.css" />

<!-- import the umd build of prism.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js">
```

**Note** : On the server, the plugin automatically imports prism.js from `node_modules`. But it doesn't bundle the PrismJS library with the umd build to keep the size to minimal. Technically `prismjs = isServer ? require('prismjs') : window.Prism`.

```vue
<script>
import VEmbed from vue-embed';

export default {
  name: 'Hello',

  components: {
    VEmbed,
  },

  data: () => ({
    options: {
      plugins: [
        {
          name: 'highlight',
          options: {
            regex: /(`{3})(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm, // in case you want to define a custom regex
            prismjs: prismjs, // By default it takes window.Prism on client side and global.Prism on server side.
            template(args) {
              // optional template
            },
            onLoad(element) {} // in case you want to do something when the component has loaded on the client.
          }
        }],
    },
  }),
};
</script>
```

#### [Github](https://github.com/ritz078/embed-js/tree/v5/packages/embed-plugin-github)

> A plugin that can be used to embed GitHub repo description.

```vue
<script>
import VEmbed from vue-embed';

export default {
  name: 'Hello',

  components: {
    VEmbed,
  },

  data: () => ({
    options: {
      plugins: [
        {
          name: 'github',
          options: {
            regex: /githubRepoRegex/gi, // in case you want to define a custom regex
            template(args) {
              // optional template
            }
          }
        }],
    },
  }),
};
</script>
```

When you click on the link URL, it redirects you to the repo URL.

#### [Youtube](https://github.com/ritz078/embed-js/tree/v5/packages/embed-plugin-youtube)

> A plugin that can be used to embed Youtube videos.

This embeds youtube videos in the page. This plugin supports two mode controlled by the option `details`.

- [Example with Details](https://codepen.io/ritz078/pen/JyyPjq)
- [Example without Details](https://codepen.io/ritz078/pen/qXXWde)

```vue
<script>
import VEmbed from vue-embed';

export default {
  name: 'Hello',

  components: {
    VEmbed,
  },

  data: () => ({
    options: {
      plugins: [
        {
          name: 'youtube',
          options: {
            regex: /youtubeVideoRegex/gi, // in case you want to define a custom regex,

            // If set to false, it doesn't make API calls to Youtube for video details. Instead it just embeds the video.
            details: true,

            // This is a mandatory field.
            gAuthKey: ''

            // height of video iframe
            height: 300,

            // This is the class on clicking which the details view changes to embedded video.
            // This is only required if you providing a custom template for the details view.
            clickClass: "ejs-video-thumb",

            template(args, options, pluginOptions, dataFromApi) {
              // dataFromApi is undefined if details is set to false
            },

            // executes when element is rendered
            onLoad(options, pluginOptions) {}
          }
        }],
    },
  }),
};
</script>
```

#### [Facebook](https://github.com/ritz078/embed-js/tree/v5/packages/embed-plugin-facebook)

> A plugin that can be used to embed facebook posts/videos.

```vue
<script>
import VEmbed from vue-embed';

export default {
  name: 'Hello',

  components: {
    VEmbed,
  },

  data: () => ({
    options: {
      plugins: [
        {
          name: 'facebook',
          options: {
            regex: /facebookPostRegex/gi, // in case you want to define a custom regex
            template(args) {
              // optional template
            }
          }
        }],
    },
  }),
};
</script>
```

When you click on the link URL, it redirects you to the post URL.

#### [Map](https://github.com/ritz078/embed-js/tree/v5/packages/embed-plugin-map)

> A plugin that can be used to embed Google map for a location.

```vue
<script>
import VEmbed from vue-embed';

export default {
  name: 'Hello',

  components: {
    VEmbed,
  },

  data: () => ({
    options: {
      plugins: [
        {
          name: 'map',
          options: {
            regex: /mapNamePattern/gi, // in case you want to define a custom regex
            template(args) {
              // optional template
            },
            mode: "place", // one of place, streetview or view
            height: 300,
            gAuthKey: "" // mandatory gAuthKey
          }
        }],
    },
  }),
};
</script>
```

Default pattern to embed a location is `@(locationName)`. You can change this by passing a custom regex.

#### [NoEmbed](https://github.com/ritz078/embed-js/tree/v5/packages/embed-plugin-noembed)

> A plugin that can be used to embed selected services supported by NoEmbed.

### Supported Services

- AmCharts
- CollegeHumor
- DailyMotion
- DeviantArt
- DotSub
- Dropbox
- Flickr
- Gfycat
- Giphy
- Hulu
- Imgur
- Kickstarter
- Mixcloud
- NyTimes
- Reddit
- Screen9
- Scribd
- SlideShare
- Smugmug
- SoundCloud
- SpeakerDeck
- Ted
- Twitch
- Twitter
- Ustream
- VeerVR
- Vevo
- Vimeo
- Vine
- Wikimedia
- YouTube

```vue
<script>
import VEmbed from vue-embed';

export default {
  name: 'Hello',

  components: {
    VEmbed,
  },

  data: () => ({
    options: {
      plugins: [
        {
          name: 'noembed',
          options: {
            exclude: ['twitter'], // array of service names that you want to exclude. Defaults to an empty array.

            twttr: isBrowser ? window.twttr : null, // in case you want to define a custom twitter widget script.

            onLoad() {}, // executed when tweets are rendered.

            template(args) {
              // optional template
            }
          }
        }],
    },
  }),
};
</script>
```

#### [Twitter](https://github.com/ritz078/embed-js/tree/v5/packages/embed-plugin-twitter)

> A plugin that can be used to embed tweets.

Embeds Tweets in the website. You need to load https://platform.twitter.com/widgets.js in advance to get this working.

```vue
<script>
import VEmbed from vue-embed';

export default {
  name: 'Hello',

  components: {
    VEmbed,
  },

  data: () => ({
    options: {
      plugins: [
        {
          name: 'twitter',
          options: {
            // Regex that matches the string and sends to the template method.
            regex: /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi,

            // The maximum width of a rendered Tweet in whole pixels.
            // This value must be between 220 and 550 inclusive. A supplied
            // value under or over the allowed range will be returned as the
            // minimum or maximum supported width respectively; the reset width
            // value will be reflected in the returned width property. Note that
            // Twitter does not support the oEmbed maxheight parameter. Tweets
            // are fundamentally text, and are therefore of unpredictable height
            // that cannot be scaled like an image or video. Relatedly, the
            // oEmbed response will not provide a value for height. Implementations
            // that need consistent heights for Tweets should refer to the hide_thread
            // and hide_media parameters below.
            maxWidth: 550,

            // When set to true , t, or 1 links in a Tweet are not expanded to photo,
            // video, or link previews
            hideMedia: false,

            // When set to true , t, or 1 a collapsed version of the previous Tweet
            // in a conversation thread will not be displayed when the requested Tweet
            // is in reply to another Tweet
            hideThread: false,

            // Specifies whether the embedded Tweet should be floated left,
            // right, or center in the page relative to the parent element.
            // Valid values are left, right, center, and none
            align: "none",

            // Request returned HTML and a rendered Tweet in the specified Twitter
            // language supported by embedded Tweets. https://dev.twitter.com/web/overview/languages
            lang: "en",

            // When set to dark, the Tweet is displayed with light text over a dark background
            theme: "light",

            // Adjust the color of Tweet text links with a hexadecimal color value
            linkColor: "#355acee",

            // Set to video to return a Twitter Video embed for the given Tweet
            widgetType: "",

            /**
            * It accepts the matching url and returns the html
            * content that replaces or appends to the URL based
            * on options. This can return a asynchronous response.
            */
            template(args, options, pluginOptions, { html }) {
              return html
            },

            // The twitter object loaded from widgets.js. By default it takes twttr
            // from window object.
            twttr: isBrowser ? window.twttr : null,

            // executed when the tweet has been loaded
            // and rendered on the client side
            onLoad() {}
          }
        }],
    },
  }),
};
</script>
```

**Note** : The twitter embed functionality provided by **embed-plugin-noembed** doesn't provide this much customization. So if you willing to use this plugin for tweet embedding along with noembed plugin, make sure you disable twitter embedding in the latter by passing `exclude: ['twitter']` in it.

#### [Instagram](https://github.com/ritz078/embed-js/tree/v5/packages/embed-plugin-instagram)

> A plugin that can be used to embed instagram posts.

Embeds Tweets in the website. You need to load https://platform.twitter.com/widgets.js in advance to get this working.

```vue
<script>
import VEmbed from vue-embed';

export default {
  name: 'Hello',

  components: {
    VEmbed,
  },

  data: () => ({
    options: {
      plugins: [
        {
          name: 'instagram',
          options: {
            regex: /instagramPostRegex/gi, // in case you want to define a custom regex
            template(args) {
              // optional template
            }
          }
        }],
    },
  }),
};
</script>
```

When you click on the link URL, it redirects you to the post URL.

---

## 📑 License

[MIT License](./LICENSE)

---

[Embed.js Documentation](https://embedjs.readme.io/)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/dt/vue-embed.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/vue-embed
[circle-src]: https://circleci.com/gh/Gomah/vue-embed.svg?style=shield
[circle-href]: https://circleci.com/gh/Gomah/vue-embed
[npm-downloads-src]: https://img.shields.io/npm/v/vue-embed/latest.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/vue-embed
[david-dm-src]: https://david-dm.org/gomah/vue-embed/status.svg?style=flat-square
[david-dm-href]: https://david-dm.org/gomah/vue-embed
