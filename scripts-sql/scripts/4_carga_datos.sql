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
INSERT INTO usuario("mail", "nombre", "apellido", "password", "rol", "imagen") VALUES ('belwalterv@hotmail.com', 'Walter', 'Bel', 'password3', 'GESTOR_PEDIDOS', 'https://i.pinimg.com/originals/4f/8e/66/4f8e66cbf93a262d2039ccfd1639723d.png');
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


--realizo estas cargas para que puedan chequear las consultas realizadas para el tp
call confirmar_compra(9);
call confirmar_compra(4);
call confirmar_compra(7);
call confirmar_compra(5);
call confirmar_compra(3);
call confirmar_compra(1);
call confirmar_compra(6);
select * from añadir_al_carrito(7, 2, 2);
select * from añadir_al_carrito(1, 1, 2);
select * from añadir_al_carrito(5, 3, 2);
call confirmar_compra(2);
select * from añadir_al_carrito(10, 1, 18);
call confirmar_compra(18);
select * from añadir_al_carrito(7, 1, 19);
call confirmar_compra(19);
select * from añadir_al_carrito(5, 1, 20);
call confirmar_compra(20);


update pedido set aceptado = true where (id_pedido = 1 or id_pedido = 5 or id_pedido = 9 or id_pedido = 3)
