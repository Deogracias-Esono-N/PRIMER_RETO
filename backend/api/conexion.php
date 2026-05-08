<?php

//conecion a la base de datos.
$host = getenv("DB_HOST");
$user = getenv("DB_USER");
$pass = getenv("DB_PASS");
$db   = getenv("DB_NAME");

$conn = new mysqli($host, $user, $pass, $db);

// Manejo de error
if ($conn->connect_error) {
    die(json_encode([
        "ok" => false,
        "error" => "Error de conexión"
    ]));
}
?>