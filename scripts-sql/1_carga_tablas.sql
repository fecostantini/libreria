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
"stock" smallint not null,
"precio" real not null,
"id_promocion" integer not null,
constraint PK_producto primary key ("id_producto"),
constraint FK_producto_promocion foreign key ("id_promocion") references "promocion"("id_promocion")
);


CREATE TABLE "editorial" (
"id_editorial" serial not null,
"nombre_editorial" varchar not null,
constraint PK_editorial primary key ("id_editorial")
);

CREATE TABLE "saga" (
"id_saga" serial not null,
"nombre_saga" varchar not null,
"stock_saga" SMALLINT not null,
constraint PK_saga primary key ("id_saga")
);

CREATE TABLE "libro" (
"isbn" integer not null,
"idioma" varchar(15) not null,
"edicion" varchar,
"descripcion" varchar,
"id_editorial" integer,
"id_saga" integer,
constraint PK_libro primary key ("isbn"),
constraint FK_editorial_libro foreign key ("id_editorial") references "editorial"("id_editorial"),
constraint FK_saga_libro foreign key ("id_saga") references "saga"("id_saga")
) INHERITS (producto);

CREATE TABLE "autor" (
"id_autor" serial not null,
"autor" varchar not null unique,
"nacionalidad" varchar,
constraint PK_autor primary key ("id_autor")
);

CREATE TABLE "categoria" (
"id_categoria" serial not null,
"nombre_categoria" varchar not null,
constraint PK_categoria primary key ("id_categoria")
);



CREATE TABLE "pedido" (
"id_pedido" serial not null,
"cantidad" smallint,
"fecha_pedido" date,
"anticipo_pagado" boolean,
"pedido_aceptado" boolean,
"pedido_entregado" boolean,
"fecha_llegada" date,
"isbn" integer not null,
constraint FK_pedido_isbn foreign key ("isbn") references "libro"("isbn"),
constraint PK_pedido primary key ("id_pedido")
);

CREATE TABLE "valoracion" (
"id_valoracion" serial not null,
"puntaje" smallint,
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
"fecha" date,
constraint PK_sugerencia primary key ("id_sugerencia")
);

CREATE TABLE "usuario" (
"id_usuario" serial not null,
"mail" varchar not null,
"nombre" varchar,
"apellido" varchar,
"password" varchar,
"rol" varchar,
constraint PK_usuario primary key ("id_usuario")); 

CREATE TABLE "carrito" (
"id_carrito" serial not null,
"id_usuario" integer not null,
constraint PK_carrito primary key ("id_carrito"),
constraint FK_carrito_usuario foreign key ("id_usuario") references "usuario"("id_usuario")
);

CREATE TABLE "compra" (
"id_compra" serial not null,
"fecha_compra" date,
"precio_total" real,
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









