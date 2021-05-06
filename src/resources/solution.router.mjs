// const express = require('express');
import express from 'express';
import fs from 'fs';
const router = express.Router();

// const fetch = require("node-fetch");
// const fs = require('fs');

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
        fs.readFile(`src/resources/solution${id}.txt`, 'utf8', (error, data) => {
            if (error) {
                console.log(error);
                res.status(404).send(JSON.stringify({ solution: {} }));
                //end();
            }
            const solution = JSON.parse(data);
            res.status(200).send(JSON.stringify({ solution }));  // @TODO send all constraints       
        });

    });


// module.exports = router;
export { router };
