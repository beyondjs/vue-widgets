import {VueWidgetController} from '@beyond-js/vue-widgets/base';
import {PageURI} from '@beyond-js/widgets/routing';

export /*bundle*/
abstract class PageVueWidgetController extends VueWidgetController {
    #uri: PageURI;
    get uri() {
        return this.#uri;
    }

    mount() {
        return super.mount({uri: this.#uri});
    }

    async initialise() {
        this.#uri = new PageURI({widget: <any>this.widget});
        await super.initialise();
    }
}
