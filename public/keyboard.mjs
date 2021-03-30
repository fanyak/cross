const qwerty = [
    ['Q', 'W', 'E', 'R', 'T', 'Y',' U', 'I', 'O', 'P'],
    ['A','S','D','F','G', 'H', 'J', 'K', 'L'],
    ['Z', 'X','C','V','B','N', 'M', '&#9003;']
];

export function createKeys() {
    const board = document.querySelector('.keyboard');
    console.log(board);

    for (let row of qwerty) {
        const group = document.createElement('div');
        group.classList.add('keyboard_row');
        for(let key of row) {
            const btn = document.createElement('div');
            const span = document.createElement('span');
            span.innerHTML = key;
            span.setAttribute('data-key', key);
            btn.appendChild(span);
            btn.classList.add('button');
            if(key == '&#9003;') { 
                btn.classList.add('backspace');  
            } 
            btn.setAttribute('role', 'button'); 
            group.appendChild(btn);
        }
        board.appendChild(group);
    }
}

export function extractKeyEvent(evt) {
    const target = evt.target;
    let key = target.getAttribute('data-key');
    if(key == '&#9003;') {
        key = 'Backspace';
    }
    const {type, code, shiftKey} = evt;
    return {key, code, type, shiftKey};
}
