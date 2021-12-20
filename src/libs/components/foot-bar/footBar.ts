import { html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import AppConfig from '../../../data/Config';
import CommonElement from '../_base_/commonElement';

@customElement('foot-bar')
export default class FootBar extends CommonElement {
    @property({ type: String })
    text = AppConfig.TEXT_FOOTER;

    render(): TemplateResult {
        return html`
            <footer class='footer'>
                <p tabindex='0'>${this.text}</p>
            </footer>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'foot-bar': FootBar;
    }
}