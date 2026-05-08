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

// Lee el JSON enviado desde fetch (frontend)
$data = json_decode(file_get_contents("php://input"), true);

// Si no llegan datos, devuelve error y termina
if (!$data) {
  echo json_encode(["ok" => false, "error" => "No data"]);
  exit;
}

// Extrae los campos del estudiante
$nombre = $data["Nombre"];
$apellidos = $data["Apellidos"];
$email = $data["Email"];
$tel = $data["Tel"];
$fecn = $data["FecN"];

// ================================
// INSERT EN BASE DE DATOS
// ================================

// Inserta un nuevo estudiante en la tabla
$sql = "INSERT INTO estudiante (Nombre, Apellidos, Email, Tel, FecN)
        VALUES (?, ?, ?, ?, ?)";

// Prepara la consulta (evita inyección SQL)
$stmt = $conn->prepare($sql);
// Asocia los parámetros como strings
$stmt->bind_param("sssss", $nombre, $apellidos, $email, $tel, $fecn);


// ================================
// EJECUCIÓN Y RESPUESTA
// ================================
if ($stmt->execute()) { // Si el insert es correcto, devuelve éxito y el ID generado

  echo json_encode([
    "ok" => true,
    "CodEstudiante" => $conn->insert_id
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