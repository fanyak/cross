/* eslint-disable no-undef */
// https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules
require('dotenv').config(); // read .env files and write to process.env
const express = require('express');
const { join } = require('path');

const gridRouter = require('./src/resources/grid.router.js');
const vocabRouter = require('./src/resources/vocab.router.js');

const app = express();
const port = process.env.port || 3000;

const WEB_PATH = join(__dirname, 'public');

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

app.use(fileServer);

app.use('/api/grids/', gridRouter);
app.use('/api/words/', vocabRouter);


app.use((req, res) => res.sendFile(`${WEB_PATH}/index.html`));


app.listen(port, () => { console.log(`listening on ${port}`); });
