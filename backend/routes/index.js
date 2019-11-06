const express = require('express');
const router = express.Router();

router.use('/autor', require('./rutasAutores'));

module.exports = router;
