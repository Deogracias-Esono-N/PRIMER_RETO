<?php
// ================================
// CONFIGURACIÓN CORS Y RESPUESTA
// ================================

// Permite acceso desde cualquier origen (frontend como Vite)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "conexion.php"; 

// Lee el cuerpo de la petición (JSON enviado desde fetch)
$data = json_decode(file_get_contents("php://input"), true);

// Comprueba si viene el ID del estudiante
if (!isset($data["CodEstudiante"])) {
  echo json_encode(["ok" => false, "error" => "ID no recibido"]);
  exit;
}

// Guarda el ID recibido
$id = $data["CodEstudiante"];

// ================================
// BORRADO EN BASE DE DATOS
// ================================

// Elimina el estudiante (y sus relaciones si hay CASCADE configurado)
$sql = "DELETE FROM estudiante WHERE CodEstudiante = ?";

// Prepara la consulta para evitar inyección SQL, securizacion
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id); // Asocia el parámetro como entero

// Ejecuta la consulta
if ($stmt->execute()) {
  echo json_encode(["ok" => true]);
} else {
  echo json_encode(["ok" => false, "error" => "Error al borrar"]);
}

$conn->close(); //cierre de conexion
?>