// import * as fetch from 'node-fetch';
import * as data from './test_exports.mjs';
import fetch from 'node-fetch';


// https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules
import { Crossword, Variable } from '../../public/cross.mjs';
import { CrosswordCreator } from '../../public/generate.mjs';


const width = 15;
const height = 15;
const crossword = new Crossword({ constraints: data.constraint_values }, { vocab: data.words }, width, height);


function test_variables(crossword) {
    const test_vars = data.variables.split('Variable').map(vrs => vrs.replace(',\n', '')).filter(vr => Boolean(vr));

    if (crossword.variables.size != test_vars.length) {
        throw (Error('mis-matched variable length'));
    }

    for (let vr of crossword.variables) {
        if (!test_vars.find(t => t == vr.toString())) {
            throw (Error(vr));
        }
    }
}

function test_overlaps(crossword) {
    const overlaps = crossword.overlaps;
    if (overlaps.size != data.overlaps_size) {
        throw (Error('mis-matched overlaps'));
    }

    // data.sample_overlaps.forEach((overlap, variables) => {
    //     const v0 = {};
    //     const v1 = {};
    //     [v0.i, v0.j, v0.direction, v0.length] = variables[0];
    //     [v1.i, v1.j, v1.direction, v1.length] = variables[1];
    //     console.log(v0, v1, overlap);
    //     overlaps.forEach((value, key) => {
    //         // const k0 = key[0];
    //         // const k1 = key[1];
    //         const [k0, k1] = key;
    //         if (k0.equals(v0) && k1.equals(v1)) {
    //             if (!overlap && !value) {
    //                 console.log('ok');
    //             }
    //             else if (!Variable.isSameCell(value, overlap)) {
    //                 throw (Error(value, key));
    //             } else {
    //                 console.log('ok');
    //             }
    //         }
    //     });
    // });
    const variables = Array.from(crossword.variables);
    // const test = variables.find(v => v.equals(new Variable(8, 14, 'down', 3)));
    // const expected = new Set([new Variable(10, 11, 'across', 4), new Variable(8, 7, 'across', 8), new Variable(9, 4, 'across', 11)]);
    // const test = variables.find(v => v.equals(new Variable(0, 0, 'across', 8)));
    // const expected = new Set([new Variable(0, 0, 'down', 3), new Variable(0, 1, 'down', 3), new Variable(0, 2, 'down', 3), new Variable(0, 3, 'down', 9), new Variable(0, 4, 'down', 4),
    // new Variable(0, 5, 'down', 4), new Variable(0, 6, 'down', 4), new Variable(0, 7, 'down', 4)]);
    const test = variables.find(v => v.equals(new Variable(9, 4, 'across', 11)));
    const expected = new Set([new Variable(5, 7, 'down', 5), new Variable(6, 11, 'down', 9), new Variable(7, 10, 'down', 3), new Variable(7, 8, 'down', 3), new Variable(7, 9, 'down', 3),
    new Variable(8, 12, 'down', 3), new Variable(8, 13, 'down', 3), new Variable(8, 14, 'down', 3), new Variable(9, 4, 'down', 6), new Variable(9, 5, 'down', 5), new Variable(9, 6, 'down', 3)]);

    const found = crossword.neighbors(test);
    let res = 0;
    for (let e of expected) {
        for (let f of found) {
            if (e.equals(f)) {
                res++;
            }
        }
    }
    if (res != expected.size) {
        throw (Error(`Failed: expected ${expected.size}, found: ${res}`));
    } else {
        console.log('All found:', crossword.neighbors(test));
    }

}

function test_solve() {
    fetch('http://localhost:3000/api/words')
        .then((response) => response.json())
        .then((response) => {
            const { vocab } = response;
            // console.log(vocab.length);
            try {
                const crossword = new Crossword({ constraints: data.constraint_values }, { vocab: vocab }, ...[15, 15]);
                // const crossword = new Crossword({ constraints: data.test_create_constraints2 }, { vocab: data.test_create_words2 }, ...data.test_create_size2);
                // const crossword = new Crossword({ constraints: data.test_create_constraints1 }, { vocab: data.test_create_words1 }, ...data.test_create_size1);
                //const crossword = new Crossword({ constraints: data.test_create_constraints0 }, { vocab: data.test_create_words0 }, ...data.test_create_size0);

                console.log('crossword created');

                const create = new CrosswordCreator(crossword);
                // assignment might be null if there is no solution
                const assignment = create.solve();
                if (assignment) {
                    create.print(assignment);
                    // console.log(assignment);
                } else {
                    console.log('no solution');
                }
            } catch (e) {
                console.log(e);
                throw (Error('not valid crossword'));
            }

        }, console.error);
}


//test_variables(crossword);
// test_overlaps(crossword);
test_solve();
