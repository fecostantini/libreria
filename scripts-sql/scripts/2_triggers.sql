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


