require('dotenv').config(); // read .env files and write to process.env
const express = require('express');
const gridRouter = require('./src/resources/grid.router.js');
const vocabRouter = require('./src/resources/vocab.router.js');

const app = express();
const port = process.env.port || 3000;

app.use(express.static('public'));

app.use('/api/grids/', gridRouter);
app.use('/api/words/', vocabRouter);


app.use((req, res) => res.sendFile(`${__dirname}/index.html`));


app.listen(port, () => { console.log(`listening on ${port}`); });
