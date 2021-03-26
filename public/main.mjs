import { Crossword, Variable } from './cross.mjs';
import { not, isBlackCell, getCellNumber } from './helper.mjs';

const crosswordDimentions = [15,15];
const files = ['api/grids/1', 'api/words/'];
// @TODO how dow we choose size?
const cellSize = 33;
const gridSpan = 495;
const padding = 3;
const LetterFontSize = 22;
const indexSize = 11;
const letterPaddingLeft = cellSize*0.25; 
const letterPaddingTop = cellSize*0.85;
const wordIndexPaddingLeft = padding/1.5; 
const wordIndexPaddingTop = padding*3.5;



let direction = 'across';
const startOfWordCells = []; // this is in the order of the number indices

const svgNamespace = 'http://www.w3.org/2000/svg';

const main = document.querySelector('main');
const svg = document.querySelector('SVG');

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
    rowGroup.setAttribute('data-group', 'cells');
    //console.log(variables);
     for (let i = 0; i< crossword.height; i++) {

        const row = crossword.structure[i];

        for (let j= 0; j<crossword.width; j++) {

            const cellGroup = document.createElementNS(svgNamespace, 'g');

            const wordIndex = document.createElementNS(svgNamespace, 'text');
            wordIndex.setAttributeNS(null, 'x', (j*cellSize)+padding + wordIndexPaddingLeft);
            wordIndex.setAttributeNS(null, 'y', (i*cellSize)+padding + wordIndexPaddingTop);
            wordIndex.setAttributeNS(null, 'stroke', 'black');
            wordIndex.setAttributeNS(null, 'stroke-width', '0.2'); 
            wordIndex.style.fontSize = indexSize;
            wordIndex.style.pointerEvents = 'none'; // disable interacting with this svg element


            const letter = document.createElementNS(svgNamespace, 'text');
            letter.setAttributeNS(null, 'x', (j*cellSize)+padding + letterPaddingLeft);
            letter.setAttributeNS(null, 'y', (i*cellSize)+padding + letterPaddingTop);
            letter.setAttributeNS(null,'stroke', 'black');
            letter.setAttributeNS(null, 'stroke-width', '0.3'); 
            letter.setAttributeNS(null, 'id', `letter-id-${i*crossword.width + j}`);        
            letter.style.fontSize = LetterFontSize;
            letter.style.pointerEvents = 'none'; // disable interacting with this svg element

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
                    cell.setAttributeNS(null, 'tabIndex', i*crossword.width + j);

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
    // closure
    let selected;
    // const variables = Array.from(crossword.variables);


       // @TODO add mobile integration

    function listenTokey(evt) {        
       evt.target.addEventListener('keydown', keydown, true) ;
    }

    function keydown(evt) {  
        evt.preventDefault();
      
        const cellId = evt.target.id;
        const variables = Array.from(crossword.variables);
    
        if(/^[A-Za-z]{1}$/.test(evt.key)){
            const letterId = cellId.replace('cell', 'letter');
            const text = document.querySelector(`#${letterId}`);
            text.textContent = evt.key.toUpperCase();
        }           
        if(evt.key == 'ArrowDown') {
            const nextId = parseInt(cellId.split('-')[2]) + crossword.width;
            const next = document.getElementById(`cell-id-${nextId}`);
            if(next) {
                next.dispatchEvent(new Event('click'));
            }
        }
        if(evt.key == 'ArrowUp') {
            const nextId = parseInt(cellId.split('-')[2]) - crossword.width;
            const next = document.getElementById(`cell-id-${nextId}`);
            if(next) {
                next.dispatchEvent(new Event('click'));
            }
        }
        if(evt.key == 'ArrowLeft') {
            const nextId = parseInt(cellId.split('-')[2]) - 1;
            const next = document.getElementById(`cell-id-${nextId}`);
            if(next) {
                next.dispatchEvent(new Event('click'));
            }
        }
        if(evt.key == 'ArrowRight') {
            const nextId = parseInt(cellId.split('-')[2]) + 1;
            const next = document.getElementById(`cell-id-${nextId}`);
            if(next) {
                next.dispatchEvent(new Event('click'));
            }
        }

        if(evt.key == 'ArrowRight') {
            const nextId = parseInt(cellId.split('-')[2])  + 1;
            const next = document.getElementById(`cell-id-${nextId}`);
            if(next) {
                next.dispatchEvent(new Event('click'));
            }
        }
        if(evt.key == 'Tab') {
            let next;
            const currentNumber = getCellNumber(evt.target);
            if(evt.shiftKey) {
                next = [...startOfWordCells].reverse().find(({cell}) => getCellNumber(cell) < currentNumber);
             } else {
                next = startOfWordCells.find(({cell}) => getCellNumber(cell) > currentNumber);
            } 
            console.log(next);            
            if(next) {                
                direction = next.direction;
                next.cell.dispatchEvent(new Event('click'));
            }      
        }

        if(evt.key == 'Delete' || evt.key == 'Backspace') {
            const letterId = cellId.replace('cell', 'letter');
            const text = document.querySelector(`#${letterId}`);
            text.textContent = "";
        }

            
    }

  

    svg.addEventListener('click', (evt) => {
        evt.preventDefault();
        const el = document.getElementById(evt.target.id);

        if(el && el.id.includes('cell') && not(isBlackCell)(el)) {

            // if a selected already exists, then remove the selection
            if(selected) {
                selected.blur();
                selected.removeEventListener('focus',listenTokey, false);
                selected.removeEventListener('keydown',keydown, true);
            }
            //set new selected value
            selected = el;
            selected.addEventListener('focus',listenTokey, false);

            const variable = selected.getAttribute(`data-variable-${direction}`);

            const all = [...document.querySelectorAll('[id*="cell-id"]')].filter(not(isBlackCell));
            const refs = [...document.querySelectorAll(`[data-variable-${direction}="${variable}"]`)];
            all.forEach(cell => { cell.setAttributeNS(null, 'fill', '#fff'); } );
            refs.forEach(ref => { ref.setAttributeNS(null, 'fill', 'lightblue'); } );
            selected.setAttributeNS(null, 'fill', 'yellow');

            selected.focus();
        }        

    }, true);  // allow click event on cell to bubble upwards to the svg 
             // clicks will be captured by the svg before the cells underneath it

    
}

