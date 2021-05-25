import express from 'express';
import fs from 'fs';
// https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules
import { Crossword, Variable } from '../../public/cross.mjs';
import { CrosswordCreator } from '../../public/generate.mjs';

const router = express.Router();

// const fetch = require("node-fetch");

// @TODO find grids that fit the discription
// /api/list
// router
//   .route('/')
//   .get(() => {})
//   .post(() => {})

// /api/list/:id
router
    .route('/')
    .post((req, res) => {
        // const load = req.params.load;
        const load = req.body;
        fs.readFile('src/resources/vocab.txt', 'utf8', (error, data) => {
            if (error) {
                res.status(404).send(JSON.stringify({ error: [] }));
            } else {
                const vocab = data.split('\r\n');
                const { constraints, width, height, solution, exclude } = load;
                const crossword = new Crossword({ 'constraints': JSON.parse(constraints) }, { 'vocab': vocab }, ...[width, height]);
                const create = new CrosswordCreator(crossword, JSON.parse(solution), JSON.parse(exclude));
                // assignment might be null if there is no solution
                const assignment = create.solve();
                if (assignment) {
                    create.print(assignment);
                    res.status(200).send(JSON.stringify({ 'solution': Array.from(assignment) }));
                } else {
                    console.log('no solution');
                    res.status(200).send(JSON.stringify({ 'solution': null }));
                }
            }
        });

    });


export { router };
