/*
 ######   #######  ##    ##  ######  ##     ## ##       ########    ###     ######  
##    ## ##     ## ###   ## ##    ## ##     ## ##          ##      ## ##   ##    ## 
##       ##     ## ####  ## ##       ##     ## ##          ##     ##   ##  ##       
##       ##     ## ## ## ##  ######  ##     ## ##          ##    ##     ##  ######  
##       ##     ## ##  ####       ## ##     ## ##          ##    #########       ## 
##    ## ##     ## ##   ### ##    ## ##     ## ##          ##    ##     ## ##    ## 
 ######   #######  ##    ##  ######   #######  ########    ##    ##     ##  ######  
*/


--#todos las compras realizadas por un usuario entre 2 fechas

select com.id_compra, com.fecha_compra, com.precio_total, ca.id_usuario 
from compra com, carrito ca, usuario u 
where(u.id_usuario = 2 and u.id_usuario = ca.id_usuario and ca.id_carrito = com.id_carrito)

--#todos los pedidos aceptados a la fecha

select id_pedido 
from pedido 
where (aceptado = TRUE)

--#categorias y cantididad de libros asociadas a esta

select c.nombre_categoria, count(l.isbn) as cantidad_de_libros
from categoria c, libro l, categoriaxlibro cxl 
where (c.id_categoria = cxl.id_categoria and cxl.isbn = l.isbn)
group by c.nombre_categoria

--#usuario que realizaron 4 o mas compras

select u.id_usuario, u.nombre, count(com.id_compra) 
from carrito ca, compra com, usuario u 
where(u.id_usuario = ca.id_usuario and ca.id_carrito = com.id_carrito and ca.activo = FALSE)
group by u.id_usuario
having count(com.id_compra) > 3

--#libros que posean 2 o mas autores

select l.titulo, count(a.id_autor) from autor a, libro l, autorxlibro axl where (a.id_autor = axl.id_autor and axl.isbn = l.isbn)
group by l.titulo
having count(a.id_autor)>1

--#libros con valoracion promedio mayor a 3.5

select l.titulo, avg(v.puntaje) from valoracion v, libro l where (v.isbn = l.isbn)
group by l.titulo
having avg(v.puntaje)>3.5