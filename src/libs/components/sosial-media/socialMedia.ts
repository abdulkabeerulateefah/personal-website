import { html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import AppConfig from '../../../data/globals/appConfig';
import CommonElement from '../_base_/commonElement';
import { ISocialMedia } from '../../../data/globals/interfaces';

@customElement('social-media')
export default class SocialMedia extends CommonElement {
    @property({ type: Array })
    data = AppConfig.APP_SOCIAL_MEDIA;

    renderSocialMediaButton(data: ISocialMedia): TemplateResult {
        return html`
            <li>
                <a style='background-color: ${data.color}' aria-label='This is the ${data.isEmail ? 'Email' : 'Social media page'} who created this website.' href='${data.url}' target='_blank' rel='noopener noreferrer'>
                    <i class='${data.icon}'></i>
                </a>
            </li>
        `;
    }

    render(): TemplateResult {
        return html`
            <div class='socialMedia'>
                <ul>
                    ${this.data.map((sm) => this.renderSocialMediaButton(sm))}
                </ul>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'social-media': SocialMedia;
    }
}