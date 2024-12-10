DROP DATABASE IF EXISTS Veterinaria;
CREATE DATABASE Veterinaria;
USE Veterinaria;
CREATE TABLE clientes (
  Cli_ID INT NOT NULL AUTO_INCREMENT,
  Cli_Nom VARCHAR(45) NOT NULL,
  Cli_Tel VARCHAR(10) NOT NULL,
  Cli_Direc VARCHAR(50) NOT NULL,
  PRIMARY KEY (Cli_ID)
);
INSERT INTO clientes (Cli_Nom, Cli_Tel, Cli_Direc) 
VALUES ('Ramirez Rodriguez Luis Manuel', '5512589666', 'Aldama, Valle Dorado 7');
INSERT INTO clientes (Cli_Nom, Cli_Tel, Cli_Direc) 
VALUES ('Pérez González Juan Carlos', '5512345678', 'Madero, Juárez 10');
INSERT INTO clientes (Cli_Nom, Cli_Tel, Cli_Direc) 
VALUES ('García Hernández María José', '5534567890', 'Reforma, Cuauhtémoc 6');
INSERT INTO clientes (Cli_Nom, Cli_Tel, Cli_Direc) 
VALUES ('López López Pedro Antonio', '5545678901', 'Insurgentes Sur, Roma Norte 4');
INSERT INTO clientes (Cli_Nom, Cli_Tel, Cli_Direc) 
VALUES ('Hernández Sánchez Luis Enrique', '5556789012', 'Avenida Chapultepec, Polanco 8');

CREATE TABLE veterinarios (
  Vet_CURP VARCHAR(18) NOT NULL,
  Vet_Nom VARCHAR(45) NOT NULL,
  Vet_Tel VARCHAR(10) NOT NULL,
  Vet_Direc VARCHAR(50) NOT NULL,
  Vet_RFC VARCHAR(13) DEFAULT NULL,
  Vet_NSS VARCHAR(10) NOT NULL,
  Vet_Esp VARCHAR(15) NOT NULL,
  PRIMARY KEY (Vet_CURP)
);
INSERT INTO veterinarios (Vet_CURP,Vet_Nom, Vet_Tel, Vet_Direc, Vet_RFC, Vet_NSS, Vet_Esp) 
VALUES ('CURB761210MJCRDT01','Cruz Rodriguez Beatriz Adriana', '5545966655', 'Melchor Ocampo, Polanco, 100', 'CURB761210AC9', '1563995684', 'Cirujano');
INSERT INTO veterinarios (Vet_CURP,Vet_Nom, Vet_Tel, Vet_Direc, Vet_RFC, Vet_NSS, Vet_Esp) 
VALUES ('EOVF450526MJCSNL05','Escobedo Ventura Felipa', '5512365695', 'Álvaro Obregón, Roma Norte, 200', 'EOVF450526K47', '1255348921', 'Médico');
INSERT INTO veterinarios (Vet_CURP,Vet_Nom, Vet_Tel, Vet_Direc, Vet_RFC, Vet_NSS, Vet_Esp) 
VALUES ('GASJ600510MJCRNN02','Garcia De Santiago Juana', '5515862356', 'Dr. Atl, Condesa, 300', 'GASJ600510PM8', '1948632566', 'Cirujano');
INSERT INTO veterinarios (Vet_CURP,Vet_Nom, Vet_Tel, Vet_Direc, Vet_RFC, Vet_NSS, Vet_Esp) 
VALUES ('ROEA880301MJCDSD08','Guadalupe Rodriguez Zaria', '5548569321', 'Xochimilco, Xochimilco, 400', 'REA8803011K3', '1892366594', 'Médico');
INSERT INTO veterinarios (Vet_CURP,Vet_Nom, Vet_Tel, Vet_Direc, Vet_RFC, Vet_NSS, Vet_Esp) 
VALUES ('MAAE551115MJCRVS05','Martinez Avila Maria Esther', '5564308580', 'Coyoacán, Del Carmen, 500', 'MAAE551115KP0', '1569985231', 'Radiólogo');

CREATE TABLE historial_medico (
  HisM_ID INT NOT NULL AUTO_INCREMENT,
  HisM_Alerg VARCHAR(30) NOT NULL,
  HisM_Diag VARCHAR(50) NOT NULL,
  HisM_DuraT VARCHAR(20) DEFAULT NULL,
  HisM_Med VARCHAR(80) DEFAULT NULL,
  Vet_CURP VARCHAR(18) NOT NULL,
  PRIMARY KEY (HisM_ID),
  foreign key (Vet_CURP) references veterinarios (Vet_CURP)
);
INSERT INTO historial_medico (HisM_Alerg, HisM_Diag, HisM_DuraT, HisM_Med, Vet_CURP) 
VALUES ('Ninguna', 'Infección en la piel', '1 mes', 'Champús y lociones','MAAE551115MJCRVS05');
INSERT INTO historial_medico (HisM_Alerg, HisM_Diag, HisM_DuraT, HisM_Med, Vet_CURP) 
VALUES ('Ninguna', 'Sano', '0 dias', 'Ninguna','ROEA880301MJCDSD08');
INSERT INTO historial_medico (HisM_Alerg, HisM_Diag, HisM_DuraT, HisM_Med, Vet_CURP) 
VALUES ('Leche', 'Infección de las vías respiratorias', '4 semana', 'Antibióticos, Antiinflamatorios','GASJ600510MJCRNN02');
INSERT INTO historial_medico (HisM_Alerg, HisM_Diag, HisM_DuraT, HisM_Med, Vet_CURP) 
VALUES ('Picadura de pulgas', 'Diarrea', '2 semana', 'Antiparasitarios, Antibióticos','EOVF450526MJCSNL05');
INSERT INTO historial_medico (HisM_Alerg, HisM_Diag, HisM_DuraT, HisM_Med, Vet_CURP) 
VALUES ('Ninguna', 'Pérdida de peso', '2 mes', 'Suplementos nutricionales','CURB761210MJCRDT01');

CREATE TABLE mascotas (
  Mas_ID INT NOT NULL AUTO_INCREMENT,
  Mas_Nom VARCHAR(25) NOT NULL,
  Mas_Edad INT NOT NULL,
  Mas_Sex CHAR(1) NOT NULL,
  Mas_Peso DECIMAL(6,2) NOT NULL,
  Mas_Est INT NOT NULL,
  Mas_Esp VARCHAR(30) NOT NULL,
  HisM_ID INT NOT NULL,
  Cli_ID INT NOT NULL,
  PRIMARY KEY (Mas_ID),
  foreign key (HisM_ID) references historial_medico (HisM_ID),
  foreign key (Cli_ID) references clientes (Cli_ID)
);
INSERT INTO mascotas (Mas_Nom, Mas_Edad, Mas_Sex, Mas_Peso, Mas_Est, Mas_Esp, HisM_ID, Cli_ID) 
VALUES ('Firulais', 5, 'M', 4.8, 1, 'Perro', 1, 5);
INSERT INTO mascotas (Mas_Nom, Mas_Edad, Mas_Sex, Mas_Peso, Mas_Est, Mas_Esp, HisM_ID, Cli_ID) 
VALUES ('Tyson', 8, 'M', 7.5, 1, 'Gato', 2, 2);
INSERT INTO mascotas (Mas_Nom, Mas_Edad, Mas_Sex, Mas_Peso, Mas_Est, Mas_Esp, HisM_ID, Cli_ID) 
VALUES ('Luna', 3, 'H', 3.2, 1, 'Perro', 3, 3);
INSERT INTO mascotas (Mas_Nom, Mas_Edad, Mas_Sex, Mas_Peso, Mas_Est, Mas_Esp, HisM_ID, Cli_ID) 
VALUES ('Rokie', 5, 'M', 4.6, 1, 'Gato', 4, 2);
INSERT INTO mascotas (Mas_Nom, Mas_Edad, Mas_Sex, Mas_Peso, Mas_Est, Mas_Esp, HisM_ID, Cli_ID) 
VALUES ('Zeus', 1, 'M', 2.4, 1, 'Perro', 5, 1);

CREATE TABLE empleados (
  Empl_Curp VARCHAR(18) NOT NULL,
  Empl_Nom VARCHAR(45) NOT NULL,
  Empl_NSS VARCHAR(10) NOT NULL,
  Empl_Tel VARCHAR(10) NOT NULL,
  Empl_Fech VARCHAR(20) NOT NULL,
  Empl_Cate VARCHAR(15) NOT NULL,
  Empl_RFC VARCHAR(13) NOT NULL,
  PRIMARY KEY (Empl_Curp)
);
INSERT INTO empleados (Empl_Curp, Empl_Nom, Empl_NSS, Empl_Tel, Empl_Fech, Empl_Cate, Empl_RFC) 
VALUES ('GOVM860812MJCNLR05', 'Gonzales Villlobos Maricela', '1523695216', '5598885563', '11/08/2001', 'Médico', 'GOVM860812QA2');
INSERT INTO empleados (Empl_Curp, Empl_Nom, Empl_NSS, Empl_Tel, Empl_Fech, Empl_Cate, Empl_RFC) 
VALUES ('JACL841028MJCRLZ00', 'Jauregui Calvillo Lizbeth', '1552366321', '5514522215', '21/10/2009', 'Cirujano', 'JACL841028Q62');
INSERT INTO empleados (Empl_Curp, Empl_Nom, Empl_NSS, Empl_Tel, Empl_Fech, Empl_Cate, Empl_RFC) 
VALUES ('MOMM770119MJCRR03', 'Mora Maequez Maelena', '4899658231', '5578912321', '21/04/2010', 'Médico', 'MOMM770119F65');
INSERT INTO empleados (Empl_Curp, Empl_Nom, Empl_NSS, Empl_Tel, Empl_Fech, Empl_Cate, Empl_RFC) 
VALUES ('GORJ860823MJCNMD06', 'Gonzales Romo Judiht', '4623159586', '5569855632', '30/06/2000', 'Cirujano', 'GORJ8608234G3');
INSERT INTO empleados (Empl_Curp, Empl_Nom, Empl_NSS, Empl_Tel, Empl_Fech, Empl_Cate, Empl_RFC) 
VALUES ('HEGE501203MASRTL06', 'Hernandez Gutierrez Maria Elena', '1269536942', '5514296485', '17/09/2003', 'Radiólogo', 'ZHEGE501203T6');

CREATE TABLE proveedores (
  Prov_ID INT NOT NULL AUTO_INCREMENT,
  Prov_Nom VARCHAR(15) NOT NULL,
  Prov_Cont VARCHAR(45) NOT NULL,
  Prov_Dire VARCHAR(50) NOT NULL,
  Prov_Tel VARCHAR(10) NOT NULL,
  Prov_TSum VARCHAR(12) NOT NULL,
  PRIMARY KEY (Prov_ID)
);
INSERT INTO proveedores (Prov_Nom, Prov_Cont, Prov_Dire, Prov_Tel, Prov_TSum) 
VALUES ('Safari', 'Ruiz Pérez Pedro Luis', 'Madero, Centro Histórico 11', '5512639563', 'Alimentos');
INSERT INTO proveedores (Prov_Nom, Prov_Cont, Prov_Dire, Prov_Tel, Prov_TSum) 
VALUES ('Hartz', 'Martínez González Ana María', 'Reforma, Cuauhtémoc 2', '5578956231', 'Juguetes');
INSERT INTO proveedores (Prov_Nom, Prov_Cont, Prov_Dire, Prov_Tel, Prov_TSum) 
VALUES ('Virbac', 'Gómez Rodríguez José Antonio', 'Insurgentes, Juárez 31', '5515632596', 'Juguetes');
INSERT INTO proveedores (Prov_Nom, Prov_Cont, Prov_Dire, Prov_Tel, Prov_TSum) 
VALUES ('VetPlus', 'López Sánchez María del Carmen', 'Chapultepec, Miguel Hidalgo 41', '5578965231', 'Alimentos');
INSERT INTO proveedores (Prov_Nom, Prov_Cont, Prov_Dire, Prov_Tel, Prov_TSum) 
VALUES ('Panacur', 'Pérez García Juan José', 'Coyoacán, Coyoacán 15', '5512536925', 'Medicamento');

CREATE TABLE productos (
  Prod_ID INT NOT NULL AUTO_INCREMENT,
  Prod_Tipo VARCHAR(12) NOT NULL,
  Prod_Nom VARCHAR(25) NOT NULL,
  Prod_Prec DECIMAL(6,2) NOT NULL,
  Prod_FechIn VARCHAR(20) NOT NULL,
  Prod_FechCad VARCHAR(20),
  Prov_ID INT NOT NULL ,
  PRIMARY KEY (Prod_ID),
  foreign key (Prov_ID) references proveedores (Prov_ID)
);
INSERT INTO productos (Prod_Tipo, Prod_Nom, Prod_Prec, Prod_FechIn, Prod_FechCad, Prov_ID) 
VALUES ('Comida', 'Purina Dog Chow', 150.00, '20-07-2023', '2024-07-20',1);
INSERT INTO productos (Prod_Tipo, Prod_Nom, Prod_Prec, Prod_FechIn, Prod_FechCad, Prov_ID) 
VALUES ('Juguete', 'Raton para gatos', 100.00, '20-09-2022', '-',2);
INSERT INTO productos (Prod_Tipo, Prod_Nom, Prod_Prec, Prod_FechIn, Prod_FechCad, Prov_ID) 
VALUES ('Comida', 'AlimentoBeta', 75.00, '02-03-2021', '02-03-2023',1);
INSERT INTO productos (Prod_Tipo, Prod_Nom, Prod_Prec, Prod_FechIn, Prod_FechCad, Prov_ID) 
VALUES ('Juguete', 'Pelota', 25.00, '2023-07-20', '-',3);
INSERT INTO productos (Prod_Tipo, Prod_Nom, Prod_Prec, Prod_FechIn, Prod_FechCad, Prov_ID) 
VALUES ('Medicina', 'Vacuna', 75.00, '03-08-2023', '04-12-2023',5);

CREATE TABLE citas (
  Cit_Num INT NOT NULL AUTO_INCREMENT,
  Cit_Fech VARCHAR(20) NOT NULL,
  Cit_Hora TIME NOT NULL,
  Cit_Est VARCHAR(10) NOT NULL,
  Cit_Mot VARCHAR(20) NOT NULL,
  Cli_ID INT NOT NULL,
  Vet_CURP VARCHAR(18) NOT NULL,
  PRIMARY KEY (Cit_Num),  
  foreign key (Cli_ID) references clientes (Cli_ID),
  foreign key (Vet_CURP) references veterinarios (Vet_CURP)
);
INSERT INTO citas (Cit_Fech, Cit_Hora, Cit_Est, Cit_Mot, Vet_CURP, Cli_ID) 
VALUES ('20-12-2023', '15:00:00', 'Pendiente', 'Consulta','CURB761210MJCRDT01',1);
INSERT INTO citas (Cit_Fech, Cit_Hora, Cit_Est, Cit_Mot, Vet_CURP, Cli_ID) 
VALUES ('12-04-2023', '09:00:00', 'Concluida', 'Radiografia','EOVF450526MJCSNL05',3);
INSERT INTO citas (Cit_Fech, Cit_Hora, Cit_Est, Cit_Mot, Vet_CURP, Cli_ID) 
VALUES ('20-07-2023', '12:00:00', 'Concluida', 'Cirugia','GASJ600510MJCRNN02',4);
INSERT INTO citas (Cit_Fech, Cit_Hora, Cit_Est, Cit_Mot, Vet_CURP, Cli_ID) 
VALUES ('14-01-2024', '09:00:00', 'Pendiente', 'Consulta','ROEA880301MJCDSD08',5);
INSERT INTO citas (Cit_Fech, Cit_Hora, Cit_Est, Cit_Mot, Vet_CURP, Cli_ID) 
VALUES ('25-12-2023', '16:00:00', 'Pendiente', 'Examen Fisico','MAAE551115MJCRVS05',2);

CREATE TABLE Pagos (
  Vent_ID INT NOT NULL AUTO_INCREMENT,
  Vent_Fech VARCHAR(20) NOT NULL,
  Vent_Hora TIME NOT NULL,
  Vent_Total DECIMAL(6,2) NOT NULL,
  Vent_TVent VARCHAR(12) NOT NULL,
  PRIMARY KEY (Vent_ID)
);
INSERT INTO Pagos (Vent_Fech, Vent_Hora, Vent_Total, Vent_TVent) 
VALUES ('25-12-2023', '16:50:00', 150.00, 'Efectivo');
INSERT INTO Pagos (Vent_Fech, Vent_Hora, Vent_Total, Vent_TVent) 
VALUES ('20-12-2023', '12:00:00', 100.00, 'Efectivo');
INSERT INTO Pagos (Vent_Fech, Vent_Hora, Vent_Total, Vent_TVent) 
VALUES ('25-09-2023', '09:00:00', 25.00, 'Efectivo');
INSERT INTO Pagos (Vent_Fech, Vent_Hora, Vent_Total, Vent_TVent) 
VALUES ('20-07-2023', '14:00:00', 600.20, 'Efectivo');
INSERT INTO Pagos (Vent_Fech, Vent_Hora, Vent_Total, Vent_TVent) 
VALUES ('05-01-2023', '10:00:00', 400.20, 'Efectivo');

SELECT * FROM clientes;

SELECT * FROM mascotas;

SELECT * FROM historial_medico;

SELECT * FROM empleados;

SELECT * FROM productos;

SELECT * FROM veterinarios;

SELECT * FROM proveedores;

SELECT * FROM citas;

SELECT * FROM Pagos;

/*Mostrar las citas de un cliente específico junto con el nombre del veterinario*/
SELECT Cli_Nom, Cit_Fech, Cit_Hora, Vet_Nom
FROM clientes c
INNER JOIN citas ci ON c.Cli_ID = ci.Cli_ID
INNER JOIN veterinarios v ON ci.Vet_CURP = v.Vet_CURP
WHERE c.Cli_ID = 2;

/*Obtener el nombre del cliente y la mascota junto con su historial médico*/
SELECT Cli_Nom, Mas_Nom, HisM_Diag
FROM clientes c
INNER JOIN mascotas m ON c.Cli_ID = m.Cli_ID
INNER JOIN historial_medico hm ON m.HisM_ID=hm.HisM_ID;

/* 2.2Crear usuarios etc */ 
DROP USER 'uadmin'@'localhost';
CREATE USER 'uadmin'@'localhost' IDENTIFIED BY 'pass';
Grant all privileges on Veterinaria . * to 'uadmin'@'localhost';
FLUSH privileges;

DROP USER 'veterina'@'localhost';
CREATE USER 'veterina'@'localhost' IDENTIFIED BY 'vet';
REVOKE SELECT, INSERT, UPDATE ON *.* FROM 'veterina'@'localhost';
Grant SELECT on Veterinaria . clientes to 'veterina'@'localhost';
Grant all privileges on Veterinaria . mascotas to 'veterina'@'localhost';
Grant all privileges on Veterinaria . historial_medico to 'veterina'@'localhost';
Grant SELECT on Veterinaria . empleados to 'veterina'@'localhost';
Grant SELECT on Veterinaria . productos to 'veterina'@'localhost';
Grant SELECT on Veterinaria . veterinarios to 'veterina'@'localhost';
Grant SELECT on Veterinaria . citas to 'veterina'@'localhost';
FLUSH privileges;

DROP USER 'empleado'@'localhost';
CREATE USER 'empleado'@'localhost' IDENTIFIED BY 'emp';
REVOKE SELECT, INSERT, UPDATE ON *.* FROM 'empleado'@'localhost';
Grant all privileges on Veterinaria . clientes to 'empleado'@'localhost';
Grant SELECT on Veterinaria . mascotas to 'empleado'@'localhost';
Grant SELECT on Veterinaria . empleados to 'empleado'@'localhost';
Grant all privileges on Veterinaria . productos to 'empleado'@'localhost';
Grant SELECT on Veterinaria . veterinarios to 'empleado'@'localhost';
Grant all privileges on Veterinaria . proveedores to 'empleado'@'localhost';
Grant all privileges on Veterinaria . Pagos to 'empleado'@'localhost';
FLUSH privileges;

-- DROP USER 'uadmin'@'localhost';
-- DROP USER 'empleado'@'localhost';
-- DROP USER 'veterina'@'localhost';
-- 2.3 Inicia la primera transacción
START TRANSACTION;
SELECT * FROM historial_medico WHERE HisM_ID = 1 FOR SHARE;
SELECT * FROM historial_medico WHERE HisM_ID = 1;
COMMIT;

-- Inicia la segunda transacción
START TRANSACTION;
SELECT * FROM historial_medico WHERE HisM_ID = 1 FOR UPDATE;
UPDATE historial_medico 
SET HisM_Diag = 'Terminado'
WHERE HisM_ID = 1;
COMMIT;

/* Transaccion */
/* Agendar una cita y pagarla al mismo tiempo */
SELECT * FROM citas;SELECT * FROM Pagos;
START TRANSACTION;
-- Insertamos la cita
INSERT INTO citas (Cit_Fech, Cit_Hora, Cit_Est, Cit_Mot, Vet_CURP, Cli_ID)
VALUES ('16-05-2024','10:00:00', 'Pendiente', 'Consulta', 'CURB761210MJCRDT01', 4);
-- Obtenemos el ID de la cita recién insertada
SET @cita_id = LAST_INSERT_ID();
-- Insertamos la compra (asumimos que ya tienes un producto y un pago asociado)
INSERT INTO Pagos (Vent_Fech, Vent_Hora, Vent_Total, Vent_TVent)
VALUES ('15-05-2024', '10:00:00', 50.00, 'Efectivo');
COMMIT;
ROLLBACK;
SELECT * FROM citas;SELECT * FROM Pagos;


/* Insertar un historial medico junto con la mascota nueva */
SELECT * FROM historial_medico;SELECT * FROM mascotas;
START TRANSACTION;
INSERT INTO historial_medico (HisM_Alerg, HisM_Diag, HisM_DuraT, HisM_Med, Vet_CURP) 
VALUES ('Ninguna', 'Saludable', '0 dias', '','MAAE551115MJCRVS05');
SET @HisM_ID = LAST_INSERT_ID();
INSERT INTO mascotas (Mas_Nom, Mas_Edad, Mas_Sex, Mas_Peso, Mas_Est, Mas_Esp, HisM_ID, Cli_ID) 
VALUES ('Ferrero', 10, 'M', 5.8, 1, 'Perro', @HisM_ID, 4);
COMMIT;
ROLLBACK;
SELECT * FROM historial_medico;SELECT * FROM mascotas;

/* Nuevo proveedor junto con su producto */
SELECT * FROM productos;SELECT * FROM proveedores;
START TRANSACTION;
INSERT INTO proveedores (Prov_Nom, Prov_Cont, Prov_Dire, Prov_Tel, Prov_TSum) 
VALUES ('AliMascotasSA', 'Jair Rivera Quezada', 'Xola, Aldama 45', '5585963265', 'Alimentos');
SET @Prov_ID = LAST_INSERT_ID();
INSERT INTO productos (Prod_Tipo, Prod_Nom, Prod_Prec, Prod_FechIn, Prod_FechCad, Prov_ID) 
VALUES ('Comida', 'Stiks con carne', 50.00, '02-07-2024', '2025-07-20',@Prov_ID);
COMMIT;
ROLLBACK;
SELECT * FROM productos;SELECT * FROM proveedores;

DROP trigger validarcita;
/* trigger */

/* Validar la fecha de la cita que no sea antes de la fecha actual */
select * from citas;
DELIMITER // 
CREATE TRIGGER validarcita
AFTER INSERT ON citas
FOR EACH ROW 
BEGIN 
    IF NEW.Cit_Fech < CURDATE() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'No se pueden agendar citas en fechas pasadas.';
    END IF;
END;
//
DELIMITER ;
INSERT INTO citas (Cit_Fech, Cit_Hora, Cit_Est, Cit_Mot, Vet_CURP, Cli_ID) 
VALUES ('2025-5-06', '15:00:00', 'Pendiente', 'Consulta','CURB761210MJCRDT01',3);
select * from citas;


/* Validar que el precio no sea negativo */
select * from Pagos;
DELIMITER // 
CREATE TRIGGER precioveri
AFTER INSERT ON pagos
FOR EACH ROW 
BEGIN 
IF NEW.Vent_Total < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El precio no puede ser negativo.';
    END IF;
END;
//
DELIMITER ;
INSERT INTO Pagos (Vent_Fech, Vent_Hora, Vent_Total, Vent_TVent) 
VALUES ('2024-12-25', '06:50:00', 250.00, 'Tarjeton');
select * from Pagos;

/* proceso para registrar nueva mascota, con su dueño, historial medico y una cita */
select * from mascotas;select * from citas;select * from historial_medico;select * from clientes;
delimiter //
CREATE PROCEDURE registrar_mascota(
    IN p_nombre_mascota VARCHAR(25),
    IN p_edad INT,
    IN p_sexo CHAR(1),
    IN p_peso DECIMAL(6,2),
    IN p_especie VARCHAR(30),
    IN p_id_cliente INT,
    IN p_alérgenos VARCHAR(30),
    IN p_diagnostico VARCHAR(50),
    IN p_veterinario VARCHAR(18),
    IN p_fecha_cita DATE,
    IN p_hora_cita TIME
)
BEGIN
  
    -- Verificar si el cliente existe
    IF NOT EXISTS (SELECT * FROM clientes WHERE Cli_ID = p_id_cliente) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El cliente no existe.';
    END IF;

    -- Insertar el historial médico
    INSERT INTO historial_medico (HisM_Alerg, HisM_Diag, HisM_DuraT, HisM_Med, Vet_CURP)
    VALUES (p_alérgenos, p_diagnostico,"0 dias", "",p_veterinario);
    SET @HisM_ID = LAST_INSERT_ID();

    -- Insertar la mascota
    INSERT INTO mascotas (Mas_Nom, Mas_Edad, Mas_Sex, Mas_Peso, Mas_Est, Mas_Esp, HisM_ID, Cli_ID)
    VALUES (p_nombre_mascota, p_edad, p_sexo, p_peso, 1, p_especie, @HisM_ID, p_id_cliente);
    SET @Mas_ID = LAST_INSERT_ID();

    
    -- Insertar la primera cita
    INSERT INTO citas (Cit_Fech, Cit_Hora, Cit_Est, Cit_Mot, Cli_ID, Vet_CURP)
    VALUES (p_fecha_cita, p_hora_cita, 'Pendiente', 'Revisión inicial', p_id_cliente, p_veterinario);
END //
delimiter ;
CALL registrar_mascota('chanchita',2,'M',5.5,'Perro',1,'Ninguna','Sano','CURB761210MJCRDT01','2025-04-15','10:00:00');
select * from mascotas;select * from citas;select * from historial_medico;select * from clientes;
