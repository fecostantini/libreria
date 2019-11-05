CREATE OR REPLACE FUNCTION uppercase_promocion_on_insert() RETURNS trigger AS $uppercase_promocion_on_insert$
    BEGIN        
        NEW.nombre_promocion = UPPER(NEW.nombre_promocion);
        RETURN NEW;
    END;
$uppercase_promocion_on_insert$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_promocion_on_insert_trigger BEFORE INSERT OR UPDATE ON promocion
    FOR EACH ROW EXECUTE PROCEDURE uppercase_promocion_on_insert();
--------


CREATE OR REPLACE FUNCTION uppercase_producto_on_insert() RETURNS trigger AS $uppercase_producto_on_insert$
    BEGIN        
        NEW.titulo = UPPER(NEW.titulo);
        RETURN NEW;
    END;
$uppercase_producto_on_insert$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_producto_on_insert_trigger BEFORE INSERT OR UPDATE ON producto
    FOR EACH ROW EXECUTE PROCEDURE uppercase_producto_on_insert();
-------


CREATE OR REPLACE FUNCTION uppercase_editorial_on_insert() RETURNS trigger AS $uppercase_editorial_on_insert$
    BEGIN        
        NEW.nombre_editorial = UPPER(NEW.nombre_editorial);
        RETURN NEW;
    END;
$uppercase_editorial_on_insert$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_editorial_on_insert_trigger BEFORE INSERT OR UPDATE ON editorial
    FOR EACH ROW EXECUTE PROCEDURE uppercase_editorial_on_insert();
------------


CREATE OR REPLACE FUNCTION uppercase_saga_on_insert() RETURNS trigger AS $uppercase_saga_on_insert$
    BEGIN        
        NEW.nombre_saga = UPPER(NEW.nombre_saga);
        RETURN NEW;
    END;
$uppercase_saga_on_insert$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_saga_on_insert_trigger BEFORE INSERT OR UPDATE ON saga
    FOR EACH ROW EXECUTE PROCEDURE uppercase_saga_on_insert();
-------------


CREATE OR REPLACE FUNCTION uppercase_libro_on_insert() RETURNS trigger AS $uppercase_libro_on_insert$
    BEGIN        
        NEW.idioma = UPPER(NEW.idioma);
        NEW.edicion = UPPER(NEW.edicion);
        NEW.descripcion = UPPER(NEW.descripcion);
        RETURN NEW;
    END;
$uppercase_libro_on_insert$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_libro_on_insert_trigger BEFORE INSERT OR UPDATE ON libro
    FOR EACH ROW EXECUTE PROCEDURE uppercase_libro_on_insert();
-----------


CREATE OR REPLACE FUNCTION uppercase_autor_on_insert() RETURNS trigger AS $uppercase_autor_on_insert$
    BEGIN        
        NEW.autor = UPPER(NEW.autor);
        NEW.nacionalidad = UPPER(NEW.nacionalidad);
        RETURN NEW;
    END;
$uppercase_autor_on_insert$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_autor_on_insert_trigger BEFORE INSERT OR UPDATE ON autor
    FOR EACH ROW EXECUTE PROCEDURE uppercase_autor_on_insert();
------------


CREATE OR REPLACE FUNCTION uppercase_categoria_on_insert() RETURNS trigger AS $uppercase_categoria_on_insert$
    BEGIN        
        NEW.nombre_categoria = UPPER(NEW.nombre_categoria);
        RETURN NEW;
    END;
$uppercase_categoria_on_insert$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_categoria_on_insert_trigger BEFORE INSERT OR UPDATE ON categoria
    FOR EACH ROW EXECUTE PROCEDURE uppercase_categoria_on_insert();
---------------


CREATE OR REPLACE FUNCTION uppercase_usuario_on_insert() RETURNS trigger AS $uppercase_usuario_on_insert$
    BEGIN        
        NEW.nombre = UPPER(NEW.nombre);
        NEW.apellido = UPPER(NEW.apellido);
        NEW.rol = UPPER(NEW.rol);
        RETURN NEW;
    END;
$uppercase_usuario_on_insert$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_usuario_on_insert_trigger BEFORE INSERT OR UPDATE ON usuario
    FOR EACH ROW EXECUTE PROCEDURE uppercase_usuario_on_insert();
------------------


