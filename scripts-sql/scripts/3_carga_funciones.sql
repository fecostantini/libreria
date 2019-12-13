/*    
##     ## ####  ######  ########    ###    
##     ##  ##  ##    ##    ##      ## ##   
##     ##  ##  ##          ##     ##   ##  
##     ##  ##   ######     ##    ##     ## 
 ##   ##   ##        ##    ##    ######### 
  ## ##    ##  ##    ##    ##    ##     ## 
   ###    ####  ######     ##    ##     ##               
*/ 

 --esta vista muestra los datos completos de un libro con los datos de este sus autores y categorias
CREATE VIEW datos_libros_completos AS
SELECT t1.imagen, t1.id_producto, t1.titulo, t1.stock, t1.isbn, t1.precio, t1.id_promocion, t1.descripcion, t1.nombre_editorial, t1.idioma, t1.edicion, t1.id_saga, t1.autores, t1.nacionalidades, t2.categorias FROM
(SELECT l.imagen, l.id_producto, l.titulo, l.stock, l.isbn, l.precio, l.id_promocion, l.descripcion, l.idioma, e.nombre_editorial, l.edicion, l.id_saga, ARRAY_AGG(a.autor) AS autores, ARRAY_AGG(a.nacionalidad) AS nacionalidades
FROM autorxlibro axl
INNER JOIN autor a  ON a.id_autor = axl.id_autor
INNER JOIN libro l ON l.isbn = axl.isbn,
editorial e
WHERE l.id_editorial = e.id_editorial
GROUP BY l.isbn,
         l.titulo,
         e.nombre_editorial) AS t1,
(SELECT l.id_producto, ARRAY_AGG(c.nombre_categoria) AS categorias
FROM categoriaxlibro cxl
INNER JOIN categoria c  ON c.id_categoria = cxl.id_categoria
INNER JOIN libro l ON l.isbn = cxl.isbn
GROUP BY l.id_producto) AS t2
WHERE (t1.id_producto = t2.id_producto);


/*    
    ######## ##     ## ##    ##  ######  ####  #######  ##    ## ########  ######  
    ##       ##     ## ###   ## ##    ##  ##  ##     ## ###   ## ##       ##    ##
    ##       ##     ## ####  ## ##        ##  ##     ## ####  ## ##       ##      
    ######   ##     ## ## ## ## ##        ##  ##     ## ## ## ## ######    ######  
    ##       ##     ## ##  #### ##        ##  ##     ## ##  #### ##             ##
    ##       ##     ## ##   ### ##    ##  ##  ##     ## ##   ### ##       ##    ##
    ##        #######  ##    ##  ######  ####  #######  ##    ## ########  ######                
*/  
 
 --este procedimiento actualiza el precio y stock de una saga recorriendo los libros pertenecientes a la misma
CREATE OR REPLACE PROCEDURE actualizar_saga (id_saga_a_actualizar INTEGER)
AS $$
DECLARE
precio_final REAL;
precio REAL;
stock_s INTEGER;
BEGIN
precio_final = 0;
FOR precio IN SELECT l.precio FROM libro l, saga s WHERE (s.id_saga = id_saga_a_actualizar AND s.id_saga = l.id_saga)
LOOP
precio_final = precio_final + precio;
END LOOP;
stock_s = (SELECT MIN(stock) FROM libro l  WHERE (l.id_saga = id_saga_a_actualizar));
IF (stock_s IS NULL) THEN
  stock_s = 0;
END IF;
UPDATE saga SET precio_saga = precio_final , stock_saga = stock_s where(saga.id_saga = id_saga_a_actualizar);
END $$
LANGUAGE plpgsql;
 

--esta funcion nos devuelve si el id de producto que le pasamos como parametro es un libro o no
CREATE OR REPLACE FUNCTION es_libro (id_producto_buscado INTEGER)
RETURNS BOOLEAN AS
$es_libro$
DECLARE
BEGIN
IF (SELECT id_producto_buscado IN (SELECT id_producto FROM libro WHERE id_producto = id_producto_buscado)) THEN
    RETURN TRUE;
ELSE
    RETURN FALSE;
END IF;
END $es_libro$
LANGUAGE plpgsql;
 

--este procedimiento realiza la carga de un libro, su autor/autores y su categorria/categorias
CREATE OR REPLACE PROCEDURE new_libro (
    isbn INTEGER, 
    idioma VARCHAR, 
    titulo VARCHAR, 
    stock INTEGER, 
    precio REAL, 
    edicion VARCHAR, 
    descripcion VARCHAR, 
    id_editorial INTEGER, 
    id_saga INTEGER, 
    id_promocion INTEGER, 
    ids_autores INTEGER[], 
    ids_categorias INTEGER[], 
    imagen VARCHAR)
AS $$
DECLARE
id_aut SMALLINT;
id_cat SMALLINT;
BEGIN
INSERT INTO libro ("isbn","idioma","titulo","stock","precio","edicion","descripcion","id_editorial", "id_saga", "id_promocion", "imagen") VALUES (isbn,idioma,titulo,stock,precio,edicion,descripcion,id_editorial,id_saga,id_promocion, imagen);
FOREACH id_aut IN ARRAY ids_autores
LOOP
    INSERT INTO autorxlibro VALUES (isbn, id_aut);
END LOOP;
FOREACH id_cat IN ARRAY ids_categorias
LOOP
    INSERT INTO categoriaxlibro VALUES (isbn, id_cat);
END LOOP;
END $$
LANGUAGE plpgsql;
 

CREATE OR REPLACE PROCEDURE new_pedido (isbn INTEGER , cantidad INTEGER, id_usuario INTEGER)
AS $$
DECLARE
BEGIN
INSERT INTO pedido ("isbn","cantidad","fecha_pedido","id_usuario") VALUES (isbn,cantidad,NOW(),id_usuario);
END $$
LANGUAGE plpgsql;
 

--este procedimiento actualiza un libro como tambien sus autores y categorias
CREATE OR REPLACE PROCEDURE update_libro (
    new_isbn INTEGER, 
    new_idioma VARCHAR, 
    new_titulo VARCHAR, 
    new_stock INTEGER, 
    new_precio REAL, 
    new_edicion VARCHAR, 
    new_descripcion VARCHAR, 
    new_id_editorial INTEGER, 
    new_id_saga INTEGER, 
    new_id_promocion INTEGER, 
    new_ids_autores INTEGER[], 
    new_ids_categorias INTEGER[], 
    new_imagen VARCHAR)
AS $$
DECLARE
id_aut INTEGER;
id_cat INTEGER;
id_auto INTEGER;
id_cate INTEGER;
array_autores INTEGER[];
array_categorias INTEGER[];
BEGIN
UPDATE libro SET idioma=new_idioma, titulo=new_titulo, stock=new_stock, precio=new_precio, edicion=new_edicion, descripcion= new_descripcion, id_editorial=new_id_editorial, id_saga=new_id_saga, id_promocion=new_id_promocion, imagen=new_imagen WHERE (isbn=new_isbn);
array_autores = (SELECT ARRAY_AGG(axl.id_autor) FROM autorxlibro axl WHERE axl.isbn = new_isbn);
array_categorias = (SELECT ARRAY_AGG(cxl.id_categoria) FROM categoriaxlibro cxl WHERE cxl.isbn = new_isbn);
FOREACH id_auto IN ARRAY array_autores
LOOP
    IF (id_auto = ANY (new_ids_autores)) = FALSE THEN
        DELETE FROM autorxlibro WHERE (id_autor = id_auto AND isbn = new_isbn);
    END IF;
END LOOP;
FOREACH id_cate IN ARRAY array_categorias
LOOP
    IF (id_auto = ANY (new_ids_categorias::INT[])) = FALSE THEN
        DELETE FROM categoriaxlibro WHERE (id_categoria = id_cate AND isbn = new_isbn);
    END IF;
END LOOP;
FOREACH id_aut IN ARRAY new_ids_autores
LOOP
    IF (SELECT exists(SELECT 1 FROM autorxlibro axl WHERE axl.id_autor = id_aut AND axl.isbn = new_isbn) = FALSE) THEN
        INSERT INTO autorxlibro VALUES (new_isbn, id_aut);
    END IF;
END LOOP;
FOREACH id_cat IN ARRAY new_ids_categorias
LOOP
    IF (SELECT exists(SELECT 1 FROM categoriaxlibro cxl WHERE cxl.id_categoria = id_cat AND cxl.isbn = new_isbn) = FALSE) THEN
        INSERT INTO categoriaxlibro VALUES (new_isbn, id_cat);
    END IF;
END LOOP;
END $$
LANGUAGE plpgsql;
 

--este procedimiento actualiza un producto no importa si es un libro o una fotocopia
CREATE OR REPLACE PROCEDURE update_producto (
  id_fotocopia_updated INTEGER,
  isbn_updated INTEGER,
  idioma_updated VARCHAR,
  titulo_updated VARCHAR,
  stock_updated INTEGER,
  precio_updated REAL,
  edicion_updated VARCHAR,
  descripcion_updated VARCHAR,
  id_editorial_updated INTEGER,
  id_saga_updated INTEGER,
  id_promocion_updated INTEGER,
  ids_autores_updated INTEGER[],
  ids_categorias_updated INTEGER[],
  id_usuario_updated INTEGER,
  imagen_updated VARCHAR
)
AS $$
DECLARE
BEGIN
IF (isbn_updated IS NULL) THEN
  UPDATE fotocopia SET titulo = titulo_updated, stock = stock_updated, precio = precio_updated, id_promocion = id_promocion_updated, descripcion = descripcion_updated, id_usuario = id_usuario_updated WHERE (id_fotocopia = id_fotocopia_updated);
ELSE
  call update_libro(isbn_updated, idioma_updated, titulo_updated, stock_updated, precio_updated, edicion_updated, descripcion_updated, id_editorial_updated, id_saga_updated, id_promocion_updated, ids_autores_updated, ids_categorias_updated, imagen_updated);
END IF;
 
END $$
LANGUAGE plpgsql;
 

 --este procedimiento elimina un producto como asi tambielas filas en las tablas intermedias en que este se encuentre
CREATE OR REPLACE PROCEDURE delete_producto (id_producto_a_borrar INTEGER) AS
$delete_producto$
DECLARE
isbn_libro INTEGER;
id_foto INTEGER;
BEGIN
IF ((SELECT f.id_fotocopia FROM fotocopia f WHERE f.id_producto = id_producto_a_borrar) > 0) THEN
    id_foto = (SELECT id_fotocopia FROM fotocopia f WHERE (f.id_producto = id_producto_a_borrar));
    DELETE FROM fotocopiaxcarrito WHERE (id_fotocopia = id_foto);
    DELETE FROM fotocopia WHERE (id_producto = id_producto_a_borrar);
ELSE
    isbn_libro = (SELECT isbn FROM libro l WHERE (l.id_producto = id_producto_a_borrar));
    DELETE FROM autorxlibro WHERE (isbn = isbn_libro);
    DELETE FROM categoriaxlibro WHERE (isbn = isbn_libro);
    DELETE FROM valoracion WHERE (isbn = isbn_libro);
    DELETE FROM pedido WHERE (isbn = isbn_libro);
    DELETE FROM libroxcarrito WHERE (isbn = isbn_libro);
    DELETE FROM libro WHERE (id_producto =id_producto_a_borrar);
END IF;
END $delete_producto$
LANGUAGE plpgsql;
 

--este procedimiento crea un producto y segun los datos que se le pasen creara una fotocopia o un libro
CREATE OR REPLACE PROCEDURE new_producto (
    isbn INTEGER, 
    idioma VARCHAR, 
    titulo VARCHAR, 
    stock INTEGER, 
    precio REAL, 
    edicion VARCHAR, 
    descripcion VARCHAR, 
    id_editorial INTEGER, 
    id_saga INTEGER, 
    id_promocion INTEGER, 
    ids_autores INTEGER[], 
    ids_categorias INTEGER[], 
    id_usuario INTEGER, 
    imagen VARCHAR)
AS $$
DECLARE
BEGIN
IF (isbn IS NULL) THEN
  INSERT INTO fotocopia("titulo", "stock", "precio", "id_promocion", "descripcion", "id_usuario") VALUES (titulo, stock, precio, id_promocion, descripcion, id_usuario);
ELSE
  call new_libro(isbn, idioma, titulo, stock, precio, edicion, descripcion, id_editorial, id_saga, id_promocion, ids_autores, ids_categorias, imagen);
END IF;
 
END $$
LANGUAGE plpgsql;
 
 
 --esta funcion devuelve una tabla con los datos de un producto
CREATE OR REPLACE FUNCTION datos_producto (id_producto_a_buscar INTEGER)
RETURNS table(id_producto INTEGER, id_fotocopia INTEGER, titulo VARCHAR, stock INTEGER, isbn INTEGER, precio REAL, id_promocion INTEGER, descripcion VARCHAR,id_usuario INTEGER, nombre_editorial TEXT, idioma TEXT, edicion TEXT, id_saga INTEGER, nombre_saga TEXT, stock_saga INTEGER, precio_saga REAL, autores VARCHAR[], nacionalidades VARCHAR[], categorias VARCHAR[], imagen TEXT) AS
$datos_producto$
DECLARE
BEGIN
IF (SELECT f.id_fotocopia FROM fotocopia f WHERE f.id_producto = id_producto_a_buscar) > 0 THEN
    RETURN query SELECT f.id_producto, f.id_fotocopia, f.titulo, f.stock, cast(NULL AS INTEGER) AS isbn , f.precio, cast(f.id_promocion AS INTEGER), f.descripcion, f.id_usuario, NULL AS nombre_editorial, NULL AS idioma, NULL AS edicion, cast(NULL AS INTEGER) AS id_saga, NULL AS nombre_saga, cast(NULL AS INTEGER) AS stock_saga, cast(NULL AS REAL) AS precio_saga, ARRAY['0']::VARCHAR[] AS autores, ARRAY['0']::VARCHAR[] AS nacionalidades, ARRAY['0']::VARCHAR[] AS categorias, NULL AS imagen FROM fotocopia f WHERE (f.id_producto = id_producto_a_buscar);
ELSIF (SELECT l.id_saga FROM libro l WHERE l.id_producto = id_producto_a_buscar) > 0 THEN
    RETURN query SELECT dlc.id_producto, cast(NULL AS INTEGER) AS id_fotocopia, dlc.titulo, dlc.stock, dlc.isbn , dlc.precio, cast(dlc.id_promocion AS INTEGER), dlc.descripcion, cast(NULL AS INTEGER), cast(dlc.nombre_editorial AS TEXT), cast(dlc.idioma AS TEXT), cast(dlc.edicion AS TEXT), dlc.id_saga, cast(s.nombre_saga AS TEXT), s.stock_saga, s.precio_saga, dlc.autores, dlc.nacionalidades, dlc.categorias, cast(dlc.imagen AS TEXT) FROM datos_libros_completos dlc, saga s WHERE (dlc.id_producto = id_producto_a_buscar AND dlc.id_saga = s.id_saga);
ELSE
    RETURN query SELECT dlc.id_producto, cast(NULL AS INTEGER) AS id_fotocopia, dlc.titulo, dlc.stock, dlc.isbn , dlc.precio, cast(dlc.id_promocion AS INTEGER), dlc.descripcion, cast(NULL AS INTEGER), cast(dlc.nombre_editorial AS TEXT), cast(dlc.idioma AS TEXT), cast(dlc.edicion AS TEXT), dlc.id_saga, NULL AS nombre_saga, 0 AS stock_saga, cast(0 AS REAL) AS precio_saga, dlc.autores, dlc.nacionalidades, dlc.categorias, cast(dlc.imagen AS TEXT) FROM datos_libros_completos dlc WHERE (dlc.id_producto = id_producto_a_buscar);
END IF;
END $datos_producto$
LANGUAGE plpgsql;
 

--este procedimiento actualiza la valoracion general de un libro dado
CREATE OR REPLACE PROCEDURE actualizar_valoracion_general (isbn_a_actualizar INTEGER)
AS $$
DECLARE
suma_valoraciones INTEGER;
valoracion_promedio FLOAT;
puntaje_valoracion INTEGER;
contador INTEGER;
BEGIN
suma_valoraciones = 0;
contador = 0;
FOR puntaje_valoracion IN SELECT v.puntaje FROM valoracion v, libro l WHERE (l.isbn = isbn_a_actualizar AND v.isbn = l.isbn)
LOOP
    suma_valoraciones = suma_valoraciones + puntaje_valoracion;
    contador = contador + 1;
END LOOP;
valoracion_promedio = suma_valoraciones::FLOAT / contador::FLOAT;
UPDATE libro SET valoracion_general = valoracion_promedio where(isbn = isbn_a_actualizar);
END $$
LANGUAGE plpgsql;
 

--esta funcion elimina un producto de un carrito(ya sea libro o fotocopia) y devuelve el id de este producto
CREATE OR REPLACE FUNCTION eliminar_del_carrito (id_producto_a_eliminar INTEGER, id_carrito_objetivo INTEGER)
RETURNS INTEGER AS
$eliminar_del_carrito$
DECLARE
isbn_libro_a_eliminar INTEGER;
id_fotocopia_a_eliminar INTEGER;
BEGIN
IF (SELECT * FROM es_libro(id_producto_a_eliminar)) THEN
    isbn_libro_a_eliminar = (SELECT isbn FROM libro WHERE id_producto = id_producto_a_eliminar);
    DELETE FROM libroxcarrito WHERE (isbn = isbn_libro_a_eliminar AND id_carrito = id_carrito_objetivo);
ELSE
    id_fotocopia_a_eliminar = (SELECT id_fotocopia FROM fotocopia WHERE id_producto = id_producto_a_eliminar);
    DELETE FROM fotocopiaxcarrito WHERE (id_fotocopia = id_fotocopia_a_eliminar AND id_carrito = id_carrito_objetivo);
END IF;
RETURN id_producto_a_eliminar;
END $eliminar_del_carrito$
LANGUAGE plpgsql;
 

-- esta funcion agrega un producto a un carrito y devuelve el id del producto que agrego
CREATE OR REPLACE FUNCTION añadir_al_carrito (id_producto_a_añadir INTEGER, cantidad_producto INTEGER, id_carrito_objetivo INTEGER)
RETURNS INTEGER AS
$añadir_al_carrito$
DECLARE
isbn_libro_a_añadir INTEGER;
id_fotocopia_a_añadir INTEGER;
BEGIN
IF (SELECT * FROM es_libro(id_producto_a_añadir)) THEN
    isbn_libro_a_añadir = (SELECT isbn FROM libro WHERE id_producto = id_producto_a_añadir);
    INSERT INTO libroxcarrito (isbn, id_carrito, cantidad) VALUES (isbn_libro_a_añadir, id_carrito_objetivo, cantidad_producto);
ELSE
    id_fotocopia_a_añadir = (SELECT id_fotocopia FROM fotocopia WHERE id_producto = id_producto_a_añadir);
    INSERT INTO fotocopiaxcarrito (id_fotocopia, id_carrito, cantidad) VALUES (id_fotocopia_a_añadir, id_carrito_objetivo, cantidad_producto);
END IF;
RETURN id_producto_a_añadir;
END $añadir_al_carrito$
LANGUAGE plpgsql;
 
 
 --esta funcion devuelve la cantidad de productos de un carrito dado
CREATE OR REPLACE FUNCTION cantidad_productos_carrito (id_carrito_a_buscar INTEGER)
RETURNS INTEGER AS
$cantidad_productos_carrito$
DECLARE
cantidad INTEGER;
BEGIN
cantidad =(SELECT t1.suma + t2.suma
from(SELECT COUNT(l.id_producto) AS suma FROM libro l, libroxcarrito lxc WHERE (l.isbn = lxc.isbn AND lxc.id_carrito = id_carrito_a_buscar)) AS t1,
     (SELECT COUNT(f.id_producto) AS suma FROM fotocopia f, fotocopiaxcarrito fxc WHERE (f.id_fotocopia = fxc.id_fotocopia AND fxc.id_carrito = id_carrito_a_buscar)) AS t2);
RETURN cantidad;
END $cantidad_productos_carrito$
LANGUAGE plpgsql;
 
 
 --esta funcion devuleve una tabla con los datos de los productos de un carrito dado
CREATE OR REPLACE FUNCTION productos_carrito (id_carrito_a_buscar INTEGER)
RETURNS table(id_producto INTEGER, id_fotocopia INTEGER, isbn INTEGER, cantidad INTEGER) AS
$productos_carrito$
DECLARE
BEGIN
RETURN query SELECT l.id_producto, cast(NULL AS INTEGER) AS id_fotocopia, l.isbn , lxc.cantidad AS cantidad  FROM libro l, libroxcarrito lxc WHERE (l.isbn = lxc.isbn AND lxc.id_carrito = id_carrito_a_buscar)
UNION
SELECT f.id_producto, f.id_fotocopia, cast(NULL AS INTEGER) AS isbn, fxc.cantidad AS cantidad FROM fotocopia f, fotocopiaxcarrito fxc WHERE (f.id_fotocopia = fxc.id_fotocopia AND fxc.id_carrito = id_carrito_a_buscar);
END $productos_carrito$
LANGUAGE plpgsql;
 
 
 --esta funcion se encarga de confirmar la compra de un carrito dado, pasando el estado activo del carrito a false y creando un nuevo carrito para el usuario y ademas calcula el precio final de la compra y actualiza el stock de los productos de la compra
CREATE OR REPLACE PROCEDURE confirmar_compra (id_carrito_compra INTEGER)
AS $$
DECLARE
precio_compra REAL;
fila_libro libroxcarrito%rowtype;
fila_fotocopia fotocopiaxcarrito%rowtype;
usuario INTEGER;
BEGIN
precio_compra = 0;
FOR fila_libro IN SELECT lxc.isbn, lxc.id_carrito, lxc.cantidad FROM libroxcarrito lxc, carrito c WHERE (id_carrito_compra = c.id_carrito AND c.id_carrito = lxc.id_carrito)
LOOP
    precio_compra = precio_compra + ((SELECT l.precio FROM libro l WHERE (fila_libro.isbn = l.isbn))*fila_libro.cantidad);
    UPDATE libro SET stock = stock - fila_libro.cantidad WHERE (isbn = fila_libro.isbn);
END LOOP;
 
FOR fila_fotocopia IN SELECT fxc.id_fotocopia, fxc.id_carrito, fxc.cantidad FROM fotocopiaxcarrito fxc, carrito c WHERE (id_carrito_compra = c.id_carrito AND c.id_carrito = fxc.id_carrito)
LOOP
    precio_compra = precio_compra + ((SELECT f.precio FROM fotocopia f WHERE (fila_fotocopia.id_fotocopia = f.id_fotocopia))*fila_fotocopia.cantidad);
    UPDATE fotocopia SET stock = stock - fila_fotocopia.cantidad WHERE (id_fotocopia = fila_fotocopia.id_fotocopia);
END LOOP;
INSERT INTO compra("precio_total", "id_carrito") VALUES (precio_compra,id_carrito_compra);
UPDATE carrito SET activo = FALSE WHERE (id_carrito = id_carrito_compra);
usuario = (SELECT u.id_usuario FROM usuario u, carrito c WHERE (c.id_usuario = u.id_usuario AND c.id_carrito = id_carrito_compra));
INSERT INTO carrito("id_usuario") VALUES(usuario);
END $$
LANGUAGE plpgsql;


--esta funcion devuelve una tabla con los datos de las compras realizadas por un asuario
CREATE OR REPLACE FUNCTION compras_usuario (id_usuario_a_buscar INTEGER)
RETURNS table(id_compra INTEGER, fecha_compra DATE, precio_total REAL, id_carrito INTEGER) AS
$compras_usuario$
DECLARE
BEGIN
RETURN query select com.id_compra, com.fecha_compra, com.precio_total, com.id_carrito from carrito ca, compra com, usuario u 
where(u.id_usuario = ca.id_usuario and ca.id_carrito = com.id_carrito and ca.activo = FALSE and u.id_usuario = id_usuario_a_buscar)
group by com.id_compra;
END $compras_usuario$
LANGUAGE plpgsql;