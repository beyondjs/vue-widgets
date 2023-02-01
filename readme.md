# Welcome to `@beyond-js/vue-widgets` package

`@beyond-js/vue-widgets` is a package for [BeyondJS](https://beyondjs.com), which is a platform for creating web projects as independent microfrontends. This package is built on `@beyond-js/widgets`, and allows developers to use the Vue.js framework in BeyondJS projects in a simple and straightforward way.

## Features

-   Easy integration of Vue.js into BeyondJS projects
-   Built on the extensible `@beyond-js/widgets` package

## Getting Started

1. Install the `@beyond-js/vue-widgets` package in your BeyondJS project:

```
npm install @beyond-js/vue-widgets
```

2. Add the `vue` processor to the bundle configuration in the `module.json` file:

```json
{
    "bundleName": {
        "vue": {
            "ts": {
                "path": "vue", // Folder where you can store your React components as single-file components.
                "files": "*"
            }
        }
    }
}
```

> In this configuration, "bundleName" should be replaced with the actual name of your bundle.

## Contributing

We welcome contributions to `@beyond-js/vue-widgets`. If you'd like to contribute, please read the [Contribution Guidelines](https://beyondjs.com/docs/contributing).

## License

`@beyond-js/vue-widgets` is [MIT licensed](LICENSE).
