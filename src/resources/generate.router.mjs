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
        console.log(req.body);
        fs.readFile('src/resources/vocab.txt', 'utf8', (error, data) => {
            if (error) {
                res.status(404).send(JSON.stringify({ error: [] }));
            } else {
                const vocab = data.split('\r\n');
                // const { constraints, width, height, solution } = JSON.parse(load);
                // const crossword = new Crossword({ constraints }, { vocab }, ...[width, height]);

                res.status(200).send(JSON.stringify({ width: 15 }));
            }
        });

    });


export { router };
