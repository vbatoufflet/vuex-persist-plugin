vuex-persist-plugin
===================

[Vuex](https://vuex.vuejs.org/) plugin that provides state persistence relying
on a [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage)
object.

Install
-------

To get started using this plugin, add the dependency via npm:

```shell
npm install @batou.dev/vuex-persist-plugin
```

then use it as a Vuex plugin:

```typescript
import Persist from "@batou.dev/vuex-persist-plugin";

const persist = new Persist<State>({
    // Optional configuration properties (see below)
});

const store = createStore<State>({
    state: { … },
    mutations: { … },
    plugins: [persist.plugin()],
});
```

Configuration
-------------

| Property   | Type              | Default               | Description                                                         |
| ---------- | ----------------- | --------------------- | ------------------------------------------------------------------- |
| debounce   | number            | `250`                 | Debounce timeout duration                                           |
| key        | string            | `vuex-persist`        | Key to store the state into                                         |
| reduce     | (state) => object |                       | Function to reduce the state. By default, the entire state is saved |
| storage    | Storage           | `window.localStorage` | An object implementing the Web Storage API interface                |
| unloadSave | boolean           | `false`               | Whether or not to automatically save the state upon page unload     |

Links
-----

* [Changelog](https://github.com/vbatoufflet/vuex-persist-plugin/blob/master/CHANGELOG.md)
* [npm package](https://www.npmjs.com/package/@batou.dev/vuex-persist-plugin)

License
-------

This code is licensed and distributed under the term of the
[MIT](https://opensource.org/licenses/MIT) license.
