import type {VueWidgetController} from "./controller";

export class Wrapper {
    #Widget: VueWidgetController;
    get Widget(): any {
        return this.#Widget.Widget;
    }

    // Property changed is overwritten by widget.vue to get notified about HMR changes
    changed = (): void => void 0;

    change() {
        this.#version++;
        this.changed();
    }

    #version = 0;
    get version() {
        return this.#version;
    }

    constructor(Widget: VueWidgetController) {
        this.#Widget = Widget;
    }
}
