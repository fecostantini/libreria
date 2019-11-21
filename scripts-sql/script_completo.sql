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
"stock" smallint not null default 0,
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
"stock_saga" SMALLINT not null,
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


CREATE TABLE "pedido" (
"id_pedido" serial not null,
"cantidad" smallint not null,
"fecha_pedido" date not null,
"anticipo_pagado" boolean DEFAULT false,
"pedido_aceptado" boolean DEFAULT null,
"pedido_entregado" boolean DEFAULT false,
"fecha_llegada" date default null,
"isbn" integer not null,
constraint FK_pedido_isbn foreign key ("isbn") references "libro"("isbn"),
constraint PK_pedido primary key ("id_pedido")
);


CREATE TABLE "valoracion" (
"id_valoracion" serial not null,
"puntaje" smallint not null CHECK ("puntaje" BETWEEN 1 AND 10),
"comentario" varchar,
"isbn" integer not null,
constraint FK_valoracion_isbn foreign key ("isbn") references "libro"("isbn"),
constraint PK_valoracion primary key ("id_valoracion")
);


CREATE TABLE "fotocopia" (
"id_fotocopia" serial not null,
"descripcion" varchar not null,
constraint PK_fotocopia primary key ("id_fotocopia")
) INHERITS (producto);


CREATE TABLE "sugerencia" (
"id_sugerencia" serial not null,
"mensaje" varchar not null,
"fecha" date default to_date(to_char(NOW(), 'YYYY-MM-DD'), 'YYYY-MM-DD'), -- FECHA ACTUAL POR DEFECTO (EJEMPLO: 2019-11-20)
constraint PK_sugerencia primary key ("id_sugerencia")
);


CREATE TABLE "usuario" (
"id_usuario" serial not null,
"mail" varchar not null,
"nombre" varchar,
"apellido" varchar,
"password" varchar,
"rol" varchar CHECK (UPPER("rol") in ('ADMIN', 'GESTOR_PEDIDOS', 'USUARIO_NORMAL')),
UNIQUE(mail),
constraint PK_usuario primary key ("id_usuario")); 


CREATE TABLE "carrito" (
"id_carrito" serial not null,
"id_usuario" integer not null,
constraint PK_carrito primary key ("id_carrito"),
constraint FK_carrito_usuario foreign key ("id_usuario") references "usuario"("id_usuario")
);


CREATE TABLE "compra" (
"id_compra" serial not null,
"fecha_compra" date not null,
"precio_total" real not null,
"id_carrito" integer not null,
constraint FK_compra_carrito foreign key ("id_carrito") references "carrito"("id_carrito"),
constraint PK_compra primary key ("id_compra")
);


CREATE TABLE "autorxlibro" (
"isbn" integer,
"id_autor" smallint,
constraint PK_AutorXLibro primary key ("isbn","id_autor"),
constraint FK_autor_libro foreign key ("id_autor") references "autor"("id_autor"),
Constraint FK_isbn_libro_autor foreign key ("isbn") references "libro"("isbn")
);


CREATE TABLE "categoriaxlibro" (
"isbn" integer,
"id_categoria" smallint,
constraint PK_categoriaxlibro primary key ("isbn","id_categoria"),
constraint FK_categoria_libro foreign key ("id_categoria") references "categoria"("id_categoria"),
Constraint FK_isbn_libro_categoria foreign key ("isbn") references "libro"("isbn")
);


CREATE TABLE "productoxcarrito" (
"id_producto" integer,
"id_carrito" smallint,
constraint PK_productoxcarrito primary key ("id_producto","id_carrito"),
constraint FK_producto_carrito foreign key ("id_producto") references "producto"("id_producto"),
Constraint FK_carrito_productoa foreign key ("id_carrito") references "carrito"("id_carrito")
);









CREATE OR REPLACE FUNCTION uppercase_promocion() RETURNS trigger AS $uppercase_promocion$
    BEGIN        
        NEW.nombre_promocion = UPPER(NEW.nombre_promocion);
        RETURN NEW;
    END;
$uppercase_promocion$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_promocion_trigger BEFORE INSERT OR UPDATE ON promocion
    FOR EACH ROW EXECUTE PROCEDURE uppercase_promocion();
--------


CREATE OR REPLACE FUNCTION uppercase_producto() RETURNS trigger AS $uppercase_producto$
    BEGIN        
        NEW.titulo = UPPER(NEW.titulo);
        RETURN NEW;
    END;
$uppercase_producto$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_producto_trigger BEFORE INSERT OR UPDATE ON producto
    FOR EACH ROW EXECUTE PROCEDURE uppercase_producto();
-------


CREATE OR REPLACE FUNCTION uppercase_editorial() RETURNS trigger AS $uppercase_editorial$
    BEGIN        
        NEW.nombre_editorial = UPPER(NEW.nombre_editorial);
        RETURN NEW;
    END;
$uppercase_editorial$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_editorial_trigger BEFORE INSERT OR UPDATE ON editorial
    FOR EACH ROW EXECUTE PROCEDURE uppercase_editorial();
------------


CREATE OR REPLACE FUNCTION uppercase_saga() RETURNS trigger AS $uppercase_saga$
    BEGIN        
        NEW.nombre_saga = UPPER(NEW.nombre_saga);
        RETURN NEW;
    END;
$uppercase_saga$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_saga_trigger BEFORE INSERT OR UPDATE ON saga
    FOR EACH ROW EXECUTE PROCEDURE uppercase_saga();
-------------


CREATE OR REPLACE FUNCTION uppercase_libro() RETURNS trigger AS $uppercase_libro$
    BEGIN        
        NEW.idioma = UPPER(NEW.idioma);
        NEW.titulo = UPPER(NEW.titulo);
        NEW.edicion = UPPER(NEW.edicion);
        NEW.descripcion = UPPER(NEW.descripcion);
        RETURN NEW;
    END;
$uppercase_libro$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_libro_trigger BEFORE INSERT OR UPDATE ON libro
    FOR EACH ROW EXECUTE PROCEDURE uppercase_libro();
-----------


CREATE OR REPLACE FUNCTION uppercase_autor() RETURNS trigger AS $uppercase_autor$
    BEGIN        
        NEW.autor = UPPER(NEW.autor);
        NEW.nacionalidad = UPPER(NEW.nacionalidad);
        RETURN NEW;
    END;
$uppercase_autor$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_autor_trigger BEFORE INSERT OR UPDATE ON autor
    FOR EACH ROW EXECUTE PROCEDURE uppercase_autor();
------------


CREATE OR REPLACE FUNCTION uppercase_categoria() RETURNS trigger AS $uppercase_categoria$
    BEGIN        
        NEW.nombre_categoria = UPPER(NEW.nombre_categoria);
        RETURN NEW;
    END;
$uppercase_categoria$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_categoria_trigger BEFORE INSERT OR UPDATE ON categoria
    FOR EACH ROW EXECUTE PROCEDURE uppercase_categoria();
---------------


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
------------------


CREATE OR REPLACE PROCEDURE new_libro (isbn integer , idioma varchar,titulo varchar,precio real, edicion varchar, descripcion varchar, id_editorial integer,autores varchar[], categorias varchar[])
AS $$
DECLARE
id_aut smallint;
id_cat smallint;
aut varchar;
cat varchar;
BEGIN
insert into libro ("isbn","idioma","titulo","precio","edicion","descripcion","id_editorial") values (isbn,idioma,titulo,precio,edicion,descripcion,id_editorial);
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

CREATE OR REPLACE PROCEDURE new_pedido (isbn integer , cantidad integer)
AS $$
DECLARE
BEGIN
insert into pedido ("isbn","cantidad","fecha_pedido") values (isbn,cantidad,now());
END $$
LANGUAGE plpgsql;-- AUTORES
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
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Harry Potter', 1);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Percy Jackson y los dioses del Olimpo', 1);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Los juegos del hambre', 1);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('El señor de los anillos', 1);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Guerreros', 1);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('El diario de un chico en apuros', 1);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Canción del hielo y fuego', 1);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Los héroes del olimpo', 1);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Las crónicas de Narnia', 1);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('The Maze Runner', 1);


-- LIBROS
call new_libro(1,'inglés','Juego de Tronos', 100, 'primera','descripcion1', 1, array['george r. r. martin'], array['novela','fantasia']);
call new_libro(2,'español','El hobbit', 200, 'segunda','descripcion2',2, array['j. r. r. tolkien'], array['novela','terror']);
call new_libro(3,'portugués','Harry Potter y la Piedra Filosofal', 300, 'tercera','descripcion3',3, array['j. k. rowling'], array['novela','terror']);
call new_libro(4,'italiano','El Aleph', 400, 'cuarta','descripcion4',4, array['jorge luis borges'], array['novela','terror']);
call new_libro(5,'aleman','Gran Hermano', 500, 'quinta','descripcion5',5, array['george orwell','agatha christie'], array['novela','terror']);
call new_libro(6,'francés','El código Da Vinci', 600, 'sexta','descripcion6',6, array['dan brown','stephen king'], array['novela','thriller']);
call new_libro(7,'guaraní','Yo robot', 700, 'séptima','descripcion7',7, array['isaac asimov'], array['novela','fantasia', 'ciencia ficcion']);
call new_libro(8,'chino','Cien años de soledad', 800, 'octava','descripcion8',8, array['gabriel garcia marquez'], array['biografia']);
call new_libro(9,'japonés','La carta robada', 900, 'novena','descripcion9',9, array['edgar allan poe'], array['aventuras']);
call new_libro(10,'sueco','Las venas abiertas de América Latina', 1000, 'décima','descripcion10',10, array['eduardo galeano','gabriel garcia marquez'], array['novela','religioso', 'poesia']);


-- PEDIDOS
INSERT INTO pedido("cantidad", "fecha_pedido", "anticipo_pagado", "pedido_aceptado", "pedido_entregado", "fecha_llegada", "isbn") VALUES(1, '2019-11-30', false, false, false, '2019-12-25', 1);
INSERT INTO pedido("cantidad", "fecha_pedido", "anticipo_pagado", "pedido_aceptado", "pedido_entregado", "fecha_llegada", "isbn") VALUES(1, '2019-11-30', false, false, false, '2019-12-25', 2);
INSERT INTO pedido("cantidad", "fecha_pedido", "anticipo_pagado", "pedido_aceptado", "pedido_entregado", "fecha_llegada", "isbn") VALUES(1, '2019-11-30', false, false, false, '2019-12-25', 3);
INSERT INTO pedido("cantidad", "fecha_pedido", "anticipo_pagado", "pedido_aceptado", "pedido_entregado", "fecha_llegada", "isbn") VALUES(1, '2019-11-30', false, false, false, '2019-12-25', 4);
INSERT INTO pedido("cantidad", "fecha_pedido", "anticipo_pagado", "pedido_aceptado", "pedido_entregado", "fecha_llegada", "isbn") VALUES(1, '2019-11-30', false, false, false, '2019-12-25', 5);
INSERT INTO pedido("cantidad", "fecha_pedido", "anticipo_pagado", "pedido_aceptado", "pedido_entregado", "fecha_llegada", "isbn") VALUES(1, '2019-11-30', false, false, false, '2019-12-25', 6);
INSERT INTO pedido("cantidad", "fecha_pedido", "anticipo_pagado", "pedido_aceptado", "pedido_entregado", "fecha_llegada", "isbn") VALUES(1, '2019-11-30', false, false, false, '2019-12-25', 7);
INSERT INTO pedido("cantidad", "fecha_pedido", "anticipo_pagado", "pedido_aceptado", "pedido_entregado", "fecha_llegada", "isbn") VALUES(1, '2019-11-30', false, false, false, '2019-12-25', 8);
INSERT INTO pedido("cantidad", "fecha_pedido", "anticipo_pagado", "pedido_aceptado", "pedido_entregado", "fecha_llegada", "isbn") VALUES(1, '2019-11-30', false, false, false, '2019-12-25', 9);
INSERT INTO pedido("cantidad", "fecha_pedido", "anticipo_pagado", "pedido_aceptado", "pedido_entregado", "fecha_llegada", "isbn") VALUES(1, '2019-11-30', false, false, false, '2019-12-25', 10);


-- VALORACION
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (1, 'Genial el libro', 1);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (1, 'Muy malo el libro', 2);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (1, 'Mas o menos el libro', 3);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (1, 'Bastante bueno el libro', 4);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (1, 'No de los mejores que he leído', 5);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (1, 'El mejor libro de la historia', 6);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (1, 'Se los recomiendo a todos', 7);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (1, 'He leído mejores libros del autor', 8);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (1, 'Muy malo. No lo lean.', 9);
INSERT INTO valoracion("puntaje", "comentario", "isbn") VALUES (1, 'Genial!!', 10);

-- FOTOCOPIAS
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion") VALUES ('Apuntes Cálculo I', 1, 100, 'Apuntes de Cálculo I de primer año de Sistemas.');
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion") VALUES ('Apuntes Lógica y Álgebra', 1, 200, 'Apuntes de Lógica y Álgebra de primer año de Sistemas.');
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion") VALUES ('Apuntes Sistemas y Organizaciones', 1, 300, 'Apuntes de Sistemas y Organizaciones de primer año de Sistemas.');
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion") VALUES ('Apuntes Introducción a la Programación', 1, 400, 'Apuntes de Introducción a la Programación de primer año de Sistemas.');
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion") VALUES ('Apuntes Cálculo II', 2, 500, 'Apuntes de Cálculo II de segundo año de Sistemas.');
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion") VALUES ('Apuntes Ingeniería de Software I', 3, 600, 'Apuntes de Ingeniería de Software I de segundo año de Sistemas.');
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion") VALUES ('Apuntes Ingeniería de Software II', 1, 700, 'Apuntes de Ingeniería de Software II de primer año de Sistemas.');
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion") VALUES ('Apuntes Arquitectura de Computadoras', 3, 800, 'Apuntes de Arquitectura de Computadoras de segundo año de Sistemas.');
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion") VALUES ('Apuntes Inglés', 2, 900, 'Apuntes de Inglés de primer año de Sistemas.');
INSERT INTO fotocopia("titulo", "stock", "precio", "descripcion") VALUES ('Apuntes Probabilidad y Estadística', 1, 1000, 'Apuntes de Probabilidad y Estadística de primer año de Sistemas.');

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


-- CARRITOS
INSERT INTO carrito("id_usuario") VALUES (1);
INSERT INTO carrito("id_usuario") VALUES (2);
INSERT INTO carrito("id_usuario") VALUES (3);
INSERT INTO carrito("id_usuario") VALUES (4);
INSERT INTO carrito("id_usuario") VALUES (5);
INSERT INTO carrito("id_usuario") VALUES (6);
INSERT INTO carrito("id_usuario") VALUES (7);
INSERT INTO carrito("id_usuario") VALUES (8);
INSERT INTO carrito("id_usuario") VALUES (9);
INSERT INTO carrito("id_usuario") VALUES (10);