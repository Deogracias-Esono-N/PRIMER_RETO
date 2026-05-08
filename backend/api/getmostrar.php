<?php
//CORS: Permitiendo la conexion a sistemas diferentes (VITE - PHP)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

header("Content-Type: application/json"); //Indica que la informacion se procesa en json

require_once("conexion.php"); //CONEXION A LA BASE DE DATOS

// ================================
// CONSULTA PRINCIPAL
// ================================

// Obtiene solicitudes junto con datos del estudiante
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

// Ejecuta la consulta
$result = $conn->query($sql);

$datos = [];

while ($row = $result->fetch_assoc()) {
  $datos[] = $row;
}

// ================================
// CONSULTA DE RESUMEN (PROCEDIMIENTO-CANTIDAD)
// ================================

// Llama a un procedimiento almacenado para contar expedientes
$resumen = $conn->query("CALL ContarExpedientes()");

$totalExpedientes = 0;


// Obtiene el resultado del procedimiento
if ($filaResumen = $resumen->fetch_assoc()) {
  $totalExpedientes = $filaResumen["NumExpedientes"];
}

// ================================
// RESPUESTA FINAL
// ================================

// Devuelve todo junto en formato JSON
echo json_encode([
  "solicitudes" => $datos,
  "totalExpedientes" => $totalExpedientes
]);

$conn->close();
?>