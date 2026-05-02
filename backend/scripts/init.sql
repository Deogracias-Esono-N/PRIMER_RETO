-- =====================================
-- RESET TOTAL DE BASE DE DATOS
-- =====================================

DROP DATABASE IF EXISTS gestionviajes;
CREATE DATABASE gestionviajes;
USE gestionviajes;

-- =====================================
-- COMUNIDAD AUTONOMA
-- =====================================
CREATE TABLE comunidad_autonoma (
  CodComun INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL
);

-- =====================================
-- LOCALIDAD
-- =====================================
CREATE TABLE localidad (
  CodLoc INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  CodPostal VARCHAR(10),
  CodComun INT,
  FOREIGN KEY (CodComun) REFERENCES comunidad_autonoma(CodComun)
);

-- =====================================
-- INSTITUTO
-- =====================================
CREATE TABLE instituto (
  CodInst INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(150) NOT NULL,
  Email VARCHAR(150),
  Tel VARCHAR(20),
  CodLoc INT,
  FOREIGN KEY (CodLoc) REFERENCES localidad(CodLoc)
);

-- =====================================
-- GRADO
-- =====================================
CREATE TABLE grado (
  CodGrado INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(150) NOT NULL,
  Nivel VARCHAR(50)
);

-- =====================================
-- ESTUDIANTE
-- =====================================
CREATE TABLE estudiante (
  CodEstudiante INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  Apellidos VARCHAR(150) NOT NULL,
  Email VARCHAR(150),
  Tel VARCHAR(20),
  FecN DATE
);

-- =====================================
-- SOLICITUD
-- =====================================
CREATE TABLE solicitud (
  CodSol INT AUTO_INCREMENT PRIMARY KEY,
  Curso VARCHAR(20),
  FecSol TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Estado VARCHAR(50) DEFAULT 'pendiente',
  Observaciones TEXT,

  CodEstudiante INT,
  CodInst INT,
  CodGrado INT,

  FOREIGN KEY (CodEstudiante) REFERENCES estudiante(CodEstudiante),
  FOREIGN KEY (CodInst) REFERENCES instituto(CodInst),
  FOREIGN KEY (CodGrado) REFERENCES grado(CodGrado)
);