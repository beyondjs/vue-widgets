import {WidgetServerController, IWidgetRendered} from "@beyond-js/widgets/controller";
import {createSSRApp} from 'vue';
import {renderToString} from 'vue/server-renderer';

export /*bundle*/
abstract class VueWidgetController extends WidgetServerController {
    async render(props: Record<string, any>): Promise<IWidgetRendered> {
        if (!this.Widget) {
            return {errors: [`Widget "${this.element}" does not export a Widget class`]};
        }

        // Render the widget
        try {
            const Container = require('./widget.vue').default;
            const {Widget, styles} = this;
            const widget = createSSRApp(Container, {styles, Widget, props});
            let html = await renderToString(widget);
            return {html};
        } catch (exc) {
            return {errors: [exc.message]};
        }
    }
}
