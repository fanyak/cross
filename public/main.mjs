import { init } from './component.mjs';
import { LitElement, css, html } from 'lit-element';

let flexDirectionRow = css`row`;
let flexDirectionColumn = css`column`;
let flexGridWidthRow = css`55%`;
let flexCluesWidthRow = css`45%`;
let flexGridWidthColumn = css`100%`;
let flexGridHeightRow = css`100%`;
let flexGridHeightColumn = css`60%`;
let flexCluesHeightRow = css`100%`;
let flexCluesHeightColumn = css`40%`;

class CrossWordElement extends LitElement {

  static get styles() {
    return css`
      main {
        width: 100%;
        max-width: 1150px;
      }      
      
      /* containing the element */
      main > div.container {
        position: relative;
        display:flex;
        flex-direction: column;
        height: 90vh; /* TODO!!!!!!!!!!!! */
        width: 100%; /* percentage of the container the app is placed in */
        max-width: 1150px;
        justify-content: space-between;
        overflow: hidden;
        font-family: "arial,sans-serif";      
      }

      main:not(.touch) > div.container {
        max-height: 660px;
      }

      main.touch > div.container {
        max-height: 90vh;
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
        height: auto;  /* for touch this is defined by puzzle grid height = 60vh*/
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
        max-height:  ${flexGridHeightColumn};
        min-height:  ${flexGridHeightColumn};
        overflow: hidden;
      }     
      
      main:not(.touch) article[aria-label="puzzle game"].row section[aria-label="puzzle grid"] {
        flex-basis: ${flexGridWidthRow};
        max-width:  ${flexGridWidthRow};
        height: ${flexGridHeightRow};
        max-height:  ${flexGridHeightRow};
        min-height:  ${flexGridHeightRow};
      }

      main.touch section[aria-label="puzzle grid"] {
        height: 60vh;
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

      @media screen and (max-width:700px) {

        main:not(.touch) article[aria-label="puzzle game"].row {
          flex-direction: ${flexDirectionColumn};
        }

        main:not(.touch) article[aria-label="puzzle game"].row section[aria-label="puzzle clues"] {
          flex-basis: ${flexGridWidthColumn};
          max-width:  ${flexGridWidthColumn}; /* same as grid */
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

      .board {
        position: absolute; /* RELATIVE TO: section[aria-label="puzzle grid"] */;
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
        height: 550px;
        max-height: 100%;
        user-select: none;
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
      }

      main:not(.touch) .scrolls:not([hidden]) > div {
        margin-left: 1vw;
      }

      main:not(.touch) .scrolls:not([hidden]) h4 {
        width: 95%;
        margin: 0px;
        padding-bottom: 5px;
        text-transform: uppercase;
        border-bottom: 1px solid rgb(204, 204, 204);
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
        line-height: 1.3;
        padding: 5px 1px;
        background: transparent;
        letter-spacing: 0.5px;
        font-size: 15px;    
      }
        
      main:not(.touch) .scrolls:not([hidden]) ol li > span:first-child {
        font-weight: bold;
        width: 20px;
        text-align: right;
        margin-right: 5px;
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
        height: 22vh;
        max-height: 22vh;
        min-height: 22vh;
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
        font-size: 7.5vw;
        padding-right: 5px;
        color: darkslategrey;
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
        align-items: center;
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
        line-height: 0.6;
        padding-bottom: 1.3vw;
        text-align: center;
        box-sizing: border-box;
        color: white;
      }
        
      main.touch .touchClues span.chevron.left {
        /* padding-left: 10px; */
      }
        
      main.touch .touchClues span.chevron.right {
        /* padding-left: 8px; */
      }
        
      main.touch .touchClues .clueText  {
        height: 100%;
        flex-basis: 72vw;
        max-width: 72vw;
        box-sizing: border-box;
        overflow: hidden;
      }
        
      main.touch .touchClues .clueText .textContainer {
          width: auto;
          height: auto;
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
          width: 72vw;
          max-width: 72vw;
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
        text-align: left;
      }      

      .hidden {
        width: 0;
        height: 0;
        pointer-events: none;
        opacity: 0.001;
        user-select: none;
      }        

    `;
  }

  constructor() {
    super();

    // Request an update in response to an event
    this.addEventListener('load-completed', async (e) => {
      console.log(e.detail.message);
      // requests an update when the event is dispatch after firstUpdate()
      console.log('first view update is requested:', await this.requestUpdate());
    });
  }

  render() {
    return html`
      <main>
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
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log(this.shadowRoot);
  }


  firstUpdated() {
    super.firstUpdated();

    // create the view
    init(this.shadowRoot);

    const { width, height, x, y } = this.parentElement.getBoundingClientRect();

    // use this for mobiles to override posistion
    console.log(this.shadowRoot.querySelector(`main`).getBoundingClientRect())

    const cls = width > 700 ? `row` : `column`;
    this.shadowRoot.querySelector(`main article[aria-label="puzzle game"]`).classList.add(cls);

    // Event to trigger update
    let newMessage = new CustomEvent('load-completed', {
      detail: { message: 'load completed' }
    });

    // Custom DOM events which are fired on internal nodes in a shadow tree 
    // DO NOT bubble out of the shadow boundary unless the event is created using the composed: true flag
    // REF: https://developers.google.com/web/fundamentals/web-components/shadowdom#events
    this.dispatchEvent(newMessage); // the asks for an update
  }

}

customElements.define('cross-word', CrossWordElement);

