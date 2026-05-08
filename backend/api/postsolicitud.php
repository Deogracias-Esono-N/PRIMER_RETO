<?php

// ================================
// CONFIGURACIÓN CORS
// ================================

// Permite acceso desde cualquier origen (frontend como Vite)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require_once "conexion.php";

// ================================
// LECTURA DE DATOS DEL FRONTEND
// ================================

// Recibe el JSON enviado desde el frontend
$data = json_decode(file_get_contents("php://input"), true);

// Si no llegan datos, devuelve error y termina
if (!$data) {
  echo json_encode(["ok" => false, "error" => "No data"]);
  exit;
}

// Extrae los datos de la solicitud
$codEstudiante = $data["CodEstudiante"];
$codInst = $data["CodInst"];
$codGrado = $data["CodGrado"];
$cursoInicio = $data["CursoInicio"];
$cursoFin = $data["CursoFin"];

// ================================
// INSERT EN BASE DE DATOS
// ================================

// Inserta una nueva solicitud en la tabla solicitud
$sql = "INSERT INTO solicitud 
        (CodEstudiante, CodInst, CodGrado, CursoInicio, CursoFin)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql); // Prepara la consulta para evitar inyección SQL
// Asocia los parámetros (i = integer, s = string)
$stmt->bind_param("issss", $codEstudiante, $codInst, $codGrado, $cursoInicio, $cursoFin);


// ================================
// EJECUCIÓN Y RESPUESTA
// ================================
if ($stmt->execute()) {

  // Si se inserta correctamente, devuelve éxito y el ID generado
  echo json_encode([
    "ok" => true,
    "CodSol" => $conn->insert_id
  ]);

} else {
  // Si hay error, lo devuelve al frontend
  echo json_encode([
    "ok" => false,
    "error" => $conn->error
  ]);
}

$stmt->close();
$conn->close();
?>