import { init } from './component.mjs';
import { LitElement, css, html } from 'lit-element';

class CrossWordElement extends LitElement {

    static get styles() {
        return css`
        :root {
            --black: rgba(0, 0, 0, 0.692);
            /*--lt-grey: #f5f7f7;*/
            --lt-grey: #f8f8f8;
            --med-grey: #999;
            --dk-grey: #444;
            /*--wh-blue: #f2f9ff;*/
            --lt-blue: #def1ff;
            --lt-blue-mono: #ededed;
            --med-blue: #55b8fe;
            --dk-blue: #0181dc;
            --dk-blue-mono: #656565;
            --green: #00ff00;
            --red: #ff3333;
          }
        
         
          
          body {
            font-family: "arial,sans-serif";
            /* font-family: 'Libre Franklin', sans-serif; */
          }
        
          /* containing the whole page */
          main > div:first-child {
            position: relative;
            display:flex;
            flex-direction: column;
            height: 90vh; /* TODO!!!!!!!!!!!! */
            /* width: calc(100vw - 16px);  calculating margin 8px on each side */
            width: fit-content;
            justify-content: space-between;
            overflow: hidden;
          }
        
          article[aria-label="puzzle game"] {
            display: flex;
            width: 100%;  /* relevant to the main div */
            height: 100%;
            max-width: 100%;
            max-height: 100%;
            flex-wrap: wrap;
          }
        
          section[aria-label="puzzle grid"], section[aria-label = "puzzle clues"] {
            /* display: inline-block; */
          }
        
          /* containing the svg */
          section[aria-label="puzzle grid"] {
            position: relative;
            height: 60vh;
            flex-basis: 100%; /* mobile first */
            max-width: 100%;
            overflow: hidden
          } 
        
          /* VERY SMALL PHONES */
          
          @media screen and (max-width: 320px) {
            section[aria-label="puzzle grid"] {
              height: auto;
              /* flex-grow: 1; */
            }
          
            section[aria-label="puzzle clues"] {
              font-size: 13px;
            }
        
            .scrolls ol::-webkit-scrollbar {
              width: 8px;
            }
          }
        
          
        @media screen and (min-width:768px) and (max-width:1199px) {
          section[aria-label="puzzle grid"] {
            flex-basis: 50%;
            /* flex-grow: 1; */
          }
        
          section[aria-label="puzzle clues"] {
            flex-basis: 50%;
          }
        }
        
              
         @media screen and (min-width: 1200px) {
        
          main {
            font-size: 15px;
            box-sizing: border-box;
          }
        
          main > div:first-child {
            /* width: 80vw; check syndication */
          }
        
          article[aria-label="puzzle game"] {
            height: 100%; /* percentage of the main div for desktop when we don't show controls*/
            min-height: 100%;    
            justify-content: center;
        
          }
          
          section[aria-label="puzzle grid"] {
            flex-basis: 50%;
            height: 65vh;    
            max-height: 65vh; 
            min-height: 65vh; 
          }
        
          section[aria-label="puzzle clues"] {
            flex-basis: 50%;
            /* percentage of the main > div for desktop when we don't show controls   */    
          }
        
        } /* end of media */
        
        
        /* scrolls */
        .scrolls:not([hidden]) {
          display: flex;
          justify-content:space-around; 
        }
        
        .scrolls:not([hidden]) > div {
          margin-left: 1vw;
        }
        
        .scrolls:not([hidden]) ol {   
          height: calc(20vh - 30px);
          min-height: calc(20vh - 30px);
          max-height: calc(20vh - 30px);
          font-size: 1vw;
          list-style-type: none;    
          padding-inline-start: 0;
          padding-left: 0;
          overflow-y: scroll;
          list-style-type: none;
          font-size: inherit;
          box-sizing: border-box;
        }
        
        @media screen and (min-width: 768px){
          .scrolls:not([hidden]) ol {   
            height: calc(80vh - 30px);
            min-height: calc(80vh - 30px);
            max-height: calc(80vh - 30px);  
          }
        }
          
        .scrolls ol li {
          border-left: 10px solid transparent;
          cursor: pointer;
          display: flex;
          padding-right: 1vw;
          box-sizing: border-box;
        }
        
        .scrolls h4 {
          width: 95%;
          margin: 0;
          padding-bottom: 5px;
          text-transform: uppercase;
          border-bottom: solid 1px #ccc;
        }
        
        .scrolls ol li.activeClue {
          border-left: 10px solid transparent;
          cursor: pointer;
          display: flex;
          background-color: lightblue;
        }
        
        .scrolls ol li.highlightedClue {
          border-color: lightblue;
        }
        
        .scrolls ol li span {
          line-height: 1.3;
          padding: 5px 1px;
          background: transparent;
        }
        
        .scrolls ol li > span:first-child {
          font-weight: bold;
          width: 20px;
          text-align: right;
          margin-right: 5px;
          box-sizing: border-box;
        }
        
        .scrolls ol li > span:nth-child(2) {
          width: calc(100% - 24px);
        } 
        
        
        @media screen and (min-width: 1200px) {
          .scrolls ol::-webkit-scrollbar {
            width: 12px;
            /* height: 5px; */
            border-radius: 4px;
            background-color:#ddd; /* or add it to the track */
          }
          
          .scrolls ol::-webkit-scrollbar-thumb {
            background: #aaa ;
            border-radius: 3px;
          }
        }
        
        
        .board {
          position: absolute; /* RELATIVE TO: section[aria-label="puzzle grid"] */
          top: 1px;
          left: 1px;
          right: 1px;
          bottom: 1px;
          box-sizing: border-box;
          transition: transform 0s ease-in-out 0s;  /* name duration transition function delay */
          transform: translate(0px, 0px) scale(1);
          touch-action: none; /*Disable browser handling of all panning and zooming gestures.*/
          user-select: none;
          -webkit-user-drag: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        
          
        @media (min-width: 1399px) {
          .board {
            /* justify-content: space-between; */
            top: 0;
            left:0;
            right: unset;
            bottom: unset;    
          }
        }
        
        /* mobile first */
        svg {
          display: block;
          width: 100%;
          max-width: 100%; 
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
        
        @media (min-width: 1399px) {
          svg {
            /* width: 100%; */
            width: 501px;
            height: 501px;
          }
        }
        
        /* @media (max-width: 1398px) and (min-height: 700px) {
          svg {
            height: 100%;
          }
        } */
        
        
        .hidden {
          width: 0;
          height: 0;
          pointer-events: none;
          opacity: 0.001;
          user-select: none;
        }
        
        .keyboard:not(touch) {
          display:none;
        } 
        
        .keyboard.touch {
          position: relative;
          /* bottom:0;
          left:0; */
          z-index:1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 100%;
          height: 22vh;
          max-height: 22vh;
          min-height: 22vh;
          overflow-y: visible; 
          padding: 2px 0;
          background-color: lightgrey;
          touch-action: none;
        }
        
        .keyboard.touch .keyboard_row {
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
        
        .keyboard.touch .button {
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
        
        .keyboard.touch .button.backspace {
          font-size: 7.5vw;
          padding-right: 5px;
          color: darkslategrey;
        }
        
        .keyboard.touch .button.pressed {
          z-index: 2;
          font: normal 8vw sans-serif;
          animation: grow 0.3s backwards;
        }
        
        @media (max-width: 499px) {
          .keyboard.touch .button {
              font-size: 7vw;
              height: 92%;
              margin: 2px;
          }
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
        
        
        .touchClues {
          display: none;
        }
        
        .touchClues.touch {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 100%;
          height: 7.5vh;
          max-height: 7.5vh;
          overflow: hidden;
          z-index:1;
          background-color:lightblue;
          touch-action: none;
        }
        
        .touchClues.touch span.chevron {
          flex-grow: 1;
          font-size: 15vw; 
          line-height: 0.6;
          padding-bottom: 1.3vw;
          text-align: center;
          box-sizing: border-box;
          color: white;
        
        }
        
        .touchClues.touch span.chevron.left {
          /* padding-left: 10px; */
        }
        
        .touchClues.touch span.chevron.right {
          /* padding-left: 8px; */
        }
        
        .touchClues.touch .clueText  {
          height: 100%;
          flex-basis: 72vw;
          max-width: 72vw;
          box-sizing: border-box;
          overflow: hidden;
        }
        
        .touchClues.touch .clueText .container {
          width: auto;
          height: auto;
        }
        
        .touchClues.touch .clueText ol {
          list-style-type: none;
          margin-block-start: 0;
          margin-block-end: 0;
          padding-inline-start: 0;
        }
         
        .touchClues.touch .clueText ol li {
          display:flex;
          justify-content: start;
          align-items: stretch; 
          height: 7.5vh;
          max-height: 7.5vh;
          width: 72vw;
          max-width: 72vw;
          box-sizing: border-box; 
          font-size: 4.5vw;
          user-select: none;
        }

        .touchClues.touch .clueText ol li span {
            display: inherit;
            align-items: center;            
            overflow: hidden;
            box-sizing: border-box;
            user-select: none;
        }
        
        .touchClues.touch .clueText ol li span:nth-child(1) {
          flex-basis: 50px;
          padding-left: 1vw;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .touchClues.touch .clueText ol li span:nth-child(2) {
          padding-left: 1.5vw;
          text-align: left;
        }
        
        
        .touchControls {
          display: none;  
        }
        
        .touchControls.touch {
          display: flex; 
          flex-direction: column; 
          z-index: 1;
        }
        
        
        
        `;
    }

    constructor() {
        super();

        // Request an update in response to an event
        this.addEventListener('load-complete', async (e) => {
            console.log(e.detail.message);
            //console.log(e.detail.message.getBoundingClientRect())
            console.log(await this.requestUpdate());
        });
    }

    render() {
        return html`
        <main>
        <div>

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
                        <div class="container"></div>
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
        console.log(this.shadowRoot)

    }

    firstUpdated() {
        super.firstUpdated();
        init(this.shadowRoot);


        let newMessage = new CustomEvent('load-complete', {
            detail: { message: 'load completed' }
        });

        // Custom DOM events which are fired on internal nodes in a shadow tree 
        // DO not bubble out of the shadow boundary unless the event is created using the composed: true flag:
        // https://developers.google.com/web/fundamentals/web-components/shadowdom#events

        this.dispatchEvent(newMessage);
    }

}

customElements.define('cross-word', CrossWordElement);

