  // HELPER  FUNCTIONS
export function isBlackCell(cell) {
    // className returns a SVGAnimatedString for className
    const SVGAnimatedString = cell.className;
    return SVGAnimatedString.baseVal.includes('black');
}

export function getCellNumber(cell) {
   return parseInt(cell.id.split('-')[2]);
}

export function not(fn) {
    return (data) => !fn(data);        
}


