import type { PageURI } from '@beyond-js/widgets/routing';
import { VueWidgetController } from '@beyond-js/vue-widgets/base';
import { manager } from '@beyond-js/widgets/routing';

export /*bundle*/
abstract class PageVueWidgetController extends VueWidgetController {
	#uri: PageURI;
	get uri() {
		return this.#uri;
	}

	mount() {
		return super.mount({ uri: this.#uri });
	}

	async initialise() {
		const { widget } = this;
		const uri = manager.pages.obtain({ widget });
		this.#uri = uri;

		await super.initialise();
	}
}
