<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? null;
$pass  = $data["password"] ?? null;

// validar gmail
if (!str_ends_with($email, "@gmail.com")) {
  echo json_encode(["ok" => false, "error" => "Correo no válido"]);
  exit;
}

// SOLO BUSCAR POR EMAIL
$sql = "SELECT * FROM usuario WHERE Email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {

  // VERIFICAR PASSWORD HASH
  if (password_verify($pass, $row["Password"])) {

    $_SESSION["rol"] = $row["Rol"];

    echo json_encode([
      "ok" => true,
      "rol" => $row["Rol"],
      "id" => $row["CodUsuario"]
    ]);

  } else {
    echo json_encode(["ok" => false, "error" => "Credenciales incorrectas"]);
  }

} else {
  echo json_encode(["ok" => false, "error" => "Usuario no existe"]);
}

$conn->close();
?>