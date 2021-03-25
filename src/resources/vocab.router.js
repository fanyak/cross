//https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules

const express = require('express');
const router = express.Router();

const fs = require('fs');

router.route('/').get((req, res)=> {
    fs.readFile('src/resources/vocab.txt', 'utf8', (error, data) => {
        if(error){
            res.status(404).send(JSON.stringify({vocab: []}));
        } else {
            const vocab = data.split('\r\n');
            console.log(vocab.slice(0,10));
            res.status(200).send(JSON.stringify({vocab:vocab}));
        }
    });
});


module.exports = router;
