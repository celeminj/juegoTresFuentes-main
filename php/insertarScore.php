<?php
require_once('bd.php');

header('Content-Type: application/json');

// Obtener el puntaje del cuerpo de la solicitud POST
$data = json_decode(file_get_contents('php://input'), true);
$score = $data['score'] ?? 0; // Usar 0 por defecto si no se envía el score

if ($score > 0) {
    try {
        $conexion = openDB();
        
        // Preparar la sentencia para insertar el score
        $sentencia = $conexion->prepare('INSERT INTO scores (punto) VALUES (:punto)');
        $sentencia->bindParam(':punto', $score);
        
        // Ejecutar la sentencia
        $sentencia->execute();
        
        // Cerrar la conexión
        closeDB();
        
        // Responder con éxito
        echo json_encode(['success' => true, 'message' => 'Score guardado con éxito']);
    } catch (PDOException $e) {
        // Si ocurre un error, devolver el mensaje de error
        echo json_encode(['success' => false, 'message' => 'Error al guardar el score: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No se proporcionó un score válido']);
}
?>
