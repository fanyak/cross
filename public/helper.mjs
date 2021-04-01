// HELPER  FUNCTIONS
export function isBlackCell(cell) {
  // className returns a SVGAnimatedString for className
  const SVGAnimatedString = cell.className;
  return SVGAnimatedString.baseVal.includes('black');
}

export function isHiddenNode(node) {
  // className returns a SVGAnimatedString for className
  const SVGAnimatedString = node.className;
  return SVGAnimatedString && SVGAnimatedString.baseVal && SVGAnimatedString.baseVal.includes('hidden');
}

export function isLetterEnglish(char) {
  return /^[A-Za-z]{1}$/.test(char);
}

export function getCellNumber(cell) {
  return parseInt(cell.id.split('-')[2]);
}

export function getCellVariable(cell, direction) {
  return cell.getAttribute(`data-variable-${direction}`);
}

export function getCellCoords(cell, width, height) {
  const cellNumber = parseInt(cell.id.split('-')[2]);
  const i = Math.floor(cellNumber / height);
  const j = cellNumber % width;
  return ([i, j]);
}

export function fillWhite(cell) {
  cell.setAttributeNS(null, 'fill', '#fff');
}

export function fillBlue(cell) {
  cell.setAttributeNS(null, 'fill', 'lightblue');
}

export function fillYellow(cell) {
  cell.setAttributeNS(null, 'fill', '#fdea3f');
}

export function not(fn) {
  return (data) => !fn(data);
}


export function createUserAction() {
  let userAction = '';
  if (window.PointerEvent) {
    userAction = 'pointerdown';
  } else {
    userAction = navigator.maxTouchPoints < 1 ? 'mousedown' : 'touchstart';
  }
  return userAction;
}

export function touchesDistance(touch1, touch2) {
  var dist = Math.hypot(
    touch1.pageX - touch2.pageX,
    touch1.pageY - touch2.pageY);
  return dist;
}
