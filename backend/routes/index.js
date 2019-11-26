const express = require('express');
const router = express.Router();

router.use('/autor', require('./rutasAutor'));
router.use('/libro', require('./rutasLibro'));
router.use('/editorial', require('./rutasEditorial'));
router.use('/categoria', require('./rutasCategoria'));
router.use('/saga', require('./rutasSaga'));
router.use('/usuario', require('./rutasUsuario'));

module.exports = router;
