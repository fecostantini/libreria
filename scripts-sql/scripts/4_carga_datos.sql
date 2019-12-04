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
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Harry Potter', 4);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Percy Jackson y los dioses del Olimpo', 5);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Los juegos del hambre', 8);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('El señor de los anillos', 8);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Guerreros', 7);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('El diario de un chico en apuros', 4);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Canción del hielo y fuego', 9);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Los héroes del olimpo', 12);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('Las crónicas de Narnia', 4);
INSERT INTO saga("nombre_saga","stock_saga") VALUES('The Maze Runner', 6);


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
