# @beyond-js/vue-widgets

Vue 3 rendering controllers for Beyond Widgets. Read [architecture, public APIs and lifecycle](docs/architecture.md) for setup, mounting, styles/HMR, routing, server rendering and known gaps.

Public imports are `@beyond-js/vue-widgets/base` and `/page`; client/server platform selection chooses their implementation. Source files are authored as Beyond modules and require TypeScript plus the vue processor. The [manifest](package.json) declares framework/core dependencies and distributions; installing dependencies alone does not create a runnable application or server.

Unmount is currently empty, and refresh/styles have documented limitations. Per-widget server render methods do not constitute a full SSR service or prove hydration compatibility. Use the local guide's verification cases before promising lifecycle or update behavior.
