/* eslint-disable no-undef */
// https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules
// require('dotenv').config(); // read .env files and write to process.env
import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
// const cors = require('cors');
// const express = require('express');
// const { join } = require('path');

// const gridRouter = require('./src/resources/grid.router.js');
// const vocabRouter = require('./src/resources/vocab.router.js');
// const solutionRouter = require('./src/resources/solution.router.js');
// const cluesRouter = require('./src/resources/clues.router.js');
// const generateRouter = require('./src/resources/generate.router.js');

import { router as gridRouter } from './src/resources/grid.router.mjs';
import { router as vocabRouter } from './src/resources/vocab.router.mjs';
import { router as solutionRouter } from './src/resources/solution.router.mjs';
import { router as cluesRouter } from './src/resources/clues.router.mjs';
import { router as generateRouter } from './src/resources/generate.router.mjs';

// work around for using __dirname when using ES6 modules
/* eslint-disable no-alert */
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.port || 3000;

const WEB_PATH = join(__dirname, 'public');

const MODULE_PATH = join(__dirname, 'node_modules');

//@ TODO move this to file
const fileServer = express.static(WEB_PATH, { // OPTIONS OBJECT 
    setHeaders(res, path) {
        const parts = path.split('.');
        if (parts[parts.length - 1] == 'mjs') {
            // JUST TO MAKE SURE THAT IT IS SERVED AS JAVASCRIPT
            // REF: https://v8.dev/features/modules#mjs
            res.setHeader('Content-Type', 'text/javascript');
        }
    }
});


// ALLOW LOADING FROM MODULES
const ModuleServer = express.static(MODULE_PATH, { // OPTIONS OBJECT 
    setHeaders(res, path) {
        const parts = path.split('.');
        if (parts[parts.length - 1] == 'mjs') {
            // JUST TO MAKE SURE THAT IT IS SERVED AS JAVASCRIPT
            // REF: https://v8.dev/features/modules#mjs
            res.setHeader('Content-Type', 'text/javascript');
        }
    }
});

// Enable ALL cors requests
// REF: https://www.npmjs.com/package/cors
app.use(cors());

app.use(ModuleServer);

app.use('/node_modules/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.status(200).sendFile(`${MODULE_PATH}/${req.url}`);
});

app.use(fileServer);

app.use('/api/grids/', gridRouter);
app.use('/api/words/', vocabRouter);
app.use('/api/solutions/', solutionRouter);
app.use('/api/clues/', cluesRouter);

// app.use(express.json())    // <==== parse request body as JSON
app.use('/api/generate/', express.json(), generateRouter);


app.use((req, res) => res.sendFile(`${WEB_PATH}/index.html`));


app.listen(port, () => { console.log(`listening on ${port}`); });
