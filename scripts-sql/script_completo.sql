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
"precio" real not null,
"id_promocion" integer default null,
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
"id_editorial" integer,
"id_saga" integer default null,
"valoracion_general" float default 0,
constraint PK_libro primary key ("isbn"),
constraint FK_editorial_libro foreign key ("id_editorial") references "editorial"("id_editorial"),
constraint FK_saga_libro foreign key ("id_saga") references "saga"("id_saga")
) INHERITS (producto);


CREATE TABLE "autor" (
"id_autor" serial not null,
"autor" varchar not null,
"nacionalidad" varchar,
UNIQUE(autor),
constraint PK_autor primary key ("id_autor")
);


CREATE TABLE "categoria" (
"id_categoria" serial not null,
"nombre_categoria" varchar not null,
UNIQUE(nombre_categoria),
constraint PK_categoria primary key ("id_categoria")
);



CREATE TABLE "valoracion" (
"id_valoracion" serial not null,
"puntaje" integer not null CHECK ("puntaje" BETWEEN 1 AND 10),
"comentario" varchar,
"isbn" integer not null,
constraint FK_valoracion_isbn foreign key ("isbn") references "libro"("isbn"),
constraint PK_valoracion primary key ("id_valoracion")
);


CREATE TABLE "sugerencia" (
"id_sugerencia" serial not null,
"mensaje" varchar not null,
"fecha" date default to_date(to_char(NOW(), 'YYYY-MM-DD'), 'YYYY-MM-DD'), -- FECHA ACTUAL POR DEFECTO (EJEMPLO: 2019-11-20)
constraint PK_sugerencia primary key ("id_sugerencia")
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
"fecha_pedido" date not null,
"id_usuario" integer not null,
"anticipo_pagado" boolean DEFAULT false,
"pedido_aceptado" boolean DEFAULT null,
"pedido_entregado" boolean DEFAULT false,
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
"fecha_compra" date default to_date(to_char(NOW(), 'YYYY-MM-DD'), 'YYYY-MM-DD'), -- FECHA ACTUAL POR DEFECTO (EJEMPLO: 2019-11-20)
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

CREATE TABLE "sagaxcarrito" (
"id_saga" integer,
"id_carrito" integer,
"cantidad" integer,
constraint PK_sagaxcarrito primary key ("id_saga","id_carrito"),
Constraint FK_saga_carrito foreign key ("id_saga") references "saga"("id_saga"),
Constraint FK_carrito_saga foreign key ("id_carrito") references "carrito"("id_carrito")
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

CREATE OR REPLACE FUNCTION uppercase_promocion() RETURNS trigger AS $uppercase_promocion$
    BEGIN        
        NEW.nombre_promocion = UPPER(NEW.nombre_promocion);
        RETURN NEW;
    END;
$uppercase_promocion$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_promocion_trigger BEFORE INSERT OR UPDATE ON promocion
    FOR EACH ROW EXECUTE PROCEDURE uppercase_promocion();


CREATE OR REPLACE FUNCTION uppercase_producto() RETURNS trigger AS $uppercase_producto$
    BEGIN        
        NEW.titulo = UPPER(NEW.titulo);
        RETURN NEW;
    END;
$uppercase_producto$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_producto_trigger BEFORE INSERT OR UPDATE ON producto
    FOR EACH ROW EXECUTE PROCEDURE uppercase_producto();


CREATE OR REPLACE FUNCTION uppercase_editorial() RETURNS trigger AS $uppercase_editorial$
    BEGIN        
        NEW.nombre_editorial = UPPER(NEW.nombre_editorial);
        RETURN NEW;
    END;
$uppercase_editorial$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_editorial_trigger BEFORE INSERT OR UPDATE ON editorial
    FOR EACH ROW EXECUTE PROCEDURE uppercase_editorial();


CREATE OR REPLACE FUNCTION uppercase_saga() RETURNS trigger AS $uppercase_saga$
    BEGIN        
        NEW.nombre_saga = UPPER(NEW.nombre_saga);
        RETURN NEW;
    END;
$uppercase_saga$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_saga_trigger BEFORE INSERT OR UPDATE ON saga
    FOR EACH ROW EXECUTE PROCEDURE uppercase_saga();


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

CREATE OR REPLACE FUNCTION uppercase_autor() RETURNS trigger AS $uppercase_autor$
    BEGIN        
        NEW.autor = UPPER(NEW.autor);
        NEW.nacionalidad = UPPER(NEW.nacionalidad);
        RETURN NEW;
    END;
$uppercase_autor$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_autor_trigger BEFORE INSERT OR UPDATE ON autor
    FOR EACH ROW EXECUTE PROCEDURE uppercase_autor();


CREATE OR REPLACE FUNCTION uppercase_categoria() RETURNS trigger AS $uppercase_categoria$
    BEGIN        
        NEW.nombre_categoria = UPPER(NEW.nombre_categoria);
        RETURN NEW;
    END;
$uppercase_categoria$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_categoria_trigger BEFORE INSERT OR UPDATE ON categoria
    FOR EACH ROW EXECUTE PROCEDURE uppercase_categoria();


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

CREATE OR REPLACE FUNCTION crear_carrito_usuario() RETURNS trigger AS $crear_carrito_usuario$
    BEGIN        
        INSERT INTO carrito("id_usuario") VALUES (NEW.id_usuario);
        RETURN NEW;
    END;
$crear_carrito_usuario$ LANGUAGE plpgsql;

CREATE TRIGGER crear_carrito_usuario_trigger AFTER INSERT ON usuario
    FOR EACH ROW EXECUTE PROCEDURE crear_carrito_usuario();

CREATE OR REPLACE FUNCTION valoracion_general() RETURNS trigger AS $valoracion_general$
    BEGIN        
        call actualizar_valoracion_general(NEW.isbn);
        RETURN NEW;
    END;
$valoracion_general$ LANGUAGE plpgsql;

CREATE TRIGGER valoracion_general_trigger AFTER INSERT OR UPDATE ON valoracion
    FOR EACH ROW EXECUTE PROCEDURE valoracion_general();


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
select t1.id_producto, t1.titulo, t1.stock, t1.isbn, t1.precio, t1.id_promocion, t1.descripcion, t1.nombre_editorial, t1.idioma, t1.edicion, t1.id_saga, t1.autores, t1.nacionalidades, t2.categorias from
(SELECT l.id_producto, l.titulo, l.stock, l.isbn, l.precio, l.id_promocion, l.descripcion, l.idioma, e.nombre_editorial, l.edicion, l.id_saga, array_agg(a.autor) as autores, array_agg(a.nacionalidad) as nacionalidades 
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


CREATE OR REPLACE PROCEDURE update_producto (id_fotocopia_updated integer, isbn_updated integer, idioma_updated varchar, titulo_updated varchar, stock_updated integer, precio_updated real, edicion_updated varchar, descripcion_updated varchar, id_editorial_updated integer, id_saga_updated integer, id_promocion_updated integer, ids_autores_updated integer[], ids_categorias_updated integer[], id_usuario_updated integer)
AS $$
DECLARE
BEGIN
IF (isbn_updated IS NULL) THEN
  update fotocopia set titulo = titulo_updated, stock = stock_updated, precio = precio_updated, id_promocion = id_promocion_updated, descripcion = descripcion_updated, id_usuario = id_usuario_updated where (id_fotocopia = id_fotocopia_updated);
ELSE
  call update_libro(isbn_updated, idioma_updated, titulo_updated, stock_updated, precio_updated, edicion_updated, descripcion_updated, id_editorial_updated, id_saga_updated, id_promocion_updated, ids_autores_updated, ids_categorias_updated);
END IF;

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


CREATE OR REPLACE PROCEDURE actualizar_saga (id_saga_a_actualizar integer)
AS $$
DECLARE
precio_final real;
precio real;
stock_s integer;
BEGIN
precio_final = 0;
FOR precio IN select l.precio from libro l, saga s where (s.id_saga = id_saga_a_actualizar and s.id_saga = l.id_saga)
LOOP
precio_final = precio_final + precio;
END LOOP;
stock_s = (select min(stock) from libro l  where (l.id_saga = id_saga_a_actualizar));
if (stock_s is null) THEN
  stock_s = 0;
END IF;
update saga set precio_saga = precio_final*0.9, stock_saga = stock_s where(saga.id_saga = id_saga_a_actualizar);
END $$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION datos_producto (id_producto_a_buscar integer)
RETURNS table(id_producto integer, id_fotocopia integer, titulo varchar, stock integer, isbn integer, precio real, id_promocion integer, descripcion varchar,id_usuario integer, nombre_editorial text, idioma text, edicion text, id_saga integer, nombre_saga text, stock_saga integer, precio_saga real, autores varchar[], nacionalidades varchar[], categorias varchar[]) AS
$datos_producto$
DECLARE
BEGIN
IF (select f.id_fotocopia from fotocopia f where f.id_producto = id_producto_a_buscar) > 0 THEN
	raise notice 'soy una fotocopia';
    RETURN query select f.id_producto, f.id_fotocopia, f.titulo, f.stock, cast(null as integer) as isbn , f.precio, cast(f.id_promocion as integer), f.descripcion, f.id_usuario, null as nombre_editorial, null as idioma, null as edicion, cast(null as integer) as id_saga, null as nombre_saga, cast(null as integer) as stock_saga, cast(null as real) as precio_saga, ARRAY['0']::varchar[] as autores, ARRAY['0']::varchar[] as nacionalidades, ARRAY['0']::varchar[] as categorias from fotocopia f where (f.id_producto = id_producto_a_buscar);
ELSIF (select l.id_saga from libro l where l.id_producto = id_producto_a_buscar) > 0 THEN
    raise notice 'soy unlibro con saga';
	RETURN query select dlc.id_producto, cast(null as integer) as id_fotocopia, dlc.titulo, dlc.stock, dlc.isbn , dlc.precio, cast(dlc.id_promocion as integer), dlc.descripcion, cast(null as integer), cast(dlc.nombre_editorial as text), cast(dlc.idioma as text), cast(dlc.edicion as text), dlc.id_saga, cast(s.nombre_saga as text), s.stock_saga, s.precio_saga, dlc.autores, dlc.nacionalidades, dlc.categorias from datos_libros_completos dlc, saga s where (dlc.id_producto = id_producto_a_buscar and dlc.id_saga = s.id_saga);
ELSE
	raise notice 'soy unlibro sin saga';
	RETURN query select dlc.id_producto, cast(null as integer) as id_fotocopia, dlc.titulo, dlc.stock, dlc.isbn , dlc.precio, cast(dlc.id_promocion as integer), dlc.descripcion, cast(null as integer), cast(dlc.nombre_editorial as text), cast(dlc.idioma as text), cast(dlc.edicion as text), dlc.id_saga, null as nombre_saga, 0 as stock_saga, cast(0 as real) as precio_saga, dlc.autores, dlc.nacionalidades, dlc.categorias from datos_libros_completos dlc where (dlc.id_producto = id_producto_a_buscar);
END IF;
END $datos_producto$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION productos_carrito (id_carrito_a_buscar integer)
RETURNS table(id_producto integer, id_fotocopia integer, isbn integer, cantidad integer) AS
$productos_carrito$
DECLARE
BEGIN
RETURN query select l.id_producto, cast(null as integer) as id_fotocopia, l.isbn , lxc.cantidad as cantidad  from libro l, libroxcarrito lxc where (l.isbn = lxc.isbn and lxc.id_carrito = id_carrito_a_buscar) 
UNION 
select f.id_producto, f.id_fotocopia, cast(null as integer) as isbn, fxc.cantidad as cantidad from fotocopia f, fotocopiaxcarrito fxc where (f.id_fotocopia = fxc.id_fotocopia and fxc.id_carrito = id_carrito_a_buscar);
END $productos_carrito$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION cantidad_productos_carrito (id_carrito_a_buscar integer)
RETURNS integer AS
$cantidad_productos_carrito$
DECLARE
cantidad integer;
BEGIN
cantidad =(select t1.suma + t2.suma 
from(select count(l.id_producto) as suma from libro l, libroxcarrito lxc where (l.isbn = lxc.isbn and lxc.id_carrito = id_carrito_a_buscar)) as t1, 
	 (select count(f.id_producto) as suma from fotocopia f, fotocopiaxcarrito fxc where (f.id_fotocopia = fxc.id_fotocopia and fxc.id_carrito = id_carrito_a_buscar)) as t2);
RETURN cantidad;
END $cantidad_productos_carrito$
LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE actualizar_valoracion_general (isbn_a_actualizar integer)
AS $$
DECLARE
suma_valoraciones integer;
valoracion_promedio float;
puntaje_valoracion integer;
contador integer;
BEGIN
suma_valoraciones = 0;
contador = 0;
FOR puntaje_valoracion IN select v.puntaje from valoracion v, libro l where (l.isbn = isbn_a_actualizar and v.isbn = l.isbn)
LOOP
    raise notice 'loop valoraciones';
    suma_valoraciones = suma_valoraciones + puntaje_valoracion;
    contador = contador + 1;
END LOOP;
valoracion_promedio = suma_valoraciones::float / contador::float;
update libro set valoracion_general = valoracion_promedio where(isbn = isbn_a_actualizar);
END $$
LANGUAGE plpgsql;

/*    
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
call new_libro(1,'inglés','Juego de Tronos', 4, 100, 'primera','descripcion1', 1, 7, 1, array[1], array[3, 10]);
call new_libro(2,'español','El hobbit', 5, 200, 'segunda','descripcion2',2, null, 2, array[2], array[3,1]);
call new_libro(3,'portugués','Harry Potter y la Piedra Filosofal', 6, 300, 'tercera','descripcion3',3, 1, 3, array[3], array[3,1]);
call new_libro(4,'italiano','El Aleph', 9, 400, 'cuarta','descripcion4',4,null, 4, array[4], array[3,1]);
call new_libro(5,'aleman','Gran Hermano', 8, 500, 'quinta','descripcion5',5,null, 5, array[5,10], array[3,1]);
call new_libro(6,'francés','El código Da Vinci', 6, 600, 'sexta','descripcion6',6,null, 6, array[8,6], array[3,2]);
call new_libro(7,'guaraní','Yo robot', 5, 700, 'séptima','descripcion7',7,null, 7, array[7], array[3, 10, 4]);
call new_libro(8,'chino','Cien años de soledad', 5, 800, 'octava','descripcion8',8,null, 8, array[11], array[8]);
call new_libro(9,'japonés','La carta robada', 7, 900, 'novena','descripcion9',9,null, 9, array[9], array[5]);
call new_libro(10,'sueco','Las venas abiertas de América Latina', 10, 1000, 'décima','descripcion10',10,null, 10, array[12,11], array[3, 7, 6]);

-- VALORACION
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (5, 'Genial el libro', 1);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (4, 'Muy malo el libro', 2);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (2, 'Mas o menos el libro', 3);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (4, 'Bastante bueno el libro', 4);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (2, 'No de los mejores que he leído', 5);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (4, 'El mejor libro de la historia', 4);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (3, 'Se los recomiendo a todos', 3);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (1, 'He leído mejores libros del autor', 5);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (2, 'Muy malo. No lo lean.', 2);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (5, 'Genial!!', 4);


-- SUGERENCIAS
INSERT INTO sugerencia("mensaje") VALUES ('Quería saber si pueden agregar El universo en una cáscara de nuez, de Stephen Hawking');
INSERT INTO sugerencia("mensaje") VALUES ('Quería saber si pueden agregar Breve historia del tiempo, de Stephen Hawking');
INSERT INTO sugerencia("mensaje") VALUES ('Quería saber si pueden agregar El gran diseño, de Stephen Hawking');
INSERT INTO sugerencia("mensaje") VALUES ('Quería saber si pueden agregar Breves respuestas a las grandes preguntas, de Stephen Hawking');
INSERT INTO sugerencia("mensaje") VALUES ('Quería saber si pueden agregar Agujeros negros, de Stephen Hawking');
INSERT INTO sugerencia("mensaje") VALUES ('Quería saber si pueden agregar Mi visión del mundo, de Albert Einstein');
INSERT INTO sugerencia("mensaje") VALUES ('Quería saber si pueden agregar Sobre la teoría de la relatividad general y especial, de Albert Einstein');
INSERT INTO sugerencia("mensaje") VALUES ('Quería saber si pueden agregar El futuro de nuestra mente, de Michio Kaku');
INSERT INTO sugerencia("mensaje") VALUES ('Quería saber si pueden agregar Mundos Paralelos, de Michio Kaku');
INSERT INTO sugerencia("mensaje") VALUES ('Quería saber si pueden agregar La energía nuclear, de Michio Kaku');


-- USUARIOS
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol") VALUES ('fecostantini@hotmail.com', 'Francisco', 'Costantini', 'password1', 'ADMIN');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol") VALUES ('maximiliano.pretto@gmail.com', 'Maximiliano', 'Pretto', 'password2', 'ADMIN');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol") VALUES ('belwalerv@hotmail.com', 'Walter', 'Bel', 'password3', 'GESTOR_PEDIDOS');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol") VALUES ('ejemplo1@hotmail.com', 'Juan', 'Langoni', 'superpassword1', 'USUARIO_NORMAL');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol") VALUES ('ejemplo2@hotmail.com', 'Julian', 'Gómez', 'superpassword2', 'USUARIO_NORMAL');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol") VALUES ('ejemplo3@hotmail.com', 'Pedro', 'Martinez', 'superpassword3', 'USUARIO_NORMAL');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol") VALUES ('ejemplo4@hotmail.com', 'Liliana', 'Gonzales', 'superpassword4', 'USUARIO_NORMAL');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol") VALUES ('ejemplo5@hotmail.com', 'Mariano', 'Muller', 'superpassword5', 'USUARIO_NORMAL');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol") VALUES ('ejemplo6@hotmail.com', 'Silvia', 'Romero', 'superpassword6', 'USUARIO_NORMAL');
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol") VALUES ('ejemplo7@hotmail.com', 'Gabriel', 'Soria', 'superpassword7', 'USUARIO_NORMAL');

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

-- SAGA x CARRITO
INSERT INTO sagaxcarrito("id_saga", "id_carrito", "cantidad") VALUES (9, 1, 1); 
INSERT INTO sagaxcarrito("id_saga", "id_carrito", "cantidad") VALUES (10, 4, 1); 
INSERT INTO sagaxcarrito("id_saga", "id_carrito", "cantidad") VALUES (6, 3, 1); 
INSERT INTO sagaxcarrito("id_saga", "id_carrito", "cantidad") VALUES (1, 2, 2); 
INSERT INTO sagaxcarrito("id_saga", "id_carrito", "cantidad") VALUES (4, 2, 1);
INSERT INTO sagaxcarrito("id_saga", "id_carrito", "cantidad") VALUES (5, 10, 1);
INSERT INTO sagaxcarrito("id_saga", "id_carrito", "cantidad") VALUES (3, 8, 1);
INSERT INTO sagaxcarrito("id_saga", "id_carrito", "cantidad") VALUES (6, 9, 1);
INSERT INTO sagaxcarrito("id_saga", "id_carrito", "cantidad") VALUES (8, 1, 1);
INSERT INTO sagaxcarrito("id_saga", "id_carrito", "cantidad") VALUES (4, 7, 1);

--TODOS: hacer función que devuelva el producto (si es libro un libro, si es fotocopia una fotocopia) cuando se busca en productoxcarrito. 
/*CONSULTAS:
todos las compras realizadas por un usuario entre 2 fechas
todos los pedidos aceptados a la fecha
categorias y cantididad de libros asociadas a esta
usuario que realizaron mas de 4 compras
libros que posean mas de 2 autores
libros con valoracion promedio mayor a 3.5




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
GRANT ALL ON sagaxcarrito TO postgres;

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
GRANT select, insert, update, delete ON sagaxcarrito TO usuario_comun;

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
GRANT select, insert, update, delete ON sagaxcarrito TO gestor_pedidos;


*/
