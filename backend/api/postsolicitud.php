<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require_once "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
  echo json_encode(["ok" => false, "error" => "No data"]);
  exit;
}

$codEstudiante = $data["CodEstudiante"];
$codInst = $data["CodInst"];
$codGrado = $data["CodGrado"];
$cursoInicio = $data["CursoInicio"];
$cursoFin = $data["CursoFin"];

// INSERT solicitud
$sql = "INSERT INTO solicitud 
        (CodEstudiante, CodInst, CodGrado, CursoInicio, CursoFin)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("issss", $codEstudiante, $codInst, $codGrado, $cursoInicio, $cursoFin);

if ($stmt->execute()) {

  echo json_encode([
    "ok" => true,
    "CodSol" => $conn->insert_id
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