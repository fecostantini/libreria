/*
########   #######  ##       ########  ######  
##     ## ##     ## ##       ##       ##    ## 
##     ## ##     ## ##       ##       ##       
########  ##     ## ##       ######    ######  
##   ##   ##     ## ##       ##             ## 
##    ##  ##     ## ##       ##       ##    ## 
##     ##  #######  ######## ########  ###### 
*/

CREATE USER gestor_pedidos PASSWORD 'hoyvoyabailar';
CREATE USER usuario_comun PASSWORD 'alanavedelolvido';
GRANT ALL ON promocion TO postgres;
GRANT ALL ON producto TO postgres;
GRANT ALL ON editorial TO postgres;
GRANT ALL ON saga TO postgres;
GRANT ALL ON libro TO postgres;
GRANT ALL ON autor TO postgres;
GRANT ALL ON categoria TO postgres;
GRANT ALL ON valoracion TO postgres;
GRANT ALL ON sugerencia TO postgres;
GRANT ALL ON usuario TO postgres;
GRANT ALL ON fotocopia TO postgres;
GRANT ALL ON pedido TO postgres;
GRANT ALL ON compra TO postgres;
GRANT ALL ON autorxlibro TO postgres;
GRANT ALL ON categoriaxlibro TO postgres;
GRANT ALL ON libroxcarrito TO postgres;
GRANT ALL ON fotocopiaxcarrito TO postgres;


GRANT select ON promocion TO usuario_comun;
GRANT select ON producto TO usuario_comun;
GRANT select ON editorial TO usuario_comun;
GRANT select ON saga TO usuario_comun;
GRANT select ON libro TO usuario_comun;
GRANT select ON autor TO usuario_comun;
GRANT select ON categoria TO usuario_comun;
GRANT select, insert, update, delete ON valoracion TO usuario_comun;
GRANT select, insert, update, delete ON sugerencia TO usuario_comun;
GRANT select, update, insert, delete ON usuario TO usuario_comun;
GRANT select, insert, update, delete ON fotocopia TO usuario_comun;
GRANT select, insert, delete ON pedido TO usuario_comun;
GRANT select ON compra TO usuario_comun;
GRANT select, insert, update, delete ON autorxlibro TO usuario_comun;
GRANT select, insert, update, delete ON categoriaxlibro TO usuario_comun;
GRANT select, insert, update, delete ON libroxcarrito TO usuario_comun;
GRANT select, insert, update, delete ON fotocopiaxcarrito TO usuario_comun;


GRANT select ON promocion TO gestor_pedidos;
GRANT select ON producto TO gestor_pedidos;
GRANT select ON editorial TO gestor_pedidos;
GRANT select ON saga TO gestor_pedidos;
GRANT select ON libro TO gestor_pedidos;
GRANT select ON autor TO gestor_pedidos;
GRANT select ON categoria TO gestor_pedidos;
GRANT select, insert, update, delete ON valoracion TO gestor_pedidos;
GRANT select, insert, update, delete ON sugerencia TO gestor_pedidos;
GRANT select, update, insert, delete ON usuario TO gestor_pedidos;
GRANT select, insert, update, delete ON fotocopia TO gestor_pedidos;
GRANT select, insert, delete ON pedido TO gestor_pedidos;
GRANT select ON compra TO gestor_pedidos;
GRANT select, insert, update, delete ON autorxlibro TO gestor_pedidos;
GRANT select, insert, update, delete ON categoriaxlibro TO gestor_pedidos;
GRANT select, insert, update, delete ON libroxcarrito TO gestor_pedidos;
GRANT select, insert, update, delete ON fotocopiaxcarrito TO gestor_pedidos;
