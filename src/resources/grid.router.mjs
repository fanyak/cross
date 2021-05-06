// const express = require('express');
import express from 'express';
import fs from 'fs';

const router = express.Router();

// const fetch = require("node-fetch");
// const fs = require('fs');

// @TODO find grids that fit the discription
// /api/list
router
  .route('/')
  .get(() => { })
  .post((req, res) => {
    // Create new Grid
    fs.readFile('src/resources/constraints.txt', 'utf8', (error, data) => {
      if (error) {
        console.log(error);
        res.status(404).send(JSON.stringify({ id: null, constraints: [] }));
        //end();
      }
      const { constraints } = JSON.parse(data);
      const nextId = constraints.length;
      constraints.push([]);
      ///ASynchronously writes data to a file, replacing the file if it already exists. 
      ///Asynchronously writes data to a file, replacing the file if it already exists. 
      fs.writeFile('src/resources/constraints.txt', JSON.stringify({ constraints }), 'utf8', (err) => {
        if (err) {
          // @TODO somehow alert about the error
          res.status(404).send(JSON.stringify({ id: null, constraints: [] }));
        } else {
          res.status(200).send(JSON.stringify({ id: nextId, constraints: constraints[nextId] }));
        }
      });
    });
  });

// Get existing grid
// /api/list/:id
router
  .route('/:id')
  .get((req, res) => {
    const id = req.params.id;
    fs.readFile('src/resources/constraints.txt', 'utf8', (error, data) => {
      if (error) {
        console.log(error);
        res.status(404).send(JSON.stringify({ id, constraints: [] }));
        //end();
      }
      const { constraints } = JSON.parse(data);
      if (constraints[id]) {
        res.status(200).send(JSON.stringify({ id, constraints: constraints[id] }));  // @TODO send all constraints
      } else {
        res.status(404).send(JSON.stringify({ id, constraints: [] }));
      }
    });

  }) // update existing resourse
  .put((req, res) => {
    const id = req.params.id;

  });

// module.exports = router;
export { router };
