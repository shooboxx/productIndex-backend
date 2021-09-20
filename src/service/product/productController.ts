
export {};

const s = require('./productService') 
const express = require('express');
const router = express.Router();

router.get('/products', (req: any, res: any) => {

    return res.send(JSON.stringify(s.getAllProducts()))
    // productService.get
});

module.exports = router