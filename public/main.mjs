import { init } from './component.mjs';
import { LitElement, css, html } from 'lit-element';

let flexDirectionRow = css`row`;
let flexDirectionColumn = css`column`;
let flexGridWidthRow = css`55%`;
let flexCluesWidthRow = css`40%`;
let flexGridWidthColumn = css`100%`;
let flexGridHeightRow = css`100%`;
let flexGridHeightColumn = css`60%`;
let flexCluesHeightRow = css`100%`;
let flexCluesHeightColumn = css`35%`; // leaves 5%?

class CrossWordElement extends LitElement {

  static get styles() {
    return css`

      @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@100&display=swap');
      
      :host {
        position: relative;
        display:block;
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
      }

      :host:focus {
        outline: none !important;
      }

      main {
        width: 100%;
        max-width: 1150px;
        height: 90vh;
        max-height: 90vh;
      }   

      main.touch {
        height: calc(90vh + 30px); /* mobile main contains the sticky header */
        max-height: calc(90vh + 30px);
      }   

      main:focus {
        outline: none !important;
      }
      
      /* containing the element */
      main > div.container {
        position: relative;
        display:flex;
        flex-direction: column;
        height: 90vh; /* account for statusBarHeight */
        width: 100%; /* percentage of the container the app is placed in */
        max-width: 1150px;
        justify-content: space-between;
        overflow: hidden;
        font-family: "arial,sans-serif";      
      }

      main:not(.touch) > div.container {
        height: 90vh;
        max-height: 90vh; /* leave 680 for controls*/
      }

      main.touch > div.container {
        max-height: 90vh; /* account for statusBarHeight - TODO !! */
      }
      
      article[aria-label="puzzle game"] {
        display: flex;
        width: 100%;  /* relevant to the main div */        
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        min-height: 100%;   
        justify-content: center; /*along the main axis */
      }

      main:not(.touch) article[aria-label="puzzle game"]{
        flex-direction: ${flexDirectionColumn};        
      }

      main:not(.touch) article[aria-label="puzzle game"].row {
        flex-direction: ${flexDirectionRow};
      }

      main.touch article[aria-label="puzzle game"] {
        height: auto;  /* for touch this is defined by puzzle grid height = 55vh*/
        max-height: auto;
        min-height: auto;
      }
     
      /* for touch and not-touch */
      main section[aria-label="puzzle grid"] {
        position: relative;
      }

      main:not(.touch) section[aria-label="puzzle grid"] {
        flex-basis: ${flexGridWidthColumn};
        max-width:  ${flexGridWidthColumn};
        height: ${flexGridHeightColumn};
        max-height:  calc(100% - ${flexCluesHeightColumn});
        min-height:  ${flexGridHeightColumn};
        overflow: hidden;
      }     
      
      main:not(.touch) article[aria-label="puzzle game"].row section[aria-label="puzzle grid"] {
        flex-basis: ${flexGridWidthRow};
        max-width: 501px; /* ${flexGridWidthRow};*/
        height: ${flexGridHeightRow};
        max-height: ${flexGridHeightRow};
        min-height: ${flexGridHeightRow};
      }

      main.touch section[aria-label="puzzle grid"] {
        height: 52vh; /*was 55vh, 60vh; */
        flex-basis: 100%; /* mobile first */
        max-width: 100%;
        overflow: hidden;
      } 

      main:not(.touch) section[aria-label="puzzle clues"] {
        flex-basis: ${flexGridWidthColumn}; /* same as grid */
        max-width:  ${flexGridWidthColumn};
        height: ${flexCluesHeightColumn};
        max-height: ${flexCluesHeightColumn};
        min-height: ${flexCluesHeightColumn};
      }

      main:not(.touch) article[aria-label="puzzle game"].row section[aria-label="puzzle clues"] {
        flex-basis: ${flexCluesWidthRow};
        max-width:  ${flexCluesWidthRow};
        height: ${flexCluesHeightRow};
        max-height: ${flexCluesHeightRow};
        min-height: ${flexCluesHeightRow};
      }

      main.touch section[aria-label="puzzle clues"] {
        display: none;
        width: 0;
        height: 0;
      
      }

      /* MOVE THESE To window.resize event
      
       @media screen and (max-width:700px) {
    
        main:not(.touch) article[aria-label="puzzle game"].row {
          flex-direction: ${flexDirectionColumn};
        }
    
        main:not(.touch) article[aria-label="puzzle game"].row section[aria-label="puzzle clues"] {
          flex-basis: ${flexGridWidthColumn};
          max-width:  ${flexGridWidthColumn};
          height: ${flexCluesHeightColumn};
          max-height: ${flexCluesHeightColumn};
          min-height: ${flexCluesHeightColumn};
        }
    
        main:not(.touch) article[aria-label="puzzle game"].row section[aria-label="puzzle grid"] {
          flex-basis: ${flexGridWidthColumn};
          max-width:  ${flexGridWidthColumn};
          height: ${flexGridHeightColumn};
          max-height:  ${flexGridHeightColumn};
          min-height:  ${flexGridHeightColumn};
        }
        
      } 
      
        @media screen and (min-width:700px) {
    
          main:not(.touch) article[aria-label="puzzle game"].column {
            flex-direction: ${flexDirectionRow};
          }
    
          main:not(.touch) article[aria-label="puzzle game"].column section[aria-label="puzzle clues"] {
            flex-basis: ${flexCluesWidthRow};
            max-width:  ${flexCluesWidthRow};
            height: ${flexCluesHeightRow};
            max-height: ${flexCluesHeightRow};
            min-height: ${flexCluesHeightRow};
          }
    
          main:not(.touch) article[aria-label="puzzle game"].column section[aria-label="puzzle grid"] {
            flex-basis: ${flexGridWidthRow};
            max-width:  ${flexGridWidthRow};
            height: ${flexGridHeightRow};
            max-height:  ${flexGridHeightRow};
            min-height:  ${flexGridHeightRow};
          }
        
      }
    
      */  
   

      .board {
        position: absolute; /* RELATIVE TO: section[aria-label="puzzle grid"] */
        box-sizing: border-box;
        transition: transform 0s ease-in-out 0s;
        transform: translate(0px, 0px) scale(1);
        touch-action: none;
        user-select: none;
        -webkit-user-drag: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }

      main:not(.touch) .board {
        height: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }

      main.touch .board {
        top: 1px;
        left: 1px;
        bottom: 1px;
        right: 1px;
      }

      svg {
        display: block;
        width: 100%;
        max-width: 100%;       
        max-height: 100%;
        user-select: none;
      }

      main.touch svg {
        /* height: 501px; */
      }

      main:not(.touch) svg {
        height: 501px;
        max-height: 100%;
      }

      svg text {    
        font-weight: "100";
        font-family: 'inherit';
        pointer-events: none;
      }
      
      svg rect {
        -webkit-tap-highlight-color: transparent;     
      }
        
      svg path {
        user-select: none;
      }
        
      svg:focus, svg rect:focus {
        outline: none;
      }
        
      svg rect::-moz-focus-inner {
        outline: none;
      }

      main:not(.touch) .scrolls:not([hidden]) {
        display: flex;
        justify-content: space-around;
        max-height: 100%; /* percentage of clues section */
        margin-bottom: 5px;
        margin-left: 1vw;
        box-sizing: border-box;
      }

      main:not(.touch) .scrolls:not([hidden]) > div {
        margin-left: 5px;
        flex: 1 1 50%;
        max-width: 50%;
        box-sizing: border-box;
      }

      main:not(.touch) .scrolls:not([hidden]) h4 {
        width: 95%;
        margin: 0px;
        /* padding-bottom: 3px; */
        text-transform: uppercase;
        border-bottom: 1px solid rgb(204, 204, 204);
        color: black;
      }

      main:not(.touch) .scrolls:not([hidden]) ol {
        height: calc(100% - 60px);
        min-height: calc(100% - 60px);
        max-height: calc(100% - 60px);
        padding-inline-start: 0px;
        padding-left: 0px;
        overflow-y: scroll;
        list-style-type: none;
        font-size: inherit;
        box-sizing: border-box;
      }

      main:not(.touch) .scrolls:not([hidden]) ol::-webkit-scrollbar {
        width: 8px;
      }

      main:not(.touch) .scrolls:not([hidden]) ol::-webkit-scrollbar {
        width: 11px;
        border-radius: 3px;
        background-color:#ddd;
      }
      
      main:not(.touch) .scrolls:not([hidden]) ol::-webkit-scrollbar-thumb {
        background: #aaa;
        border-radius: 3px;
      }

      @media screen and (max-width: 320px) {
        main:not(.touch) .scrolls:not([hidden]) ol::-webkit-scrollbar {
          width: 6px;
        }
      }

      main:not(.touch) .scrolls:not([hidden]) ol li {
        border-left: 10px solid transparent;
        cursor: pointer;
        display: flex;
        padding-right: 1vw;
        box-sizing: border-box;
      }

      main:not(.touch) .scrolls:not([hidden]) ol li.activeClue {
        border-left: 10px solid transparent;
        cursor: pointer;
        display: flex;
        background-color: lightblue;
      }
        
      main:not(.touch) .scrolls:not([hidden]) ol li.highlightedClue {
        border-color: lightblue;
      }
        
      main:not(.touch) .scrolls:not([hidden]) ol li span {
        font-family: 'Libre Franklin', sans-serif;
        line-height: 1.1;
        padding: 5px 1px;
        background: transparent;
        letter-spacing: 0.5px;
        font-size: 0.85rem; 
        word-break: break-word;   
        color: black;
      }
        
      main:not(.touch) .scrolls:not([hidden]) ol li > span:first-child {
        font-weight: bold;
        width: 24px;
        text-align: right;
        padding-right: 5px;
        box-sizing: border-box;
      }
        
      main:not(.touch) .scrolls:not([hidden]) ol li > span:nth-child(2) {
        width: calc(100% - 24px);
      }
      
      main:not(.touch) .keyboard {
        display:none;
      } 

      main:not(.touch) .touchClues {
        display: none;
      }     

      main:not(.touch) .touchControls {
        display: none;  
      }


      /* ********** keyboard for touch screens*****  */   
    
      main.touch .touchControls {
          display: flex; 
          flex-direction: column; 
          width: 100%; /* relative to the .container div */
          max-width: 100%;
          z-index: 1;
      }  

      main.touch .keyboard {
        display: flex;
        position: relative;      
        z-index:1;
        flex-direction: column;
        justify-content: space-around;
        width: 100%; /* relative to the .touchControls div */
        height: 27vh; /* was 22vh; */
        max-height: 27vh; /* was 22vh; */
        min-height: 27vh; /* was 22vh; */
        overflow-y: visible; 
        padding: 2px 0;
        background-color: lightgrey;
        touch-action: none;
      }
        
      main.touch .keyboard .keyboard_row {
        display: flex;
        flex-direction: row; 
        justify-content: center;
        align-items: center;
        max-width: 100%;
        height: 30%;
        max-height: 30%;
        overflow-y: visible;
        margin-top: 1%;
      }      
        
      main.touch .keyboard .button {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 100%;
        margin: 1.5% 0.6%;
        outline: none;
        padding: 1% 0.5%;
        width: 8.5%; 
        text-align: center;
        background-color: #fff;
        border-radius: 3px;
        -webkit-box-shadow: 0 1px 1px 0 rgb(0 0 0 / 8%);
        box-shadow: 0 1px 1px 0 rgb(0 0 0 / 8%);
        color: #000;
        font: 300 3vw sans-serif;  
      }
        
      main.touch .keyboard .button.backspace {
        font-size: 8.5vw;
        padding-bottom: 5px;
        padding-right: 5px;
        color: white;
        width: 11%;
        background-color: darkgrey;
      }

      main.touch .keyboard .button.navigation {
        font-size: 8.5vw;
        width: 25%;
        background-color: darkgrey;
      }
        
      main.touch .keyboard .button.pressed {
        z-index: 2;
        font: normal 8vw sans-serif;
        animation: grow 0.2s backwards;
      }          
        
      @keyframes grow {
        50% {
          background-color: #fff;
          border-bottom: none;
          padding-top: 2%;
          padding-bottom: 8%;
          top: -10%;
        }
      }

      @media (max-width: 499px) {
        main.touch .keyboard .button {
            font-size: 7vw;
            height: 92%;
            margin: 2px;
        }
      }  
        
      main.touch .touchClues {
        display: flex;
        justify-content: space-between;
        align-items: stretch; /*center;/*
        width: 100%; /* relative to touchControls div */
        max-width: 100%;
        height: 7.5vh;
        max-height: 7.5vh;
        overflow: hidden;
        z-index:1;
        background-color:lightblue;
        touch-action: none;
      }
        
      main.touch .touchClues span.chevron {
        flex-grow: 1;
        font-size: 15vw; 
        line-height: 0.8;
        text-align: center;
        box-sizing: border-box;
        color: white;
        background-color: darkgrey;
      }
        
      main.touch .touchClues span.chevron.left {
        /* padding-left: 10px; */
      }
        
      main.touch .touchClues span.chevron.right {
        /* padding-left: 8px; */
      }
        
      main.touch .touchClues .clueText  {
        height: 100%;
        flex-basis: 70vw;
        max-width: 70vw;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
      }
        
      main.touch .touchClues .clueText .textContainer {
          width: auto;
          height: auto;
          position: absolute;
          top: 0;
      }
        
      main.touch .touchClues .clueText ol {
          list-style-type: none;
          margin-block-start: 0;
          margin-block-end: 0;
          padding-inline-start: 0;
      }
        
      main.touch .touchClues .clueText ol li {
          display:flex;
          justify-content: start;
          align-items: stretch; 
          height: 7.5vh;
          max-height: 7.5vh;
          width: 70vw;
          max-width: 70vw;
          box-sizing: border-box; 
          font-size: 5vw;
          user-select: none;
      }
        
      main.touch .touchClues .clueText ol li span {
          display: inherit;
          align-items: center;            
          overflow: hidden;
          box-sizing: border-box;
          user-select: none;
      }
        
      main.touch .touchClues .clueText ol li span:nth-child(1) {
        /* flex-basis: 50px;
        padding-left: 1vw;
        font-weight: bold;
        text-transform: uppercase;*/
        display: none;
      }
      
      main.touch .touchClues .clueText ol li span:nth-child(2) {
        padding-left: 1.5vw;
        line-height: 1.1;
        text-align: left;
        color: black;
      }      

      .hidden {
        width: 0;
        height: 0;
        pointer-events: none;
        opacity: 0.001;
        user-select: none;
      }

      .main:not(.touch) .sticky{
        display: none;
        width: 0;
        height: 0;
      }

      main.touch .sticky {
        /* position: -webkit-sticky;
        position: sticky;
        top: 0; */
        width: 100%;
        max-width: 100%;
        height: 30px;
        z-index: 3;
        background-color: yellow;
        font-size: 20px;
        border-bottom: solid 1px #ccc;
        will-change: transform; /* render the element in its own layer, improving repaint speed */   
      }

      .dialog-holder {
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%; /* this should be 90vh + 30px for the sticky header*/
        z-index: 10;
      }  

      .dialog-holder div[role="dialog"] {
        position: relative;
        width: 350px;
        max-height: 95%;
        max-width: 100%;
        margin: auto;
        padding: 5%;
        text-align: center;
        background-color: #fff;
        border-radius: 4px;
        -webkit-box-shadow: 0 3px 12px -1px rgb(0 0 0 / 30%);
        box-shadow: 0 3px 12px -1px rgb(0 0 0 / 30%);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;       
        outline: none;
        pointer-events: visible;
        z-index: 2;
        -webkit-transition: height 50ms ease-out;
        transition: height 50ms ease-out;
      }

      .dialog-holder .backdrop {
        position: absolute;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
        height: 100%;
        max-height: 100%;
        min-height: 100%;
        top: 0;
        left: 0;
        background-color: #fafafa;
        opacity: .86;
        z-index: -1; /* on the modal but behind the dialog with z-index-10 */
      }

      .dialog-holder button {
        max-width: 167px;
        width: 100%;
        min-height: 34px;
        margin-bottom: 4px;
        padding: 0.3em 1.5em 0;
        color: white;
        font-weight: 700;
        background-color: #4f85e5;
        border: none;
        border-radius: 37px;
        -webkit-box-shadow: 0 4px 0 0 #2860d8;
        box-shadow: 0 4px 0 0 #2860d8;
        color: #fff;
        letter-spacing: .5px;      
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        cursor: pointer;
        text-decoration: none;
        white-space: nowrap;
      }
 

    `;
  }

  static get properties() {
    return {
      resumeStatusMessage: { type: String },
      resumeStatusAction: { type: String }
    };
  }

  constructor() {
    super();

    this.dependencies = { 'listeners': [] }; // {evt.type: function}

    //@TODO checkServiceWorker for the status of the puzzle
    this.resumeStatusMessage = 'Ready to Start?';
    this.resumeStatusAction = 'Start';

    // Request an update in response to an event
    this.addEventListener('load-completed', async (e) => {
      console.log(e.detail.message);

      // requests an update when the event is dispatch after firstUpdate()
      console.log('first view update is requested:', await this.requestUpdate());

      // Register service worker if supported.//
      if ('serviceWorker' in navigator) { //@todo how will the service-worker script be added?
        navigator.serviceWorker.register('./service-worker.js');
      }
    });

    this.addEventListener('focus', () => {
      this.shadowRoot.querySelector('.dialog-holder').style.display = 'none';
      this._toggleTrap(false);
    }, true);

    this.addEventListener('blur', () => {
      this.shadowRoot.querySelector('.dialog-holder').style.display = 'block';
      this._toggleTrap(true);
    }, true);

    if (window.PointerEvent) {
      // Add Pointer Event Listener
      // allow click event on cell to bubble upwards to the svg 
      // clicks will be captured by the svg before the cells underneath it        
      this.addEventListener('pointerdown', evt => this._sendFocus(evt), false);// first let the event be captured by the children
    } else {
      // add Touch event
      this.addEventListener('touchstart', evt => this._sendFocus(evt), false);
      this.addEventListener('mousedown', evt => this._sendFocus(evt), false);
    }

  }

  render() {
    return html`
      <main tabindex="0">

        <div class="sticky"></div>

          <div class="container">

            <article aria-label="puzzle game">
              <section aria-label="puzzle grid">
                  <div class="board">
                      <svg viewBox="0 0 501 501" xmlns="http://www.w3.org/2000/svg" role="grid"
                          aria-labelledby="id-grid-layout">
                          <title id="id-grid-layout">Puzzle Grid</title>
                          
                          
                      </svg>
                  </div>
              </section>

              <section hidden aria-label="puzzle clues">
                  <div class="scrolls" hidden>
                  </div>
              </section>
          </article>

          <div class="touchControls">
            <div class="touchClues" aria-label="puzzle clues carousel">
              <span class="chevron left">&lsaquo;</span>
              <div class="clueText">
                  <div class="textContainer"></div>
              </div>
              <span class="chevron right">&rsaquo;</span>
            </div>
            <div class="keyboard">
            </div>
          </div>

        </div>
    </main>

    <div class="dialog-holder">
      <div class="backdrop"></div>
      <div role="dialog" aria-modal="true" aria-labelledby="formTitle" aria-describedby="dialogDescription">
        <h3 id="formTitle">${this.resumeStatusMessage}</h3>
        <div id="dialogDescription" hidden>Fill out the form in order to create a new skill</div>
        <button value="cancel" @click="${this._sendFocus}">${this.resumeStatusAction}</button>
      </div>
    </div>

  `;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log(this.shadowRoot);
  }


  firstUpdated() {
    super.firstUpdated();

    // create the view
    // init returns a Promise with all the functions that create the view
    (async function initialize(component) {

      await init(component);

      // get the parentElement of the component
      console.log(component.parentElement)

      // const { width, height, x, y } = this.parentElement.getBoundingClientRect();

      // use this for mobiles to override posistion
      component.main = component.shadowRoot.querySelector(`main`)
      const { width, height, x, y } = component.main.getBoundingClientRect();

      const cls = width > 850 ? `row` : `column`;
      component.shadowRoot.querySelector(`main article[aria-label="puzzle game"]`).classList.add(cls);

      // Must update!!
      // Event to trigger update

    })(this).then((resolved) => {
      let newMessage = new CustomEvent('load-completed', {
        detail: { message: 'load completed' }
      });

      // Custom DOM events which are fired on internal nodes in a shadow tree 
      // DO NOT bubble out of the shadow boundary unless the event is created using the composed: true flag
      // REF: https://developers.google.com/web/fundamentals/web-components/shadowdom#events
      this.dispatchEvent(newMessage); // the asks for an update
    });

  }

  //Use connectedCallback to register event handlers for outside your element’s template, 
  // but don’t forget to remove them in disconnectedCallback!: https://lit-element.polymer-project.org/guide/lifecycle
  disconnectedCallback() {
    super.disconnectedCallback();
    this._toggleTrap(true);
  }

  _sendFocus(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.main.focus();
    this._toggleTrap(false);
  }

  _toggleTrap(remove) {
    for (let listener of this.dependencies.listeners) {
      const [action] = Object.keys(listener);
      // we are assuming the external eventListeners are on Document!!
      if (remove) {
        document.removeEventListener(action, listener[action], true);
      } else {
        document.addEventListener(action, listener[action], true);
      }
    }
  }

}

customElements.define('cross-word', CrossWordElement);

