// REF https://v8.dev/features/modules
class Variable {

    constructor(i, j, direction, length) {
        ///Create a new variable with starting point, direction, and length."""
        this.i = i;
        this.j = j;
        this.direction = direction;
        this.length = length;
        this.cells = [];
        for (let k = 0; k < this.length; k++) {
            this.cells.push(
                [this.i + (this.direction == Variable.DOWN ? k : 0),
                this.j + (this.direction == Variable.ACROSS ? k : 0)]
            );
        }
    }

    equals(other) {
        return (
            (this.i == other.i) &&
            (this.j == other.j) &&
            (this.direction == other.direction) &&
            (this.length == other.length)
        );
    }

    toString() {
        return `(${this.i}, ${this.j}, '${this.direction}', ${this.length})`;
    }

    intersection(other) {
        let _intersection;
        for (let elem of other.cells) {
            if (this.cells.find(cell => Variable.isSameCell(elem, cell))) {
                _intersection = elem;
            }
        }
        return _intersection;
    }

}

// Adding properties to the Constructor of Variable - not to the prototype
// This is a workaround to Static Methods, not supported in safari
// https://www.w3schools.com/js/js_object_constructors.asp

Variable.ACROSS = 'across';
Variable.DOWN = 'down';

Variable.isSameCell = (cell1, cell2) => {
    // console.log(cell1, cell2)
    if (cell1.length !== cell2.length) {
        return false;
    }
    for (let key of cell1.keys()) {
        if (cell1[key] != cell2[key]) { // not strict equality => want to match strings to numbers instead of parsing
            return false;
        }
    }
    return true;
};


class Crossword {
    constructor(structure, words, height, width) {
        //  Determine structure of crossword      
        const constraints = structure.constraints;
        // console.log(constraints)
        this.height = height;
        this.width = width;
        this.structure = [];
        for (let i = 0; i < this.height; i++) {
            const row = [];
            for (let j = 0; j < this.width; j++) {
                if (constraints.find(val => val == i * this.width + j + 1)) {
                    row.push(false);
                } else {
                    row.push(true);
                }
            }
            this.structure.push(row);
        }
        // console.log(this.structure)

        this.words = [...new Set(words.vocab.map(word => word.toUpperCase()))];
        //console.log(this.words.slice(0,10))

        // Determine variable set
        this.variables = new Set();

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {

                // Vertical words
                let starts_word = (
                    this.structure[i][j]
                    && (i == 0 || !this.structure[i - 1][j]));

                if (starts_word) {
                    let length = 1;
                    for (let k = i + 1; k < this.height; k++) {
                        if (this.structure[k][j]) {
                            length += 1;
                        }
                        else {
                            break;
                        }
                    }

                    if (length > 1) {
                        this.variables.add(new Variable(
                            i, j,
                            Variable.DOWN,
                            length
                        ));
                    }

                }

                // Horizontal words
                starts_word = (
                    this.structure[i][j]
                    && (j == 0 || !this.structure[i][j - 1])
                );
                if (starts_word) {
                    let length = 1;
                    for (let k = j + 1; k < this.width; k++) {
                        if (this.structure[i][k]) {
                            length += 1;
                        }
                        else {
                            break;
                        }
                    }

                    if (length > 1) {
                        this.variables.add(new Variable(
                            i, j,
                            Variable.ACROSS,
                            length
                        ));
                    }

                }

            }
        }
        // Compute overlaps for each word
        // For any pair of variables v1, v2, their overlap is either:
        // null, if the two variables do not overlap; or
        // [i, j], where v1's ith character overlaps v2's jth character
        this.overlaps = new Map();
        for (let v1 of this.variables) {
            for (let v2 of this.variables) {
                // console.log(v1, v2)
                if (v1.equals(v2)) {
                    continue;
                }
                const intersection = v1.intersection(v2);
                if (!intersection) {
                    this.overlaps.set([v1, v2], null);
                } else {
                    const index1 = v1.cells.findIndex(cell => Variable.isSameCell(cell, intersection));
                    const index2 = v2.cells.findIndex(cell => Variable.isSameCell(cell, intersection));
                    this.overlaps.set([v1, v2], [index1, index2]);
                }
            }
        }
        this.overlapKeys = Array.from(this.overlaps.keys());
    }

    neighbors(variable) {
        /// Given a variable, return set of overlapping variables.
        const _neighbors = new Set();
        for (let v of this.variables) {
            if (v.equals(variable)) {
                continue;
            }
            const f = this.overlapKeys.find(([x, y]) => x.equals(v) && y.equals(variable));

            if (f && this.overlaps.get(f)) {
                _neighbors.add(v);
            }
            // if (this.overlaps.has([v, variable])) {
            //     _neighbors.add(variable);
            // }
        }
        return _neighbors;
    }


}

// HELPER  FUNCTIONS
function isBlackCell(cell) {
  // className returns a SVGAnimatedString for className
  const SVGAnimatedString = cell.className;
  return SVGAnimatedString.baseVal.includes('black');
}

function isHiddenNode(node) {
  // className returns a SVGAnimatedString for className
  const SVGAnimatedString = node.className;
  return SVGAnimatedString && SVGAnimatedString.baseVal && SVGAnimatedString.baseVal.includes('hidden');
}

function isLetterEnglish(char) {
  return /^[A-Za-z]{1}$/.test(char);
}

function getCellNumber(cell) {
  return parseInt(cell.id.split('-')[2]);
}

function getCellVariable(cell, direction) {
  return cell.getAttribute(`data-variable-${direction}`);
}

function getCellCoords(cell, width, height) {
  const cellNumber = parseInt(cell.id.split('-')[2]);
  const i = Math.floor(cellNumber / height);
  const j = cellNumber % width;
  return ([i, j]);
}

function fillWhite(cell) {
  cell.setAttributeNS(null, 'fill', '#fff');
}

function fillBlue(cell) {
  cell.setAttributeNS(null, 'fill', 'lightblue');
}

function fillYellow(cell) {
  cell.setAttributeNS(null, 'fill', '#fdea3f');
}

function not(fn) {
  return (data) => !fn(data);
}


function createUserActivationAction() {
  let userAction = '';
  if (window.PointerEvent) {
    userAction = 'pointerdown';
  } else {
    userAction = navigator.maxTouchPoints < 1 ? 'mousedown' : 'touchstart';
  }
  return userAction;
}

function createUserActionEnd(evt) {
  const userActionEnd = evt.type.replace('down', 'up').replace('start', 'end');
  return userActionEnd;
}

function touchesDistance(touch1, touch2) {
  const dist = Math.hypot(
    touch1.pageX - touch2.pageX,
    touch1.pageY - touch2.pageY);
  return dist;
}

function getTouchCoordsFromEvent(evt) {
  // let c1, c2;

  // // use touch.clientX, touch.clientY
  // // REF: https://developer.mozilla.org/en-US/docs/Web/API/Touch/clientX#example
  // c1 = [touch1.clientX, touch1.clientY];
  // if (touch2) {
  //   c2 = [touch2.clientX, touch2.clientY];
  // }
  // return c1;

  let point = [];

  if (evt.targetTouches) {
    // Prefer Touch Events
    point = [evt.targetTouches[0].clientX, evt.targetTouches[0].clientY];
  } else {
    // Either Mouse event or Pointer Event
    point = [evt.clientX, evt.clientY];
  }

  return point;
}

const { ACROSS, DOWN, isSameCell } = Variable;

class Action {

    constructor(crossword, direction, startOfWordCells, cellIdToVariableDict, shadowRoot) {
        this.crossword = crossword;
        this.rafPending = false;

        this.selected;
        this.direction = direction; // initial direction setting
        this.shadowRoot = shadowRoot;

        // these are static once the crossword is complete, don't recalculate it every time  
        this.startOfWordCells = startOfWordCells;  // this is ordered by word index for the display cells    
        this.cellIdToVariableDict = cellIdToVariableDict;
        this.variables = Array.from(crossword.variables);
        const cells = [...this.shadowRoot.querySelectorAll('svg [id*="cell-id"]')];
        this.activeCells = cells.filter(not(isBlackCell));

        // handle Multi-Touch events for devices that support PointerEvents
        this.pointerCaches = {
            'pointerdown': []
        };
        this.handleActivationOnEnd;
        this.movePending = false;
        this.moveResetPending = false;

        this.zoomStart;
        this.zoomLevel = 1;
        this.zoomPending = false;
        this.zoomInLimit = 3;
        this.zoomOutLimit = 0.6;
        this.zoomResetPending = false;

        this.initialTouch;
        this.lastHoldPosition = [0, 0];
        this.position = [0, 0];


        this.selectedClue;
    }


    // Receives a keyboard Event or a synthesized event for direct call
    // synthesized event: {key, code, type, shiftKey}
    keydown(evt) {

        // if not manually sent from an event on the body 
        if (evt instanceof Event) {
            evt.preventDefault();
        }
        // actual Event or synthesized for direct call
        const target = evt.target || this.selected;
        const cellId = target.id;
        const cellNumber = getCellNumber(target);

        // edit cell content
        const char = isLetterEnglish(evt.key);

        if (char) {
            const [text, hiddenText] = this.removeExistingContent(cellId);
            // replace or add content in the cell
            const letter = evt.key.toUpperCase();
            const content = document.createTextNode(letter);
            text.appendChild(content);
            hiddenText.textContent = letter;

            // add the new letter in both directions the cell belongs to
            // this.cellIdToVariableDict[`cell-id-${cellNumber}`][this.direction].letter = letter;
            for (let dir in this.cellIdToVariableDict[`cell-id-${cellNumber}`]) {
                this.cellIdToVariableDict[`cell-id-${cellNumber}`][dir].letter = letter;
            }

            // activate the next empty cell
            if (this.direction == ACROSS) {
                this.activateWord(cellNumber, 1);
            } else {
                this.activateWord(cellNumber, 15);
            }

            return;
        }

        if (['Delete', 'Backspace'].includes(evt.key)) {

            const [, , existingContent] = this.removeExistingContent(cellId);

            if (evt.key == 'Backspace') {
                let next;
                if (this.direction == ACROSS) {
                    next = this.changeActiveCell(cellNumber, -1);
                } else {
                    next = this.changeActiveCell(cellNumber, -15);
                }
                // if the cell where we clicked backspace was empty, delete the previous cell contents
                if (next && !existingContent) {
                    const nextCellId = next.id;
                    this.removeExistingContent(nextCellId);
                }
            }

            return;
        }

        // navigate actions 

        if (evt.key == 'ArrowDown') {
            // const nextId = cellNumber + crossword.width;
            this.changeActiveCell(cellNumber, this.crossword.width);
            return;
        }
        if (evt.key == 'ArrowUp') {
            // const nextId = cellNumber -crossword.width;
            this.changeActiveCell(cellNumber, -this.crossword.width);
            return;
        }
        if (evt.key == 'ArrowLeft') {
            //const nextId = cellNumber - 1;
            this.changeActiveCell(cellNumber, -1);
            return;
        }
        if (evt.key == 'ArrowRight') {
            // const nextId = cellNumber + 1;
            this.changeActiveCell(cellNumber, 1);
            return;
        }

        if (evt.key == 'Tab') {
            let next;
            // there should always exist a startOfWord cell that this.selected belongs to in this.direction
            const currentIndex = this.startOfWordCells.findIndex(({ cell }) => getCellVariable(cell, this.direction) == getCellVariable(target, this.direction));
            if (evt.shiftKey) {
                // go back 1 word
                const anchor = currentIndex == 0 ? this.startOfWordCells.length : currentIndex;
                next = this.startOfWordCells[anchor - 1];

            } else {
                // go to next word
                const anchor = currentIndex == this.startOfWordCells.length - 1 ? -1 : currentIndex;
                next = this.startOfWordCells[anchor + 1];
            }
            if (next) {
                // ensure that this.direction is always the direction in which the next exists in a word (might exist in 2)
                //this.direction = next.startOfWordVariable.direction;

                // if this.directon == down and the next cell is the start of a down word, then continue down
                // if this direction == across and the next cell is the start of an across word, then continue across
                // else change to what whatever direction the next cell starts a word
                const down = this.cellIdToVariableDict[next.cell.id][DOWN] && this.cellIdToVariableDict[next.cell.id][DOWN].isStartOfWord
                    && this.direction == DOWN && this.direction;
                const across = this.cellIdToVariableDict[next.cell.id][ACROSS] && this.cellIdToVariableDict[next.cell.id][ACROSS].isStartOfWord
                    && this.direction == ACROSS && this.direction;
                this.direction = down || across || next.startOfWordVariable.direction;

                // synchronous dispatch : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
                // :dispatchEvent() invokes event handlers synchronously

                // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#event_bubbling
                //: trigger an event from a child element, and have an ancestor catch it(svg will catch it)
                next.cell.dispatchEvent(new Event(createUserActivationAction()), { bubbles: true });
            }
            return;
        }
    }

    activate(evt) {

        evt.preventDefault();

        if (isBlackCell(evt.target)) {
            return;
        }

        // prevent cell activation when we have multi-touch
        // // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Multi-touch_interaction#pointer_down

        // if the device doesn't support PointerEvents, then we are listening to touches
        // In this case we don't want to listen to zooming (2 fingers)
        if (evt.touches && evt.touches.length == 2) {
            return;
        }


        // Handle dispatched synthetic event for initial highlighting
        if (!evt.touches && !evt.pointerType) {
            // dispatched event
            this.handleActivationEvent(evt);
            return;
        }

        // Handle MULTI-TOUCH event In case the device supports Pointer Events (we have set the PointerDown event in main.mjs)
        // we don't want to activate a cell when zooming or moving
        // @TODO: SEE ALSO PointerCancel: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/pointercancel_event
        if (this.pointerCaches[evt.type] && this.pointerCaches[evt.type].length) {
            this.clearCache(evt.type);
            return;
        }

        // needed after Shadow DOM added
        // create a copy to preserve the composedPath(); 
        const target = evt.composedPath()[0];
        if (!target.id.includes('cell')) {
            return;
        }

        const { type } = evt;
        const e = { target, type };

        // non - synthetic events
        // Manage MULTI-touch event in case the device supports Pointer Events
        // the function will check if it is a PointerDown event
        // will not apply for Touch events
        this.pushEvent(e);
        // Applies to PointerDown / TouchStart / MouseDown
        // we handle activation on PointerUp / TouchEnd / MouseUp 
        // because we want to cancel the activation if the user goes on to Zoom or Move the Board after the initial Start/Down event

        this.handleActivationOnEnd = this.handleActivationEvent.bind(this, e);
        evt.target.addEventListener(createUserActionEnd(evt), this.handleActivationOnEnd, true);
    }


    // Captures Pointer, Touch and Mouse Events
    // the Function is overloaed with pointerupEvent if not called by dispatched synthetic event
    handleActivationEvent(startEvent, endEvent) {

        const el = startEvent.target.id && this.shadowRoot.querySelector(`#${startEvent.target.id}`);

        if (el && el.id.includes('cell') && not(isBlackCell)(el)) {

            if (endEvent) { // If not dispatched synthetic event
                // Remove the PoinerUp eventListener from the cell that we will activate
                this.clearCache(startEvent.type);
            }

            if (this.rafPending) {
                return;
            }

            // if the new candidate selected doesn't belong in any word in the current this.direction
            // we have to switch direction to get the only direction in which the selected belongs
            if (!getCellVariable(el, this.direction)) {
                this.changeDirection();
                return;
            }

            // IFF Doubleclicking to change direction
            //  => Not a synthetic event (eg. clicked from the list of clues) => there exists an endEvent)
            if (endEvent && this.selected && el.id == this.selected.id) {
                this.changeDirection();
                return;
            }

            this.selected = el;
            this.rafPending = true;

            const updateCellView = this.updateCellView.bind(this);
            window.requestAnimationFrame(updateCellView);
            // allow next activation
        }
    }

    // @TODO - cache this in order not to search every time
    updateCellView(evt) {

        if (!this.rafPending) {
            return;
        }

        // get the coords of the selected = variable
        const selectedVariableCoords = getCellVariable(this.selected, this.direction); // selected.getAttribute(`data-variable-${direction}`);           

        // get the cells that belong to the same variable as the selected  
        const refCells = this.activeCells.filter(cell => getCellVariable(cell, this.direction) == selectedVariableCoords);

        // @TODO/ cache the previously selected cells  to deselect them instead of updating all the activecells
        const notInSelectedCells = this.activeCells.filter(cell => !refCells.includes(cell));
        notInSelectedCells.forEach(fillWhite);

        refCells.forEach(fillBlue);
        fillYellow(this.selected);

        this.rafPending = false;

        // make Aria Label
        const calculateWordIndexAndUpdate = this.calculateWordIndexAndUpdate.bind(this);
        // @ TODO - Move this to a Worker?
        window.requestAnimationFrame(calculateWordIndexAndUpdate);
    }

    calculateWordIndexAndUpdate() {
        const selectedCellCoords = getCellCoords(this.selected, this.crossword.width, this.crossword.height);
        const selectedCellVariable = getCellVariable(this.selected, this.direction).split('-'); //selected.getAttribute(`data-variable-${direction}`).split('-');
        const word = this.variables.find(v => isSameCell([v.i, v.j], selectedCellVariable) && v.direction == this.direction);
        const letterIndex = word.cells.findIndex(cell => isSameCell(selectedCellCoords, cell));
        const wordNumber = this.startOfWordCells.findIndex(({ cell }) => getCellVariable(cell, this.direction) == getCellVariable(this.selected, this.direction));
        const clueNumber = wordNumber + 1;
        // make updates
        this.updateCluesList(clueNumber, this.direction);
        this.activeCells.forEach(this.makeCellAriaLabel.bind(this, word, letterIndex, clueNumber));
    }

    makeCellAriaLabel(word, letterIndex, clueNumber, cell) {
        const wordLengthDesc = `${word.length} letters`;
        const prefix = `${this.direction[0]}`.toUpperCase();
        cell.setAttributeNS(null, 'aria-label', `${prefix}${clueNumber}: clue, Answer: ${wordLengthDesc}, Letter ${letterIndex + 1}`);
    }

    // Activate either the next cell in the same word or the 1st cell in the next word if we reached the end of the word
    // in next is a new word, it is in the same direction as the one we are on
    activateWord(cellNumber, diff) {

        // initially move by diff
        let nextId = cellNumber + diff;
        let next = this.shadowRoot.querySelector(`#cell-id-${nextId}`);

        while (this.cellIdToVariableDict[`cell-id-${nextId}`] && !isBlackCell(next) &&
            (this.cellIdToVariableDict[`cell-id-${nextId}`][ACROSS].letter ||
                this.cellIdToVariableDict[`cell-id-${nextId}`][DOWN].letter)
        ) {
            this.activateWord(nextId, diff);
            return;
        }

        // check if we reached the end of the word OR the end of the grid.  
        // If Yes, then change word either to the same direction if a word exists, or start from the beginning on the other direction
        if ((next && isBlackCell(next)) || !next) {

            // there should always exist a startOfWordCell to which this.selected belongs in this.direction
            // @TODO TEST THIS!!
            const currentWordIndex = this.startOfWordCells.findIndex(({ cell }) =>
                getCellVariable(cell, this.direction) == getCellVariable(this.selected, this.direction));

            // getCellVariable(cell, this.direction) will return if the cell belongs to a world
            // the the cell that is startOfWord but that is not a cell in the same word as the selected
            const nextWord = this.startOfWordCells.slice(currentWordIndex + 1).find(({ cell, startOfWordVariable }) =>
                getCellVariable(cell, this.direction) &&
                this.cellIdToVariableDict[`${cell.id}`][this.direction].isStartOfWord);


            if (nextWord) {
                next = nextWord.cell;
            } else {
                // if there are no more words in this direction, then change direction
                const [changeDirection] = [ACROSS, DOWN].filter(dir => dir !== this.direction);
                const firstWord = this.startOfWordCells.find(({ cell, startOfWordVariable }) =>
                    getCellVariable(cell, changeDirection)); // this will return if it belongs to a variable on the change direction
                next = firstWord.cell;
                // In case next has both directions, then the direction will not switch to activate
                // in this case, force a change of Direction
                this.changeDirection(next);
                return;
                // in case next has both directions, then the activate event will not switch
            }
        }

        // next is either the next cell in the same word or the 1st cell in the next word in the same direction
        next.dispatchEvent(new Event(createUserActivationAction()), { bubbles: true, });

        return next;
    }

    changeActiveCell(cellNumber, diff) {

        let nextId = cellNumber + diff;
        let next = this.shadowRoot.querySelector(`#cell-id-${nextId}`);
        while (next && isBlackCell(next)) {
            nextId += diff;
            next = this.shadowRoot.querySelector(`#cell-id-${nextId}`);
        }
        if (next) {
            // synchronous dispatch : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
            next.dispatchEvent(new Event(createUserActivationAction()), { bubbles: true, });
            // @TODO add new Event support for IE 11?
        }
        return next;
    }

    removeExistingContent(cellId) {
        const letterId = cellId.replace('cell', 'letter');
        const text = this.shadowRoot.querySelector(`#${letterId}`);
        const hiddenText = this.shadowRoot.querySelector(`#${letterId} .hidden`);

        const content = [...text.childNodes].find(not(isHiddenNode));
        if (content) {
            text.removeChild(content);
            for (let dir in this.cellIdToVariableDict[`${cellId}`]) {
                this.cellIdToVariableDict[`${cellId}`][dir].letter = null;
            }
        }
        return ([text, hiddenText, content]);
    }

    updateDirectionAndSelected(cell, direction) {
        this.direction = direction;
        // prevent loop in the activation event when checking for change direction, since the selected.id remains the same
        this.selected = null;
        cell.dispatchEvent(new Event(createUserActivationAction()), { bubbles: true });
    }

    // Function overload: 
    // If it is called from touch cluelist, it passed the selected and the touch event, 
    // if it is called from activateWord, it passed the newTarget
    // else it is called without arguments

    // Toggel Direction
    // @ newTarget is either passed or is presumed to be this.selected
    changeDirection(newTarget, evt) {
        // console.log(newTarget, evt);
        const [changeDirection] = [ACROSS, DOWN].filter(dir => dir !== this.direction);
        const cell = newTarget || this.selected;
        // check if the cell exist in a word on the other direction
        // if it doesn't exist in another direction, just return,
        // else, change direction
        if (getCellVariable(cell, changeDirection)) {// this will return if the cell exists in a word on the changeDirection
            this.updateDirectionAndSelected(cell, changeDirection);
        }

    }

    // zoom and touchMove events
    touchAction(src, evt) {

        if (evt.cancelable) {
            evt.preventDefault();
        }

        // clear the cache for the pointerdown event that started this touchmove action, since we don't want to activate a cell
        this.clearCache('pointerdown');

        // don't Move or PinchZoom for large devices
        if (window.screen.availWidth > 900) { //@TODO Ipad PRo?
            return;
        }

        // Zooming Applies Only to Touch Events
        if (evt.touches && evt.touches.length >= 2) {

            // REF: https://developers.google.com/web/fundamentals/design-and-ux/input/touch#use_requestanimationframe
            if (this.zoomPending || this.movePending) {
                return;
            }

            if (!this.zoomStart) {
                this.zoomStart = touchesDistance(...evt.touches); // consider the first pinch  as the Start event
                return;
            }

            const zoomNext = touchesDistance(...evt.touches);
            const change = zoomNext - this.zoomStart;

            // Zoom In
            if (change > 0) {
                this.zoomLevel += change / 10;
            } else {
                // Zoom Out               
                this.zoomLevel -= (this.zoomStart - zoomNext) / 10;
            }

            // set zoom limits
            if (this.zoomLevel > this.zoomInLimit) {
                this.zoomLevel = this.zoomInLimit;
            }
            if (this.zoomLevel < this.zoomOutLimit) {
                this.zoomLevel = this.zoomOutLimit;
            }

            this.zoomPending = true;
            const f = this.pinchZoom.bind(this, src);
            window.requestAnimationFrame(f);

        } else {
            // Only for 1 finger Event = move

            // REF: https://developers.google.com/web/fundamentals/design-and-ux/input/touch#use_requestanimationframe
            if (this.zoomPending || this.movePending || this.zoomLevel == 1) {
                return;
            }

            if (!this.initialTouch) {
                this.initialTouch = getTouchCoordsFromEvent(evt);
                return;

            } else {
                const [nextX, nextY] = getTouchCoordsFromEvent(evt);
                const x = (this.position[0] + -(this.initialTouch[0] - nextX));
                const y = (this.position[1] + -(this.initialTouch[1] - nextY));


                const f = this.touchMove.bind(this, src, x, y);
                this.movePending = true;
                window.requestAnimationFrame(f);
            }

        }
    }

    pinchZoom(src) {

        if (!this.zoomPending) {
            return;
        }

        let x, y;
        if (this.zoomLevel == 1) {
            x = y = 0;
            this.lastHoldPosition = [x, y];
        } else {
            [x, y] = [...this.lastHoldPosition]; // if there was a move

            // DO WE NEED THIS?
            x += Math.abs(this.zoomLevel - this.zoomInLimit) < Math.abs(this.zoomLevel - this.zoomOutLimit) ? 0.5 : -0.5;
            y += Math.abs(this.zoomLevel - this.zoomInLimit) < Math.abs(this.zoomLevel - this.zoomOutLimit) ? 0.5 : -0.5;
            this.lastHoldPosition = [x, y];
        }

        src.style.transition = 'transform 0s ease-out 0s';
        src.style.transform = `translate(${x}px, ${y}px) scale(${this.zoomLevel})`;

        // allow next animation
        this.zoomPending = false;
        this.zoomStart = undefined;
    }

    touchMove(src, x, y) {

        if (!this.movePending) {
            return;
        }

        src.style.transition = 'transform 0s ease-out 0s';
        src.style.transform = `translate(${x}px, ${y}px) scale(${this.zoomLevel})`;
        this.lastHoldPosition = [x, y];

        // allow next move
        this.movePending = false;
    }

    moveIntoView(src) {

        // the selected cell sould be set synchronously by the syncrhonous keydown call above
        if (this.zoomLevel > 1 && !this.movePending) {
            // the position of the cell relative to the Viewport, and its height
            const { x, y, width, height } = this.selected.getBoundingClientRect();
            const keyBoardYPos = this.shadowRoot.querySelector('main.touch .touchControls').getBoundingClientRect().height; //;
            const { availWidth, availHeight } = window.screen;

            // we are moving based on the current position of the board.  This is different from when we reset!!!!!
            let [resetX, resetY] = [...this.position];

            if (x < width) {
                resetX = resetX - x + height + 10;
            } else if (x > availWidth - width) { // if we have moved from the original (right = width)
                resetX = resetX - (x - availWidth) - width - 10;
            }
            if (y < 0) {
                resetY = resetY - y + height + 10;
            }
            if (y > keyBoardYPos) {
                resetY = resetY - (y - keyBoardYPos) + height;
            }

            const moveTo = this.touchMove.bind(this, src, resetX, resetY);

            // do this here instead of reset
            this.position = [resetX, resetY];

            this.movePending = true;
            window.requestAnimationFrame(moveTo);
        }

    }


    // this may be called before a previously scheduled RAF - the Browswer goes to render steps between or after tasks
    reset(src, evt) {

        if (evt.cancelable) {
            evt.preventDefault();
        }

        // update move event when touchMove ends
        this.position = [...this.lastHoldPosition];
        this.initialTouch = undefined;
        this.zoomStart = undefined; // cancel beginning or zoom if we are resetting       

        //Schedule a reset if too large or to small
        //if too small, then reset to 1 AND center to the middle(x = y = o)
        // if too big, then reset to 2
        if (!this.zoomResetPending && (parseFloat(this.zoomLevel) < 1 || (2 <= parseFloat(this.zoomLevel)))) {

            const resetZoom = function () {
                let x, y;

                if (!this.zoomResetPending) {
                    return;
                }

                this.zoomLevel = parseFloat(this.zoomLevel) < 1 ? 1 : 2;

                // touchEnd
                if (this.zoomLevel == 1) {
                    x = y = 0;
                    this.lastHoldPosition = [x, y];
                    this.position = [...this.lastHoldPosition];
                } else {
                    [x, y] = this.lastHoldPosition;

                    // DO WE NEED THIS?
                    x += Math.abs(this.zoomLevel - this.zoomInLimit) < Math.abs(this.zoomLevel - this.zoomOutLimit) ? 0.5 : -0.5;
                    y += Math.abs(this.zoomLevel - this.zoomInLimit) < Math.abs(this.zoomLevel - this.zoomOutLimit) ? 0.5 : -0.5;
                    this.lastHoldPosition = [x, y];
                }

                src.style.transition = 'transform 0.5s ease-in 0s';
                /// x,y are taken from the closure
                src.style.transform = `translate(${x}px, ${y}px) scale(${this.zoomLevel})`;

                this.zoomResetPending = false;

            }.bind(this);

            this.zoomResetPending = true;
            window.requestAnimationFrame(resetZoom);

        }

        // Schedule a reset touch position too left or too right
        const { x, y, width, height, left, top, bottom, right } = src.getBoundingClientRect();
        const keyBoardHeight = this.shadowRoot.querySelector('main.touch .touchControls').getBoundingClientRect().height; //;
        const { availWidth, availHeight } = window.screen;
        const statusBarHeight = availHeight - window.innerHeight;

        const { width: availContentWidth, height: availContentHeight } = this.shadowRoot.querySelector('main.touch').getBoundingClientRect();

        // the reset values for the translate function are relative to the original position, considered 0, no matter the x,y values
        let [resetX, resetY] = [...this.position];


        if (!this.moveResetPending && this.zoomLevel > 1) {

            const resetMove = function () {

                if (!this.moveResetPending) {
                    return;
                }

                // originally: right = width                
                // if (left < -(width - availWidth)) { // if we have moved all the overflow to the left and passed that
                //     resetX = ((availWidth - width) / 2) - (10);
                // } else if (right > width) {
                //     resetX = Math.abs(((availWidth - width) / 2)) + 10;
                // }

                // Replace availWidth with the actual width (availContentWidth) of the main component when it is embedded in a page                
                if (left < -(width - availContentWidth)) { // if we have moved all the overflow to the left and passed that
                    resetX = ((availContentWidth - width) / 2) - (10);
                } else if (right > width) {
                    resetX = Math.abs(((availContentWidth - width) / 2)) + 10;
                }

                // if (bottom > height) { // if we moved down. originally bottom = height
                //     resetY = Math.abs((availHeight - (keyBoardHeight + 10 + statusBarHeight) - height) / 2);
                // } else if (top < -(height - statusBarHeight)) { // don't pass over half of the screen
                //     resetY = ((availHeight - statusBarHeight - height) / 2);
                // }

                // Replace availHeight with the actual height (availContentHeight) of the main component when it is embedded in a page
                if (bottom > height) { // if we moved down. originally bottom = height
                    resetY = Math.abs((availContentHeight - (keyBoardHeight + 10 + statusBarHeight) - height) / 2);
                } else if (top < -(height - statusBarHeight)) { // don't pass over half of the screen
                    resetY = ((availContentHeight - statusBarHeight - height) / 2);
                }

                // touchEnd         
                src.style.transition = 'transform 0.5s ease-in 0s';
                /// x,y are taken from the closure
                src.style.transform = `translate(${resetX}px, ${resetY}px) scale(${this.zoomLevel})`;

                this.position = [resetX, resetY];
                this.lastHoldPosition = [...this.position];

                this.moveResetPending = false;

            }.bind(this);

            this.moveResetPending = true;
            window.requestAnimationFrame(resetMove);

        }
    }


    // hanlde Multi-Touch events for devices that support PointerEvents
    // REF: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Multi-touch_interaction#miscellaneous_functions

    getCache(type) {
        // Return the cache for this event's target element
        return this.pointerCaches[type];
    }

    pushEvent(ev) {
        // Save this event in the target's cache
        const cache = this.getCache(ev.type);
        if (cache) { // applies only for pointerdown events
            cache.push(ev);
        }

    }

    clearCache(type) {
        // Remove this event from the target's cache
        let cache = this.getCache(type);

        if (!cache) {
            return;
        }

        for (let i = 0; i < cache.length; i++) {
            //@ TODO change? be careful!! REMOVE the pointerup event for type = cache[pointerdown]       
            cache[i].target.removeEventListener(createUserActionEnd({ type }), this.handleActivationOnEnd, true);
        }


        this.pointerCaches[type] = [];
        this.handleActivationOnEnd = undefined;

    }

    // we can update the clueList either by navigating the grid OR by clicking on the clueList 
    updateCluesList(clueNumber, direction, fromCluesList = false) {

        // if we didn't click on a cell - we clicked on the clue list and might have changed the direction
        if (fromCluesList) {
            const gridCell = this.startOfWordCells[clueNumber - 1].cell;
            this.updateDirectionAndSelected(gridCell, direction);
            // the rest of this function will be called from the activation event
            return;
        } else {
            // after activation event by clicking on the grid
            const addHighlight = this.addHighlight.bind(this);

            // remove previously selected style in Clues List
            if (this.selectedClue) {
                // no new change but maybe the crossed word has changed
                const [previousDir, previousNum] = this.selectedClue.split('-');
                if (previousDir == direction && previousNum == clueNumber) {
                    window.requestAnimationFrame(addHighlight);
                    return;
                }
                this.shadowRoot.querySelector(`[data-dir='${previousDir}'] [data-li-clue-index ='${previousNum}']`).classList.remove('activeClue');
            }

            this.selectedClue = `${this.direction}-${clueNumber}`;
            const active = this.shadowRoot.querySelector(`[data-dir='${this.direction}'] [data-li-clue-index ='${clueNumber}']`);
            active.classList.add('activeClue');

            // if we are not displaying touch
            if (this.shadowRoot.querySelector('.scrolls ol')) {
                //active.scrollIntoView({ block: 'nearest', inline: 'start' });
                active.parentNode.scrollTop = active.offsetTop - active.parentNode.offsetTop;
            } else {
                //mobile                
                // active.scrollIntoView({ block: 'nearest', inline: 'start' });
                active.parentNode.parentNode.style.top = `${-active.offsetTop}px`;
            }

            window.requestAnimationFrame(addHighlight);
        }

    }

    // animationFrame Queues don't run until all queued are completed
    // HightLight the crossed Clue for the one that is selected

    addHighlight() {
        // IF WE ARE ON MOBILE DONT'T CONTINUE // SOS SOS SOS!!!!!!!!!!!  
        const scrolls = this.shadowRoot.querySelector('.scrolls ol');
        if (!scrolls) {
            //  console.log('touch');
            return;
        }
        if (this.highlightedClue) {
            const [previousDir, previousNum] = this.highlightedClue.split('-');
            this.shadowRoot.querySelector(`[data-dir='${previousDir}'] [data-li-clue-index ='${previousNum}']`).classList.remove('highlightedClue');
        }
        const otherDirection = this.direction == ACROSS ? DOWN : ACROSS;
        const highlightedVariable = getCellVariable(this.selected, otherDirection); //selected.getAttribute(`data-variable-${direction}`).split('-');
        const highlightedClue = this.startOfWordCells.findIndex(({ cell }) => getCellVariable(cell, otherDirection) == highlightedVariable);
        // maybe there isn't a word on the other direction
        if (highlightedClue > -1) {
            const highlightedClueNumber = highlightedClue + 1;
            const highlightedLi = this.shadowRoot.querySelector(`[data-dir='${otherDirection}'] [data-li-clue-index ='${highlightedClueNumber}']`);

            this.highlightedClue = `${otherDirection}-${highlightedClueNumber}`;
            highlightedLi.classList.add('highlightedClue');

            //@TODO SOS MAKE SURE WE ARE NOT DOING THIS ON MOBILE, BECAUSE IT WLL SCROLL TO VIEW THE OTHER DIRECTION!!!!!!!!!!!
            // highlightedLi.scrollIntoView();
            highlightedLi.parentNode.scrollTop = highlightedLi.offsetTop - highlightedLi.parentNode.offsetTop;
        }
    }

}
// The Task queue is on the opposite side of the Render steps Ιnside a Frame

// Rendering can happen in between Javascript Tasks BUT ALSO many tasks can happen before the BROWSER chooses to go to render steps

// Javascript runs first in a frame BEFORE RAF: javascript -> style -> layout -> paint !!!!!!!!!!! (javascript -> RAF -> style-> layout -> paint)
// BUT after javascript -> style -> layout -> paint, we can have another Javascript in the SAME frame

//INSIDE A FRAME: Javasript will run to completion (empty task queue??) BEFORE rendering can happen:

    // An Event Listener  callbacks are queued Tasks (not a microTask)
    // Microtasks = promises, mutationObservers:
        // Event Listener callbacks are called asyncrhonously by User Interaction 
        // Event Listener callbacks are called synchronously by javascript
    //  If we have an asyncrhonous Task (User Interaction), that means that THIS task will run to completion, before a microtask can execute
    // If we have a syncrhonous function (DispatchEvent), then the SCRIPT is on the task queue and IT will have to execute to completion
        // before we can run microtasks

    // RAF RUNS IN THE RENDER STEPS, AFTER JAVASCRIPT EXECUTION !!!!!!!!!!! (oposite side of the Event Loop from the task queue) INSIDE A FRAME => , 
        // if we had changed style with javascript before RAF,
        // then in the render steps RAF will override the javascript changes when executing its own callback
        // FRAME: Javascript -> RAF -> style -> layout -> render

const qwerty = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '&#9003;'],
    // ['&larr;', '&uarr;', '&rarr;', '&darr;']
];

function createKeys(board) {
    console.log(board);

    for (let row of qwerty) {
        const group = document.createElement('div');
        group.classList.add('keyboard_row');
        for (let key of row) {
            const btn = document.createElement('span');
            btn.innerHTML = key;
            btn.setAttribute('data-key', key);
            btn.classList.add('button');
            if (key == '&#9003;') {
                btn.classList.add('backspace');
            }
            // if (['&larr;', '&uarr;', '&rarr;', '&darr;'].includes(key)) {
            //     btn.classList.add('navigation');
            // }
            btn.setAttribute('role', 'button');
            group.appendChild(btn);
        }
        board.appendChild(group);
    }
}

function extractKeyEvent(evt) {
    const target = evt.target;
    let key = target.getAttribute('data-key') && target.getAttribute('data-key').trim();

    if (key == '&#9003;') {
        key = 'Backspace';
    } else {
        target.classList.add('pressed');
    }

    const { type, code, shiftKey } = evt;
    return { key, code, type, shiftKey };
}

function toggleKeyPressClass(evt) {
    evt.target.classList.remove('pressed');
    evt.target.removeEventListener('animationend', toggleKeyPressClass, true);
}

function init(component) {

    const shadowRoot = component.shadowRoot;

    const crosswordDimentions = [15, 15]; //@TODO this should be an input

    // @TODO change to CDN
    const rootUrl = 'http://localhost:3000/';

    // @TODO the grid id is an input from the web component
    const gridFiles = ['api/grids/7', 'api/words/',].map((req) => `${rootUrl}${req}`);
    const solutionFiles = ['api/solutions/7', 'api/clues/7'].map((req) => `${rootUrl}${req}`);
    const headers = {
        method: 'GET',
        mode: 'cors', // request to a server of another origin if we are at a cdn
        cache: 'no-store', // *default, no-cache, reload, force-cache, only-if-cached       
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // @TODO how dow we choose size?
    const cellSize = 33;
    const gridSpan = 495;
    const padding = 3;
    const letterFontSize = 22;
    const indexSize = 11;
    const letterPaddingTop = cellSize * 0.85;
    const wordIndexPaddingLeft = padding / 1.5;
    const wordIndexPaddingTop = padding * 3.5;


    //startOfWordCells: Array of Objects: {cell, startOfWordVariable }[]
    const startOfWordCells = []; // this is in the order of the word indices for the display cells
    // {[cellId]:{dir1:{}, dir2:{}} }
    const cellIdToVariableDict = {};

    const svgNamespace = 'http://www.w3.org/2000/svg';

    const main = shadowRoot.querySelector('main');
    const svg = shadowRoot.querySelector('svg');
    const board = shadowRoot.querySelector('.board');
    const keyboard = shadowRoot.querySelector('.keyboard');
    shadowRoot.querySelector('.touchControls');

    // initial check for displaying a virtual keyboard, 
    // must change if there is touch BUT also a physical keyboard
    let useTouch = navigator.maxTouchPoints > 0; // || window.screen.width < 700;  @TODO orientation change
    let checkedKeyboardAPI = false;
    if (useTouch) {
        main.classList.add('touch');
    }

    //@TODO we don't need the vocab file for displaying a generated crossword
    return Promise.all(gridFiles.map(file => fetch(file, headers)))
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(([structure, words]) => new Crossword(structure, words, ...crosswordDimentions))
        .then((crossword) => makeCells(crossword))
        .then((crossword) => makeGrid(crossword))
        .then((crossword) => addActions(crossword))
        .then((actionInstance) => displayKeyboard(actionInstance))
        .catch((err) => {
            console.log(err); // @ TODO handle the error
        })
        .then((actionInstance) =>
            Promise.all(solutionFiles.map(file => fetch(file, headers)))
                // create clusure for actionInstance
                .then(responses => Promise.all(responses.map(response => response.json())))
                .then(data => getClues(data))
                .then(clues => displayClues(clues, actionInstance))
                .then((actionInstance) => initializeView(actionInstance))
        )
        .catch((err) => {
            console.log(err);
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
        for (let i = 0; i < crossword.height - 1; i++) {
            d += `M${padding},${((i + 1) * cellHeight) + padding} l${gridSpan},0 `;
        }
        // create  vertical lines
        for (let i = 0; i < crossword.width - 1; i++) {
            d += `M${((i + 1) * cellHeight) + padding},${padding} l0,${gridSpan} `;
        }

        path.setAttributeNS(null, 'd', d);
        path.setAttributeNS(null, 'stroke', 'dimgray');
        path.setAttributeNS(null, 'stroke-width', 1);
        path.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke');

        grid.appendChild(path);

        // create the outlines
        const outline = document.createElementNS(svgNamespace, 'rect');
        outline.setAttributeNS(null, 'width', gridSpan + padding);
        outline.setAttributeNS(null, 'height', gridSpan + padding);
        outline.setAttributeNS(null, 'x', padding / 2);
        outline.setAttributeNS(null, 'y', padding / 2);
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
        for (let i = 0; i < crossword.height; i++) {

            const row = crossword.structure[i];

            for (let j = 0; j < crossword.width; j++) {

                const cellGroup = document.createElementNS(svgNamespace, 'g');
                cellGroup.setAttributeNS(null, 'role', 'cell');

                const wordIndex = document.createElementNS(svgNamespace, 'text');
                wordIndex.setAttributeNS(null, 'x', (j * cellSize) + padding + wordIndexPaddingLeft);
                wordIndex.setAttributeNS(null, 'y', (i * cellSize) + padding + wordIndexPaddingTop);
                wordIndex.setAttributeNS(null, 'stroke', 'black');
                wordIndex.setAttributeNS(null, 'stroke-width', '0.2');
                wordIndex.setAttributeNS(null, 'style', `font-size: ${indexSize}px`);



                const letter = document.createElementNS(svgNamespace, 'text');
                letter.setAttributeNS(null, 'x', (j * cellSize) + padding + cellSize / 2);
                letter.setAttributeNS(null, 'y', (i * cellSize) + padding + letterPaddingTop);
                letter.setAttributeNS(null, 'stroke', 'black');
                letter.setAttributeNS(null, 'stroke-width', '0.3');
                letter.setAttributeNS(null, 'id', `letter-id-${i * crossword.width + j}`);
                letter.setAttributeNS(null, 'style', `font-size: ${letterFontSize}px`);
                letter.setAttributeNS(null, 'text-anchor', 'middle');

                // Help for Aria 
                const ariaLetter = document.createElementNS(svgNamespace, 'text');
                ariaLetter.setAttributeNS(null, 'aria-live', 'polite');
                ariaLetter.classList.add('hidden');
                letter.appendChild(ariaLetter);

                const cell = document.createElementNS(svgNamespace, 'rect');

                // Define an id for all cells
                cell.setAttributeNS(null, 'id', `cell-id-${i * crossword.width + j}`);

                // set up a map from Id to variables
                cellIdToVariableDict[`cell-id-${i * crossword.width + j}`] = {};

                if (!row[j]) {
                    rectWidth = cellSize, rectHeight = rectWidth;
                    cell.setAttributeNS(null, 'x', (j * cellSize) + padding);
                    cell.setAttributeNS(null, 'y', (i * cellSize) + padding);
                    cell.setAttributeNS(null, 'fill', '#333');
                    cell.classList.add('black');
                } else {
                    // get ALL the words in ALL the directions to which this cell belongs
                    variables.forEach((v) => {
                        const cellIndex = v.cells.findIndex(cell => Variable.isSameCell(cell, [i, j]));
                        if (cellIndex > -1) {
                            // set the data-variable attribute for each direction that the cell exists in a word
                            cell.setAttributeNS(null, `data-variable-${v.direction}`, `${v.i}-${v.j}`);
                            // complete the celId map
                            cellIdToVariableDict[`cell-id-${i * crossword.width + j}`][v.direction] =
                                { 'variable': v, 'cellNumber': cellIndex, 'letter': null, 'isStartOfWord': cellIndex == 0 };
                            return true;
                        }
                        return false;
                    });

                    rectWidth = cellSize, rectHeight = rectWidth; // account for stroke width of the grid
                    cell.setAttributeNS(null, 'x', (j * cellSize) + padding); // account for stroke width of the grid
                    cell.setAttributeNS(null, 'y', (i * cellSize) + padding);
                    cell.setAttributeNS(null, 'fill', '#fff'); // should be transparent? => fill = none

                    //@TODO: precalculate this??? ([direction[counter]: ])
                    const startOfWordVariable = variables.find(v => v.i == i && v.j == j);
                    if (startOfWordVariable) {
                        wordIndex.textContent = counter;
                        startOfWordCells.push({ cell, startOfWordVariable });
                        counter++;
                    }

                }
                cell.setAttributeNS(null, 'width', rectWidth);
                cell.setAttributeNS(null, 'height', rectHeight);
                cell.setAttributeNS(null, 'stroke-width', 0);

                // ARIA LABELS
                cell.setAttributeNS(null, 'role', 'gridcell');

                cellGroup.appendChild(cell); // the most deeply nested element will catch the events in the capturing phase
                cellGroup.appendChild(wordIndex);
                cellGroup.appendChild(letter);


                rowGroup.appendChild(cellGroup);
            }
        }
        svg.appendChild(rowGroup);
        return crossword;
    }

    function addActions(crossword) {
        const direction = startOfWordCells[0].startOfWordVariable.direction;
        const action = new Action(crossword, direction, startOfWordCells, cellIdToVariableDict, shadowRoot);
        const activate = action.activate.bind(action);
        const keydown = action.keydown.bind(action);
        const touchAction = action.touchAction.bind(action, board);
        const reset = action.reset.bind(action, board);


        const cell = shadowRoot.querySelector('#cell-id-0');

        // ACTIVATE CELL EVENT
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
        // TRAP device Keyboard  Events!       
        const trapKeyboardEvents = function f(action, evt) {
            // console.log(action, evt);
            // console.log(document.activeElement, shadowRoot.host)

            // allow to write on the document
            evt.preventDefault();

            // @ TODO replace the target check if it is out of functional elements
            if (!action.selected && evt.key == 'Tab') {
                // send the activation event to parent (svg) via the child (cell)          
                cell.dispatchEvent(new Event(createUserActivationAction(), { bubbles: true }));
                return;
            }
            if (action.selected) {
                const { key, code, type, shiftKey } = evt;
                // send Sythesized event      
                // keydown({target: action.selected, id:action.selected.id, key, code, type, shiftKey});            
                keydown({ key, code, type, shiftKey });
            }

            //If a keydown event has been sent, then the user has keyboard => we can remove virtual keyboard and touch
            main.classList.remove('touch'); // ??????????????
            useTouch = false;

        }.bind(null, action);

        component.dependencies.listeners.push({ 'keydown': trapKeyboardEvents });
        // add this when the component gains focus
        // document.addEventListener('keydown', trapKeyboardEvents, true);

        // treat move event as initial touch
        board.addEventListener('touchmove', touchAction, true);// for zooming
        board.addEventListener('touchend', reset, true);

        // hanlde Move Actions for Pens on touch-enabled screens
        if (window.PointerEvent && useTouch) {

            // Add Pointer Event Listener for touch screens AND input devices other than touch (like pen)
            const penEventHandler = (evt) => {

                // https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType - touch, mouse, pen
                if (evt.pointerType == 'pen') {

                    if (evt.type == 'pointermove') {
                        evt.target.setPointerCapture(evt.pointerId);
                        touchAction(evt);
                    }
                    if (evt.type == 'pointerup') {
                        evt.target.releasePointerCapture(evt.pointerId);
                        reset(evt);
                    }

                }
            };

            board.addEventListener('pointermove', penEventHandler, true);
            board.addEventListener('pointerup', penEventHandler, true);
        }

        // return the action instance 
        return action;
    }

    async function displayKeyboard(actionInstance) {

        // check for physical keyboard - if it exists, don't use virtual keyboard FOR KEYDOWN ACTION
        // BUT what if it is a touch device that can be connected to a physical keyboard? ex microsoft surface????

        // Solution for Touch Enabled Devices that also have a physical keyboard connected    
        // Navigator.keyboard API works for DESKTOP Chrome, Edge, Opera  

        // AWAIT to find if there is a keyboard
        // Check if it is touch enabled AND is Desktop that supports the Keyboard API
        if (useTouch && navigator.keyboard) {
            // If the'navigator.keyboard' property is supported by the browser
            useTouch = checkedKeyboardAPI ? useTouch : await navigator.keyboard.getLayoutMap()
                .then(map => !Boolean(map.size)); // uses keyboard
            checkedKeyboardAPI = true;
        }

        if (!useTouch) {
            // browser supports multi-touch
            main.classList.remove('touch');


        } else {
            main.classList.add('touch');

            console.log('touch');

            // Manage keyDown events on the virtual keyboard        
            const keydown = actionInstance.keydown.bind(actionInstance);
            const moveIntoView = actionInstance.moveIntoView.bind(actionInstance);
            actionInstance.reset.bind(actionInstance, board);


            const handleKeyEvent = (evt) => {

                // handle virtual keyboar animations
                evt.target.addEventListener('animationend', toggleKeyPressClass, true);

                keydown(extractKeyEvent(evt)); // syncrhronous event inside the eventCallback
                // have to reset after moveIntoView
                moveIntoView(board); // move to where the keydown event happend if we have zoomed
            };

            Promise.resolve(createKeys(keyboard))
                .then((_) => {
                    // Add crossword keyboard Events for touch devices that don't have keyboard
                    if (window.PointerEvent) {
                        // Add Pointer Event Listener                    
                        keyboard.addEventListener('pointerdown', handleKeyEvent, true);
                    } else {
                        // add Touch Event Listener
                        keyboard.addEventListener('touchstart', handleKeyEvent, true);
                        //might be using a mouse with a touch enambled device that doesn't use a keyboard? eg. Microsoft surface?
                        keyboard.addEventListener('mousedown', handleKeyEvent, true);
                    }

                }).catch(console.error);
        }

        return actionInstance;

    }

    // @TODO Move to generation files!!!!!!!!!!!!!! 
    function getClues([{ solution }, { clues }]) {
        //console.log(solution, clues)
        const allClues = { 'across': {}, 'down': {} };
        for (let keyVariable in solution) {
            // convert to javascript class from json string
            const classFunction = new Function(`Variable = ${Variable}; return new ${keyVariable}; `);
            const variable = classFunction();
            const clue = solution[keyVariable];
            const wordIndex = startOfWordCells.findIndex(({ startOfWordVariable }) =>
                startOfWordVariable.i == variable.i && startOfWordVariable.j == variable.j);
            allClues[variable.direction][wordIndex + 1] = { [clue]: clues[clue] };
        }        return allClues;
    }

    function displayClues(clues, actionInstance) {
        console.log(clues);
        if (!useTouch) {
            displayDesktopClues(clues, actionInstance);
        } else {
            displayTouchClues(clues, actionInstance);
        }

        return actionInstance;
    }

    function createCluesList(clues, direction) {
        const ol = document.createElement('ol');
        ol.setAttribute('data-dir', direction);

        for (let clueNumber in clues[direction]) {

            const li = document.createElement('li');
            li.setAttribute('data-li-clue-index', `${clueNumber}`);
            const numberCell = document.createElement('span');
            let numberText;
            if (useTouch) {
                numberText = document.createTextNode(`${clueNumber}${direction[0]}`);
            } else {
                numberText = document.createTextNode(`${clueNumber}`);
            }
            numberCell.appendChild(numberText);
            li.appendChild(numberCell);
            const clueCell = document.createElement('span');
            const obj = clues[direction][clueNumber];
            const clueText = document.createTextNode(`${Object.values(obj)[0]}`);
            clueCell.setAttribute('data-clue-index', `${clueNumber}`);
            numberCell.setAttribute('data-clue-index', `${clueNumber}`);
            clueCell.appendChild(clueText);
            li.appendChild(clueCell);
            ol.appendChild(li);
        }
        return ol;
    }

    function activateFromCluesList(evt, parent, actionInstance) {
        const target = evt.target;
        const clueNumber = target.getAttribute('data-clue-index');

        if (!clueNumber) {
            return;
        }

        // @TODO change directly the actionInstace directin from here??
        const direction = parent.getAttribute('data-dir');

        if (actionInstance.selectedClue && actionInstance.selectedClue == `${direction}-${clueNumber}`) {
            return;
        }

        actionInstance.updateCluesList(clueNumber, direction, true);
    }

    function displayDesktopClues(clues, actionInstance) {
        const section = shadowRoot.querySelector('section[aria-label="puzzle clues"]');
        const sectionDiv = shadowRoot.querySelector('section .scrolls');
        const activationFunction = function (evt) {
            const parentElement = this;
            activateFromCluesList(evt, parentElement, actionInstance);
        };

        for (let direction in clues) {
            const div = document.createElement('div');
            const header = document.createElement('h4');
            const headerTitle = document.createTextNode(`${direction}`);
            header.appendChild(headerTitle);
            div.appendChild(header);

            const list = createCluesList(clues, direction);

            div.appendChild(list);
            sectionDiv.appendChild(div);

            if (window.PointerEvent) {
                list.addEventListener('pointerdown', activationFunction, true);
            } else {
                list.addEventListener('touchstart', activationFunction, true);
                list.addEventListener('mousedown', activationFunction, true);
            }
        }

        sectionDiv.removeAttribute('hidden');
        section.removeAttribute('hidden');
    }

    function displayTouchClues(clues, actionInstance) {
        shadowRoot.querySelector('.touchClues');
        const cluesText = shadowRoot.querySelector('.clueText .textContainer');
        const [leftnav, rightnav] = shadowRoot.querySelectorAll('.touchClues .chevron');

        const changeDirectionFunction = actionInstance.changeDirection.bind(actionInstance, actionInstance.selected);
        const keydown = actionInstance.keydown.bind(actionInstance);
        const moveIntoView = actionInstance.moveIntoView.bind(actionInstance);
        actionInstance.reset.bind(actionInstance, board);


        const navigationFunction = function (evt) {
            evt.preventDefault();
            // synthesized event: {key, code, type, shiftKey}       
            const synthesizedEvent = { key: 'Tab', code: 'Tab', type: evt.type, shiftKey: evt.target == leftnav };

            // closure
            keydown(synthesizedEvent); // this should be synchronously dispatched!

            // the selected cell sould be set synchronously by the syncrhonous keydown call above
            moveIntoView(board);
        };

        for (let direction in clues) {
            const list = createCluesList(clues, direction);

            cluesText.appendChild(list);

            if (window.PointerEvent) {
                list.addEventListener('pointerdown', changeDirectionFunction, true);
            } else {
                list.addEventListener('touchstart', changeDirectionFunction, true);
                list.addEventListener('mousedown', changeDirectionFunction, true);
            }
        }

        // add navigation action from chevrons
        if (window.PointerEvent) {
            leftnav.addEventListener('pointerdown', navigationFunction, true);
            rightnav.addEventListener('pointerdown', navigationFunction, true);
        } else {
            leftnav.addEventListener('touchstart', navigationFunction, true);
            rightnav.addEventListener('touchstart', navigationFunction, true);
            leftnav.addEventListener('mousedown', navigationFunction, true);
            rightnav.addEventListener('mousedown', navigationFunction, true);
        }

    }


    function initializeView(actionInstance) {
        // set initial active cell
        if (!actionInstance.selected) {
            const [firstWord] = startOfWordCells;
            firstWord.cell.dispatchEvent(new Event(createUserActivationAction(), { bubbles: true }));
        }
    }

    // return event handlers that where registered outside the element’s template (on the document)
    // in order to remove them in disconnectedCallback!  

}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' &&
    window.customElements != null &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = 
// eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */
function removeNodesFromTemplate(template, nodesToRemove) {
    const { element: { content }, parts } = template;
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;
    while (walker.nextNode()) {
        nodeIndex++;
        const node = walker.currentNode;
        // End removal if stepped past the removing node
        if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
        }
        // A node to remove was found in the template
        if (nodesToRemove.has(node)) {
            nodesToRemoveInTemplate.push(node);
            // Track node we're removing
            if (currentRemovingNode === null) {
                currentRemovingNode = node;
            }
        }
        // When removing, increment count by which to adjust subsequent part indices
        if (currentRemovingNode !== null) {
            removeCount++;
        }
        while (part !== undefined && part.index === nodeIndex) {
            // If part is in a removed node deactivate it by setting index to -1 or
            // adjust the index as needed.
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
            // go to the next active part.
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            part = parts[partIndex];
        }
    }
    nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
}
const countNodes = (node) => {
    let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;
    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
    while (walker.nextNode()) {
        count++;
    }
    return count;
};
const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (isTemplatePartActive(part)) {
            return i;
        }
    }
    return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */
function insertNodeIntoTemplate(template, node, refNode = null) {
    const { element: { content }, parts } = template;
    // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.
    if (refNode === null || refNode === undefined) {
        content.appendChild(node);
        return;
    }
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;
    while (walker.nextNode()) {
        walkerIndex++;
        const walkerNode = walker.currentNode;
        if (walkerNode === refNode) {
            insertCount = countNodes(node);
            refNode.parentNode.insertBefore(node, refNode);
        }
        while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
            // If we've inserted the node, simply adjust all subsequent parts
            if (insertCount > 0) {
                while (partIndex !== -1) {
                    parts[partIndex].index += insertCount;
                    partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                }
                return;
            }
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari does not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = isCEPolyfill ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!isTemplatePartActive(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = window.trustedTypes &&
    trustedTypes.createPolicy('lit-html', { createHTML: (s) => s });
const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment position.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = lastAttributeNameRegex.exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : nodeMarker);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                    marker;
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        let value = this.getHTML();
        if (policy !== undefined) {
            // this is secure because `this.strings` is a TemplateStringsArray.
            // TODO: validate this when
            // https://github.com/tc39/proposal-array-is-template-object is
            // implemented.
            value = policy.createHTML(value);
        }
        template.innerHTML = value;
        return template;
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        const parts = this.parts;
        // If we're assigning an attribute via syntax like:
        //    attr="${foo}"  or  attr=${foo}
        // but not
        //    attr="${foo} ${bar}" or attr="${foo} baz"
        // then we don't want to coerce the attribute value into one long
        // string. Instead we want to just return the value itself directly,
        // so that sanitizeDOMValue can get the actual value rather than
        // String(value)
        // The exception is if v is an array, in which case we do want to smash
        // it together into a string without calling String() on the array.
        //
        // This also allows trusted values (when using TrustedTypes) being
        // assigned to DOM sinks without being stringified in the process.
        if (l === 1 && strings[0] === '' && strings[1] === '') {
            const v = parts[0].value;
            if (typeof v === 'symbol') {
                return String(v);
            }
            if (typeof v === 'string' || !isIterable(v)) {
                return v;
            }
        }
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (isDirective(this.value)) {
            const directive = this.value;
            this.value = noChange;
            directive(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = createMarker());
        part.__insert(this.endNode = createMarker());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = createMarker());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        if (this.startNode.parentNode === null) {
            return;
        }
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof TemplateResult) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === nothing) {
            this.value = nothing;
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof TemplateInstance &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new TemplateInstance(template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = noChange;
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(() => {
    try {
        const options = {
            get capture() {
                eventOptionsSupported = true;
                return false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('test', options, options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.removeEventListener('test', options, options);
    }
    catch (_e) {
        // event options not supported
    }
})();
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = noChange;
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render$1 = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        removeNodes(container, container.firstChild);
        parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new PropertyCommitter(element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new EventPart(element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new BooleanAttributePart(element, name.slice(1), strings)];
        }
        const committer = new AttributeCommitter(element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new NodePart(options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
let compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
}
else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected. ` +
        `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +
        `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */
const shadyTemplateFactory = (scopeName) => (result) => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = templateCaches.get(cacheKey);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(cacheKey, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    const key = result.strings.join(marker);
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        const element = result.getTemplateElement();
        if (compatibleShadyCSSVersion) {
            window.ShadyCSS.prepareTemplateDom(element, scopeName);
        }
        template = new Template(result, element);
        templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result.strings, template);
    return template;
};
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */
const removeStylesFromLitTemplates = (scopeName) => {
    TEMPLATE_TYPES.forEach((type) => {
        const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
        if (templates !== undefined) {
            templates.keyString.forEach((template) => {
                const { element: { content } } = template;
                // IE 11 doesn't support the iterable param Set constructor
                const styles = new Set();
                Array.from(content.querySelectorAll('style')).forEach((s) => {
                    styles.add(s);
                });
                removeNodesFromTemplate(template, styles);
            });
        }
    });
};
const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */
const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
    shadyRenderSet.add(scopeName);
    // If `renderedDOM` is stamped from a Template, then we need to edit that
    // Template's underlying template element. Otherwise, we create one here
    // to give to ShadyCSS, which still requires one while scoping.
    const templateElement = !!template ? template.element : document.createElement('template');
    // Move styles out of rendered DOM and store.
    const styles = renderedDOM.querySelectorAll('style');
    const { length } = styles;
    // If there are no styles, skip unnecessary work
    if (length === 0) {
        // Ensure prepareTemplateStyles is called to support adding
        // styles via `prepareAdoptedCssText` since that requires that
        // `prepareTemplateStyles` is called.
        //
        // ShadyCSS will only update styles containing @apply in the template
        // given to `prepareTemplateStyles`. If no lit Template was given,
        // ShadyCSS will not be able to update uses of @apply in any relevant
        // template. However, this is not a problem because we only create the
        // template for the purpose of supporting `prepareAdoptedCssText`,
        // which doesn't support @apply at all.
        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
        return;
    }
    const condensedStyle = document.createElement('style');
    // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.
    for (let i = 0; i < length; i++) {
        const style = styles[i];
        style.parentNode.removeChild(style);
        condensedStyle.textContent += style.textContent;
    }
    // Remove styles from nested templates in this scope.
    removeStylesFromLitTemplates(scopeName);
    // And then put the condensed style into the "root" template passed in as
    // `template`.
    const content = templateElement.content;
    if (!!template) {
        insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
    }
    else {
        content.insertBefore(condensedStyle, content.firstChild);
    }
    // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    const style = content.querySelector('style');
    if (window.ShadyCSS.nativeShadow && style !== null) {
        // When in native Shadow DOM, ensure the style created by ShadyCSS is
        // included in initially rendered output (`renderedDOM`).
        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    }
    else if (!!template) {
        // When no style is left in the template, parts will be broken as a
        // result. To fix this, we put back the style node ShadyCSS removed
        // and then tell lit to remove that node from the template.
        // There can be no style in the template in 2 cases (1) when Shady DOM
        // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
        // is in use ShadyCSS removes the style if it contains no content.
        // NOTE, ShadyCSS creates its own style so we can safely add/remove
        // `condensedStyle` here.
        content.insertBefore(condensedStyle, content.firstChild);
        const removes = new Set();
        removes.add(condensedStyle);
        removeNodesFromTemplate(template, removes);
    }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */
const render = (result, container, options) => {
    if (!options || typeof options !== 'object' || !options.scopeName) {
        throw new Error('The `scopeName` option is required.');
    }
    const scopeName = options.scopeName;
    const hasRendered = parts.has(container);
    const needsScoping = compatibleShadyCSSVersion &&
        container.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ &&
        !!container.host;
    // Handle first render to a scope specially...
    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.
    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    render$1(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
    // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.
    if (firstScopeRender) {
        const part = parts.get(renderContainer);
        parts.delete(renderContainer);
        // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
        // that should apply to `renderContainer` even if the rendered value is
        // not a TemplateInstance. However, it will only insert scoped styles
        // into the document if `prepareTemplateStyles` has already been called
        // for the given scope name.
        const template = part.value instanceof TemplateInstance ?
            part.value.template :
            undefined;
        prepareTemplateStyles(scopeName, renderContainer, template);
        removeNodes(container, container.firstChild);
        container.appendChild(renderContainer);
        parts.set(container, part);
    }
    // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSS.styleElement`
    // for dynamic changes.
    if (!hasRendered && needsScoping) {
        window.ShadyCSS.styleElement(container.host);
    }
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a;
/**
 * Use this module if you want to create your own base class extending
 * [[UpdatingElement]].
 * @packageDocumentation
 */
/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty =
    (prop, _obj) => prop;
const defaultConverter = {
    toAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    },
    fromAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value !== null;
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                return JSON.parse(value);
        }
        return value;
    }
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
};
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */
const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 * @noInheritDoc
 */
class UpdatingElement extends HTMLElement {
    constructor() {
        super();
        this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */
    static get observedAttributes() {
        // note: piggy backing on this to ensure we're finalized.
        this.finalize();
        const attributes = [];
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this._classProperties.forEach((v, p) => {
            const attr = this._attributeNameForProperty(p, v);
            if (attr !== undefined) {
                this._attributeToPropertyMap.set(attr, p);
                attributes.push(attr);
            }
        });
        return attributes;
    }
    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */
    /** @nocollapse */
    static _ensureClassProperties() {
        // ensure private storage for property declarations.
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
            this._classProperties = new Map();
            // NOTE: Workaround IE11 not supporting Map constructor argument.
            const superProperties = Object.getPrototypeOf(this)._classProperties;
            if (superProperties !== undefined) {
                superProperties.forEach((v, k) => this._classProperties.set(k, v));
            }
        }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a PropertyDeclaration for the property with the given options.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     *
     * @nocollapse
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
        // Note, since this can be called by the `@property` decorator which
        // is called before `finalize`, we ensure storage exists for property
        // metadata.
        this._ensureClassProperties();
        this._classProperties.set(name, options);
        // Do not generate an accessor if the prototype already has one, since
        // it would be lost otherwise and that would never be the user's intention;
        // Instead, we expect users to call `requestUpdate` themselves from
        // user-defined accessors. Note that if the super has an accessor we will
        // still overwrite it
        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
            return;
        }
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        const descriptor = this.getPropertyDescriptor(name, key, options);
        if (descriptor !== undefined) {
            Object.defineProperty(this.prototype, name, descriptor);
        }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     *   class MyElement extends LitElement {
     *     static getPropertyDescriptor(name, key, options) {
     *       const defaultDescriptor =
     *           super.getPropertyDescriptor(name, key, options);
     *       const setter = defaultDescriptor.set;
     *       return {
     *         get: defaultDescriptor.get,
     *         set(value) {
     *           setter.call(this, value);
     *           // custom action.
     *         },
     *         configurable: true,
     *         enumerable: true
     *       }
     *     }
     *   }
     *
     * @nocollapse
     */
    static getPropertyDescriptor(name, key, options) {
        return {
            // tslint:disable-next-line:no-any no symbol in index
            get() {
                return this[key];
            },
            set(value) {
                const oldValue = this[name];
                this[key] = value;
                this
                    .requestUpdateInternal(name, oldValue, options);
            },
            configurable: true,
            enumerable: true
        };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a PropertyDeclaration via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override `createProperty`.
     *
     * @nocollapse
     * @final
     */
    static getPropertyOptions(name) {
        return this._classProperties && this._classProperties.get(name) ||
            defaultPropertyDeclaration;
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */
    static finalize() {
        // finalize any superclasses
        const superCtor = Object.getPrototypeOf(this);
        if (!superCtor.hasOwnProperty(finalized)) {
            superCtor.finalize();
        }
        this[finalized] = true;
        this._ensureClassProperties();
        // initialize Map populated in observedAttributes
        this._attributeToPropertyMap = new Map();
        // make any properties
        // Note, only process "own" properties since this element will inherit
        // any properties defined on the superClass, and finalization ensures
        // the entire prototype chain is finalized.
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            // support symbols in properties (IE11 does not support this)
            const propKeys = [
                ...Object.getOwnPropertyNames(props),
                ...(typeof Object.getOwnPropertySymbols === 'function') ?
                    Object.getOwnPropertySymbols(props) :
                    []
            ];
            // This for/of is ok because propKeys is an array
            for (const p of propKeys) {
                // note, use of `any` is due to TypeSript lack of support for symbol in
                // index types
                // tslint:disable-next-line:no-any no symbol in index
                this.createProperty(p, props[p]);
            }
        }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static _attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ?
            undefined :
            (typeof attribute === 'string' ?
                attribute :
                (typeof name === 'string' ? name.toLowerCase() : undefined));
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */
    static _valueHasChanged(value, old, hasChanged = notEqual) {
        return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */
    static _propertyValueFromAttribute(value, options) {
        const type = options.type;
        const converter = options.converter || defaultConverter;
        const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);
        return fromAttribute ? fromAttribute(value, type) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */
    static _propertyValueToAttribute(value, options) {
        if (options.reflect === undefined) {
            return;
        }
        const type = options.type;
        const converter = options.converter;
        const toAttribute = converter && converter.toAttribute ||
            defaultConverter.toAttribute;
        return toAttribute(value, type);
    }
    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */
    initialize() {
        this._updateState = 0;
        this._updatePromise =
            new Promise((res) => this._enableUpdatingResolver = res);
        this._changedProperties = new Map();
        this._saveInstanceProperties();
        // ensures first update will be caught by an early access of
        // `updateComplete`
        this.requestUpdateInternal();
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */
    _saveInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.constructor
            ._classProperties.forEach((_v, p) => {
            if (this.hasOwnProperty(p)) {
                const value = this[p];
                delete this[p];
                if (!this._instanceProperties) {
                    this._instanceProperties = new Map();
                }
                this._instanceProperties.set(p, value);
            }
        });
    }
    /**
     * Applies previously saved instance properties.
     */
    _applyInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        // tslint:disable-next-line:no-any
        this._instanceProperties.forEach((v, p) => this[p] = v);
        this._instanceProperties = undefined;
    }
    connectedCallback() {
        // Ensure first connection completes an update. Updates cannot complete
        // before connection.
        this.enableUpdating();
    }
    enableUpdating() {
        if (this._enableUpdatingResolver !== undefined) {
            this._enableUpdatingResolver();
            this._enableUpdatingResolver = undefined;
        }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */
    disconnectedCallback() {
    }
    /**
     * Synchronizes property values when attributes change.
     */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this._attributeToProperty(name, value);
        }
    }
    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
        const ctor = this.constructor;
        const attr = ctor._attributeNameForProperty(name, options);
        if (attr !== undefined) {
            const attrValue = ctor._propertyValueToAttribute(value, options);
            // an undefined value does not change the attribute.
            if (attrValue === undefined) {
                return;
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
            if (attrValue == null) {
                this.removeAttribute(attr);
            }
            else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
        }
    }
    _attributeToProperty(name, value) {
        // Use tracking info to avoid deserializing attribute value if it was
        // just set from a property setter.
        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
            return;
        }
        const ctor = this.constructor;
        // Note, hint this as an `AttributeMap` so closure clearly understands
        // the type; it has issues with tracking types through statics
        // tslint:disable-next-line:no-unnecessary-type-assertion
        const propName = ctor._attributeToPropertyMap.get(name);
        if (propName !== undefined) {
            const options = ctor.getPropertyOptions(propName);
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
            this[propName] =
                // tslint:disable-next-line:no-any
                ctor._propertyValueFromAttribute(value, options);
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
        }
    }
    /**
     * This protected version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */
    requestUpdateInternal(name, oldValue, options) {
        let shouldRequestUpdate = true;
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            const ctor = this.constructor;
            options = options || ctor.getPropertyOptions(name);
            if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                if (!this._changedProperties.has(name)) {
                    this._changedProperties.set(name, oldValue);
                }
                // Add to reflecting properties set.
                // Note, it's important that every change has a chance to add the
                // property to `_reflectingProperties`. This ensures setting
                // attribute + property reflects correctly.
                if (options.reflect === true &&
                    !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                    if (this._reflectingProperties === undefined) {
                        this._reflectingProperties = new Map();
                    }
                    this._reflectingProperties.set(name, options);
                }
            }
            else {
                // Abort the request if the property should not be considered changed.
                shouldRequestUpdate = false;
            }
        }
        if (!this._hasRequestedUpdate && shouldRequestUpdate) {
            this._updatePromise = this._enqueueUpdate();
        }
    }
    /**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */
    requestUpdate(name, oldValue) {
        this.requestUpdateInternal(name, oldValue);
        return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async _enqueueUpdate() {
        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await this._updatePromise;
        }
        catch (e) {
            // Ignore any previous errors. We only care that the previous cycle is
            // done. Any error should have been handled in the previous update.
        }
        const result = this.performUpdate();
        // If `performUpdate` returns a Promise, we await it. This is done to
        // enable coordinating updates with a scheduler. Note, the result is
        // checked to avoid delaying an additional microtask unless we need to.
        if (result != null) {
            await result;
        }
        return !this._hasRequestedUpdate;
    }
    get _hasRequestedUpdate() {
        return (this._updateState & STATE_UPDATE_REQUESTED);
    }
    get hasUpdated() {
        return (this._updateState & STATE_HAS_UPDATED);
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */
    performUpdate() {
        // Abort any update if one is not pending when this is called.
        // This can happen if `performUpdate` is called early to "flush"
        // the update.
        if (!this._hasRequestedUpdate) {
            return;
        }
        // Mixin instance properties once, if they exist.
        if (this._instanceProperties) {
            this._applyInstanceProperties();
        }
        let shouldUpdate = false;
        const changedProperties = this._changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.update(changedProperties);
            }
            else {
                this._markUpdated();
            }
        }
        catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            // Ensure element can accept additional updates after an exception.
            this._markUpdated();
            throw e;
        }
        if (shouldUpdate) {
            if (!(this._updateState & STATE_HAS_UPDATED)) {
                this._updateState = this._updateState | STATE_HAS_UPDATED;
                this.firstUpdated(changedProperties);
            }
            this.updated(changedProperties);
        }
    }
    _markUpdated() {
        this._changedProperties = new Map();
        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */
    get updateComplete() {
        return this._getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */
    _getUpdateComplete() {
        return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    update(_changedProperties) {
        if (this._reflectingProperties !== undefined &&
            this._reflectingProperties.size > 0) {
            // Use forEach so this works even if for/of loops are compiled to for
            // loops expecting arrays
            this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
            this._reflectingProperties = undefined;
        }
        this._markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    updated(_changedProperties) {
    }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    firstUpdated(_changedProperties) {
    }
}
_a = finalized;
/**
 * Marks class as having finished creating properties.
 */
UpdatingElement[_a] = true;

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
const supportsAdoptingStyleSheets = (window.ShadowRoot) &&
    (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) &&
    ('adoptedStyleSheets' in Document.prototype) &&
    ('replace' in CSSStyleSheet.prototype);
const constructionToken = Symbol();
class CSSResult {
    constructor(cssText, safeToken) {
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
    }
    // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.
    get styleSheet() {
        if (this._styleSheet === undefined) {
            // Note, if `supportsAdoptingStyleSheets` is true then we assume
            // CSSStyleSheet is constructable.
            if (supportsAdoptingStyleSheets) {
                this._styleSheet = new CSSStyleSheet();
                this._styleSheet.replaceSync(this.cssText);
            }
            else {
                this._styleSheet = null;
            }
        }
        return this._styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
/**
 * Wrap a value for interpolation in a [[`css`]] tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */
const unsafeCSS = (value) => {
    return new CSSResult(String(value), constructionToken);
};
const textFromCSSResult = (value) => {
    if (value instanceof CSSResult) {
        return value.cssText;
    }
    else if (typeof value === 'number') {
        return value;
    }
    else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
    }
};
/**
 * Template tag which which can be used with LitElement's [[LitElement.styles |
 * `styles`]] property to set element styles. For security reasons, only literal
 * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
 * may be used inside a template string part.
 */
const css = (strings, ...values) => {
    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, constructionToken);
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = []))
    .push('2.4.0');
/**
 * Sentinal value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */
const renderNotImplemented = {};
/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the [[`properties`]] property or the [[`property`]] decorator.
 */
class LitElement extends UpdatingElement {
    /**
     * Return the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * @nocollapse
     */
    static getStyles() {
        return this.styles;
    }
    /** @nocollapse */
    static _getUniqueStyles() {
        // Only gather styles once per class
        if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
            return;
        }
        // Take care not to call `this.getStyles()` multiple times since this
        // generates new CSSResults each time.
        // TODO(sorvell): Since we do not cache CSSResults by input, any
        // shared styles will generate new stylesheet objects, which is wasteful.
        // This should be addressed when a browser ships constructable
        // stylesheets.
        const userStyles = this.getStyles();
        if (Array.isArray(userStyles)) {
            // De-duplicate styles preserving the _last_ instance in the set.
            // This is a performance optimization to avoid duplicated styles that can
            // occur especially when composing via subclassing.
            // The last item is kept to try to preserve the cascade order with the
            // assumption that it's most important that last added styles override
            // previous styles.
            const addStyles = (styles, set) => styles.reduceRight((set, s) => 
            // Note: On IE set.add() does not return the set
            Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set);
            // Array.from does not work on Set in IE, otherwise return
            // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()
            const set = addStyles(userStyles, new Set());
            const styles = [];
            set.forEach((v) => styles.unshift(v));
            this._styles = styles;
        }
        else {
            this._styles = userStyles === undefined ? [] : [userStyles];
        }
        // Ensure that there are no invalid CSSStyleSheet instances here. They are
        // invalid in two conditions.
        // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
        //     this is impossible to check except via .replaceSync or use
        // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
        //     false)
        this._styles = this._styles.map((s) => {
            if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
                // Flatten the cssText from the passed constructible stylesheet (or
                // undetectable non-constructible stylesheet). The user might have
                // expected to update their stylesheets over time, but the alternative
                // is a crash.
                const cssText = Array.prototype.slice.call(s.cssRules)
                    .reduce((css, rule) => css + rule.cssText, '');
                return unsafeCSS(cssText);
            }
            return s;
        });
    }
    /**
     * Performs element initialization. By default this calls
     * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
     * captures any pre-set values for registered properties.
     */
    initialize() {
        super.initialize();
        this.constructor._getUniqueStyles();
        this.renderRoot = this.createRenderRoot();
        // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
        // element's getRootNode(). While this could be done, we're choosing not to
        // support this now since it would require different logic around de-duping.
        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
            this.adoptStyles();
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */
    createRenderRoot() {
        return this.attachShadow({ mode: 'open' });
    }
    /**
     * Applies styling to the element shadowRoot using the [[`styles`]]
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */
    adoptStyles() {
        const styles = this.constructor._styles;
        if (styles.length === 0) {
            return;
        }
        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
        }
        else if (supportsAdoptingStyleSheets) {
            this.renderRoot.adoptedStyleSheets =
                styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
        }
        else {
            // This must be done after rendering so the actual style insertion is done
            // in `update`.
            this._needsShimAdoptedStyleSheets = true;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (this.hasUpdated && window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param _changedProperties Map of changed properties with old values
     */
    update(changedProperties) {
        // Setting properties in `render` should not trigger an update. Since
        // updates are allowed after super.update, it's important to call `render`
        // before that.
        const templateResult = this.render();
        super.update(changedProperties);
        // If render is not implemented by the component, don't call lit-html render
        if (templateResult !== renderNotImplemented) {
            this.constructor
                .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
        }
        // When native Shadow DOM is used but adoptedStyles are not supported,
        // insert styling after rendering to ensure adoptedStyles have highest
        // priority.
        if (this._needsShimAdoptedStyleSheets) {
            this._needsShimAdoptedStyleSheets = false;
            this.constructor._styles.forEach((s) => {
                const style = document.createElement('style');
                style.textContent = s.cssText;
                this.renderRoot.appendChild(style);
            });
        }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `NodePart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     */
    render() {
        return renderNotImplemented;
    }
}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */
LitElement['finalized'] = true;
/**
 * Reference to the underlying library method used to render the element's
 * DOM. By default, points to the `render` method from lit-html's shady-render
 * module.
 *
 * **Most users will never need to touch this property.**
 *
 * This  property should not be confused with the `render` instance method,
 * which should be overridden to define a template for the element.
 *
 * Advanced users creating a new base class based on LitElement can override
 * this property to point to a custom render method with a signature that
 * matches [shady-render's `render`
 * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
 *
 * @nocollapse
 */
LitElement.render = render;

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
      console.log(component.parentElement);

      // const { width, height, x, y } = this.parentElement.getBoundingClientRect();

      // use this for mobiles to override posistion
      component.main = component.shadowRoot.querySelector(`main`);
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
