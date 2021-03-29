import { Crossword, Variable } from './cross.mjs';
import { not, isBlackCell, getCellNumber, isHiddenNode, isLetterEnglish, fillBlue, fillWhite, fillYellow, getCellVariable, getCellCoords } from './helper.mjs';

const crosswordDimentions = [15,15];
const files = ['api/grids/1', 'api/words/'];
// @TODO how dow we choose size?
const cellSize = 33;
const gridSpan = 495;
const padding = 3;
const letterFontSize = 22;
const indexSize = 11;
const letterPaddingLeft = cellSize*0.25; 
const letterPaddingTop = cellSize*0.85;
const wordIndexPaddingLeft = padding/1.5; 
const wordIndexPaddingTop = padding*3.5;



let direction = 'across';
const startOfWordCells = []; // this is in the order of the number indices

const svgNamespace = 'http://www.w3.org/2000/svg';

const main = document.querySelector('main');
const svg = document.querySelector('svg');

Promise.all(files.map(file => fetch(file)))
    .then( responses => Promise.all( responses.map( response => response.json() ) ) )
    .then(([structure, words]) => new Crossword(structure, words, ...crosswordDimentions))
    .then((crossword) => makeCells(crossword)) 
    .then ((crossword) => makeGrid(crossword)) 
    .then((crossword) => addActions(crossword))               
    .catch((err) => {
    console.log(err); // @ TODO handle the error
});

// REF: https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/
function makeGrid(crossword) {

    const cellWidth = cellSize, cellHeight = cellWidth; 

    const grid = document.createElementNS(svgNamespace, 'g');
    grid.setAttributeNS(null, 'data-group', 'grid');

    // create the grid using a path element
    const path = document.createElementNS(svgNamespace, 'path');
    let d = '';
    // create  horizontal lines
    for (let i = 0; i< crossword.height-1; i++) {
        d += `M${padding},${((i+1)*cellHeight) + padding} l${gridSpan},0 `;
    }
    // create  vertical lines
    for (let i = 0; i< crossword.width-1; i++) {
        d += `M${((i+1)*cellHeight) + padding},${padding} l0,${gridSpan} `;
    }

    path.setAttributeNS(null, 'd', d);   
    path.setAttributeNS(null, 'stroke', 'dimgray');
    path.setAttributeNS(null,'vector-effect', 'non-scaling-stroke');
    
    grid.appendChild(path);

    // create the outlines
    const outline = document.createElementNS(svgNamespace, 'rect');
    outline.setAttributeNS(null, 'width', gridSpan + padding);
    outline.setAttributeNS(null, 'height', gridSpan + padding);
    outline.setAttributeNS(null, 'x', padding/2);
    outline.setAttributeNS(null, 'y', padding/2);
    outline.setAttributeNS(null, 'stroke', 'black');
    outline.setAttributeNS(null, 'stroke-width', padding);
    outline.setAttributeNS(null, 'fill', 'none');    

    grid.appendChild(outline);

    svg.appendChild(grid);

    return crossword;
   
}

function makeCells(crossword) {
    let rectWidth, rectHeight;
    const variables = Array.from(crossword.variables);
    let counter = 1;

    const rowGroup = document.createElementNS(svgNamespace, 'g');
    rowGroup.setAttributeNS(null, 'data-group', 'cells');
    rowGroup.setAttributeNS(null, 'role', 'rowgroup');
    //console.log(variables);
     for (let i = 0; i< crossword.height; i++) {

        const row = crossword.structure[i];

        for (let j= 0; j<crossword.width; j++) {

            const cellGroup = document.createElementNS(svgNamespace, 'g');
            cellGroup.setAttributeNS(null, 'role', 'row');

            const wordIndex = document.createElementNS(svgNamespace, 'text');
            wordIndex.setAttributeNS(null, 'x', (j*cellSize)+padding + wordIndexPaddingLeft);
            wordIndex.setAttributeNS(null, 'y', (i*cellSize)+padding + wordIndexPaddingTop);
            wordIndex.setAttributeNS(null, 'stroke', 'black');
            wordIndex.setAttributeNS(null, 'stroke-width', '0.2');
            wordIndex.setAttributeNS(null, 'style', `font-size: ${indexSize}px`)  ;   



            const letter = document.createElementNS(svgNamespace, 'text');
            letter.setAttributeNS(null, 'x', (j*cellSize)+padding + letterPaddingLeft);
            letter.setAttributeNS(null, 'y', (i*cellSize)+padding + letterPaddingTop);
            letter.setAttributeNS(null,'stroke', 'black');
            letter.setAttributeNS(null, 'stroke-width', '0.3'); 
            letter.setAttributeNS(null, 'id', `letter-id-${i*crossword.width + j}`);
            letter.setAttributeNS(null, 'style', `font-size: ${letterFontSize}px`)  ;   

            // Help for Aria 
            const ariaLetter = document.createElementNS(svgNamespace, 'text');
            ariaLetter.setAttributeNS(null, 'aria-live', 'polite');
            ariaLetter.classList.add('hidden');
            letter.appendChild(ariaLetter);

            const cell = document.createElementNS(svgNamespace, 'rect');  
            cell.setAttributeNS(null, 'id', `cell-id-${i*crossword.width + j}`);

            if( !row[j] ) { 
                rectWidth = cellSize, rectHeight=rectWidth;          
                cell.setAttributeNS(null, 'x', (j*cellSize)+padding);
                cell.setAttributeNS(null, 'y', (i*cellSize)+padding);
                cell.setAttributeNS(null, 'fill','#333');
                cell.classList.add('black');
            } else {
                cell.setAttributeNS(null, 'id', `cell-id-${i*crossword.width + j}`);
                const selectedVariables = variables.filter(v => v.cells.find( cell => Variable.isSameCell(cell, [i,j]) ) );
                for(let selectedVariable of selectedVariables) {
                    cell.setAttributeNS(null, `data-variable-${selectedVariable.direction}`, `${selectedVariable.i}-${selectedVariable.j}`);
                }
                rectWidth = cellSize-2, rectHeight=rectWidth; // account for stroke width of the grid
                cell.setAttributeNS(null, 'x', (j*cellSize)+padding + 1); // account for stroke width of the grid
                cell.setAttributeNS(null, 'y', (i*cellSize)+padding + 1);          
                cell.setAttributeNS(null, 'fill','#fff'); // should be transparent? => fil = none
                const isStartOfWord = variables.find(v => v.i == i && v.j == j);
                if(isStartOfWord) {          
                    wordIndex.textContent = counter;
                    startOfWordCells.push({cell, direction: isStartOfWord.direction});
                    counter++;
                }
            }  
            cell.setAttributeNS(null, 'width', rectWidth);
            cell.setAttributeNS(null, 'height', rectHeight);
            cell.setAttributeNS(null, 'stroke', 'none'); 

            // ARIA LABELS
            cell.setAttributeNS(null, 'role', 'gridcell');
            
            cellGroup.appendChild(cell); // the most deeply nested element will catch the events in the capturing phase
            cellGroup.appendChild(wordIndex);
            cellGroup.appendChild(letter);

            
            //letter.textContent = 'A';            
            rowGroup.appendChild(cellGroup);            
        }
    }
    svg.appendChild(rowGroup);
    return crossword;
}

function addActions(crossword) {
    // CLOSURE
    let selected;
    let rafPending;
    // this is static once the crossword is complete, don't recalculate it every time - use it from the closure
    const cells = [...document.querySelectorAll('svg [id*="cell-id"]')]; 
    const activeCells = cells.filter(not(isBlackCell));
    const variables = Array.from(crossword.variables);

    // const textCells =[...document.querySelector(`svg [id*="leter-id"`)];
    // const hiddenTextCells = [...document.querySelector(`svg [id*="letter-id"].hidden`)];
   // const startOfWordCellsReversed = [...startOfWordCells].reverse();  
   
    // trap keyevents after the 1st one?
    document.addEventListener('keydown', (evt) => {
        evt.preventDefault();

        console.log(evt);
        // @ TODO replace the target check if it is out of functional elements
        if(!selected && evt.key == 'Tab') {
            const cell = document.querySelector('#cell-id-0');
            cell.dispatchEvent(new Event('pointerdown', {bubbles: true}));
            return;
        }
        if(selected) {
            console.log(evt);
            const {key, code, type, shiftKey} = evt;
            keydown({target: selected, id:selected.id, key, code, type, shiftKey});
        }
    }, true);
    

    function keydown(evt) { 
        // if not manually sent from an event on the body 
        if(evt instanceof Event) {
            console.log(evt);
            evt.preventDefault();
        } 

      
        const cellId = evt.target.id;
        const cellNumber = getCellNumber(evt.target);

        // edit cell content
        const char = isLetterEnglish(evt.key);
        
        if(char) {
            const [text, hiddenText] = removeExistingContent(cellId);
            // replace or add content in the cell
            const letter = evt.key.toUpperCase();
            const content = document.createTextNode(letter);
            text.appendChild(content);
            hiddenText.textContent = letter; 

            if(direction == 'across'){
                moveToCell(cellNumber, 1);
            } else {
                moveToCell(cellNumber, 15);
            } 
            return;
        }

        if(['Delete','Backspace'].includes(evt.key)) {

            const [ , , existingContent] = removeExistingContent(cellId);       
               
            if(evt.key == 'Backspace') { 
                let next;
                if(direction == 'across'){
                    next = moveToCell(cellNumber, -1);
                } else {
                    next = moveToCell(cellNumber, -15);
                }
                if(next && !existingContent) {
                   // if the cell where we clicked backspace was empty, delete the previous cell contents
                    const nextCellId = next.id;
                    removeExistingContent(nextCellId);
                }
            }
           return;
        }  
        
        // navigate actions 

        if(evt.key == 'ArrowDown') {
            // const nextId = cellNumber + crossword.width;
            moveToCell(cellNumber, crossword.width);
            return;
        }
        if(evt.key == 'ArrowUp') {
            // const nextId = cellNumber -crossword.width;
            moveToCell(cellNumber, -crossword.width);
            return;
        }
        if(evt.key == 'ArrowLeft') {
            //const nextId = cellNumber - 1;
            moveToCell(cellNumber, -1);
            return;
        }
        if(evt.key == 'ArrowRight') {
            // const nextId = cellNumber + 1;
            moveToCell(cellNumber, 1);
            return;
        }

        if(evt.key == 'Tab') {
            let next;
            const currentIndex = startOfWordCells.findIndex(({cell}) => getCellVariable(cell, direction) == getCellVariable(evt.target, direction));
            if(evt.shiftKey) {
                // go back 1 word
                // next = startOfWordCellsReversed.find(({cell}) => getCellNumber(cell) < cellNumber);
                const anchor = currentIndex == 0 ? startOfWordCells.length : currentIndex;
                next = startOfWordCells[anchor - 1];

             } else {
                // go to next word
               // next = startOfWordCells.find(({cell}) => getCellNumber(cell) > cellNumber);
                const anchor = currentIndex == startOfWordCells.length -1 ? -1 : currentIndex;
                next = startOfWordCells[anchor + 1];
            } 
            if(next) {                
                direction = next.direction;
                // synchronous dispatch : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
                  // :dispatchEvent() invokes event handlers synchronously

                // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#event_bubbling
                    //: trigger an event from a child element, and have an ancestor catch it(svg will catch it)
                next.cell.dispatchEvent(new Event('pointerdown'), {bubbles: true});
            } 
            return;     
        }             
    }

     if (window.PointerEvent) {
    // Add Pointer Event Listener
    // allow click event on cell to bubble upwards to the svg 
        // clicks will be captured by the svg before the cells underneath it
        svg.addEventListener('pointerdown', startInteraction, true);
    } else {
        // add Touch event
        svg.addEventListener('touchstart', startInteraction, true);
        svg.addEventListener('mousedown', startInteraction, true);
    }
   

    function startInteraction(evt) {
        console.log(evt);
        evt.preventDefault();

        const el = document.getElementById(evt.target.id);

        if(el && el.id.includes('cell') && not(isBlackCell)(el)) {

            selected = el;
            console.log(document.activeElement);
            updateUI();
            if(rafPending) {
                return;
            }
            
            rafPending = true;
            window.requestAnimationFrame(updateUI);
        }        

    }

    function updateUI() {
        console.log(selected);
        
        if(!rafPending) {
            return;
        }
    
        // get the coords of the selected = variable
        const selectedVariableCoords = getCellVariable(selected, direction); // selected.getAttribute(`data-variable-${direction}`);           

        // get the cells that belong to the same variable as the selected         
        // const refCells = [...document.querySelectorAll(`svg [data-variable-${direction}="${selectedVariableCoords}"]`)];
        const refCells = activeCells.filter(cell => getCellVariable(cell,direction) == selectedVariableCoords );

        activeCells.forEach(makeCellAriaLabel);

        const notInSelectedCells = activeCells.filter(cell => !refCells.includes(cell));
        notInSelectedCells.forEach(fillWhite);
        refCells.forEach(fillBlue);
        fillYellow(selected);

        //rafPending = false;
    }
             
    function makeCellAriaLabel(cell) {
        const selectedCellNumber = getCellNumber(selected);
        const i = Math.floor(selectedCellNumber / crossword.height);
        const j = selectedCellNumber%crossword.width;
       // const cellCoords = getCellCoords(selected, crossword.width, crossword.height);
        const cellVariable = getCellVariable(selected, direction).split('-'); //selected.getAttribute(`data-variable-${direction}`).split('-');
        const variable = variables.find(v => Variable.isSameCell([v.i, v.j], cellVariable) && v.direction == direction );

        const letterIndex = variable.cells.findIndex(cell => Variable.isSameCell([i,j], cell));
        const wordLengthDesc = `${variable.length} letters`;
        const prefix = `${direction[0]}`.toUpperCase();        
        const wordNumber = startOfWordCells
                        .findIndex( ({cell}) => getCellVariable(cell, direction) == getCellVariable(selected, direction) );
        
        cell.setAttributeNS(null, 'aria-label', `${prefix}${wordNumber + 1}: clue, Answer: ${wordLengthDesc}, Letter ${letterIndex + 1}`);   
    }

  
    function moveToCell(cellNumber, diff) {
        
        let nextId = cellNumber+diff;
        let next = document.getElementById(`cell-id-${nextId}`);
            while(next && isBlackCell(next)) {
                nextId += diff;
                next = document.getElementById(`cell-id-${nextId}`);
            }
            if(next) {
                 // synchronous dispatch : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
                next.dispatchEvent(new Event('pointerdown'), {bubbles: true,});
                // @TODO add new Event support for IE 11?
            }
        return next;
    }

    function removeExistingContent(cellId) {
        const letterId = cellId.replace('cell', 'letter');
        const text = document.querySelector(`#${letterId}`);
        const hiddenText = document.querySelector(`#${letterId} .hidden`);

        const content = [...text.childNodes].find(not(isHiddenNode));
        if (content) {
            text.removeChild(content);
        }
        return ([text, hiddenText, content]);
    }

   

}

