import * as fetch from "node-fetch";
import * as data from './exports.mjs';

import { Crossword } from './public/cross.mjs';


const crossword = new Crossword({constraints:data.constraint_values}, {vocab:data.words}, 15, 15);


function test_variables(crossword){
    const test_vars = data.variables.split('Variable').map(vrs => vrs.replace(',\n', '')).filter(vr => Boolean(vr));

    if (crossword.variables.size != test_vars.length) {
        throw(Error('mis-matched variable length'))
    }

    for (let vr of crossword.variables) {
        if(!test_vars.find(t => t==vr.toString()) ) {
            throw(Error(vr));
        }    
    }
}

function test_overlaps(crossword) {

    const overlaps = crossword.overlaps;
    if(crossword.overlaps.size!= data.overlaps_size) {
        throw(Error('mis-matched overlaps'));
    }
    
    data.sample_overlaps.forEach((overlap, variables) => {
        const v0 = {};
        const v1 = {};
        [v0.i, v0.j, v0.direction, v0.length] = variables[0];
        [v1.i, v1.j, v1.direction, v1.length] = variables[1];
        console.log(v0, v1, overlap)
        crossword.overlaps.forEach((value, key) => {
            const k0 = key[0];
            const k1 = key[1];
            if(k0.equals(v0) && k1.equals(v1)) {
                if(!overlap && !value){
                    console.log("ok");                        
                }                  
                else if(overlap[0] !== value[0] || overlap[1] !== value[1]) {
                    throw(Error(value, key))
                } else {
                    console.log("ok")
                } 
            }
            // if(k0.i == v0.i &&  k0.j ==v0.j && k0.direction == v0.direction && k0.length == v0.length ) {
            //     if(k1.i == v1.i &&  k1.j ==v1.j && k1.direction == v1.direction && k1.length == v1.length ) { 
            //         if(!overlap && !value){
            //             console.log("ok");                        
            //         }                  
            //         else if(overlap[0] !== value[0] || overlap[1] !== value[1]){
            //             throw(Error(value, key))
            //         } else {
            //             console.log("ok")
            //         }
            //     }
            // }
        });

    });
  
} 


test_variables(crossword);
test_overlaps(crossword);
