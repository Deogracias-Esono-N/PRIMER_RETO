<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["CodEstudiante"])) {
  echo json_encode(["ok" => false, "error" => "ID no recibido"]);
  exit;
}

$id = $data["CodEstudiante"];

// borrar estudiante (CASCADE borra solicitud automáticamente)
$sql = "DELETE FROM estudiante WHERE CodEstudiante = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
  echo json_encode(["ok" => true]);
} else {
  echo json_encode(["ok" => false, "error" => "Error al borrar"]);
}

$conn->close();
?>