import { Crossword, Variable } from './cross.mjs';
import { not, isHiddenNode } from './helper.mjs';
import { Action } from './action.mjs';
import { createKeys, extractKeyEvent } from './keyboard.mjs';


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


let direction = 'across'; // initial direction setting
const startOfWordCells = []; // this is in the order of the word indices for the display cells

const svgNamespace = 'http://www.w3.org/2000/svg';

const main = document.querySelector('main');
const svg = document.querySelector('svg');

const hasTouch = navigator.maxTouchPoints < 1; 


Promise.all(files.map(file => fetch(file)))
    .then( responses => Promise.all( responses.map( response => response.json() ) ) )
    .then(([structure, words]) => new Crossword(structure, words, ...crosswordDimentions))
    .then((crossword) => makeCells(crossword)) 
    .then ((crossword) => makeGrid(crossword)) 
    .then((crossword) => addActions(crossword))
    .then((actionInstance) => displayKeyboard(actionInstance))              
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

    const action = new Action(crossword, direction, startOfWordCells);
    const activate = action.activate.bind(action);
    const keydown = action.keydown.bind(action);  
   
   if (window.PointerEvent) {

    // Add Pointer Event Listener
        // allow click event on cell to bubble upwards to the svg 
        // clicks will be captured by the svg before the cells underneath it        
        svg.addEventListener('pointerdown', activate, true);
    } else {
        // add Touch event
        svg.addEventListener('touchstart', activate, true);
        svg.addEventListener('mousedown', activate, true);
    }
   
    // @ TODO: DO we need this when we have a touch screen?
    // Trap key Events!
    document.addEventListener('keydown', (evt) => {
        evt.preventDefault();
        // @ TODO replace the target check if it is out of functional elements
        if(!action.selected && evt.key == 'Tab') {
            const cell = document.querySelector('#cell-id-0');
            if (window.PointerEvent) {
                 cell.dispatchEvent(new Event('pointerdown', {bubbles: true}));
            } else {
                // send to one of the eventListeners that we have set in this case
                cell.dispatchEvent(new Event('mousedown', {bubbles: true}));
            }
            return;
        }
        if(action.selected) {
            const { key, code, type, shiftKey } = evt;  
            // Sythesized event      
            // keydown({target: action.selected, id:action.selected.id, key, code, type, shiftKey});            
            keydown({key, code, type, shiftKey});
        }
    }, true);

    // return the action instance 
    return action;
}

function displayKeyboard(actionInstance){
    const keyboard = document.querySelector('.keyboard');

    if (navigator.maxTouchPoints < 1) {
        // browser supports multi-touch
        keyboard.classList.remove('touch');
    } else {
        console.log('touch');

        const keydown = actionInstance.keydown.bind(actionInstance);
        const handleEvent = (evt) => keydown(extractKeyEvent(evt));

        Promise.resolve(createKeys())
                .then((_) => {
                    let screenAction = '';
                    if (window.PointerEvent) {
                        // Add Pointer Event Listener
                            // allow click event on cell to bubble upwards to the svg 
                            // clicks will be captured by the svg before the cells underneath it
                            screenAction = 'pointerdown';       
                            keyboard.addEventListener('pointerdown', handleEvent, true);
                        } else {
                            // add Touch event
                            keyboard.addEventListener('touchstart', handleEvent, true);
                            screenAction = 'touchstart';
                        }

                    if(!actionInstance.selected) {
                        const cell = document.querySelector('#cell-id-0');
                        cell.dispatchEvent(new Event(screenAction, {bubbles: true}));
                        return;
                    }
            
                }).catch(console.error);
       
    }


}



