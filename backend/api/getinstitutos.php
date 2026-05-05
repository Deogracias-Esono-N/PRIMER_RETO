<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Indicamos que la respuesta será JSON (para el frontend)
header("Content-Type: application/json");

// Cargamos la conexión a la base de datos (reutilizable)
require_once "conexion.php";

// =====================================================
// CONSULTA SQL (JOIN ENTRE TABLAS)
// =====================================================
// Aquí juntamos:
// instituto → localidad → comunidad_autonoma
$sql = "
SELECT 
  i.CodInst,              -- ID del instituto
  i.Nombre AS Instituto,  -- nombre del instituto
  l.Nombre AS Localidad,  -- nombre de la localidad
  c.Nombre AS Comunidad   -- nombre de la comunidad
FROM instituto i

-- Relación instituto → localidad
JOIN localidad l ON i.CodLoc = l.CodLoc

-- Relación localidad → comunidad
JOIN comunidad_autonoma c ON l.CodComun = c.CodComun
";

// Ejecutamos la consulta en MySQL
$result = $conn->query($sql);

// Creamos un array vacío para guardar los resultados
$institutos = [];


// Recorremos todas las filas que devuelve la BD
while ($row = $result->fetch_assoc()) {

  // Guardamos cada fila en formato JSON limpio
  $institutos[] = [
    "CodInst" => $row["CodInst"],
    "Nombre" => $row["Instituto"],
    "Localidad" => $row["Localidad"],
    "Comunidad" => $row["Comunidad"]
  ];
}

// Convertimos el array a JSON y lo devolvemos al frontend
echo json_encode($institutos);