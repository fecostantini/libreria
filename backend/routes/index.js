const express = require('express');
const router = express.Router();

router.use('/autor', require('./rutasAutor'));

module.exports = router;
