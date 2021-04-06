import { Variable } from './cross.mjs';
import {
    not, isBlackCell, getCellNumber, isLetterEnglish, fillBlue, fillWhite, fillYellow, getCellVariable, isHiddenNode, getCellCoords, createUserAction, touchesDistance, touchesCoords
} from './helper.mjs';


export class Action {

    constructor(crossword, direction, startOfWordCells) {
        this.crossword = crossword;
        this.rafPending = false;

        this.selected;
        this.direction = direction; // initial direction setting
        this.cellSpace;

        // these are static once the crossword is complete, don't recalculate it every time  
        this.startOfWordCells = startOfWordCells;  // this is ordered by word index for the display cells    
        this.variables = Array.from(crossword.variables);
        const cells = [...document.querySelectorAll('svg [id*="cell-id"]')];
        this.activeCells = cells.filter(not(isBlackCell));

        // handle Multi-Touch events for devices that support PointerEvents
        this.pointerCaches = {
            'pointerdown': []
        };
        this.handlePointerUp;
        this.movePending = false;


        this.zoomStart;
        this.zoomLevel = 1;
        this.zoomPending = false;
        this.zoomInLimit = 3;
        this.zoomOutLimit = 0.6;

        this.initialTouch;
        this.lastHoldPosition = [0, 0];
        this.position = [0, 0];
    }


    // Receives a keyboard Event or a synthesized event for direct call
    // synthesized event: {key, code, type, shiftKey}
    keydown(evt) {
        //console.log(this);

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

            if (this.direction == 'across') {
                this.moveToCell(cellNumber, 1);
            } else {
                this.moveToCell(cellNumber, 15);
            }

            return;
        }

        if (['Delete', 'Backspace'].includes(evt.key)) {

            const [, , existingContent] = this.removeExistingContent(cellId);

            if (evt.key == 'Backspace') {
                let next;
                if (this.direction == 'across') {
                    next = this.moveToCell(cellNumber, -1);
                } else {
                    next = this.moveToCell(cellNumber, -15);
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
            this.moveToCell(cellNumber, this.crossword.width);
            return;
        }
        if (evt.key == 'ArrowUp') {
            // const nextId = cellNumber -crossword.width;
            this.moveToCell(cellNumber, -this.crossword.width);
            return;
        }
        if (evt.key == 'ArrowLeft') {
            //const nextId = cellNumber - 1;
            this.moveToCell(cellNumber, -1);
            return;
        }
        if (evt.key == 'ArrowRight') {
            // const nextId = cellNumber + 1;
            this.moveToCell(cellNumber, 1);
            return;
        }

        if (evt.key == 'Tab') {
            let next;
            const currentIndex = this.startOfWordCells.findIndex(({ cell }) => getCellVariable(cell, this.direction) == getCellVariable(target, this.direction));
            if (evt.shiftKey) {
                // go back 1 word
                // next = startOfWordCellsReversed.find(({cell}) => getCellNumber(cell) < cellNumber);
                const anchor = currentIndex == 0 ? this.startOfWordCells.length : currentIndex;
                next = this.startOfWordCells[anchor - 1];

            } else {
                // go to next word
                // next = startOfWordCells.find(({cell}) => getCellNumber(cell) > cellNumber);
                const anchor = currentIndex == this.startOfWordCells.length - 1 ? -1 : currentIndex;
                next = this.startOfWordCells[anchor + 1];
            }
            if (next) {
                this.direction = next.direction;
                // synchronous dispatch : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
                // :dispatchEvent() invokes event handlers synchronously

                // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#event_bubbling
                //: trigger an event from a child element, and have an ancestor catch it(svg will catch it)
                next.cell.dispatchEvent(new Event(createUserAction()), { bubbles: true });
            }
            return;
        }
    }

    activate(evt) {

        evt.preventDefault();

        // prevent cell activation when we have multi-touch
        // // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Multi-touch_interaction#pointer_down

        // if the device doesn't support PointerEvents, then we are listening to touches
        // In this case we don't want to listen to zooming
        if (evt.touches && evt.touches.length == 2) {
            return;
        }


        // synthetic event for initial highlighting
        if (!evt.touches && !evt.pointerType) {
            // synthetic event
            this.handlePointerEvent(evt);
            return;
        }

        // Handle MULTI-TOUCH event In case the device supports Pointer Events (we have set the PointerDown event in main.mjs)
        if (this.pointerCaches[evt.type].length) {
            this.clearCache(evt.type);
            return;
        }


        // non - synthetic events
        this.pushEvent(evt);

        this.handlePointerUp = this.handlePointerEvent.bind(this, evt);

        evt.target.addEventListener('pointerup', this.handlePointerUp, true);

    }


    // function overloading for pointerupEvent
    handlePointerEvent(pointerdownEvent, pointerupEvent) {

        const el = document.getElementById(pointerdownEvent.target.id);

        if (el && el.id.includes('cell') && not(isBlackCell)(el)) {

            if (pointerupEvent) { // If not synthetic event
                this.clearCache(pointerdownEvent.type);
            }

            if (this.rafPending) {
                return;
            }

            // doubleclicking to change direction
            if (this.selected && el.id == this.selected.id) {
                this.changeDirection();
                return;
            }

            this.selected = el;
            this.rafPending = true;

            const updateCellView = this.updateCellView.bind(this, pointerdownEvent);
            window.requestAnimationFrame(updateCellView);
            // allow next activation
        }
    }

    updateCellView(evt) {

        if (!this.rafPending) {
            return;
        }

        // get the coords of the selected = variable
        const selectedVariableCoords = getCellVariable(this.selected, this.direction); // selected.getAttribute(`data-variable-${direction}`);           

        // get the cells that belong to the same variable as the selected         
        // const refCells = [...document.querySelectorAll(`svg [data-variable-${direction}="${selectedVariableCoords}"]`)];
        const refCells = this.activeCells.filter(cell => getCellVariable(cell, this.direction) == selectedVariableCoords);

        const notInSelectedCells = this.activeCells.filter(cell => !refCells.includes(cell));
        notInSelectedCells.forEach(fillWhite);
        refCells.forEach(fillBlue);
        fillYellow(this.selected);

        this.rafPending = false;

        // make Aria Label
        const prepareForArialLabel = this.prepareForArialLabel.bind(this);
        window.requestAnimationFrame(prepareForArialLabel);
    }

    prepareForArialLabel() {
        const selectedCellCoords = getCellCoords(this.selected, this.crossword.width, this.crossword.height);
        const selectedCellVariable = getCellVariable(this.selected, this.direction).split('-'); //selected.getAttribute(`data-variable-${direction}`).split('-');
        const word = this.variables.find(v => Variable.isSameCell([v.i, v.j], selectedCellVariable) && v.direction == this.direction);
        const letterIndex = word.cells.findIndex(cell => Variable.isSameCell(selectedCellCoords, cell));
        this.activeCells.forEach(this.makeCellAriaLabel.bind(this, word, letterIndex));
    }

    makeCellAriaLabel(word, letterIndex, cell) {
        const wordLengthDesc = `${word.length} letters`;
        const prefix = `${this.direction[0]}`.toUpperCase();
        const wordNumber = this.startOfWordCells.findIndex(({ cell }) => getCellVariable(cell, this.direction) == getCellVariable(this.selected, this.direction));
        cell.setAttributeNS(null, 'aria-label', `${prefix}${wordNumber + 1}: clue, Answer: ${wordLengthDesc}, Letter ${letterIndex + 1}`);
    }

    moveToCell(cellNumber, diff) {

        let nextId = cellNumber + diff;
        let next = document.getElementById(`cell-id-${nextId}`);
        while (next && isBlackCell(next)) {
            nextId += diff;
            next = document.getElementById(`cell-id-${nextId}`);
        }
        if (next) {
            // synchronous dispatch : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
            next.dispatchEvent(new Event(createUserAction()), { bubbles: true, });
            // @TODO add new Event support for IE 11?
        }
        return next;
    }

    removeExistingContent(cellId) {
        const letterId = cellId.replace('cell', 'letter');
        const text = document.querySelector(`#${letterId}`);
        const hiddenText = document.querySelector(`#${letterId} .hidden`);

        const content = [...text.childNodes].find(not(isHiddenNode));
        if (content) {
            text.removeChild(content);
        }
        return ([text, hiddenText, content]);
    }


    changeDirection() {
        const [changeDirection] = [Variable.ACROSS, Variable.DOWN].filter(dir => dir !== this.direction);
        this.direction = changeDirection;
        const cell = this.selected;
        this.selected = null; // prevent loop
        cell.dispatchEvent(new Event(createUserAction()), { bubbles: true });
    }

    // zoom and touchMove events
    touchAction(src, evt) {

        if (evt.cancelable) {
            evt.preventDefault();
        }

        //@TODO change? --  clear the cache for the pointerdown before this touchMove event, since we don't want to activate a cell
        this.clearCache('pointerdown');

        if (evt.touches.length >= 2) {

            // REF: https://developers.google.com/web/fundamentals/design-and-ux/input/touch#use_requestanimationframe
            if (this.zoomPending || this.movePending) {
                return;
            }

            if (!this.zoomStart) {
                this.zoomStart = touchesDistance(...evt.touches);
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
            // 1 finger touch = move

            // REF: https://developers.google.com/web/fundamentals/design-and-ux/input/touch#use_requestanimationframe
            if (this.zoomPending || this.movePending || this.zoomLevel == 1) {
                return;
            }
            if (!this.initialTouch) {
                this.initialTouch = touchesCoords(evt.touches[0]);
                return;

            } else {
                const [nextX, nextY] = touchesCoords(evt.touches[0]);
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


    reset(src, evt) {
        evt.preventDefault();

        this.zoomPending = false;
        this.zoomStart = undefined;
        this.movePending = false;

        // update move event
        this.position = [...this.lastHoldPosition];
        this.initialTouch = undefined;

        //Schedule a reset if too large or to small
        //if too small, then reset to 1 AND center to the middle(x = y = o)
        // if too big, then reset to 2

        if ((parseFloat(this.zoomLevel) < 1) || (2 <= parseFloat(this.zoomLevel))) {

            const resetZoom = function () {
                let x, y;
                if (!this.zoomPending) {
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
                }

                src.style.transition = 'transform 0.5s ease-in 0s';
                /// x,y are taken from the closure
                src.style.transform = `translate(${x}px, ${y}px) scale(${this.zoomLevel})`;

                this.zoomPending = false;

            }.bind(this);

            this.zoomPending = true;
            window.requestAnimationFrame(resetZoom);

        }

        // Schedule a reset touch position too left or too right
        const { x, y, width, height, left, top, bottom, right } = src.getBoundingClientRect();
        const keyBoardHeight = document.querySelector('.keyboard.touch').getBoundingClientRect().height; //;
        const { availWidth, availHeight } = window.screen;
        const statusBarHeight = availHeight - window.innerHeight;

        // the reset values for the translate function are relative to the original position, considered 0, no matter the x,y values
        let [resetX, resetY] = [...this.position];


        if (this.zoomLevel > 1) {

            const resetMove = function () {

                // if (!this.movePending) {
                //     return;
                // }

                if (left < -(width - availWidth)) {
                    resetX = ((availWidth - width) / 2) - (10);
                } else if (right > width) { // if we have moved from the original (right = width)
                    resetX = Math.abs(((availWidth - width) / 2)) + 10;
                }

                // console.log(top, height, bottom, availHeight);

                if (bottom > height) { // if we moved down
                    resetY = Math.abs((availHeight - (keyBoardHeight + statusBarHeight) - height) / 2); //relative to the original
                } // else if (bottom < (availHeight - keyBoardHeight) / 2) { // don't pass over half of the screen
                //     resetY = (height - availHeight - keyBoardHeight);
                // }
                else if (top < -(height - statusBarHeight)) { // don't pass over half of the screen
                    resetY = ((availHeight + statusBarHeight - height) / 2);
                }

                // touchEnd         
                src.style.transition = 'transform 0.5s ease-in 0s';
                /// x,y are taken from the closure
                src.style.transform = `translate(${resetX}px, ${resetY}px) scale(${this.zoomLevel})`;

                this.position = [resetX, resetY];
                this.lastHoldPosition = [...this.position];

                this.movePending = false;


            }.bind(this);

            this.movePending = true;
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
        cache.push(ev);
    }

    clearCache(type) {
        // Remove this event from the target's cache
        let cache = this.getCache(type);

        for (let i = 0; i < cache.length; i++) {
            //@ TODO change? be careful!! remove the pointerup event for cache[pointerdown]       
            cache[i].target.removeEventListener('pointerup', this.handlePointerUp, true);
        }

        this.pointerCaches[type] = [];
        this.handlePointerUp = undefined;

    }



}

