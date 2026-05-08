<?php
// ================================
// CONFIGURACIÓN CORS
// ================================

// Permite acceso desde cualquier origen (frontend como Vite)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Indica que la respuesta será JSON con codificación UTF-8
header("Content-Type: application/json; charset=UTF-8");

require_once("conexion.php");

// ================================
// CONSULTA SQL
// ================================

// Selecciona todos los grados con su código, nombre y nivel
$sql = "SELECT CodGrado, Nombre, Nivel FROM grado";

// Ejecuta la consulta
$result = $conn->query($sql);

// Array donde se guardarán los datos
$datos = [];

// Si hay resultados, los recorre fila a fila
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $datos[] = $row;  // añade cada registro al array
    }
}

// ================================
// RESPUESTA JSON
// ================================

// Devuelve los datos al frontend en formato JSON
echo json_encode($datos);

$conn->close();
?>