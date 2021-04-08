const express = require('express');
const router = express.Router();

// const fetch = require("node-fetch");
const fs = require('fs');

// @TODO find grids that fit the discription
// /api/list
// router
//   .route('/')
//   .get(() => {})
//   .post(() => {})

// /api/list/:id
router
    .route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        fs.readFile(`src/resources/clues${id}.txt`, 'utf8', (error, data) => {
            if (error) {
                console.log(error);
                res.status(404).send(JSON.stringify({ clues: [] }));
                //end();
            }
            const clues = JSON.parse(data);
            res.status(200).send(JSON.stringify({ clues }));  // @TODO send all constraints       
        });

    });


module.exports = router;
