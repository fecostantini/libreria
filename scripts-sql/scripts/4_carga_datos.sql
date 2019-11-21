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

-- PRODUCTO x CARRITO
INSERT INTO productoxcarrito("id_producto", "id_carrito") VALUES (1, 1); -- LIBRO
INSERT INTO productoxcarrito("id_producto", "id_carrito") VALUES (13, 1); -- FOTOCOPIA
INSERT INTO productoxcarrito("id_producto", "id_carrito") VALUES (15, 1); -- FOTOCOPIA
INSERT INTO productoxcarrito("id_producto", "id_carrito") VALUES (3, 2); 
INSERT INTO productoxcarrito("id_producto", "id_carrito") VALUES (4, 2);
INSERT INTO productoxcarrito("id_producto", "id_carrito") VALUES (19, 3);
INSERT INTO productoxcarrito("id_producto", "id_carrito") VALUES (16, 4);
INSERT INTO productoxcarrito("id_producto", "id_carrito") VALUES (6, 5);
INSERT INTO productoxcarrito("id_producto", "id_carrito") VALUES (2, 6);
INSERT INTO productoxcarrito("id_producto", "id_carrito") VALUES (9, 7);

--TODOS: hacer función que devuelva el producto (si es libro un libro, si es fotocopia una fotocopia) cuando se busca en productoxcarrito. 