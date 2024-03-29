const express = require('express');
const router = express.Router();

router.use('/autor', require('./rutasAutor'));
router.use('/libro', require('./rutasLibro'));
router.use('/fotocopia', require('./rutasFotocopia'));
router.use('/editorial', require('./rutasEditorial'));
router.use('/categoria', require('./rutasCategoria'));
router.use('/saga', require('./rutasSaga'));
router.use('/usuario', require('./rutasUsuario'));
router.use('/producto', require('./rutasProducto'));
router.use('/promocion', require('./rutasPromocion'));
router.use('/carrito', require('./rutasCarrito'));
router.use('/pedido', require('./rutasPedido'));
router.use('/mailsender', require('./rutasMailSender'));

// mercadopago
router.use('/mercadopago', require('./rutasMercadoPago'));

module.exports = router;
