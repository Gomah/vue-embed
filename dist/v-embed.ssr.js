'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}function _interopNamespace(e){if(e&&e.__esModule){return e;}else{var n={};if(e){Object.keys(e).forEach(function(k){var d=Object.getOwnPropertyDescriptor(e,k);Object.defineProperty(n,k,d.get?d:{enumerable:true,get:function(){return e[k];}});});}n['default']=e;return n;}}var EmbedJS=_interopDefault(require('embed-js'));//

var script = {
  props: {
    options: {
      type: Object,
      default: function () { return ({
        plugins: [],
        preset: null,
        inlineEmbed: true,
        replaceUrl: false,
      }); },
    },
  },

  data: function data() {
    return {
      vEmbed: {},
    };
  },

  mounted: async function mounted() {
    var plugins = await this.loadPlugins();

    this.vEmbed = new EmbedJS(Object.assign({}, {input: this.$el},
      this.options,
      {plugins: [].concat( plugins.map(function (plugin) {
          var options = plugin.options || {};
          return plugin.module.default(options);
        }) )}));

    this.vEmbed.render();
  },

  methods: {
    loadPlugins: function loadPlugins() {
      var pluginList = {
        url: function () { return new Promise(function(c){c(_interopNamespace(require('embed-plugin-url')));}); },
        emoji: function () { return new Promise(function(c){c(_interopNamespace(require('embed-plugin-emoji')));}); },
        media: function () { return new Promise(function(c){c(_interopNamespace(require('embed-plugin-media')));}); },
        highlight: function () { return new Promise(function(c){c(_interopNamespace(require('embed-plugin-highlight')));}); },
        github: function () { return new Promise(function(c){c(_interopNamespace(require('embed-plugin-github')));}); },
        youtube: function () { return new Promise(function(c){c(_interopNamespace(require('embed-plugin-youtube')));}); },
        facebook: function () { return new Promise(function(c){c(_interopNamespace(require('embed-plugin-facebook')));}); },
        map: function () { return new Promise(function(c){c(_interopNamespace(require('embed-plugin-map')));}); },
        noembed: function () { return new Promise(function(c){c(_interopNamespace(require('embed-plugin-noembed')));}); },
        twitter: function () { return new Promise(function(c){c(_interopNamespace(require('embed-plugin-twitter')));}); },
        instagram: function () { return new Promise(function(c){c(_interopNamespace(require('embed-plugin-instagram')));}); },
      };

      var pluginsToLoad = this.options.plugins;

      return Promise.all(
        pluginsToLoad.map(async function (plugin) { return ({
          module: await pluginList[plugin.name](),
          options: plugin.options,
        }); })
      );
    },
  },

  beforeDestroy: function beforeDestroy() {
    if (typeof this.vEmbed.destroy === 'function') {
      this.vEmbed.destroy();
    }
  },
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = "data-v-8ed78fba";
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var component = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );// Import vue component

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component('VEmbed', component);
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
component.install = install;exports.default=component;