# Vue 3 Widgets architecture

This adapter connects Vue 3 components to Beyond custom-element widgets. Core Widgets owns registration, controller construction, holder/shadow-root creation, attributes, stores, routing and style-resource state. This package owns framework mounting, refresh and rendering wrappers. It does not provide a compiler, development server, HMR transport or a full-document SSR service.

## Public modules and dependencies

[package.json](../package.json) declares `@beyond-js/vue-widgets` version 1.1.0, with Widgets ~1.1.0 and Kernel ~0.1.8. Vue is ^3.2.45; server rendering imports vue/server-renderer. @babel/types is a development dependency. Web/SSR distribution ports are 9118/9119.

`@beyond-js/vue-widgets/base` exports VueWidgetController; `/page` exports PageVueWidgetController. Client and server directories define the same public names selected by platform: web/android/ios versus ssr. Wrapper and compiled .vue files are internal sources, not additional public imports. Manifest versions are not evidence of published artifacts or tested framework compatibility.

## Authoring and core contract

```ts
import { PageVueWidgetController } from '@beyond-js/vue-widgets/page';
import PageView from './view.vue';

export /*bundle*/ class Controller extends PageVueWidgetController {
    get Widget() { return PageView; }
}
```

The view is application-owned. Widget metadata, registration exports and the component's compiled output must follow the consuming Beyond compiler's contract. Client base inherits WidgetClientController and expects core to supply widget.holder, attributes, store, styles and initialisation. mount(props?) defaults to widget/attributes/store, then allows caller overrides. These are model references, not serialized server state or automatic framework reactivity.

Page initialise obtains a URI from `manager.pages.obtain({widget})`, subscribes a bound onQueryStringChange callback to change, assigns uri, then awaits base initialise. Page mount passes uri to base mount. The overridable query-string callback is empty by default. The bound listener is not retained or removed; repeated initialization/disposal must address subscription ownership. Server page adds no behavior or automatic request URI; the server orchestrator supplies context explicitly.

## Client execution, styles and refresh

VueWidgetController selects createSSRApp for a holder with element children and createApp otherwise, then mounts the compiled wrapper. It does not retain the application instance, guard duplicate mounts or implement unmount. Server hydration selection exists; complete teardown does not.

The wrapper resolves its component through `wrapper.Widget` and gates it on stylesheet readiness. `refresh()` increments Wrapper.version and triggers a callback updating Vue state. The component's key is that version, so refresh deliberately changes component identity and can reset local component state. It is not equivalent to React's reconciliation behavior or Svelte's current no-op refresh.

Styles.vue subscribes to StylesManager change and replaces its resources property, but the anonymous callback has no cleanup. Link load passes the Event to onloaded, which current core accepts; there is no link error handler. The widget wrapper clears holder display only in the pending-style callback and does not bypass gating for hydration. Unfinished teardown and missing error settlement apply to both rendering and stylesheet subscriptions.

## Server rendering and hydration

The server controller creates an SSR app from the internal widget.vue wrapper, awaits vue/server-renderer renderToString and returns html. Its render method is asynchronous; the caller must await it. Missing Widget returns an errors array; caught rendering failures return their message. Server wrappers emit link elements from a styles URL array and the framework component. The client instead consumes a StylesManager with resources, loaded/ready, onloaded and change events.

This is per-widget rendering only: there is no streaming/document assembler, dependency loader, store serializer, recursive custom-element renderer or request isolation. The orchestrator must resolve ssr modules, initialize the controller and styles, provide props and assemble the document. The holder-children heuristic merely chooses hydration; matching markup, component identity, framework versions and initial data remain required. Client stylesheet gating differs from unconditional server component output and requires delayed/error-CSS hydration checks.

Current core StylesManager accepts a string URL or an Event whose currentTarget is a link and reads its href attribute. The wrapper's Event callback is therefore compatible with that contract; it is not inherently a string-versus-event bug. Dependency versions must still be checked against the actual installed core implementation.

## Compilation and setup

Every base/page manifest uses a code bundle with `ts.files: "*"` and `vue.files: "*"`. This is a processor-composition contract, not a JavaScript filename glob for Node. The internal controller requires compiled .vue wrappers. TypeScript-only output cannot replace the framework processor, and Packages must integrate that processor before this adapter can be a target acceptance case.

TypeScript configuration targets ES2017/ES2020 modules with Node resolution. The devcontainer uses Node 18/Beyond 1.2.0 and scaffolding, forwards no ports and defines no install/start lifecycle. No npm scripts, executable test suite or publishing workflow are supplied. There is no beyond.json in this checkout; a caller must explicitly select its package manifest in a Beyond workspace.

Use the source through a configured Beyond compiler/workspace or a verified built distribution. Resolve the declared core/framework dependencies and target platform in the consuming application. This guide does not assume a sibling checkout or prescribe an unsupported standalone npm start/build command. Historical README examples mixing React/Vue paths with this adapter were not a valid setup contract.

## Verification and extension

Verify mount and missing-component errors, style success/failure, script and CSS refresh, query-string events, duplicate mount, detach/reconnect and framework/subscription teardown. Test SSR output followed by hydration with matching component/store data and slow/erroring CSS. Distinguish framework compilation from browser behavior and a refresh callback from state preservation. Keep Controller → Wrapper → Widget/Styles semantics while implementing missing ownership/cleanup and readiness paths.

## Source references

- [Client controller](../modules/client/base/controller.ts), [wrapper](../modules/client/base/wrapper.ts), [widget](../modules/client/base/widget.vue), [styles](../modules/client/base/styles.vue) and [page](../modules/client/page/page.ts).
- [Server controller](../modules/ssr/base/controller.ts), [widget](../modules/ssr/base/widget.vue), [styles](../modules/ssr/base/styles.vue) and [page](../modules/ssr/page/page.ts).
- [Client manifest](../modules/client/base/module.json), [server manifest](../modules/ssr/base/module.json) and [package manifest](../package.json).
