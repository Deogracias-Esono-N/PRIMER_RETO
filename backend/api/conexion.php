<?php

$host = getenv("DB_HOST");
$user = getenv("DB_USER");
$pass = getenv("DB_PASS");
$db   = getenv("DB_NAME");

echo "Intentando conectar...<br>";

$conn = new mysqli($host, $user, $pass, $db);

echo "Conectado correctamente<br>";
?>