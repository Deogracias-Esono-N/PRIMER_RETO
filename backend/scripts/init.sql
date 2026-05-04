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
  CodComun INT NOT NULL,
  FOREIGN KEY (CodComun) REFERENCES comunidad_autonoma(CodComun) ON DELETE RESTRICT
);

-- =====================================
-- INSTITUTO
-- =====================================
CREATE TABLE instituto (
  CodInst INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(150) NOT NULL,
  Email VARCHAR(150),
  Tel VARCHAR(20),
  CodLoc INT NOT NULL,
  FOREIGN KEY (CodLoc) REFERENCES localidad(CodLoc) ON DELETE RESTRICT
);

-- =====================================
-- GRADO
-- =====================================
CREATE TABLE grado (
  CodGrado INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(150) NOT NULL,
  Nivel VARCHAR(50) NOT NULL
);

-- =====================================
-- ESTUDIANTE
-- =====================================
CREATE TABLE estudiante (
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
  CodInst INT NOT NULL,
  CodGrado INT NOT NULL,
  Curso VARCHAR(20),
  FecSol TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Estado VARCHAR(50) DEFAULT 'pendiente',
  Observaciones TEXT,

  FOREIGN KEY (CodEstudiante) REFERENCES estudiante(CodEstudiante) ON DELETE CASCADE,
  FOREIGN KEY (CodGrado) REFERENCES grado(CodGrado) ON DELETE RESTRICT,
  FOREIGN KEY (CodInst) REFERENCES instituto(CodInst) ON DELETE RESTRICT
);




