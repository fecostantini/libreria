/*    
    ######## ##     ## ##    ##  ######  ####  #######  ##    ## ########  ######  
    ##       ##     ## ###   ## ##    ##  ##  ##     ## ###   ## ##       ##    ## 
    ##       ##     ## ####  ## ##        ##  ##     ## ####  ## ##       ##       
    ######   ##     ## ## ## ## ##        ##  ##     ## ## ## ## ######    ######  
    ##       ##     ## ##  #### ##        ##  ##     ## ##  #### ##             ## 
    ##       ##     ## ##   ### ##    ##  ##  ##     ## ##   ### ##       ##    ## 
    ##        #######  ##    ##  ######  ####  #######  ##    ## ########  ######                 
*/  

CREATE OR REPLACE PROCEDURE new_libro (isbn integer , idioma varchar,titulo varchar,stock integer, precio real, edicion varchar, descripcion varchar, id_editorial integer,autores varchar[], categorias varchar[])
AS $$
DECLARE
id_aut smallint;
id_cat smallint;
aut varchar;
cat varchar;
BEGIN
insert into libro ("isbn","idioma","titulo","stock","precio","edicion","descripcion","id_editorial") values (isbn,idioma,titulo,stock,precio,edicion,descripcion,id_editorial);
FOREACH aut IN ARRAY autores
LOOP
    id_aut = (select id_autor from autor where (autor = UPPER(aut)));
    insert into autorxlibro values (isbn, id_aut);
END LOOP;
FOREACH cat IN ARRAY categorias
LOOP
    id_cat = (select id_categoria from categoria where (nombre_categoria = UPPER(cat)));
    insert into categoriaxlibro values (isbn, id_cat);
END LOOP;
END $$
LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE new_pedido (isbn integer , cantidad integer, id_usuario integer)
AS $$
DECLARE
BEGIN
insert into pedido ("isbn","cantidad","fecha_pedido","id_usuario") values (isbn,cantidad,now(),id_usuario);
END $$
LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE confirmar_compra (id_carrito_compra integer)
AS $$
DECLARE
precio_compra real;
fila_libro libroxcarrito%rowtype;
fila_fotocopia fotocopiaxcarrito%rowtype;
fila_saga sagaxcarrito%rowtype;
usuario INTEGER;
BEGIN
precio_compra = 0;
FOR fila_libro IN select lxc.isbn, lxc.id_carrito, lxc.cantidad from libroxcarrito lxc, carrito c where (id_carrito_compra = c.id_carrito and c.id_carrito = lxc.id_carrito)
LOOP
    precio_compra = precio_compra + ((select l.precio from libro l where (fila_libro.isbn = l.isbn))*fila_libro.cantidad);
    update libro set stock = stock - fila_libro.cantidad where (isbn = fila_libro.isbn);
END LOOP;

FOR fila_fotocopia IN select fxc.id_fotocopia, fxc.id_carrito, fxc.cantidad from fotocopiaxcarrito fxc, carrito c where (id_carrito_compra = c.id_carrito and c.id_carrito = fxc.id_carrito)
LOOP
    precio_compra = precio_compra + ((select f.precio from fotocopia f where (fila_fotocopia.id_fotocopia = f.id_fotocopia))*fila_fotocopia.cantidad);
    update fotocopia set stock = stock - fila_fotocopia.cantidad where (id_fotocopia = fila_fotocopia.id_fotocopia);
END LOOP;

FOR fila_saga IN select sxc.id_saga, sxc.id_carrito, sxc.cantidad from sagaxcarrito sxc, carrito c where (id_carrito_compra = c.id_carrito and c.id_carrito = sxc.id_carrito)
LOOP
    precio_compra = precio_compra + ((select s.precio_saga from saga s where (fila_saga.id_saga = s.id_saga))*fila_fotocopia.cantidad);
    update saga set stock_saga = stock_saga - fila_saga.cantidad where (id_saga = fila_saga.id_saga);
END LOOP;

INSERT INTO compra("precio_total", "id_carrito") VALUES (precio_compra,id_carrito_compra);
UPDATE carrito set activo = false where (id_carrito = id_carrito_compra);
usuario = (select u.id_usuario from usuario u, carrito c where (c.id_usuario = u.id_usuario and c.id_carrito = id_carrito_compra));
INSERT INTO carrito("id_usuario") VALUES(usuario);
END $$
LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE actualizar_precio_saga (id_saga_a_actualizar integer)
AS $$
DECLARE
precio_final real;
precio real;
BEGIN
precio_final = 0;
FOR precio IN select l.precio from libro l, saga s where (s.id_saga = id_saga_a_actualizar and s.id_saga = l.id_saga)
LOOP
precio_final = precio_final + precio;
END LOOP;

update saga set precio_saga = precio_final where(saga.id_saga = id_saga_a_actualizar);
END $$
LANGUAGE plpgsql;