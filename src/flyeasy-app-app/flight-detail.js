import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class FlightDetail extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
     
    `;
  }
  static get properties() {
    return {
     
    };
  }
}

window.customElements.define('flight-detail', FlightDetail);

