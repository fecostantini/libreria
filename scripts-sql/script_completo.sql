/*    
    ########    ###    ########  ##          ###     ######  
      ##      ## ##   ##     ## ##         ## ##   ##    ## 
      ##     ##   ##  ##     ## ##        ##   ##  ##       
      ##    ##     ## ########  ##       ##     ##  ######  
      ##    ######### ##     ## ##       #########       ## 
      ##    ##     ## ##     ## ##       ##     ## ##    ## 
      ##    ##     ## ########  ######## ##     ##  ######                        
*/                               
                              
CREATE TABLE "promocion" (
"id_promocion" serial not null,
"nombre_promocion" varchar not null,
"descuento" real not null,
"fecha_vencimiento" date,
constraint PK_promocion primary key ("id_promocion")
);


CREATE TABLE "producto" (
"id_producto" serial not null,
"titulo" varchar not null,
"stock" integer not null CHECK("stock" >= 0),
"precio" real not null CHECK("precio" >= 0),
"id_promocion" integer default null,
"imagen" varchar default '',
constraint PK_producto primary key ("id_producto"),
constraint FK_producto_promocion foreign key ("id_promocion") references "promocion"("id_promocion")
);


CREATE TABLE "editorial" (
"id_editorial" serial not null,
"nombre_editorial" varchar not null,
constraint PK_editorial primary key ("id_editorial"),
UNIQUE(nombre_editorial)
);


CREATE TABLE "saga" (
"id_saga" serial not null,
"nombre_saga" varchar not null,
"stock_saga" integer not null DEFAULT 0,
"precio_saga" real DEFAULT 0,
UNIQUE(nombre_saga),
constraint PK_saga primary key ("id_saga")
);


CREATE TABLE "libro" (
"isbn" integer not null,
"idioma" varchar(15) not null,
"edicion" varchar,
"descripcion" varchar,
"id_editorial" integer not null,
"id_saga" integer default null,
"valoracion_general" float default 0,
constraint PK_libro primary key ("isbn"),
constraint FK_editorial_libro foreign key ("id_editorial") references "editorial"("id_editorial"),
constraint FK_saga_libro foreign key ("id_saga") references "saga"("id_saga")
) INHERITS (producto);


CREATE TABLE "autor" (
"id_autor" serial not null,
"autor" varchar not null,
"nacionalidad" varchar not null,
UNIQUE(autor),
constraint PK_autor primary key ("id_autor")
);


CREATE TABLE "categoria" (
"id_categoria" serial not null,
"nombre_categoria" varchar not null,
UNIQUE(nombre_categoria),
constraint PK_categoria primary key ("id_categoria")
);


CREATE TABLE "usuario" (
"id_usuario" serial not null,
"id_facebook" varchar default null,
"id_google" varchar default null,
"mail" varchar not null,
"nombre" varchar,
"apellido" varchar default null,
"password" varchar default null,
"imagen" varchar default null,
"rol" varchar default 'USUARIO_NORMAL' CHECK (UPPER("rol") in ('ADMIN', 'GESTOR_PEDIDOS', 'USUARIO_NORMAL')),
UNIQUE(mail),
constraint PK_usuario primary key ("id_usuario")); 


CREATE TABLE "valoracion" (
"id_valoracion" serial not null,
"id_usuario" integer not null,
"puntaje" float not null CHECK ("puntaje" BETWEEN 1 AND 5),
"isbn" integer not null,
constraint FK_valoracion_isbn foreign key ("isbn") references "libro"("isbn"),
constraint FK_id_usuario foreign key ("id_usuario") references "usuario"("id_usuario"),
constraint PK_valoracion primary key ("id_valoracion")
);


CREATE TABLE "fotocopia" (
"id_fotocopia" serial not null,
"descripcion" varchar not null,
"id_usuario" integer not null,
constraint PK_fotocopia primary key ("id_fotocopia"),
constraint FK_id_usuario foreign key ("id_usuario") references "usuario"("id_usuario")
) INHERITS (producto);


CREATE TABLE "pedido" (
"id_pedido" serial not null,
"isbn" integer not null,
"cantidad" integer not null,
"fecha_pedido" date default NOW(),
"id_usuario" integer not null,
"pagado" boolean DEFAULT false,
"aceptado" boolean DEFAULT false,
"rechazado" boolean DEFAULT false,
"entregado" boolean DEFAULT false,
"fecha_llegada" date default null,
constraint FK_pedido_isbn foreign key ("isbn") references "libro"("isbn"),
constraint FK_pedido_usuario foreign key ("id_usuario") references "usuario"("id_usuario"),
constraint PK_pedido primary key ("id_pedido")
);


CREATE TABLE "carrito" (
"id_carrito" serial not null,
"id_usuario" integer not null,
"activo" boolean DEFAULT true,
constraint PK_carrito primary key ("id_carrito"),
constraint FK_carrito_usuario foreign key ("id_usuario") references "usuario"("id_usuario")
);


CREATE TABLE "compra" (
"id_compra" serial not null,
"fecha_compra" date default NOW(),
"precio_total" real not null,
"id_carrito" integer not null,
constraint FK_compra_carrito foreign key ("id_carrito") references "carrito"("id_carrito"),
constraint PK_compra primary key ("id_compra")
);


CREATE TABLE "autorxlibro" (
"isbn" integer,
"id_autor" integer,
constraint PK_AutorXLibro primary key ("isbn","id_autor"),
constraint FK_autor_libro foreign key ("id_autor") references "autor"("id_autor"),
Constraint FK_isbn_libro_autor foreign key ("isbn") references "libro"("isbn")
);


CREATE TABLE "categoriaxlibro" (
"isbn" integer,
"id_categoria" integer,
constraint PK_categoriaxlibro primary key ("isbn","id_categoria"),
constraint FK_categoria_libro foreign key ("id_categoria") references "categoria"("id_categoria"),
Constraint FK_isbn_libro_categoria foreign key ("isbn") references "libro"("isbn")
);


CREATE TABLE "libroxcarrito" (
"isbn" integer,
"id_carrito" integer,
"cantidad" integer,
constraint PK_libroxcarrito primary key ("isbn","id_carrito"),
Constraint FK_libro_carrito foreign key ("isbn") references "libro"("isbn"),
Constraint FK_carrito_producto foreign key ("id_carrito") references "carrito"("id_carrito")
);

CREATE TABLE "fotocopiaxcarrito" (
"id_fotocopia" integer,
"id_carrito" integer,
"cantidad" integer,
constraint PK_fotocopiaxcarrito primary key ("id_fotocopia","id_carrito"),
Constraint FK_fotocopia_carrito foreign key ("id_fotocopia") references "fotocopia"("id_fotocopia"),
Constraint FK_carrito_fotocopia foreign key ("id_carrito") references "carrito"("id_carrito")
);


/*    
    ######## ########  ####  ######    ######   ######## ########   ######  
      ##    ##     ##  ##  ##    ##  ##    ##  ##       ##     ## ##    ## 
      ##    ##     ##  ##  ##        ##        ##       ##     ## ##       
      ##    ########   ##  ##   #### ##   #### ######   ########   ######  
      ##    ##   ##    ##  ##    ##  ##    ##  ##       ##   ##         ## 
      ##    ##    ##   ##  ##    ##  ##    ##  ##       ##    ##  ##    ## 
      ##    ##     ## ####  ######    ######   ######## ##     ##  ######              
*/    

--Este trigger realiza el uppercase en la tabla promocion del nombre de la promocion
CREATE OR REPLACE FUNCTION uppercase_promocion() RETURNS trigger AS $uppercase_promocion$
    BEGIN        
        NEW.nombre_promocion = UPPER(NEW.nombre_promocion);
        RETURN NEW;
    END;
$uppercase_promocion$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_promocion_trigger BEFORE INSERT OR UPDATE ON promocion
    FOR EACH ROW EXECUTE PROCEDURE uppercase_promocion();


--Este trigger realiza el uppercase en la tabla producto del titulo del producto
CREATE OR REPLACE FUNCTION uppercase_producto() RETURNS trigger AS $uppercase_producto$
    BEGIN        
        NEW.titulo = UPPER(NEW.titulo);
        RETURN NEW;
    END;
$uppercase_producto$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_producto_trigger BEFORE INSERT OR UPDATE ON producto
    FOR EACH ROW EXECUTE PROCEDURE uppercase_producto();


--Este trigger realiza el uppercase en la tabla editorial del nombre de la editorial
CREATE OR REPLACE FUNCTION uppercase_editorial() RETURNS trigger AS $uppercase_editorial$
    BEGIN        
        NEW.nombre_editorial = UPPER(NEW.nombre_editorial);
        RETURN NEW;
    END;
$uppercase_editorial$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_editorial_trigger BEFORE INSERT OR UPDATE ON editorial
    FOR EACH ROW EXECUTE PROCEDURE uppercase_editorial();


--Este trigger realiza el uppercase en la tabla saga del nombre de la saga
CREATE OR REPLACE FUNCTION uppercase_saga() RETURNS trigger AS $uppercase_saga$
    BEGIN        
        NEW.nombre_saga = UPPER(NEW.nombre_saga);
        RETURN NEW;
    END;
$uppercase_saga$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_saga_trigger BEFORE INSERT OR UPDATE ON saga
    FOR EACH ROW EXECUTE PROCEDURE uppercase_saga();


--Este trigger realiza el uppercase en la tabla libro del idioma,titulo y edicion del libro
CREATE OR REPLACE FUNCTION uppercase_libro() RETURNS trigger AS $uppercase_libro$
    BEGIN        
        NEW.idioma = UPPER(NEW.idioma);
        NEW.titulo = UPPER(NEW.titulo);
        NEW.edicion = UPPER(NEW.edicion);
        RETURN NEW;
    END;
$uppercase_libro$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_libro_trigger BEFORE INSERT OR UPDATE ON libro
    FOR EACH ROW EXECUTE PROCEDURE uppercase_libro();


--Este trigger cuando se realiza un insert delete o update en la tabla libro actualiza los valores del precio y stock de la saga en la que este pertenece
CREATE OR REPLACE FUNCTION saga_libro() RETURNS trigger AS $saga_libro$
    BEGIN
      IF (TG_OP = 'INSERT') THEN
          IF NEW.id_saga > 0 THEN
              call actualizar_saga(NEW.id_saga);
          END IF;
		  RETURN NEW;
      ELSIF (TG_OP = 'UPDATE') THEN
          IF NEW.id_saga > 0 THEN
              call actualizar_saga(NEW.id_saga);
          END IF;
          IF (OLD.id_Saga > 0) THEN
              call actualizar_saga(OLD.id_saga);
          END IF;
		  RETURN NEW;
      ELSIF (TG_OP = 'DELETE') THEN
        IF (OLD.id_Saga > 0) THEN
          call actualizar_saga(OLD.id_saga);
        END IF;
        RETURN null;
      END IF;
    END;
$saga_libro$ LANGUAGE plpgsql;

CREATE TRIGGER saga_libro_trigger AFTER INSERT OR UPDATE OR DELETE ON libro
    FOR EACH ROW EXECUTE PROCEDURE saga_libro();


--Este trigger realiza el uppercase en la tabla autor del autor y su nacionalidad
CREATE OR REPLACE FUNCTION uppercase_autor() RETURNS trigger AS $uppercase_autor$
    BEGIN        
        NEW.autor = UPPER(NEW.autor);
        NEW.nacionalidad = UPPER(NEW.nacionalidad);
        RETURN NEW;
    END;
$uppercase_autor$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_autor_trigger BEFORE INSERT OR UPDATE ON autor
    FOR EACH ROW EXECUTE PROCEDURE uppercase_autor();


--Este trigger realiza el uppercase en la tabla categoria del nombre de la categoria
CREATE OR REPLACE FUNCTION uppercase_categoria() RETURNS trigger AS $uppercase_categoria$
    BEGIN        
        NEW.nombre_categoria = UPPER(NEW.nombre_categoria);
        RETURN NEW;
    END;
$uppercase_categoria$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_categoria_trigger BEFORE INSERT OR UPDATE ON categoria
    FOR EACH ROW EXECUTE PROCEDURE uppercase_categoria();


--Este trigger realiza el uppercase en la tabla usuario del nombre, apellido y rol del mismo
CREATE OR REPLACE FUNCTION uppercase_usuario() RETURNS trigger AS $uppercase_usuario$
    BEGIN        
        NEW.nombre = UPPER(NEW.nombre);
        NEW.apellido = UPPER(NEW.apellido);
        NEW.rol = UPPER(NEW.rol);
        RETURN NEW;
    END;
$uppercase_usuario$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_usuario_trigger BEFORE INSERT OR UPDATE ON usuario
    FOR EACH ROW EXECUTE PROCEDURE uppercase_usuario();


--Este trigger cuando se crea un nuevo usuario crea un carrito para este en estado activo
CREATE OR REPLACE FUNCTION crear_carrito_usuario() RETURNS trigger AS $crear_carrito_usuario$
    BEGIN        
        INSERT INTO carrito("id_usuario") VALUES (NEW.id_usuario);
        RETURN NEW;
    END;
$crear_carrito_usuario$ LANGUAGE plpgsql;

CREATE TRIGGER crear_carrito_usuario_trigger AFTER INSERT ON usuario
    FOR EACH ROW EXECUTE PROCEDURE crear_carrito_usuario();


--Este trigger se activa cuando se crea o actualiza una valoracion actualizando la valoracion general del libro
CREATE OR REPLACE FUNCTION valoracion_general() RETURNS trigger AS $valoracion_general$
    BEGIN        
        call actualizar_valoracion_general(NEW.isbn);
        RETURN NEW;
    END;
$valoracion_general$ LANGUAGE plpgsql;

CREATE TRIGGER valoracion_general_trigger AFTER INSERT OR UPDATE ON valoracion
    FOR EACH ROW EXECUTE PROCEDURE valoracion_general();


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
LANGUAGE plpgsql;/*    
    ########     ###    ########  #######   ######  
    ##     ##   ## ##      ##    ##     ## ##    ## 
    ##     ##  ##   ##     ##    ##     ## ##       
    ##     ## ##     ##    ##    ##     ##  ######  
    ##     ## #########    ##    ##     ##       ## 
    ##     ## ##     ##    ##    ##     ## ##    ## 
    ########  ##     ##    ##     #######   ######                        
*/ 

-- AUTORES
INSERT INTO autor("autor","nacionalidad") VALUES('george r. r. martin','Estados unidos');
INSERT INTO autor("autor","nacionalidad") VALUES('j. r. r. tolkien','sudafrica');
INSERT INTO autor("autor","nacionalidad") VALUES('j. k. rowling','inglaterra');
INSERT INTO autor("autor","nacionalidad") VALUES('jorge luis borges','argentina');
INSERT INTO autor("autor","nacionalidad") VALUES('george orwell','india');
INSERT INTO autor("autor","nacionalidad") VALUES('stephen king','Estados unidos');
INSERT INTO autor("autor","nacionalidad") VALUES('isaac asimov','rusia');
INSERT INTO autor("autor","nacionalidad") VALUES('dan brown','Estados unidos');
INSERT INTO autor("autor","nacionalidad") VALUES('edgar allan poe','Estados unidos');
INSERT INTO autor("autor","nacionalidad") VALUES('agatha christie','inglaterra');
INSERT INTO autor("autor","nacionalidad") VALUES('gabriel garcia marquez','colombia');
INSERT INTO autor("autor","nacionalidad") VALUES('eduardo galeano','uruguay');


-- EDITORIALES
INSERT INTO editorial("nombre_editorial") VALUES('Sudamericana');
INSERT INTO editorial("nombre_editorial") VALUES('Ateneo');
INSERT INTO editorial("nombre_editorial") VALUES('Paidos');
INSERT INTO editorial("nombre_editorial") VALUES('McGraw-Hill');
INSERT INTO editorial("nombre_editorial") VALUES('Emece');
INSERT INTO editorial("nombre_editorial") VALUES('Planeta');
INSERT INTO editorial("nombre_editorial") VALUES('Aguilar');
INSERT INTO editorial("nombre_editorial") VALUES('Prentice-Hall');
INSERT INTO editorial("nombre_editorial") VALUES('Kapelusz');
INSERT INTO editorial("nombre_editorial") VALUES('Atlante');


-- CATEGORIAS
INSERT INTO categoria("nombre_categoria") VALUES('terror');
INSERT INTO categoria("nombre_categoria") VALUES('thriller');
INSERT INTO categoria("nombre_categoria") VALUES('novela');
INSERT INTO categoria("nombre_categoria") VALUES('ciencia ficcion');
INSERT INTO categoria("nombre_categoria") VALUES('aventuras');
INSERT INTO categoria("nombre_categoria") VALUES('poesia');
INSERT INTO categoria("nombre_categoria") VALUES('religioso');
INSERT INTO categoria("nombre_categoria") VALUES('biografia');
INSERT INTO categoria("nombre_categoria") VALUES('infantil');
INSERT INTO categoria("nombre_categoria") VALUES('fantasia');


-- PROMOCIONES
INSERT INTO promocion("nombre_promocion","descuento","fecha_vencimiento") VALUES('descuento5', 5, '2020-01-29');
INSERT INTO promocion("nombre_promocion","descuento","fecha_vencimiento") VALUES('descuento10', 10, '2020-02-28');
INSERT INTO promocion("nombre_promocion","descuento","fecha_vencimiento") VALUES('descuento15', 15, '2020-03-27');
INSERT INTO promocion("nombre_promocion","descuento","fecha_vencimiento") VALUES('descuento20', 20, '2020-04-26');
INSERT INTO promocion("nombre_promocion","descuento","fecha_vencimiento") VALUES('descuento25', 25, '2020-05-25');
INSERT INTO promocion("nombre_promocion","descuento","fecha_vencimiento") VALUES('descuento30', 30, '2020-06-24');
INSERT INTO promocion("nombre_promocion","descuento","fecha_vencimiento") VALUES('descuento35', 35, '2020-07-23');
INSERT INTO promocion("nombre_promocion","descuento","fecha_vencimiento") VALUES('descuento40', 40, '2020-08-22');
INSERT INTO promocion("nombre_promocion","descuento","fecha_vencimiento") VALUES('descuento45', 45, '2020-09-21');
INSERT INTO promocion("nombre_promocion","descuento","fecha_vencimiento") VALUES('descuento50', 50, '2020-10-20');


-- SAGAS
INSERT INTO saga("nombre_saga") VALUES('Harry Potter');
INSERT INTO saga("nombre_saga") VALUES('Percy Jackson y los dioses del Olimpo');
INSERT INTO saga("nombre_saga") VALUES('Los juegos del hambre');
INSERT INTO saga("nombre_saga") VALUES('El señor de los anillos');
INSERT INTO saga("nombre_saga") VALUES('Guerreros');
INSERT INTO saga("nombre_saga") VALUES('El diario de un chico en apuros');
INSERT INTO saga("nombre_saga") VALUES('Canción del hielo y fuego');
INSERT INTO saga("nombre_saga") VALUES('Los héroes del olimpo');
INSERT INTO saga("nombre_saga") VALUES('Las crónicas de Narnia');
INSERT INTO saga("nombre_saga") VALUES('The Maze Runner');


-- LIBROS
call new_libro(1,'inglés','Juego de Tronos', 4, 100, 'primera','descripcion1', 1, 7, 1, array[1], array[3, 10], 'https://cdn.pixabay.com/photo/2014/03/25/16/31/book-297246_960_720.png');
call new_libro(2,'español','El hobbit', 5, 200, 'segunda','descripcion2',2, null, 2, array[2], array[3,1], 'https://cdn.pixabay.com/photo/2014/03/25/16/31/book-297246_960_720.png');
call new_libro(3,'portugués','Harry Potter y la Piedra Filosofal', 6, 300, 'tercera','descripcion3',3, 1, 3, array[3], array[3,1], 'https://cdn.pixabay.com/photo/2014/03/25/16/31/book-297246_960_720.png');
call new_libro(4,'italiano','El Aleph', 9, 400, 'cuarta','descripcion4',4,null, 4, array[4], array[3,1], 'https://cdn.pixabay.com/photo/2014/03/25/16/31/book-297246_960_720.png');
call new_libro(5,'aleman','Gran Hermano', 8, 500, 'quinta','descripcion5',5,null, 5, array[5,10], array[3,1], 'https://cdn.pixabay.com/photo/2014/03/25/16/31/book-297246_960_720.png');
call new_libro(6,'francés','El código Da Vinci', 6, 600, 'sexta','descripcion6',6,null, 6, array[8,6], array[3,2], 'https://cdn.pixabay.com/photo/2014/03/25/16/31/book-297246_960_720.png');
call new_libro(7,'guaraní','Yo robot', 5, 700, 'séptima','descripcion7',7,null, 7, array[7], array[3, 10, 4], 'https://cdn.pixabay.com/photo/2014/03/25/16/31/book-297246_960_720.png');
call new_libro(8,'chino','Cien años de soledad', 5, 800, 'octava','descripcion8',8,null, 8, array[11], array[8], 'https://cdn.pixabay.com/photo/2014/03/25/16/31/book-297246_960_720.png');
call new_libro(9,'japonés','La carta robada', 7, 900, 'novena','descripcion9',9,null, 9, array[9], array[5], 'https://cdn.pixabay.com/photo/2014/03/25/16/31/book-297246_960_720.png');
call new_libro(10,'sueco','Las venas abiertas de América Latina', 10, 1000, 'décima','descripcion10',10,null, 10, array[12,11], array[3, 7, 6], 'https://cdn.pixabay.com/photo/2014/03/25/16/31/book-297246_960_720.png');


-- USUARIOS
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol", "imagen") VALUES ('fecostantini@hotmail.com', 'Francisco', 'Costantini', 'password1', 'ADMIN', 'https://i.pinimg.com/originals/4f/8e/66/4f8e66cbf93a262d2039ccfd1639723d.png');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol", "imagen") VALUES ('maximiliano.pretto@gmail.com', 'Maximiliano', 'Pretto', 'password2', 'ADMIN', 'https://i.pinimg.com/originals/4f/8e/66/4f8e66cbf93a262d2039ccfd1639723d.png');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol", "imagen") VALUES ('belwalerv@hotmail.com', 'Walter', 'Bel', 'password3', 'GESTOR_PEDIDOS', 'https://i.pinimg.com/originals/4f/8e/66/4f8e66cbf93a262d2039ccfd1639723d.png');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol", "imagen") VALUES ('ejemplo1@hotmail.com', 'Juan', 'Langoni', 'superpassword1', 'USUARIO_NORMAL', 'https://i.pinimg.com/originals/4f/8e/66/4f8e66cbf93a262d2039ccfd1639723d.png');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol", "imagen") VALUES ('ejemplo2@hotmail.com', 'Julian', 'Gómez', 'superpassword2', 'USUARIO_NORMAL', 'https://i.pinimg.com/originals/4f/8e/66/4f8e66cbf93a262d2039ccfd1639723d.png');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol", "imagen") VALUES ('ejemplo3@hotmail.com', 'Pedro', 'Martinez', 'superpassword3', 'USUARIO_NORMAL', 'https://i.pinimg.com/originals/4f/8e/66/4f8e66cbf93a262d2039ccfd1639723d.png');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol", "imagen") VALUES ('ejemplo4@hotmail.com', 'Liliana', 'Gonzales', 'superpassword4', 'USUARIO_NORMAL', 'https://i.pinimg.com/originals/4f/8e/66/4f8e66cbf93a262d2039ccfd1639723d.png');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol", "imagen") VALUES ('ejemplo5@hotmail.com', 'Mariano', 'Muller', 'superpassword5', 'USUARIO_NORMAL', 'https://i.pinimg.com/originals/4f/8e/66/4f8e66cbf93a262d2039ccfd1639723d.png');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol", "imagen") VALUES ('ejemplo6@hotmail.com', 'Silvia', 'Romero', 'superpassword6', 'USUARIO_NORMAL', 'https://i.pinimg.com/originals/4f/8e/66/4f8e66cbf93a262d2039ccfd1639723d.png');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol", "imagen") VALUES ('ejemplo7@hotmail.com', 'Gabriel', 'Soria', 'superpassword7', 'USUARIO_NORMAL', 'https://i.pinimg.com/originals/4f/8e/66/4f8e66cbf93a262d2039ccfd1639723d.png');


-- VALORACION
INSERT INTO valoracion("puntaje", "id_usuario", "isbn") VALUES (5, 1, 1);
INSERT INTO valoracion("puntaje", "id_usuario", "isbn") VALUES (4, 2, 2);
INSERT INTO valoracion("puntaje", "id_usuario", "isbn") VALUES (2, 3, 3);
INSERT INTO valoracion("puntaje", "id_usuario", "isbn") VALUES (4, 4, 4);
INSERT INTO valoracion("puntaje", "id_usuario", "isbn") VALUES (2, 5, 5);
INSERT INTO valoracion("puntaje", "id_usuario", "isbn") VALUES (4, 6, 4);
INSERT INTO valoracion("puntaje", "id_usuario", "isbn") VALUES (3, 7, 3);
INSERT INTO valoracion("puntaje", "id_usuario", "isbn") VALUES (1, 8, 5);
INSERT INTO valoracion("puntaje", "id_usuario", "isbn") VALUES (2, 9, 2);
INSERT INTO valoracion("puntaje", "id_usuario", "isbn") VALUES (5, 10, 4);



-- FOTOCOPIAS
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion","id_usuario") VALUES ('Apuntes Cálculo I', 5, 100, 'Apuntes de Cálculo I de primer año de Sistemas.',5);
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion","id_usuario") VALUES ('Apuntes Lógica y Álgebra', 6, 200, 'Apuntes de Lógica y Álgebra de primer año de Sistemas.',5);
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion","id_usuario") VALUES ('Apuntes Sistemas y Organizaciones', 4, 300, 'Apuntes de Sistemas y Organizaciones de primer año de Sistemas.',6);
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion","id_usuario") VALUES ('Apuntes Introducción a la Programación', 8, 400, 'Apuntes de Introducción a la Programación de primer año de Sistemas.',4);
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion","id_usuario") VALUES ('Apuntes Cálculo II', 9, 500, 'Apuntes de Cálculo II de segundo año de Sistemas.',7);
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion","id_usuario") VALUES ('Apuntes Ingeniería de Software I', 4, 600, 'Apuntes de Ingeniería de Software I de segundo año de Sistemas.',9);
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion","id_usuario") VALUES ('Apuntes Ingeniería de Software II', 5, 700, 'Apuntes de Ingeniería de Software II de primer año de Sistemas.',8);
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion","id_usuario") VALUES ('Apuntes Arquitectura de Computadoras', 6, 800, 'Apuntes de Arquitectura de Computadoras de segundo año de Sistemas.',6);
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion","id_usuario") VALUES ('Apuntes Inglés', 6, 900, 'Apuntes de Inglés de primer año de Sistemas.',4);
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion","id_usuario") VALUES ('Apuntes Probabilidad y Estadística', 9, 1000, 'Apuntes de Probabilidad y Estadística de primer año de Sistemas.',8);


-- PEDIDOS
call new_pedido(2,1,5);
call new_pedido(3,1,8);
call new_pedido(7,3,7);
call new_pedido(1,1,8);
call new_pedido(7,2,6);
call new_pedido(4,1,10);
call new_pedido(3,1,9);
call new_pedido(10,2,7);
call new_pedido(9,1,4);
call new_pedido(1,1,9);


-- LIBRO x CARRITO
INSERT INTO libroxcarrito("isbn", "id_carrito", "cantidad") VALUES (1, 1, 1); 
INSERT INTO libroxcarrito("isbn", "id_carrito", "cantidad") VALUES (8, 1, 3); 
INSERT INTO libroxcarrito("isbn", "id_carrito", "cantidad") VALUES (5, 1, 2); 
INSERT INTO libroxcarrito("isbn", "id_carrito", "cantidad") VALUES (6, 2, 1); 
INSERT INTO libroxcarrito("isbn", "id_carrito", "cantidad") VALUES (4, 2, 1);
INSERT INTO libroxcarrito("isbn", "id_carrito", "cantidad") VALUES (7, 3, 1);
INSERT INTO libroxcarrito("isbn", "id_carrito", "cantidad") VALUES (6, 4, 2);
INSERT INTO libroxcarrito("isbn", "id_carrito", "cantidad") VALUES (3, 5, 3);
INSERT INTO libroxcarrito("isbn", "id_carrito", "cantidad") VALUES (2, 6, 1);
INSERT INTO libroxcarrito("isbn", "id_carrito", "cantidad") VALUES (9, 7, 2);

-- FOTOCOPIA x CARRITO
INSERT INTO fotocopiaxcarrito("id_fotocopia", "id_carrito", "cantidad") VALUES (5, 3, 1); 
INSERT INTO fotocopiaxcarrito("id_fotocopia", "id_carrito", "cantidad") VALUES (8, 1, 2); 
INSERT INTO fotocopiaxcarrito("id_fotocopia", "id_carrito", "cantidad") VALUES (7, 6, 1); 
INSERT INTO fotocopiaxcarrito("id_fotocopia", "id_carrito", "cantidad") VALUES (2, 5, 1); 
INSERT INTO fotocopiaxcarrito("id_fotocopia", "id_carrito", "cantidad") VALUES (8, 7, 1);
INSERT INTO fotocopiaxcarrito("id_fotocopia", "id_carrito", "cantidad") VALUES (3, 9, 2);
INSERT INTO fotocopiaxcarrito("id_fotocopia", "id_carrito", "cantidad") VALUES (5, 4, 1);
INSERT INTO fotocopiaxcarrito("id_fotocopia", "id_carrito", "cantidad") VALUES (1, 7, 1);
INSERT INTO fotocopiaxcarrito("id_fotocopia", "id_carrito", "cantidad") VALUES (7, 9, 1);
INSERT INTO fotocopiaxcarrito("id_fotocopia", "id_carrito", "cantidad") VALUES (1, 3, 2);



