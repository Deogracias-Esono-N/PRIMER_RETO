<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

header("Content-Type: application/json");

require_once("conexion.php");

$sql = "
SELECT
  e.CodEstudiante,
  e.Nombre,
  e.Apellidos,
  e.Tel,
  s.CursoInicio,
  s.CursoFin,
  s.Estado
FROM solicitud s
JOIN estudiante e ON s.CodEstudiante = e.CodEstudiante
ORDER BY s.CodSol DESC
";

$result = $conn->query($sql);

$datos = [];

while ($row = $result->fetch_assoc()) {
  $datos[] = $row;
}

// 🔥 llamar procedimiento
$resumen = $conn->query("CALL ContarExpedientes()");

$totalExpedientes = 0;

if ($filaResumen = $resumen->fetch_assoc()) {
  $totalExpedientes = $filaResumen["NumExpedientes"];
}

// devolver TODO junto
echo json_encode([
  "solicitudes" => $datos,
  "totalExpedientes" => $totalExpedientes
]);

$conn->close();
?>