/*    
    ######## ##     ## ##    ##  ######  ####  #######  ##    ## ########  ######  
    ##       ##     ## ###   ## ##    ##  ##  ##     ## ###   ## ##       ##    ## 
    ##       ##     ## ####  ## ##        ##  ##     ## ####  ## ##       ##       
    ######   ##     ## ## ## ## ##        ##  ##     ## ## ## ## ######    ######  
    ##       ##     ## ##  #### ##        ##  ##     ## ##  #### ##             ## 
    ##       ##     ## ##   ### ##    ##  ##  ##     ## ##   ### ##       ##    ## 
    ##        #######  ##    ##  ######  ####  #######  ##    ## ########  ######                 
*/  


CREATE VIEW datos_libros_completos as 
select t1.id_producto, t1.titulo, t1.stock, t1.isbn, t1.precio, t1.descripcion, t1.nombre_editorial, t1.idioma, t1.edicion, t1.id_saga, t1.autores, t1.nacionalidades, t2.categorias from
(SELECT l.id_producto, l.titulo, l.stock, l.isbn, l.precio, l.descripcion, l.idioma, e.nombre_editorial, l.edicion, l.id_saga, array_agg(a.autor) as autores, array_agg(a.nacionalidad) as nacionalidades 
FROM autorxlibro axl
INNER JOIN autor a  ON a.id_autor = axl.id_autor
INNER JOIN libro l ON l.isbn = axl.isbn,
editorial e
where l.id_editorial = e.id_editorial
GROUP BY l.isbn,
         l.titulo,
		 e.nombre_editorial) as t1,
(SELECT l.id_producto, array_agg(c.nombre_categoria) as categorias 
FROM categoriaxlibro cxl
INNER JOIN categoria c  ON c.id_categoria = cxl.id_categoria
INNER JOIN libro l ON l.isbn = cxl.isbn
GROUP BY l.id_producto) as t2
WHERE (t1.id_producto = t2.id_producto);


CREATE OR REPLACE FUNCTION es_libro (id_producto_buscado integer)
RETURNS boolean AS
$es_libro$
DECLARE
BEGIN
IF (select id_producto_buscado in (select id_producto from libro where id_producto = id_producto_buscado)) THEN
    RETURN true;
ELSE
	RETURN false;
END IF;
END $es_libro$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION añadir_al_carrito (id_producto_a_añadir integer, cantidad_producto integer, id_carrito_objetivo integer)
RETURNS integer AS
$añadir_al_carrito$
DECLARE
isbn_libro_a_añadir integer;
id_fotocopia_a_añadir integer;
BEGIN
IF (select * from es_libro(id_producto_a_añadir)) THEN
	isbn_libro_a_añadir = (select isbn from libro where id_producto = id_producto_a_añadir);
    insert into libroxcarrito (isbn, id_carrito, cantidad) values (isbn_libro_a_añadir, id_carrito_objetivo, cantidad_producto);
ELSE
	id_fotocopia_a_añadir = (select id_fotocopia from fotocopia where id_producto = id_producto_a_añadir);
	insert into fotocopiaxcarrito (id_fotocopia, id_carrito, cantidad) values (id_fotocopia_a_añadir, id_carrito_objetivo, cantidad_producto);
END IF;
return id_producto_a_añadir;
END $añadir_al_carrito$
LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE new_libro (isbn integer, idioma varchar, titulo varchar, stock integer, precio real, edicion varchar, descripcion varchar, id_editorial integer, id_saga integer, id_promocion integer, ids_autores integer[], ids_categorias integer[])
AS $$
DECLARE
id_aut smallint;
id_cat smallint;
BEGIN
insert into libro ("isbn","idioma","titulo","stock","precio","edicion","descripcion","id_editorial", "id_saga", "id_promocion") values (isbn,idioma,titulo,stock,precio,edicion,descripcion,id_editorial,id_saga,id_promocion);
FOREACH id_aut IN ARRAY ids_autores
LOOP
    insert into autorxlibro values (isbn, id_aut);
END LOOP;
FOREACH id_cat IN ARRAY ids_categorias
LOOP
    insert into categoriaxlibro values (isbn, id_cat);
END LOOP;
END $$
LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE new_producto (isbn integer, idioma varchar, titulo varchar, stock integer, precio real, edicion varchar, descripcion varchar, id_editorial integer, id_saga integer, id_promocion integer, ids_autores integer[], ids_categorias integer[], id_usuario integer)
AS $$
DECLARE
BEGIN
IF (isbn IS NULL) THEN
  insert into fotocopia("titulo", "stock", "precio", "id_promocion", "descripcion", "id_usuario") values (titulo, stock, precio, id_promocion, descripcion, id_usuario);
ELSE
  call new_libro(isbn, idioma, titulo, stock, precio, edicion, descripcion, id_editorial, id_saga, id_promocion, ids_autores, ids_categorias);
END IF;

END $$
LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE new_pedido (isbn integer , cantidad integer, id_usuario integer)
AS $$
DECLARE
BEGIN
insert into pedido ("isbn","cantidad","fecha_pedido","id_usuario") values (isbn,cantidad,now(),id_usuario);
END $$
LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE update_libro (new_isbn integer, new_idioma varchar, new_titulo varchar, new_stock integer, new_precio real, new_edicion varchar, new_descripcion varchar, new_id_editorial integer, new_id_saga integer, new_id_promocion integer, new_ids_autores integer[], new_ids_categorias integer[])
AS $$
DECLARE
id_aut integer;
id_cat integer;
id_auto integer;
id_cate integer;
array_autores integer[];
array_categorias integer[];
BEGIN
update libro set idioma = new_idioma, titulo = new_titulo, stock = new_stock, precio = new_precio, edicion = new_edicion, descripcion= new_descripcion, id_editorial = new_id_editorial, id_saga = new_id_saga, id_promocion = new_id_promocion where (isbn = new_isbn);
array_autores = (SELECT array_agg(axl.id_autor) FROM autorxlibro axl where axl.isbn = new_isbn);
array_categorias = (SELECT array_agg(cxl.id_categoria) FROM categoriaxlibro cxl where cxl.isbn = new_isbn);
FOREACH id_auto IN ARRAY array_autores
LOOP
    IF (id_auto = ANY (new_ids_autores)) = false THEN
        delete from autorxlibro where (id_autor = id_auto and isbn = new_isbn);
	END IF;
END LOOP;
FOREACH id_cate IN ARRAY array_categorias
LOOP
    IF (id_auto = ANY (new_ids_categorias::int[])) = false THEN
        delete from categoriaxlibro where (id_categoria = id_cate and isbn = new_isbn);
	END IF;
END LOOP;
FOREACH id_aut IN ARRAY new_ids_autores
LOOP
    IF (select exists(select 1 from autorxlibro axl where axl.id_autor = id_aut and axl.isbn = new_isbn) = FALSE) THEN
        insert into autorxlibro values (new_isbn, id_aut);
    END IF;
END LOOP;
FOREACH id_cat IN ARRAY new_ids_categorias
LOOP
    IF (select exists(select 1 from categoriaxlibro cxl where cxl.id_categoria = id_cat and cxl.isbn = new_isbn) = FALSE) THEN
        insert into categoriaxlibro values (new_isbn, id_cat);
    END IF;
END LOOP;
END $$
LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE delete_producto (id_producto_a_borrar integer) AS
$delete_producto$
DECLARE
isbn_libro integer;
id_foto integer;
BEGIN
IF ((select f.id_fotocopia from fotocopia f where f.id_producto = id_producto_a_borrar) > 0) THEN
	id_foto = (select id_fotocopia from fotocopia f where (f.id_producto = id_producto_a_borrar));
	delete from fotocopiaxcarrito where (id_fotocopia = id_foto);
	delete from fotocopia where (id_producto = id_producto_a_borrar);
ELSE
	isbn_libro = (select isbn from libro l where (l.id_producto = id_producto_a_borrar));
	delete from autorxlibro where (isbn = isbn_libro);
	delete from categoriaxlibro where (isbn = isbn_libro);
	delete from valoracion where (isbn = isbn_libro);
	delete from pedido where (isbn = isbn_libro);
	delete from libroxcarrito where (isbn = isbn_libro);
    delete from libro where (id_producto =id_producto_a_borrar);
END IF;
END $delete_producto$
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


CREATE OR REPLACE FUNCTION datos_producto (id_producto_a_buscar integer)
RETURNS table(id_producto integer, id_fotocopia integer, titulo varchar, stock integer, isbn integer, precio real, descripcion varchar,id_usuario integer, nombre_editorial text, idioma text, edicion text, id_saga integer, nombre_saga text, stock_saga integer, precio_saga real, autores varchar[], nacionalidades varchar[], categorias varchar[]) AS
$datos_producto$
DECLARE
BEGIN
IF (select f.id_fotocopia from fotocopia f where f.id_producto = id_producto_a_buscar) > 0 THEN
	raise notice 'soy una fotocopia';
    RETURN query select f.id_producto, f.id_fotocopia, f.titulo, f.stock, 0 as isbn , f.precio, f.descripcion, f.id_usuario, null as nombre_editorial, null as idioma, null as edicion, -1 as id_saga, null as nombre_saga, 0 as stock_saga, cast(-1 as real) as precio_saga, ARRAY['0']::varchar[] as autores, ARRAY['0']::varchar[] as nacionalidades, ARRAY['0']::varchar[] as categorias from fotocopia f where (f.id_producto = id_producto_a_buscar);
ELSIF (select l.id_saga from libro l where l.id_producto = id_producto_a_buscar) > 0 THEN
    raise notice 'soy unlibro con saga';
	RETURN query select dlc.id_producto, 0 as id_fotocopia, dlc.titulo, dlc.stock, dlc.isbn , dlc.precio, dlc.descripcion, 0, cast(dlc.nombre_editorial as text), cast(dlc.idioma as text), cast(dlc.edicion as text), dlc.id_saga, cast(s.nombre_saga as text), s.stock_saga, s.precio_saga, dlc.autores, dlc.nacionalidades, dlc.categorias from datos_libros_completos dlc, saga s where (dlc.id_producto = id_producto_a_buscar and dlc.id_saga = s.id_saga);
ELSE
	raise notice 'soy unlibro sin saga';
	RETURN query select dlc.id_producto, 0 as id_fotocopia, dlc.titulo, dlc.stock, dlc.isbn , dlc.precio, dlc.descripcion, 0, cast(dlc.nombre_editorial as text), cast(dlc.idioma as text), cast(dlc.edicion as text), dlc.id_saga, null as nombre_saga, 0 as stock_saga, cast(0 as real) as precio_saga, dlc.autores, dlc.nacionalidades, dlc.categorias from datos_libros_completos dlc where (dlc.id_producto = id_producto_a_buscar);
END IF;

END $datos_producto$
LANGUAGE plpgsql;

