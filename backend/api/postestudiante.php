<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require_once "conexion.php";

// leer JSON del frontend
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
  echo json_encode(["ok" => false, "error" => "No data"]);
  exit;
}

$nombre = $data["Nombre"];
$apellidos = $data["Apellidos"];
$email = $data["Email"];
$tel = $data["Tel"];
$fecn = $data["FecN"];

// INSERT estudiante
$sql = "INSERT INTO estudiante (Nombre, Apellidos, Email, Tel, FecN)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $nombre, $apellidos, $email, $tel, $fecn);

if ($stmt->execute()) {

  echo json_encode([
    "ok" => true,
    "CodEstudiante" => $conn->insert_id
  ]);

} else {
  echo json_encode([
    "ok" => false,
    "error" => $conn->error
  ]);
}

$stmt->close();
$conn->close();
?>