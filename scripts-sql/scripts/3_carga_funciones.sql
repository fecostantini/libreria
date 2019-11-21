/*    
    ######## ##     ## ##    ##  ######  ####  #######  ##    ## ########  ######  
    ##       ##     ## ###   ## ##    ##  ##  ##     ## ###   ## ##       ##    ## 
    ##       ##     ## ####  ## ##        ##  ##     ## ####  ## ##       ##       
    ######   ##     ## ## ## ## ##        ##  ##     ## ## ## ## ######    ######  
    ##       ##     ## ##  #### ##        ##  ##     ## ##  #### ##             ## 
    ##       ##     ## ##   ### ##    ##  ##  ##     ## ##   ### ##       ##    ## 
    ##        #######  ##    ##  ######  ####  #######  ##    ## ########  ######                 
*/  

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
LANGUAGE plpgsql;