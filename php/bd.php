<?php
session_start();



function openDB()
{
  $servername = "localhost";
  $username = "root";
  $password = "mysql";

  $conexion = new PDO("mysql:host=$servername;dbname=scorebd", $username, $password);
  // set the PDO error mode to exception
  $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $conexion->exec("set names utf8");

  return $conexion;
}

function closeDB()
{
  return null;
}


function insertarScore($score)
{   
        $conexion = openDB();
    
        $sentenciaText = "insert into scores (punto) values (:punto)";
        $sentencia = $conexion->prepare($sentenciaText);
        $sentencia->bindParam(':punto', $score);
        $sentencia->execute();
    
        $_SESSION['mensaje'] = 'Scoore guardada!';
      
      $conexion = closeDB();
    
}

// Obtener los datos del request POST
$data = json_decode(file_get_contents('php://input'), true);
$score = $data['score'] ?? 0; // Obtener el valor del score, por defecto 0 si no existe

// Insertar el score en la base de datos
if (insertarScore($score)) {
    $response = ['success' => true];
} else {
    $response = ['success' => false, 'message' => 'Error al guardar el score'];
}

// Devolver la respuesta en formato JSON

echo json_encode($response);

?>
