<?php
$host = getenv("DB_HOST");
$user = getenv("DB_USER");
$pass = getenv("DB_PASS");
$db   = getenv("DB_NAME");

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error conexión BD");
}

$conn->set_charset("utf8"); // todo lo que reciba la base de datos debe estar en UTF8
?>