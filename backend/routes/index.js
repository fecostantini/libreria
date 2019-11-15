const express = require('express');
const router = express.Router();

router.use('/autor', require('./rutasAutor'));
router.use('/libro', require('./rutasLibro'));
router.use('/editorial', require('./rutasEditorial'));
router.use('/categoria', require('./rutasCategoria'));

module.exports = router;
