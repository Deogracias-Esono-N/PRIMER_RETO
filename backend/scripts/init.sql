-- =====================================
-- RESET TOTAL DE BASE DE DATOS
-- =====================================

DROP DATABASE IF EXISTS viajesgestion;
DROP DATABASE IF EXISTS viajesgestion;
CREATE DATABASE viajesgestion;
USE viajesgestion;

-- =====================================
-- COMUNIDAD AUTONOMA
-- =====================================
CREATE TABLE comunidad_autonoma (
  CodComun VARCHAR(3) PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL
);

INSERT INTO comunidad_autonoma (CodComun, Nombre) VALUES
('PV', 'País Vasco'),
('MD', 'Comunidad de Madrid'),
('VC', 'Comunitat Valenciana'),
('AN', 'Andalucía');

SELECT*
FROM comunidad_autonoma

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

-- =====================================
-- LOCALIDAD
-- =====================================
CREATE TABLE localidad (
  CodLoc VARCHAR(3) PRIMARY KEY,
  Nombre VARCHAR(30) NOT NULL,
  CodPostal VARCHAR(10),
  CodComun VARCHAR(3) NOT NULL,
  FOREIGN KEY (CodComun) REFERENCES comunidad_autonoma(CodComun) ON DELETE RESTRICT
);

INSERT INTO localidad (CodLoc, Nombre, CodPostal, CodComun) VALUES

-- País Vasco
('BI', 'Bilbao', '48001', 'PV'),
('GE', 'Getxo', '48930', 'PV'),

-- Madrid
('AL', 'Alcalá de Henares', '28801', 'MD'),
('TR', 'Torrejón de Ardoz', '28850', 'MD'),

-- Comunidad Valenciana
('VA', 'Valencia', '46001', 'VC'),
('TO', 'Torrent', '46900', 'VC'),

-- Andalucía
('JA', 'Jaén', '23001', 'AN');


SELECT*
FROM localidad

--------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------

-- =====================================
-- INSTITUTO
-- =====================================
CREATE TABLE institute (
  CodInst VARCHAR(3) PRIMARY KEY,
  Nombre VARCHAR(150) NOT NULL,
  Email VARCHAR(150),
  Tel VARCHAR(20),
  CodLoc VARCHAR(3) NOT NULL,
  FOREIGN KEY (CodLoc) REFERENCES localidad(CodLoc) ON DELETE RESTRICT
);

INSERT INTO instituto (CodInst, Nombre, Email, Tel, CodLoc) VALUES

-- =====================================================
-- PAÍS VASCO (PV)
-- =====================================================
('UMU', 'IES Miguel de Unamuno', 'info@unamuno.com', '944000000', 'BI'),
('BOT', 'IES Botikazar', 'info@botikazar.com', '944111111', 'BI'),

('AIX', 'IES Aixerrota', 'info@aixerrota.com', '944222222', 'GE'),
('ART', 'IES Artaza-Romo', 'info@artaza.com', '944333333', 'GE'),

-- =====================================================
-- MADRID (MD)
-- =====================================================
('AVA', 'IES Alonso de Avellaneda', 'info@avellaneda.com', '910111111', 'AL'),
('MCH', 'IES Antonio Machado', 'info@machado.com', '910222222', 'AL'),

('CIS', 'IES Cardenal Cisneros', 'info@cisneros.com', '910000000', 'TR'),
('VIC', 'IES Valle Inclán', 'info@valleinclan.com', '910333333', 'TR'),

-- =====================================================
-- COMUNITAT VALENCIANA (VC)
-- =====================================================
('MAR', 'IES La Marxadella', 'info@marxadella.com', '960000001', 'VA'),
('SOR', 'IES Sorolla', 'info@sorolla.com', '960000002', 'VA'),

('TIR', 'IES Tirant lo Blanc', 'info@tirant.com', '960000003', 'TO'),
('SER', 'IES Serra Perenxisa', 'info@serra.com', '960000004', 'TO'),

-- =====================================================
-- ANDALUCÍA (AN)
-- =====================================================
('VIR', 'IES Virgen del Carmen', 'info@virgencar.com', '953000000', 'JA'),
('AUR', 'IES Auringis', 'info@auringis.com', '953111111', 'JA');


SELECT*
FROM instituto
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------

-- =====================================
-- GRADO
-- =====================================
CREATE TABLE grado (
  CodGrado VARCHAR(3) PRIMARY KEY,
  Nombre VARCHAR(150) NOT NULL,
  Nivel VARCHAR(50)
);

INSERT INTO grado (CodGrado, Nombre, Nivel) VALUES

-- =====================================================
-- BACHILLERATO / SECUNDARIA
-- =====================================================
('BCH', 'Bachillerato (Secundaria)', 'Bachillerato'),

-- =====================================================
-- FP GRADO MEDIO - INFORMÁTICA
-- =====================================================
('SMR', 'Sistemas Microinformáticos y Redes (Grado Medio)', 'FP Grado Medio'),
('OFC', 'Ofimática y Administración Digital (Grado Medio)', 'FP Grado Medio'),

-- =====================================================
-- FP GRADO MEDIO - COMUNICACIONES
-- =====================================================
('ELE', 'Instalaciones de Telecomunicaciones (Grado Medio)', 'FP Grado Medio'),
('RED', 'Redes de Comunicación Básicas (Grado Medio)', 'FP Grado Medio'),

-- =====================================================
-- FP GRADO MEDIO - ADMINISTRACIÓN Y SERVICIOS
-- =====================================================
('ADM', 'Gestión Administrativa (Grado Medio)', 'FP Grado Medio'),
('COM', 'Actividades Comerciales (Grado Medio)', 'FP Grado Medio'),

-- =====================================================
-- FP GRADO SUPERIOR - INFORMÁTICA
-- =====================================================
('DAW', 'Desarrollo de Aplicaciones Web (Grado Superior)', 'FP Grado Superior'),
('DAM', 'Desarrollo de Aplicaciones Multiplataforma (Grado Superior)', 'FP Grado Superior'),
('ASIR', 'Administración de Sistemas Informáticos en Red (Grado Superior)', 'FP Grado Superior'),
('SEG', 'Ciberseguridad en Entornos TIC (Grado Superior)', 'FP Grado Superior'),

-- =====================================================
-- FP GRADO SUPERIOR - COMUNICACIONES
-- =====================================================
('TEL', 'Telecomunicaciones (Grado Superior)', 'FP Grado Superior'),
('GRD', 'Gestión de Redes Avanzadas (Grado Superior)', 'FP Grado Superior'),

-- =====================================================
-- FP GRADO SUPERIOR - MÁS DEMANDADOS
-- =====================================================
('RHU', 'Recursos Humanos (Grado Superior)', 'FP Grado Superior'),
('MKT', 'Marketing y Publicidad Digital (Grado Superior)', 'FP Grado Superior'),
('FIN', 'Administración y Finanzas (Grado Superior)', 'FP Grado Superior');


SELECT*
FROM grado

--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------

-- =====================================
-- ESTUDIANTE
-- =====================================
CREATE TABLE estudianto (
  CodEstudiante INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(30) NOT NULL,
  Apellidos VARCHAR(40) NOT NULL,
  Email VARCHAR(50),
  Tel VARCHAR(20),
  FecN DATE
);


-- =====================================
-- SOLICITUD
-- =====================================
CREATE TABLE solicitud (
  CodSol INT AUTO_INCREMENT PRIMARY KEY,

  CodEstudiante INT NOT NULL,
  CodInst VARCHAR(3) NOT NULL,
  CodGrado VARCHAR(3) NOT NULL,

  CursoInicio YEAR NOT NULL,
  CursoFin YEAR NOT NULL,

  FecSol TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Estado VARCHAR(50) DEFAULT 'pendiente',
  Observaciones TEXT,

  FOREIGN KEY (CodEstudiante) REFERENCES estudiante(CodEstudiante) ON DELETE CASCADE,
  FOREIGN KEY (CodInst) REFERENCES instituto(CodInst) ON DELETE RESTRICT,
  FOREIGN KEY (CodGrado) REFERENCES grado(CodGrado) ON DELETE RESTRICT
);

-- =====================================
-- PROCEDIMIENTO QUE CUENTA SOLICITUDES
-- =====================================
DELIMITER //

CREATE PROCEDURE ContarExpedientes()
BEGIN

  SELECT COUNT(*) AS NumExpedientes
  FROM solicitud;

END //

DELIMITER ;

CALL ContarExpedientes();






