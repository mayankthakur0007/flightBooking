import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/iron-ajax/iron-ajax.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-if.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/app-route/app-route.js';
import '../../node_modules/@polymer/iron-pages/iron-pages.js';
import '../../node_modules/@polymer/iron-selector/iron-selector.js';
/**
 * @customElement
 * @polymer
 */
// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);
class FlyeasyApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        #btn{
          background-color:black;
          color:white;
        }
      </style>
      <app-location route="{{route}}">
      </app-location>
      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>
      <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
      <a name="search" href="[[rootPath]]search"><paper-button raised >Search Flights</paper-button></a>
      <a name="track" href="[[rootPath]]track"><paper-button raised>Your Bookings</paper-button></a>
    </iron-selector>
    <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
    <flight-search name="search" id="search"></flight-search>
    <my-matches name="flights" id="flights"></my-matches>
    <home-page name="details" id="details"></home-page>
    <request-page name="payment" id="payment"></request-page>
    <notification-page name="summary" id="summary"></notification-page>
    <track-journey name="track" id="track"></track-journey>
    <my-view404 name="view404"></my-view404>
  </iron-pages>
    `;
  }
  static get properties() {
    return {
      users: {
        type: Array,
        value: []
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object
    };
  }
  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }
  ready() {
    super.ready();
  }

  _routePageChanged(page) {
    // Show the corresponding page according to the route.
    //
    // If no page was found in the route data, page will be search page.
    this.page = page || 'search';

  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'search':
        import('./flight-search.js');
        break;
      case 'track':
        import('./track-journey.js');
        break;
      default:
        import('./flight-search.js');
        break;

    }
  }

}

window.customElements.define('flyeasy-app', FlyeasyApp);

