const express = require('express');
const router = express.Router();

router.use('/autor', require('./rutasAutor'));
router.use('/libro', require('./rutasLibro'));

module.exports = router;
