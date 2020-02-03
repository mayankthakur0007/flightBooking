import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../node_modules/@polymer/paper-listbox/paper-listbox.js';
import '../../node_modules/@polymer/paper-item/paper-item.js';
import '../../node_modules/@polymer/paper-input/paper-input.js';
import '../../node_modules/@polymer/iron-form/iron-form.js';
import '../../node_modules/@polymer/paper-card/paper-card.js';
import '../../node_modules/@polymer/paper-card/paper-card.js';
import '../../node_modules/@polymer/iron-ajax/iron-ajax.js';
import '../../node_modules/@vaadin/vaadin-date-picker/vaadin-date-picker.js';
/**
 * @customElement
 * @polymer
 */
class FlightSearch extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
#form{
  padding:50px;
  margin:60px;
  border: 2px solid black;
  width:1000px;
  border-radius:50px;
}
paper-input{
  width:200px;
}
#btn{
  background-color:black;
  color:white;
}
      </style>
      <iron-form id="form">
      <form>
      <paper-dropdown-menu label="Travel Type" id="type" required>
      <paper-listbox slot="dropdown-content" selected="0">
       <paper-item>Economy</paper-item>
       <paper-item>Business</paper-item>
       </paper-listbox>
     </paper-dropdown-menu>
     <paper-dropdown-menu label="Source" id="source" required>
     <paper-listbox slot="dropdown-content" selected="0">
      <paper-item>Chennai</paper-item>
      <paper-item>Bangalore</paper-item>
      </paper-listbox>
    </paper-dropdown-menu>
   <paper-dropdown-menu label="Destination" id="destination" required>
    <paper-listbox slot="dropdown-content" selected="0">
     <paper-item>Chennai</paper-item>
     <paper-item>Bangalore</paper-item>
     </paper-listbox>
   </paper-dropdown-menu>
   <vaadin-date-picker id="start" label="Date Of Journey" placeholder="Date Of Journey" on-change="startChanged" ></vaadin-date-picker>
   <paper-input type="number" label="No. of Passenger" id="number" required></paper-input>
     <paper-button type="submit" id="btn" class="btn btn-success" on-click="_handleSearch">Search</paper-button>
      </form>
      </iron-form>
      <template is="dom-repeat" items={{flights}}>
      <paper-card >
      <div class="card-content">
      {{item.name}} accepted your interest request. Got to your matches to get phone number and chat.
  </div>
  <div class="card-actions">
  <paper-button type="submit" id="btn" class="btn btn-success" on-click="_handleSearch">Search</paper-button>
  </div>
      </paper-card>
       </template>
    `;
  }
  static get properties() {
    return {
      date: String,
      flights: {
        type: Array,
        value: []
      }, action: {
        type: String
      }
    };

  }
  startChanged() {

    this.date = this.$.start.value;
  }

  _handleSearch() {
    let obj = {
      source: source,
      destination: destination,
      date: this.date,
      noOfPassengers: number,
      travelType: type
    }
    this._getData(obj);

  }

  connectedCallback() {
    super.connectedCallback();
  }
  /** getdata function for fetching the data from the database and showing it. Ajax request is done in pets
  
  for the data with sell property value "yes" only. This function is also called when any new pet is added 
  
  so that the list got again refreshed **/

  _getData(obj) {
    let obj = obj;
    this._makeAjax(, "post", obj);
    this.action ='List';
  }
  _makeAjax(url, method, postObj) {
    const ajax = this.$.ajax;
    ajax.method = method;
    ajax.url = url;
    ajax.body = postObj ? JSON.stringify(postObj) : undefined;
    ajax.generateRequest();
  }
  _handleResponse(event) {

    switch (this.action) {

      case 'List':
        this.flights = event.detail.response;

        break;
    }


  }

}

window.customElements.define('flight-search', FlightSearch);

