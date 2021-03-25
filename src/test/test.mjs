// import * as fetch from 'node-fetch';
import * as data from './test_exports.mjs';

// https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules
import { Crossword, Variable } from '../../public/cross.mjs';

const width = 15;
const height = 15;
const crossword = new Crossword({constraints:data.constraint_values}, {vocab:data.words}, width, height);


function test_variables(crossword){
    const test_vars = data.variables.split('Variable').map(vrs => vrs.replace(',\n', '')).filter(vr => Boolean(vr));

    if (crossword.variables.size != test_vars.length) {
        throw(Error('mis-matched variable length'));
    }

    for (let vr of crossword.variables) {
        if(!test_vars.find(t => t==vr.toString()) ) {
            throw(Error(vr));
        }    
    }
}

function test_overlaps(crossword) {
    const overlaps = crossword.overlaps;
    if(overlaps.size!= data.overlaps_size) {
        throw(Error('mis-matched overlaps'));
    }
    
    data.sample_overlaps.forEach((overlap, variables) => {
        const v0 = {};
        const v1 = {};
        [v0.i, v0.j, v0.direction, v0.length] = variables[0];
        [v1.i, v1.j, v1.direction, v1.length] = variables[1];
        console.log(v0, v1, overlap);
        overlaps.forEach((value, key) => {
            // const k0 = key[0];
            // const k1 = key[1];
            const [k0, k1] = key;
            if(k0.equals(v0) && k1.equals(v1)) {
                if(!overlap && !value){
                    console.log('ok');                        
                }                  
                else if(!Variable.isSameCell(value,overlap)) {
                    throw(Error(value, key));
                } else {
                    console.log('ok');
                } 
            }         
        });

    });
  
} 


test_variables(crossword);
test_overlaps(crossword);
