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

